const multiple = 20; // 控制旋轉幅度
const card = document.querySelectorAll(".card");

const outer = document.querySelectorAll(".outer");

for (let out of outer) {
  out.addEventListener("mousemove", (e) => {
    let cardEl = out.children[0].getBoundingClientRect();
    let calcY = (e.clientX - cardEl.x - cardEl.width / 2) / multiple;
    let calcX = -(e.clientY - cardEl.y - cardEl.height / 2) / multiple;
    out.children[0].style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg) `;
  });
  out.addEventListener("mouseleave", (e) => {
    out.children[0].style.transform = `rotateX(0deg) rotateY(0deg) `;
  });
}

// for (let c of card) {
//   c.addEventListener("mousemove", (e) => {
//     let cardEl = c.getBoundingClientRect();
//     let calcY = (e.clientX - cardEl.x - cardEl.width / 2) / multiple;
//     let calcX = -(e.clientY - cardEl.y - cardEl.height / 2) / multiple;
//     c.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg) `;
//   });
//   c.addEventListener("mouseleave", (e) => {
//     c.style.transform = `rotateX(0deg) rotateY(0deg) `;
//   });
// }
