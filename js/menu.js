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
  fetch("assets/data/menu.json")
  .then(res => res.json())
  .then(menu => {    
    if (type == "tea" || type == "icecream") {
      singleL(type, menu[type]);
    } else {
      multiL(type, menu[type])
    }
  })
}

function singleL(type, products) {
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
})

// automatically bring the products on the page load
window.addEventListener("load", () => {
  dataFetch()
});