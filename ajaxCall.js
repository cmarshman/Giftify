//AJAX call for Esty API


const searchBtn = document.querySelector('#gift_search')



function getDataFromEtsyApi(searchTerm, callback) {
    
    var ETSY_BASE_URL = 'https://openapi.etsy.com/v2/listings/active.js';
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
//Show Esty results
function displayEtsySearchData(data) {
    // for (var i = 0; i < 10; i++) {

        //  $('.subtitle').append(data.results[i].title)

        // }
        // // console.log(data.results[i]);
        // // console.log(data.results[i].price);


        console.log(data);

    // };


    if (searchBtn) {

        searchBtn.addEventListener("click", function (event) {

            event.preventDefault();
            searchTerm = document.getElementById('inputInfo').value;
            console.log(searchTerm);
            getDataFromEtsyApi(searchTerm, displayEtsySearchData);

        })
    }
}