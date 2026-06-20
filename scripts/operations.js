// ===== OPÉRATIONS =====
function addOperation() {
  const date = getRequiredValue('operation-date')
  const amount = parsePositiveAmount('operation-amount')
  const type = document.getElementById('operation-type').value
  const category = document.getElementById('operation-category').value
  const description = getRequiredValue('operation-description')

  if (!date || !category) {
    showValidationMessage(t('invalidRequired'))
    return
  }

  if (amount === null) {
    showValidationMessage(t('invalidPositiveAmount'))
    return
  }

  operations.push({
    id: createId(),
    date,
    amount,
    type,
    category,
    description,
  })

  saveOperations()
  document.getElementById('operation-form').reset()
  setDefaultOperationDate()
  refreshApp()
}

function deleteOperation(id) {
  operations = operations.filter((operation) => operation.id !== id)
  saveOperations()
  refreshApp()
}

function renderOperations() {
  const operationsList = document.getElementById('operations-list')
  const currentYear = new Date().getFullYear()
  const filteredOperations = operations
    .filter((operation) => new Date(operation.date).getFullYear() === currentYear)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  operationsList.replaceChildren()

  if (filteredOperations.length === 0) {
    operationsList.appendChild(createEmptyRow(6, t('noOperations')))
    return
  }

  filteredOperations.forEach((operation) => {
    operationsList.appendChild(createOperationRow(operation))
  })
}

function createOperationRow(operation) {
  const row = document.createElement('tr')
  const actionsCell = document.createElement('td')
  const amountCell = createTableCell(formatCurrency(operation.amount), 'amount-cell')

  amountCell.classList.add(operation.type === 'income' ? 'amount-income' : 'amount-expense')
  actionsCell.appendChild(
    createDeleteButton(t('deleteOperation'), () => deleteOperation(operation.id)),
  )

  row.appendChild(createTableCell(formatDate(operation.date)))
  row.appendChild(createTableCell(operation.description || '-'))
  row.appendChild(createTableCell(formatCategory(operation.category)))
  row.appendChild(amountCell)
  row.appendChild(createTableCell(operation.type === 'income' ? t('income') : t('expense')))
  row.appendChild(actionsCell)

  return row
}
