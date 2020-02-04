//AJAX call for Esty API
function getDataFromEtsyApi(searchTerm, callback) {
    var ETSY_BASE_URL = 'https://openapi.etsy.com/v2/listings/active.js';
    var ETSY_KEY = 'sg1y7p6kuosq2seimizzx5ml';
    var settings = {
        url: ETSY_BASE_URL,
        dataType: 'jsonp',
        data: {
            keywords: searchTerm,
            api_key: ETSY_KEY,
            includes: 'Images',
        },
        success: callback,
    };
    $.ajax(settings);
};
//Show Esty results
function displayEtsySearchData(data) {
    for (var i = 0; i < data.length; i++) {
        // item = data.results[i];
        $('.subtitle').append(data.results[i].title)
        $('')
    }
    console.log(data.results[1]);
    console.log(data.results[1].price);
};


