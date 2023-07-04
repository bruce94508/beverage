let progress = document.getElementById("progress");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let confirmBtn = document.querySelector("#confirm");
let circles = document.querySelectorAll(".circle");

let formName = document.querySelector("#floatingName"); //表單姓名
let formEmail = document.querySelector("#floatingEmail"); //表單Email
let formPhone = document.querySelector("#floatingPhone"); //表單聯絡電話
let formAddress = document.querySelector("#address"); //表單地址
let formRemark = document.querySelector("#remark"); //表單備註

let currentStep = 1; //目前步驟

loadListData();
prevBtnTest(); //檢查是否位於第一步驟，是的話就隱藏上一步按鈕

// 下一步
next.addEventListener("click", () => {
  currentStep++;
  // console.log(currentStep);
  if (currentStep > circles.length) {
    currentStep = circles.length;
  }

  //如果位於第二步驟
  // if (currentStep == 2) {
  //   formGet();
  // }

  if (currentStep == 3) {
    formGet();
    writeInStep3();
  }
  // console.log(currentStep);
  update();
  prevBtnTest();
  stepCheck();
});

// 上一步
prev.addEventListener("click", () => {
  currentStep--;
  // console.log(currentStep);
  if (currentStep < 1) {
    currentStep = 1;
  }
  console.log(currentStep);
  update();
  prevBtnTest();
  stepCheck();
});

function update() {
  // 圓圈
  circles.forEach((circleItem, index) => {
    if (index < currentStep) {
      circleItem.classList.add("active");
    } else {
      circleItem.classList.remove("active");
    }
  });

  let actives = document.querySelectorAll(".active");
  console.log((actives.length / circles.length) * 100);
  // progress.style.width = (actives.length / circles.length) * 100 + "%";
  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
  if (currentStep === 1) {
    prev.disabled = true;
  } else if (currentStep === 4) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}

function loadListData() {
  const list = document.querySelector(".cart .list");
  let myListArray = JSON.parse(localStorage.getItem("cartList"));

  cartListHave();

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
        drinkDescribe = `${size} / ${ice} / ${sweet} / ${quantity}杯`;
      } else {
        addDescribe = addList.join(" / ");
        drinkDescribe = `${size} / ${ice} / ${sweet} / ${addDescribe} / ${quantity}杯`;
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

      //新增刪除按鈕和總價格的外框
      let divBtnAndTotal = document.createElement("div");
      divBtnAndTotal.classList.add("div-btn-total");

      //新增價格
      let totalText = document.createElement("p");
      totalText.classList.add("total");
      totalText.innerText = `NT$ ${total}`;

      //新增刪除按鈕
      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = "刪除";
      trashButton.addEventListener("click", (e) => {
        let cartOrderItem = e.target.parentElement.parentElement;

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

          totalCalculate(); //計算總金額並顯示出總金額
          location.reload();
          cartListHave();
        });

        cartOrderItem.style.animation = "scaleDown 0.3s forwards";
      });

      //先將trashButton與totalText放入divBtnAndTotal
      divBtnAndTotal.appendChild(trashButton);
      divBtnAndTotal.appendChild(totalText);

      cartOrder.appendChild(divBtnAndTotal);

      cartOrder.style.animation = "scaleUp 0.3s forwards";
      list.appendChild(cartOrder);
    });

    totalCalculate(); //計算總金額並顯示出總金額

    //購物車徽章更新
    let cartAmount = document.querySelector("#cartAmount");
    cartAmount.innerText = myListArray.length;
  }
}

//清除全部購物車和localStorage
let clearAll = document.querySelector("#clearall");

clearAll.addEventListener("click", () => {
  localStorage.removeItem("cartList");
  location.reload();
});

//訂單送出確認按鈕 清除全部購物車和localStorage
let okBtn = document.querySelector("#confirm");
okBtn.addEventListener("click", () => {
  localStorage.removeItem("cartList");
});

//計算總金額並顯示出總金額函數 + 放入localstorage
function totalCalculate() {
  //計算總共幾元
  let listTotal = document.querySelector(".listTotal p");
  let pTotal = document.querySelectorAll("p.total");
  let t = 0;
  //總金額算法
  for (let item of pTotal) {
    t += parseInt(item.innerText.split(" ", 2)[1]);
  }
  //放入listTotal的innertext
  listTotal.innerText = `NT$ ${t}`;

  //放入localstorage
  localStorage.setItem("total", JSON.stringify(t));
}

//檢測是否位於第一步驟，是的話就隱藏上一步按鈕
function prevBtnTest() {
  if (currentStep == 1) {
    next.style.display = "block";
    prev.style.display = "none";
    confirmBtn.style.display = "none";
  } else if (currentStep == 3) {
    next.style.display = "none";
    prev.style.display = "block";
    confirmBtn.style.display = "block";
  } else {
    next.style.display = "block";
    prev.style.display = "block";
    confirmBtn.style.display = "none";
  }
}

function stepCheck() {
  let step1 = document.querySelector(".cart");
  let step2 = document.querySelector(".second-form");
  let step3 = document.querySelector(".third-order");

  if (currentStep == 1) {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
  } else if (currentStep == 2) {
    step1.style.display = "none";
    step2.style.display = "block";
    step3.style.display = "none";
  } else {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block";
  }
}

//將表單獲取的資料放入localstorage
function formGet() {
  let name = formName.value;
  let email = formEmail.value;
  let phone = formPhone.value;
  let address = formAddress.value;
  let remark = formRemark.value;

  //create an 表單詳細資料 object
  let myForm = {
    name: name,
    email: email,
    phone: phone,
    address: address,
    remark: remark,
  };

  //放入localstorage
  localStorage.setItem("form", JSON.stringify([myForm]));
}

//將資料寫入步驟3
function writeInStep3() {
  let orderName = document.querySelector("#orderName");
  let orderPhone = document.querySelector("#orderPhone");
  let orderEmail = document.querySelector("#orderEmail");
  let orderAddress = document.querySelector("#orderAddress");
  let orderRemark = document.querySelector("#orderRemark");
  let orderTotal = document.querySelector("#orderTotal");

  let myformObj = JSON.parse(localStorage.getItem("form"));
  let total = JSON.parse(localStorage.getItem("total"));

  orderName.innerText = `姓名 : ${myformObj[0].name}`;
  orderPhone.innerText = `連絡電話 : ${myformObj[0].phone}`;
  orderEmail.innerText = `Email : ${myformObj[0].email}`;
  orderAddress.innerText = `地址 : ${myformObj[0].address}`;
  orderRemark.innerText = `備註 : ${myformObj[0].remark}`;
  orderTotal.innerText = `總金額 : NT$ ${total}`;
}

//判定購物車清單有無物品若沒有則更換區塊
function cartListHave() {
  let listTotal = document.querySelector(".listTotal");
  let nextBtn = document.querySelector("#next");
  let cartListNothing = document.querySelector(".cart-list-nothing");
  let myListArray = JSON.parse(localStorage.getItem("cartList"));

  //如果購物車沒東西
  if (myListArray == "" || myListArray == null) {
    console.log(typeof nextBtn.style.display);
    next.style.visibility = "hidden";
    listTotal.style.display = "none";
    cartListNothing.style.display = "block";
  } else {
    next.style.visibility = "visible";
    listTotal.style.display = "block";
    cartListNothing.style.display = "none";
  }
}
