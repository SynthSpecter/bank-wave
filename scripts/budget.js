// ===== AJOUT D'UN BUDGET =====
function addBudget() {
  const category = document.getElementById('budget-category').value.trim()
  const amount = parseFloat(document.getElementById('budget-amount').value)

  if (!category || isNaN(amount)) {
    alert(
      currentLanguage === 'fr'
        ? 'Veuillez remplir tous les champs obligatoires.'
        : 'Please fill in all required fields.',
    )
    return
  }

  const existingBudgetIndex = budgets.findIndex((b) => b.category === category)
  if (existingBudgetIndex !== -1) {
    budgets[existingBudgetIndex].amount = amount
  } else {
    budgets.push({ category, amount })
  }

  if (!categories.includes(category)) {
    categories.push(category)
    localStorage.setItem('categories', JSON.stringify(categories))
    updateCategorySelect()
  }

  saveBudgets()
  document.getElementById('budget-form').reset()
  renderBudgets()
  updateChartData()
  renderSuggestions()
}

// ===== SUPPRESSION D'UN BUDGET =====
function deleteBudget(category) {
  budgets = budgets.filter((b) => b.category !== category)
  saveBudgets()
  renderBudgets()
  updateChartData()
  renderSuggestions()
}

// ===== SAUVEGARDE DES BUDGETS =====
function saveBudgets() {
  localStorage.setItem('budgets', JSON.stringify(budgets))
}

// ===== RENDU DES BUDGETS =====
function renderBudgets() {
  const budgetsList = document.getElementById('budgets-list')
  budgetsList.innerHTML = ''

  if (budgets.length === 0) {
    budgetsList.innerHTML = `<tr><td colspan="5">${currentLanguage === 'fr' ? 'Aucun budget défini.' : 'No budgets defined.'}</td></tr>`
    return
  }

  budgets.forEach((budget) => {
    const spent = calculateSpentForCategory(budget.category)
    const remaining = budget.amount - spent
    const categoryName =
      translations[currentLanguage].categories[budget.category] ||
      budget.category

    const row = document.createElement('tr')
    row.innerHTML = `
            <td><span class="category-icon">${categoryName}</span></td>
            <td>${budget.amount.toFixed(2)} €</td>
            <td>${spent.toFixed(2)} €</td>
            <td style="color: ${remaining >= 0 ? 'green' : 'red'}">${remaining.toFixed(2)} €</td>
            <td>
                <button onclick="deleteBudget('${budget.category}')" class="delete-button">❌</button>
            </td>
        `
    budgetsList.appendChild(row)
  })
}

// ===== CALCUL DES DÉPENSES PAR CATÉGORIE =====
function calculateSpentForCategory(category) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return operations
    .filter((op) => {
      const opDate = new Date(op.date)
      return (
        opDate.getMonth() === currentMonth &&
        opDate.getFullYear() === currentYear &&
        op.category === category &&
        op.type === 'expense'
      )
    })
    .reduce((total, op) => total + op.amount, 0)
}
