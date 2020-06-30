// requête fetch //
let connectApi = async (url) => {
    try {
        let reponse = await fetch(url);
        return reponse.json();
    } catch (e) {
        throw (e)
    };
};

// on initialise une fonction x et products avec un tableau vide
let x = [];
let products = [];

// on crée une boucle for dans laquelle on va transformer le JSON en objet
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.getItem(localStorage.key(i));
    let parsedKey = JSON.parse(key);
    //on ajoute l'objet créé dans le tableau vide x
    x.push(parsedKey);
    // on crée une variable qui récupère l'id de chaque produit
    let id = x[i].productId;
    // on crée une variable qui récupère la quantité de chaque produit
    let quantityInCart = x[i].productNumber;
    //on ajoute l'id dans le tabeleau vide (products)
    products.push(id);

    // on crée un fonction qui va récupérer les détails des produits du storage
    function getProductDetails(id) {
        let productDetails = connectApi(`http://localhost:3000/api/teddies/${id}`);
        // on crée un fonction qui va générer le panier pour tous les produits sélectionnés
        productDetails.then(function (result) {

            //on crée une variable qui calcule le prix total d'un produit en fonction de son prix et sa quantité
            let pricePerProduct = ((result.price / 100) * quantityInCart);

            //on récupère l'élement conteneur
            let sectionCart = document.getElementById("panier");

            // on crée une balise conteneur pour le tableau du panier
            let cartProduct = document.createElement("table");
            cartProduct.classList.add("cart-container");

            //on crée une balise et sa classe, puis on ajoute le contenu voulu
            let imageProduct = document.createElement("td");
            imageProduct.innerHTML = `<a href="produit.html?id=${id}"><img src="${result.imageUrl}" alt="Image produit" class="image-product"></a>`;

            //on crée une balise et sa classe, puis on ajoute le contenu voulu
            let titleInCart = document.createElement("td");
            titleInCart.classList.add("title-cart");
            titleInCart.textContent = result.name;

            //on crée une balise et sa classe, puis on ajoute le contenu voulu
            let productQuantity = document.createElement("td");
            productQuantity.classList.add("quantity-cart");
            productQuantity.textContent = quantityInCart;

            //on crée une balise et sa classe, puis on ajoute le contenu voulu
            let priceInCart = document.createElement("td");
            priceInCart.classList.add("price-cart");
            priceInCart.textContent = pricePerProduct + ` €`;

            // on ajoute chaque balise créée dans la balise conteneur
            sectionCart.appendChild(cartProduct);
            cartProduct.appendChild(imageProduct);
            cartProduct.appendChild(titleInCart);
            cartProduct.appendChild(productQuantity);
            cartProduct.appendChild(priceInCart);

            // création d'une fonciton qui permet de clear le storage au click sur une image
            document.getElementById("remove-cart").addEventListener('click', () => {
                localStorage.clear();
                location.reload()
            });
        });
    }
    //on appelle la fonction
    getProductDetails(id);
}

/************************** TOTAL PANIER *******************************/

let arrayPrice = [];
let totalPanier = document.getElementById("totalPrice");
for (let j = 0; j < localStorage.length; j++) {
    let objectValue = JSON.parse(localStorage.getItem(localStorage.key(j)));
    let priceProduct = objectValue.productPrice;
    let quantityProduct = objectValue.productNumber;
    let totalProduct = priceProduct * quantityProduct;
    arrayPrice.push(totalProduct);
    let total = 0;
    for (let i in arrayPrice) {
        total = total + arrayPrice[i];
        totalPanier.innerHTML = total;
    }
}
totalSent = parseInt(totalPanier.innerHTML);

/*********************************************************/




/************************** FORMULAIRE *******************************/

// stockage des différentes regEx dans des variables
let myRegexText = /^[a-zA-Z][A-Za-z-\s]+$/;
let myRegexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
let myRegexAddress = /^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç]+)+$/;

//on récupère le formulaire depuis le fichier HTML
let form = document.querySelector("#contact");

//on appelle toutes les fonctions créées plus bas
form.firstName.addEventListener("change", function () {
    validNom(this);
});
form.lastName.addEventListener("change", function () {
    validPrenom(this);
});
form.email.addEventListener("change", function () {
    validEmail(this);
});
form.address.addEventListener("change", function () {
    validAdresse(this);
});
form.city.addEventListener("change", function () {
    validVille(this);
});

// création d'un variable par input qui contient un test qui vérifie s'il y a une correspondance entre un texte et une expression 
let testNom = myRegexText.test;
let testPrenom = myRegexText.test;
let testEmail = myRegexEmail.test;
let testAdresse = myRegexAddress.test;
let testVille = myRegexText.test;

// création d'une fonction qui va valider ou non le input selon le texte saisi
const validNom = function (inputNom) {
    testNom = myRegexText.test(inputNom.value)
    let small = inputNom.nextElementSibling;
    if (testNom == true) {
        small.innerHTML = "Nom bien enregistré";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "Erreur dans la saisie du nom (pas de chiffres)";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
}

const validPrenom = function (inputPrenom) {
    testPrenom = myRegexText.test(inputPrenom.value);
    let small = inputPrenom.nextElementSibling;
    if (testPrenom == true) {
        small.innerHTML = "Prénom bien enregistré";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "Erreur dans la saisie du nom (pas de chiffres)";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
}

const validEmail = function (inputEmail) {
    testEmail = myRegexEmail.test(inputEmail.value);
    let small = inputEmail.nextElementSibling;
    if (testEmail == true) {
        small.innerHTML = "Adresse valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "Adresse non valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};

const validAdresse = function (inputAdresse) {
    testAdresse = myRegexAddress.test(inputAdresse.value);
    let small = inputAdresse.nextElementSibling;
    if (testAdresse == true) {
        small.innerHTML = "Adresse valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "Mmmh, vous êtes sûr ? (numéro de voie + nom de la voie)";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};

const validVille = function (inputVille) {
    testVille = myRegexText.test(inputVille.value);
    let small = inputVille.nextElementSibling;
    if (testVille == true) {
        small.innerHTML = "Ville bien enregistré";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "Problème dans la saisie";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
}
/****************************************/






/**************** Envoie data ********************/

//création class Contact
let myForm = document.getElementById("contact");
let contact;
let order;

myForm.addEventListener('submit', function (e) {
 e.preventDefault();
    if (testNom == false || testAdresse == false || testEmail == false || testPrenom == false || testVille == false) {
        e.preventDefault();
    } else if (contact = "") {
        e.preventDefault();
    } else {
        
        contact = {
            firstName: myForm.firstName.value,
            lastName: myForm.lastName.value,
            address: myForm.address.value,
            city: myForm.city.value,
            email: myForm.email.value
        };

        order = {
            contact: contact,
            products: products
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch('http://localhost:3000/api/teddies/order', options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let objectSessionStorage = {
                    prix: totalSent,
                    prenom: myForm.lastName.value,
                    orderId: res.orderId
                };

                let confirmation = JSON.stringify(objectSessionStorage);
                sessionStorage.setItem('infoCustomer', confirmation);
                window.location = 'confirmation.html';
            });
    };
})

/****************************************/