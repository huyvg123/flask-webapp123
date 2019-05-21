jQuery(document).ready(function($) {
    var liquidImages = ["//cdn.shopify.com/s/files/1/0013/3270/7388/t/5/assets/arrow-left.svg?122", "//cdn.shopify.com/s/files/1/0013/3270/7388/t/5/assets/arrow-right.svg?122"];
    var owlNavArrows = ["<img src='" + liquidImages[0] + "'>", "<img src='" + liquidImages[1] + "'>"]; 
    
      $('.js-raty').each(function(i, e) {
        var starColor = $(e).hasClass('js-raty-yellow') ? '-yellow' : '';
        $(e).raty({
          readOnly: true,
          starHalf: "//cdn.shopify.com/s/files/1/0013/3270/7388/t/5/assets/../assets/star-half.svg?122",
          starOff: "//cdn.shopify.com/s/files/1/0013/3270/7388/t/5/assets/../assets/star-off.svg?122",
          starOn: "//cdn.shopify.com/s/files/1/0013/3270/7388/t/5/assets/../assets/star-on.svg?122", 
          space: false,
          round : { down: 0.25, full: 0.6, up: 0.76 },
        });
      });
    
  
    $('.js-achievements').owlCarousel({
      items: 1,
      autoHeight: true,
      dots: false,
      nav: true,
      navText: owlNavArrows,
      navContainer: '.achievements'
    });
  
    $('.js-testimonials').owlCarousel({
      items: 1,
      autoHeight: true,
      nav: true,
      navText: owlNavArrows,
      navContainer: '.js-testimonials',
      dots: false
    });
  
    $('.js-signup-steps').owlCarousel({
      items: 1,
      dots: false,
      nav: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false
    });
  
    $('.js-featured-stacks').owlCarousel({
      items: 1,
      nav: true,
      navText: owlNavArrows,
      navContainer: '.js-featured-stacks-nav',
      responsive : {
        768 : {
          items: 2,
        }
      }
    });
  
    $('.js-featured-articles').owlCarousel({
      items: 1,
      nav: true,
      navText: owlNavArrows,
      navContainer: '.js-featured-articles-nav',
      responsive : {
        768 : {
          items: 3,
        }
      }
    });
  
    $('.js-gallery').owlCarousel({
      items: 1,
      smartSpeed: 500,
      nav: false,
      dots: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
    });
  
    $('.js-gallery-thumb').owlCarousel({
      items: 1,
      nav: true,
      animateOut: 'slideOutUp',
      animateIn: 'slideInUp',
      dots: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      navText: ['', ''],
      navContainer: '.js-gallery-thumb-nav'
    });
  
    $('.js-gallery-thumb-mobile').owlCarousel({
      items: 2,
      dots: false,
      nav: true,
      navText: ['', ''],
      navContainer: '.js-gallery-thumb-nav-mobile'
    });
  
  
    var thumbCur = 0;
  
    $('.js-gallery-thumb').on('changed.owl.carousel', function(event) {
      var name = event.property.name;
      var value = event.property.value;
  
      if ( name === 'position' ) {
  
          if( thumbCur < value ) {
            event.relatedTarget.settings.animateIn = 'slideInUp';
            event.relatedTarget.settings.animateOut = 'slideOutUp';
          } else {
            event.relatedTarget.settings.animateIn = 'slideInDown';
            event.relatedTarget.settings.animateOut = 'slideOutDown';
          }
  
          thumbCur = value;
      }
    })
  
    $('.js-gallery-thumb .product__gallery__thumb__image').click(function() {
  
      if ( !$(this).hasClass('active') ) {
        var itemIndex = $(this).parents('.owl-item').index();
        var thisIndex = $(this).index();
        var index = itemIndex * 3 + thisIndex;
  
        $('.js-gallery').trigger('to.owl.carousel', index);
        $('.product__gallery__thumb__image.active').removeClass('active');
        $(this).addClass('active');
      }
    });
  
    $('.js-gallery-thumb-mobile .product__gallery__thumb__image').click(function() {
  
      if ( !$(this).hasClass('active') ) {
        var index = $(this).parents('.owl-item').index();
  
        $('.js-gallery').trigger('to.owl.carousel', index);
        $('.product__gallery__thumb__image.active').removeClass('active');
        $(this).addClass('active');
      }
    });
  
    $('.js-signup-next').click(function() {
      $('.js-signup-steps').trigger('next.owl.carousel');
    });
  
    $('.js-signup-prev').click(function() {
      $('.js-signup-steps').trigger('prev.owl.carousel');
    });
  
    $('.js-testimonials-dots .owl-dot').click(function() {
      var buttons = $(this).parent().find('.owl-dot');
  
      if ( !$(this).hasClass('active')) {
        var index = $(this).index();
        $('.js-testimonials').trigger('to.owl.carousel', [index]);
      }
    });
  
    $('.js-search').click(function() {
      $('.js-search-down').stop(true).slideToggle(300);
      $('.js-search-form input').focus();
    });
  
    
  
    $('.js-categoryes-toggle').click(function() {
      $('.js-categoryes-menu').stop(true).slideToggle(300);
    });
  
    $('.js-buy-subscribe').click(function() {
      $('.js-buy-subscribe-wrap').toggleClass('subscribe-info-show');
    });
  
    $('.product__buy .form__checkbox__input').change(function() {
      if ($(this).is(':checked') && $(this).val() === '2') {
        $('.product__buy__subscribe__delivery').addClass('d-block');
      } else {
        $('.product__buy__subscribe__delivery').removeClass('d-block');
      }
    });
  
    $('.js-checkout-step').click(function() {
      var target = $(this).data('target');
      var parent = $(this).parent('.checkout__nav__item');
      var active = $('.js-checkout-tabs').find('.active');
  
      active = !active.length ? $('.checkout__right') : active;
  
      if ( (parent.length && !parent.hasClass('active')) || !parent.length ) {
        $('.js-checkout-step').parent('.checkout__nav__item.active').removeClass('active');
        $('.checkout__nav__item').removeClass('prev next');
        $('.js-checkout-step[data-target="'+ target +'"]').parent('.checkout__nav__item').addClass('active');
        $('.js-checkout-step[data-target="'+ target +'"]').parent('.checkout__nav__item').prev().addClass('prev');
        $('.js-checkout-step[data-target="'+ target +'"]').parent('.checkout__nav__item').next().addClass('next');
        $(active).fadeOut(150, function() {
          $(active).removeClass('active');
          $(target).fadeIn(300).addClass('active');
        });
      }
    });
  
    if ( $('#subscriptions').length ) {
      var subscriptions = new SimpleBar(document.getElementById('subscriptions'));
  
      $('#subscriptions .collapse').each(function(i, e) {
        $(e).on('shown.bs.collapse', function () {
          subscriptions.recalculate();
        }).on('hidden.bs.collapse', function () {
          subscriptions.recalculate();
        });
      });
    }
  
    if ( $('#accountlisthistory').length ) {
      var listhistory = new SimpleBar(document.getElementById('accountlisthistory'));
  
      $(window).resize(function() {
        listhistory.recalculate();
      });
  
      $('#accountlisthistory .collapse').each(function(i, e) {
        $(e).on('shown.bs.collapse', function () {
          listhistory.recalculate();
        });
      });
    }
  
    $('.js-play-video').click(function() {
      var $this = $(this);
      var postVideo = $this.parent('.js-video-wrap');
      var thumb = postVideo.find('.js-video-thumb');
      var video = postVideo.find('iframe');
      var videoUrl = video.attr('src');
      var $_GET = getLocation(videoUrl);
  
      if( !postVideo.hasClass('played') ) {
        postVideo.addClass('played');
        video.show();
        thumb.hide();
        $this.hide();
        videoBaseUrl = videoUrl;
        if($_GET.search) 
          video.attr('src', videoUrl + '&autoplay=1');
        else 
          video.attr('src', videoUrl + '?autoplay=1');
      }
    });
  
    $('body').on('click', '.js-menu', function() {
      if ( $('body').hasClass('nav__opened') ) {
        $('body').removeClass('nav__opened');
        $('.nav__backdrop').remove();
        $('.js-submenu.opened').removeClass('opened');
      } else {
        $('body').addClass('nav__opened').append('<div class="nav__backdrop d-sm-none js-menu"></div>');
      }
    });
  
    $('.js-nav').on('touchstart mouseenter', '.js-submenu', function () {
      if ( !$(this).hasClass('opened')) {
        $(this).addClass('opened');
        return false;
      } else {
        return true;
      }
    });
  
    $('.js-nav').on('mouseleave', '.js-submenu', function () {
      $(this).removeClass('opened');
    });
  
    var getLocation = function(url) {
      var path = document.createElement("a");
      path.href = url;
      return path;
    };
  
  });