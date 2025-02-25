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

function createiOSCard(isCurrentOS = false) {
    const card = document.createElement('div');
    card.className = `col-md-${isCurrentOS ? '12' : '6'} mb-2 px-1`;

    const cardInner = document.createElement('div');
    cardInner.className = `card h-100 overflow-hidden rounded-lg ${isCurrentOS ? 'border-success' : 'border-dark'}`;

    const header = document.createElement('div');
    header.className = 'card-header d-flex align-items-center';
    header.innerHTML = `
        <span class="fs-5 font-weight-bold">iOS</span>
        ${isCurrentOS ? '<span class="badge badge-success ml-1">Recommended</span>' : ''}
    `;

    const body = document.createElement('div');
    body.className = 'card-body py-0';
    body.innerHTML = `
        <div class="download-item py-1 border-bottom d-flex align-items-center">
            <div class="flex-grow-1 mr-1">
                <span>🐟</span>
                <strong>SmallFish</strong>
                <div class="text-muted">Recommended iOS App</div>
            </div>
            <a href="https://apps.apple.com/us/app/smallfish-chess-for-stockfish/id675049147" target="_blank" class="rounded button">App Store</a>
        </div>
    `;

    cardInner.appendChild(header);
    cardInner.appendChild(body);
    card.appendChild(cardInner);
    return card;
}

function createDownloadCard(osName, osData, isCurrentOS = false) {
    const firstOption = osData[0];

    const card = document.createElement('div');
    card.className = `col-md-${isCurrentOS ? '12' : '6'} mb-2 px-1`;

    const cardInner = document.createElement('div');
    cardInner.className = `card h-100 overflow-hidden rounded-lg ${isCurrentOS ? 'border-success' : 'border-dark'}`;

    const header = document.createElement('div');
    header.className = 'card-header d-flex align-items-center';
    header.innerHTML = `
        <span class="fs-5 font-weight-bold">${osName}</span>
        ${isCurrentOS ? '<span class="badge badge-success ml-1">Recommended</span>' : ''}
    `;

    const body = document.createElement('div');
    body.className = 'card-body py-0';

    // Add first download option (always visible)
    const firstItem = createDownloadItem(firstOption);
    if (isCurrentOS) {
        firstItem.querySelector('.text-muted').textContent = 'Recommended for most users';
    }
    body.appendChild(firstItem);

    // Add remaining options (initially hidden)
    if (osData.length > 1) {
        const remainingItems = document.createElement('div');
        remainingItems.className = 'remaining-items hidden';

        for (let i = 1; i < osData.length; i++) {
            remainingItems.appendChild(createDownloadItem(osData[i]));
        }

        body.appendChild(remainingItems);

        // Add show more button
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more btn btn-link w-100 py-1 text-center';
        showMoreBtn.textContent = 'Show more options';
        showMoreBtn.onclick = function() {
            const items = this.parentElement.querySelector('.remaining-items');
            items.classList.toggle('hidden');
            this.textContent = items.classList.contains('hidden') ?
                'Show more options' : 'Show fewer options';
        };
        body.appendChild(showMoreBtn);
    }

    cardInner.appendChild(header);
    cardInner.appendChild(body);

    // Add special footer for Windows
    if (osName === 'Windows') {
        const footer = document.createElement('div');
        footer.className = 'card-footer text-muted';
        footer.innerHTML = `
            <div><strong>Note for systems with more than 64 threads:</strong> Consider setting <code>NumaPolicy</code> to <code>hardware</code>.</div>
            <div>Read more about NUMA configuration in the <a href="https://official-stockfish.github.io/docs/stockfish-wiki/UCI-&-Commands.html#setoption" target="_blank">official documentation</a>.</div>
        `;
        cardInner.appendChild(footer);
    }

    // Add special footer and additional options for macOS
    if (osName === 'macOS') {
        const footer = document.createElement('div');
        footer.className = 'card-footer';
        footer.textContent = 'Alternative methods:';
        cardInner.appendChild(footer);

        const additionalBody = document.createElement('div');
        additionalBody.className = 'card-body py-0';
        additionalBody.innerHTML = `
            <div class="download-item py-1 border-bottom d-flex align-items-center">
                <div class="flex-grow-1 mr-1">
                    <span>🐟</span>
                    <strong>Stockfish Chess</strong>
                    <div class="text-muted">Recommended macOS App (<a href="https://github.com/daylen/stockfish-mac" target="_blank">GitHub</a>)</div>
                </div>
                <a href="https://apps.apple.com/us/app/stockfish-chess/id801463932" target="_blank" class="rounded button">App Store</a>
            </div>
            <div class="download-item py-1 border-bottom d-flex align-items-center">
                <div class="flex-grow-1 mr-1">
                    <span>🍺</span>
                    <strong>Homebrew</strong>
                    <div class="text-muted">Install via Terminal: <code>brew install stockfish</code></div>
                </div>
                <a href="https://formulae.brew.sh/formula/stockfish" target="_blank" class="rounded button">Homebrew</a>
            </div>
        `;
        cardInner.appendChild(additionalBody);
    }

    card.appendChild(cardInner);
    return card;
}

function createDownloadItem(item) {
    const div = document.createElement('div');
    div.className = 'download-item py-1 border-bottom d-flex justify-content-between align-items-center';

    const baseDownloadLink = "https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-";

    div.innerHTML = `
        <div class="mr-1">
            <strong>${item.arch}</strong>
            <div class="text-muted"></div>
        </div>
        <a href="${baseDownloadLink}${item.file}" class="rounded button">Download</a>
    `;

    return div;
}

// Load and process assets.json
fetch('/assets.json?v=' + new Date().getTime()).then(response => response.json()).then(data => {
    const currentOS = getUserOS();
    const container = document.querySelector('#download-cards');
    if (!container) return;
    container.innerHTML = '';

    // First add the current OS card
    if (currentOS === 'iOS') {
        container.appendChild(createiOSCard(true));
    } else if (data[currentOS]) {
        container.appendChild(createDownloadCard(currentOS, data[currentOS], true));
    }

    // Then add all other OS cards
    for (const [osName, osData] of Object.entries(data)) {
        if (osName !== currentOS) {
            container.appendChild(createDownloadCard(osName, osData, false));
            // Add iOS card after macOS if user is not on iOS
            if (osName === 'macOS' && currentOS !== 'iOS') {
                container.appendChild(createiOSCard(false));
            }
        }
    }
});
