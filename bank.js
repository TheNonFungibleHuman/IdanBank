"use strict";
// Define the User class to represent a bank customer
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.accounts = [];
    }
    // Add a new account for the user
    addAccount(account) {
        this.accounts.push(account);
    }
    // Get the user's account balance
    getAccountBalance(accountId) {
        const account = this.accounts.find((acc) => acc.getId() === accountId);
        if (account) {
            return account.getBalance();
        }
        return null;
    }
    // Make a deposit to the user's account
    depositToAccount(accountId, amount, notes = "") {
        const account = this.accounts.find((acc) => acc.getId() === accountId);
        if (account) {
            const transaction = account.deposit(amount, notes);
            return transaction;
        }
        return null;
    }
    // Make a withdrawal from the user's account
    withdrawFromAccount(accountId, amount, notes = "") {
        const account = this.accounts.find((acc) => acc.getId() === accountId);
        if (account) {
            const transaction = account.withdraw(amount, notes);
            return transaction;
        }
        return null;
    }
    // Transfer funds between the user's accounts
    transferFunds(fromAccountId, toAccountId, amount, notes = "") {
        const fromAccount = this.accounts.find((acc) => acc.getId() === fromAccountId);
        const toAccount = this.accounts.find((acc) => acc.getId() === toAccountId);
        if (fromAccount && toAccount) {
            const transaction1 = fromAccount.withdraw(amount, notes);
            const transaction2 = toAccount.deposit(amount, notes);
            return transaction1;
        }
        return null;
    }
    // Get the user's transaction history
    getTransactionHistory() {
        let transactions = [];
        this.accounts.forEach((account) => {
            transactions = transactions.concat(account.getTransactionHistory());
        });
        transactions.sort((a, b) => b.getDate().getTime() - a.getDate().getTime());
        return transactions;
    }
}
// Define the Account class to represent a bank account
class Account {
    constructor(type, initialBalance) {
        this.id = `account-${++Account.idCounter}`;
        this.type = type;
        this.balance = initialBalance;
        this.transactions = [];
    }
    // Get the account ID
    getId() {
        return this.id;
    }
    // Get the account type
    getType() {
        return this.type;
    }
    // Get the account balance
    getBalance() {
        return this.balance;
    }
    // Get the account's transaction history
    getTransactionHistory() {
        return this.transactions;
    }
    // Make a deposit to the account
    deposit(amount, notes = "") {
        const transaction = new Transaction(this.id, "Deposit", amount, notes);
        this.balance += amount;
        this.transactions.push(transaction);
        return transaction;
    }
    // Make a withdrawal from the account
    withdraw(amount, notes = "") {
        if (this.balance >= amount) {
            const transaction = new Transaction(this.id, "Withdrawal", amount, notes);
            this.balance -= amount;
            this.transactions.push(transaction);
            return transaction;
        }
        return null;
    }
}
Account.idCounter = 0;
// Define the Transaction class to represent a bank transaction
class Transaction {
    constructor(accountId, type, amount, notes = "") {
        this.accountId = accountId;
        this.date = new Date();
        this.type = type;
        this.amount = amount;
        this.notes = notes;
    }
    // Get the account ID associated with the transaction
    getAccountId() {
        return this.accountId;
    }
    // Get the transaction date
    getDate() {
        return this.date;
    }
    // Get the transaction type
    getType() {
        return this.type;
    }
    // Get the transaction amount
    getAmount() {
        return this.amount;
    }
    // Get the transaction notes
    getNotes() {
        return this.notes;
    }
}
// Initialize the banking system
const user = new User("John Doe", "johndoe@example.com", "password");
const checkingAccount = new Account("Checking", 500);
const savingsAccount = new Account("Savings", 1000);
user.addAccount(checkingAccount);
user.addAccount(savingsAccount);
// Define the DOM elements
const depositForm = document.querySelector("#deposit-form");
const depositAmountInput = document.querySelector("#deposit-amount");
const depositNotesInput = document.querySelector("#deposit-notes");
const withdrawForm = document.querySelector("#withdraw-form");
const withdrawAmountInput = document.querySelector("#withdraw-amount");
const withdrawNotesInput = document.querySelector("#withdraw-notes");
const transferForm = document.querySelector("#transfer-form");
const transferFromAccountInput = document.querySelector("#transfer-from-account");
const transferToAccountInput = document.querySelector("#transfer-to-account");
const transferAmountInput = document.querySelector("#transfer-amount");
const transferNotesInput = document.querySelector("#transfer-notes");
const transactionHistoryTable = document.querySelector("#transaction-history-table tbody");
// Define the event listeners for the deposit form
depositForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(depositAmountInput.value);
    const notes = depositNotesInput.value;
    const transaction = user.depositToAccount(checkingAccount.getId(), amount, notes);
    if (transaction) {
        alert(`Deposit of $${amount.toFixed(2)} successful!`);
        depositAmountInput.value = "";
        depositNotesInput.value = "";
        updateTransactionHistory();
    }
    else {
        alert("Deposit failed. Please try again later.");
    }
});
// Define the event listeners for the withdraw form
withdrawForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(withdrawAmountInput.value);
    const notes = withdrawNotesInput.value;
    const transaction = user.withdrawFromAccount(checkingAccount.getId(), amount, notes);
    if (transaction) {
        alert(`Withdrawal of $${amount.toFixed(2)} successful!`);
        withdrawAmountInput.value = "";
        withdrawNotesInput.value = "";
        updateTransactionHistory();
    }
    else {
        alert("Withdrawal failed. Please make sure you have sufficient funds in your account.");
    }
});
// Define the event listeners for the transfer form
transferForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fromAccountId = transferFromAccountInput.value;
    const toAccountId = transferToAccountInput.value;
    const amount = Number(transferAmountInput.value);
    const notes = transferNotesInput.value;
    const transactions = user.transferFunds(fromAccountId, toAccountId, amount, notes);
    if (transactions) {
        alert(`Transfer of $${amount.toFixed(2)} successful!`);
        transferAmountInput.value = "";
        transferNotesInput.value = "";
        updateTransactionHistory();
    }
    else {
        alert("Transfer failed. Please make sure you have sufficient funds in your account.");
    }
});
//Define a function to show the account balance
const balanceButton = document.querySelector("#balance-button");
balanceButton.addEventListener("click", () => {
    const checkingBalance = user.getAccountBalance(checkingAccount.getId());
    const savingsBalance = user.getAccountBalance(savingsAccount.getId());
    const message = `Checking Account Balance: $${checkingBalance.toFixed(2)}\nSavings Account Balance: $${savingsBalance.toFixed(2)}`;
    alert(message);
});
// Define a function to update the transaction history table
function updateTransactionHistory() {
    const transactions = user.getTransactionHistory();
    transactionHistoryTable.innerHTML = "";
    transactions.forEach((transaction) => {
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        dateCell.textContent = transaction.getDate().toLocaleString();
        const accountCell = document.createElement("td");
        accountCell.textContent = transaction.getAccountId();
        const typeCell = document.createElement("td");
        typeCell.textContent = transaction.getType();
        const amountCell = document.createElement("td");
        amountCell.textContent = `$${transaction.getAmount().toFixed(2)}`;
        const notesCell = document.createElement("td");
        notesCell.textContent = transaction.getNotes();
        row.appendChild(dateCell);
        row.appendChild(accountCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        row.appendChild(notesCell);
        transactionHistoryTable.appendChild(row);
    });
}
// Update the transaction history table on page load
updateTransactionHistory();
