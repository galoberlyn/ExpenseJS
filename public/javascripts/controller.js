// database.js

saveIncome = (value) => {

    let request = db.transaction(['income'], 'readwrite')
    .objectStore('income')
    .add({ income_value: value });

  request.onsuccess = function (event) {
    console.log('Successfully added income');
    $("#success").removeAttr("style");

    setTimeout(function(){
        $("#success").attr('style', 'display: none');
        $('#income-value').val('');
    }, 2000);

  };

  request.onerror = function (event) {
    console.error('Income add failed');
    console.error(event);
  }
}