document.addEventListener("DOMContentLoaded", () => {
    // TABS

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

    // TIMER

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

    // MODAL

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

    // Menu for day

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

    new Card(
        "Меню 'Фітнес'",
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фітнес" – це новий підхід до приготування страв: більше свіжих овочів та фруктів. Продукт активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною та високою якістю!',
        "9",
        ".menu .container"
    ).render();

    new Card(
        "Меню 'Преміум'",
        "img/tabs/elite.jpg",
        "elit",
        'У меню "Преміум" ми використовуємо не тільки гарний дизайн упаковки, а й якісне виконання страв. Червона риба, морепродукти, фрукти – ресторанне меню без походу в ресторан!',
        "14",
        ".menu .container"
    ).render();

    new Card(
        "Меню 'Пісне'",
        "img/tabs/post.jpg",
        "post",
        'Меню "Пісне" - це ретельний підбір інгредієнтів: повне відсутність продуктів тваринного походження, молоко з мигдалю, вівса, кокоса або гречки, правильна кількість білків за рахунок тофу та імпортних вегетаріанських стейків.',
        "11",
        ".menu .container"
    ).render();

    // Forms

    const forms = document.querySelectorAll("form");
    const message = {
        loading: "img/form/spinner.svg",
        success: "Дякую! Скоро ми з вами зв'яжемося",
        failure: "Щось пішло не так...",
    };

    forms.forEach((item) => {
        postData(item);
    });

    function postData(form) {
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

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch("server.php", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(object),
            })
                .then((data) => data.text())
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
});
