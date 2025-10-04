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
    products.forEach((p) => {
      console.log(p.name);
    })
  })
}


// automatically bring the products on the page load  
window.addEventListener("load", () => {
  dataFetch()
});