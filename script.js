const container = document.getElementById('birthdayContainer');
const message = "¡Happy Birthday My Friend!";
const pastelColors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E6CCFF", "#FFD6E0"];
const balloonsContainer = document.getElementById('balloonsContainer');

// Crear letras coloridas
message.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('letter');
    span.style.color = pastelColors[index % pastelColors.length];
    container.appendChild(span);
});

// Mostrar letras una por una
const letters = document.querySelectorAll('.letter');
letters.forEach((letter, i) => {
    setTimeout(() => {
        letter.classList.add('show');
    }, i * 100);
});

// Después de 5 segundos, las letras vuelan
setTimeout(() => {
    letters.forEach((letter, i) => {
        setTimeout(() => {
            letter.classList.add('fly');
        }, i * 200);
    });
}, 5000);

// Crear globos continuamente
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * window.innerWidth + 'px';
    balloon.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    balloon.style.animationDuration = (5 + Math.random() * 5) + 's'; // Velocidad variada
    balloonsContainer.appendChild(balloon);

    // Borrar el globo cuando termine su animación
    setTimeout(() => {
        balloon.remove();
    }, 10000);
}

setInterval(createBalloon, 300); // Más globos más seguido

// Fuegos artificiales 🎆
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const particles = [];

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 3,
            color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            alpha: 1
        });
    }
    fireworks.push(particles);
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((particles, index) => {
        particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.01;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
            ctx.fill();
        });

        if (particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#',''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

// Crear fuegos artificiales cada cierto tiempo
setInterval(createFirework, 1500);

animateFireworks();

// Ajustar el canvas si la ventana cambia de tamaño
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


