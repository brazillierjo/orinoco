// on stock dans une variable l'id du produit sélectionné
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

// requête fetch //
let connectApi = async (url) => {
    try {
        let reponse = await fetch(url);
        return reponse.json();
    } catch (e) {
        throw (e)
    };
};

// lien vers l'API //
let productDetails = connectApi(`http://localhost:3000/api/teddies/${id}`);

productDetails.then(function (result) { //après avoir parametré l'appel de l'API en fonction de l'id selectionné, on crée une fonction result

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

    //on ajoute au localstorage l'id, la quantité, le prix... du produit en panier :
    //pour cela on crée une classe newProduct
    class newProduct {
        constructor(productId, productName, productNumber, productPrice, productImg) {
            this.productId = productId;
            this.productName = productName;
            this.productNumber = productNumber;
            this.productPrice = productPrice;
            this.productImg = productImg;
        }
    }

    //on initialise la quantité, l'id et le prix
    let productId = id;
    let productName = result.name;
    let productNumber = 1;
    let productPrice = result.price / 100;
    let productImg = result.imageUrl;

    let newProduit = new newProduct(productId, productName, productNumber, productPrice, productImg);

    document.getElementById('cart-button').addEventListener('click', () => {

        let getItem = null;
        let product = [];

        // Je fais une condition pour voir si dans le localSTorage il existe une clé "Produits"
        if (localStorage.getItem('Produits')) {
            // Si oui, j'ajoute la valeur de cette clé dans "getItem"
            getItem = JSON.parse(localStorage.getItem('Produits'))
        }

        // Si getItem est faux alors je push dans mon tableau vide le produit en question
        if (!getItem) {
            product.push(newProduit)
        } else {
            // Sinon je copie mon localStorage dans mon tableau vide puis je push le nouveau produit
            product = getItem
            product.push(newProduit)
        }

        // Puis l'action pour ajouter dans mon localstorage le tableau
        localStorage.setItem("Produits", JSON.stringify(product))
    });
})