// requête fetch //
const connectApi = async (url) => {
    try {
        let reponse = await fetch(url);
        return reponse.json();
    }
    catch (e) {
        throw (e)
    };
};

// lien vers l'API //
const productsData = connectApi(`http://localhost:3000/api/teddies`);
productsData.then((data) => {
    //incrémentation de chaque produit existant dans l'API
    for (let i = 0; i < data.length; i++) {
        elementAdd(data[i]);
    }
});

const elementAdd = (data) => {

    const sectionProduct = document.getElementById("products-container"); //on récupère l'élement conteneur

    const newDiv = document.createElement("div");   //on crée un div conteneur dans la section
    newDiv.classList.add('global-container');    //on ajoute sa classe

    const newSecondDiv = document.createElement("div");   //on crée une div à l'intérieur
    newSecondDiv.classList.add("product-container");     //on ajoute une classe à cette div
    newSecondDiv.innerHTML = `<img src="${data.imageUrl}" alt="Image" class="product-image">` //on ajoute au DOM le lien vers la page produit et on fait le lien vers l'image

    const productName = document.createElement("h2");  // on crée un h2 contenant le "name" du produit
    productName.textContent = data.name; //on ajoute au DOM le nom du produit en question
    const productPrice = document.createElement("p");    // on crée un <p> contenant le prix
    productPrice.textContent = data.price / 100 + "€"; //on ajoute au DOM le prix du produit en question
    const buttonProduct = document.createElement("div");
    buttonProduct.innerHTML = `<a href=produit.html?id=${data._id}><button class="button-product" type="button">Personnaliser</button></a>`; // on ajoute un lien qui contient un id "dynamique" pour la redirection

    sectionProduct.appendChild(newDiv);  //on ajoute la div principale à la balise section récupérée plus tôt
    newDiv.appendChild(newSecondDiv);  // on ajoute la sous div à la div principale
    newSecondDiv.appendChild(productName); // on ajoute le h2 à la sous div
    newSecondDiv.appendChild(productPrice); // on ajoute le <p> à la sous div
    newSecondDiv.appendChild(buttonProduct);   // on ajoute le bouton qui dirige vers les produits
}