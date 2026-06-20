// ===== TRADUCTIONS =====
const translations = {
  fr: {
    appTitle: 'bank-wave',
    documentTitle: 'bank-wave - Budget local',
    navDashboard: 'Tableau de bord',
    navOperations: 'Opérations',
    navBudgets: 'Budgets',
    navSuggestions: 'Suggestions',
    dashboardTitle: 'Tableau de bord',
    currentBalanceTitle: 'Solde actuel',
    monthlyExpensesTitle: 'Dépenses ce mois',
    monthlyIncomeTitle: 'Revenus ce mois',
    operationsTitle: 'Ajouter une opération',
    operationDateLabel: 'Date',
    operationAmountLabel: 'Montant (€)',
    operationTypeLabel: 'Type',
    operationCategoryLabel: 'Catégorie',
    operationDescriptionLabel: 'Description',
    submitButton: 'Ajouter',
    operationsHistoryTitle: 'Historique des opérations',
    tableDate: 'Date',
    tableDescription: 'Description',
    tableCategory: 'Catégorie',
    tableAmount: 'Montant',
    tableType: 'Type',
    tableActions: 'Actions',
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
    suggestionsTitle: 'Suggestions',
    footerText: 'bank-wave - Gestion manuelle et locale de ton budget',
    exportButton: 'Exporter en CSV',
    expense: 'Dépense',
    income: 'Revenu',
    delete: 'Supprimer',
    deleteOperation: 'Supprimer cette opération',
    deleteBudget: 'Supprimer ce budget',
    noOperations: 'Aucune opération enregistrée pour cette année.',
    noBudgets: 'Aucun budget défini.',
    noSuggestions: 'Aucune suggestion pour le moment.',
    invalidRequired: 'Veuillez remplir tous les champs obligatoires.',
    invalidPositiveAmount: 'Le montant doit être supérieur à 0.',
    categories: {
      Courses: 'Courses',
      Loisirs: 'Loisirs',
      Loyer: 'Loyer',
      AAH: 'AAH',
      Transport: 'Transport',
      Santé: 'Santé',
      Épargne: 'Épargne',
      Autres: 'Autres',
    },
    categoryIcons: {
      Courses: '🛒',
      Loisirs: '🎮',
      Loyer: '🏠',
      AAH: '💰',
      Transport: '🚗',
      Santé: '🏥',
      Épargne: '💸',
      Autres: '📌',
    },
    budgetExceededTitle: 'Budget dépassé',
    expensesUpTitle: 'Dépenses en hausse',
    expensesDownTitle: 'Dépenses en baisse',
    topCategoryTitle: 'Catégorie la plus dépensière',
    savingsTitle: 'Épargne possible',
    budgetExceeded: 'Tu as dépassé ton budget pour',
    byAmount: 'de',
    moreThanLastMonth: 'Tu as dépensé % de plus que le mois dernier.',
    lessThanLastMonth: 'Tu as dépensé % de moins que le mois dernier.',
    topCategory: 'Tu as dépensé le plus dans',
    savingsSuggestion:
      'Ton solde actuel est de %. Pense à épargner une partie.',
  },
  en: {
    appTitle: 'bank-wave',
    documentTitle: 'bank-wave - Local budget',
    navDashboard: 'Dashboard',
    navOperations: 'Operations',
    navBudgets: 'Budgets',
    navSuggestions: 'Suggestions',
    dashboardTitle: 'Dashboard',
    currentBalanceTitle: 'Current Balance',
    monthlyExpensesTitle: 'Monthly Expenses',
    monthlyIncomeTitle: 'Monthly Income',
    operationsTitle: 'Add an Operation',
    operationDateLabel: 'Date',
    operationAmountLabel: 'Amount (€)',
    operationTypeLabel: 'Type',
    operationCategoryLabel: 'Category',
    operationDescriptionLabel: 'Description',
    submitButton: 'Add',
    operationsHistoryTitle: 'Operations History',
    tableDate: 'Date',
    tableDescription: 'Description',
    tableCategory: 'Category',
    tableAmount: 'Amount',
    tableType: 'Type',
    tableActions: 'Actions',
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
    suggestionsTitle: 'Suggestions',
    footerText: 'bank-wave - Manual and local budget management',
    exportButton: 'Export to CSV',
    expense: 'Expense',
    income: 'Income',
    delete: 'Delete',
    deleteOperation: 'Delete this operation',
    deleteBudget: 'Delete this budget',
    noOperations: 'No operations recorded for this year.',
    noBudgets: 'No budgets defined.',
    noSuggestions: 'No suggestions at the moment.',
    invalidRequired: 'Please fill in all required fields.',
    invalidPositiveAmount: 'Amount must be greater than 0.',
    categories: {
      Courses: 'Groceries',
      Loisirs: 'Leisure',
      Loyer: 'Rent',
      AAH: 'AAH',
      Transport: 'Transport',
      Santé: 'Health',
      Épargne: 'Savings',
      Autres: 'Other',
    },
    categoryIcons: {
      Courses: '🛒',
      Loisirs: '🎮',
      Loyer: '🏠',
      AAH: '💰',
      Transport: '🚗',
      Santé: '🏥',
      Épargne: '💸',
      Autres: '📌',
    },
    budgetExceededTitle: 'Budget Exceeded',
    expensesUpTitle: 'Expenses Up',
    expensesDownTitle: 'Expenses Down',
    topCategoryTitle: 'Top Spending Category',
    savingsTitle: 'Savings Opportunity',
    budgetExceeded: 'You exceeded your budget for',
    byAmount: 'by',
    moreThanLastMonth: 'You spent % more than last month.',
    lessThanLastMonth: 'You spent % less than last month.',
    topCategory: 'You spent the most in',
    savingsSuggestion: 'Your current balance is %. Consider saving some.',
  },
}

// ===== ÉTAT DE LANGUE =====
let currentLanguage = localStorage.getItem('language') || 'fr'

// ===== OUTILS DE TRADUCTION =====
function t(key) {
  return translations[currentLanguage][key] || key
}

function getCategoryLabel(category) {
  return translations[currentLanguage].categories[category] || category
}

function getCategoryIcon(category) {
  return translations[currentLanguage].categoryIcons[category] || '•'
}

function formatCategory(category) {
  return `${getCategoryIcon(category)} ${getCategoryLabel(category)}`
}

function setLanguage(lang) {
  currentLanguage = translations[lang] ? lang : 'fr'
  localStorage.setItem('language', currentLanguage)
  updateLanguage()
}

function updateLanguage() {
  document.documentElement.lang = currentLanguage
  document.title = t('documentTitle')

  const textById = {
    'app-title': t('appTitle'),
    'nav-dashboard': t('navDashboard'),
    'nav-operations': t('navOperations'),
    'nav-budgets': t('navBudgets'),
    'nav-suggestions': t('navSuggestions'),
    'dashboard-title': t('dashboardTitle'),
    'current-balance-title': t('currentBalanceTitle'),
    'monthly-expenses-title': t('monthlyExpensesTitle'),
    'monthly-income-title': t('monthlyIncomeTitle'),
    'operations-title': t('operationsTitle'),
    'operation-date-label': t('operationDateLabel'),
    'operation-amount-label': t('operationAmountLabel'),
    'operation-type-label': t('operationTypeLabel'),
    'operation-category-label': t('operationCategoryLabel'),
    'operation-description-label': t('operationDescriptionLabel'),
    'submit-button': t('submitButton'),
    'operations-history-title': t('operationsHistoryTitle'),
    'table-date': t('tableDate'),
    'table-description': t('tableDescription'),
    'table-category': t('tableCategory'),
    'table-amount': t('tableAmount'),
    'table-type': t('tableType'),
    'table-actions': t('tableActions'),
    'budgets-title': t('budgetsTitle'),
    'budget-category-label': t('budgetCategoryLabel'),
    'budget-amount-label': t('budgetAmountLabel'),
    'budget-submit-button': t('budgetSubmitButton'),
    'budgets-list-title': t('budgetsListTitle'),
    'table-budget-category': t('tableBudgetCategory'),
    'table-budget-amount': t('tableBudgetAmount'),
    'table-budget-spent': t('tableBudgetSpent'),
    'table-budget-remaining': t('tableBudgetRemaining'),
    'table-budget-actions': t('tableBudgetActions'),
    'suggestions-title': t('suggestionsTitle'),
    'footer-text': t('footerText'),
    'export-button': t('exportButton'),
    'expense-option': t('expense'),
    'income-option': t('income'),
  }

  Object.entries(textById).forEach(([id, text]) => {
    const element = document.getElementById(id)
    if (element) element.textContent = text
  })

  document
    .getElementById('fr-button')
    ?.classList.toggle('active', currentLanguage === 'fr')
  document
    .getElementById('en-button')
    ?.classList.toggle('active', currentLanguage === 'en')

  updateCategorySelect?.()
  renderOperations?.()
  renderBudgets?.()
  renderSuggestions?.()
  updateChart?.()
}
