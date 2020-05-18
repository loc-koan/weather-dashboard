$(document).ready(function () {

    var cityName = ""
    var queryURL1 = "api.openweathermap.org/data/2.5/weather?q=";
    var queryURL5 = "api.openweathermap.org/data/2.5/forecast?q=";
    var apiKey = "&appid=228a5030262a91d0915376addc531695";
    var unitImperial = "&units=imperial";
    // example = http://api.openweathermap.org/data/2.5/weather?q=houston&appid=228a5030262a91d0915376addc531695&units=imperial
    var fullURL1 = queryURL1 + cityName + apiKey + unitImperial;
    var fullURL5 = queryURL5 + cityName + apiKey + unitImperial;
    //$("#currentCity").empty();
    
    // dates to be inserted
    var currentDate = moment().format("M/DD/YYYY");
    var forecastCard1 = moment().add(1,"days").format("M/DD/YYYY")
    var forecastCard2 = moment().add(1,"days").format("M/DD/YYYY")
    var forecastCard3 = moment().add(1,"days").format("M/DD/YYYY")
    var forecastCard4 = moment().add(1,"days").format("M/DD/YYYY")
    var forecastCard5 = moment().add(1,"days").format("M/DD/YYYY")

    // button 
    $("#cityButton").on("click", function(event) {
        
        event.preventDefault();

        var cityName = $("#cityInput").val();
        var PreviousCitySearches = [];
        
        PreviousCitySearches = JSON.parse(localStorage.getItem("PreviousCitySearches")) || [];
        PreviousCitySearches.push(cityName);
        localStorage.setItem("PreviousCitySearches",JSON.stringify(PreviousCitySearches));

        runWeatherApp(cityName);
    });
    
    // $("#inputCityPast").on("click", function(event) {
    //     event.preventDefault();
    //     var cityName = ($(this).text());
    //     runWeatherApp (cityName);
    // });

    function runWeatherApp (cityName) {

        //clean out previous data in html
        $("#currentCity").empty();
        $("#forcastDay1").empty();
        $("#forcastDay2").empty();
        $("#forcastDay3").empty();
        $("#forcastDay4").empty();
        $("#forcastDay5").empty();

        var fullURL1 = queryURL1 + cityName + apiKey + unitImperial;

        $.ajax({
            url: fullURL1,
            method: "GET"
        }).then(function (response) {
            console.log(fullURL1);
            $("#currentCity").html("<h2>" + response.name + " on " + currentDate + "</h2>");
            $("#currentTempeture").text("Temperature: " + response.main.temp + " °F");
            $("#currentHumidity").text("Humidity: " + response.main.humidity + " %");
            $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
            //$("#currentUvIndex").text("UV Index: " + response);
        });

        // forecast cards
        var fullURL5 = queryURL5 + cityName + apiKey + unitImperial;

        $.ajax({
            url: fullURL5,
            method: "GET"
        }).then(function (response) {
            console.log(fullURL5);
            // card 1
            $("#forecastDay1").text(forecastCard1);
            $("#forecastDay1").text("Temp: " + response.daily[0].temp.day + " °F");
            $("#forecastDay1").text("Humidity: " + response.daily[0].humidity + " %");
            // card 2
            $("#forecastDay1").text(forecastCard2);
            $("#forecastDay1").text("Temp: " + response.daily[1].temp.day + " °F");
            $("#forecastDay1").text("Humidity: " + response.daily[1].humidity + " %");
            // card 3
            $("#forecastDay1").text(forecastCard3);
            $("#forecastDay1").text("Temp: " + response.daily[2].temp.day + " °F");
            $("#forecastDay1").text("Humidity: " + response.daily[2].humidity + " %");
            // card 4
            $("#forecastDay1").text(forecastCard4);
            $("#forecastDay1").text("Temp: " + response.daily[3].temp.day + " °F");
            $("#forecastDay1").text("Humidity: " + response.daily[3].humidity + " %");
            // card 5
            $("#forecastDay1").text(forecastCard5);
            $("#forecastDay1").text("Temp: " + response.daily[4].temp.day + " °F");
            $("#forecastDay1").text("Humidity: " + response.daily[4].humidity + " %");

        });
    };

    // inputCityPast section
    function CityPast() {
        $("#inputCityPast").empty();
        var sittingInStorage = JSON.parse(localStorage.getItem("PreviousCitySearches")) || [];
        var arrayLength = sittingInStorage.length;

        for (var i = 0; i < arrayLength; i++) {
            var cityFromArray = sittingInStorage[i];
            $("#inputCityPast").append(cityFromArray);
        }
    }

    console.log(cityInput);
    console.log(cityName);
    console.log(fullURL1);
    console.log(fullURL5);

});