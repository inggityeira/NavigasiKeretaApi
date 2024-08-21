const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['<', '>'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
        this.interval = null;
        this.autoplayInterval = 3000;
        this.updateGallery();
        this.startAutoplay();
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }

    setCurrentState(direction) {
        console.log('Current Array:', this.carouselArray);
        console.log('Direction:', direction.className);

        if (direction.classList.contains('gallery-controls-<')) {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else if (direction.classList.contains('gallery-controls->')) {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
        
        this.restartAutoplay();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }

    startAutoplay() {
        this.interval = setInterval(() => {
            this.carouselArray.push(this.carouselArray.shift());
            this.updateGallery();
        }, this.autoplayInterval);
    }

    stopAutoplay() {
        clearInterval(this.interval);
    }

    restartAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
