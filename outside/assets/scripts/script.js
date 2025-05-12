import collapse from 'bootstrap/js/dist/collapse';
import modal from 'bootstrap/js/dist/modal';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function headerSubmenu() {
  document.querySelectorAll('.ni-header header-menu details').forEach((detail) => {
    const summary = detail.querySelector('summary');
    let timeout;

    summary.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      detail.setAttribute('open', true);
    });

    detail.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        detail.removeAttribute('open');
      }, 200); // 200ms delay
    });
  });
}

// Announcement bar close button
// Function to set the height of the announcement-bar-section
// function setAnnouncementBarHeight() {
//   var announcementBarSection = document.querySelector(
//     '.announcement-bar-section',
//   );

//   // Check if the announcement-bar-section exists
//   if (announcementBarSection) {
//     // Calculate the height
//     var height = announcementBarSection.offsetHeight;

//     // Set the height as inline style
//     announcementBarSection.style.height = height + 'px';

//     document.documentElement.style.setProperty(
//       '--announcement-bar-height',
//       `${height}px`,
//     );
//   }
// }

// Function to handle the close button click
function handleCloseButtonClick() {
  var closeButton = document.querySelector('.announcement-bar__close');

  const drawerCloseButton = document.querySelectorAll('.js-main-drawer-close');

  // Check if the button exists
  if (closeButton) {
    // Add a click event listener
    closeButton.addEventListener('click', function () {
      // Find the grandparent with class 'announcement-bar-section'
      var announcementBarSection = closeButton.closest(
        '.announcement-bar-section',
      );

      // Check if the grandparent exists
      if (announcementBarSection) {
        // Add class to the grandparent element
        announcementBarSection.classList.add('js-close-announcement-bar');
      }
    });
  }

  if (drawerCloseButton.length > 0) {
    drawerCloseButton.forEach(button => {
      button.addEventListener('click', function () {
        document.body.classList.remove('overflow-hidden-tablet');
      });
    });
  }
}

function megaMenuHeaderHoverScroll() {
  // const containers = document.querySelectorAll('.js-hover-scroll-top');

  const megaMenu = document.querySelectorAll('.mega-menu');
  megaMenu.forEach(function (menu) {
    const menus = menu.querySelectorAll('.js-hover-scroll-top');
    menu.addEventListener('mouseenter', function () {
      let maxHeight = 0;
      menus.forEach(function (container) {
        const submenu = container.querySelector('.grandchild-submenu');

        if (submenu) {
          // Calculate height with additional values
          const height = submenu.clientHeight + 100 + 48 + 20;

          // Update maxHeight if the current height is larger
          if (height > maxHeight) {
            maxHeight = height;
          }
        }
      });
      console.log(`Max height to be applied: ${maxHeight}`);

      // Second loop to apply the highest height to all menus
      menus.forEach(function (container) {
        container.style.height = `${maxHeight}px`;
        console.log(`Applied max height to menu: ${maxHeight}`);
      });
    });
  });

  // containers.forEach(function (container) {
  //   console.clear();
  //   console.log(container.querySelector('.grandchild-submenu'));
  //   container.addEventListener('mouseleave', function () {
  //     container.scrollTo({ top: 0, behavior: 'smooth' });
  //   });
  // });
}

function handleProductCardHeight() {
  const productSelector = document.querySelectorAll('.js-product-calc');
  // console.log(productSelector);
  if (productSelector.length > 0) {
    productSelector.forEach(product => {
      const cardBottomHeight = product.querySelector(
        '.js-card-product__bottom',
      );
      const cardInnerHeight = product.querySelector('.js-card-product__media');
      const cardContentHeight = product.querySelector('.js-card-product__meta');
      const cardHeight =
        cardBottomHeight.clientHeight +
        cardInnerHeight.clientHeight +
        cardContentHeight.clientHeight +
        'px';
      product.style.setProperty('--bottom-height', cardHeight);
    });
  }
}

// Filter button on click event

// function handleFilterButtonClick() {
//   if(document.querySelector('.js-toggle-filter')) {
//     document.querySelector('.js-toggle-filter').onclick = function (e) {
//       var filterContainer = document.querySelector('.fe-product-list');
//       filterContainer.classList.toggle('show-filter1');
//       e.preventDefault();
//     }
//   }
// }

function showHideFilterAnimation() {
  // Get the buttons and the target elements
  const animateFilterButton = document.querySelector('.js-toggle-filter');
  const filterContainer = document.querySelector('.fe-product-list');

  const animateSearchButton = document.querySelector('.js-toggle-search');
  const searchContainer = document.querySelector('.search-wrapper');

  // Common function to toggle visibility
  function toggleSection(button, container, showText, hideText) {
    if (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default action of the anchor link

        // Delay the text change by a few seconds (e.g., 0.6 seconds)
        setTimeout(() => {
          handleProductCardHeight();
          handleFilterHeight();
        }, 600); // 600 milliseconds = 0.6 seconds delay

        container.classList.toggle('show-filter');

        const buttonText = button.querySelector('span');
        const isVisible = container.classList.contains('show-filter');

        // Update the button text and aria-expanded attribute
        if (isVisible) {
          buttonText.textContent = hideText;
          button.setAttribute('aria-expanded', 'true');
          button.setAttribute('aria-label', hideText);
        } else {
          buttonText.textContent = showText;
          button.setAttribute('aria-expanded', 'false');
          button.setAttribute('aria-label', showText);
        }
      });
    }
  }

  // Toggle functionality for the filter
  toggleSection(
    animateFilterButton,
    filterContainer,
    'Show Filters',
    'Hide Filters',
  );

  // Toggle functionality for the search wrapper
  toggleSection(
    animateSearchButton,
    searchContainer,
    'Show Search',
    'Hide Search',
  );
}


function handleFooterLocalization() {
  document
    .querySelectorAll('.footer-button-localization')
    .forEach(localizationWrapper => {
      const localizationButton = localizationWrapper.querySelector(
        '.footer-button-localization--btn',
      );
      const localizationMenu = localizationWrapper.querySelector(
        '.footer-button-localization--dropdown',
      );

      // Toggle dropdown on click
      localizationButton.addEventListener('click', function () {
        const isExpanded =
          localizationButton.getAttribute('aria-expanded') === 'true';
        localizationButton.setAttribute('aria-expanded', !isExpanded);
        localizationMenu.hidden = isExpanded;
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (event) {
        if (!localizationWrapper.contains(event.target)) {
          localizationButton.setAttribute('aria-expanded', 'false');
          localizationMenu.hidden = true;
        }
      });

      // Enable keyboard navigation
      localizationButton.addEventListener('keydown', function (event) {
        if (
          event.key === 'ArrowDown' ||
          event.key === 'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault();
          localizationButton.click(); // Toggle dropdown
          localizationMenu.querySelector('a').focus(); // Focus first menu item
        }
      });

      localizationMenu.addEventListener('keydown', function (event) {
        const links = Array.from(localizationMenu.querySelectorAll('a'));
        const currentIndex = links.indexOf(document.activeElement);

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % links.length;
          links[nextIndex].focus();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          const prevIndex = (currentIndex - 1 + links.length) % links.length;
          links[prevIndex].focus();
        } else if (event.key === 'Escape') {
          localizationButton.setAttribute('aria-expanded', 'false');
          localizationMenu.hidden = true;
          localizationButton.focus(); // Return focus to the button
        }
      });
    });
}

const userOs = document.querySelector('.os');

let os = 'unknow';

function getOS() {
  const userAgent = window.navigator.userAgent;
  const platform =
    window.navigator?.userAgentData?.platform || window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = `mac`;
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

// Execute functions after DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  // setAnnouncementBarHeight();
  //collectionLoadMore();
  // handleCloseButtonClick();
  // megaMenuHeaderHoverScroll();
  headerSubmenu();
  // debouncedHandleProductCardHeight();
  handleProductCardHeight();
  // handleFilterButtonClick();
  showHideFilterAnimation();
  // debouncedHandleProductCardFilterHeight();
  handleFooterLocalization();
  getOS();

  document.documentElement.classList.add(os);
  window.platform = getOS();
});

// Optional: Recalculate height on window resize
window.addEventListener('resize', function () {
  handleProductCardHeight();
});

// Optional: Use MutationObserver to handle dynamic content changes
const productContainer = document.querySelector('.js-slider');
if (productContainer) {
  const observer = new MutationObserver(debouncedHandleProductCardHeight);
  observer.observe(productContainer, { childList: true, subtree: true });
}
const productGridContainer = document.querySelector('.product-grid-container');
if (productGridContainer) {
  const observer = new MutationObserver((mutations, observer) => {
    // Call multiple functions
    // debouncedHandleProductCardFilterHeight();
    debouncedHandleProductCardHeight();
  });

  observer.observe(productGridContainer, { childList: true, subtree: true });
}

const productGridContainerWrapper = document.querySelector('.facets-wrapper');
if (productGridContainerWrapper) {
  const observer = new MutationObserver(debouncedHandleProductCardFilterHeight);
  observer.observe(productGridContainer, { childList: true, subtree: true });
}

// Counter
var counters = document.querySelectorAll('.js-counter');

if (counters.length > 0) {
  // Set the initial value of innerText for each counter
  counters.forEach(function (counter) {
    var startValue = parseInt(counter.getAttribute('data-count-start'), 10);
    counter.innerText = startValue.toLocaleString();
  });

  window.addEventListener(
    'load',
    function () {
      counters.forEach(function (counter) {
        var start = parseInt(counter.getAttribute('data-count-start'), 10);
        var end = parseInt(counter.getAttribute('data-count-end'), 10);
        var speed = parseInt(counter.getAttribute('data-speed'), 10);

        var interval = setInterval(function () {
          start++;
          counter.innerText = start.toLocaleString(); // Format number with commas

          if (start >= end) {
            clearInterval(interval); // Stop the interval when end is reached
          }
        }, speed);
      });
    },
    false,
  );
}

// Debounce function to limit the rate at which a function is executed
function lavaLampDebounce1(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function lavaLampDebounce(func, timeout) {
  var timeoutID,
    timeout = timeout || 200;
  return function () {
    var scope = this,
      args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      func.apply(scope, Array.prototype.slice.call(args));
    }, timeout);
  };
}

function activateLavaLamp(
  element,
  index,
  lavaLamp,
  wrapperPosition,
  spanSizeWidth,
  firstLoad,
) {
  const position = element.getBoundingClientRect();
  const currentIndex = parseInt(lavaLamp.dataset.index || 0, 10);
  // Set the index to the current index
  lavaLamp.dataset.index = index;
  const leftPosition = position.left - wrapperPosition.left;
  // Set the height dynamically to match the menu item's height
  lavaLamp.style.height = position.height + 'px';

  var lavaScale = 'scaleX(1.5)';
  if (firstLoad) {
    lavaScale = 'scaleX(1)';
  }

  if (index > currentIndex) {
    // Moving from left to right
    lavaLamp.style.width = position.width + spanSizeWidth + 'px';
    lavaLamp.style.left = leftPosition - spanSizeWidth + window.scrollX + 'px';
    lavaLamp.style.transformOrigin = 'right';
    lavaLamp.style.transform = lavaScale;
  } else if (index < currentIndex && index != 0) {
    // Moving from right to left
    lavaLamp.style.width = position.width + 4 + spanSizeWidth + 'px';
    lavaLamp.style.left = leftPosition + window.scrollX + 'px';
    lavaLamp.style.transformOrigin = 'left';
    lavaLamp.style.transform = lavaScale;
  }
  // else if (index == 0) {
  //   // Moving from right to left
  //   lavaLamp.style.width = position.width + 4 + spanSizeWidth + 'px';
  //   lavaLamp.style.left = leftPosition + 2 + window.scrollX + 'px';
  //   lavaLamp.style.transformOrigin = 'left';
  //   lavaLamp.style.transform = lavaScale
  // }
  else {
    // Clicking on the active menu, reset everything
    // lavaLamp.style.width = position.width + spanSizeWidth + 'px';
    // lavaLamp.style.left = leftPosition - spanSizeWidth + window.scrollX + 'px';
    // lavaLamp.style.transform = 'scaleX(1)';

    lavaLamp.style.width = position.width + 4 + spanSizeWidth + 'px';
    lavaLamp.style.left = leftPosition + 2 + window.scrollX + 'px';
    lavaLamp.style.transformOrigin = 'left';
    lavaLamp.style.transform = lavaScale;
  }
  // Trigger reflow to restart the transition
  void lavaLamp.offsetWidth;
  // Reset to the actual target width, position, and transformation
  setTimeout(() => {
    if (index > currentIndex) {
      lavaLamp.style.left =
        leftPosition - spanSizeWidth + window.scrollX + 'px';
    } else if (index < currentIndex && index != 0) {
      lavaLamp.style.left = leftPosition + window.scrollX + 'px';
    } else if (index == 0) {
      lavaLamp.style.left = leftPosition + window.scrollX + 'px';
    } else {
      lavaLamp.style.left = leftPosition + window.scrollX + 'px';
    }
    lavaLamp.style.transform = 'scaleX(1)';
  }, 100); // Adjust the timeout duration as needed
}

function createClickHandler(
  index,
  lavaLamp,
  wrapperPosition,
  spanSizeWidth,
  firstLoad,
) {
  return function handleClick(event) {
    const item = event.currentTarget;
    activateLavaLamp(
      item,
      index,
      lavaLamp,
      wrapperPosition,
      spanSizeWidth,
      false,
    );
  };
}
let menuItemsEventHandlers = [];
function lavaLampInitialize() {
  const lavaLamps = document.querySelectorAll('.switch-pack');
  if (lavaLamps) {
    lavaLamps.forEach(lavaLampContainer => {
      let inputElm = lavaLampContainer.querySelectorAll('[type="radio"]');
      let activeIndex = Array.from(inputElm).findIndex(item => item.checked);

      const wrapperPosition = lavaLampContainer.getBoundingClientRect();
      const menuItems = lavaLampContainer.querySelectorAll(
        '.switch-pack__label',
      );
      const lavaLamp = lavaLampContainer.querySelector('.lava-lamp');
      let switchPackSpans =
        lavaLampContainer.querySelectorAll('.switch-pack__span');
      let spanSizeWidth = 0;
      if (switchPackSpans.length > 0) {
        spanSizeWidth = switchPackSpans[activeIndex].offsetWidth;
      }

      if (menuItemsEventHandlers.length > 0) {
        menuItemsEventHandlers.forEach(({ item, handler }) => {
          item.removeEventListener('click', handler);
        });
      }

      // Set the initial active state for the first menu item
      activateLavaLamp(
        menuItems[activeIndex],
        0,
        lavaLamp,
        wrapperPosition,
        0,
        true,
      );

      menuItems.forEach((item, index) => {
        menuItemsEventHandlers = [];

        const handler = createClickHandler(
          index,
          lavaLamp,
          wrapperPosition,
          spanSizeWidth,
        );

        item.addEventListener('click', handler);
        menuItemsEventHandlers.push({ item, handler });
      });
    });
  }
}

// document.addEventListener('DOMContentLoaded', lavaLampInitialize());
// window.addEventListener('resize', lavaLampDebounce(lavaLampInitialize, 250));
class SelectBox {
  constructor(selector, settings) {
    this.selector = selector;
    this.settings = settings || {};
    this.init();
  }

  init() {
    this.inputLabel = this.selector.dataset.selectboxLabel || false;
    let get_options = this.selector.querySelectorAll('.select-box option');
    this.id = Math.floor(Math.random() * 1000000);

    this.selector.dataset.selectboxId = this.id;
    // this.selector.dataset.href = this.href;

    this.options = [];
    this.callbacks = {};

    if (this.settings.on) {
      this.callbacks = this.settings.on;
    }

    if (get_options) {
      get_options.forEach(
        function (option) {
          this.options.push({
            value: option.value || option.innerHTML,
            label: option.innerHTML,
            selected: option.selected || false,
            disabled: option.disabled || false,
          });

          if (option.selected) {
            this.selectedOption = {
              value: option.value || option.innerHTML,
              label: option.innerHTML,
              selected: true,
            };
          }
        }.bind(this),
      );
    }

    if (this.options.length) {
      this.render();
      this.initTargets();
      this.setMinWidth();
      this.initEvents();
    }
  }

  render() {
    let _items_html = '';

    this.options.map(function (item) {
      let _item_classes = ['selectbox_list_item'];
      if (item.selected) {
        _item_classes.push('selected');
      }

      if (item.disabled) {
        // _item_classes.push('disabled');
      }

      _items_html += `<li class="${_item_classes.join(
        ' ',
      )}" data-attr="" data-value="${item.value}" data-disabled="0">${
        item.label
      }</li>`;
      return item;
    });
    let _arrow_html = `<svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.734835 0.234835C0.881282 0.0883883 1.11872 0.0883883 1.26517 0.234835L3 1.96967L4.73483 0.234835C4.88128 0.0883883 5.11872 0.0883883 5.26516 0.234835C5.41161 0.381282 5.41161 0.618718 5.26516 0.765165L3.44196 2.58837C3.19787 2.83246 2.80213 2.83246 2.55804 2.58837L0.734835 0.765165C0.588388 0.618718 0.588388 0.381282 0.734835 0.234835Z" fill="black"/>
</svg>
`;
    let _selected = this.selectedOption || this.options[0];
    let _themeClass = this.selector.dataset.theme
      ? `selectbox_wrapper--${this.selector.dataset.theme}`
      : '';
    let _html = `
        <div class="selectbox_wrapper ${_themeClass}" id="selectbox_${this.id}">
          <div class="selectbox_input">
            ${
              this.inputLabel
                ? `<span class="selectbox_input_label">${this.inputLabel}</span>`
                : ''
            }
            <span class="selectbox_input_value" data-value="${
              _selected.value
            }">${_selected.label}</span>
            <span class="selectbox_input_arrow">${_arrow_html}</span>
          </div>
          <ul class="selectbox_list">${_items_html}</ul>
        </div>
        `;
    this.selector.insertAdjacentHTML('afterEnd', _html);
    this.selector.style.display = 'none';
  }

  setMinWidth() {
    // Temporarily show the list to measure its width
    this.selectBoxList.style.display = 'block';
    const listWidth = this.selectBoxList.offsetWidth;
    this.selectBoxList.style.display = '';

    // Apply the calculated width as min-width to the TEST select box input
    this.selectBoxInput.style.minWidth = `${listWidth}px`;
  }

  initTargets() {
    this.selectBox = this.selector.nextElementSibling;
    this.selectBoxInput = this.selectBox.querySelector('.selectbox_input');
    this.selectBoxInputValue = this.selectBoxInput.querySelector(
      '.selectbox_input_value',
    );
    this.selectBoxList = this.selectBox.querySelector('.selectbox_list');
    this.selectBoxListItems = this.selectBoxList.querySelectorAll(
      '.selectbox_list_item',
    );
  }

  initEvents() {
    this.selectBoxInput.addEventListener('click', this.onClick.bind(this));

    this.selectboxOpenEvent = new CustomEvent('selectbox_open');
    this.selectBox.addEventListener(
      'selectbox_open',
      this.onOpen.bind(this),
      false,
    );

    this.selectboxCloseEvent = new CustomEvent('selectbox_close');
    this.selectBox.addEventListener(
      'selectbox_close',
      this.onClose.bind(this),
      false,
    );

    document.addEventListener(
      'click',
      function (e) {
        if (!e.target.closest(`#selectbox_${this.id}`)) {
          this.selectBox.classList.remove('selectbox_open');
        }
      }.bind(this),
    );

    this.selectBoxListItems.forEach(
      function (item) {
        item.addEventListener('click', this.onSelect.bind(this));
      }.bind(this),
    );
  }

  onClick(e) {
    if (this.selectBox.classList.contains('selectbox_open')) {
      this.selectBox.dispatchEvent(this.selectboxCloseEvent);
    } else {
      this.selectBox.dispatchEvent(this.selectboxOpenEvent);
    }
  }

  onOpen() {
    // Check if the element exists
    // let selectWrapper = document.querySelector('.selectbox_wrapper');
    let selectWrapper = this.selectBox;
    if (selectWrapper) {
      // Add a timer to add the class after a delay (e.g., 2 seconds)
      setTimeout(function () {
        // this.selectBox.classList.add('selectbox_open');
        if (selectWrapper.classList.contains('selectbox_open')) {
          console.log('already have class selectbox open');
        } else {
          selectWrapper.classList.add('selectbox_open');
        }
      }, 200); // 2000 milliseconds = 2 seconds
    } else {
      console.log('Element .selectbox_wrapper not found.');
    }

    if (this.callbacks.open && typeof this.callbacks.open == 'function') {
      this.callbacks.open.call(this);
    }

    //this.setDirection();
  }

  setDirection() {
    let _max = window
      .getComputedStyle(this.selectBoxList)
      .getPropertyValue('max-height');
    _max = parseInt(_max);
    let _min =
      window.innerHeight -
      (this.selectBox.offsetTop + this.selectBox.offsetHeight);
    if (!isNaN(_max) && _min < _max) {
      this.selectBox.classList.add('selectbox_direction_bottom');
    } else {
      this.selectBox.classList.remove('selectbox_direction_bottom');
    }
  }

  onClose() {
    this.selectBox.classList.remove('selectbox_open');

    if (this.callbacks.close && typeof this.callbacks.close == 'function') {
      this.callbacks.close.call(this);
    }
  }

  onSelect(e) {
    e.preventDefault();

    if (parseInt(e.target.dataset.disabled)) {
      return;
    }

    this.selectBoxInputValue.innerHTML = e.target.innerHTML;
    this.selectBoxInputValue.dataset.value = e.target.dataset.value;

    this.selector.value = e.target.dataset.value;
    this.selector.dispatchEvent(new Event('change'));

    this.selectBoxListItems.forEach(function (el) {
      el.classList.remove('selected');
    });

    e.target.classList.add('selected');

    if (this.callbacks.select && typeof this.callbacks.select == 'function') {
      this.callbacks.select.call(this, {
        value: e.target.dataset.value,
        label: e.target.innerHTML,
      });
    }

    this.selectBox.dispatchEvent(this.selectboxCloseEvent);
  }
}
let boxes = document.querySelectorAll('[data-selectbox]');
if (boxes) {
  boxes.forEach(function (el) {
    if (el.matches('select')) {
      let _sb = new SelectBox(el, {
        on: {
          open: function () {},
          close: function () {},
          select: function (option) {
            if (option.value.includes('/')) {
              window.location.href = option.value;
            }
          },
        },
      });
    }
  });
}
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

  // normalSwiper.forEach(swiperContainer => {
  //   const autoplay = swiperContainer.getAttribute('data-autoplay') === 'true';
  //   const $speed = swiperContainer.dataset.sliderSpeed;
  //   const $loop = swiperContainer.getAttribute('data-loop') === 'true';
  //   const swiperOptions = {
  //     slidesPerView: 1.126,
  //     spaceBetween: 14,
  //     autoplay: autoplay
  //       ? {
  //           delay: $speed,
  //           disableOnInteraction: false,
  //           pauseOnMouseEnter: true,
  //         }
  //       : false,
  //     loop: $loop,
  //     watchSlidesProgress: true,
  //     grabCursor: true,
  //     keyboard: true,
  //     mousewheel: {
  //       enabled: true,
  //       forceToAxis: true,
  //     },
  //     navigation: {
  //       nextEl: '.product-swiper-button-next',
  //       prevEl: '.product-swiper-button-prev',
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //     breakpoints: {
  //       768: {
  //         slidesPerView: 1,
  //         spaceBetween: 0,
  //       },
  //     },
  //     on: {
  //       autoplayPause() {
  //         const { el } = this;
  //         if (el && el.matches && el.matches('.product-media-swiper')) {
  //           el.classList.add('swiper-paused');
  //         }
  //       },
  //       autoplayResume() {
  //         const { el } = this;
  //         if (el && el.matches && el.matches('.product-media-swiper')) {
  //           el.classList.remove('swiper-paused');
  //         }
  //       },
  //     },
  //   };
  //   new Swiper(swiperContainer, swiperOptions);
  // });

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
