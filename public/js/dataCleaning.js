
let data = []
$(document).ready(() => {

    const dateInput_1 = $('.datepicker');

    dateInput_1.datepicker({
        changeYear: true,
        dateFormat: 'yy-mm-dd',
    });

    $('.modelStart').on('change', function () {
        let date2 = $(this).datepicker('getDate')
        date2.setDate(date2.getDate() + 364)
        $('.modelEnd').datepicker('setDate', date2)
        let date3 = new Date()
        date3.setDate(1);
        date3.setMonth(date3.getMonth() - 1);
        $('.analysisStart').datepicker('setDate', date3)
        let date4 = new Date()
        date4.setDate(0)
        date4.setMonth(date4.getMonth())
        $('.analysisEnd').datepicker('setDate', date4)
    })

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

    var $table = $('#table')
    var $button = $('#button')

    $(function () {
        $button.click(function () {
            data.push($table.bootstrapTable('getSelections'))
            console.log(data[0][0])
            $('.disabled').attr('disabled', false)
        })
    })

    $(".apiGateway").on("click", function (e) {

        e.preventDefault();
        const modelStart = $('.modelStart').val()
        const modelEnd = $('.modelEnd').val()
        const analysisStart = $('.analysisStart').val()
        const analysisEnd = $('.analysisEnd').val()
        console.log(modelStart)
        if (!modelStart) {
            $('.modelStart').css('border', '1.5px solid red').text('Please enter a date for Model Start')
        } else {
            $.ajax({
                url: `https://mvx8fq0n9l.execute-api.us-east-1.amazonaws.com/model?building_number=${data[0][0].building_number}&commodity_tag=${data[0][0].commodity_tag}&meter=${data[0][0].meter}&train_start=${modelStart}&train_end=${modelEnd}&analysis_start=${analysisStart}&analysis_end=${analysisEnd}`,
                method: 'GET',
                error: function (xhr) {
                    if (xhr.status === 503) {

                        $.ajax(this)
                    }
                }
            }).then(response => {
                const autoIgnored = parseFloat(response.model.auto_ignored_percentage).toFixed(0);
                const slope = parseFloat(response.model.slope).toFixed(2);
                const intercept = parseFloat(response.model.intercept).toFixed(2)
                const r2 = parseFloat(response.model.max_train_r2).toFixed(2)
                const stdDev = parseFloat(response.model.std.train).toFixed(2)
                const meterVariable = response.model.x.toUpperCase()
                console.log(response)
                $('.baseTemp').html(response.model.base_temperature)
                $('.autoIgnored').html(autoIgnored + '%')
                $('.slope').html(slope)
                $('.intercept').html(intercept)
                $('.r2').html(r2)
                $('.stdDev').html(stdDev)
                $('.modelData').show()
                $('.meterVariable').html(`Variable: ${meterVariable}`)
                data = []
            })
        }

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

