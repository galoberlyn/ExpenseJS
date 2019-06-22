
export var incomeUpdate = function(db) {
    let transaction  = db.transaction(['income']);
    let objectStore = transaction.objectStore('income');
    let request = objectStore.getAll();

    request.onerror = function(event) {
        console.log("failed to fetch income data");
    }

    request.onsuccess = function( event) {
        if (request.result) {
            let totalIncome = 0;
            request.result.forEach(income =>{
                totalIncome += parseFloat(income.income_value);
            })
            $("#income-preview").html(totalIncome);
        } else {
            console.log('No data record');
        }
    }

}