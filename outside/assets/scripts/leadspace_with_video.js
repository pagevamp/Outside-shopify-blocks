import { Modal } from 'bootstrap'; // Import Bootstrap's Modal class

class Video {
  constructor() {
    this.playVimeoVideo();
  }

  playVimeoVideo() {
    const triggerElements = document.querySelectorAll('.js-trigger-videomodel');
    var vimeoPlayer, vimeoPlayerIns;

    triggerElements.forEach(elem => {
      elem.addEventListener('click', e => {
        e.preventDefault();
        vimeoPlayer = elem
          .closest('.m-leadspace-with-video__wrapper')
          .querySelector('.data-js-modal-vimeo');
        if (vimeoPlayer) {
          vimeoPlayerIns = new Vimeo.Player(vimeoPlayer, {
            loop: true,
            muted: true,
            controls: false,
          });
        }

        // Show the modal if needed (using Bootstrap 5)
        const videoModalElement = document.getElementById(
          'leadspaceVideoModal',
        );

        if (videoModalElement) {
          const videoModal = new Modal(videoModalElement);
          videoModal.show();
          vimeoPlayerIns.pause();
        }
      });
    });

    const videoModal = document.getElementById('leadspaceVideoModal');
    if (videoModal) {
      videoModal.addEventListener('hidden.bs.modal', () => {
        vimeoPlayerIns.pause();
        document
          .querySelectorAll('.modal-backdrop')
          .forEach(backdrop => backdrop.remove());
      });
      videoModal.addEventListener('shown.bs.modal', () => {
        vimeoPlayerIns.play();
        vimeoPlayerIns.setVolume(1);
      });
    }
  }
}

export default Video;
new Video();
