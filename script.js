const buttons = document.querySelectorAll('.btn');
const effectScreen = document.getElementById('effect-screen');
const effectText = document.getElementById('effect-text');
const effectIcon = document.getElementById('effect-icon');
const passwordScreen = document.querySelector('.password-screen');
const keypad = document.querySelectorAll('.key');
const codeDisplay = document.getElementById('code-display');
const finalScreen = document.querySelector('.final-screen');

let password = '';
let wrongAttempts = 0;
const correctPassword = '1711';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.dataset.answer;
    effectScreen.classList.remove('hidden');

    if (answer === 'A') {
      effectScreen.style.background = '#ffe4ec';
      effectText.innerText = 'Ơ hay vậy là biết nhớ mình mà không cứng miệng luôn này';
      effectIcon.innerHTML = '💖';
      effectIcon.style.fontSize = '5rem';
    } else {
      effectScreen.style.background = '#d0f0ff';
      effectText.innerText = 'Biết thế nào vk cũng chọn cái này, có mình là nhớ nhiều thôi';
      effectIcon.innerHTML = '🌧️☁️';
      effectIcon.style.fontSize = '4rem';
    }

    setTimeout(() => {
      effectScreen.classList.add('hidden');
      passwordScreen.classList.remove('hidden');
    }, 4000);
  });
});

keypad.forEach(key => {
  key.addEventListener('click', () => {
    if (key.classList.contains('clear')) {
      password = '';
    } else {
      if (password.length < 4) password += key.innerText;
    }
    codeDisplay.innerText = password.padEnd(4, '-');

    if (password.length === 4 && password !== correctPassword) {
      wrongAttempts++;
      password = '';
      codeDisplay.innerText = '----';
      if (wrongAttempts >= 2) {
        showEasterEgg();
      }
    }

    if (password === correctPassword) {
      passwordScreen.classList.add('hidden');
      finalScreen.classList.remove('hidden');
      startFireworks();
    }
  });
});

function showEasterEgg() {
  passwordScreen.classList.add('shake');
  setTimeout(() => passwordScreen.classList.remove('shake'), 500);
  alert('Thi thúi quắc bị khùng');
  const emoji = document.createElement('div');
  emoji.innerText = '💔🥴💥';
  emoji.style.position = 'fixed';
  emoji.style.top = '10px';
  emoji.style.left = '50%';
  emoji.style.transform = 'translateX(-50%)';
  emoji.style.fontSize = '3rem';
  emoji.style.animation = 'fall 2s forwards';
  document.body.appendChild(emoji);
}

function startFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  function createParticle() {
    return {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 4 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      dx: (Math.random() - 0.5) * 10,
      dy: (Math.random() - 0.5) * 10,
      alpha: 1,
    };
  }

  for (let i = 0; i < 100; i++) {
    particles.push(createParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.01;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}

