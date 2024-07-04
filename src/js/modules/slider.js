function slider() {
    // Slider

    const slides = document.querySelectorAll(".offer__slide"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        totalIndex = document.querySelector("#total"),
        currentIndex = document.querySelector("#current"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(".offer__slider"),
        dots = [];
    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        totalIndex.textContent = `0${slides.length}`;
    } else {
        totalIndex.textContent = `${slides.length}`;
    }

    function currentSlideIndex(index) {
        if (index < 10) {
            currentIndex.textContent = `0${index}`;
        } else {
            currentIndex.textContent = `${index}`;
        }
    }

    slidesField.style.width = 100 * slides.length + "%";

    slidesWrapper.style.overflow = "hidden";

    currentSlideIndex(slideIndex);
    next.addEventListener("click", () => {
        if (
            offset ===
            +width.slice(0, width.length - 2) * (slides.length - 1)
        ) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlideIndex(slideIndex);
        activeDot(slideIndex);
    });

    prev.addEventListener("click", () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlideIndex(slideIndex);
        activeDot(slideIndex);
    });

    // navigation

    const indicators = document.createElement("ol");
    indicators.classList.add("carousel-indicators");
    slider.appendChild(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute("data-slide-to", i + 1);

        if (i == 0) {
            dot.classList.add("dot__active");
        }

        indicators.appendChild(dot);
        dots.push(dot);
    }

    function activeDot(index) {
        dots.forEach((dot) => dot.classList.remove("dot__active"));
        dots[index - 1].classList.add("dot__active");
    }

    dots.forEach((item) => {
        item.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            offset = +width.slice(0, width.length - 2) * (+slideTo - 1);
            slideIndex = +slideTo;

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlideIndex(slideIndex);
            activeDot(slideIndex);
        });
    });
}

module.exports = slider;
