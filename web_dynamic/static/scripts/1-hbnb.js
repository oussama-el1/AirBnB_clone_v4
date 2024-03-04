$(document).ready(function () {
    var selectedAmenities = {};

    $('.amenity-checkbox').change(function () {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        let valuesArray = [];
        $.each(selectedAmenities, function (key, value) {
            valuesArray.push(value);
        });

        console.log(valuesArray);
        $('#listamenity').text(valuesArray.join(', '));
    });
});
