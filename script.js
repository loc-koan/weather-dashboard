$(document).ready(function () {

    var cityName = ""
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=";
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var queryUVI = "https://api.openweathermap.org/data/2.5/uvi?";
    var apiKey = "&appid=228a5030262a91d0915376addc531695";
    var unitImperial = "&units=imperial";
    
    // example = https://api.openweathermap.org/data/2.5/weather?q=houston&appid=228a5030262a91d0915376addc531695&units=imperial
    // example = https://api.openweathermap.org/data/2.5/forecast?q=houston&appid=228a5030262a91d0915376addc531695&appid=228a5030262a91d0915376addc531695
    // example = https://api.openweathermap.org/data/2.5/uvi?appid=228a5030262a91d0915376addc531695&lat=29.76&lon=-95.36
    
    // var fullURL1 = queryURL1 + cityName + apiKey + unitImperial;
    // var fullURL5 = queryURL5 + cityName + apiKey + unitImperial;
    
    //$("#currentCity").empty();
    
    // dates to be inserted
    var currentDate = moment().format("M/DD/YYYY");
    var forecastCard1 = moment().add(1,"days").format("M/DD/YYYY");
    var forecastCard2 = moment().add(2,"days").format("M/DD/YYYY");
    var forecastCard3 = moment().add(3,"days").format("M/DD/YYYY");
    var forecastCard4 = moment().add(4,"days").format("M/DD/YYYY");
    var forecastCard5 = moment().add(5,"days").format("M/DD/YYYY");

    // button 
    $("#cityButton").on("click", function(event) {
        
        event.preventDefault();

        cityName = $("#cityInput").val();
        var PreviousCitySearches = [];
        
        PreviousCitySearches = JSON.parse(localStorage.getItem("PreviousCitySearches")) || [];
        PreviousCitySearches.push(cityName);
        localStorage.setItem("PreviousCitySearches",JSON.stringify(PreviousCitySearches));

        runWeatherApp(cityName);
    });
    
    $("#inputCityPast").on("click", function(event) {
        event.preventDefault();
        var cityName = ($(this).text());
        runWeatherApp (cityName);
    });

    function runWeatherApp (cityName) {

        //clean out previous data in html
        $("#currentCity").empty();
        $("#forecastDay1").empty();
        $("#forecastDay2").empty();
        $("#forecastDay3").empty();
        $("#forecastDay4").empty();
        $("#forecastDay5").empty();

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
            // UV index not found in above API/string, is it from another API?
            
        });

        /* UV section, need to figure how to tie in with above

        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
        var fullUVI = queryUVI + apiKey + "&lat=" + latitude + "&lon=" + longitude;

        if (response.value <= 2) {
            $("#currentUvIndex").css("background-color", "green");
        } else if (response.value <= 5) {
            $("#currentUvIndex").css("background-color", "yellow");
        } else if (response.value <= 7) {
            $("#currentUvIndex").css("background-color", "orange");
        } else if (response.value <= 10) {
            $("#currentUvIndex").css("background-color", "red");
        } else if (response.value <= 11) {
            $("#currentUvIndex").css("background-color", "purple");
        }; */

        // forecast cards
        var fullURL5 = queryURL5 + cityName + apiKey + unitImperial;

        $.ajax({
            url: fullURL5,
            method: "GET"
        }).then(function (response) {
            console.log(fullURL5);

            // another card 1
            // $("#forecastDay1").append(
            //     "<div class='card-body'>" + forecastCard1 + "</div>" + 
            //     "<div class='card-header>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>" + 
            //     "<div class='card-text>" + "Humidity: " + response.daily[1].humidity + " %" + "</div>"
            // );

            // card 1
            $("#forecastDay1").text(forecastCard1);
            $("#forecastDay1").text("Temp: " + response.daily[0].temp.day + " °F");
            $("#forecastDay1").text("Humidity: " + response.daily[0].humidity + " %");
            //card 2
            $("#forecastDay2").text(forecastCard2);
            $("#forecastDay2").text("Temp: " + response.daily[1].temp.day + " °F");
            $("#forecastDay2").text("Humidity: " + response.daily[1].humidity + " %");
            // card 3
            $("#forecastDay3").text(forecastCard3);
            $("#forecastDay3").text("Temp: " + response.daily[2].temp.day + " °F");
            $("#forecastDay3").text("Humidity: " + response.daily[2].humidity + " %");
            // card 4
            $("#forecastDay4").text(forecastCard4);
            $("#forecastDay4").text("Temp: " + response.daily[3].temp.day + " °F");
            $("#forecastDay4").text("Humidity: " + response.daily[3].humidity + " %");
            // card 5
            $("#forecastDay5").text(forecastCard5);
            $("#forecastDay5").text("Temp: " + response.daily[4].temp.day + " °F");
            $("#forecastDay5").text("Humidity: " + response.daily[4].humidity + " %");
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