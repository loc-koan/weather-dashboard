$(document).ready(function () {

    var queryUrlOne = "api.openweathermap.org/data/2.5/weather?q=";
    var queryUrlFive = "api.openweathermap.org/data/2.5/forecast?q=";
    var apiKey = "&appid=228a5030262a91d0915376addc531695";
    var unitImerial = "&units=imperial";
    // example = http://api.openweathermap.org/data/2.5/weather?q=houston&appid=228a5030262a91d0915376addc531695&units=imperial

    //$("#currentCity").empty();

    $.ajax({
        url: queryUrlOne,
        method: "GET",
    })
});