const API_URL = "https://api.thedogapi.com/v1/images/search?limit=3&api_key=382075b9-13fa-4057-bc03-6f3e70e9cf42";

/*fetch(URL)
    .then(res => res.json()) //Nos devuelve otra promise
    .then(data =>{//Nos devulve los datos solicitados desde la API
        const img = document.querySelector("img");//Tomando el nodo Img de HTML
        img.src = data[0].url;//Asignando atributo src a la img de HTML
        
    });
*/


async function getAnotherDog() {
   const response = await fetch(API_URL);
   const data = await response.json();
   
   console.log(data);
   const img1 = document.getElementById('img1');
   const img2 = document.getElementById('img2');
   const img3 = document.getElementById('img3');
   
   img1.src = data[0].url;
   img2.src = data[1].url;
   img3.src = data[2].url;
}
/* const button = document.getElementById('anotherImg');
button.onclick = getAnotherDog; */
getAnotherDog(); //Llamando a la funcion cuando cargamos nuestro codigo