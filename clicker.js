document.addEventListener("DOMContentLoaded", () => {
    const startDate = new Date(1900, 0, 1);
    const dateEl = document.getElementById("date");
    const clickerBtn = document.getElementById("clickBtn");
    const reseterBtn = document.getElementById("resetBtn");
    const box = document.getElementById("textbox");
    const msg = document.getElementById("message");
    const buyPetBtn = document.getElementById("buyPetBtn");
    const feedBtn = document.getElementById("feedBtn");
    const hungerBar = document.getElementById("hunger");
    const petUI = document.getElementById("petUI");


    let clicks = parseInt(localStorage.getItem("clicks")) || 0;
    let hasPet = JSON.parse(localStorage.getItem("hasPet")) || false;
    let hunger = parseInt(localStorage.getItem("hunger")) || 100;

    clickerBtn.addEventListener("click", increment);
    reseterBtn.addEventListener("click", resetGame);
    buyPetBtn.addEventListener("click", () => {
        if (!hasPet && clicks >= 30) {
            hasPet = true;
            localStorage.setItem("hasPet", true);
            petUI.style.display = "block";
            update();
        }
    });
    feedBtn.addEventListener("click", () => {
        hunger = Math.min(100, hunger + 10);
        update();
    });

    setInterval(() => {
        if (!hasPet) return;
        hunger -= 1;

        if (hunger > 0) {
            clicks += 1;
        }

        if (hunger <= 0) {
            hunger = 0;
            showMessage("Your Tamagotchi is too hungry to work!");
        }

        update();
    }, 1000);

    function update() {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + clicks);
        dateEl.textContent = newDate.toLocaleDateString("en-US");

        localStorage.setItem("clicks", clicks);
        localStorage.setItem("hunger", hunger);

        if (hasPet) {
            petUI.style.display = "block";
            hungerBar.textContent = hunger;
        }

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
        localStorage.removeItem("hasPet");
        update();
    }

    if (clicks === 0) {
        showMessage("We've sent you back in time. We'll get you back at 2000. That should give you a month to finish your mission! Unless something went wrong...");
    }

    update();
});