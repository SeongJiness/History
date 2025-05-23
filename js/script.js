// starting main page up
// 이페이지는 main page up 을 위해 만들었습니다
let current = 0;
const images = document.querySelectorAll(".main_up_carousel-image");
const total = images.length;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("main_up_active");
    if (i === index) {
      img.classList.add("main_up_active");
    }
  });
}

setInterval(() => {
  current = (current + 1) % total;
  showImage(current);
}, 3000);
// ending main page up
