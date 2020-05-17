$(document).ready(function () {

    var currentDate = moment().format("M/DD/YYYY");

    var queryUrlOne = "api.openweathermap.org/data/2.5/weather?q=";
    var queryUrlFive = "api.openweathermap.org/data/2.5/forecast?q=";
    var apiKey = "&appid=228a5030262a91d0915376addc531695";
    var unitImperial = "&units=imperial";
    // example = http://api.openweathermap.org/data/2.5/weather?q=houston&appid=228a5030262a91d0915376addc531695&units=imperial
    var fullUrlOne = queryUrlOne + apiKey + unitImperial;
    //$("#currentCity").empty();


    // button 
    $("#inputCity").on("click)", function(event) {
        
        event.preventDefault();

        var CityName = $("#inputCity").val();
        var PreviousCitySearches = [];

        PreviousCitySearches = JSON.parse(localStorage.getItem("PreviousCitySearches")) || [];
        PreviousCitySearches.push(CityName);
        localStorage.setItem("PreviousCitySearches",JSON.stringify(PreviousCitySearches));

        runWeatherApp(CityName);
    });


    function runWeatherApp (CityName) {


        $.ajax({
            url: fullUrlOne,
            method: "GET"
        }).then(function (response) {
            console.log(fullUrlOne);
            $("#currentCity").html("<h2>" + response.name + " on " + currentDate "</h2>");
            $("#currentTempeture").text("Tempture: " + response.main.temp " °F");
            $("#currentHumidity").text("Humidity: " + response.main.humidity " %");
            $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed " MPH");
            //$("#currentUvIndex").text("UV Index: " + response);
        });
    }

});