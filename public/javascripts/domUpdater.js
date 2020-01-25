
export var incomeUpdate = function(db) {
    let transaction  = db.transaction(['income']);
    let objectStore = transaction.objectStore('income');
    let request = objectStore.getAll();

    request.onerror = function(event) {
        console.log("failed to fetch income data");
    }

    request.onsuccess = function( event) {
        if (request.result) {
            updateIncomeExpenseDashboard(request.result, "income");
            updateIncomeTransactions(request.result);
        } else {
            console.log('No income record');
        }
    }
}

export var expenseUpdate = function(db) {
    let transaction  = db.transaction(['expenses']);
    let objectStore = transaction.objectStore('expenses');
    let request = objectStore.getAll();

    request.onerror = function(event) {
        console.log("failed to fetch expense data");
    }

    request.onsuccess = function( event) {
        if (request.result) {
            updateIncomeExpenseDashboard(request.result, "expense");
            updateExpenseTransactions(request.result);
        } else {
            console.log('No expense record');
        }
    }
}


export var categoryUpdate = function(db, redraw=false) {
    let transaction = db.transaction(['categories']);
    let objectStore = transaction.objectStore('categories');
    let request = objectStore.getAll();

    request.onerror = function(event) {
        console.log("failed to fetch categories");
    }

    request.onsuccess = function(event) {
        if(request.result) {
            if(redraw) {
                redrawCategoriesTile(request.result);
            } else {
                updateCategoriesDOM(request.result);
            }
        } else {
            console.log("no category record");
        }
    }
}


function updateIncomeExpenseDashboard(data, type) {
    let total = 0;

    if(type === 'income') {
        data.forEach(income => {
            total += parseFloat(income.income_value);
        });
        $("#income-preview").html(totalIncome);
        $("#income-value").val();
    } else {
        data.forEach(expense => {
            total += parseFloat(expense.expense_value);
        });
        $("#expense-preview").html(total);
        $("#expense-input").val();
    }
}

function updateIncomeTransactions(data) {
    let length = data.length - 1;
    $("#transaction").append(`
        <div class='income-transactions container-fluid'>
            <p class='card-title text-success'>Income <span class='font-weight-light font-italic text-muted'> ${data[length].created} </span>
                <i class='fas fa-money-bill-alt text-success float-right h2'></i>
            </p>
            <p class='card-text h4 text-success'>${data[length].income_value}</p>
        <hr>
        </div>`
    );
}

function updateCategoriesDOM(data) {
    let length = data.length - 1;
    let htmlForTile = `<button class="btn btn-light"  data-toggle="modal" data-target="#budget-modal" data-category-id="${data[length].id}" data-category-name="${data[length].category_name}"
                        data-category-image="${data[length].image_file}">
                        <div class="col mx-auto text-center">
                            <figure class="figure">
                              <figcaption class="text-success">PHP ${data[length].budget} </figcaption>
                              <img src="/images/${data[length].image_file}">
                              <figcaption class="text-info">${data[length].category_name}</figcaption>
                            </figure>
                        </div>
                      </button>`;

    let htmlForSelect = `<option value='${data[length].category_name}'> ${data[length].category_name} </option>`;

    $("#category-tile").append(htmlForTile);

    $("#category-input").val('');
    $("#category-select").append(htmlForSelect);
}

function redrawCategoriesTile(data) {
    let length = data.length-1;
    let html = "";
    let budget = 0;

    data.forEach(d => {
        budget += d.budget;
        html += `<button class="btn btn-light"  data-toggle="modal" data-target="#budget-modal" data-category-id="${d.id}" data-category-name="${d.category_name}"
                        data-category-image="${d.image_file}">
                        <div class="col mx-auto text-center">
                            <figure class="figure">
                              <figcaption class="text-success">PHP ${d.budget} </figcaption>
                              <img src="/images/${d.image_file}">
                              <figcaption class="text-info">${d.category_name}</figcaption>
                            </figure>
                        </div>
                      </button>`
    });

    $("#category-tile").html(html);
    $("#totalBudget").html(budget);
    $("#budget-input").val('');
}

function updateExpenseTransactions(data) {
    let length = data.length - 1;
    $("#transaction").append(`
        <div class='ex-transactions container-fluid'>
            <p class='card-title text-danger'>Expense <span class='font-weight-light font-italic text-muted'> ${data[length].created} </span>
                <img class="float-right" src="/images/${data[length].image_file}">
            </p>
            <p class='card-text h4 text-danger>${data[length].expense_value}</p>
        <hr>
        </div>`
    );
}