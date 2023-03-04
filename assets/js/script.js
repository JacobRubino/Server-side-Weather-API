let weatherTURL = "";
let weatherLI = document.getElementById("result-content");
let searchFormEl = document.querySelector("#search-form");
let WAppId = "8aa8cd47805d9d880b2338a0944a512d";
let daysWeath;
let lonOrLat;
let long;
let lat;
let FiveDUrl = "";

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

function returnWeath() {
  getWeath("detroit")
    .then((lonlat) => {
      long = lonlat.long[0].lon;
      lat = lonlat.long[0].lat;
      FiveDUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${WAppId}&units=imperial`;
      return FiveDUrl;
    })
    .then((LonLatURL) => {
      fetchWeather(LonLatURL).then((object) => {
        console.log(object);
        console.log(object.list);
        for (let index = 0; index < object.list.length; index += 8) {
          const element = object.list[index];
          console.log(element);
          printResults(element);
        }
      });
    });
}

// let weatherRes = fetchWeather(lonLatUrl, () => {})
// let temp = weatherRes[1].temp
// console.log(temp);

// for (let index = 0; index < lonLat.length; index++) {
//   lonOrLat[index] = lonLat[index]
//   console.log(lonOrLat[index])
// }

returnWeath();
// console.log(weatherLI);
// for (let index = 0; index < weatherLI.length; index += 8) {
//   const element = weatherLI[index];
//   element.textContent = "";
// }

function searchSubmit(event) {
  event.preventDefault();
  let searchBarInput = document.querySelector("#search-bar");
  let buttonInput = document.querySelector();
}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  let WeatherWidg = document.createElement("div");
  WeatherWidg.classList.add(
    "card",
    "bg-primary",
    "text-light",
    "mb-3",
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
    "<strong>" + resultObj.dt_txt + "</strong>" +" <br/>";

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
      "<strong>Description:</strong>  No description for this entry.";
  }
  finalBody.append(titleEl, bodyContentEl,);
  weatherLI.append(WeatherWidg);
}

// searchFormEl.addEventListener("submit", returnWeath);
