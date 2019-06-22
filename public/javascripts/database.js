var request = window.indexedDB.open('expensejs', 1);

request.onerror = function(event) {
    console.log("IndexDB failed to load");
}

request.onsuccess = function(event) {
    db = request.result;
    loadAllData(db);
    console.log("IndexDB loaded successfully");
}

request.onupgradeneeded = function(event) { //if wala pa yung database, dito gniagawa
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
    }
}


var loadAllData = function(db) {
    let transaction  = db.transaction(['income']);
    let objectStore = transaction.objectStore('income');
    let request = objectStore.getAll();

    request.onerror = function(event) {
        console.log("failed to fetch income data");
    }

    request.onsuccess = function( event) {
        if (request.result) {
            loadIncome(request.result);
        } else {
            console.log('No data income record');
        }
    }

}

function loadIncome(data) {
    let totalIncome = 0;
    data.forEach(income =>{
        totalIncome += parseFloat(income.income_value);
    })
    $("#income-preview").html(totalIncome);
}


