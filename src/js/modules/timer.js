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
