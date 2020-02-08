const productArray = {
    product1: {
        name: "Apple AirPods Pro",
        youtube: "https://www.youtube.com/embed/IC9urbiVp4M",
        price: "$ 245.00",
        productURL: "https://www.apple.com/shop/product/MWP22AM/A/airpods-pro",
    },
    product2: {
        name: "Instant Pot Pressure Cooker",
        youtube: "https://www.youtube.com/embed/MB0GAPpTnbc",
        price: "$ 99.99",
        productURL: "https://store.instantpot.com/products/duo-nova-7-in-1-6-quart",
    },
    product3: {
        name: "Eufy Robovac 11",
        youtube: "https://www.youtube.com/embed/5I6eFsa8eOk",
        price: "$ 239.99",
        productURL: "https://www.eufylife.com/uk/products/variant/robovac-11s/T2108211",
    },
    product4: {
        name: "Away Suitcase",
        youtube: "https://www.youtube.com/embed/wnjARlLHJTM",
        price: "$ 295.99",
        productURL: "https://www.awaytravel.com/suitcases/large/green",
    },
    product5: {
        name: "Gravity Blanket",
        youtube: "https://www.youtube.com/embed/jZQ_efOqarU",
        price: "$ 60.89",
        productURL: "https://gravityblankets.com/products/gravity-blanket?variant=44868533007",
    },
    product6: {
        name: "Kindle Paperwhite",
        youtube: "https://www.youtube.com/embed/ZjYcXLY7B9I",
        price: "$ 94.99",
        productURL: "https://www.amazon.com/All-new-Kindle-Paperwhite-Waterproof-Storage/dp/B07CXG6C9W",
    },
    product7: {
        name: "Staub 5.5 Cocotte",
        youtube: "https://www.youtube.com/embed/ndnyAWAJYW8",
        price: "$ 279.99",
        productURL: "https://www.zwilling.com/us/staub-cast-iron-5.5-qt-round-cocotte---basil-1102685/40509-358-0.html?cgid=our-brands_staub_cast-iron_coccottes-dutch-ovens#start=1",
    },
    product8: {
        name: "Fitbit Charge 3",
        youtube: "https://www.youtube.com/embed/omJhc4iv4z4",
        price: "$ 99.99",
        productURL: "https://www.fitbit.com/us/products/trackers/charge3?utm_source=&utm_medium=paidsearch&gclid=EAIaIQobChMIm_2wmajB5wIVD5SzCh3bZgUnEAAYASAAEgKXGPD_BwE&gclsrc=aw.ds",
    },
    product9: {
        name: "Sonos One",
        youtube: "https://www.youtube.com/embed/_YnPnv4XNw4",
        price: "$ 199.99",
        productURL: "https://www.sonos.com/en-us/shop/one.html",
    },
    product10: {
        name: "Ancestry DNA",
        youtube: "https://www.youtube.com/embed/kxGT0LJVPSw",
        price: "$ 99.99",
        productURL: "https://www.ancestry.com/cs/offers/traits",
    },
    product11: {
        name: "Echo Show",
        youtube: "https://www.youtube.com/embed/MiSCq3vGg1s",
        price: "$ 89.99",
        productURL: "https://www.amazon.com/Echo-Show-8/dp/B07PF1Y28C",
    },
    product12: {
        name: "InnoGear",
        youtube: "https://www.youtube.com/embed/DtBfY8kpaBI",
        price: "$ 18.99",
        productURL: "https://www.innogear.com/collections/diffusers/products/innogear-3rd-version-150ml-essential-oil-diffuser-with-sleep-mode-whisper-quiet-aromatherapy-diffusers-vaporizer-waterless-auto-shut-off-for-home-office-room",
    },
    product13: {
        name: "Philips AirFryer",
        youtube: "https://www.youtube.com/embed/RL-S6EnH2X0",
        price: "$ 199.99",
        productURL: "https://www.usa.philips.com/c-m-ho/cooking/airfryer-xxl",
    }
}

const modal = $("#productDisplay");

$(".product").on("click", function(){
    const product = $(this).attr("data-product");
    $("#displayName").text(productArray[product].name);
    $(".video").attr("src", productArray[product].youtube);
    $("#price").text(productArray[product].price);
    $("#displayURL").attr("href", productArray[product].productURL).text("Purchase Here")
    modal.addClass('is-active');

})

$(".close-modal").on("click", function () {
    modal.removeClass("is-active");
});