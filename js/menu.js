let listItems = document.querySelectorAll(".nav-menu > *");
let contDiv = document.querySelectorAll(".menu");
let topBtn = document.getElementById("backToTop");

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    listItems.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");

    contDiv.forEach((div) => {
      div.style.display = "none";
    })
    document.querySelector(item.dataset.cont).style.display = "flex";
    
    // fix the infinity post fetching bug
    let dataCont = document.querySelector("."+document.querySelector(".active").id);
    dataCont.innerHTML == ""? dataFetch(item.id) : 0;
  });
});

function dataFetch(type="tea") {
  let lang = document.querySelector("html").getAttribute("lang");
  fetch(`../assets/data/menu-${lang}.json`)
  .then(res => res.json())
  .then(menu => {    
    if (type == "tea" || type == "icecream" || type == "shisha") {
      singleL(type, menu[type]);
    } else {
      multiL(type, menu[type])
    }
  })
}

function singleL(type, products) {
  products.forEach((product, i=0) => {
    let pName = document.createTextNode(product.name);
    let pPrice = document.createTextNode(product.price);
    let pImg = `../assets/images/products/${product.id}.jpg` || `../assets/images/products/${product.id}.JPG`;
    let pContCon = document.querySelector(`.${type}`);

    let pCont = document.createElement("div");
    pCont.classList.add("p-cont");
    
    let pPhotoDiv = document.createElement("div");
    let pPhoto = document.createElement("img");
    pPhoto.setAttribute("src", pImg);
    pPhotoDiv.classList.add("p-photo-con");
    // pPhotoDiv.innerText = "photo";
    pPhotoDiv.appendChild(pPhoto);
    
    let pPriceDiv = document.createElement("div");
    pPriceDiv.classList.add("p-price-con");
    pPriceDiv.appendChild(pPrice);

    let pNameDiv = document.createElement("div");
    pNameDiv.classList.add("p-name-con");
    pNameDiv.appendChild(pName);

    pCont.appendChild(pPhotoDiv);
    pCont.appendChild(pNameDiv);
    pCont.appendChild(pPriceDiv);
    pCont.appendChild(document.createTextNode(++i));

    pContCon.appendChild(pCont);
  })
}

function multiL(type, lists) {
  let productTypes = Object.keys(lists);
  let productLists = new Array();
  productTypes.forEach(ptype => {
    productLists[productLists.length] = lists[ptype];
  })
  productLists.forEach((list, i=0) => {
    let pTypeNameCont = document.createElement("div");
    let pTypeName = document.createElement("h3");
    let hr = document.createElement("hr");
    let hr2 = document.createElement("hr");
    let pTypeText = document.createTextNode(productTypes[i++]);
    pTypeNameCont.classList.add("p-type-cont");
    pTypeName.appendChild(pTypeText);
    pTypeNameCont.appendChild(hr);
    pTypeNameCont.appendChild(pTypeName);
    pTypeNameCont.appendChild(hr2)
    document.querySelector(`.${type}`).appendChild(pTypeNameCont);
    
    singleL(type, list);
  })
}

window.addEventListener("scroll", () => {
  if (window.scrollY >= 350) {
    topBtn.classList.add("show")
  } else {
    topBtn.classList.remove("show")
  }
})

topBtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

function lang() {
  let langBlur = document.createElement("div");
  langBlur.classList.add("lang-blur");
  let langCont = document.createElement("div");
  langCont.classList.add("lang-cont");

  let langH = document.createElement("div");
  langH.classList.add("lang-text");
  
  let arBtn = document.createElement("button");
  arBtn.id = "arBtn";
  let arlang = document.createTextNode("العربية");
  arBtn.appendChild(arlang);

  let enBtn = document.createElement("button");
  enBtn.id = "enBtn";
  enBtn.innerText= "English" ;

  let btnsCont = document.createElement("div");
  btnsCont.classList.add("btns-cont");
  btnsCont.appendChild(arBtn);
  btnsCont.appendChild(enBtn);
  
  langCont.appendChild(langH);
  langCont.appendChild(btnsCont);
  langBlur.appendChild(langCont)
  document.body.appendChild(langBlur);
  document.body.style.overflow = "hidden";
  langSelect();
}

function langSelect() {
  let langBtns = document.querySelectorAll(".btns-cont > button");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector("html").setAttribute("lang", btn.id.slice(0, 2));
      document.querySelector(".lang-blur").remove();
      document.body.style.overflow = "visible";
      changeLang();
      return dataFetch();
    });
  });
}

function changeLang() {
  let tea = document.getElementById("tea");
  let drinks = document.getElementById("drinks");
  let sweets = document.getElementById("sweets");
  let meals = document.getElementById("meals");
  let addons = document.getElementById("special");
  let shisha = document.getElementById("shisha");
  if (document.querySelector("html").getAttribute("lang") == "ar") {
    tea.innerText = "شاي الخان";
    drinks.innerText = "المشروبات";
    sweets.innerText = "تحلاية";
    meals.innerText = "الوجبات";
    addons.innerText = "مميز الخان";
    shisha.innerText = "دخان";
  } else {
    tea.innerText = "Tea";
    drinks.innerText = "Drinks";
    sweets.innerText = "Sweets";
    meals.innerText = "Meals";
    addons.innerText = "Special";
    shisha.innerText = "Shisha";
  }
}
// automatically bring the products on the page load
window.addEventListener("load", () => {
  lang();
});