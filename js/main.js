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
