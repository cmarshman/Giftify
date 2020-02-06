//AJAX call for Esty API
const searchBtn = document.querySelector('#gift_search')


function getDataFromEtsyApi(searchTerm, callback) {
    var ETSY_BASE_URL = 'https://openapi.etsy.com/v2/listings/active.js?limit=10';
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

    var pictureDisplay = $("<div>").append($("<img>").attr("src", data.results[i].Images[0].url_fullxfull).attr("id", "pictures").css("width", "96px").css("clear", "both").css("margin-bottom", "10px").css("display", "inline-block").css("margin-right", "10px").css("@media screen and (max-width: 600px)", "{body {background-color: olive;}}"));

    var newDiv = $("<div>").attr("id", "resultBlock" + i).css("display", "flex").css("padding", "1px");

    $("#showResults").append(newDiv);
    $(newDiv).append(pictureDisplay, titleDisplay);

    // var imageDisplay = $("<div>").append($("<img>").attr("scr", data.results[1].Images[1].url_75x75).attr("id", "pictures").css("width", "96px"));
    // console.log(imageDisplay);

    // var newDiv = $("<div>");

    // $(newDiv).append(imageDisplay);
    // var picture = $("<img>").attr("src", data.results[i].Images[0].url_fullxfull);

    // $("pictures").append(picture);
    
    

    
    // document.getElementById('showResults').text(data.results[1].title);

    // titleDisplay = document.getElementById('inputInfo').value;
    // console.log(titleDisplay);



    console.log(data);

}};


if (searchBtn) {

    searchBtn.addEventListener("click", function (event) {

        event.preventDefault();
        searchTerm = document.getElementById('inputInfo').value;
        console.log(searchTerm);
        getDataFromEtsyApi(searchTerm, displayEtsySearchData)

    })
};