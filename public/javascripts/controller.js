import { incomeUpdate, categoryUpdate, expenseUpdate } from "./domUpdater.js"
 // attach functions to window
 var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];
 var date = new Date();
 var today = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  window.saveIncome = (function saveIncome(value) {
      let request = db.transaction(['income'], 'readwrite')
      .objectStore('income')
      .add({ income_value: value, created: today });

    request.onsuccess = function (event) {
      console.log('Successfully added income');
      successAnimation();
      incomeUpdate(db);
      return false;
    };

    request.onerror = function (event) {
      console.error('Income add failed');
      console.error(event);
    }
  });

  window.addCategory = (function addCategory(value) {
    let validated = validate(value);
    let request = db.transaction(['categories'], 'readwrite')
    .objectStore('categories')
    .add({category_name: validated, budget: 0, image_file: 'others.png'});

    request.onsuccess = function(event) {
      console.log('Successfully added category');
      successAnimation();
      categoryUpdate(db);
      return false;
    }
  })

  window.updateBudget = (function updateBudget(id, value, image_file, category_name) {
  let request = db.transaction(['categories'], 'readwrite')
  .objectStore('categories')
  .put({ category_name: category_name, image_file: image_file, budget: parseFloat(value), id: parseInt(id) });
  request.onsuccess = function(event) {
    console.log('Successfully added category');
    successAnimation();
    categoryUpdate(db, true);
    return false;
  }

  })

  window.saveExpense = (function saveExpense(value, categoryNameAndImageFile) {
    let splitted = categoryNameAndImageFile.split(",", 2);
    let request = db.transaction(['expenses'], 'readwrite')
    .objectStore('expenses')
    .add({  category_name: splitted[0], image_file: splitted[1], expense_value: parseFloat(value),  created: today });

    request.onsuccess = function(event) {
      console.log("Successfully added category");
      successAnimation();
      expenseUpdate(db);
      return false;
    }
  });


  function successAnimation() {
    $('.modal').modal('hide');
    $("#success-img").removeAttr("style");

      setTimeout(function(){
          $("#success-img").attr('style', 'display: none');
          $('#income-value').val('');
      }, 2000);
  }

  function validate(data) {
    return data.replace(/(<([^>]+)>)/ig,"");
  }