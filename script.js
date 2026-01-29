const columns = document.querySelectorAll('.column');

const CHANCE_FOR_SPECIAL = 0.3;


const webImages = [
    'UpsideDownJokerU.png',
    'InvincibleJokerU.png',
    'BaldJokerC.png',
    'OopyGoopyL.png'
];
const imageList = []
webImages.forEach(img =>{
    imageList.push('Images/RareBg/'+img)
})

columns.forEach((column, colIndex) => {
    
    const isOdd = colIndex % 2 === 0;
    const normalImage = isOdd ? 'Images/combined_column.png' : 'Images/combined_column2.png';
    
    
    const tilesWrapper = document.createElement('div');
    tilesWrapper.style.position = 'absolute';
    tilesWrapper.style.top = '0';
    tilesWrapper.style.left = '0';
    tilesWrapper.style.width = '100%';
    
    
    const numberOfTiles = 50; 
    
    for (let i = 0; i < numberOfTiles; i++) {
        
        if (i !== 0 && Math.random() < CHANCE_FOR_SPECIAL) {
            let chance = Math.floor(Math.random() * imageList.length);
            
            const specialTile = document.createElement('img');
            specialTile.src = imageList[chance];
            specialTile.style.width = '100%';
            specialTile.style.display = 'block';
            specialTile.style.imageRendering = 'pixelated';
            tilesWrapper.appendChild(specialTile);
        }
        
        
        const normalTile = document.createElement('img');
        normalTile.src = normalImage;
        normalTile.style.width = '100%';
        normalTile.style.display = 'block';
        normalTile.style.imageRendering = 'pixelated';
        tilesWrapper.appendChild(normalTile);
    }
    
    column.appendChild(tilesWrapper);
    
    const cloneBefore1 = tilesWrapper.cloneNode(true);
    const cloneBefore2 = tilesWrapper.cloneNode(true);
    const cloneAfter1 = tilesWrapper.cloneNode(true);
    const cloneAfter2 = tilesWrapper.cloneNode(true);
    
    column.insertBefore(cloneBefore2, tilesWrapper);
    column.insertBefore(cloneBefore1, tilesWrapper);
    
    column.appendChild(cloneAfter1);
    column.appendChild(cloneAfter2);
});


const arrowBtn = document.getElementById('arrowBtn');
const navDrawer = document.getElementById('navDrawer');
let hasOpened = false;
arrowBtn.addEventListener('click', () => {
    navDrawer.classList.toggle('open');
    if (!hasOpened) {
        hasOpened = true;
        tooltip.style.display = 'none';
    }
});


document.querySelectorAll('.nav-items li a').forEach(link => {
    link.addEventListener('click', () => {
        navDrawer.classList.remove('open');
    });
});


const tooltip = document.createElement('div');
tooltip.textContent = 'Click for navigation';
tooltip.className = 'nav-tooltip';
document.body.appendChild(tooltip);

function positionTooltip() {
    const rect = arrowBtn.getBoundingClientRect();
    tooltip.style.top = rect.top + 'px';
    tooltip.style.left = (rect.right + 10) + 'px';
}

positionTooltip();
window.addEventListener('resize', positionTooltip);


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    columns.forEach(column => {
        const speed = parseFloat(column.dataset.speed);
        const movement = scrolled * speed;
        
        // Get all wrappers in this column
        const wrappers = Array.from(column.children);
        if (wrappers.length > 0) {
            const firstWrapper = wrappers[0];
            const wrapperHeight = firstWrapper.offsetHeight;
            
            // Calculate position with looping (works for both positive and negative speeds)
            let loopedMovement = movement % wrapperHeight;
            if (loopedMovement < 0) {
                loopedMovement += wrapperHeight;
            }
            
            // Apply parallax to each wrapper - offset by 2 wrapper heights to account for clones before
            wrappers.forEach((wrapper, index) => {
                const offset = (index - 2) * wrapperHeight; // -2 because we have 2 clones before the original
                wrapper.style.transform = `translateY(${offset - loopedMovement}px)`;
            });
        }
    });
});