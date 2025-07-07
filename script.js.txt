function showQuestion() {
  document.querySelector(".heart-wrapper").style.display = "none";
  document.getElementById("question-box").classList.remove("hidden");
}

function checkAnswer(answer) {
  const result = document.getElementById("result-text");
  if (answer === "B") {
    result.innerHTML = "Vk phũ phàng thế nào cũng chọn cái này =)))<br>...Loading điều bí mật tiếp theo";
    setTimeout(() => {
      document.getElementById("question-box").classList.add("hidden");
      document.getElementById("boom").classList.remove("hidden");
    }, 3000);
  } else {
    result.innerText = "Không đúng rồi... Chọn lại đi 😢";
  }
}
