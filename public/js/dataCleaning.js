$(document).ready(() => {

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: [{
                    x: -10,
                    y: 0
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }, {
                    x: 0.5,
                    y: 5.5
                }],
                backgroundColor: 'rgb(255, 99, 132)'
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let ctx2 = document.getElementById('myChart2').getContext('2d');
    let myChart2 = new Chart(ctx2, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: [{
                    x: -10,
                    y: 0
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }, {
                    x: 0.5,
                    y: 5.5
                }],
                backgroundColor: 'rgb(255, 99, 132)'
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    $('.search').on('click', function (e) {
        e.preventDefault();
        $(".rowData").find('td').remove();
        $.ajax({
            url: '/athenaData',
            method: 'POST',
            data: {
                building_abbreviation: $('.buildings').val(),
                commodity_tag: $(".commodity").val()
            }
        }).then(response => {
            $(function () {
                $.each(response.Items, function (i, item) {
                    $('<tr class="rowData">').append(
                        $('<td>').text(item.building_abbreviation),
                        $('<td class="text-end meter">').text(item.meter),
                        $('<td class="text-end buildingNum">').text(item.building_number),
                        $('<td class="text-end commTag">').text(item.commodity_tag)
                    ).appendTo($('#bodyData'));
                });

                $(".rowData").on("click", function () {
                    let data = []
                    let $tds = $(this).find("td")
                    $.each($tds, function () {
                        data.push($(this).text())
                    })
                    $(".apiGateway").on("click", function () {
                        $.ajax({
                            url: `https://mvx8fq0n9l.execute-api.us-east-1.amazonaws.com/model?building_number=${data[2]}&commodity_tag=${data[3]}&meter=${data[1]}&train_start=2020-01-01&train_end=2020-12-31&analysis_start=2021-01-01&analysis_end=2021-01-31`,
                            method: 'GET'
                        }).then( response => {
                            console.log(response)
                        })
                    })
                })

            });

        })
    })



    $(".searchBuildings").on("click", function (e) {
        e.preventDefault();
        // let errors = []
        // isInvalid = ['hello', 'goodbye']
        $('#options').find('option').remove()
        let data = {
            steward: $('.steward').val()
        }
        // if ($(".steward").val().includes('hello')) {
        //     errors.push({ text: 'Invalid Entry' })
        // }
        // if (errors.length > 0) {
        //     for (var item in errors) {
        //         $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
        //     };
        // } else {
        $.ajax({
            url: '/building',
            method: 'POST',
            data: data
        }).then(response => {
            $("#options").append(
                response.map(function (data) {
                    return $('<option/>', {
                        value: data.building,
                        text: data.building
                    })
                })
            )
        })
        // }
    })



})

