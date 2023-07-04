const mobileMenu = document.querySelector(".mobile-menu");
const burgerNavbar = document.querySelector(".nav-burger-open");

loadData();
mobileMenu.addEventListener("click", function () {
  burgerNavbar.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

function loadData() {
  const section = document.querySelector("#offcanvasRight section");
  let myListArray = JSON.parse(localStorage.getItem("cartList"));

  cartHave(); //判定購物車有無物品，若沒有則更換區塊

  if (myListArray != null) {
    myListArray.forEach((item) => {
      let drinkName = item.drinkName;
      let size = item.size;
      let sweet = item.sweet;
      let ice = item.ice;
      let addList = item.addList;
      let quantity = item.quantity;
      let total = item.total;
      let src = item.imgSrc;
      let orderNum = item.orderNum;

      //訂單要求 drinkDescribe
      let drinkDescribe = "";
      let addDescribe = "";
      if (addList.length == 0) {
        drinkDescribe = `${size} / ${ice} / ${sweet} / ${quantity}杯 / ${total}元`;
      } else {
        addDescribe = addList.join(" / ");
        drinkDescribe = `${size} / ${ice} / ${sweet} / ${addDescribe} / ${quantity}杯 / ${total}元`;
      }

      //新增購物車訂單元素
      //外層
      let cartOrder = document.createElement("div");
      cartOrder.classList.add("cart-order");
      cartOrder.id = orderNum;

      //圖片
      let drinkImg = document.createElement("img");
      drinkImg.classList.add("drink-img");
      drinkImg.src = src;

      //飲料名+訂單敘述 的外框
      let divDescribe = document.createElement("div");
      divDescribe.classList.add("div-describe");

      //飲料名
      let cartTitle = document.createElement("h3");
      cartTitle.classList.add("drink-name");
      cartTitle.innerText = drinkName;

      //訂單敘述
      let cartDescribe = document.createElement("p");
      cartDescribe.classList.add("drink-describe");
      cartDescribe.innerText = drinkDescribe;

      divDescribe.appendChild(cartTitle);
      divDescribe.appendChild(cartDescribe);

      cartOrder.appendChild(drinkImg);
      cartOrder.appendChild(divDescribe);

      //新增刪除按鈕
      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = "刪除";
      trashButton.addEventListener("click", (e) => {
        let cartOrderItem = e.target.parentElement;

        cartOrderItem.addEventListener("animationend", () => {
          //將資料從 local storage 中刪除
          let orderCode = cartOrderItem.id; //訂單編號
          let myListArray = JSON.parse(localStorage.getItem("cartList"));
          myListArray.forEach((item, index) => {
            if (item.orderNum === orderCode) {
              myListArray.splice(index, 1);
              //購物車徽章更新
              let cartAmount = document.querySelector("#cartAmount");
              cartAmount.innerText = myListArray.length;
            }

            localStorage.setItem("cartList", JSON.stringify(myListArray));
          });

          //html delete
          cartOrderItem.remove();
          cartHave(); //判定購物車有無物品，若沒有則更換區塊
        });

        cartOrderItem.style.animation = "scaleDown 0.3s forwards";
      });

      cartOrder.appendChild(trashButton);

      cartOrder.style.animation = "scaleUp 0.3s forwards";
      section.appendChild(cartOrder);
    });

    //購物車徽章更新
    let cartAmount = document.querySelector("#cartAmount");
    cartAmount.innerText = myListArray.length;
  }

  //購物車徽章更新
  // let cartAmount = document.querySelector("#cartAmount");
  // if (myListArray != null) {
  //   cartAmount.innerText = myListArray.length;
  // } else {
  //   cartAmount.innerText = 0;
  // }
}

//back to top btn
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//判定購物車有無物品更換區塊
function cartHave() {
  let offcanvasBody = document.querySelector(".offcanvas-body");
  let cartNothing = document.querySelector(".cart-nothing");
  let myListArray = JSON.parse(localStorage.getItem("cartList"));

  //如果購物車沒東西
  if (myListArray == "" || myListArray == null) {
    offcanvasBody.style.display = "none";
    cartNothing.style.display = "block";
    console.log("nothing");
  } else {
    offcanvasBody.style.display = "flex";
    cartNothing.style.display = "none";
    console.log("something");
  }
}
