// ===== TRADUCTIONS =====
const translations = {
  fr: {
    // Titre de l'app
    appTitle: 'BudgetTrack',
    // Navigation
    navDashboard: 'Tableau de bord',
    navOperations: 'Opérations',
    navBudgets: 'Budgets',
    navSuggestions: 'Suggestions',
    // Tableau de bord
    dashboardTitle: 'Tableau de bord',
    currentBalanceTitle: 'Solde actuel',
    monthlyExpensesTitle: 'Dépenses ce mois',
    monthlyIncomeTitle: 'Revenus ce mois',
    // Opérations
    operationsTitle: 'Ajouter une opération',
    operationDateLabel: 'Date',
    operationAmountLabel: 'Montant (€)',
    operationTypeLabel: 'Type',
    operationCategoryLabel: 'Catégorie',
    operationDescriptionLabel: 'Description',
    submitButton: 'Ajouter',
    operationsHistoryTitle: 'Historique des opérations',
    // Tableau des opérations
    tableDate: 'Date',
    tableDescription: 'Description',
    tableCategory: 'Catégorie',
    tableAmount: 'Montant',
    tableType: 'Type',
    tableActions: 'Actions',
    // Budgets
    budgetsTitle: 'Gestion des budgets',
    budgetCategoryLabel: 'Catégorie',
    budgetAmountLabel: 'Budget mensuel (€)',
    budgetSubmitButton: 'Ajouter',
    budgetsListTitle: 'Liste des budgets',
    tableBudgetCategory: 'Catégorie',
    tableBudgetAmount: 'Budget mensuel',
    tableBudgetSpent: 'Dépensé',
    tableBudgetRemaining: 'Restant',
    tableBudgetActions: 'Actions',
    // Suggestions
    suggestionsTitle: 'Suggestions',
    // Pied de page
    footerText: 'BudgetTrack - Gestion manuelle et locale de ton budget | ',
    exportButton: 'Exporter en CSV',
    // Types d'opérations
    expense: 'Dépense',
    income: 'Revenu',
    // Catégories par défaut
    categories: {
      Courses: '🛒 Courses',
      Loisirs: '🎮 Loisirs',
      Loyer: '🏠 Loyer',
      AAH: '💰 AAH',
      Transport: '🚗 Transport',
      Santé: '🏥 Santé',
      Épargne: '💸 Épargne',
      Autres: '📌 Autres',
    },
    // Messages de suggestions
    budgetExceeded: 'Tu as dépassé ton budget pour ',
    byAmount: ' de ',
    moreThanLastMonth: 'Tu as dépensé % de plus que le mois dernier.',
    lessThanLastMonth: 'Tu as dépensé % de moins que le mois dernier.',
    topCategory: 'Tu as dépensé le plus dans ',
    savingsSuggestion:
      'Ton solde actuel est de % €. Pense à épargner une partie !',
  },
  en: {
    // Titre de l'app
    appTitle: 'BudgetTrack',
    // Navigation
    navDashboard: 'Dashboard',
    navOperations: 'Operations',
    navBudgets: 'Budgets',
    navSuggestions: 'Suggestions',
    // Tableau de bord
    dashboardTitle: 'Dashboard',
    currentBalanceTitle: 'Current Balance',
    monthlyExpensesTitle: 'Monthly Expenses',
    monthlyIncomeTitle: 'Monthly Income',
    // Opérations
    operationsTitle: 'Add an Operation',
    operationDateLabel: 'Date',
    operationAmountLabel: 'Amount (€)',
    operationTypeLabel: 'Type',
    operationCategoryLabel: 'Category',
    operationDescriptionLabel: 'Description',
    submitButton: 'Add',
    operationsHistoryTitle: 'Operations History',
    // Tableau des opérations
    tableDate: 'Date',
    tableDescription: 'Description',
    tableCategory: 'Category',
    tableAmount: 'Amount',
    tableType: 'Type',
    tableActions: 'Actions',
    // Budgets
    budgetsTitle: 'Budget Management',
    budgetCategoryLabel: 'Category',
    budgetAmountLabel: 'Monthly Budget (€)',
    budgetSubmitButton: 'Add',
    budgetsListTitle: 'Budgets List',
    tableBudgetCategory: 'Category',
    tableBudgetAmount: 'Monthly Budget',
    tableBudgetSpent: 'Spent',
    tableBudgetRemaining: 'Remaining',
    tableBudgetActions: 'Actions',
    // Suggestions
    suggestionsTitle: 'Suggestions',
    // Pied de page
    footerText: 'BudgetTrack - Manual and local budget management | ',
    exportButton: 'Export to CSV',
    // Types d'opérations
    expense: 'Expense',
    income: 'Income',
    // Catégories par défaut
    categories: {
      Courses: '🛒 Groceries',
      Loisirs: '🎮 Leisure',
      Loyer: '🏠 Rent',
      AAH: '💰 AAH',
      Transport: '🚗 Transport',
      Santé: '🏥 Health',
      Épargne: '💸 Savings',
      Autres: '📌 Others',
    },
    // Messages de suggestions
    budgetExceeded: 'You exceeded your budget for ',
    byAmount: ' by ',
    moreThanLastMonth: 'You spent % more than last month.',
    lessThanLastMonth: 'You spent % less than last month.',
    topCategory: 'You spent the most in ',
    savingsSuggestion: 'Your current balance is % €. Consider saving some!',
  },
}

// ===== VARIABLE GLOBALE POUR LA LANGUE =====
let currentLanguage = localStorage.getItem('language') || 'fr'

// ===== FONCTION POUR CHANGER DE LANGUE =====
function setLanguage(lang) {
  currentLanguage = lang
  localStorage.setItem('language', lang)
  updateLanguage()
}

// ===== MISE À JOUR DE LA LANGUE =====
function updateLanguage() {
  // Mettre à jour tous les éléments traduisibles
  const translatableElements = {
    'app-title': translations[currentLanguage].appTitle,
    'nav-dashboard': translations[currentLanguage].navDashboard,
    'nav-operations': translations[currentLanguage].navOperations,
    'nav-budgets': translations[currentLanguage].navBudgets,
    'nav-suggestions': translations[currentLanguage].navSuggestions,
    'dashboard-title': translations[currentLanguage].dashboardTitle,
    'current-balance-title': translations[currentLanguage].currentBalanceTitle,
    'monthly-expenses-title':
      translations[currentLanguage].monthlyExpensesTitle,
    'monthly-income-title': translations[currentLanguage].monthlyIncomeTitle,
    'operations-title': translations[currentLanguage].operationsTitle,
    'operation-date-label': translations[currentLanguage].operationDateLabel,
    'operation-amount-label':
      translations[currentLanguage].operationAmountLabel,
    'operation-type-label': translations[currentLanguage].operationTypeLabel,
    'operation-category-label':
      translations[currentLanguage].operationCategoryLabel,
    'operation-description-label':
      translations[currentLanguage].operationDescriptionLabel,
    'submit-button': translations[currentLanguage].submitButton,
    'operations-history-title':
      translations[currentLanguage].operationsHistoryTitle,
    'table-date': translations[currentLanguage].tableDate,
    'table-description': translations[currentLanguage].tableDescription,
    'table-category': translations[currentLanguage].tableCategory,
    'table-amount': translations[currentLanguage].tableAmount,
    'table-type': translations[currentLanguage].tableType,
    'table-actions': translations[currentLanguage].tableActions,
    'budgets-title': translations[currentLanguage].budgetsTitle,
    'budget-category-label': translations[currentLanguage].budgetCategoryLabel,
    'budget-amount-label': translations[currentLanguage].budgetAmountLabel,
    'budget-submit-button': translations[currentLanguage].budgetSubmitButton,
    'budgets-list-title': translations[currentLanguage].budgetsListTitle,
    'table-budget-category': translations[currentLanguage].tableBudgetCategory,
    'table-budget-amount': translations[currentLanguage].tableBudgetAmount,
    'table-budget-spent': translations[currentLanguage].tableBudgetSpent,
    'table-budget-remaining':
      translations[currentLanguage].tableBudgetRemaining,
    'table-budget-actions': translations[currentLanguage].tableBudgetActions,
    'suggestions-title': translations[currentLanguage].suggestionsTitle,
    'footer-text':
      translations[currentLanguage].footerText +
      ' <button id="export-button">' +
      translations[currentLanguage].exportButton +
      '</button>',
    'expense-option': translations[currentLanguage].expense,
    'income-option': translations[currentLanguage].income,
    'export-button': translations[currentLanguage].exportButton,
  }

  for (const [id, text] of Object.entries(translatableElements)) {
    const element = document.getElementById(id)
    if (element) {
      if (id === 'footer-text') {
        element.innerHTML = text
      } else {
        element.textContent = text
      }
    }
  }

  // Mettre à jour les options de type d'opération
  const typeSelect = document.getElementById('operation-type')
  if (typeSelect) {
    typeSelect.innerHTML = `
            <option value="expense">${translations[currentLanguage].expense}</option>
            <option value="income">${translations[currentLanguage].income}</option>
        `
  }

  // Mettre à jour les boutons de langue
  document
    .getElementById('fr-button')
    .classList.toggle('active', currentLanguage === 'fr')
  document
    .getElementById('en-button')
    .classList.toggle('active', currentLanguage === 'en')

  // Mettre à jour les catégories avec les icônes
  updateCategorySelect()

  // Mettre à jour les suggestions
  renderSuggestions()
}

// ===== INITIALISATION DES BOUTONS DE LANGUE =====
function initLanguageToggle() {
  const frButton = document.getElementById('fr-button')
  const enButton = document.getElementById('en-button')

  frButton.addEventListener('click', () => setLanguage('fr'))
  enButton.addEventListener('click', () => setLanguage('en'))

  // Appliquer la langue sauvegardée
  updateLanguage()
}
