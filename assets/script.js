$('document').ready(function () {
    $('button').click(function () {
        var id = $(this).attr('id')
        $.ajax({
            url: "http://localhost:8080/rate",
            data: { id: id, province: $('title').text() },
            success: function (data) {
                // $("#ratet").replaceWith(data) 
                $('#rate').text(data)
            },
            error: function (e) {

            }
        })
    })
});