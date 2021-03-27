$(window).ready(() => {

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.magnific').magnificPopup({
        type: 'image'
    });
    /*categories*/

    let suk = $('#ours-items-container');
    let orch = $('#ours-items-orch')
    let category = $('.ours-menu-action');
    $(category[0]).click((e) => {
        $(category[1]).removeClass('active') && $(orch).removeClass('active');
        $(e.target).addClass('active') && $(suk).addClass('active');
    });
    $(category[1]).click((e) => {
        $(category[0]).removeClass('active') && $(suk).removeClass('active');
        $(e.target).addClass('active') && $(orch).addClass('active');
    });

    /*slider*/

    $('#feedbacks-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        initialSlide: 2,
        variableWidth: true
    });

    /*form*/

    let whiteButton = $('.white-btn');
    let greenButton = $('#ours-action .green-btn');
    let exit = $('.exit');
    let popupContainer = $('#popup-container');
    let callRequest = $('.call-request');
    let callInput = $('#tel1');
    let error = $('.form-error');
    let name = $('#name');
    let tel = $('#tel');
    let details = $('#details');
    let orderButton = $('#order-button');
    let btnNext = $('#continue');
    let valError = $('.val-error');
    let formInput = $('#offer-popup form .form-input input');
    let formText = $('#offer-popup form .form-input textarea');

    /*click on the white button*/

    $
    (whiteButton).click(() => {
        $(popupContainer).addClass('active');
        $('#recall').fadeIn();
        $(error).fadeOut();
    });

    $(callRequest).click(() => {
        if (callInput.val()) {
            $(error).fadeOut();
            $.ajax({
                type: 'post',
                url: '../mailCall.php',
                data: 'tel1=' + callInput.val(),
                success: () => {
                    $('#recall').fadeOut();
                    $('#recall-thanks').fadeIn();
                },
                error: () => {
                    $(popupContainer).fadeOut();
                    $('#recall').fadeOut();
                    alert('Возникла ошибка, ппожалуйста, позвоните по указанным номерам телефона');
                },
            });
        } else {
            $(error).fadeIn();
        }
    });

    /*exit form*/

    $(popupContainer).click((e) => {
        if (e.target.id === 'popup-container') {
            $(popupContainer).removeClass('active');
            $('#recall').fadeOut();
            $('#offer-popup').fadeOut();
            $('#thanks').fadeOut();
            $('#recall-thanks').fadeOut();
        }
    });

    $(btnNext).click(() => {
        $(popupContainer).removeClass('active');
        $('#thanks').fadeOut();
    });


    $(exit).click(() => {
        $(popupContainer).removeClass('active');
        $('#recall').fadeOut();
        $('#offer-popup').fadeOut();
        $('#thanks').fadeOut();
        $('#recall-thanks').fadeOut();
    });

    $('#recall-thanks-btn').click(() => {
        $(popupContainer).fadeOut();
        $('#recall-thanks').fadeOut();
    })


    /*order*/

    $(greenButton).click(() => {
        $(popupContainer).addClass('active');
        $('#offer-popup').css('display', 'flex');
    });

    $(orderButton).click(() => {
        let k = true;
        $(error).hide()
        $(formText).removeClass('error')
        $(formInput).removeClass('error')
        $(valError).hide();
        if (!name.val()) {
            $(valError[0]).fadeIn();
            $(formInput[0]).addClass('error');
            k = false;
        } if (!tel.val()) {
            $(valError[1]).fadeIn();
            $(formInput[1]).addClass('error');
            k = false;
        } if (!details.val()) {
            $(valError[2]).fadeIn();
            $(formText).addClass('error')
            k = false;
        }
        if (k) {
            $(error).fadeOut();
            $.ajax({
                type: 'post',
                url: '../mail.php',
                data: 'name=' + name.val() + '&tel=' + tel.val() + '&details=' + details.val(),
                success: () => {
                    $('#offer-popup').fadeOut();
                    $('#thanks').fadeIn();
                },
                error: () => {
                    $('#offer-popup').fadeOut();
                    $(popupContainer).fadeOut();
                    alert('Возникла ошибка, ппожалуйста, позвоните по указанным номерам телефона');
                },
            });
        }

    });


    /*header-actions*/

    let menuClose = $('#menu-cancel');
    let menuOpen = $('#menu-btn');
    let menuCont = $('#header #menu-container');
    let menuItem = $('#header #menu a');
    let menu = $('#header #menu');

    $(menuOpen).click(() => {
        $(menuCont).addClass('active');
        $(menu).addClass('active');
    })

    $(menuClose).click(() => {
        $(menuCont).removeClass('active');
        $(menu).removeClass('active');
    })

    $(menuItem).click(() => {
        $(menuCont).removeClass('active');
        $(menu).removeClass('active');
    })
})