const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=3b8c53c8-f50e-4d68-964a-7421cdebc5be";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=2&api_key=3b8c53c8-f50e-4d68-964a-7421cdebc5be";

const spanError = document.getElementById("error");
/*fetch(URL)
    .then(res => res.json()) //Nos devuelve otra promise
    .then(data =>{//Nos devulve los datos solicitados desde la API
        const img = document.querySelector("img");//Tomando el nodo Img de HTML
        img.src = data[0].url;//Asignando atributo src a la img de HTML
        
    });
*/


async function loadAnotherCats() {
   const response = await fetch(API_URL_RANDOM);
   const data = await response.json();
   console.log("RANDOMS");
   console.log(data);
  
   if(response.status !== 200){
    spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
  }else{
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    
    
    img1.src = data[0].url;
    img2.src = data[1].url;
    
  }
  
}

async function loadFavoritesCats() {
    const response = await fetch(API_URL_FAVORITES);
    const data = await response.json();
    console.log("FAVORITES");
    console.log(data);

    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
      }
  
    
 }
/* const button = document.getElementById('anotherImg');
button.onclick = getAnotherDog; */
loadAnotherCats(); //Llamando a la funcion cuando cargamos nuestro codigo
loadFavoritesCats();