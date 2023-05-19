function addItem() {
    // Get the input values
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
  
    if (amount.trim() === '' || description.trim() === '' || category.trim() === '') {
      alert('Please enter all the fields.');
      return;
    }
  
    // Create a new expense object
    let expense = {
      amount: amount,
      description: description,
      category: category
    };
  
    // Get the existing expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Check if the expense already exists
    let existingIndex = expenses.findIndex(
      (item) =>
        item.amount === expense.amount &&
        item.description === expense.description &&
        item.category === expense.category
    );
  
    if (existingIndex !== -1) {
      // Expense already exists, update its values
      expenses[existingIndex] = expense;
    } else {
      // Expense doesn't exist, add it to the expenses array
      expenses.push(expense);
    }
  
    // Save the updated expenses array in localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh the table with the updated expenses
    displayExpenses();
  
    // Clear the input fields
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
  }
      // Function to display the expenses in the table
function displayExpenses() {
    let expenseList = document.getElementById('expense-list');
  
    // Clear the table body
    expenseList.innerHTML = '';
  
    // Get the expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Iterate over the expenses and create rows in the table
    for (let i = 0; i < expenses.length; i++) {
      let expense = expenses[i];
  
      // Create a new row for the expense
      let row = document.createElement('tr');
  
      // Create table cells for amount, description, and category
      let amountCell = document.createElement('td');
      amountCell.textContent = expense.amount;
  
      let descriptionCell = document.createElement('td');
      descriptionCell.textContent = expense.description;
  
      let categoryCell = document.createElement('td');
      categoryCell.textContent = expense.category;
  
      // Create table cell for delete button
      let deleteCell = document.createElement('td');
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.addEventListener('click', function() {
        deleteExpense(i);
      });
      deleteCell.appendChild(deleteButton);
  
      // Create table cell for edit button
      let editCell = document.createElement('td');
      let editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('btn', 'btn-primary');
      editButton.addEventListener('click', function() {
        editExpense(i);
      });
      editCell.appendChild(editButton);
  
      // Append the cells to the row
      row.appendChild(amountCell);
      row.appendChild(descriptionCell);
      row.appendChild(categoryCell);
      row.appendChild(deleteCell);
      row.appendChild(editCell);
  
      // Append the row to the expense list table body
      expenseList.appendChild(row);
    }
  }
  
  // Function to delete an expense
  function deleteExpense(index) {
    // Get the expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Remove the expense at the specified index
    expenses.splice(index, 1);
  
    // Save the updated expenses array in localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
  
    // Refresh the table with the updated expenses
    displayExpenses();
  }
  
 // Function to edit an expense
function editExpense(row) {
    // Get the expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Get the expense at the specified row
    let expense = expenses[row];
  
    let columns = ['amount', 'description', 'category'];
    let selectedColumn = prompt('Select the column to edit (amount, description, category):');
    selectedColumn = selectedColumn.toLowerCase();
  
    if (columns.includes(selectedColumn)) {
      let currentValue = expense[selectedColumn];
      let newValue = prompt('Enter the new value:', currentValue);
  
      if (newValue !== null) {
        // User clicked "OK" in the prompt
        // Set the new value for the selected column
        expense[selectedColumn] = newValue;
  
        // Update the expense in the expenses array
        expenses[row] = expense;
  
        // Save the updated expenses array in localStorage
        localStorage.setItem('expenses', JSON.stringify(expenses));
  
        // Refresh the table with the updated expenses
        displayExpenses();
      }
    } else {
      alert('Invalid column selection. Please try again.');
    }
  }
  // Call displayExpenses on page load to populate the table
  displayExpenses();
  
