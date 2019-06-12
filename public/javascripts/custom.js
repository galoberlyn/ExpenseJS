// hide 2nd page
$("#categories").hide();

// SPA using jquery
$("#home-nav").click(function(){
    $("#cat-nav-parent").removeClass('active');
    $("#home-nav-parent").addClass('active');
    $("#categories").hide();
    $("#home").show("slow");
    $('.navbar-toggler').click();
});

$("#cat-nav").click(function(){
    $("#home-nav-parent").removeClass('active') 
    $("#cat-nav-parent").addClass('active') 
    $("#home").hide();
    $("#categories").show("slow");
    $('.navbar-toggler').click();
});