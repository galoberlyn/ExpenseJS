// hide 2nd/3rd page
$("#categories").hide();
$("#about").hide();

// SPA using jquery
$("#home-nav").click(function(){
    $("#cat-nav-parent").removeClass('active');
    $("#about-nav-parent").removeClass('active');
    $("#home-nav-parent").addClass('active');
    $("#categories").hide();
    $("#about").hide();
    $("#home").show("slow");
    $('.navbar-toggler').click();
});

$("#cat-nav").click(function(){
    $("#home-nav-parent").removeClass('active') 
    $("#about-nav-parent").removeClass('active') 
    $("#cat-nav-parent").addClass('active') 
    $("#home").hide();
    $("#about").hide();
    $("#categories").show("slow");
    $('.navbar-toggler').click();
});


$("#about-nav").click(function(){
    $("#home-nav-parent").removeClass('active') 
    $("#cat-nav-parent").removeClass('active') 
    $("#about-nav-parent").addClass('active') 
    $("#categories").hide();
    $("#home").hide();
    $("#about").show("slow");
    $('.navbar-toggler').click();
});


// events

$('#budget-modal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).data('category-id');
    var name = $(e.relatedTarget).data('category-name');
    var image = $(e.relatedTarget).data('category-image');

    $(e.currentTarget).find('input[name="budget-id"]').val(id);
    $(e.currentTarget).find('input[name="budget-name"]').val(name);
    $(e.currentTarget).find('input[name="budget-image"]').val(image);
});
