//AJAX call for Esty API


const searchBtn = document.querySelector('#gift_search')



function getDataFromEtsyApi(searchTerm, callback) {
    var ETSY_BASE_URL = 'https://openapi.etsy.com/v2/listings/active.js?limit=5';
    var ETSY_KEY = 'sg1y7p6kuosq2seimizzx5ml';

    var settings = {
        url: ETSY_BASE_URL,
        dataType: 'jsonp',
        crossDomain: true,
        data: {
            keywords: searchTerm,
            api_key: ETSY_KEY,
            includes: 'Images',
        },
        success: callback
    }

    $.ajax(settings);
};  
//Show Esty results and loop through response object
function displayEtsySearchData(data) {
    for (var i = 0; i < data.results.length; i++) {

    //displaying title as link
    var titleDisplay = $("<div>").append($("<a>").attr("href", data.results[i].url).text(data.results[i].title).css("display", "flex").css("align-items", "center").css("word-wrap", "break-word").attr("target", "_blank"));

    //displaying picture to item
    var pictureDisplay = $("<div>").append($("<img>").attr("src", data.results[i].Images[0].url_fullxfull).attr("id", "pictures").css("clear", "both").css("margin-bottom", "10px").css("margin-right", "10px"));

    //creating h3, displaying price
    var priceDisplay = $("<h3>").text("$" + data.results[i].price).css("text-align", "center");

    //creating new div to insert into show results div
    var newDiv = $("<div>").attr("class", "tile is-child box notification is-light" + i).css("padding", "10px").css("width", "300px").css("margin", "0px 5px");

    $("#showResults").prepend(newDiv);
    $(newDiv).append(pictureDisplay, priceDisplay, titleDisplay);

        console.log(data);

}};


    if (searchBtn) {

        searchBtn.addEventListener("click", function (event) {

            event.preventDefault();
            searchTerm = document.getElementById('inputInfo').value;
            console.log(searchTerm);
            getDataFromEtsyApi(searchTerm, displayEtsySearchData);
            // $("#showResults").empty();

        })
    }
