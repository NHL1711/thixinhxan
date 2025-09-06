document.addEventListener("DOMContentLoaded", () => {
  const passwordScreen = document.querySelector(".password-screen");
  const questionScreen = document.querySelector(".question-screen");
  const effectScreen = document.getElementById("effect-screen");
  const finalScreen = document.querySelector(".final-screen");

  const codeDisplay = document.getElementById("code-display");
  const keys = document.querySelectorAll(".key");

  const questionButtons = document.querySelectorAll(".btn");
  const effectText = document.getElementById("effect-text");
  const effectIcon = document.getElementById("effect-icon");

  let inputCode = "";
  let wrongAttempts = 0;
  const correctCode = "1711";

  // Xử lý nhập mật khẩu
  keys.forEach(key => {
    key.addEventListener("click", () => {
      if (key.classList.contains("clear")) {
        inputCode = inputCode.slice(0, -1);
      } else {
        inputCode += key.textContent;
      }

      codeDisplay.textContent = inputCode.padEnd(4, "-");

      if (inputCode.length === 4) {
        if (inputCode === correctCode) {
          // Đúng mật khẩu → sang màn hình câu hỏi
          passwordScreen.classList.add("hidden");
          questionScreen.classList.remove("hidden");
          inputCode = "";
          codeDisplay.textContent = "----";
        } else {
          wrongAttempts++;
          inputCode = "";
          codeDisplay.textContent = "----";

          if (wrongAttempts >= 2) {
            alert("Thi thúi quắc bị khùng");
          } else {
            alert("Sai rồi, thử lại nhé!");
          }
        }
      }
    });
  });

  // Xử lý câu hỏi
  questionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      questionScreen.classList.add("hidden");
      effectScreen.classList.remove("hidden");

      if (btn.dataset.answer === "A") {
        document.body.style.backgroundColor = "pink";
        effectText.textContent = "Ơ hay vậy là biết nhớ mình mà không cứng miệng luôn này";
        effectIcon.innerHTML = "❤️";
      } else {
        document.body.style.backgroundColor = "lightblue";
        effectText.textContent = "Biết thế nào vk cũng chọn cái này, có anh là nhớ nhiều thôi";
        effectIcon.innerHTML = "☁️💧";
      }

      // Sau 3 giây chuyển sang màn hình cuối
      setTimeout(() => {
        effectScreen.classList.add("hidden");
        document.body.style.backgroundColor = "black";
        finalScreen.classList.remove("hidden");
        startFireworks();
      }, 3000);
    });
  });

  // Hiệu ứng pháo hoa
  function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.alpha = 1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      const colors = ["#ff4d4d", "#ffcc00", "#66ff66", "#66ccff", "#ff66cc"];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    setInterval(createFirework, 800);
    animate();
  }
});
