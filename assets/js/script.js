let weatherTURL = "";
let weatherHead = document.getElementById('result-text');
let weatherLI = document.getElementById("result-content");
let WAppId = "8aa8cd47805d9d880b2338a0944a512d";
let FiveDUrl = "";
let daysWeath;
let lonOrLat;
let long;
let lat;
let CityInput;
let inputName;
let Atlanta = document.getElementById("atlanta");
let Denver = document.getElementById("Denver");
let Seattle = document.getElementById("Seattle");
let SanFrancisco = document.getElementById("SanFrancisco");
let Orlando = document.getElementById("Orlando");
let NewYork = document.getElementById("NewYork");
let Chicago = document.getElementById("Chicago");
let Austin = document.getElementById("Austin");
let citybtn = document.getElementsByClassName("city-button");
let searchButtEL = document.getElementById('searchButt');
let searchbarEl = document.getElementById("search-bar");
let searchFormEl = document.getElementById("search-form");


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} //got this on stackoverflow 

function fetchWeather(search) {
  return fetch(search)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}
function getWeath(cityName) {
  let geotoLatId = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${WAppId}`;
  return fetchWeather(geotoLatId).then((geoData) => {
    console.log(geoData);
    long = geoData;
    return { long };
  });
}
function returnWeath(input) {
  // console.log(input)
  inputName = capitalizeFirstLetter(input)
  getWeath(input)
    .then((lonlat) => {
      long = lonlat.long[0].lon;
      lat = lonlat.long[0].lat;
      FiveDUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lonlat.long[0].lat}&lon=${lonlat.long[0].lat}&appid=${WAppId}&units=imperial`;
      return FiveDUrl;
    })
    .then((LonLatURL) => {
      fetchWeather(LonLatURL).then((object) => {
        console.log(object);
        console.log(object.list);
        PrintMainRes(object.list[0]);
        for (let index = 7; index < object.list.length; index += 8) {
          const element = object.list[index];
          // console.log(element);
          printResults(element);
        }
      });
    });
}
// returnWeath('new haven');

function PrintMainRes(resultObj){ 
   let locName = document.getElementById("result-text")
  locName.textContent = `${inputName}` 
  let mainContentEl = document.createElement("p");
  let mainBody = document.getElementById("main-weather")
  mainBody.innerHTML = ""
  mainContentEl.innerHTML = "<strong>" + resultObj.dt_txt.split(" ").shift() + "</strong>" +" <br/>";

  if (resultObj.main.temp) {
    mainContentEl.innerHTML +=
      "<strong>Temperature:</strong> " + resultObj.main.temp + "<br/>";
  } else {
    mainContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.wind.speed) {
    mainContentEl.innerHTML +=
      "<strong>Wind:</strong> " + resultObj.wind.speed + "<br/>";
  } else {
    mainContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }
  if (resultObj.main.humidity) {
    mainContentEl.innerHTML +=
      "<strong>Humidity:</strong> " + resultObj.main.humidity;
  } else {
    mainContentEl.innerHTML +=
      "<strong>Weather</strong>  No Weather data for this location";
  }
  mainBody.append(locName, mainContentEl)
}

function printResults(resultObj) {
  // console.log(resultObj);

  // set up `<div>` to hold result content
  let WeatherWidg = document.createElement("div");
  WeatherWidg.classList.add(
    "card",
    "weather-widget",
    "col-12",
    "col-md-2",
    "pl-2"
  );

  let finalBody = document.createElement("div");
  finalBody.classList.add("card-body");
  WeatherWidg.append(finalBody);

  let titleEl = document.createElement("h3");
  titleEl.textContent = resultObj.title;

  let bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML =
    "<strong>" + resultObj.dt_txt.split(" ").shift() + "</strong>" +" <br/>";

  if (resultObj.main.temp) {
    bodyContentEl.innerHTML +=
      "<strong>Temperature:</strong> " + resultObj.main.temp + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.wind.speed) {
    bodyContentEl.innerHTML +=
      "<strong>Wind:</strong> " + resultObj.wind.speed + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }
  if (resultObj.main.humidity) {
    bodyContentEl.innerHTML +=
      "<strong>Humidity:</strong> " + resultObj.main.humidity;
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Weather</strong>  No Weather data for this location";
  }
  finalBody.append(titleEl, bodyContentEl,);
  weatherLI.append(WeatherWidg);
}

function buttInput(search){
  returnWeath(search)
}

for (let index = 0; index < citybtn.length; index++) {
  const element = citybtn[index];
  element.addEventListener("click", function(){
      weatherLI.replaceChildren('')
      cityNameButt = element.id
      console.log(cityNameButt)
      returnWeath(cityNameButt)  
  })
}
function submitSearch(event){
  event.preventDefault();
  weatherLI.replaceChildren('')
  var searchCont = searchbarEl.value
  console.log(searchCont)
  returnWeath(searchCont)
}

searchFormEl.addEventListener(("submit"), submitSearch)

