const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=3b8c53c8-f50e-4d68-964a-7421cdebc5be";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?api_key=3b8c53c8-f50e-4d68-964a-7421cdebc5be";
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=3b8c53c8-f50e-4d68-964a-7421cdebc5be`;

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
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
       
    img1.src = data[0].url;
    img2.src = data[1].url;
   
    btn1.onclick = ()=> saveFavoriteCat(data[0].id); //Arrow functions par evitar defnir por defecto el valor de onclick al btn
    btn2.onclick = ()=> saveFavoriteCat(data[1].id);//Así evitmaos que siempre se llame a la funcion saveFavorite por cada img
  }
  
}

async function loadFavoriteCats() {
    const response = await fetch(API_URL_FAVORITES);
    const data = await response.json();
    console.log("FAVORITES");
    console.log(data);

    if(response.status !== 200){
        
        spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
      }else{
            const section = document.getElementById('favoriteMichis');
            section.innerHTML  = ""; //Limpiando la sección fav
            const h2 = document.createElement("h2");
            const h2Text = document.createTextNode("Michis favoritos");
            h2.appendChild(h2Text);
            section.appendChild(h2);
            
            data.forEach(cat => {
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');

            btn.appendChild(btnText);//Introduciendo el texto btnText al button
            btn.onclick = () => deleteFavoriteCat(cat.id);
            img.src = cat.image.url; //Agregandole a la img el atributo src del objeto cat atributo cat.image.url
            img.width = 200;
            img.height = 250;
            article.appendChild(img);//Insertando img al article
            article.appendChild(btn);//Agrendado btn al article

            section.appendChild(article);//Insertando article a la section
          });
    }
 
  
    
 }

 async function saveFavoriteCat(id) {
    const response = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({ //Asegudurandonos de enviar un text con la info necesaria para ser interprestado por cualquier lenguaje de backend
            image_id: id
        })
    });
    
    const data = await response.json();
    console.log("Guardar Favoritos")
    console.log(response);
    
    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
      }else{
          console.log("Michi guardado en favoritos");
          loadFavoriteCats(); // Cargando michis favoritos (Update info)
    }
  
    
 }

 async function deleteFavoriteCat(id) {
    const response = await fetch(API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE',
        });
    
    const data = await response.json();
    
    
    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
      }else{
        console.log("Michi elimiando de favoritos");
        loadFavoriteCats(); // Cargando michis favoritos (Update info)
      }
    
 }
/* const button = document.getElementById('anotherImg');
button.onclick = getAnotherDog; */
loadAnotherCats(); //Llamando a la funcion cuando cargamos nuestro codigo
loadFavoriteCats();
