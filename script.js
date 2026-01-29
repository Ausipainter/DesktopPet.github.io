

const columns = document.querySelectorAll('.column');


const arrowBtn = document.getElementById('arrowBtn');
const navDrawer = document.getElementById('navDrawer');
let hasOpened = false;
arrowBtn.addEventListener('click', () => {
    navDrawer.classList.toggle('open');
    if (!hasOpened) {
    hasOpened = true
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
let hasScrolled = false;


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    
    columns.forEach(column => {
    const speed = parseFloat(column.dataset.speed);
    const movement = scrolled * speed;
    column.style.backgroundPosition = `center ${-movement}px`;
    });
    

    
});
