// import Swiper from 'swiper';

class videoSlider {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.videoSliderSection = document.querySelectorAll('.js-video-slider');
      this.thisSlider();
      // this.thisVideo();
      // this.resetVideosOnResize();
      this.addResizeListener();
    });
  }

  // Debounce utility function
  debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  thisSlider() {
    this.videoSliderSection.forEach(sliderElement => {
      const $Speed = sliderElement.dataset.sliderSpeed;

      sliderElement
        .querySelectorAll('.swiper-container')
        .forEach((swiperContainer, index) => {
          var swiper = new Swiper(swiperContainer, {
            slidesPerView: 1.978,
            spaceBetween: 4,
            grabCursor: false,
            keyboard: true,
            loop: true,
            // autoplay: false,
            autoplay: {
              delay: $Speed,
              disableOnInteraction: false,
            },
            breakpoints: {
              768: {
                autoplay: false,
                slidesPerView: 4,
                spaceBetween: 10,
              },
            },
            on: {
              slideChange: ()=>this.handleSlideChange(),
              init: ()=>this.thisVideo(),
            },
          });
        });
    });
  }
  addResizeListener() {
    window.addEventListener(
      'resize',
      this.debounce(() => {
        this.resetVideosOnResize();
      }, 200),
    ); // Debounce with a delay of 200ms
  }

  handleSlideChange() {
    // document.querySelectorAll('.video-selfhosted');
    const videoElements = document.querySelectorAll('.c-video-cards');
    const screenWidth = window.innerWidth;

    // Loop through each video element and control playback based on index
    // if (screenWidth < 768) {
    //   videoElements.forEach((video, index) => {
    //     if (video.querySelector('.video-selfhosted')) {
    //       video => video.play();
    //     } else if (video.querySelector('.data-js-landing-vimeo')) {
    //       // video.querySelector('.data-js-landing-vimeo').play();
    //       const vimeoElm = video.querySelector('.data-js-landing-vimeo');
    //       const vimeoPlayer = new Vimeo.Player(vimeoElm);
    //       vimeoPlayer.play();
    //     }
    //     // if (index === this.activeIndex) {
    //     //   video.play();
    //     // } else {
    //     //   video.pause();
    //     // }
    //   });
    // } else {
    //   // Pause all videos for screens 768px or larger
    //   videoElements.forEach(video => {
    //     if (video.querySelector('.video-selfhosted')) {
    //       video => video.pause();
    //     } else if (video.querySelector('.data-js-landing-vimeo')) {
    //       // video.querySelector('.data-js-landing-vimeo').play();
    //       const vimeoElm = video.querySelector('.data-js-landing-vimeo');
    //       const vimeoPlayer = new Vimeo.Player(vimeoElm);
    //       vimeoPlayer.pause();
    //     }
    //   });
    // }
  }

  resetVideosOnResize() {
    const screenWidth = window.innerWidth;
    this.videoSliderSection.forEach(sliderElement => {
      const videoElements = sliderElement.querySelectorAll('.c-video-cards');

      // Pause all videos
      videoElements.forEach(video => {
        const videoElement = video.querySelector('video');
        const vimeoElement = video.querySelector('.data-js-landing-vimeo');

        if (videoElement) {
          videoElement.pause();
          videoElement.muted = true; // Ensure muted to autoplay on mobile
        }

        if (vimeoElement) {
          const vimeoPlayer = new Vimeo.Player(vimeoElement);
          vimeoPlayer.setMuted(true); // Ensure muted to autoplay on mobile
          // vimeoPlayer.
          // vimeoPlayer.pause();
        }
      });

      // Play all videos again
      videoElements.forEach(video => {
        const videoElement = video.querySelector('video');
        const vimeoElement = video.querySelector('.data-js-landing-vimeo');

        if (videoElement) {
          if (screenWidth < 768) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        }

        if (vimeoElement) {
          const vimeoPlayer = new Vimeo.Player(vimeoElement);

          vimeoPlayer.ready().then(() => {
            if (screenWidth < 768) {
              setTimeout(() => {
                vimeoPlayer.play();
              }, 1000);
            } else {
              vimeoPlayer.pause();
            }
          });
        }
      });
    });
  }

  thisVideo() {
    const screenWidth = window.innerWidth;
    // Select all the .video-player containers
    this.videoSliderSection.forEach(sliderElement => {
      const videoPlayers = sliderElement.querySelectorAll(
        '.c-video-cards__player',
      );

      let activeVideo = null; // Variable to store the active video player

      videoPlayers.forEach(player => {
        const videoElement = player.querySelector('video');
        let vimeoPlayer = player.querySelector('.data-js-landing-vimeo');
        let parentPlay = player.closest('.c-video-cards');

        // Add class when video is ready
        if (videoElement) {
          videoElement.addEventListener('loadeddata', () => {
            if (screenWidth < 768) {
              videoElement.play();
              parentPlay.classList.add('c-video-cards--ready');
            } else {
              videoElement.pause();
              parentPlay.classList.remove('c-video-cards-ready');
            }
          });
        } else if (vimeoPlayer) {
          let vimeoPlayerIns = new Vimeo.Player(vimeoPlayer, {
            loop: true,
            muted: true,
            controls: false,
          });
          vimeoPlayerIns.ready().then(() => {
            if (screenWidth < 768) {
              vimeoPlayerIns.play();
              parentPlay.classList.add('c-video-cards--ready');
            } else {
              vimeoPlayerIns.pause();
              parentPlay.classList.remove('c-video-cards--ready');
            }
          });
        }

        // Pause video on slide change (if Swiper is used)
        const swiperContainer = player.closest('.swiper-container');
        if (swiperContainer) {
          const swiperInstance = swiperContainer.swiper;
          swiperInstance.on('slideChange', () => {
            resetPeviouslyActiveVideo(activeVideo);
          });
        }

        // Play video on hover and pause on hover out
        player.addEventListener('mouseenter', () => {
          // Reset the state of the previously active video
          resetPeviouslyActiveVideo();

          if (videoElement) {
            videoElement.play();
          } else if (vimeoPlayer) {
            const vimeoPlayerInstance = new Vimeo.Player(vimeoPlayer);
            vimeoPlayerInstance.play();
          }

          // Set the active video and update the class
          activeVideo = videoElement || vimeoPlayer;
          parentPlay.classList.add('c-video-cards--playing');
        });

        player.addEventListener('mouseleave', () => {
          if (activeVideo) {
            if (activeVideo.tagName === 'VIDEO') {
              activeVideo.pause();
            } else {
              const vimeoPlayerInstance = new Vimeo.Player(activeVideo);
              vimeoPlayerInstance.pause();
            }
            parentPlay.classList.remove('c-video-cards--playing');
            activeVideo = null;
          }
        });

        // Reset the state of the previously active video
        function resetPeviouslyActiveVideo() {
          // if (activeVideo) {
          //   if (activeVideo.tagName === 'VIDEO') {
          //     activeVideo.pause();
          //   } else {
          //     const vimeoPlayerInstance = new Vimeo.Player(activeVideo);
          //     vimeoPlayerInstance.pause();
          //   }
          //   activeVideo
          //     .closest('.c-video-cards')
          //     .classList.remove('c-video-cards--playing');
          //   activeVideo = null;
          // }
        }
      });
    });
  }
}

export default videoSlider;
new videoSlider();
