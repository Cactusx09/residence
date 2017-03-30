$(document).ready(function() {
    $(window).on('load', function() {});

    $('.main__top .b-center').addClass('wow fadeIn').attr({
        'data-wow-duration': '1.5s',
        'data-wow-delay': '0.5s'
    });

    $('.imggrid img').each(function(index, el) {
        $(this).addClass('wow fadeInRight').attr({
            'data-wow-duration': '1s',
            'data-wow-delay': 1 + (0.2 * index) + 's'
        });
    });

    $('.main__bottom').addClass('wow fadeInUp').attr({
        'data-wow-duration': '1.5s',
        'data-wow-delay': '1s',
        'data-wow-offset': '0'
    });

    $('.reason__item').each(function(index, el) {
        $(this).addClass('wow fadeInRight').attr({
            'data-wow-duration': '1s',
        });
    });

    $('.guise').addClass('wow fadeInUpSmall').attr({
        'data-wow-duration': '1.5s',
        'data-wow-offset': '300'
    });

    $('.objects__item:not(.disabled)').each(function(index, el) {
        $(this).addClass('wow fadeInLeft').attr({
            'data-wow-duration': '1s',
        });
    });

    $('.objects__item:not(.disabled):nth-child(2n)').each(function(index, el) {
        $(this).addClass('wow fadeInRight').attr({
            'data-wow-duration': '1s',
        });
    });

    $('.offers .caption, .offers .sub_caption, .offers .offers__title').addClass('wow fadeIn').attr({
        'data-wow-duration': '1s',
    });

    $('.offers__item').each(function(index, el) {
        $(this).addClass('wow fadeInUpSmall').attr({
            'data-wow-duration': '1s',
            'data-wow-delay': (0.3 * index) + 's'
        });
    });

    $('.calculation__items').each(function(index, el) {
        $(this).children(':nth-child(3n+1)').addClass('wow fadeInLeftSmall');
        $(this).children(':nth-child(3n+2)').addClass('wow fadeInDownSmall');
        $(this).children(':nth-child(3n)').addClass('wow fadeInRightSmall');
        $(this).children('.calculation__item').each(function(index, el) {
            $(this).attr({
                'data-wow-delay': (0.2 * index) + 's',
                'data-wow-duration': '1s',
            });
        });
    });

    $('.business').each(function(index, el) {
        $(this).find('.business__photo').each(function(index, el) {
            $(this).addClass('wow fadeInScale').attr({
                'data-wow-duration': '0.6s',
                'data-wow-delay': (0.2 * index) + 's'
            });
        });
    });

    $('.algorithm__item--first').addClass('wow fadeIn').attr({
        'data-wow-duration': '1s',
        'data-wow-offset': '300'
    });

    $('.algorithm__item--second').addClass('wow fadeInLeftSmall').attr({
        'data-wow-duration': '1s',
        'data-wow-offset': '300',
        'data-wow-delay': '0.3s'
    });

    $('.algorithm__item--third').addClass('wow fadeInDownSmall').attr({
        'data-wow-duration': '1s',
        'data-wow-offset': '300',
        'data-wow-delay': '0.3s'
    });

    $('.algorithm__item--fourth').addClass('wow fadeInRightSmall').attr({
        'data-wow-duration': '1s',
        'data-wow-offset': '300',
        'data-wow-delay': '0.6s'
    });

    $('.estimate .caption, .estimate .sub_caption, .estimate .form-order, .estimate .btn').addClass('wow fadeInUpSmall').attr({
        'data-wow-duration': '1s',
    });

    $('.work__tab').each(function(index, el) {
        $(this).addClass('wow fadeInScale').attr({
            'data-wow-duration': '0.6s',
        });
    });

    $('.work__left, .work__right').addClass('wow fadeInUpSmall').attr({
        'data-wow-duration': '1s',
    });


    wow = new WOW({
        offset: 150,
        mobile: false,
    })
    wow.init();
});
