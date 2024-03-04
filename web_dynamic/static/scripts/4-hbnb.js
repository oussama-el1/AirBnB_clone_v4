$(document).ready(function () {
    /* catch the list of aminetys */
    let selectedAmenities = {};
    let NameArray = [];
    let IdArray = [];

    $('.amenity-checkbox').change(function () {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }
        NameArray = [];
        IdArray = [];
        $.each(selectedAmenities, function (key, value) {
            NameArray.push(value);
            IdArray.push(key)
        });
        $('#listamenity').text(NameArray.join(', '));
    });
    $('#SearchButton').click(function () {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5001/api/v1/status/",
            dataType: 'json', // Type of data expected back from the server
            success: function (data) {
                if (data.status === 'OK') {
                    $('div#api_status').addClass('available')
                    console.log("class added")
                    console.log(IdArray)
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1:5001/api/v1/places_search",
                        data: JSON.stringify({ "amenities": IdArray }),
                        contentType: "application/json",
                        success: function (data_place) {
                            console.log(data_place.length)
                            // Move the $.each() loop inside the success callback
                            $.each(data_place, function (i, place) {
                                $('section.places').append('<article>' +
                                    '<div class="title_box">' +
                                    '<h2>' + place.name + '</h2>' +
                                    '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                                    '</div>' +
                                    '<div class="information">' +
                                    '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                                    '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                                    '</div>' +
                                    '<div class="description">' +
                                    place.description +
                                    '</div>' +
                                    '</article>');
                            });
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        }
                    });
                }
                else {
                    $('div#api_status').removeClass('available')
                    console.log("classe removed")
                }
            }
        })
    })
});
