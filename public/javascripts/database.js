
var request = window.indexedDB.open('expensejs', 1);

request.onerror = function(event) {
    console.log("IndexDB failed to load");
}

request.onsuccess = function(event) {
    db = request.result;
    console.log("IndexDB loaded successfully");
}

request.onupgradeneeded = function(event) {
    db = event.target.result;
    console.log("DB update...");
    let expenseObjectStore, incomeObjectStore;

    if(!db.objectStoreNames.contains('expenses')) {
        expenseObjectStore = db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        expenseObjectStore.createIndex('category', 'category');
        expenseObjectStore.createIndex('expense_value', 'expense_value');
        expenseObjectStore.createIndex('expense_budget', 'expense_budget');
    }

    if(!db.objectStoreNames.contains('income')) {
        incomeObjectStore = db.createObjectStore('income', { keyPath: 'id', autoIncrement: true });
        incomeObjectStore.createIndex('income_value', 'income_value');
    }
}
