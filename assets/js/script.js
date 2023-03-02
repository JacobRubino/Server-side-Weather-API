let weatherTURL = "";
let weatherLI = document.getElementById("result-content").children;
let searchFormEl = document.querySelector("#search-form");
let WAppId = "8aa8cd47805d9d880b2338a0944a512d";
let FiveDUrl;
let daysWeath;
let lonOrLat;

function fetchWeather(search) {
  return fetch(search)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}


function getWeath(cityName) {
  let geotoLatId = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${WAppId}`;
  return fetchWeather(geotoLatId)
    .then((geoData)=>{

      let lon = geoData[0].lon;
      let lat = geoData[0].lat;
      console.log(lon)
      console.log(lat)
      let FiveDUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WAppId}&units=imperial`
      console.log(FiveDUrl)
      return fetchWeather(FiveDUrl)
        .then((weatherData) => {
          console.log(weatherData.list[8].main.temp)
          getWeath(weatherData.list)
          return 'weatherdata.temp'
      })
  })
}


getWeath('detroit')
function returnWeath(weathData) {
for (let index = 0; index < weathData.length; index += 8) {
  const element = weatherData[index];
  console.log(element)
  }


  
  // let weatherRes = fetchWeather(lonLatUrl, () => {})
  // let temp = weatherRes[1].temp
  // console.log(temp);

  // for (let index = 0; index < lonLat.length; index++) {
  //   lonOrLat[index] = lonLat[index]
  //   console.log(lonOrLat[index])
  // }
}
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

// searchFormEl.addEventListener("submit", returnWeath);
