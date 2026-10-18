const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("#primary-links");

toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu"
    );
    links.classList.toggle("is-open", !isOpen);
});