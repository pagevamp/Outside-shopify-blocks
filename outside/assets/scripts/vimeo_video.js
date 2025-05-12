// document.addEventListener('DOMContentLoaded', function () {
//   // Get all elements with the class `js-vimeo-video`
//   const vimeoVideos = document.querySelectorAll('.js-vimeo-video');
//   console.log(vimeoVideos);

//   vimeoVideos.forEach(videoElement => {
//     console.log(videoElement);
//     // Get Vimeo video ID from the data attribute
//     const vimeoId = videoElement.getAttribute('data-vimeo-id');

//     // Initialize the Vimeo Player
//     // let player = new Vimeo.Player(videoElement, {
//     //   id: vimeoId,
//     //   autoplay: videoElement.getAttribute('data-vimeo-autoplay') === 'true',
//     //   loop: videoElement.getAttribute('data-vimeo-loop') === 'true',
//     //   muted: videoElement.getAttribute('data-vimeo-muted') === 'true',
//     // });
//     console.log(vimeoId);
//     let vimeoPlayerIns = new Vimeo.Player(videoElement, {
//       loop: true,
//       muted: true,
//       controls: false,
//     });
//     // vimeoPlayerIns.play();

//     // vimeoPlayerIns.ready().then(() => {
//     //   if (screenWidth < 768) {
//     //     vimeoPlayerIns.play();
//     //     parentPlay.classList.add('c-video-cards--ready');
//     //   } else {
//     //     vimeoPlayerIns.pause();
//     //     parentPlay.classList.remove('c-video-cards--ready');
//     //   }
//     // });

//     // Add click event listener to toggle play/pause on click
//     // videoElement.addEventListener('click', function () {
//     //   player.getPaused().then(function (paused) {
//     //     if (paused) {
//     //       player.play(); // Play the video if it's paused
//     //     } else {
//     //       player.pause(); // Pause the video if it's playing
//     //     }
//     //   });
//     // });
//   });
// });
