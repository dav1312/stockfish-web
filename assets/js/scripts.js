const body = document.querySelector('body')
const menuTrigger = document.querySelector('#toggle-main-menu-mobile');
const menuContainer = document.querySelector('#main-menu-mobile');

if (menuTrigger && menuContainer) {
    menuTrigger.onclick = function() {
        menuContainer.classList.toggle('open');
        menuTrigger.classList.toggle('is-active')
        body.classList.toggle('lock-scroll')
    }
}

function getUserOS() {
    if (navigator.userAgentData && navigator.userAgentData.platform) {
        const platform = navigator.userAgentData.platform.toLowerCase();
        if (platform.includes("win")) return "windows";
        if (platform.includes("android")) return "arm";
        if (platform.includes("linux")) return "linux";
        if (platform.includes("mac")) return "macos";
        if (platform.includes("ios") || platform.includes("iphone") || platform.includes("ipad")) return "ios";
    }

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
        const recommendedCardContainer = document.getElementById(`${userOS}-card`);
        if (recommendedCardContainer) {
            // Synchronously position top standalone card
            recommendedCardContainer.className = "col-12 col-md-8 col-lg-6 mb-4 d-flex align-items-stretch";
            recommendedCardContainer.style.order = "-2";

            // Insert flex line break so no other OS card sits on the top row
            const flexBreak = document.createElement("div");
            flexBreak.className = "w-100";
            flexBreak.style.order = "-1";
            recommendedCardContainer.after(flexBreak);

            const recommendedCard = recommendedCardContainer.querySelector(".card");
            if (recommendedCard) {
                recommendedCard.classList.replace("border-dark", "border-success");
            }

            // Async architecture check for Windows ARM vs x86-64
            if (userOS === "windows" && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
                navigator.userAgentData.getHighEntropyValues(["architecture", "bitness"])
                    .then(ua => {
                        if (ua.architecture === "arm") {
                            const primaryBtn = recommendedCardContainer.querySelector(".button-download");
                            const secondaryBtn = recommendedCardContainer.querySelector(".button-secondary");

                            if (primaryBtn && secondaryBtn && secondaryBtn.href.includes("arm64")) {
                                const primaryParent = primaryBtn.parentElement;
                                const secondaryParent = secondaryBtn.parentElement;

                                primaryBtn.className = "button button-secondary d-block rounded text-center w-100";
                                secondaryBtn.className = "button button-download w-100 text-center py-2 d-block rounded font-weight-bold";

                                primaryParent.appendChild(secondaryBtn);
                                secondaryParent.appendChild(primaryBtn);
                            }
                        }
                    })
                    .catch(() => {
                        // Ignore errors and keep default x86-64 layout
                    });
            }
        }
    }
});
