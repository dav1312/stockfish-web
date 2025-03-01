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
    if (userAgent.includes("win")) return "Windows";
    if (userAgent.includes("android") || userAgent.includes("raspberry") || userAgent.includes("raspbian")) return "ARM";
    if (userAgent.includes("linux")) return "Linux";
    if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("ipod")) return "iOS";
    if (userAgent.includes("mac")) return "macOS";
    return "Other";
}

