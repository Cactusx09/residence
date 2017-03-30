/**
 * Обработка при загрузке страницы
 */
$(function() {

    $(window).scroll(function() {

    });

    $(window).resize(function(event) {

    });

    //Анимация якорей
    $('a[href*=#].anchor').bind("click", function(e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 50
        }, 700);
        e.preventDefault();
    });

    // Добавляем маску к вводу телефона
    $("input[type='tel']").each(function() {
        $(this).mask("+7 (999) 999-9999");
    });

    //Вертикальный слайдер на главной экране
    var swiper = new Swiper('.main__bottom .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        direction: 'vertical',
        autoplay: 4000,
        loop: true
    });

    //скрипт рандомного измения, рандомных картинок в сетке на главном экране
    var imggridCount = 0; //количество видимых блоков в сетке
    var imggridCountHidden = 0; //количество всех спрятаных картинок
    $('.imggrid__row img').each(function(index, el) {
        ++imggridCount;
    });
    $('.imggrid__hidden img').each(function(index, el) {
        ++imggridCountHidden;
    });

    var previousRand = 0;
    var randomBlock = 0;
    var randomImage = '';
    var imagesSrc = [];

    setInterval(function() {
        checkImage = false;
        //генерация числа рандомного блока с исключения повторения предыдущего сгенерирванного числа
        while (randomBlock == previousRand) {
            randomBlock = getRandomInt(0, imggridCount - 1);
        }
        previousRand = randomBlock;
        blockImg = $('.imggrid__row img').eq(randomBlock);

        //создания массива с видимыми на данный момент картинками(путь)
        $('.imggrid__row img').each(function(index, el) {
            imagesSrc[index] = $(this).attr('src');
        });

        //изменение картинки с проверкой на отсутствие этой картинки в числе видимых
        while (checkImage == false) {
            randomImage = $('.imggrid__hidden img').eq(getRandomInt(0, imggridCountHidden)).attr('src');
            for (var i = 0; i < imagesSrc.length; i++) {
                if (randomImage == imagesSrc[i]) {
                    checkImage = true;
                    break;
                };
            };
            if (checkImage == true) {
                checkImage = false
            } else {
                checkImage = true;
            }
        };
        blockImg.addClass('hide');
        setTimeout(function() {
            blockImg.attr('src', randomImage).removeClass('hide');
        }, 400)
    }, 2000);

    //слайдер с сравнением фотографий
    var swiper = new Swiper('.guise__slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        simulateTouch: false,
        draggable: false,
    });

    //инициализация скрипта сранения фото
    $('.guise__beforeafter').beforeAfter();
    $(window).on('resize load', function(event) {
        size = $('.guise__beforeafter').parents('.b-center').width();
        $('.guise__beforeafter .text').width(size);
    });

    //слайдеры в блоке "Реализованные объекты"
    var swiper = new Swiper('.objects__left', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplay: 4000,
        loop: true
    });

    $('.objects_count').text($('.objects__item.disabled').length);
    $('.objects__more').on('click', function() {
        event.preventDefault();
        $('.objects__item.disabled').removeClass('disabled');
        $(this).addClass('hidden')
    });

    $('.nice-select').niceSelect();
    $('.nice-select .list').perfectScrollbar();

    //слайдеры в блоке "Бизнес-центры"
    var swiper = new Swiper('.business__slider', {
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: false,
        // slidesPerView: 3,
        slidesPerView: 'auto',
        spaceBetween: 30,
        scrollbarDraggable: true,
        grabCursor: true,
    });

    //просмотр изображений
    $('.business__slider').lightGallery({
        selector: '.business__photo',
        download: false,
    });

    //Слайдер в блоке с результатами (галлерея)
    $('.results__gallery').lightSlider({
        gallery: true,
        item: 1,
        thumbItem: 3,
        slideMargin: 0,
        galleryMargin: 20,
        thumbMargin: 18,
        controls: false,
        speed: 500,
        auto: true,
        loop: true,
    });

    //Слайдер в блоке с результатами
    var swiper = new Swiper('.results__slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        simulateTouch: false,
        draggable: false,
    });

    var swiper = new Swiper('.results__info', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 4000,
        loop: true
    });

    //слайдеры в блоке "Бизнес-центры"
    var swiper = new Swiper('.days__slider', {
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: false,
        slidesPerView: 3,
        spaceBetween: 30,
        scrollbarDraggable: true,
        grabCursor: true,
    });

    $('input[type="file"]').on('change', function(event) {
        if ($(this).val()) {
            $(this).parents('.input_download').addClass('change').find('.input_download__name').text($(this).val().split(/(\\|\/)/g).pop());
        };
    });

    $('.input_download__close').on('click', function(event) {
        $(this).parents('.input_download').removeClass('change').find('input[type="file"]').val('');
        $(this).parents('.input_download').find('.input_download__name').text('Прикрепить файл');
    });

    //просмотр изображений
    $('.reviews__bottom').lightGallery({
        selector: '.reviews__item',
        download: false,
    });

    mapInitialize();

    $(window).on('resize', function(event) {
        var maxHeight = Math.max($('.work__left__content.active').outerHeight(), $('.work__right__content.active').outerHeight());
        $('.work__left, .work__right').height(maxHeight + 60);
    });

    $('.work__tab').on('click', function(event) {
        event.preventDefault();
        maxHeight = Math.max($('.work__left__content').eq($(this).index()).outerHeight(), $('.work__right__content').eq($(this).index()).outerHeight());
        $('.work__tab').removeClass('active');
        $(this).addClass('active');
        $('.work__left, .work__right').height(maxHeight + 60);
        $('.work__left__content').removeClass('active').eq($(this).index()).addClass('active');
        $('.work__right__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    $('.callPopup_calculate').on('click', function(event) {
        $('.calculate input[name="usr_footage"]').val($('.calculation__form input[name="usr_footage"]').val());
        $('.calculate input[name="usr_type"]').val($('.calculation__form select[name="usr_type"]').val());
        $('.calculate input[name="usr_terms"]').val($('.calculation__form select[name="usr_terms"]').val());
    });

    $('.reviews__video').on('click', function(event) {
        event.preventDefault();
        $(this).find('iframe').addClass('visible')
    });

    $(window).trigger('resize');
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mapInitialize() {

    var brooklyn = new google.maps.LatLng(55.845688, 37.524219);

    var stylez = [{
        featureType: "all",
        elementType: "all",
    }];

    var mapOptions = {
        zoom: 16,
        center: brooklyn,
        mapTypeControl: false,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false,
        draggable: true,
    };

    if ($(window).width() <= 1180) {
        mapOptions.draggable = false;
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    marker = new google.maps.Marker({
        map: map,
        position: brooklyn,
        icon: '../images/ico/map-placeholder.png'
    });
}
