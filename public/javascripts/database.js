// first time loading...

var request = window.indexedDB.open('expensejs', 1);

request.onerror = function(event) {
    console.log("IndexDB failed to load");
}

request.onsuccess = function(event) {
    db = request.result;
    loadIncomeData(db);
    loadCategoriesData(db);
    console.log("IndexDB loaded successfully");
}

request.onupgradeneeded = function(event) { //if wala pa yung database, dito gniagawa
    db = event.target.result;
    console.log("DB update...");
    let expenseObjectStore, incomeObjectStore;

    if(!db.objectStoreNames.contains('expenses')) {

        expenseObjectStore = db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });

    }

    if(!db.objectStoreNames.contains('categories')) {
        let arrayOfCategories = [
        { category_name: 'Food', image_file: 'food.png', budget: 0 },
        { category_name: 'Internet', image_file: 'internet.png', budget: 0 },
        { category_name: 'Laundry', image_file: 'laundry.png', budget: 0 },
        { category_name: 'Rent', image_file: 'rent.png', budget: 0 },
        { category_name: 'Transpo', image_file: 'transportation.png', budget: 0 },
        { category_name: 'Electricity', image_file: 'electricity.png', budget: 0 },
        { category_name: 'Others', image_file: 'others.png', budget: 0 }
        ];

        let categoriesObjectStore = db.createObjectStore('categories', {keyPath: 'id', autoIncrement: true});

        arrayOfCategories.forEach(category => {
            let req = categoriesObjectStore.transaction.objectStore('categories').add(category);
        });

    }

    if(!db.objectStoreNames.contains('income')) {
        incomeObjectStore = db.createObjectStore('income', { keyPath: 'id', autoIncrement: true });
    }
}


var loadIncomeData = function(db) {
    let transaction  = db.transaction(['income']);
    let objectStore = transaction.objectStore('income');
    let request = objectStore.getAll();

    request.onerror = function(event) {
        console.log("failed to fetch income data");
    }

    request.onsuccess = function( event) {
        if (request.result) {
            loadIncome(request.result);
            loadTransactionIncome(request.result);
        } else {
            console.log('No data income record');
        }
    }
}

var loadCategoriesData = function(db) {
    let transaction = db.transaction(['categories']);
    let objectStore = transaction.objectStore('categories');
    let request = objectStore.getAll();

    request.onerror = function(event) {
        console.log("failed to fetch categories");
    }

    request.onsuccess = function(event) {
        if(request.result) {
            loadCategories(request.result);
        } else {
            console.log("No category data");
        }
    }
}

// UTILITIES
function loadIncome(data) {
    let totalIncome = 0;
    data.forEach(income =>{
        totalIncome += parseFloat(income.income_value);
    })
    $("#income-preview").html(totalIncome);
}


function loadTransactionIncome(data) {
    data.forEach(d => {
        $("#transaction").append(`
            <div class='income-transactions container-fluid'>
                <p class='card-title text-success'>Income <span class='font-weight-light font-italic text-muted'> ${d.created} </span>
                    <i class='fas fa-money-bill-alt text-success float-right h2'></i>
                </p>
                <p class='card-text h4 text-success'>${d.income_value}</p>
            <hr>
            </div>`
        );
    });
}

function loadCategories(data) {
    let categoriesTile = "";
    let categoriesSelect = "";

    let promise = new Promise(function(resolve, reject) { //promise to add value before appending
        data.forEach(d => {
            categoriesTile += `
                <button class="btn btn-light"  data-toggle="modal" data-target="#budget-modal" data-category-id="${d.id}" data-category-name="${d.category_name}"
                data-category-image="${d.image_file}">
                <div class="col mx-auto text-center">
                    <figure class="figure">
                      <figcaption class="text-success">PHP ${d.budget} </figcaption>
                      <img src="/images/${d.image_file}">
                      <figcaption class="text-info">${d.category_name}</figcaption>
                    </figure>
                </div>
              </button>`;

            categoriesSelect += `<option value='${d.category_name}'> ${d.category_name} </option>`;
        });
        resolve(categoriesTile, categoriesSelect);
    });

    promise.then(function(){
        $("#category-select").append(categoriesSelect);
        $("#category-tile").append(categoriesTile);
    });


}