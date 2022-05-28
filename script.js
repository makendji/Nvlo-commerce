let products = {
  data: [
    {
      productName: "Montre Ublo",
      category: "Montre",
      price: "3000",
      image: "images/items/mtr1.jpg",
      id: 1,
    },
    {
      productName: "T-shirt bleu",
      category: "T-shirt",
      price: "4950",
      image: "images/items/img2.webp",
      id: 12,
    },
    {
      productName: "Sporty Montre",
      category: "Montre",
      price: "9900",
      image: "images/items/mtr2.jpg",
      id: 15,
    },
    {
      productName: "Basic Ecouteur",
      category: "Accessoir",
      price: "2950",
      image: "images/items/9.jpg",
      id: 5,
    },
    {
      productName: "Jacket Noir",
      category: "Jacket",
      price: "12900",
      image: "images/items/black-leather-jacket.jpg",
      id: 6,
    },
    {
      productName: "Jacket Brun",
      category: "Jacket",
      price: "8000",
      image: "images/items/2.jpg",
      id: 8,
    },
    {
      productName: "Converse",
      category: "Chaussure",
      price: "15500",
      image: "images/items/12.jpg",
      id: 4,
    },

    {
      productName: "Pantalon strech",
      category: "Pantalon",
      price: "4950",
      image: "images/items/comfy-gray-pants.jpg",
      id: 50,
    },
  ],
};

for (let i of products.data) {
  //Créer une carte
  let card = document.createElement("div");
  //La carte doit avoir une catégorie et doit rester masquée initialement
  card.classList.add("card", i.category, "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);

  //price
  let price = document.createElement("h6");
  price.innerText = i.price + " FCFA";
  container.appendChild(price);

//achat
let achat = document.createElement("div");
  achat.classList.add("btn-klo");
  achat.addEventListener("click", () => {
     var nom = i.productName;
     var code = i.id;
     var prix = i.price;
     var tof = i.image;
     var qte = 1;
     ajouter(code,qte,prix,nom);
     
    

  });
  achat.innerText = "Acheter";
  container.appendChild(achat);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}


//paramètre transmis depuis le bouton (Paramètre identique à la catégorie)
function filterProduct(value) {
  //Code de classe de bouton
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //vérifier si la valeur est égale à innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //sélectionner toutes les cartes
  let elements = document.querySelectorAll(".card");
  //parcourir toutes les cartes
  elements.forEach((element) => {
    //afficher toutes les cartes en cliquant sur le bouton "toutes"
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Vérifier si l'élément contient une classe de catégorie
      if (element.classList.contains(value)) {
        //élément d'affichage basé sur la catégorie
        element.classList.remove("hide");
      } else {
        //masquer d'autres éléments
        element.classList.add("hide");
      }
    }
  });
}

//Cliquez sur le bouton de recherche
document.getElementById("search").addEventListener("click", () => {
  //initialisations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //parcourir tous les éléments
  elements.forEach((element, index) => {
    //vérifier si le texte inclut la valeur de recherche
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //afficher la carte correspondante
      cards[index].classList.remove("hide");
    } else {
      //cacher les autres
      cards[index].classList.add("hide");
      
    }

  });
});

//Afficher initialement tous les produits
window.onload = () => {
  filterProduct("all");
};



function LignePanier (code, qte, prix,nom)
{
    this.codeArticle = code;
    this.qteArticle = qte;
    this.prixArticle = prix;
    this.nomArticle = nom;
    this.ajouterQte = function(qte,code)
    {
        this.qteArticle = qte + 1;
  
    }
    this.getPrixLigne = function()
    {
        var resultat = this.prixArticle * this.qteArticle;
        return resultat;
    }
    this.getCode = function() 
    {
        return this.codeArticle;
    }


}


function Panier()
{
    this.liste = [];
    this.ajouterArticle = function(code, qte, prix,nom)
    { 
        var index = this.getArticle(code);
        if (index == -1) this.liste.push(new LignePanier(code, qte, prix, nom));
        else this.liste[index].ajouterQte(qte);
    }

    this.getPrixPanier = function()
    {
        var total = 0;
        for(var i = 0 ; i < this.liste.length ; i++)
            total += this.liste[i].getPrixLigne();
        return total ;
    }
    this.getArticle = function(code)
    {
        for(var i = 0 ; i <this.liste.length ; i++)
            if (code == this.liste[i].getCode()) return i;
        return -1;
    }
    
    this.supprimerArticle = function(code)
    {
        var index = this.getArticle(code);
        if (index > -1) this.liste.splice(index, 1);
    }
}




 function ajouter(code,qte,prix,nom)
            {
               
                var monPanier = new Panier();
                monPanier.ajouterArticle(code, qte, prix,nom);
                var tableau = document.getElementById("tableau");
                var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
                if (longueurTab > 0)
                {
                    for(var i = longueurTab ; i > 0  ; i--)
                    {
                        monPanier.ajouterArticle(parseInt(tableau.rows[i].cells[0].innerHTML), parseInt(tableau.rows[i].cells[1].innerHTML), parseInt(tableau.rows[i].cells[2].innerHTML));
                        tableau.deleteRow(i);
                    }
                }
                var longueur = monPanier.liste.length;
                for(var i = 0 ; i < longueur ; i++)
                {
                    var ligne = monPanier.liste[i];
                    var ligneTableau = tableau.insertRow(-1);
                    var colonne1 = ligneTableau.insertCell(0);
                    colonne1.innerHTML += ligne.getCode();
                    var colonne2 = ligneTableau.insertCell(1);
                    colonne2.innerHTML += ligne.qteArticle;
                    var colonne3 = ligneTableau.insertCell(2);
                    colonne3.innerHTML += ligne.prixArticle;
                    var colonne4 = ligneTableau.insertCell(3);
                    colonne4.innerHTML += ligne.getPrixLigne();
                    var colonne5 = ligneTableau.insertCell(4);
                    colonne5.innerHTML += "<button class=\"btn btn-danger\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
                }
                document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
                document.getElementById("pr").innerHTML = monPanier.liste.length;
                document.getElementById("nbreLignes").innerHTML = longueur;
            }


              function supprimer(code)
            {
                var monPanier = new Panier();
                var tableau = document.getElementById("tableau");
                var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
                if (longueurTab > 0)
                {
                    for(var i = longueurTab ; i > 0  ; i--)
                    {
                        monPanier.ajouterArticle(parseInt(tableau.rows[i].cells[0].innerHTML), parseInt(tableau.rows[i].cells[1].innerHTML), parseInt(tableau.rows[i].cells[2].innerHTML));
                        tableau.deleteRow(i);
                    }
                } 
                monPanier.supprimerArticle(code);
                var longueur = monPanier.liste.length;
                for(var i = 0 ; i < longueur ; i++)
                {
                    var ligne = monPanier.liste[i];
                    var ligneTableau = tableau.insertRow(-1);
                    var colonne1 = ligneTableau.insertCell(0);
                    colonne1.innerHTML += ligne.getCode();
                    var colonne2 = ligneTableau.insertCell(1);
                    colonne2.innerHTML += ligne.qteArticle;
                    var colonne3 = ligneTableau.insertCell(2);
                    colonne3.innerHTML += ligne.prixArticle;
                    var colonne4 = ligneTableau.insertCell(3);
                    colonne4.innerHTML += ligne.getPrixLigne();
                    var colonne5 = ligneTableau.insertCell(4);
                    colonne5.innerHTML += "<button class=\"btn btn-danger\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\"><span class=\"glyphicon glyphicon-remove\"></span> Retirer</button>";
                }
                document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
                document.getElementById("nbreLignes").innerHTML = longueur;
            }