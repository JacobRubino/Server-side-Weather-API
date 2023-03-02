let weatherTURL = "";
let weatherLI = document.getElementById("result-content").children;
let searchFormEl = document.querySelector("#search-form");
let WAppId =  '8aa8cd47805d9d880b2338a0944a512d';
// let FiveDayURL = `api.openweathermap.org/data/2.5/forecast?appid=${WAppId}&lat=${lat}&lon=${lon}`;
let FiveDArr = []
let daysWeath

// function getFURL() {

// }

function fetchWeather(search) {
  return fetch(search)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}
function resultFunc(resultObj){
  resultObj.forEach(element => {
    console.log(element)
    console.log(element.lon , element.lat)
    return element.lon , element.lat
  });

}

async function getLonLat(cityName) {
  let geotoLatId = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${WAppId}`
  console.log(geotoLatId)
  let result = await fetchWeather(geotoLatId, () => {
  
  });
  resultFunc(result)
}
getLonLat('New haven')

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
  let WeatherWidg = document.createElement('div');
  WeatherWidg.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  let finalBody = document.createElement('div');
  finalBody.classList.add('card-body');
  WeatherWidg.append(finalBody);

  let titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  let bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  let linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  finalBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(WeatherWidg);
}
function returnWeath(){
  let 
  for (let index = 0; index < FiveDArr.length; index += 8) {
    daysWeath = FiveDArr[index]
    printResults(daysWeath.ITEMHERE)
    
  }
}

searchFormEl.addEventListener("submit", returnWeath);
