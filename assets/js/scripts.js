const body = document.querySelector('body')
const menuTrigger = document.querySelector('#toggle-main-menu-mobile');
const menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}

function getUserOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("win")) return "windows";
    if (userAgent.includes("android") || userAgent.includes("raspberry") || userAgent.includes("raspbian")) return "arm";
    if (userAgent.includes("linux")) return "linux";
    if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("ipod")) return "ios";
    if (userAgent.includes("mac")) return "macos";
    return "";
}

function initGuiModal() {
    const modal = document.getElementById("guiModal");
    if (!modal) return;

    const closeCross = document.getElementById("guiModalCloseCross");
    const dismissBtn = document.getElementById("guiModalDismissBtn");

    function openModal() {
        modal.classList.add("show");
        modal.style.display = "block";
        modal.removeAttribute("aria-hidden");
        document.body.classList.add("modal-open");

        let backdrop = document.querySelector(".modal-backdrop");
        if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.className = "modal-backdrop fade show";
            document.body.appendChild(backdrop);
            backdrop.addEventListener("click", closeModal);
        }
    }

    function closeModal() {
        modal.classList.remove("show");
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
            backdrop.remove();
        }
    }

    if (closeCross) closeCross.addEventListener("click", closeModal);
    if (dismissBtn) dismissBtn.addEventListener("click", closeModal);

    const downloadLinks = document.querySelectorAll('.download-item .button');

    downloadLinks.forEach(link => {
        link.addEventListener("click", function() {
            openModal();
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const downloadCards = document.getElementById("download-cards");
    if (downloadCards) {
        const userOS = getUserOS();
        const recommendedCardContainer = document.getElementById(`${userOS}-card`);
        if (recommendedCardContainer) {
            recommendedCardContainer.classList.add("order-first");
            const recommendedCard = recommendedCardContainer.querySelector(".card");
            if (recommendedCard) {
                recommendedCard.classList.replace("border-dark", "border-success");
            }
        }
    }

    initGuiModal();
});
