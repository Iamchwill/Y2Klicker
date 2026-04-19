document.addEventListener("DOMContentLoaded", () => {
    const startDate = new Date(1900, 0, 1);
    const dateEl = document.getElementById("date");
    const clickerBtn = document.getElementById("clickBtn");
    const reseterBtn = document.getElementById("resetBtn");
    const box = document.getElementById("textbox");
    const msg = document.getElementById("message");

    let clicks = parseInt(localStorage.getItem("clicks")) || 0;

    clickerBtn.addEventListener("click", increment);
    reseterBtn.addEventListener("click", resetGame);

    function update() {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + clicks);
        dateEl.textContent = newDate.toLocaleDateString("en-US");

        localStorage.setItem("clicks", clicks);

        if (clicks === 30) {
            showMessage("Gotta keep going...");
        }
    }

    function increment() {
        clicks += 1;
        update();
    }

    function showMessage(text) {
        msg.textContent = text;
        box.style.display = "block";

        setTimeout(() => {
            box.style.display = "none";
        }, 2000);
    }

    function resetGame() {
        clicks = 0;
        localStorage.removeItem("clicks");
        update();
    }

    if (clicks === 0) {
        showMessage("We've sent you back in time. We'll get you back at 2000. That should give you a month to finish your mission! Unless something went wrong...");
    }

    update();
});