// ===== CONFIGURATION & ÉTAT GLOBAL =====
const DEFAULT_CATEGORIES = [
  'Courses',
  'Loisirs',
  'Loyer',
  'AAH',
  'Transport',
  'Santé',
  'Épargne',
  'Autres',
]

let operations = readLocalCollection('operations', [])
let budgets = readLocalCollection('budgets', [])
let categories = readLocalCollection('categories', DEFAULT_CATEGORIES)
let chart

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  initNavigation()
  initThemeToggle()
  initLanguageToggle()
  initForms()
  setDefaultOperationDate()
  updateLanguage()
  refreshApp()
  initChart()
})

// ===== NAVIGATION =====
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-button')
  const sections = document.querySelectorAll('.section')

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const sectionId = button.dataset.section

      navButtons.forEach((btn) => btn.classList.remove('active'))
      sections.forEach((section) => section.classList.remove('active'))

      button.classList.add('active')
      document.getElementById(sectionId)?.classList.add('active')
      refreshVisibleSection(sectionId)
    })
  })
}

function refreshVisibleSection(sectionId) {
  if (sectionId === 'dashboard') {
    updateDashboard()
    updateChart()
  }

  if (sectionId === 'operations') renderOperations()
  if (sectionId === 'budgets') renderBudgets()
  if (sectionId === 'suggestions') renderSuggestions()
}

// ===== THÈME =====
function initThemeToggle() {
  const themeButton = document.getElementById('theme-button')
  const savedTheme = localStorage.getItem('theme') || 'light'

  document.documentElement.setAttribute('data-theme', savedTheme)

  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'synthwave' ? 'light' : 'synthwave'

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    updateChart()
  })
}

// ===== LANGUE =====
function initLanguageToggle() {
  document.getElementById('fr-button').addEventListener('click', () => {
    setLanguage('fr')
  })

  document.getElementById('en-button').addEventListener('click', () => {
    setLanguage('en')
  })
}

// ===== FORMULAIRES =====
function initForms() {
  document.getElementById('operation-form').addEventListener('submit', (event) => {
    event.preventDefault()
    addOperation()
  })

  document.getElementById('budget-form').addEventListener('submit', (event) => {
    event.preventDefault()
    addBudget()
  })

  document.getElementById('export-button').addEventListener('click', exportToCSV)
}

function setDefaultOperationDate() {
  const dateInput = document.getElementById('operation-date')
  if (!dateInput.value) dateInput.value = new Date().toISOString().slice(0, 10)
}

// ===== STOCKAGE =====
function readLocalCollection(key, fallback) {
  try {
    const storedValue = JSON.parse(localStorage.getItem(key))
    return Array.isArray(storedValue) ? storedValue : [...fallback]
  } catch {
    return [...fallback]
  }
}

function saveOperations() {
  localStorage.setItem('operations', JSON.stringify(operations))
}

function saveBudgets() {
  localStorage.setItem('budgets', JSON.stringify(budgets))
}

function saveCategories() {
  localStorage.setItem('categories', JSON.stringify(categories))
}

// ===== RAFRAÎCHISSEMENT GLOBAL =====
function refreshApp() {
  updateCategorySelect()
  updateDashboard()
  renderOperations()
  renderBudgets()
  renderSuggestions()
  updateChartData()
}

function refreshAfterDataChange() {
  saveOperations()
  saveBudgets()
  saveCategories()
  refreshApp()
}

// ===== TABLEAU DE BORD =====
function updateDashboard() {
  document.getElementById('current-balance').textContent = formatCurrency(
    calculateCurrentBalance(),
  )
  document.getElementById('monthly-expenses').textContent = formatCurrency(
    calculateMonthlyExpenses(),
  )
  document.getElementById('monthly-income').textContent = formatCurrency(
    calculateMonthlyIncome(),
  )
}

// ===== CALCULS =====
function calculateCurrentBalance() {
  return operations.reduce((balance, operation) => {
    return balance + (operation.type === 'income' ? operation.amount : -operation.amount)
  }, 0)
}

function calculateMonthlyExpenses() {
  return sumOperationsForCurrentMonth('expense')
}

function calculateMonthlyIncome() {
  return sumOperationsForCurrentMonth('income')
}

function sumOperationsForCurrentMonth(type) {
  const { month, year } = getCurrentMonthContext()

  return operations
    .filter((operation) => {
      const operationDate = new Date(operation.date)
      return (
        operation.type === type &&
        operationDate.getMonth() === month &&
        operationDate.getFullYear() === year
      )
    })
    .reduce((total, operation) => total + operation.amount, 0)
}

function getCurrentMonthContext() {
  const now = new Date()
  return {
    month: now.getMonth(),
    year: now.getFullYear(),
  }
}

// ===== FORMATAGE & VALIDATION =====
function parsePositiveAmount(inputId) {
  const value = Number.parseFloat(document.getElementById(inputId).value)
  return Number.isFinite(value) && value > 0 ? value : null
}

function getRequiredValue(inputId) {
  return document.getElementById(inputId).value.trim()
}

function showValidationMessage(message) {
  window.alert(message)
}

function formatCurrency(amount) {
  return new Intl.NumberFormat(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')
}

function createTableCell(text, className) {
  const cell = document.createElement('td')
  cell.textContent = text
  if (className) cell.className = className
  return cell
}

function createEmptyRow(columnCount, message) {
  const row = document.createElement('tr')
  const cell = document.createElement('td')

  cell.colSpan = columnCount
  cell.className = 'empty-state'
  cell.textContent = message
  row.appendChild(cell)

  return row
}

function createDeleteButton(label, onClick) {
  const button = document.createElement('button')

  button.type = 'button'
  button.className = 'delete-button'
  button.setAttribute('aria-label', label)
  button.title = label
  button.textContent = '×'
  button.addEventListener('click', onClick)

  return button
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// ===== EXPORT CSV =====
function exportToCSV() {
  const csv = convertToCSV(operations)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `bank-wave-export-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()

  URL.revokeObjectURL(url)
}

function convertToCSV(data) {
  const headers = ['Date', 'Description', 'Catégorie', 'Montant', 'Type']
  const rows = data.map((operation) => [
    operation.date,
    operation.description || '',
    operation.category,
    operation.amount,
    operation.type,
  ])

  return [headers, ...rows]
    .map((row) => row.map(escapeCSVField).join(','))
    .join('\n')
}

function escapeCSVField(field) {
  return `"${String(field).replace(/"/g, '""')}"`
}

// ===== CATÉGORIES =====
function updateCategorySelect() {
  const categorySelect = document.getElementById('operation-category')
  const currentValue = categorySelect.value

  categorySelect.replaceChildren()

  categories.forEach((category) => {
    const option = document.createElement('option')

    option.value = category
    option.textContent = formatCategory(category)
    categorySelect.appendChild(option)
  })

  if (categories.includes(currentValue)) categorySelect.value = currentValue
}

function registerCategory(category) {
  const normalizedCategory = category.trim()
  const existingCategory = categories.find(
    (item) => item.toLowerCase() === normalizedCategory.toLowerCase(),
  )

  if (existingCategory) return existingCategory

  categories.push(normalizedCategory)
  saveCategories()

  return normalizedCategory
}

// ===== GRAPHIQUE =====
function initChart() {
  chart = document.getElementById('budget-chart')
  updateChart()
}

function updateChart() {
  if (!chart) return

  const values = categories.map((category) => ({
    category,
    spent: calculateSpentForCategory(category),
  }))
  const maxSpent = Math.max(...values.map((item) => item.spent), 1)

  chart.replaceChildren()

  values.forEach((item) => {
    chart.appendChild(createChartBar(item, maxSpent))
  })
}

function updateChartData() {
  updateChart()
}

function createChartBar(item, maxSpent) {
  const row = document.createElement('div')
  const meta = document.createElement('div')
  const label = document.createElement('span')
  const value = document.createElement('strong')
  const track = document.createElement('div')
  const fill = document.createElement('span')
  const width = item.spent === 0 ? 0 : Math.max((item.spent / maxSpent) * 100, 2)

  row.className = 'budget-bar-row'
  meta.className = 'budget-bar-meta'
  label.textContent = formatCategory(item.category)
  value.textContent = formatCurrency(item.spent)
  track.className = 'budget-bar-track'
  fill.className = 'budget-bar-fill'
  fill.style.width = `${width}%`

  meta.append(label, value)
  track.appendChild(fill)
  row.append(meta, track)

  return row
}
