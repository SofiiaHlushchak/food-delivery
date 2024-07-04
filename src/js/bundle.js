/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    // calorie calculator

    const result = document.querySelector(".calculating__result span");
    let sex = defaultValue("sex", "female"),
        height,
        weight,
        age,
        ratio = defaultValue("ratio", 1.375);

    function defaultValue(key, value) {
        let localStorageValue = localStorage.getItem(`${key}`);
        if (localStorageValue) {
            return localStorageValue;
        } else {
            localStorage.setItem(`${key}`, `${value}`);
            return value;
        }
    }

    function defaultActiveClass(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element) => {
            element.classList.remove(activeClass);
            if (element.getAttribute("id") === localStorage.getItem("sex")) {
                element.classList.add(activeClass);
            }
            if (
                element.getAttribute("data-ratio") ===
                localStorage.getItem("ratio")
            ) {
                element.classList.add(activeClass);
            }
        });
    }

    defaultActiveClass("#gender div", "calculating__choose-item_active");
    defaultActiveClass(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "___";
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round(
                (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (66.5 + 13.75 * weight + 5.003 * height - 6.775 * age) * ratio
            );
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element) => {
            element.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem(
                        "ratio",
                        +e.target.getAttribute("data-ratio")
                    );
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }

                elements.forEach((element) =>
                    element.classList.remove(activeClass)
                );

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", (e) => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }
            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

module.exports = calc;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class Card {
        constructor(
            title,
            src,
            alt,
            description,
            price,
            parentSelector,
            ...classes
        ) {
            this.title = title;
            this.src = src;
            this.alt = alt;
            this.description = description;
            this.price = price;
            this.transfer = 40;
            this.changeToUAN();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changeToUAN() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const item = document.createElement("div");

            if (this.classes.length === 0) {
                this.item = "menu__item";
                item.classList.add(this.item);
            } else {
                this.classes.forEach((className) =>
                    item.classList.add(className)
                );
            }

            item.innerHTML = `
                        <img src="${this.src}" alt="${this.alt}" />
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">
                            ${this.description}
                        </div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Ціна:</div>
                            <div class="menu__item-total">
                                <span>${this.price}</span> грн/день
                            </div>
                        </div>`;
            this.parent.append(item);
        }
    }

    const getDataResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    // getDataResource("http://localhost:3000/menu").then((data) => {
    // data.forEach(({ title, img, altimg, descr, price }) => {
    //     new Card(
    //         title,
    //         img,
    //         altimg,
    //         descr,
    //         price,
    //         ".menu .container"
    //     ).render();
    // });
    // });

    axios.get("http://localhost:3000/menu").then((data) => {
        data.data.forEach(({ title, img, altimg, descr, price }) => {
            new Card(
                title,
                img,
                altimg,
                descr,
                price,
                ".menu .container"
            ).render();
        });
    });
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    // Forms

    const forms = document.querySelectorAll("form");
    const message = {
        loading: "img/form/spinner.svg",
        success: "Дякую! Скоро ми з вами зв'яжемося",
        failure: "Щось пішло не так...",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        // const result = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        //     body: data,
        // });

        const result = await axios.post(url, data);
        return await result.data;
    };

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                })
                .catch(() => showThanksModal(message.failure))
                .finally(() => form.reset());
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModal();

        const modalDialogThanks = document.createElement("div");
        modalDialogThanks.classList.add("modal__dialog");
        modalDialogThanks.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector(".modal").append(modalDialogThanks);

        setTimeout(() => {
            modalDialogThanks.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

    const openModal = () => {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    };

    const closeModal = () => {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    };

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    const showModalByScroll = () => {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    };

    window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    const hideTabContent = () => {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const dealline = "2024-07-25";

    const getTimeRemaining = (endtime) => {
        let days, hours, minutes, seconds;
        const totalTime = Date.parse(endtime) - Date.parse(new Date());
        if (totalTime <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
            hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((totalTime / 1000 / 60) % 60);
            seconds = Math.floor((totalTime / 1000) % 60);
        }

        return {
            total: totalTime,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    };

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };

    setClock(".timer", dealline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
document.addEventListener("DOMContentLoaded", () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});

/******/ })()
;
//# sourceMappingURL=bundle.js.map