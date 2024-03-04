$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5001/api/v1/status/",
        dataType: 'json', // Type of data expected back from the server
        success: function (data) {
            if (data.status === 'OK') {
                $('div#api_status').addClass('available')
                console.log("class added")
            }
            else {
                $('div#api_status').removeClass('available')
                console.log("classe removed")
            }
        }
    })
})