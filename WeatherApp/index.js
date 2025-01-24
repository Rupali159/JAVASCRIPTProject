// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=202674e68f500ffb90cd55fd8fedab0a

const apikey = "202674e68f500ffb90cd55fd8fedab0a";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=202674e68f500ffb90cd55fd8fedab0a";

//api
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//for the seaach
const searchBox = document.querySelector(".search input");

const searchbtn = document.querySelector(".search button");

const weatherImg = document.querySelector(".weather-icon");

//main function
async function checkWeather(city){
    const response = await fetch(apiUrl+ city +`&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{

        var data = await response.json();
    console.log(data);

    //api information and gives user informations
    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temp").innerHTML = 
    Math.round(data.main.temp)+"°C";

    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";

    document.querySelector(".wind").innerHTML = data.wind.speed+" km/hr";

    // weather images change

    if(data.weather[0].main ==="Clouds"){
        weatherImg.src = "/WeatherApp/Images/cloud.png";
    }
    else if(data.weather[0].main ==="Clear"){
        weatherImg.src = "/WeatherApp/Images/clear.png";
    }
    else if(data.weather[0].main ==="Rain"){
        weatherImg.src = "/WeatherApp/Images/rain.png";
    }
    else if(data.weather[0].main ==="Drizzle"){
        weatherImg.src = "/WeatherApp/Images/drizzle.png";
    }
    else if(data.weather[0].main ==="Mist"){
        weatherImg.src = "/WeatherApp/Images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";

    document.querySelector(".error").style.display = "none";


    }
}

//search the city for and give click button  
searchbtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

// // API Key and URL
// const apikey = "202674e68f500ffb90cd55fd8fedab0a";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// // DOM Elements
// const searchBox = document.querySelector(".search input");
// const searchbtn = document.querySelector(".search button");
// const weatherImg = document.querySelector(".weather-icon");

// // Main function to fetch and update weather data
// async function checkWeather(city) {
//     const response = await fetch(apiUrl + city + `&appid=${apikey}`);
//     const data = await response.json();

//     // Update UI with weather data
//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

//     // Update weather icon based on condition
//     const weatherCondition = data.weather[0].main.toLowerCase();
//     const iconMapping = {
//         clouds: "cloud.png",
//         clear: "clear.png",
//         rain: "rain.png",
//         drizzle: "drizzle.png",
//         mist: "mist.png",
//     };
//     weatherImg.src = `/WeatherApp/Images/${iconMapping[weatherCondition] || "default.png"}`;

//     // Show weather details
//     document.querySelector(".weather").style.display = "block";
// }

// // Event listener for search button click
// searchbtn.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// });
