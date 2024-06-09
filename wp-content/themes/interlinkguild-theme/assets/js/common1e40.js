(function ($) {
  const TOP_SLIDER_DELAY_TIME = 5000;
  const IMG_SLIDER_DELAY_TIME = 5000;
  var scrollFlg = 0;
  var
    topSliderProgressNum = 0,
    topSliderProgressTotal = -1,
    topSlider;
  var scrollSlider = {
    'Slider1': {'target': null},
    'Slider2': {'target': null},
    'Slider3': {'target': null},
    'SliderFlow': {'target': null},
  };
  var imgSlider = {
    'Slider1': {'target': null, 'progressNum': 0, 'progressTotal': -1},
    'Slider2': {'target': null, 'progressNum': 0, 'progressTotal': -1},
    'Slider3': {'target': null, 'progressNum': 0, 'progressTotal': -1},
  };

  $(function () {
    /* -------- */
    /* init */
    /* -------- */
    checkScrolled();
    topMvSlider();
    scrollSliderRun('Slider1');
    scrollSliderRun('Slider2');
    scrollSliderRun('Slider3');
    scrollSliderRun('SliderFlow');
    imgSliderRun('Slider1');
    imgSliderRun('Slider2');
    imgSliderRun('Slider3');
    headerMenu();
    smoothScroll();
    changeTab();
    
    /* -------- */
    /* Scroll */
    /* -------- */
    $(window).on('scroll', function () {
      checkScrolled();
    });

    /* -------- */
    /* Resize */
    /* -------- */
    $(window).on('resize', function () {
      topMvSliderProgressInit();
      imgSliderProgressInit('Slider1');
      imgSliderProgressInit('Slider2');
      imgSliderProgressInit('Slider3');
    });

    /* -------- */
    /* OnLoad */
    /* -------- */
    // $(window).on('load', async function () {
      
    // });

    /* -------- */
    /* Functions */
    /* -------- */
    /**
     * スクロール時の処理
     */
      

    function checkScrolled() {
      var scroll = $(window).scrollTop();
      if (scroll > 0 && scrollFlg !== 1) {
        scrollFlg = 1;
        $('body').addClass('-scrolled');
      } else if (scroll <= 0 && scrollFlg !== 0) {
        scrollFlg = 0;
        $('body').removeClass('-scrolled');
      }
    }
    /**
     * TOP MVスライダーの設定
     */
    function topMvSlider() {
      topSlider = new Swiper('.js-topMvSlider', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: 1000,
        // autoplay: {
        //   delay: TOP_SLIDER_DELAY_TIME,
        //   waitForTransition: false
        // },
        slidesPerView: 'auto',
        allowTouchMove: false,
        on: {
          init: function () {
            topMvSliderProgressInit();
            topMvSliderProgressRun();
          }
        }

      });

      // 切替時イベント
      topSlider.on('slideChange', function () {
        topSliderProgressNum = 0;
      });

    }
    function topMvSliderProgressInit() {
      if ($('.js-topMvSliderProgressNum').length) {
        topSliderProgressNum = 0;
        topSliderProgressTotal = $('.js-topMvSliderProgressTotal').width();
      }
    }
    function topMvSliderProgressRun() {
      // slideProgressNum -> 0%〜100%
      // (delay / intervalTime) 回実行
      var
        intervalTime = 10,
        intervalMaxCount = TOP_SLIDER_DELAY_TIME / intervalTime;

      if (topSliderProgressTotal > 0) {
        setInterval(function () {
          if (topSliderProgressNum < intervalMaxCount) {
            topSliderProgressNum++;

            // プログレスバー
            $('.js-topMvSliderProgressNum').width((topSliderProgressTotal * topSliderProgressNum) / intervalMaxCount);
          } else {
            topSlider.slideNext(1000);
          }
        }, intervalTime);
      }
    }

    /**
     * 横スクロール用スライド
    */
    function scrollSliderRun(elm) {
      scrollSlider[elm].target = new Swiper('.js-scroll' + elm, {
        speed: 700,
        slidesPerView: 'auto',
        grabCursor: true,
        mousewheelControl: false,
        freeMode: true,
        scrollbar: {
          el: '.scrollbar' + elm,
          draggable: true,
        }
      });
    }

    /**
     * 画像プログレスバースライダー
     */
    function imgSliderRun(elm) {
      imgSlider[elm].target = new Swiper('.js-img' + elm, {
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: 1000,
        slidesPerView: 'auto',
        allowTouchMove: false,
        on: {
          init: function () {
            imgSliderProgressInit(elm);
            imgSliderProgressRun(elm);
          }
        }

      });

      // 切替時イベント
      imgSlider[elm].target.on('slideChange', function () {
        imgSlider[elm].progressNum = 0;
      });

    }
    function imgSliderProgressInit(elm) {
      if ($('.js-img' + elm + 'ProgressNum').length) {
        imgSlider[elm].progressNum = 0;
        imgSlider[elm].progressTotal = $('.js-img' + elm + 'ProgressTotal').width();
      }
    }
    function imgSliderProgressRun(elm) {
      // slideProgressNum -> 0%〜100%
      // (delay / intervalTime) 回実行
      var
        intervalTime = 10,
        intervalMaxCount = IMG_SLIDER_DELAY_TIME / intervalTime;

      if (imgSlider[elm].progressTotal > 0) {
        setInterval(function () {
          if (imgSlider[elm].progressNum < intervalMaxCount) {
            imgSlider[elm].progressNum++;

            // プログレスバー
            $('.js-img' + elm + 'ProgressNum').width((imgSlider[elm].progressTotal * imgSlider[elm].progressNum) / intervalMaxCount);
          } else {
            imgSlider[elm].target.slideNext(1000);
          }
        }, intervalTime);
      }
    }

    /**
     * ヘッダーメニュー
     */
    function headerMenu() {
      $('.spBtn').click(function () {
        if ($(this).hasClass('-open')) {
          $('.spBtn, .spMenu, #header, .gmenu').addClass('-close');
          setTimeout(function () {
            $('.spBtn, .spMenu, #header, .gmenu').removeClass(['-open', '-close']);
          }, 1000);
        } else {
          $('.spBtn, .spMenu, #header, .gmenu').addClass('-open');
        }
      });

      // メニュー内リンクイベント
      $('.spMenu a').click(function () {
        setTimeout(function () {
          $('.spBtn, .spMenu, #header, .gmenu').removeClass(['-open', '-close']);
        }, 750);
      })
    }

    /**
     * スムーススクロール
     */
    function smoothScroll() {
      $('a[href^="#"]').click(function (e) {
        var href = $(this).attr('href');
        href = href.replace(/(.*)\//g, "");

        if ($(href).length) {
          // スマホのときはfadeOutさせる
          if ( $('.js-headerMenu').hasClass('-open') ) {
            $('.js-headerMenu').removeClass('-open');
          $('#gmenuBody').removeClass('-open');
          }
          
          var targetTop = $(href).offset().top;
          $('html,body').animate({scrollTop : targetTop}, 500);
          return false;
        }
  
      });

    }

    /**
     * スムーススクロール
     */
    function changeTab() {
      $('.js-tab').click(function (e) {
        if (!$(this).hasClass('-active')) {
          var idx = $(this).parents('.js-tabParent').index();
          $('.js-tab').removeClass('-active');
          $(this).addClass('-active');
          
          $('.js-tabTarget').removeClass('-active');
          $('.js-tabTarget').eq(idx).addClass('-active');
        }
        return false;
      });
    }

    /**
     * クッキー同意
     */
    const expire = 365; // 有効期限（日）∂≈
    
    let ca = $('.cookieButton');
    const flag = localStorage.getItem('cookieButtonClicked');
    
    if (flag === 'true') {
      // ボタンがクリックされていたらfixedContentsCookieを非表示にする
      $('.fixedContentsCookieWrap').remove();
    } else {
      // ボタンがクリックされていない場合は表示
      $('.fixedContentsCookieWrap').show();
      $('.fixedContentsButtonWrap').addClass('-show');
    }
    
    ca.on('click', function () {
      $('.fixedContentsCookieWrap').fadeOut(function () {
        $(this).remove();
        $('.fixedContentsButtonWrap').removeClass('-show');
        localStorage.setItem('cookieButtonClicked', 'true'); // ボタンがクリックされたことを保存
      });
    });

    /**
     * フォームのプライバシーポリシーにリンク設定
     */
    $('.js-agreement .mwform-checkbox-field-text').html('<a href="https://interlink-guild.co.jp/privacy-policy/" target="_blank" class="contactForm__link">個人情報保護方針</a>について同意する');

    /**
     * iPhone時のメニューの高さを調整
     */
    var w = $(window).width();
    function navHeight() {
      var iosHeight = $(window).height();
      $('.spMenuInner').css({'height' : iosHeight - 200});
    }
    if (w <= 768) {
      navHeight();
    }
    window.addEventListener("resize", function() {
      if (w <= 768) {
        navHeight();
      }
    });

  });
}(jQuery));
