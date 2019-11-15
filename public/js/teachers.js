let firstCategories = document.querySelectorAll("#nav_panel .right .subject li");
// console.log(firstCategories);
let firstCategory = document.querySelector("#nav_panel .first_level");

let secondCategory = document.querySelector("#nav_panel .second_level");
// console.log(secondCategory);
for (let i = 0; i < firstCategories.length; i++) {
    let item = firstCategories[i];
    item.onmouseover = () => {
        firstCategory.style.borderBottom = "1px solid #ddd";
        secondCategory.style.display = "block";
    };
}
secondCategory.onmouseleave = () => {
    secondCategory.style.display = "none";
    firstCategory.style.borderBottom = "none";
};