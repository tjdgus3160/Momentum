const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = setFormat(date.getMinutes());
    const hours = setFormat(date.getHours());
    const seconds = setFormat(date.getSeconds());
    clockTitle.innerHTML=`${hours}:${minutes}:${seconds}`;
}

function setFormat(num){
    return num<10?`0${num}`:num;
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();