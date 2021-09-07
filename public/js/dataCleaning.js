
let data = []
$(document).ready(() => {

    const dateInput_1 = $('.datepicker');

    dateInput_1.datepicker({
        changeYear: true,
        dateFormat: 'yy-mm-dd',
    });

    $('.load').on('click', function () {
        $('#overlay').fadeIn()
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


    var $table = $('#table')
    var $button = $('#button')
    var $button2 = $('#button2')

    $(function () {
        let isChecked = false
        $table.on('change', $('input[name="btSelectItem"]'), function () {
            isChecked = true;
        })
        $button.click(function () {
            if (isChecked === false) {
                alert('Please select a meter')
            } else if (data.length > 0) {
                alert('Please select only one meter')
            }
            else {
                data.push($table.bootstrapTable('getSelections'))
                $('.disabled').attr('disabled', false)
                $('.meterSelection').html(data[0][0].meter)
            }
        })
        $button2.click(function () {
            $table.bootstrapTable('uncheckAll')
            data = []
            $('.meterSelection').html('--')
            $('.disabled').attr('disabled', true)
            isChecked = false
        })

    })

    $(".apiGateway").on("click", function (e) {
        e.preventDefault();
        modelApi()

    })

    const modelApi = function () {
        const modelStart = $('.modelStart').val()
        const modelEnd = $('.modelEnd').val()
        const analysisStart = $('.analysisStart').val()
        const analysisEnd = $('.analysisEnd').val()

        $.ajax({
            url: `https://c074vo0soh.execute-api.us-east-1.amazonaws.com/beta/model?building_number=${data[0][0].building_number}&commodity_tag=${data[0][0].commodity_tag}&meter=${data[0][0].meter}&train_start=${modelStart}&train_end=${modelEnd}&analysis_start=${analysisStart}&analysis_end=${analysisEnd}`,
            method: 'GET',
            error: function (xhr) {
                if (xhr.status === 504) {
                    modelApi()
                    $('.overlayMessage').text('Server not responding, trying your search again. Please do not refresh the page')
                }
                if (xhr.status === 502) {
                    alert('No data was returned for your current search criteria. ')
                    $('#overlay').fadeOut()
                }
            }
        }).then(response => {
            const obj = JSON.parse(response.body)
            console.log(obj)
            $('#overlay').fadeOut()
            const autoIgnored = parseFloat(obj.model.auto_ignored_percentage).toFixed(0);
            const slope = parseFloat(obj.model.slope).toFixed(2);
            const intercept = parseFloat(obj.model.intercept).toFixed(2)
            const r2 = parseFloat(obj.model.max_train_r2).toFixed(2)
            const stdDev = parseFloat(obj.model.std.train).toFixed(2)
            const meterVariable = obj.model.x.toUpperCase()
            $('.baseTemp').html(obj.model.base_temperature)
            $('.autoIgnored').html(autoIgnored + '%')
            $('.slope').html(slope)
            $('.intercept').html(intercept)
            $('.r2').html(r2)
            $('.stdDev').html(stdDev)
            $('.modelData').show()
            $('.meterVariable').html(`Variable: ${meterVariable}`)
            $('.tableData').removeAttr('style')
            data = []

            let ctx = document.getElementById('myChart').getContext('2d');
            let myChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Scatter Dataset',
                        data: [{
                            x: 35.0,
                            y: 0
                        }, {
                            x: 45.0,
                            y: 2000
                        }, {
                            x: 55.0,
                            y: 4000
                        }, {
                            x: 65.0,
                            y: 6000
                        }, {
                            x: 75.0,
                            y: 8000
                        },
                        {
                            x: 85.0,
                            y: 10000
                        }, {
                            x: 95.0,
                            y: 12000
                        }, {
                            y: 14000
                        }, {
                            y: 16000
                        },
                        ],
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
        })
    }

})

