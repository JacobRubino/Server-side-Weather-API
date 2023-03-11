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
// let Atlanta = document.getElementById("atlanta");
// let Denver = document.getElementById("Denver");
// let Seattle = document.getElementById("Seattle");
// let SanFrancisco = document.getElementById("SanFrancisco");
// let Orlando = document.getElementById("Orlando");
// let NewYork = document.getElementById("NewYork");
// let Chicago = document.getElementById("Chicago");
// let Austin = document.getElementById("Austin");
let citybtn = document.getElementsByClassName("city-button");
let searchButtEL = document.getElementById('searchButt');
let searchbarEl = document.getElementById("search-bar");
let searchFormEl = document.getElementById("search-form");


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} //got this on stackoverflow 

function fetchWeather(search){
  return fetch(search)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

function getWeath(cityName) {
  console.log(cityName)
  let geotoLatId = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${WAppId}`;
  return fetchWeather(geotoLatId).then((geoData) => {
    // console.log(geoData);
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
        // console.log(object.list);
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

// function buttInput(search){
//   returnWeath(search)
// }

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
      btn.innerText = element
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
    } else {console.log('this search is already stored', storedCities.includes(search), search, storedCities)}
  } else {
    const count = localSearch.push(search)
    localStorage.setItem('local_search', JSON.stringify(localSearch)) 
  }
  createLocalButtons()
}


//   const cityStorage = {'city0' : search}
//   const storedCities = JSON.parse(localStorage.getItem('local_search'))
//   const cityArr = storedCities && Object.values(storedCities )
//   console.log(cityArr, storedCities)
//   if (storedCities != null){
//     for (let index = 0; index < cityArr.length; index++) {
//       const element = cityArr[index];
//       const cityValue = `city${index}`
//       cityStorage[cityValue] = element  
//       console.log(element, cityValue, cityStorage[cityValue])  
//       localStorage.setItem('local_search', JSON.stringify(cityStorage)) 
//     }

//   } else {
//     localStorage.setItem('local_search', JSON.stringify(cityStorage)) 
//   }
// }
  // console.log(localStorCity)

  // let count = Object.keys.length 
  // console.log(count)
  // // localStorage.setItem('local_search', JSON.stringify(storedCities + search))
  // if (storedCities != null){
  //   storedCities = storedCities + "," + `city${count}:` + search + 
  //   localStorage.setItem('local_search',JSON.stringify(storedCities))
       
  // } else{
  //   localStorage.setItem('local_search', JSON.stringify({city0:search}))
  // }
// }

// local storage.get the object, get object.length, add 1 to it and cityname[objlen+1] = search

  // if (storedCities != null){
  // let cities = Object.values(storedCities)
  // for (let index = 0; index < cities.length; index++) {
  //   const element = cities[index];
  //   if (search == element){
  //     console.log("search is already in sotrage")
  //   }else{
  //     cities.unshift(search)
  //     if (cities.length > 8){
  //       cities.pop()
  //       localStorage.setItem('local_search', JSON.stringify(storedCities))
  //       }
  //     }     
  //   }
  // } else {
  //   JSON.stringify()
  // }
// }
//for item in local storage, button.append(element.key )

//   console.log(storedCities)
//   var city = JSON.stringify({inputname : search});
//   localStorage.setItem("local_search", city)
// }
//   if (localArr != null){
//     if (localStorArr.includes(search, 0) == true) {
//     console.log(search + 'was already in the array')
//     } else{
//       if (localStorArr.length = 8){
//       localStorArr.unshift(search)
//       localStorArr.splice(9,1)
//       localStorage.setItem('local_search', localStorArr)
//         } else {
//           localStorArr.unshift(search)
//           localStorage.setItem('local_search', localStorArr)
//         }
//       }
//   } else {
//     var storeAsArr = [search , "array"]
//     console.log(`this should store ${storeAsArr}`)
//     localStorage.setItem('local_search', storeAsArr)
//   }
// }

// getlocal.array
// unshift ->
// if var newArr array.len >>> number .pop() or .splice()
//localStorage.store arr
//after unshift and splice, i would create buttons for each object in newArr
//


function submitSearch(event){
  var searchCont = searchbarEl.value
  event.preventDefault();
  storeSearch(searchCont)
  weatherLI.replaceChildren('')
  // console.log(searchCont)
  returnWeath(searchCont)
}

searchFormEl.addEventListener(("submit"), submitSearch)
createLocalButtons()
for (let index = 0; index < citybtn.length; index++) {
  const element = citybtn[index];
  console.log(element)
  element.addEventListener("click", function(){
      
      cityNameButt = element.id
      console.log(cityNameButt)
      returnWeath(cityNameButt)  
  })
}

