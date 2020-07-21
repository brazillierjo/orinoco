let storageKey = localStorage.getItem('Produits');
let objectStorage = JSON.parse(storageKey);
let products = [];

if (objectStorage === null) {

    document.getElementById('en-tete').style.display = "none";
    document.getElementById('panier').style.display = "none";
    document.getElementById('total').style.display = "none";
    document.getElementById('remove-cart').style.display = "none";
    document.getElementById('formulaire').style.display = "none";
    document.getElementById('empty-cart').innerHTML = `Votre panier est vide :-(</br>Visitez notre Boutique pour y remédier !`;

} else {

    objectStorage.forEach(function (element) {
        let productId = element.productId;
        let productImg = element.productImg;
        let productName = element.productName;
        let productNumber = element.productNumber;
        let productPrice = element.productPrice;

        //on crée une variable qui calcule le prix total d'un produit en fonction de son prix et sa quantité
        let pricePerProduct = productPrice * productNumber;

        //on récupère l'élement conteneur
        let sectionCart = document.getElementById('panier');

        // on crée une balise conteneur pour le tableau du panier
        let cartProduct = document.createElement('table');
        cartProduct.classList.add('cart-container');

        //on crée une balise et sa classe, puis on ajoute le contenu voulu
        let imageProduct = document.createElement('td');
        imageProduct.innerHTML = `<a href="produit.html?id=${productId}"><img src="${productImg}" alt="Image produit" class="image-product"></a>`;

        //on crée une balise et sa classe, puis on ajoute le contenu voulu
        let titleInCart = document.createElement('td');
        titleInCart.classList.add('title-cart');
        titleInCart.textContent = productName;

        //on crée une balise et sa classe, puis on ajoute le contenu voulu
        let productQuantity = document.createElement('td');
        productQuantity.classList.add('quantity-cart');
        productQuantity.textContent = productNumber;

        //on crée une balise et sa classe, puis on ajoute le contenu voulu
        let priceInCart = document.createElement('td');
        priceInCart.classList.add('price-cart');
        priceInCart.textContent = pricePerProduct + ` €`;

        // on ajoute chaque balise créée dans la balise conteneur
        sectionCart.appendChild(cartProduct);
        cartProduct.appendChild(imageProduct);
        cartProduct.appendChild(titleInCart);
        cartProduct.appendChild(productQuantity);
        cartProduct.appendChild(priceInCart);

        products.push(productId);
    });

    let totalPrice = 0;

    for (let i = 0; i < objectStorage.length; i++) {
        let produit = objectStorage[i];
        let quantity = produit.productNumber;
        let price = produit.productPrice;
        let productPrice = quantity * price;
        totalPrice += productPrice;
    }

    /*const reducer = (accumulator, currentValue) => accumulator + currentValue.productNumber * currentValue.productPrice;
    let totalPrice2 = objectStorage.reduce(reducer, 0);*/

    let totalPanier = document.getElementById('totalPrice');
    totalPanier.innerHTML = totalPrice;

    // création d'une fonciton qui permet de clear le storage au click sur une image
    document.getElementById('remove-cart').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });

    /************************** FORMULAIRE *******************************/

    // stockage des différentes regEx dans des variables
    let myRegexText = /^[a-zA-Z][A-Za-z-\s]+$/;
    let myRegexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
    let myRegexAddress = /^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç]+)+$/;

    //on récupère le formulaire depuis le fichier HTML
    let form = document.querySelector('#contact');

    //on appelle toutes les fonctions créées plus bas
    form.firstName.addEventListener('change', function () {
        validateInput(this, myRegexText, 'Nom', 'Erreur dans la saisie du Nom');
    });

    form.lastName.addEventListener('change', function () {
        validateInput(this, myRegexText, 'Prénom', 'Erreur dans la saisie du Prénom (pas de chiffres)'
        );
    });

    form.email.addEventListener('change', function () {
        validateInput(this, myRegexEmail, 'e-mail', 'Adresse non valide');
    });

    form.address.addEventListener('change', function () {
        validateInput(this, myRegexAddress, 'adresse', 'Mmmh, vous êtes sûr ? (numéro de voie + nom de la voie)'
        );
    });

    form.city.addEventListener('change', function () {
        validateInput(this, myRegexText, 'ville', 'Problème dans la saisie');
    });

    // création d'un variable par input qui contient un test qui vérifie s'il y a une correspondance entre un texte et une expression
    let testNom = myRegexText.test;
    let testPrenom = myRegexText.test;
    let testEmail = myRegexEmail.test;
    let testAdresse = myRegexAddress.test;
    let testVille = myRegexText.test;

    function validateInput(input, regex, name, errorMessage) {
        testInput = regex.test(input.value);
        let small = input.nextElementSibling;
        if (testInput == true) {
            small.innerHTML = name + ' bien enregistré';
            small.classList.remove('text-danger');
            small.classList.add('text-success');
        } else {
            small.innerHTML = errorMessage;
            small.classList.remove('text-success');
            small.classList.add('text-danger');
        }
    }
    /****************************************/

    /**************** Envoie data ********************/

    //création class Contact
    let myForm = document.getElementById('contact');
    let contact;
    let order;

    myForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (
            testNom == false ||
            testAdresse == false ||
            testEmail == false ||
            testPrenom == false ||
            testVille == false
        ) {
            e.preventDefault();
        } else if ((contact = '')) {
            e.preventDefault();
        } else {
            contact = {
                firstName: myForm.firstName.value,
                lastName: myForm.lastName.value,
                address: myForm.address.value,
                city: myForm.city.value,
                email: myForm.email.value,
            };

            order = {
                contact: contact,
                products: products,
            };

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            fetch('http://localhost:3000/api/teddies/order', options)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    let totalPanier = document.getElementById('totalPrice');
                    let totalPrice = totalPanier.innerHTML;
                    let objectSessionStorage = {
                        prix: totalPrice,
                        prenom: myForm.lastName.value,
                        orderId: res.orderId,
                    };

                    let confirmation = JSON.stringify(objectSessionStorage);
                    sessionStorage.setItem('infoCustomer', confirmation);
                    window.location = 'confirmation.html';
                });
        }
    });
}
/****************************************/
