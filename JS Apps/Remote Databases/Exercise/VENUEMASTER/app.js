import { get, post, put, remove } from './requester.js';
const venueDateInput = document.getElementById("venueDate");
const venueDateBtn = document.getElementById("getVenues");
const venueInfo = document.getElementById("venue-info");
window.addEventListener("load", async function () {

    venueDateBtn.addEventListener("click", async function () {
        await loadVenues();
    });

});
async function loadVenues() {

    let ids = await post("rpc", `custom/calendar?query=${venueDateInput.value}`);
    let source = await fetch("./venueTemplate.hbs").then(res => res.text());
    let template = Handlebars.compile(source);
    for (const id of ids) {
        let response = await retrieveVenueDetails(id);
        response['id'] = id;
        venueInfo.appendChild(createVenue(response));
        venueInfo.lastElementChild.querySelector('input.info').addEventListener('click', moreInfo);
        venueInfo.lastElementChild.querySelector('input.purchase').addEventListener('click', makePurchase);
    }

    function createVenue(response) {
        let div = document.createElement("div");
        div.setAttribute("id", response['id']);
        div.innerHTML = template(response);
        return div;

    }
}

function moreInfo(evt) {
    let current = evt.target;
        if (current.value == "More info") {
            current.value = "Less info";
            current.parentElement.nextElementSibling.style.display = "block";
        } else {
            current.value = "More info";
            current.parentElement.nextElementSibling.style.display = "none";

        }
}
async function makePurchase() {
    const venue = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    const id = venue.getAttribute('id').trim();
    const name = venue.querySelector('.venue-name').textContent.trim();
    const price = Number(venue.querySelector('.venue-price').textContent.split(' ')[0].trim());
   
    const quantity = Number(venue.querySelector('select.quantity').value.trim());
    const totPrice = quantity * price;
    let source = await fetch("./confirmPurchase.hbs").then(res => res.text());
    let template = Handlebars.compile(source);
    venueInfo.innerHTML = template({name,totPrice,quantity});
    document.querySelector('input[value=Confirm]')
        .addEventListener('click', () => confirmPurchase(id, quantity));
}

async function confirmPurchase(id, quantity) {
    try {
        const data = await post("rpc",`custom/purchase?venue=${id}&qty=${quantity}`)
        venueInfo.innerHTML = data.html;
    } catch (err) {
        alert(`Error: ${err.message}`);
    }
}
function retrieveVenueDetails(venueId) {
    return get("appdata", `venues/${venueId}`);
}
