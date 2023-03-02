let weatherTURL = "";
let weatherLI = document.getElementById("result-content").children;
let searchFormEl = document.querySelector("#search-form");
let WAppId = "8aa8cd47805d9d880b2338a0944a512d";
// let FiveDayURL = `api.openweathermap.org/data/2.5/forecast?appid=${WAppId}&lat=${lat}&lon=${lon}`;
let FiveDUrl;
let daysWeath;
let lonOrLat;
// function getFURL() {

// }

function fetchWeather(search) {
  return fetch(search)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}
function returnLat(resultObj) {
  resultObj.forEach((element) => {
    console.log(element.lat)
    return (element.lat);
  });
}
function returnLon(resultObj) {
  resultObj.forEach((element) => {
    console.log(element)
    return (element.lon);
  });
  // .then fetchWeather()
}

async function getLonLat(cityName) {
  let geotoLatId = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${WAppId}`;
  let result = await fetchWeather(geotoLatId, () => {});
  console.log(result)
  let lon = returnLon(result);
  let lat = returnLat(result);
  let FiveDUrl = `api.openweathermap.org/data/2.5/forecast?appid=${WAppId}&lat=${lat}&lon=${lon}`;
  console.log(FiveDUrl)
  return FiveDUrl;
}

async function returnWeath() {
  let lonLatUrl = getLonLat("Detroit");
  // let weatherRes = await fetchWeather(lonLatUrl);
  // console.log(weatherRes);

  // for (let index = 0; index < lonLat.length; index++) {
  //   lonOrLat[index] = lonLat[index]
  //   console.log(lonOrLat[index])
  // }
}
returnWeath();
// console.log(weatherLI);
// for (let index = 0; index < weatherLI.length; index++) {
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
  WeatherWidg.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

  let finalBody = document.createElement("div");
  finalBody.classList.add("card-body");
  WeatherWidg.append(finalBody);

  let titleEl = document.createElement("h3");
  titleEl.textContent = resultObj.title;

  let bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML =
    "<strong>Date:</strong> " + resultObj.date + "<br/>";

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> " + resultObj.subject.join(", ") + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong> " + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }

  let linkButtonEl = document.createElement("a");
  linkButtonEl.textContent = "Read More";
  linkButtonEl.setAttribute("href", resultObj.url);
  linkButtonEl.classList.add("btn", "btn-dark");

  finalBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(WeatherWidg);
}

searchFormEl.addEventListener("submit", returnWeath);
