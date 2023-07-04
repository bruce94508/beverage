const matcha = document.querySelector("#matcha"); //抹茶鮮奶
const bubbleTea = document.querySelector("#bubbleTea"); //波霸珍奶
const mango = document.querySelector("#mango"); //現榨芒果汁
const milkBlackTea = document.querySelector("#milkBlackTea"); //奶蓋紅茶
const blackTeaLatte = document.querySelector("#blackTeaLatte"); //紅茶拿鐵
const milkGreenTea = document.querySelector("#milkGreenTea"); //奶蓋綠茶
const grapeFruit = document.querySelector("#grapeFruit"); //現榨葡萄柚汁
const grassJelly = document.querySelector("#grassJelly"); //仙草凍奶茶
const passionFruit = document.querySelector("#passionFruit"); //百香Q果綠
const kiwi = document.querySelector("#kiwi"); //奇異果汁
const floating = document.querySelector("#floating"); //漂浮紅茶

const orderH3 = document.querySelector("#drink-name");
const total = document.querySelector("#money");
const section = document.querySelector("#offcanvasRight section");
let price = 0;
let imgSrc = "";
//清空section
section.replaceChildren();
loadData();

//加入購物車事件
matcha.addEventListener("click", () => {
  orderH3.innerText = "抹茶鮮奶";
  price = 60;
  total.innerText = "60";
  imgSrc = "./img/奶綠.png";
});

bubbleTea.addEventListener("click", () => {
  orderH3.innerText = "波霸珍奶";
  price = 50;
  total.innerText = "50";
  imgSrc = "./img/珍奶.png";
});

mango.addEventListener("click", () => {
  orderH3.innerText = "現榨芒果汁";
  price = 55;
  total.innerText = "55";
  imgSrc = "./img/芒果汁.png";
});

milkBlackTea.addEventListener("click", () => {
  orderH3.innerText = "奶蓋紅茶";
  price = 65;
  total.innerText = "65";
  imgSrc = "./img/奶蓋紅茶.png";
});

blackTeaLatte.addEventListener("click", () => {
  orderH3.innerText = "紅茶拿鐵";
  price = 60;
  total.innerText = "60";
  imgSrc = "./img/紅茶拿鐵.png";
});

milkGreenTea.addEventListener("click", () => {
  orderH3.innerText = "奶蓋綠茶";
  price = 65;
  total.innerText = "65";
  imgSrc = "./img/奶蓋綠茶.png";
});

grapeFruit.addEventListener("click", () => {
  orderH3.innerText = "現榨葡萄柚汁";
  price = 50;
  total.innerText = "50";
  imgSrc = "./img/現榨葡萄柚汁.png";
});

grassJelly.addEventListener("click", () => {
  orderH3.innerText = "仙草凍奶茶";
  price = 55;
  total.innerText = "55";
  imgSrc = "./img/仙草凍奶茶.png";
});

passionFruit.addEventListener("click", () => {
  orderH3.innerText = "百香Q果綠";
  price = 45;
  total.innerText = "45";
  imgSrc = "./img/百香Q果綠.png";
});

kiwi.addEventListener("click", () => {
  orderH3.innerText = "奇異果汁";
  price = 45;
  total.innerText = "45";
  imgSrc = "./img/奇異果汁.png";
});

floating.addEventListener("click", () => {
  orderH3.innerText = "漂浮紅茶";
  price = 50;
  total.innerText = "50";
  imgSrc = "./img/漂浮紅茶.png";
});

//跳出式選單
const confirmBtn = document.querySelector("#confirmBtn");
const sizeBtns = document.querySelectorAll('input[name="size"]');
const sweetBtns = document.querySelectorAll('input[name="sweet"]');
const iceBtns = document.querySelectorAll('input[name="ice"]');
const adding = document.querySelectorAll('input[name="add"]');

const productNum = document.querySelector("#productNum");

let selectedSize = ""; //尺寸
let selectedSweet = ""; //甜度
let selectedIce = ""; //溫度
let addlist = []; //加料list

//確認按鈕事件
confirmBtn.addEventListener("click", () => {
  // 按下確認按鈕，獲得選擇的尺寸，放入selectedSize
  for (let s of sizeBtns) {
    if (s.checked) {
      selectedSize = s.id;
    }
  }
  // 按下確認按鈕，獲得選擇的甜度，放入selectedSweet
  for (let sb of sweetBtns) {
    if (sb.checked) {
      selectedSweet = sb.nextElementSibling.innerText;
    }
  }
  // 按下確認按鈕，獲得選擇的溫度，放入selectedIce
  for (let ib of iceBtns) {
    if (ib.checked) {
      selectedIce = ib.nextElementSibling.innerText;
    }
  }

  //按下確認按鈕，找到有選擇的加料的中文名，加入addlist
  for (let a of adding) {
    if (a.checked) {
      addlist.push(a.nextElementSibling.innerText.split(" +", 1)[0]);
      // console.log(a.nextElementSibling.innerText.split(" +", 1)[0]);
    }
  }

  //生成隨機訂單編號
  // 個位數補齊十位數
  function setTimeDateFmt(s) {
    return s < 10 ? "0" + s : s;
  }

  function randomNumber() {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    month = setTimeDateFmt(month);
    day = setTimeDateFmt(day);
    hour = setTimeDateFmt(hour);
    minutes = setTimeDateFmt(minutes);
    seconds = setTimeDateFmt(seconds);
    let orderCode =
      now.getFullYear().toString() +
      month.toString() +
      day +
      hour +
      minutes +
      seconds +
      Math.round(Math.random() * 1000000).toString();
    return orderCode;
  }

  //create an 飲料詳細資料 object
  let drink = {
    drinkName: orderH3.innerText,
    size: selectedSize,
    sweet: selectedSweet,
    ice: selectedIce,
    addList: addlist,
    quantity: productNum.value,
    total: total.innerText,
    imgSrc: imgSrc,
    orderNum: randomNumber(), //訂單編碼
  };

  //加料按鈕回到預設
  for (a of adding) {
    if (a.checked) {
      a.checked = false;
    }
  }
  //數量歸零
  productNum.value = 1;
  //addlist歸零
  addlist = [];

  //儲存資料到 localstorage with array of objects
  let cartList = localStorage.getItem("cartList");
  if (cartList == null) {
    localStorage.setItem("cartList", JSON.stringify([drink]));
  } else {
    let newListArray = JSON.parse(cartList);
    newListArray.push(drink);
    localStorage.setItem("cartList", JSON.stringify(newListArray));
  }

  // toast
  new bootstrap.Toast(document.querySelector(".toast")).show();

  //清空section
  section.replaceChildren();

  loadData(); //初始化讀取localStorage 的 list，顯示在section
});

//數量按鈕區域
const increase = document.querySelector("#increase");
const decrease = document.querySelector("#decrease");
// const productNum = document.querySelector("#productNum");

//加號按鈕
increase.addEventListener("click", () => {
  let addPrice = 0;
  productNum.value = parseInt(productNum.value) + 1;

  //加料計算
  for (let a of adding) {
    if (a.checked) {
      addPrice = addPrice + parseInt(a.value) * parseInt(productNum.value);
      //   addlist.push(a.nextElementSibling.innerText.split(" +", 1));
    }
  }
  total.innerText = price * parseInt(productNum.value) + addPrice;
});

//減號按鈕
decrease.addEventListener("click", () => {
  let addPrice = 0;
  //小於1
  if (productNum.value == "1") {
  } else {
    productNum.value = parseInt(productNum.value) - 1;
  }

  //加料計算
  for (let a of adding) {
    if (a.checked) {
      addPrice = addPrice + parseInt(a.value) * parseInt(productNum.value);
    }
  }
  total.innerText = price * parseInt(productNum.value) + addPrice;
});

//input內容更改blur事件
productNum.addEventListener("blur", () => {
  let addPrice = 0;
  //input內容更動後值小於1或為空值
  if (parseInt(productNum.value) < 1 || productNum.value == "") {
    productNum.value = 1;
  }

  //加料計算
  for (let a of adding) {
    if (a.checked) {
      addPrice = addPrice + parseInt(a.value) * parseInt(productNum.value);
    }
  }
  total.innerText = price * parseInt(productNum.value) + addPrice;
});

//額外加料按鈕區域
const bubbleBtn = document.querySelector("#bubble");
const coconutBtn = document.querySelector("#coconut");

//珍珠
bubbleBtn.addEventListener("click", () => {
  if (bubbleBtn.checked) {
    total.innerText =
      parseInt(total.innerText) +
      parseInt(productNum.value) * parseInt(bubbleBtn.value);
  } else {
    total.innerText =
      parseInt(total.innerText) -
      parseInt(productNum.value) * parseInt(bubbleBtn.value);
  }
});

//椰果
coconutBtn.addEventListener("click", () => {
  if (coconutBtn.checked) {
    total.innerText =
      parseInt(total.innerText) +
      parseInt(productNum.value) * parseInt(coconutBtn.value);
  } else {
    total.innerText =
      parseInt(total.innerText) -
      parseInt(productNum.value) * parseInt(coconutBtn.value);
  }
});

//購物車初始化
function loadData() {
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
      //加料有無判定
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
      // cartOrder.appendChild(cartTitle);
      // cartOrder.appendChild(cartDescribe);

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
          cartHave();
        });

        cartOrderItem.style.animation = "scaleDown 0.3s forwards";
      });

      cartOrder.appendChild(trashButton);

      cartOrder.style.animation = "scaleUp 0.3s forwards";
      //塞入cartOrder
      section.appendChild(cartOrder);
    });
    //購物車徽章更新
    let cartAmount = document.querySelector("#cartAmount");
    cartAmount.innerText = myListArray.length;
  }

  //購物車徽章更新
  // let cartAmount = document.querySelector("#cartAmount");
  // cartAmount.innerText = myListArray.length;
}

// 種類選取
let all = document.querySelector("#listAll"); //全部
let tea = document.querySelector("#listTea"); // 茶類
let fruit = document.querySelector("#listFruit"); //水果類
let special = document.querySelector("#listSpecial"); //特調類
let drinkCard = document.querySelectorAll(".mycard");

//全部顯示
all.addEventListener("click", () => {
  selectAll();
});

//只顯示茶類
tea.addEventListener("click", () => {
  selectAll(); //先全部顯示
  for (let card of drinkCard) {
    if (!card.classList.contains("tea")) {
      if (!card.classList.contains("disappear")) {
        card.classList.add("disappear");
      }
    }
  }
});

//只顯示水果類
fruit.addEventListener("click", () => {
  selectAll(); //先全部顯示
  for (let card of drinkCard) {
    if (!card.classList.contains("fruit")) {
      if (!card.classList.contains("disappear")) {
        card.classList.add("disappear");
      }
    }
  }
});

//只顯示特調類
special.addEventListener("click", () => {
  selectAll(); //先全部顯示
  for (let card of drinkCard) {
    if (!card.classList.contains("special")) {
      if (!card.classList.contains("disappear")) {
        card.classList.add("disappear");
      }
    }
  }
});

//全部清單顯示函數
function selectAll() {
  for (let card of drinkCard) {
    if (card.classList.contains("disappear")) {
      card.classList.toggle("disappear");
    }
  }
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
