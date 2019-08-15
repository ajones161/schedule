window.onload = function () {
  getWeather();
}

function getWeather() {
  let key = '40761d56adc2e36a1b97bc999252c84f';
  let cityID = '6138517';
  fetch('http://api.openweathermap.org/data/2.5/weather?id=' +
    cityID + '&appid=' + key + '&units=metric').then(result => {
    return result.json();
  }).then(result => {
    grabCast(result);
  })

}

function grabCast(resultFromServ) {
  let widge = document.getElementById("weatherWidge");
  let temp = document.querySelector(".temp");
  let cast = document.querySelector(".fullcast");
  switch (resultFromServ.weather[0].main) {
    case 'Clear':
      widge.classList.add('clear');
      break;
    case 'Clouds':
      widge.classList.add('clouds');
      break;
    case 'Rain':
    case 'Drizzle':
      widge.classList.add('rain');
      break;
    case 'Thunderstorm':
      widge.classList.add('lightning');
      break;
    case 'Mist':
    case 'Fog':
      widge.classList.add('fog');
      break;
    case 'Snow':
      widge.classList.add('snow');
      break;
    default:
      break;
  }
  temp.innerHTML = Math.round(resultFromServ.main.temp) + '&deg;C';
  cast.innerHTML = '<li> Condition: ' + titleCase(resultFromServ.weather[0].description) + '</li>';
  cast.innerHTML += '<li>Max Temp: ' + Math.round(resultFromServ.main.temp_max) + 
  '&deg;C || Min Temp: ' + Math.round(resultFromServ.main.temp_min) + '&deg;C </li>';
  cast.innerHTML += '<li> Sunrise: ' + getSun(resultFromServ.sys.sunrise) + 
  'AM || Sunset: ' + getSun(resultFromServ.sys.sunset) + 'PM</li>'
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

function getSun(ts) {
  let date = new Date(ts * 1000);

  var hours = date.getHours();
  var minutes = date.getMinutes();

  if (hours >= 12)
  {
    hours = hours - 12;
  }
  return hours + ':' + minutes;
}