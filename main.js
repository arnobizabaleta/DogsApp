const URL = "https://api.thedogapi.com/v1/images/search";

/*fetch(URL)
    .then(res => res.json()) //Nos devuelve otra promise
    .then(data =>{//Nos devulve los datos solicitados desde la API
        const img = document.querySelector("img");//Tomando el nodo Img de HTML
        img.src = data[0].url;//Asignando atributo src a la img de HTML
        
    });
*/



async function getDog() {
   const response = await fetch(URL);
   const data = await response.json();
   const img = document.querySelector('img');
   img.src = data[0].url;
}
const button = document.getElementById('anotherImg');
button.onclick = getDog;