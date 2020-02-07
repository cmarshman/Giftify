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

$(searchBtnEl).click(function () {
    var inputVal = $("#inputInfo").val();
    var giftBtn = document.createElement("button");
    
    giftBtn.innerHTML = inputVal;
    document.getElementById("giftVal").prepend(giftBtn);

    console.log(inputVal);

    var newGift = {
      gift_name: $("#inputInfo").val(),
    };
    getDataFromEtsyApi();

    // Send the POST request.
    $.ajax("/api/gifts", {
      type: "POST",
      data: newGift
    }).then(
      function() {
        console.log("created new gift");
        // Reload the page to get the updated list
        location.reload();
      }
    );

    if (!inputVal) {
        return;
        console.log('input is null')
    }
    else {
        event.preventDefault();
        console.log(inputVal + " has been entered.")
    }
});
