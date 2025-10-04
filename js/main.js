let listItems = document.querySelectorAll(".nav-menu > *");
let contDiv = document.querySelectorAll(".menu");

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
    
    dataFetch(item.id);
  });
});

function dataFetch(type="tea") {
  fetch("assets/data/menu.json")
  .then(res => res.json())
  .then(menu => {
    let productsMenu = document.querySelector(`.${type}`);
    let products = menu[type]
    
    if (type == "tea" || type == "icecream") {
      singleL(menu[type], type);
    } else {
      console.log(type);
    }
    
  })
}

function singleL(products, type) {
  products.forEach((product, i=0) => {
    let pName = document.createTextNode(product.name);
    let pPrice = document.createTextNode(product.price+"$");
    
    let pContCon = document.querySelector(`.${type}`);

    let pCont = document.createElement("div");
    pCont.classList.add("p-cont");
    
    let pPhotoDiv = document.createElement("div");
    pPhotoDiv.classList.add("p-photo-con");
    pPhotoDiv.innerText = "photo";
    
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
    console.log(pName);
  })
}








// automatically bring the products on the page load
window.addEventListener("load", () => {
  dataFetch()
});