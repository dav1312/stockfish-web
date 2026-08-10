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
            recommendedCardContainer.className = "col-12 col-md-8 col-lg-6 mb-10 d-flex align-items-stretch";
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

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById("interfaceCarousel");
    if (carousel) {
        const items = carousel.querySelectorAll(".carousel-item");
        const indicators = carousel.querySelectorAll(".carousel-indicators li");
        const prevBtn = carousel.querySelector(".carousel-control-prev");
        const nextBtn = carousel.querySelector(".carousel-control-next");
        let currentIndex = 0;
        let intervalId = null;

        function showSlide(index) {
            if (index < 0) index = items.length - 1;
            if (index >= items.length) index = 0;
            currentIndex = index;

            items.forEach((item, i) => {
                item.classList.toggle("active", i === currentIndex);
            });

            indicators.forEach((ind, i) => {
                ind.classList.toggle("active", i === currentIndex);
            });
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            intervalId = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function(e) {
                e.preventDefault();
                showSlide(currentIndex - 1);
                startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function(e) {
                e.preventDefault();
                nextSlide();
                startAutoPlay();
            });
        }

        indicators.forEach((ind, i) => {
            ind.addEventListener("click", function(e) {
                e.preventDefault();
                showSlide(i);
                startAutoPlay();
            });
        });

        carousel.addEventListener("mouseenter", stopAutoPlay);
        carousel.addEventListener("mouseleave", startAutoPlay);

        startAutoPlay();
    }
});
