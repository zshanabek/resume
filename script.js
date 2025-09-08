const toggleBtn = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
    toggleBtn.textContent = localStorage.getItem("theme") === "dark" ? "☀️" : "🌙";
} else {
    if (prefersDark) {
        document.documentElement.setAttribute("data-theme", "dark");
        toggleBtn.textContent = "☀️";
    }
}

toggleBtn.addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = [...cards].indexOf(card); // номер карточки
                setTimeout(() => {
                    card.classList.add("visible");
                }, index * 150); // задержка (150ms между картами)

                observer.unobserve(card);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});