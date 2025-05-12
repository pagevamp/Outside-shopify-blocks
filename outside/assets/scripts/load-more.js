function showMore(event) {
  const textContainer = event.target.previousElementSibling;
  textContainer.classList.add('expanded');
  event.target.style.display = 'none';
}

function checkContentHeight() {
  document.querySelectorAll('.js-more-content').forEach(block => {
    const textContainer = block.querySelector('.load-more-container');
    const moreButton = block.querySelector('.js-text-more-button');

    // Check if the text container exceeds lines
    const exceedsSevenLines =
      textContainer.offsetHeight < textContainer.scrollHeight ||
      textContainer.offsetWidth < textContainer.scrollWidth;

    if (exceedsSevenLines) {
      moreButton.style.display = 'inline-flex';
    }
  });
}

function handleMediaQueryChange(event) {
  if (event.matches) {
    checkContentHeight();
  }
}

// Create a MediaQueryList object
const mediaQueryList = window.matchMedia('(max-width: 991px)');

// Attach listener function on state changes
mediaQueryList.addEventListener('change', handleMediaQueryChange);

// Run the check on page load
window.onload = () => handleMediaQueryChange(mediaQueryList);

// Attach event listeners to "More" buttons
document.querySelectorAll('.js-text-more-button').forEach(button => {
  button.addEventListener('click', showMore);
});
