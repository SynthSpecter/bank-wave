// ===== SUGGESTIONS =====
function renderSuggestions() {
  const suggestionsContainer = document.getElementById('suggestions-container')
  const suggestions = generateSuggestions()

  suggestionsContainer.replaceChildren()

  if (suggestions.length === 0) {
    const emptyMessage = document.createElement('p')

    emptyMessage.className = 'empty-state'
    emptyMessage.textContent = t('noSuggestions')
    suggestionsContainer.appendChild(emptyMessage)
    return
  }

  suggestions.forEach((suggestion) => {
    suggestionsContainer.appendChild(createSuggestionCard(suggestion))
  })
}

function createSuggestionCard(suggestion) {
  const suggestionElement = document.createElement('article')
  const title = document.createElement('h3')
  const message = document.createElement('p')

  suggestionElement.className = 'suggestion-card'
  title.textContent = `${suggestion.icon} ${suggestion.title}`
  message.textContent = suggestion.message

  suggestionElement.appendChild(title)
  suggestionElement.appendChild(message)

  return suggestionElement
}

function generateSuggestions() {
  const suggestions = [
    ...getBudgetOverrunSuggestions(),
    ...getMonthlyComparisonSuggestions(),
    ...getTopCategorySuggestions(),
    ...getSavingsSuggestions(),
  ]

  return suggestions
}

function getBudgetOverrunSuggestions() {
  return budgets
    .map((budget) => {
      const spent = calculateSpentForCategory(budget.category)
      const overrun = spent - budget.amount

      if (overrun <= 0) return null

      return {
        icon: '⚠️',
        title: t('budgetExceededTitle'),
        message: `${t('budgetExceeded')} "${getCategoryLabel(budget.category)}" ${t('byAmount')} ${formatCurrency(overrun)}.`,
      }
    })
    .filter(Boolean)
}

function getMonthlyComparisonSuggestions() {
  const lastMonthExpenses = calculateLastMonthExpenses()
  const currentMonthExpenses = calculateMonthlyExpenses()

  if (lastMonthExpenses <= 0) return []

  const difference = currentMonthExpenses - lastMonthExpenses
  const percentage = (difference / lastMonthExpenses) * 100

  if (percentage > 20) {
    return [
      {
        icon: '📈',
        title: t('expensesUpTitle'),
        message: t('moreThanLastMonth').replace('%', `${percentage.toFixed(1)} %`),
      },
    ]
  }

  if (percentage < -20) {
    return [
      {
        icon: '📉',
        title: t('expensesDownTitle'),
        message: t('lessThanLastMonth').replace('%', `${Math.abs(percentage).toFixed(1)} %`),
      },
    ]
  }

  return []
}

function getTopCategorySuggestions() {
  const categoryExpenses = getCurrentMonthCategoryExpenses()
  const topCategory = Object.entries(categoryExpenses).sort((a, b) => b[1] - a[1])[0]

  if (!topCategory) return []

  return [
    {
      icon: '💰',
      title: t('topCategoryTitle'),
      message: `${t('topCategory')} "${getCategoryLabel(topCategory[0])}" : ${formatCurrency(topCategory[1])}.`,
    },
  ]
}

function getSavingsSuggestions() {
  const currentBalance = calculateCurrentBalance()

  if (currentBalance <= 0) return []

  return [
    {
      icon: '💸',
      title: t('savingsTitle'),
      message: t('savingsSuggestion').replace('%', formatCurrency(currentBalance)),
    },
  ]
}

function getCurrentMonthCategoryExpenses() {
  const { month, year } = getCurrentMonthContext()

  return operations
    .filter((operation) => {
      const operationDate = new Date(operation.date)
      return (
        operation.type === 'expense' &&
        operationDate.getMonth() === month &&
        operationDate.getFullYear() === year
      )
    })
    .reduce((categoryExpenses, operation) => {
      categoryExpenses[operation.category] =
        (categoryExpenses[operation.category] || 0) + operation.amount
      return categoryExpenses
    }, {})
}

function calculateLastMonthExpenses() {
  const now = new Date()
  const currentMonth = now.getMonth()
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const lastMonthYear = currentMonth === 0 ? now.getFullYear() - 1 : now.getFullYear()

  return operations
    .filter((operation) => {
      const operationDate = new Date(operation.date)
      return (
        operation.type === 'expense' &&
        operationDate.getMonth() === lastMonth &&
        operationDate.getFullYear() === lastMonthYear
      )
    })
    .reduce((total, operation) => total + operation.amount, 0)
}
