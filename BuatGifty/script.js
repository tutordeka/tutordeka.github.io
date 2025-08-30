var klikA = new Audio("https://dekatutorial.github.io/ct/klk.mp3");
klikA.autoplay = false;
klikA.loop = false;

const musikA = new Audio(musik);
musikA.autoplay = true;
musikA.loop = true;

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const book = document.querySelector(".book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

const btnContainer = document.querySelector(".btn-container");
const openBtn = document.querySelector(".open-btn");
const navBtn = document.querySelector(".nav");
const pesanBtn = document.querySelector(".pesan-btn");

for (let i = 0; i < konten.length - 1; i++) {
  const paperE = document.createElement("div");
  paperE.classList.add("paper");

  paperE.innerHTML = `
        <div class="front">
          <div class="front-content" style="--bg: url('${konten[i]}')"></div>
        </div>
        <div class="back">
          <div class="back-content" style="--bg: url('${konten[i + 1]}')"></div>
        </div>`;

  book.appendChild(paperE);
}

openBtn.onclick = () => {
  musikA.play();
  if (isKlikAudio) klikA.play();
  clickHandler(1);
  btnContainer.classList.add("hide");
  setTimeout(() => {
    openBtn.classList.remove("show");
    navBtn.classList.add("show");
    btnContainer.classList.remove("hide");
  }, 500);
};

pesanBtn.onclick = kirimPesan;

prevBtn.addEventListener("click", () => {
  if (isKlikAudio) klikA.play();
  clickHandler(0);
});
nextBtn.addEventListener("click", () => {
  if (isKlikAudio) klikA.play();
  clickHandler(1);
});

function openBook() {
  book.style.transform = "translateX(50%)";
  book.classList.remove("fs");
  book.classList.remove("bs");
}

function closeBook(isAtBegining) {
  if (isAtBegining) {
    book.classList.add("fs");
    book.style.transform = "translateX(0%)";
    papers.forEach((paper, index) => {
      paper.querySelector(".front").style.transform = `rotateY(0deg)`;
      paper.querySelector(".back").style.transform = `rotateY(0deg)`;
    });
  } else {
    book.classList.add("bs");
    book.style.transform = "translateX(100%)";
    papers.forEach((paper, index) => {
      paper.querySelector(".front").style.transform = `rotateY(-180deg)`;
      paper.querySelector(".back").style.transform = `rotateY(-180deg)`;
    });
  }

  papers.forEach((paper, index) => {
    const paperBack = paper.querySelector(".back");
    paperBack.style.boxShadow = `7px 5px 12px rgba(0, 0, 0, 0)`;
  });
}
const papers = document.querySelectorAll(".paper");
const paperTotal = papers.length;
let currentLocation = 0;
let zInd = paperTotal;
let dataZIndex = [];
papers.forEach((element) => {
  element.style.zIndex = zInd;
  dataZIndex.push(zInd);
  zInd--;
});

let clck = 1;
function clickHandler(x) {
  if (clck) {
    if (x) {
      goNextPage();
    } else {
      goPrevPage();
    }
    clck = 0;
    setTimeout(() => {
      clck = 1;
    }, 500);
  }
}

if (!tampilKirimPesan) {
  pesanBtn.style.display = "none";
}

function goNextPage() {
  if (currentLocation == paperTotal - 1) pesanBtn.classList.add("show");
  if (currentLocation < paperTotal) {
    let time = 250;
    if (currentLocation == 0) time = 300;
    if (currentLocation == paperTotal - 1) time = 200;
    const tmp = currentLocation;
    setTimeout(() => {
      papers[tmp].style.zIndex = `${tmp}`;
    }, time);

    const activeNow = currentLocation;
    paperHandler(activeNow);

    if (currentLocation == paperTotal - 1) closeBook(0);
    else openBook();

    // console.log(`Active now : ${currentLocation}`);
    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 0 && currentLocation <= paperTotal) {
    currentLocation--;

    let time = 250;
    if (currentLocation == 0) time = 200;
    if (currentLocation == paperTotal - 1) time = 300;
    const tmp = currentLocation;
    setTimeout(() => {
      papers[tmp].style.zIndex = `${dataZIndex[tmp]}`;
    }, time);

    const activeNow = currentLocation - 1;
    paperHandler(activeNow);

    if (currentLocation == 0) closeBook(1);
    if (currentLocation == paperTotal - 1) openBook();
  }
}

function paperHandler(activeNow) {
  papers.forEach((paper, index) => {
    const paperFront = paper.querySelector(".front");
    const paperBack = paper.querySelector(".back");
    if (activeNow >= 0) {
      if (index >= activeNow - 2 && index <= activeNow + 3) {
        paperBack.style.boxShadow = `7px 5px 12px rgba(0, 0, 0, 0.2)`;
      } else {
        paperBack.style.boxShadow = `7px 5px 12px rgba(0, 0, 0, 0)`;
      }

      if (index == activeNow) {
        paperFront.style.transform = `rotateY(-150deg)`;
        paperBack.style.transform = `rotateY(-150deg)`;
      } else if (index == activeNow - 1) {
        paperFront.style.transform = `rotateY(-160deg)  scaleX(105%)`;
        paperBack.style.transform = `rotateY(-160deg)  scaleX(105%)`;
      } else if (index <= activeNow - 2) {
        paperFront.style.transform = `rotateY(-170deg)  scaleX(110%)`;
        paperBack.style.transform = `rotateY(-170deg)  scaleX(110%)`;
      } else if (index == activeNow + 1) {
        paperFront.style.transform = `rotateY(-30deg)`;
        paperBack.style.transform = `rotateY(-30deg)`;
      } else if (index == activeNow + 2) {
        paperFront.style.transform = `rotateY(-20deg)  scaleX(105%)`;
        paperBack.style.transform = `rotateY(-20deg)  scaleX(105%)`;
      } else if (index >= activeNow + 3) {
        paperFront.style.transform = `rotateY(-10deg) scaleX(110%)`;
        paperBack.style.transform = `rotateY(-10deg) scaleX(110%)`;
      }
    }
  });
}

function createEmoji() {
  const element = document.createElement("div");
  element.classList.add("love-item");
  element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;

  const size = Math.random() * 20 + 20; // Ukuran antara 20px dan 50px
  element.style.width = `${size}px`;

  const leftPosition = Math.random() * window.innerWidth;
  element.style.left = `${leftPosition}px`;

  const duration = Math.random() * 3 + 2; // Durasi antara 2 dan 5 detik
  element.style.animationDuration = `${duration}s`;

  document.querySelector(".bg-love").appendChild(element);

  setTimeout(() => {
    element.remove();
  }, duration * 1000);
}

// setInterval(createEmoji, 500);

window.onload = () => {
  const preload = document.querySelector(".preload");
  preload.style = "transition: .5s ease all; opacity: 0";
  setTimeout(() => {
    preload.remove();
  }, 500);
};
