// on stock dans une variable l'id du produit sélectionné
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

// requête fetch //
let connectApi = async(url) => {
    try {
        let reponse = await fetch(url);
        return reponse.json();
    } catch (e) {
        throw (e)
    };
};
// lien vers l'API //
let productDetails = connectApi(`http://localhost:3000/api/teddies/${id}`);


productDetails.then(function(result) { //après avoir parametré l'appel de l'API en fonction de l'id selectionné, on crée une fonction result

    //on récupère l'élement conteneur
    let sectionProduct = document.getElementById("product-details");

    //on crée une balise et sa classe, puis on ajoute le contenu voulu
    let productTitle = document.createElement("h1");
    productTitle.classList.add('title-product');
    productTitle.textContent = result.name;

    //on crée une balise et sa classe, puis on ajoute le contenu voulu
    let imgProduct = document.createElement("div");
    imgProduct.innerHTML = `<img src="${result.imageUrl}" alt="Image" class="img-product">`;

    //on crée une balise et sa classe, puis on ajoute le contenu voulu
    let descriptionProduct = document.createElement("div");
    descriptionProduct.classList.add('description-product');
    descriptionProduct.textContent = result.description;

    //on crée une balise et sa classe, puis on ajoute le contenu voulu
    let priceProduct = document.createElement("div");
    priceProduct.classList.add('price-product');
    priceProduct.textContent = `Prix : ` + result.price / 100 + `€`;

    //on crée une variable qui récupère les couleurs; on crée une div et sa classe, puis on ajoute le contenu voulu (en fonction du produit)
    let arrayColors = result.colors;
    let optionChoiceDiv = document.createElement("div");
    optionChoiceDiv.classList.add('text-option');
    optionChoiceDiv.innerHTML = "Choisissez la couleur de votre peluche : "
    let optionChoice = document.createElement("select");
    optionChoice.classList.add("color-product");
    let detailOption;
    arrayColors.forEach((color) => { //on ajoute chaque couleur disponible dans une balise option, elle-même dans une balise select
        detailOption = document.createElement("option");
        detailOption.textContent = color;
        optionChoice.appendChild(detailOption);
    });

    //on crée une balise bouton et son id, puis on ajoute le contenu voulu
    let cartProduct = document.createElement("button");
    cartProduct.setAttribute("id", "cart-button");
    cartProduct.innerHTML = `<a href="panier.html">Ajouter au panier</a>`;

    //on imbrique les variables entre elles
    sectionProduct.appendChild(productTitle);
    sectionProduct.appendChild(imgProduct);
    sectionProduct.appendChild(descriptionProduct);
    sectionProduct.appendChild(priceProduct);
    sectionProduct.appendChild(optionChoiceDiv);
    optionChoiceDiv.appendChild(optionChoice);
    sectionProduct.appendChild(cartProduct);

    //on ajoute au localstorage l'id, la quantité et le prix du produit en panier :

    //pour cela on crée une classe newProduct
    class newProduct {
        constructor(productId, productNumber, productPrice) {
            this.productId = productId;
            this.productNumber = productNumber;
            this.productPrice = productPrice;
        }
    }

    //on initialise la quantité, l'id et le prix
    let productNumber = 1;
    let productId = id;
    let productPrice = result.price / 100;
    // on crée un objet par article grâce à notre classe
    let produit = new newProduct(productId, productNumber, productPrice);

    // on crée une fontion qui écoute le bouton au click, et on assigne la paire clé/valeur
    document.getElementById('cart-button').addEventListener('click', () => {
        let key = 'Produit_' + result.name;
        //on fait appel à la fonction addElement créée plus bas
        addElement(key, produit);
    });
});

// fonction addElement permettant de stocker dans le storage
function addElement(key, value) {
    let storage = window.localStorage;
    // si aucune clé n'existe, on la crée au format JSON
    if (storage.getItem(key) === null) {
        let produitString = JSON.stringify(value);
        storage.setItem(key, produitString);
    } else { //si une clé éxiste, on incrémente la quantité et on écrase la clé
        value.productNumber += 1;
        let produit = JSON.stringify(value);
        storage.setItem(key, produit);
    }
}