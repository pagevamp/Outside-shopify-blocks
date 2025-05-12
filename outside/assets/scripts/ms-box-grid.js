class BoxGrid {
    constructor() {
        this.initSwiper();
        this.handleResize();
    }

    initSwiper() {
        console.log("initSwiper");
        if (window.matchMedia('(max-width: 1099px)').matches) {
            if (this.swiper) {
                this.swiper.destroy(true, true);
            }
            this.swiper = new Swiper('.swiper-container', {
                loop: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });
        } else if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
        }
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.initSwiper();
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new BoxGrid();
});

export default BoxGrid;
