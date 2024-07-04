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
