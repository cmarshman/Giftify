var searchBtnEl = $("#gift_search");

$('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});

$(searchBtnEl).click(function(response) {
    var inputVal = $("#inputInfo").val();
    console.log(!inputVal);

    if (!inputVal){
        return;
        console.log('input is null')
    }
    else {
        event.preventDefault();
        console.log(inputVal)
    }
})