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

    $(".searchBuildings").on("click", function (e) {
        e.preventDefault();
        $('#options').find('option').remove()
        let data = {
            steward: $('.steward').val()
        }
        $.ajax({
            url: '/building',
            method: 'POST',
            data: data
        }).then(response => {
            console.log(response)
            $("#options").append(
                response.map(function (data) {
                    return $('<option/>', {
                        value: data.building,
                        text: data.building
                    })
                })
            )
        })
    })


    $(".data").on("click", function () {
        let data = []
        let $tds = $(this).find("td")
        $.each($tds, function () {
            data.push($(this).text())
        })
        console.log(data)
    })
})