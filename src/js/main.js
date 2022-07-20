

// Smooth scroll
$('a[href^="#"]').click(function (){
    let elementClick = $(this).attr("href");
    let destination = $(elementClick).offset().top - 72;
    console.log(destination);
    jQuery("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 800);
    $('.navbar-collapse').collapse('hide')
    return false;
});

// // Phone validation
$(".form-tel").mask("+7 (999) 999-99-99");

// AJAX form sender
$('.landing-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url:"server/land-form.php",
      type: 'POST',
      data: $(this).serialize(),
      success: function(data) {
        alert('Спасибо за заявку, скоро мы вам перезвоним.');
        // console.log(data);
        $('.landing-form')[0].reset();
      },
    });
});

$('#quiz-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url:"server/quiz-form.php",
      type: 'POST',
      data: $(this).serialize(),
      success: function(data) {
        alert('Спасибо за заявку, скоро мы вам перезвоним.');
        // console.log(data);
        $('#quiz-form')[0].reset();
      },
    });
});


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
    // Header part
    socialIconsBlock = $( "header .header-social" )
    navbarMenu = $( "header .navbar-nav" )
    bigParent = $('header .navbar')
    headerContacts = $('header .header-contacts')
    // Removing
    socialIconsBlock.remove()
    navbarMenu.remove()
    headerContacts.remove()
    $( "header #navbarNav" ).remove()
    bigParent.append(navbarMenu)
    bigParent.append(socialIconsBlock)
    bigParent.append(headerContacts)
    // console.log('Ь,,');
    // Footer part
    socialIconsBlock = $( ".footer-social" )
    navbarMenu = $( ".footer-navbar" )
    bigParent = $('.footer')
    footerContacts = $('.footer-contacts')
    imgParent = $('.footer-img-block')
    // Removing
    socialIconsBlock.remove()
    navbarMenu.remove()
    footerContacts.remove()
    $( "header #navbarNav" ).remove()
    bigParent.append(navbarMenu)
    bigParent.append(socialIconsBlock)
    imgParent.append(footerContacts)
    $('.footer-social svg').attr('height', '42')
    // disable container in hero-features
    $('#hero-feature-container').attr('class', 'container')
};
if ($(window).width() > 576) {
    $('.footer-social svg').attr('height', '34')
    $('.footer-social svg').attr('width', '34')
};

// Inserting link tel: values to href
const linkArray = document.querySelectorAll(`.link-insert`)
let linkVal = ''
linkArray.forEach( function(i) {
    linkVal = i.textContent
    linkVal = linkVal.replace(/[\s,(,),+,-]/g, '')
    i.setAttribute('href', 'tel:+' + linkVal);
});
// Insert in whatssapp links
const linkArrayWA = document.querySelectorAll(`.link-whatsapp`);
linkArrayWA.forEach( function(i) {
    i.setAttribute('href', 'whatsapp://send?phone=' + linkVal + '/');
});
// Insert in viber links
const linkArrayViber = document.querySelectorAll(`.link-viber`);
linkArrayViber.forEach( function(i) {
    i.setAttribute('href', 'viber://add?number=' + linkVal);
});

const linkArrayEmail = document.querySelectorAll(`.link-insert-email`)
linkArrayEmail.forEach( function(i) {
    linkVal = i.textContent
    i.setAttribute('href', 'mailto:' + linkVal);
});

// for checkboxes in quiz
const radiosArray = document.querySelectorAll(`.quiz-form-input input`)
radiosArray.forEach( function(i) {
    i.addEventListener('change', () => {
            radiosArray.forEach( function(ij) {
                if (ij.checked) {
                    ij.parentElement.classList.add('active');
                } else {
                    ij.parentElement.classList.remove('active')
                }
            });
            i.parentElement.parentElement.parentElement.querySelector('.quiz-btn').removeAttribute('disabled')
    })

});

let quizNext = () => {
    let currentQuizSlide = document.querySelectorAll(`.quiz-block-current`);
    currentQuizSlide = currentQuizSlide[0]
    // console.log(currentQuizSlide);
    let nextQuizSlide = currentQuizSlide.nextSibling.nextSibling;
    currentQuizSlide.classList.remove('quiz-block-current');
    nextQuizSlide.classList.add('quiz-block-current')
    return false
};