$(document).ready(function () {

    var currentDate = moment().format("M/DD/YYYY");

    var queryUrlOne = "api.openweathermap.org/data/2.5/weather?q=";
    var queryUrlFive = "api.openweathermap.org/data/2.5/forecast?q=";
    var apiKey = "&appid=228a5030262a91d0915376addc531695";
    var unitImperial = "&units=imperial";
    // example = http://api.openweathermap.org/data/2.5/weather?q=houston&appid=228a5030262a91d0915376addc531695&units=imperial
    var fullUrlOne = queryUrlOne + apiKey + unitImperial;
    //$("#currentCity").empty();

    $.ajax({
        url: fullUrlOne,
        method: "GET"
    }).then(function (response) {
        console.log(fullUrlOne);
        $("#currentCity").html("<h2>" + response.name + " on " + currentDate "</h2>");
        $("#currentTempeture").text("Tempture: " + response.main.temp);
        $("#currentHumidity").text("Humidity: " + response.main.humidity);
        $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed);
        //$("#currentUvIndex").text("UV Index: " + response.temp);
    });
});