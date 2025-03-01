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

function populateDownloadOptions(osName, osData, isRecommended = false) {
    const cardId = `${osName.toLowerCase()}-card`;
    const card = document.getElementById(cardId);
    if (!card) return;

    if (isRecommended) {
        card.className = 'col-md-12 mb-2 px-1';
        card.querySelector('.card').classList.replace('border-dark', 'border-success');
        card.querySelector('.card-header').innerHTML += '<span class="badge badge-success ml-1">Recommended</span>';
    }

    const optionsContainer = card.querySelector('.download-options');
    if (!optionsContainer || !osData) return;

    const baseDownloadLink = "https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-";

    // Add first download option
    const firstOptionHtml = `
        <div class="download-item py-1 border-bottom d-flex justify-content-between align-items-center">
            <div class="mr-1">
                <strong>${osData[0].arch}</strong>
                <div class="text-muted">${osData[0].description || ''}</div>
            </div>
            <a href="${baseDownloadLink}${osData[0].file}" class="rounded button">Download</a>
        </div>
    `;
    optionsContainer.innerHTML = firstOptionHtml;

    // Add remaining options if they exist
    if (osData.length > 1) {
        const remainingItems = document.createElement('div');
        remainingItems.className = 'remaining-items hidden';
        
        for (let i = 1; i < osData.length; i++) {
            remainingItems.innerHTML += `
                <div class="download-item py-1 border-bottom d-flex justify-content-between align-items-center">
                    <div class="mr-1">
                        <strong>${osData[i].arch}</strong>
                        <div class="text-muted">${osData[i].description || ''}</div>
                    </div>
                    <a href="${baseDownloadLink}${osData[i].file}" class="rounded button">Download</a>
                </div>
            `;
        }
        
        optionsContainer.appendChild(remainingItems);

        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more btn btn-link w-100 py-1 text-center';
        showMoreBtn.textContent = 'Show more options';
        showMoreBtn.onclick = function() {
            const items = this.previousElementSibling;
            items.classList.toggle('hidden');
            this.textContent = items.classList.contains('hidden') ?
                'Show more options' : 'Show fewer options';
        };
        optionsContainer.appendChild(showMoreBtn);
    }
}

// Load and process assets.json
fetch('/assets.json?v=' + new Date().getTime())
    .then(response => response.json())
    .then(data => {
        const currentOS = getUserOS();
        const container = document.querySelector('#download-cards');
        if (!container) return;

        // Populate all cards
        for (const [osName, osData] of Object.entries(data)) {
            populateDownloadOptions(osName, osData, osName === currentOS);
        }

        // Move current OS card to the top if it exists
        const currentCard = document.getElementById(`${currentOS.toLowerCase()}-card`);
        if (currentCard) {
            container.insertBefore(currentCard, container.firstChild);
        }

        // Move iOS card after macOS if not on iOS
        if (currentOS !== 'iOS') {
            const iosCard = document.getElementById('ios-card');
            const macosCard = document.getElementById('macos-card');
            if (iosCard && macosCard) {
                macosCard.parentNode.insertBefore(iosCard, macosCard.nextSibling);
            }
        }
    });
