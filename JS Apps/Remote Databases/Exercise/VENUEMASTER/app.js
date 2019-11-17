import { get, post, put, remove } from './requester.js';
const venueDateInput = document.getElementById("venueDate");
const venueDateBtn = document.getElementById("getVenues");
const venueInfo = document.getElementById("venue-info");
window.addEventListener("load", async function () {
    let source = await fetch("./venueTemplate.hbs").then(res => res.text());
    venueDateBtn.addEventListener("click", function () {
        loadVenues(source);
        attachEvents();
    });

});
async function loadVenues(source) {
    let ids = await post("rpc", `custom/calendar?query=${venueDateInput.value}`);
    let template = Handlebars.compile(source);
    let data = { venues: [] };
    for (const id of ids) {
        let response = await retrieveVenueDetails(id);
        response['id'] = id;
        data.venues.push(response);
    }
    let html = template(data);
    venueInfo.innerHTML = html;
}
function attachEvents() {
    let moreInfoBtns = document.getElementsByClassName("info");
    
    for (const btn of moreInfoBtns) {
        console.log(btn);
        btn.addEventListener("click", function (evt) {
            let current = evt.target;
            if (current.value == "More info") {
                current.value = "Less info";
                current.parent.nextElementSibling.style.display ="block";
            } else {
                current.value = "More info";
                current.parent.nextElementSibling.style.display ="none";

            }
        });
    }
}
function retrieveVenueDetails(venueId) {
    return get("appdata", `venues/${venueId}`);
}
