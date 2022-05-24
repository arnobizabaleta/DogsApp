console.log("hello world");
const URL = "https://api.thedogapi.com/v1/images/search";

fetch(URL)
    .then(res => res.json()) //Nos devuelve otra promise
    .then(data =>{//Nos devulve los datos solicitados desde la API
        const img = document.querySelector("img");//Tomando el nodo Img de HTML
        img.src = data[0].url;//Asignando atributo src a la img de HTML
        
    });