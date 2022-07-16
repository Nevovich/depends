

// // Smooth scroll
// $('#headerNavbar a[href^="#"]').click(function (){
//     let elementClick = $(this).attr("href");
//     let destination = $(elementClick).offset().top;
//     jQuery("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 800);
//     return false;
// });

// // Phone validation
// $(".phone-validate").mask("+7 (999) 999-99-99");

// // AJAX form sender
// $('.form').on('submit', function(event) {
//     event.preventDefault();
//     $.ajax({
//       url:"tg-form.php",
//       type: 'POST',
//       data: $(this).serialize(),
//       success: function(data) {
//         // alert('Спасибо за заявку, скоро мы вам перезвоним.');
//         // console.log(data);
//         $('.form').not('.partner-form')[0].reset();
//       },
//     });
// });
function navbarSwap() {
    if ($('.navbar-toggler').attr('aria-expanded')!="true") {
        // console.log('открыл');
        $('.navbar-toggler img').attr("src", "img/header/burger-close.svg");
    } else {
        // console.log("закрыл");
        $('.navbar-toggler img').attr("src", "img/header/burger-icon.svg");
    }
} 
// console.log();
if ($(window).width() > 991) {
    socialIconsBlock = $( ".header-social" )
    navbarMenu = $( ".navbar-nav" )
    bigParent = $('.navbar')
    headerContacts = $('.header-contacts')
    // Removing
    socialIconsBlock.remove()
    navbarMenu.remove()
    headerContacts.remove()
    bigParent.append(navbarMenu)
    bigParent.append(socialIconsBlock)
    bigParent.append(headerContacts)
    console.log('Ь,,');
};