// ===== BUDGETS =====
function addBudget() {
  const rawCategory = getRequiredValue('budget-category')
  const amount = parsePositiveAmount('budget-amount')

  if (!rawCategory) {
    showValidationMessage(t('invalidRequired'))
    return
  }

  if (amount === null) {
    showValidationMessage(t('invalidPositiveAmount'))
    return
  }

  const category = registerCategory(rawCategory)
  const existingBudget = budgets.find(
    (budget) => budget.category.toLowerCase() === category.toLowerCase(),
  )

  if (existingBudget) {
    existingBudget.amount = amount
  } else {
    budgets.push({ category, amount })
  }

  saveBudgets()
  document.getElementById('budget-form').reset()
  refreshApp()
}

function deleteBudget(category) {
  budgets = budgets.filter((budget) => budget.category !== category)
  saveBudgets()
  refreshApp()
}

function renderBudgets() {
  const budgetsList = document.getElementById('budgets-list')

  budgetsList.replaceChildren()

  if (budgets.length === 0) {
    budgetsList.appendChild(createEmptyRow(5, t('noBudgets')))
    return
  }

  budgets
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category))
    .forEach((budget) => {
      budgetsList.appendChild(createBudgetRow(budget))
    })
}

function createBudgetRow(budget) {
  const row = document.createElement('tr')
  const spent = calculateSpentForCategory(budget.category)
  const remaining = budget.amount - spent
  const remainingCell = createTableCell(formatCurrency(remaining), 'remaining-cell')
  const actionsCell = document.createElement('td')

  remainingCell.classList.add(remaining >= 0 ? 'remaining-positive' : 'remaining-negative')
  actionsCell.appendChild(
    createDeleteButton(t('deleteBudget'), () => deleteBudget(budget.category)),
  )

  row.appendChild(createTableCell(formatCategory(budget.category)))
  row.appendChild(createTableCell(formatCurrency(budget.amount)))
  row.appendChild(createTableCell(formatCurrency(spent)))
  row.appendChild(remainingCell)
  row.appendChild(actionsCell)

  return row
}

function calculateSpentForCategory(category) {
  const { month, year } = getCurrentMonthContext()

  return operations
    .filter((operation) => {
      const operationDate = new Date(operation.date)
      return (
        operation.type === 'expense' &&
        operation.category === category &&
        operationDate.getMonth() === month &&
        operationDate.getFullYear() === year
      )
    })
    .reduce((total, operation) => total + operation.amount, 0)
}
