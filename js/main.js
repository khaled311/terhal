$(window).on("load", function () {
  AOS.refresh();

  $(".loader").fadeOut(1000);
  $("html").css("overflow-y", "auto");
});

$(function () {
  AOS.init({
    once: true,
    disable: "mobile",
  });
  $(window).on("scroll", function () {
    AOS.refresh();
  });

  // open Side Nav
  $(".menuTriger").on("click", function () {
    $(this).fadeOut();
    $(".sideNav").toggleClass("open");
    $(".navover").toggleClass("open");
    $("body").css("overflow", "hidden");
    setTimeout(function () {
      $(".sideNav").addClass("origin");
    }, 500);
  });

  // Close Side Nav
  $(".navover, .close1").on("click", function () {
    if ($(".sideNav").hasClass("open")) {
      $(".menuTriger").fadeIn();
      $(".navover").removeClass("open");
      $(".sideNav").toggleClass("open");
      // $(".sideNav").toggleClass("origin");
      $("body").css("overflow", "auto");
      setTimeout(function () {
        $(".sideNav").removeClass("origin");
      }, 600);
    }
  });

  // Open Search
  $(".searchTriger").on("click", function () {
    $(".search-pop").addClass("open");
  });

  // Close Search
  $(".search-pop .close").on("click", function () {
    $(".search-pop").removeClass("open");
  });

  // Header Slider
  var headerswiper = new Swiper("header .swiper-container", {
    grabCursor: true,
    // autoplay: {
    //   delay: 5000,
    // },
    speed: 700,
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
      el: "header .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: "header .swiper-button-next",
      prevEl: "header .swiper-button-prev",
    },
  });

  $("header .swiper-container").css(
    "height",
    $(window).innerHeight() - $(".topNav").innerHeight()
  );

  var swiper = new Swiper(".services .swiper-container", {
    effect: "flip",
    grabCursor: true,
    pagination: {
      el: ".services .swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
    speed: 700,
    loop: true,
  });

  var partnerswiper = new Swiper(".co-workers .swiper-container", {
    grabCursor: true,
    autoplay: {
      delay: 5000,
    },
    loop: true,
    slidesPerView: 4,
    pagination: {
      el: ".co-workers .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });

  var a = 0;
    $(window).on("scroll", function () {
        if (
            a === 0 &&
            $(this).scrollTop() >=
                $(".stats").offset().top - $(".stats").innerHeight()
        ) {
            try {
                // console.log(this);
                $(".timer").countTo({
                    speed: 2000,
                });
            } catch (err) {
                // console.log(err);
            }
            a = 1;
        }
    });

  // TABS
  $("#TABS .feat .box").on("click", function() {
    let target = $(this).data("target");
    $("#TABS").find(".about-feat" + target).addClass("ks").siblings(".about-feat").removeClass("ks").addClass("fade");
  })

  TweenMax.set('#circlePath', {
    attr: {
      r: document.querySelector('#mainCircle').getAttribute('r')
    }
  })
  MorphSVGPlugin.convertToPath('#circlePath');
  
  var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function(s) {
      return document.querySelector(s);
    },
    selectAll = function(s) {
      return document.querySelectorAll(s);
    },
    mainCircle = select('#mainCircle'),
    mainContainer = select('#mainContainer'),
    plane = select('#plane'),
    mainSVG = select('.mainSVG'),
    mainCircleRadius = Number(mainCircle.getAttribute('r')),
    //radius = mainCircleRadius,
    numDots = mainCircleRadius / 2,
    step = 360 / numDots,
    dotMin = 0,
    circlePath = select('#circlePath')
  
  //
  //mainSVG.appendChild(circlePath);
  TweenMax.set('svg', {
    visibility: 'visible'
  })
  TweenMax.set([plane], {
    transformOrigin: '50% 50%'
  })
  
  var circleBezier = MorphSVGPlugin.pathDataToBezier(circlePath.getAttribute('d'), {
    offsetX: -19,
    offsetY: -18
  })
  
  //console.log(circlePath)
  var mainTl = new TimelineMax();
  
  function makeDots() {
    var d, angle, tl;
    for (var i = 0; i < numDots; i++) {
  
      d = select('#dot').cloneNode(true);
      mainContainer.appendChild(d);
      angle = step * i;
      TweenMax.set(d, {
        attr: {
          cx: (Math.cos(angle * Math.PI / 180) * mainCircleRadius) + 400,
          cy: (Math.sin(angle * Math.PI / 180) * mainCircleRadius) + 300
        }
      })
  
      tl = new TimelineMax({
        repeat: -1
      });
      tl
      .from(d, 0.2, {
            attr:{
              r:dotMin
            },
            ease:Power2.easeIn
          })
        .to(d, 1.8, {
        attr: {
          r: dotMin
        },
        ease: Power2.easeOut
      })
  
      mainTl.add(tl, i / (numDots / tl.duration()))
    }
    var planeTl = new TimelineMax({
      repeat: -1
    });
    planeTl.to(plane, tl.duration(), {
      bezier: {
        type: "cubic",
        values: circleBezier,
        autoRotate: true
      },
      ease: Linear.easeNone
    })
    mainTl.add(planeTl, 0.05)
  }
  
  makeDots();
  mainTl.time(20);
  TweenMax.to(mainContainer, 30, {
    rotation: -360,
    svgOrigin: '400 300',
    repeat: -1,
    ease: Linear.easeNone
  })
  mainTl.timeScale(1.6);
  

  jQuery("img.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");

    jQuery.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg");

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");

        // Check if the viewport is set, else we gonna set it if we can.
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
});
