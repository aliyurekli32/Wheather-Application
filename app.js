
// Define the string











const form = document.querySelector("form");
const input = document.getElementById("text");
const btn = document.getElementById("btn");
const date= new Date();
const hours = date.getHours();
const dk = date.getMinutes();
//let sayaç =0;
const city =[];

const errorx=()=>{
    const timex = setTimeout(()=>{
        document.querySelector("p").innerHTML=`<div class="alert alert-danger" role="alert">Please enter a valid city</div>`
    },0);
    const timey = setTimeout(()=>{
        document.querySelector("p").innerHTML=``
    },3000);
}

form.addEventListener("submit",(e)=>{
    input.value=input.value.toLowerCase();
    console.log(input.value);
    if(!input.value){
        const time55 = setTimeout(()=>{
            document.querySelector("p").innerHTML=`<div class="alert alert-danger" role="alert">Please enter a city</div>`
        },0);
        const time66 = setTimeout(()=>{
            document.querySelector("p").innerHTML=``
        },3000);
    }else if(city.includes(input.value)){
        
    const time5 = setTimeout(()=>{
        document.querySelector("p").innerHTML=`<div class="alert alert-danger" role="alert">
        The same city cannot be entered again !!
      </div>`;
      
    },0);
    const time6 = setTimeout(()=>{
        document.querySelector("p").innerHTML=``
        
    },3000);
    }
    
    
    
    if(!city.includes(input.value)){
        
        if(city.length<4){
            weaterApi();
            //sayaç++;
        }
        else{
            document.querySelector("p").innerHTML=`<div class="alert alert-danger" role="alert">You can enter up to 4 cities!!</div>`
        }
        
    }
    
    e.preventDefault();
    
})

const weaterApi = async function(){
    let anahtar = 'MGRkMTgzYmNlYzI2NDFkYTI3N2IzOGFhOWRkNGQ1OWE=';
    localStorage.setItem("anahtar",anahtar);
   
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${atob(localStorage.getItem("anahtar"))}&units=metric&lang=tr`;
    let data = await fetch(url).then((res,rej)=> res.json()).then((data)=>data);
    
    console.log(data);
    if(data.message=='city not found'){
        input.value=``;
        return errorx();
    }
    city.push(input.value);
    console.log(city);
    const{weather,sys,main,name} = data;
    const{description,icon}=weather[0];
    const{country}=sys;
    const{temp}=main;
    
    
   
    const card = document.getElementById("box1");
    function random(){
       
        if(hours >= 19 ){ return "background-image: url(./img/night.jpg); background-repeat: no-repeat; background-size: cover;"}
        else if(hours >= 17 ){ return "background-image: url(./img/sunset.jpg); background-repeat: no-repeat; background-size: cover;"}
        else if(hours >= 12 ){ return "background-image: url(./img/afternoon.jpg); background-repeat: no-repeat; background-size: cover;"}
        else if(hours >= 07 ){ return "background-image: url(./img/sunsire.jpg); background-repeat: no-repeat; background-size: cover;"}
        else if(hours >= 00){ return "background-image: url(./img/night.jpg); background-repeat: no-repeat; background-size: cover;"}
    }
    card.innerHTML =
    `  <div id="asd" class="col-md-6 col-lg-3 col-xl-3 ms-2 mt-2 ">    
      <div class="card ms-3 me-3"style="color: white; border-radius: 35px; ${random()}">
          <div class="card-body p-4">
              <div class="d-flex">
                  <h6 class="flex-grow-1 h4 ">${name} <sup><span
                              style="background-color: orange; border-radius: 0.30rem; color:white; padding:1%; font-size: 1rem;">
                              ${country}</span></sup> </h6>
                  <h6 style="color:white;">${hours + ":" + dk}</h6>
              </div>
              <div class="d-flex flex-column text-center mt-5 mb-4">
                  <h6 class="display-4  font-weight-bold" style="color: white;"> ${Math.round(
                      temp
                      )} <sup style="font-size:35px;">°C </sup> </h6>
                  <span class="small" style="color: blue">${description}</span>
              </div>
              <div class="d-flex justify-content-center">
                  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" width="100px">
              </div>
          </div>
     </div>
     </div>
` + card.innerHTML;
input.value=``;
} 

