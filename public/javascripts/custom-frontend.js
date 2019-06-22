$(function(){
    // Enables popover
    $("[data-toggle=popover]").popover();
    // Enable imagepicker
    $("select").imagepicker({
        // hide_select: false,
        show_label: true
    });
});

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
