// ===== AJOUT D'UNE OPÉRATION =====
function addOperation() {
  const date = document.getElementById('operation-date').value
  const amount = parseFloat(document.getElementById('operation-amount').value)
  const type = document.getElementById('operation-type').value
  const category = document.getElementById('operation-category').value
  const description =
    document.getElementById('operation-description').value || ''

  if (!date || isNaN(amount) || !category) {
    alert(
      currentLanguage === 'fr'
        ? 'Veuillez remplir tous les champs obligatoires.'
        : 'Please fill in all required fields.',
    )
    return
  }

  const newOperation = {
    id: Date.now(),
    date,
    amount,
    type,
    category,
    description,
  }

  operations.push(newOperation)
  saveOperations()

  document.getElementById('operation-form').reset()
  renderOperations()
  updateDashboard()
  updateChartData()
  renderSuggestions()
}

// ===== SUPPRESSION D'UNE OPÉRATION =====
function deleteOperation(id) {
  operations = operations.filter((op) => op.id !== id)
  saveOperations()
  renderOperations()
  updateDashboard()
  updateChartData()
  renderSuggestions()
}

// ===== SAUVEGARDE DES OPÉRATIONS =====
function saveOperations() {
  localStorage.setItem('operations', JSON.stringify(operations))
}

// ===== RENDU DES OPÉRATIONS =====
function renderOperations() {
  const operationsList = document.getElementById('operations-list')
  operationsList.innerHTML = ''

  const now = new Date()
  const currentYear = now.getFullYear()

  const filteredOperations = operations.filter((op) => {
    const opDate = new Date(op.date)
    return opDate.getFullYear() === currentYear
  })

  if (filteredOperations.length === 0) {
    operationsList.innerHTML = `<tr><td colspan="6">${currentLanguage === 'fr' ? 'Aucune opération enregistrée.' : 'No operations recorded.'}</td></tr>`
    return
  }

  filteredOperations.forEach((op) => {
    const row = document.createElement('tr')
    const categoryName =
      translations[currentLanguage].categories[op.category] || op.category
    const typeName =
      op.type === 'income'
        ? translations[currentLanguage].income
        : translations[currentLanguage].expense

    row.innerHTML = `
            <td>${formatDate(op.date)}</td>
            <td>${op.description || '-'}</td>
            <td><span class="category-icon">${categoryName}</span></td>
            <td>${op.amount.toFixed(2)} €</td>
            <td>${typeName}</td>
            <td><button onclick="deleteOperation(${op.id})" class="delete-button">❌</button></td>
        `
    operationsList.appendChild(row)
  })
}

// ===== FORMATAGE DE DATE =====
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US')
}
