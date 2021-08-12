$(document).ready(() => {

    // $('.search').on('click', function (e) {
    //     e.preventDefault();
    //     console.log($(".building").val())
    //     $.ajax({
    //         url: '/getathena',
    //         method: 'POST',
    //         data: {
    //             building_abbreviation: $('.building').val()
    //         }
    //     }).then(response => {
    //         console.log(response);
    //     })
    // })

    $(".data").on("click", function () {
        let $tds = $(this).find("td")
        $.each($tds, function () {
            console.log($(this).text())
        })
    })
})