const balance = document.getElementById('balance'),
      money_plus = document.getElementById('money-plus'),
      money_minus = document.getElementById('money-minus'),
      list = document.getElementById('list'),
      form = document.getElementById('form'),
      text = document.getElementById('text'),
      amount = document.getElementById('amount');
    
// Create a Data array of Objects
// const dummyTransactions = [
//   { id:1, text: 'Flowers', amount: -20 },
//   { id:2, text: 'Salary', amount: 300 },
//   { id:3, text: 'Book', amount: -10 },
//   { id:4, text: 'Camera', amount: 150 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Pleae add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };
    
    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updatetoLocalStorage();

    text.value = '';
    amount.value = '';
  }

}

// Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}


// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get Sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add Class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)} </span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, Income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  // console.log(amounts)

  // Sum the Total amount
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // console.log(total)

  // Get Income
  const income = amounts
                      .filter(item => item > 0 )
                      .reduce((acc, item) => (acc += item), 0)
                      .toFixed(2);
  // console.log(income)

  // Getting Expense
  const expense = (amounts
                      .filter(item => item < 0)
                      .reduce((acc, item) => (acc += item), 0 ) * -1).toFixed(2);
    // console.log(expense)

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove Transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updatetoLocalStorage();

  init()
}

// Update Local storage Transactions
function updatetoLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init App
function init() {
  list.innerHTML = ``;

  transactions.forEach(addTransactionDOM);
  updateValues()
}

init()

// Add Event Listener
form.addEventListener('submit', addTransaction);