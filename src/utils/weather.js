const weather = document.querySelector(".js-weather");

const COORDS = 'coords';

function getWeather(lat,lng){
    fetch('./apikey.json')
        .then(function(res){
            return res.json();
        })
        .then(function(json){
            return `${json.api_key}`;
        })
        .then(function(key){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`)
            .then(function(res){
                return res.json();
            })
            .then(function(json){
                const tmperature = json.main.temp;
                const place = json.name;
                weather.innerHTML = `${tmperature}&#8451; @ ${place}`;
            });
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj ={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords===null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();