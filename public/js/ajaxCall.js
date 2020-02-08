//AJAX call for Esty API
const searchBtn = document.querySelector('#gift_search')


function getDataFromEtsyApi(searchTerm, callback) {
    console.log('>> in getdata'); // TODO: Remove
    var ETSY_BASE_URL = 'https://openapi.etsy.com/v2/listings/active.js?limit=8';
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

    //  $('.subtitle').append(data.results[i].title)

    // }
    // console.log(data.results[i]);
    // console.log(data.results[i].price);
    // console.log(data.results[i].title);
    // console.log(data.results[1].url);
    // console.log(data.results[1].price);
    
    //displaying title as a link, opens in another tab
    // var titleDisplay = $("<a>").text(data.results[i].title).attr("href", data.results[i].url).attr("target", "blank");
    // $("#showResults").prepend(titleDisplay);

    var titleDisplay = $("<div>").append($("<a>").attr("href", data.results[i].url).text(data.results[i].title).css("display", "flex").css("align-items", "center").css("word-wrap", "break-word").attr("target", "_blank"));

    var pictureDisplay = $("<div>").append($("<img>").attr("src", data.results[i].Images[0].url_fullxfull).attr("id", "pictures").css("clear", "both").css("margin-bottom", "10px").css("margin-right", "10px"));

    var priceDisplay = $("<h3>").text("$" + data.results[i].price).css("text-align", "center");

    var newDiv = $("<div>").attr("class", "tile is-child box notification is-light" + i).css("padding", "10px").css("width", "300px").css("margin", "0px 5px");

    $("#showResults").prepend(newDiv);
    $(newDiv).append(pictureDisplay, priceDisplay, titleDisplay);

    if (i >= 4) {
        $("#showResults1").prepend(newDiv);
        $(newDiv).append(pictureDisplay, priceDisplay, titleDisplay);
    }
    else {

        $("#showResults2").prepend(newDiv);
        $(newDiv).append(pictureDisplay, priceDisplay, titleDisplay);
    }



    console.log(data);

}};


if (searchBtn) {

    searchBtn.addEventListener("click", function (event) {

        event.preventDefault();
        searchTerm = document.getElementById('inputInfo').value;
        console.log(searchTerm);
        getDataFromEtsyApi(searchTerm, displayEtsySearchData);
        $("#showResults1").empty();
        $("#showResults2").empty();

    })
};