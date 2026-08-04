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

document.addEventListener("DOMContentLoaded", function() {
    const downloadCards = document.getElementById("download-cards");
    if (downloadCards) {
        const userOS = getUserOS();
        const recommendedCard = document.querySelector(`#${userOS}-card .card`);
        if (recommendedCard) {
            recommendedCard.classList.replace("border-dark", "border-success");
            const parent = recommendedCard.parentElement;
            if (parent) {
                parent.classList.remove("col-lg-4", "col-md-6");
                parent.classList.add("col-12");
                parent.classList.add("order-first");
            }
            const cardHeader = recommendedCard.querySelector(".card-header");
            if (cardHeader) {
                const badge = document.createElement("span");
                badge.className = "badge badge-success mt-2";
                badge.textContent = "Recommended for your OS";
                cardHeader.appendChild(badge);
            }
        }
        // Add event listeners for show more buttons
        document.querySelectorAll('.show-more').forEach(button => {
            button.addEventListener('click', function() {
                const items = this.previousElementSibling;
                items.classList.toggle('hidden');
                this.textContent = items.classList.contains('hidden') ?
                    'Show more options' : 'Show fewer options';
            });
        });
    }
});
