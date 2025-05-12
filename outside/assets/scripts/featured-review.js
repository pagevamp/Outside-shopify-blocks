document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelectorAll('.m-featured-review__swiper')
    .forEach(function (swiperContainer) {
      var swiper = new Swiper(swiperContainer, {
        slidesPerView: 1.6024,
        spaceBetween: 9,
        grabCursor: true,
        keyboard: true,
        mousewheel: {
          enabled: true,
          forceToAxis: true,
        },
        slidesOffsetBefore: -24,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 2.3,
            slidesOffsetBefore: -48,
          },
          1024: {
            slidesPerView: 3.5,
            slidesOffsetBefore: -48,
          },
          1280: {
            slidesPerView: 4.1163,
            slidesOffsetBefore: -48,
          },
        },
      });
    });
});
