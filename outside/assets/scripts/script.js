import collapse from 'bootstrap/js/dist/collapse';
import modal from 'bootstrap/js/dist/modal';

// product media swiper
document.addEventListener('DOMContentLoaded', () => {
  //const normalSwiper = document.querySelectorAll('[swiper-init]');
  const variantSwiper = document.querySelectorAll('[variant-swiper]');

  const getOptions = () =>
    Array.from(
      document
        .querySelector('variant-selects')
        .querySelectorAll('select, fieldset'),
      element =>
        element.tagName === 'SELECT'
          ? element.value
          : element.tagName === 'FIELDSET'
          ? Array.from(element.querySelectorAll('input')).find(
              radio => radio.checked,
            )?.value
          : null,
    );

  const getVariantData = () =>
    JSON.parse(
      document
        .querySelector('variant-selects')
        .querySelector('[type="application/json"]').textContent,
    );

  const getCurrentVariantData = () => {
    const options = getOptions();
    return getVariantData().find(
      variant =>
        !variant.options
          .map((option, index) => options[index] === option)
          .includes(false),
    );
  };

  var allSlides = document.querySelectorAll(
    '.swiper-wrapper__js .swiper-slide',
  );

  const updateVisibleSlides = (swiperContainer, swiperObj, variantId) => {
    const variantSlides = Array.from(allSlides).filter(
      slide => slide.getAttribute('data-variant-id') == variantId,
    );

    if (swiperContainer.swiper) {
      swiperContainer.swiper.removeAllSlides();
      swiperContainer.swiper.destroy(true, true);
    }

    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';

    variantSlides.forEach(slide => {
      swiperWrapper.appendChild(slide);
    });

    let newSwiper = new Swiper(swiperContainer, swiperObj);
    if (swiperObj.autoplay) {
      newSwiper.autoplay.start();
    }
  };

  variantSwiper.forEach(swiperContainer => {
    var nextBtn = swiperContainer.querySelector('.product-swiper-button-next');
    var prevBtn = swiperContainer.querySelector('.product-swiper-button-prev');
    const autoplay = swiperContainer.getAttribute('data-autoplay') === 'true';
    var swiperObj = {
      autoplay: autoplay
        ? {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
      loop: true,
      watchSlidesProgress: true,
      grabCursor: true,
      keyboard: true,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      pagination: {
        el: paginationElm,
        clickable: true,
      },
      on: {
        autoplayPause() {
          const { el } = this;
          // console.log('el', el);
          if (el && el.matches && el.matches('.product-media-swiper')) {
            el.classList.add('swiper-paused');
          }
        },
        autoplayResume() {
          const { el } = this;
          if (el && el.matches && el.matches('.product-media-swiper')) {
            el.classList.remove('swiper-paused');
          }
        },
      },
    };

    function updateSlides() {
      const variantId = getCurrentVariantData().id;
      updateVisibleSlides(swiperContainer, swiperObj, variantId);
    }

    document
      .querySelector('variant-selects')
      .addEventListener('change', updateSlides);

    updateSlides();
  });

});
