// ===== RENDU DES SUGGESTIONS =====
function renderSuggestions() {
  const suggestionsContainer = document.getElementById('suggestions-container')
  suggestionsContainer.innerHTML = ''

  const suggestions = generateSuggestions()

  if (suggestions.length === 0) {
    suggestionsContainer.innerHTML = `<p>${currentLanguage === 'fr' ? 'Aucune suggestion pour le moment.' : 'No suggestions at the moment.'}</p>`
    return
  }

  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement('div')
    suggestionElement.className = 'suggestion-card'
    suggestionElement.innerHTML = `
            <h3>${suggestion.title}</h3>
            <p>${suggestion.message}</p>
        `
    suggestionsContainer.appendChild(suggestionElement)
  })
}

// ===== GÉNÉRATION DES SUGGESTIONS =====
function generateSuggestions() {
  const suggestions = []
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // 1. Vérifier les budgets dépassés
  budgets.forEach((budget) => {
    const spent = calculateSpentForCategory(budget.category)
    if (spent > budget.amount) {
      const categoryName =
        translations[currentLanguage].categories[budget.category] ||
        budget.category
      suggestions.push({
        title:
          '⚠️ ' +
          (currentLanguage === 'fr' ? 'Budget dépassé' : 'Budget Exceeded'),
        message: `${translations[currentLanguage].budgetExceeded}"${categoryName}"${translations[currentLanguage].byAmount}${(spent - budget.amount).toFixed(2)} €.`,
      })
    }
  })

  // 2. Comparaison avec le mois dernier
  const lastMonthExpenses = calculateLastMonthExpenses()
  const currentMonthExpenses = calculateMonthlyExpenses()
  if (lastMonthExpenses > 0) {
    const difference = currentMonthExpenses - lastMonthExpenses
    const percentage = (difference / lastMonthExpenses) * 100

    if (percentage > 20) {
      suggestions.push({
        title:
          '📈 ' +
          (currentLanguage === 'fr' ? 'Dépenses en hausse' : 'Expenses Up'),
        message: translations[currentLanguage].moreThanLastMonth.replace(
          '%',
          percentage.toFixed(1),
        ),
      })
    } else if (percentage < -20) {
      suggestions.push({
        title:
          '📉 ' +
          (currentLanguage === 'fr' ? 'Dépenses en baisse' : 'Expenses Down'),
        message: translations[currentLanguage].lessThanLastMonth.replace(
          '%',
          Math.abs(percentage).toFixed(1),
        ),
      })
    }
  }

  // 3. Catégories les plus dépensières
  const categoryExpenses = {}
  operations
    .filter((op) => {
      const opDate = new Date(op.date)
      return (
        opDate.getMonth() === currentMonth &&
        opDate.getFullYear() === currentYear &&
        op.type === 'expense'
      )
    })
    .forEach((op) => {
      categoryExpenses[op.category] =
        (categoryExpenses[op.category] || 0) + op.amount
    })

  const sortedCategories = Object.entries(categoryExpenses).sort(
    (a, b) => b[1] - a[1],
  )

  if (sortedCategories.length > 0) {
    const topCategory = sortedCategories[0]
    const categoryName =
      translations[currentLanguage].categories[topCategory[0]] || topCategory[0]
    suggestions.push({
      title:
        '💰 ' +
        (currentLanguage === 'fr'
          ? 'Catégorie la plus dépensière'
          : 'Top Spending Category'),
      message: `${translations[currentLanguage].topCategory}"${categoryName}" : ${topCategory[1].toFixed(2)} €.`,
    })
  }

  // 4. Suggestions d'épargne
  const currentBalance = calculateCurrentBalance()
  if (currentBalance > 0) {
    suggestions.push({
      title:
        '💸 ' +
        (currentLanguage === 'fr' ? 'Épargne possible' : 'Savings Opportunity'),
      message: translations[currentLanguage].savingsSuggestion.replace(
        '%',
        currentBalance.toFixed(2),
      ),
    })
  }

  return suggestions
}

// ===== CALCUL DES DÉPENSES DU MOIS DERNIER =====
function calculateLastMonthExpenses() {
  const now = new Date()
  const lastMonth = now.getMonth() - 1
  const currentYear = now.getFullYear()
  const lastMonthYear = lastMonth < 0 ? currentYear - 1 : currentYear
  const adjustedLastMonth = lastMonth < 0 ? 11 : lastMonth

  return operations
    .filter((op) => {
      const opDate = new Date(op.date)
      return (
        opDate.getMonth() === adjustedLastMonth &&
        opDate.getFullYear() === lastMonthYear &&
        op.type === 'expense'
      )
    })
    .reduce((total, op) => total + op.amount, 0)
}
