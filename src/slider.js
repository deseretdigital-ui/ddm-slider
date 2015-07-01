/* CUSTOMIZATION */
var ksl = ksl || {};
ksl.assets = ksl.assets || {};
ksl.assets.slider = (function ($) {

  /* helper functions */
  var helpers = {};
  helpers.fit = {};
  helpers.fit.contain = function (selection) {

    // set larger dimension to 100% and the other to auto. center center.
    selection.each(function (index, img) {
      var $img = $(img);
      if (this.width > this.height) {
        $img.addClass('fit-width');
      } else {
        $img.addClass('fit-height');
      }
    });
  };


  helpers.isIOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );


  var Slider = function ($slider) {
    var slider = this;

    // nest slides in new div
    var $slides = $slider.find('.slides');
    $slides.wrap('<div class="flexslider main"></div>');
    var $main = $slides.closest('.flexslider.main');

    // clone thumbs if necessary
    var $thumbs = $slider.find('.thumbs');
    if ($thumbs.length === 0) {
      $thumbs = $main.clone()
        .removeClass('main')
        .addClass('thumbs');
      // append thumbs into slider
      $thumbs.appendTo($slider);
    }

    // initialize thumbs
    // The slider being synced must be initialized first
    $thumbs.flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      itemWidth: 80,
      itemMargin: 5,
      asNavFor: $main
    });

    // instantiate slider
    $main.flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: true,
      slideshow: false,
      itemWidth: 400,
      itemMargin: 10,
      minItems: 1,
      maxItems: 1,
      sync: $thumbs,
      start: function (flexslider) {
        var $flexslider = $(flexslider);
        var index = $flexslider.data('flexslider').currentSlide;
        $currentSlide = $flexslider.find('.slides > li').eq(index);
        $currentSlide.addClass('current-slide');

        // apply dotdotdot to caption elements */
        if ($.fn.dotdotdot) {
          var $captions = $flexslider.find('.slides > li > .caption');
          if ($captions.length > 0) {
            $captions.dotdotdot({ watch: true });
          }
        }
        
        $slider.trigger('startSlide.slider', [slider]);
      },
      before: function (flexslider) {
        $slider.trigger('beforeSlideChange.slider', [slider]);
      },
      after: function (flexslider) {
        $slider.trigger('afterSlideChange.slider', [slider]);
      }
    });

    // now fit images
    helpers.fit.contain($slider.find('.slides > li > img'));

    // replace youtube placeholders in main slider
    $main.find('.slides > li > div.youtube').each(function (index, placeholder) {
      var $placeholder = $(placeholder);
      var src = 'https://www.youtube.com/embed/' + $placeholder.data('video-id') + '?enablejsapi=1&html5=1';
      $youtube = $('<iframe class="youtube" src="' + src + '" frameborder="0" allowfullscreen></iframe>');
      $placeholder.replaceWith($youtube);
    });

    // replace youtube placeholders in thumbs
    $thumbs.find('.slides > li > div.youtube').each(function (index, placeholder) {
      var $placeholder = $(placeholder);
      var src = 'https://img.youtube.com/vi/' + $placeholder.data('video-id') + '/0.jpg';
      $youtube = $('<img class="youtube" src="' + src + '" />');
      $placeholder.replaceWith($youtube);
    });

    // Fix slider issue where images are either cut off or pause between slides on desktop versions
    // var resizeTimeout;
    // $(window).on('resize', function() {
    //   clearTimeout(resizeTimeout);
    //   resizeTimeout = setTimeout(function(){
    //     $main.data('flexslider').resize();
    //   }, 0);
    // });


    /*= public methods =*/

    this.next = function () {
      $slider.children('.main').flexslider("next");
    };

    this.prev = function () {
      $slider.children('.main').flexslider("prev");
    };

    this.addSlide = function (index, html, thumbHtml) {
      var thumbHtml = thumbHtml || html;
      $slider.find('.flexslider.main').data('flexslider').addSlide(html, index);
      $slider.find('.flexslider.thumbs').data('flexslider').addSlide(thumbHtml, index);
    };

    this.removeSlide = function (index) {
      if (this.getCurrentIndex() === index) {
        this.prev();
      }
      $slider.find('.flexslider.main').data('flexslider').removeSlide(index);
      $slider.find('.flexslider.thumbs').data('flexslider').removeSlide(index);
    };

    this.getCurrentIndex = function () {
      var $flexslider = $main;
      return $flexslider.data('flexslider').currentSlide;
    };


    /*= events =*/
    $slider.on('beforeSlideChange.slider', function () {
      var $flexslider = $main;
      var index = $flexslider.data('flexslider').currentSlide;
      var $currentSlide = $flexslider.find('.slides > li').eq(index);

      // pause current video, play next video
      var iframe = $currentSlide.find('iframe.youtube').get(0);
      if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
      }

      // toggle current-slide class
      $currentSlide.removeClass('current-slide');
    });

    $slider.on('afterSlideChange.slider', function (event) {
      var $flexslider = $main;
      var index = $flexslider.data('flexslider').currentSlide;
      $currentSlide = $flexslider.children('.flex-viewport').find('.slides > li').eq(index);

      var iframe = $currentSlide.find('iframe.youtube').get(0);
      if (iframe && !helpers.isIOS) { // @see https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}','*');
      }

      // toggle current-slide class
      $currentSlide.addClass('current-slide');
    });
  };


  /* main component function */
  var slider = function ($element) {
    $element = $element.eq(0);
    var api = $element.data('slider-api');

    if (!$element.data('slider-api')) {
      var api = new Slider($element);
      $element.data('slider-api', api);
      $element.addClass('slider-initialized');
      $element.removeClass('slider-uninitialized');
      $element.trigger('initialized.slider', [slider]);
    }

    return api;
  };

  /* jquery plugin */
  if (!$.fn.slider) {
    $.fn.slider = function () { return slider($(this)); };
  }

  /* export slider function */
  return slider;

})(jQuery);
