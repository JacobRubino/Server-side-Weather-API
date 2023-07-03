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
let citybtn = document.getElementsByClassName("city-button");
let searchButtEL = document.getElementById('searchButt');
let searchbarEl = document.getElementById("search-bar");
let searchFormEl = document.getElementById("search-form");


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchWeather(search){
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
  inputName = capitalizeFirstLetter(input)
  getWeath(input)
    .then((lonlat) => {
      console.log (lonlat)
      long = lonlat.long[0].lon;
      lat = lonlat.long[0].lat;
      FiveDUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lonlat.long[0].lat}&lon=${lonlat.long[0].lon}&appid=${WAppId}&units=imperial`;
      return FiveDUrl;
    })
    .then((LonLatURL) => {
      fetchWeather(LonLatURL).then((object) => {
        PrintMainRes(object.list[0]);
        for (let index = 7; index < object.list.length; index += 8) {
          const element = object.list[index];
          printResults(element);
        }
      });
    });
}
// returnWeath('new haven');

function PrintMainRes(resultObj){ 
  weatherLI.replaceChildren('')
   let locName = document.getElementById("result-text")
  locName.textContent = `${inputName}` 
  let mainContentEl = document.createElement("p");
  let mainBody = document.getElementById("main-weather")
  mainBody.innerHTML = ""
  mainContentEl.innerHTML = "<strong>" + resultObj.dt_txt.split(" ").shift() + "</strong>" +" <br/>";

  if (resultObj.weather[0].icon) {
    mainContentEl.innerHTML +=
      "<img src=' https://openweathermap.org/img/wn/"+ resultObj.weather[0].icon + ".png'><br/>";
  }
  if (resultObj.main.temp) {
    mainContentEl.innerHTML +=
      "<strong>Temperature:</strong> " + resultObj.main.temp + " F" + "<br/>";
  } else {
    mainContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.wind.speed) {
    mainContentEl.innerHTML +=
      "<strong>Wind:</strong> " + resultObj.wind.speed + " mph" + "<br/>";
  } else {
    mainContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }
  if (resultObj.main.humidity) {
    mainContentEl.innerHTML +=
      "<strong>Humidity:</strong> " + resultObj.main.humidity + " %";
  } else {
    mainContentEl.innerHTML +=
      "<strong>Weather</strong>  No Weather data for this location";
  }
  mainBody.append(locName, mainContentEl)
}

function printResults(resultObj) {
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
    if (resultObj.weather[0].icon) {
      bodyContentEl.innerHTML +=
        "<img src=' https://openweathermap.org/img/wn/"+ resultObj.weather[0].icon + ".png'><br/>";
    }
  if (resultObj.main.temp) {
    bodyContentEl.innerHTML +=
      "<strong>Temperature:</strong> " + resultObj.main.temp + " F" + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.wind.speed) {
    bodyContentEl.innerHTML +=
      "<strong>Wind:</strong> " + resultObj.wind.speed + " mph" + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }
  if (resultObj.main.humidity) {
    bodyContentEl.innerHTML +=
      "<strong>Humidity:</strong> " + resultObj.main.humidity + " %";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Weather</strong>  No Weather data for this location";
  }
  finalBody.append(titleEl, bodyContentEl,);
  weatherLI.append(WeatherWidg);
}


function createLocalButtons (){
  var buttCont = document.getElementById("button-container")
  buttCont.innerHTML = ""
  reverseArr = []
  const localArr = JSON.parse(localStorage.getItem('local_search'))
  localArr.forEach(element => { reverseArr.unshift(element)
  });
  console.log(reverseArr, localArr)
  var newh2 = document.createElement("h2")
  newh2.className = 'pt-3'
  newh2.innerHTML = 'Frequently Searched'
  buttCont.append(newh2)
  if (reverseArr != null){
    for (let index = 0; index < reverseArr.length; index++) {
      const element = reverseArr[index];
      var btn = document.createElement("button");
      btn.className = ' w-75 '
      btn.className += ' mb-5 '
      btn.className += ' city-button '
      btn.id = element
      btn.innerText = capitalizeFirstLetter(element)
      buttCont.append(btn)
  
      }
  }else{
    console.log("local storage is empty")
  }
}

function storeSearch (search){ 
  console.log(search)
  const localSearch = []
  const storedCities = JSON.parse(localStorage.getItem('local_search'))
  console.log(storedCities)
  if (storedCities != null){
    if (storedCities.includes(search) == false){
      const count = storedCities.push(search)
        if (storedCities.length > 7){
          storedCities.shift()
          localStorage.setItem('local_search', JSON.stringify(storedCities))
        } else {
          localStorage.setItem('local_search', JSON.stringify(storedCities))
      }
    } else {
      console.log('this search is already stored', storedCities.includes(search), search, storedCities)}
  } else {
    const count = localSearch.push(search)
    localStorage.setItem('local_search', JSON.stringify(localSearch)) 
  }
  createLocalButtons()
}

function submitSearch(event){
  var searchCont = searchbarEl.value
  event.preventDefault();
  storeSearch(searchCont)
  weatherLI.replaceChildren('')
  returnWeath(searchCont)
}

searchFormEl.addEventListener(("submit"), submitSearch)
createLocalButtons()
for (let index = 0; index < citybtn.length; index++) {
  const element = citybtn[index];
  element.addEventListener("click", function(){
      cityNameButt = element.id
      console.log(cityNameButt)
      returnWeath(cityNameButt)  
  })
}

