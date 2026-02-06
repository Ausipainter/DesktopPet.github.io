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
        
        const wrappers = Array.from(column.children);
        if (wrappers.length > 0) {
            const firstWrapper = wrappers[0];
            const wrapperHeight = firstWrapper.offsetHeight;
            
            let loopedMovement = movement % wrapperHeight;
            if (loopedMovement < 0) {
                loopedMovement += wrapperHeight;
            }
            
            wrappers.forEach((wrapper, index) => {
                const offset = (index - 2) * wrapperHeight; 
                wrapper.style.transform = `translateY(${offset - loopedMovement}px)`;
            });
        }
    });
});
let found = false
const cube = document.getElementById('cube');
const target = document.getElementById('target');
const animations = document.getElementById('animation');
let x = 100;
let y = 100;
const speed = 10;
const cubeSize = 50;
let cubeVisible = false; 

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

document.addEventListener('keydown', (event) => {
   
    if (!cubeVisible && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        cube.classList.add('visible');
        target.classList.add('visible');
        
        

        cubeVisible = true;
    }
    
    if (event.key === 'ArrowUp') {
        y -= speed;
    } else if (event.key === 'ArrowDown') {
        y += speed;
    } else if (event.key === 'ArrowLeft') {
        x -= speed;
    } else if (event.key === 'ArrowRight') {
        x += speed;
    }
    
    
    x = Math.max(0, Math.min(window.innerWidth - cubeSize, x));
    y = Math.max(0, Math.min(window.innerHeight - cubeSize, y));
    
    cube.style.top = y + 'px';
    cube.style.left = x + 'px';
    
    if(!found){
    if (checkCollision(cube, target)) {
        console.log('Collision detected!');
        alert('You found the secret!');
        found = true
        animations.classList.add('visible');
        
    }}
});
let t = false
let a = false
let l = false
let a2 = false
let b = false
let r = false
let o = false
window.addEventListener('keypress', (event) =>{
    if (event.key === "t"){
        t = true
    }
    if(event.key === "a" && t){
        a = true
    }
    if (event.key === "l" && t && a){
        l = true
    }
    if(event.key === 'a' && t && a && l){
        a2 = true
    }
    if(event.key === "b" && t && a && l && a2){
        b = true
    }
    if(event.key === "r" && t && a &&l && a2 &&b){
        r = true
    }
    if(event.key === "o" && t && a && l && a2 && b && r){
        o = true
    }
    
    if(t && a && l && a2 && b && r && o){
        yippie.classList.add("visible");
    }
})

let yippie = document.querySelector(".yippe")
