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
        let data = []
        let $tds = $(this).find("td")
        $.each($tds, function () {
            data.push($(this).text())
        })
        console.log(data)
    })
})