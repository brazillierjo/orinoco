let key = sessionStorage.getItem("infoCustomer");
let parsedKey = JSON.parse(key);
let prenom = parsedKey.prenom;
let prix = parsedKey.prix;
let orderId = parsedKey.orderId;

let spanName = document.getElementById('last-name');
spanName.innerHTML = prenom;

let spanPrix = document.getElementById('prix');
spanPrix.innerHTML = prix;

let spanOrderId = document.getElementById('order-id');
spanOrderId.innerHTML = orderId;

document.getElementById("remove-storage").addEventListener('click', () => {
    localStorage.clear();
});