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
  });
});