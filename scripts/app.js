// ===== VARIABLES GLOBALES =====
let operations = JSON.parse(localStorage.getItem('operations')) || []
let budgets = JSON.parse(localStorage.getItem('budgets')) || []
let categories = JSON.parse(localStorage.getItem('categories')) || [
  'Courses',
  'Loisirs',
  'Loyer',
  'AAH',
  'Transport',
  'Santé',
  'Épargne',
  'Autres',
]
let chart // Variable globale pour le graphique

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  initNavigation()
  initThemeToggle()
  initLanguageToggle()
  initForms()
  loadData()
  updateDashboard()
  renderOperations()
  renderBudgets()
  renderSuggestions()
  updateCategorySelect()
  initChart()
})

// ===== NAVIGATION =====
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-button')
  const sections = document.querySelectorAll('.section')

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      navButtons.forEach((btn) => btn.classList.remove('active'))
      sections.forEach((section) => section.classList.remove('active'))

      button.classList.add('active')
      const sectionId = button.getAttribute('data-section')
      document.getElementById(sectionId).classList.add('active')

      if (sectionId === 'dashboard') {
        updateDashboard()
        updateChart()
      }
      if (sectionId === 'operations') renderOperations()
      if (sectionId === 'budgets') renderBudgets()
      if (sectionId === 'suggestions') renderSuggestions()
    })
  })
}

// ===== THÈME =====
function initThemeToggle() {
  const themeButton = document.getElementById('theme-button')
  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'synthwave' ? 'light' : 'synthwave'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    updateChart() // Mettre à jour le graphique avec le nouveau thème
  })

  const savedTheme = localStorage.getItem('theme') || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)
}

// ===== LANGUE =====
function initLanguageToggle() {
  const frButton = document.getElementById('fr-button')
  const enButton = document.getElementById('en-button')

  frButton.addEventListener('click', () => {
    setLanguage('fr')
  })
  enButton.addEventListener('click', () => {
    setLanguage('en')
  })

  const savedLanguage = localStorage.getItem('language') || 'fr'
  setLanguage(savedLanguage)
}

// ===== FORMULAIRES =====
function initForms() {
  const operationForm = document.getElementById('operation-form')
  operationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addOperation()
  })

  const budgetForm = document.getElementById('budget-form')
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addBudget()
  })

  const exportButton = document.getElementById('export-button')
  exportButton.addEventListener('click', exportToCSV)
}

// ===== CHARGEMENT DES DONNÉES =====
function loadData() {
  operations = JSON.parse(localStorage.getItem('operations')) || []
  budgets = JSON.parse(localStorage.getItem('budgets')) || []
  categories = JSON.parse(localStorage.getItem('categories')) || [
    'Courses',
    'Loisirs',
    'Loyer',
    'AAH',
    'Transport',
    'Santé',
    'Épargne',
    'Autres',
  ]
}

// ===== MISE À JOUR DU TABLEAU DE BORD =====
function updateDashboard() {
  const currentBalance = calculateCurrentBalance()
  const monthlyExpenses = calculateMonthlyExpenses()
  const monthlyIncome = calculateMonthlyIncome()

  document.getElementById('current-balance').textContent =
    `${currentBalance.toFixed(2)} €`
  document.getElementById('monthly-expenses').textContent =
    `${monthlyExpenses.toFixed(2)} €`
  document.getElementById('monthly-income').textContent =
    `${monthlyIncome.toFixed(2)} €`
}

// ===== CALCULS UTILES =====
function calculateCurrentBalance() {
  let balance = 0
  operations.forEach((op) => {
    balance += op.type === 'income' ? op.amount : -op.amount
  })
  return balance
}

function calculateMonthlyExpenses() {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return operations
    .filter((op) => {
      const opDate = new Date(op.date)
      return (
        opDate.getMonth() === currentMonth &&
        opDate.getFullYear() === currentYear &&
        op.type === 'expense'
      )
    })
    .reduce((total, op) => total + op.amount, 0)
}

function calculateMonthlyIncome() {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return operations
    .filter((op) => {
      const opDate = new Date(op.date)
      return (
        opDate.getMonth() === currentMonth &&
        opDate.getFullYear() === currentYear &&
        op.type === 'income'
      )
    })
    .reduce((total, op) => total + op.amount, 0)
}

// ===== EXPORT CSV =====
function exportToCSV() {
  const csv = convertToCSV(operations)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'budgettrack_export.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function convertToCSV(data) {
  const headers = ['Date', 'Description', 'Catégorie', 'Montant', 'Type']
  const rows = data.map((op) => [
    op.date,
    op.description || '',
    op.category,
    op.amount,
    op.type,
  ])

  return [headers, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(','))
    .join('\n')
}

// ===== MISE À JOUR DU SELECT DES CATÉGORIES =====
function updateCategorySelect() {
  const categorySelect = document.getElementById('operation-category')
  categorySelect.innerHTML = ''

  categories.forEach((category) => {
    const option = document.createElement('option')
    option.value = category
    // Ajouter l'icône et le nom de la catégorie
    const categoryName =
      translations[currentLanguage].categories[category] || category
    option.textContent = categoryName
    categorySelect.appendChild(option)
  })
}

// ===== GRAPHIQUE =====
function initChart() {
  const ctx = document.getElementById('budget-chart')
  if (!ctx) return

  // Couleurs adaptées au thème
  const theme = document.documentElement.getAttribute('data-theme')
  const backgroundColor =
    theme === 'synthwave' ? 'rgba(255, 42, 109, 0.2)' : 'rgba(0, 123, 255, 0.2)'
  const borderColor =
    theme === 'synthwave' ? 'rgba(255, 42, 109, 1)' : 'rgba(0, 123, 255, 1)'
  const textColor = theme === 'synthwave' ? '#ffffff' : '#333333'

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: translations[currentLanguage].monthlyExpensesTitle,
          data: categories.map((category) =>
            calculateSpentForCategory(category),
          ),
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor,
          },
          grid: {
            color:
              theme === 'synthwave'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
          },
        },
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            color:
              theme === 'synthwave'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    },
  })
}

function updateChart() {
  if (!chart) return

  const theme = document.documentElement.getAttribute('data-theme')
  const backgroundColor =
    theme === 'synthwave' ? 'rgba(255, 42, 109, 0.2)' : 'rgba(0, 123, 255, 0.2)'
  const borderColor =
    theme === 'synthwave' ? 'rgba(255, 42, 109, 1)' : 'rgba(0, 123, 255, 1)'
  const textColor = theme === 'synthwave' ? '#ffffff' : '#333333'

  chart.data.datasets[0].data = categories.map((category) =>
    calculateSpentForCategory(category),
  )
  chart.data.datasets[0].backgroundColor = backgroundColor
  chart.data.datasets[0].borderColor = borderColor

  chart.options.scales.y.ticks.color = textColor
  chart.options.scales.x.ticks.color = textColor
  chart.options.scales.y.grid.color =
    theme === 'synthwave' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  chart.options.scales.x.grid.color =
    theme === 'synthwave' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  chart.options.plugins.legend.labels.color = textColor

  chart.update()
}

// ===== FONCTION POUR METTRE À JOUR LE GRAPHIQUE AVEC LES DONNÉES =====
function updateChartData() {
  if (chart) {
    chart.data.datasets[0].data = categories.map((category) =>
      calculateSpentForCategory(category),
    )
    chart.update()
  }
}
