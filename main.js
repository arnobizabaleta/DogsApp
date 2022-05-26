//AXIOS
const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
  });
  api.defaults.headers.common['X-API-KEY'] = '382075b9-13fa-4057-bc03-6f3e70e9cf42';

//fecth
const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2&api_key=382075b9-13fa-4057-bc03-6f3e70e9cf42";
const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites";
const API_URL_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = "https://api.thedogapi.com/v1/images/upload";

const spanError = document.getElementById("error");
/*fetch(URL)
    .then(res => res.json()) //Nos devuelve otra promise
    .then(data =>{//Nos devulve los datos solicitados desde la API
        const img = document.querySelector("img");//Tomando el nodo Img de HTML
        img.src = data[0].url;//Asignando atributo src a la img de HTML
        
    });
*/


async function loadAnotherDogs() {
   const response = await fetch(API_URL_RANDOM);
   const data = await response.json();
   /* console.log("RANDOMS");
   console.log(data); */
  
   if(response.status !== 200){
    spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
  }else{
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
       
    img1.src = data[0].url;
    img2.src = data[1].url;
   
    btn1.onclick = ()=> saveFavoriteDog(data[0].id); //Arrow functions par evitar defnir por defecto el valor de onclick al btn
    btn2.onclick = ()=> saveFavoriteDog(data[1].id);//Así evitmaos que siempre se llame a la funcion saveFavorite por cada img
  }
  
}

async function loadFavoriteDogs() {
    const response = await fetch(API_URL_FAVORITES,{
        method:"GET",
        headers:{
            "X-API-KEY":"382075b9-13fa-4057-bc03-6f3e70e9cf42"
        }

    });
    const data = await response.json();
   /*  console.log("FAVORITES");
    console.log(data); */

    if(response.status !== 200){
        
        spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
      }else{
            const section = document.getElementById('favoriteDogs');
            section.innerHTML  = ""; //Limpiando la sección fav
            const h2 = document.createElement("h2");
            const h2Text = document.createTextNode("Perritos favoritos");
            h2.appendChild(h2Text);
            section.appendChild(h2);
            
            data.forEach(dog => {
            
            const article = document.createElement('article');
            article.class = "FavoriteImg";
            const img = document.createElement('img');
            
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al perro de favoritos');
            

            btn.appendChild(btnText);//Introduciendo el texto btnText al button
            btn.onclick = () => deleteFavoriteDog(dog.id);
            img.src = dog.image.url; //Agregandole a la img el atributo src del objeto cat atributo cat.image.url
            
            
            article.appendChild(img);//Insertando img al article
            article.appendChild(btn);//Agrendado btn al article

            section.appendChild(article);//Insertando article a la section
          });
    }
 
  
    
 }

 async function saveFavoriteDog(id) {
    //Axios
    const { data, status } = await api.post('/favourites', {
        image_id: id,
      });

    /* const response = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers:{
            "X-API-KEY":"382075b9-13fa-4057-bc03-6f3e70e9cf42",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({ //Asegudurandonos de enviar un text con la info necesaria para ser interprestado por cualquier lenguaje de backend
            image_id: id
        })
    });
    
    const data = await response.json();
    console.log("Guardar Favoritos")
    console.log(response); */
    
    if(status !== 200){
        spanError.innerHTML = "Hubo un error! " + status  + " " +data.message;
      }else{
        console.log("Perro guardado en favoritos");
        loadFavoriteDogs(); // Cargando dogs favoritos (Update info)
        
         const article = document.getElementById("container-img-perritosRandom");
         const span = document.createElement("span");
         span.innerHTML = "Tu perrito ha sido agregado con exito a favoritos,check below!";
         article.appendChild(span);//Insertando article a la section
         setTimeout(messageDelete,7000,span,article);
    }
  
    
 }

 async function deleteFavoriteDog(id) {
    const response = await fetch(API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE',
        headers:{
            "X-API-KEY":"382075b9-13fa-4057-bc03-6f3e70e9cf42",
        }
        });
    
    const data = await response.json();
    
    
    if(response.status !== 200){
        spanError.innerHTML = "Hubo un error! " + response.status  + " " +data.message;
      }else{
        console.log("Perro elimiando de favoritos");
        loadFavoriteDogs(); // Cargando dogs favoritos (Update info)
      }
    
 }
 
 async function uploadDogPhoto() {
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form)//agregando todos los valores input de nuestro form a la instancia FormDATA
    console.log(formData.get("file"))
    const response = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers:{
            "X-API-KEY":"382075b9-13fa-4057-bc03-6f3e70e9cf42",
        },
        body: formData,
    })
    const data = await response.json();
    if (response.status !== 201) {
        spanError.innerHTML = "Error: " + response.status + " " + data.message;
        console.log('Error')
        console.log({data})
    }else {
        console.log('Foto de Perrito subida')
        console.log({ data })
        console.log(data.url)
        saveFavoriteDog(data.id)//para agregar el michi cargado a favoritos.
        const section = document.getElementById("uploadDog");
        const span = document.createElement("span");
        span.innerHTML = "Tu perrito ha sido cargado y agregado con exito a favoritos,check below!";
        section.appendChild(span);//Insertando article a la section
        setTimeout(messageDelete,7000,span,section);
        console.log('Fin de la función')
        
    }
} 




 
/* const button = document.getElementById('anotherImg');
button.onclick = getAnotherDog; */
loadAnotherDogs(); //Llamando a la funcion cuando cargamos nuestro codigo
loadFavoriteDogs();

function messageDelete (span,section) {
    span.innerHTML = "";
    section.appendChild(span);
}