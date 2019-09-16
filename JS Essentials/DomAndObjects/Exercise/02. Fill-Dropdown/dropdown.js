function addItem() {
    let itemText = document.getElementById("newItemText");
    let itemValue = document.getElementById("newItemValue");
    let o = document.createElement("option");
    o.textContent = itemText.value;
    o.value = itemValue.value;
    itemText.value = "";
    itemValue.value = "";
    document.getElementById("menu").appendChild(o);
}