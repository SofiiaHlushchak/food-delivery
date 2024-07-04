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
