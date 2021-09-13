
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
    var $table2 = $('#table2')
    var $button = $('#button')
    var $button2 = $('#button2')

    $(function () {
        let isChecked = false
        $table.on('change', $('input[name="btSelectItem"]'), function () {
            isChecked = true;
            data = []
        })
        $button.click(function () {
            if (isChecked === false) {
                alert('Please select a meter')
            } else if (data.length > 0) {
                alert('Only one meter can be selected at a time. Please hit the "Clear Selection" button to clear your current meter selection')
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
                    $('#overlay').fadeOut()
                    alert('No data was returned for your current search criteria. Please try selecting a different meter or date range')
                }
            }
        }).then(response => {
            const obj = JSON.parse(response.body)
            console.log(obj)
            $('.overlayMessage').text('Getting data, this will take a few seconds')
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
            $('.meterVariable').html(`Variable: ${meterVariable}`)
            $('.tableData').show()
            const config = {
                data: {
                    datasets: [{
                        type: "scatter",
                        label: "Meter VS. Temp",
                        data: [{
                            x: obj.model.data.average_dry_bulb_temperature[365],
                            y: obj.model.data.raw_value[365]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[366],
                            y: obj.model.data.raw_value[366]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[367],
                            y: obj.model.data.raw_value[367]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[368],
                            y: obj.model.data.raw_value[368]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[369],
                            y: obj.model.data.raw_value[369]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[370],
                            y: obj.model.data.raw_value[370]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[371],
                            y: obj.model.data.raw_value[371]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[372],
                            y: obj.model.data.raw_value[372]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[373],
                            y: obj.model.data.raw_value[373]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[374],
                            y: obj.model.data.raw_value[374]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[375],
                            y: obj.model.data.raw_value[375]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[376],
                            y: obj.model.data.raw_value[376]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[377],
                            y: obj.model.data.raw_value[377]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[378],
                            y: obj.model.data.raw_value[378]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[379],
                            y: obj.model.data.raw_value[379]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[380],
                            y: obj.model.data.raw_value[380]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[381],
                            y: obj.model.data.raw_value[381]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[382],
                            y: obj.model.data.raw_value[382]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[383],
                            y: obj.model.data.raw_value[383]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[384],
                            y: obj.model.data.raw_value[384]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[385],
                            y: obj.model.data.raw_value[385]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[386],
                            y: obj.model.data.raw_value[386]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[387],
                            y: obj.model.data.raw_value[387]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[388],
                            y: obj.model.data.raw_value[388]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[389],
                            y: obj.model.data.raw_value[389]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[390],
                            y: obj.model.data.raw_value[390]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[391],
                            y: obj.model.data.raw_value[391]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[392],
                            y: obj.model.data.raw_value[392]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[393],
                            y: obj.model.data.raw_value[393]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[394],
                            y: obj.model.data.raw_value[394]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[395],
                            y: obj.model.data.raw_value[395]
                        }
                        ],
                        backgroundColor: 'rgb(255, 0, 0)',
                        pointRadius: 5
                    }, {
                        type: 'line',
                        label: 'High Limit',
                        data: [{
                            x: obj.model.data.average_dry_bulb_temperature[365],
                            y: obj.model.data.predicted_value_upper_bound[365]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[366],
                            y: obj.model.data.predicted_value_upper_bound[366]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[367],
                            y: obj.model.data.predicted_value_upper_bound[367]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[368],
                            y: obj.model.data.predicted_value_upper_bound[368]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[369],
                            y: obj.model.data.predicted_value_upper_bound[369]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[370],
                            y: obj.model.data.predicted_value_upper_bound[370]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[371],
                            y: obj.model.data.predicted_value_upper_bound[371]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[372],
                            y: obj.model.data.predicted_value_upper_bound[372]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[373],
                            y: obj.model.data.predicted_value_upper_bound[373]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[374],
                            y: obj.model.data.predicted_value_upper_bound[374]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[375],
                            y: obj.model.data.predicted_value_upper_bound[375]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[376],
                            y: obj.model.data.predicted_value_upper_bound[376]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[377],
                            y: obj.model.data.predicted_value_upper_bound[377]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[378],
                            y: obj.model.data.predicted_value_upper_bound[378]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[379],
                            y: obj.model.data.predicted_value_upper_bound[379]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[380],
                            y: obj.model.data.predicted_value_upper_bound[380]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[381],
                            y: obj.model.data.predicted_value_upper_bound[381]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[382],
                            y: obj.model.data.predicted_value_upper_bound[382]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[383],
                            y: obj.model.data.predicted_value_upper_bound[383]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[384],
                            y: obj.model.data.predicted_value_upper_bound[384]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[385],
                            y: obj.model.data.predicted_value_upper_bound[385]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[386],
                            y: obj.model.data.predicted_value_upper_bound[386]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[387],
                            y: obj.model.data.predicted_value_upper_bound[387]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[388],
                            y: obj.model.data.predicted_value_upper_bound[388]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[389],
                            y: obj.model.data.predicted_value_upper_bound[389]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[390],
                            y: obj.model.data.predicted_value_upper_bound[390]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[391],
                            y: obj.model.data.predicted_value_upper_bound[391]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[392],
                            y: obj.model.data.predicted_value_upper_bound[392]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[393],
                            y: obj.model.data.predicted_value_upper_bound[393]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[394],
                            y: obj.model.data.predicted_value_upper_bound[394]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[395],
                            y: obj.model.data.predicted_value_upper_bound[395]
                        }
                        ],
                        fill: false,
                        pointRadius: 0,
                        borderColor: 'rgb(0, 0, 255)',
                        tension: 0.1
                    }, {
                        type: 'line',
                        label: 'Low Limit',
                        data: [{
                            x: obj.model.data.average_dry_bulb_temperature[365],
                            y: obj.model.data.predicted_value_lower_bound[365]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[366],
                            y: obj.model.data.predicted_value_lower_bound[366]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[367],
                            y: obj.model.data.predicted_value_lower_bound[367]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[368],
                            y: obj.model.data.predicted_value_lower_bound[368]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[369],
                            y: obj.model.data.predicted_value_lower_bound[369]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[370],
                            y: obj.model.data.predicted_value_lower_bound[370]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[371],
                            y: obj.model.data.predicted_value_lower_bound[371]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[372],
                            y: obj.model.data.predicted_value_lower_bound[372]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[373],
                            y: obj.model.data.predicted_value_lower_bound[373]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[374],
                            y: obj.model.data.predicted_value_lower_bound[374]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[375],
                            y: obj.model.data.predicted_value_lower_bound[375]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[376],
                            y: obj.model.data.predicted_value_lower_bound[376]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[377],
                            y: obj.model.data.predicted_value_lower_bound[377]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[378],
                            y: obj.model.data.predicted_value_lower_bound[378]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[379],
                            y: obj.model.data.predicted_value_lower_bound[379]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[380],
                            y: obj.model.data.predicted_value_lower_bound[380]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[381],
                            y: obj.model.data.predicted_value_lower_bound[381]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[382],
                            y: obj.model.data.predicted_value_lower_bound[382]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[383],
                            y: obj.model.data.predicted_value_lower_bound[383]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[384],
                            y: obj.model.data.predicted_value_lower_bound[384]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[385],
                            y: obj.model.data.predicted_value_lower_bound[385]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[386],
                            y: obj.model.data.predicted_value_lower_bound[386]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[387],
                            y: obj.model.data.predicted_value_lower_bound[387]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[388],
                            y: obj.model.data.predicted_value_lower_bound[388]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[389],
                            y: obj.model.data.predicted_value_lower_bound[389]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[390],
                            y: obj.model.data.predicted_value_lower_bound[390]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[391],
                            y: obj.model.data.predicted_value_lower_bound[391]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[392],
                            y: obj.model.data.predicted_value_lower_bound[392]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[393],
                            y: obj.model.data.predicted_value_lower_bound[393]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[394],
                            y: obj.model.data.predicted_value_lower_bound[394]
                        }, {
                            x: obj.model.data.average_dry_bulb_temperature[395],
                            y: obj.model.data.predicted_value_lower_bound[395]
                        }],
                        fill: false,
                        pointRadius: 0,
                        borderColor: 'rgb(0, 128, 0)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }

                }
            };

            const config2 = {

                data: {
                    datasets: [
                        {
                            type: 'scatter',
                            label: "Meter VS. Dates",
                            data: [{
                                x: obj.model.data.timestamp[365],
                                y: obj.model.data.raw_value[365]
                            }, {
                                x: obj.model.data.timestamp[366],
                                y: obj.model.data.raw_value[366]
                            }, {
                                x: obj.model.data.timestamp[367],
                                y: obj.model.data.raw_value[367]
                            }, {
                                x: obj.model.data.timestamp[368],
                                y: obj.model.data.raw_value[368]
                            }, {
                                x: obj.model.data.timestamp[369],
                                y: obj.model.data.raw_value[369]
                            }, {
                                x: obj.model.data.timestamp[370],
                                y: obj.model.data.raw_value[370]
                            }, {
                                x: obj.model.data.timestamp[371],
                                y: obj.model.data.raw_value[371]
                            }, {
                                x: obj.model.data.timestamp[372],
                                y: obj.model.data.raw_value[372]
                            }, {
                                x: obj.model.data.timestamp[373],
                                y: obj.model.data.raw_value[373]
                            }, {
                                x: obj.model.data.timestamp[374],
                                y: obj.model.data.raw_value[374]
                            }, {
                                x: obj.model.data.timestamp[375],
                                y: obj.model.data.raw_value[375]
                            }, {
                                x: obj.model.data.timestamp[376],
                                y: obj.model.data.raw_value[376]
                            }, {
                                x: obj.model.data.timestamp[377],
                                y: obj.model.data.raw_value[377]
                            }, {
                                x: obj.model.data.timestamp[378],
                                y: obj.model.data.raw_value[378]
                            }, {
                                x: obj.model.data.timestamp[379],
                                y: obj.model.data.raw_value[379]
                            }, {
                                x: obj.model.data.timestamp[380],
                                y: obj.model.data.raw_value[380]
                            }, {
                                x: obj.model.data.timestamp[381],
                                y: obj.model.data.raw_value[381]
                            }, {
                                x: obj.model.data.timestamp[382],
                                y: obj.model.data.raw_value[382]
                            }, {
                                x: obj.model.data.timestamp[383],
                                y: obj.model.data.raw_value[383]
                            }, {
                                x: obj.model.data.timestamp[384],
                                y: obj.model.data.raw_value[384]
                            }, {
                                x: obj.model.data.timestamp[385],
                                y: obj.model.data.raw_value[385]
                            }, {
                                x: obj.model.data.timestamp[386],
                                y: obj.model.data.raw_value[386]
                            }, {
                                x: obj.model.data.timestamp[387],
                                y: obj.model.data.raw_value[387]
                            }, {
                                x: obj.model.data.timestamp[388],
                                y: obj.model.data.raw_value[388]
                            }, {
                                x: obj.model.data.timestamp[389],
                                y: obj.model.data.raw_value[389]
                            }, {
                                x: obj.model.data.timestamp[390],
                                y: obj.model.data.raw_value[390]
                            }, {
                                x: obj.model.data.timestamp[391],
                                y: obj.model.data.raw_value[391]
                            }, {
                                x: obj.model.data.timestamp[392],
                                y: obj.model.data.raw_value[392]
                            }, {
                                x: obj.model.data.timestamp[393],
                                y: obj.model.data.raw_value[393]
                            }, {
                                x: obj.model.data.timestamp[394],
                                y: obj.model.data.raw_value[394]
                            }, {
                                x: obj.model.data.timestamp[395],
                                y: obj.model.data.raw_value[395]
                            }],
                            pointRadius: 5,
                            backgroundColor: 'rgb(255, 0, 0)',
                        }, {
                            type: 'line',
                            label: 'High Limit',
                            data: [{
                                x: obj.model.data.timestamp[365],
                                y: obj.model.data.predicted_value_upper_bound[365]
                            }, {
                                x: obj.model.data.timestamp[366],
                                y: obj.model.data.predicted_value_upper_bound[366]
                            }, {
                                x: obj.model.data.timestamp[367],
                                y: obj.model.data.predicted_value_upper_bound[367]
                            }, {
                                x: obj.model.data.timestamp[368],
                                y: obj.model.data.predicted_value_upper_bound[368]
                            }, {
                                x: obj.model.data.timestamp[369],
                                y: obj.model.data.predicted_value_upper_bound[369]
                            }, {
                                x: obj.model.data.timestamp[370],
                                y: obj.model.data.predicted_value_upper_bound[370]
                            }, {
                                x: obj.model.data.timestamp[371],
                                y: obj.model.data.predicted_value_upper_bound[371]
                            }, {
                                x: obj.model.data.timestamp[372],
                                y: obj.model.data.predicted_value_upper_bound[372]
                            }, {
                                x: obj.model.data.timestamp[373],
                                y: obj.model.data.predicted_value_upper_bound[373]
                            }, {
                                x: obj.model.data.timestamp[374],
                                y: obj.model.data.predicted_value_upper_bound[374]
                            }, {
                                x: obj.model.data.timestamp[375],
                                y: obj.model.data.predicted_value_upper_bound[375]
                            }, {
                                x: obj.model.data.timestamp[376],
                                y: obj.model.data.predicted_value_upper_bound[376]
                            }, {
                                x: obj.model.data.timestamp[377],
                                y: obj.model.data.predicted_value_upper_bound[377]
                            }, {
                                x: obj.model.data.timestamp[378],
                                y: obj.model.data.predicted_value_upper_bound[378]
                            }, {
                                x: obj.model.data.timestamp[379],
                                y: obj.model.data.predicted_value_upper_bound[379]
                            }, {
                                x: obj.model.data.timestamp[380],
                                y: obj.model.data.predicted_value_upper_bound[380]
                            }, {
                                x: obj.model.data.timestamp[381],
                                y: obj.model.data.predicted_value_upper_bound[381]
                            }, {
                                x: obj.model.data.timestamp[382],
                                y: obj.model.data.predicted_value_upper_bound[382]
                            }, {
                                x: obj.model.data.timestamp[383],
                                y: obj.model.data.predicted_value_upper_bound[383]
                            }, {
                                x: obj.model.data.timestamp[384],
                                y: obj.model.data.predicted_value_upper_bound[384]
                            }, {
                                x: obj.model.data.timestamp[385],
                                y: obj.model.data.predicted_value_upper_bound[385]
                            }, {
                                x: obj.model.data.timestamp[386],
                                y: obj.model.data.predicted_value_upper_bound[386]
                            }, {
                                x: obj.model.data.timestamp[387],
                                y: obj.model.data.predicted_value_upper_bound[387]
                            }, {
                                x: obj.model.data.timestamp[388],
                                y: obj.model.data.predicted_value_upper_bound[388]
                            }, {
                                x: obj.model.data.timestamp[389],
                                y: obj.model.data.predicted_value_upper_bound[389]
                            }, {
                                x: obj.model.data.timestamp[390],
                                y: obj.model.data.predicted_value_upper_bound[390]
                            }, {
                                x: obj.model.data.timestamp[391],
                                y: obj.model.data.predicted_value_upper_bound[391]
                            }, {
                                x: obj.model.data.timestamp[392],
                                y: obj.model.data.predicted_value_upper_bound[392]
                            }, {
                                x: obj.model.data.timestamp[393],
                                y: obj.model.data.predicted_value_upper_bound[393]
                            }, {
                                x: obj.model.data.timestamp[394],
                                y: obj.model.data.predicted_value_upper_bound[394]
                            }, {
                                x: obj.model.data.timestamp[395],
                                y: obj.model.data.predicted_value_upper_bound[395]
                            }
                            ],
                            fill: false,
                            pointRadius: 0,
                            borderColor: 'rgb(0, 0, 255)',
                            tension: 0.1
                        }, {
                            type: 'line',
                            label: 'Low Limit',
                            data: [{
                                x: obj.model.data.timestamp[365],
                                y: obj.model.data.predicted_value_lower_bound[365]
                            }, {
                                x: obj.model.data.timestamp[366],
                                y: obj.model.data.predicted_value_lower_bound[366]
                            }, {
                                x: obj.model.data.timestamp[367],
                                y: obj.model.data.predicted_value_lower_bound[367]
                            }, {
                                x: obj.model.data.timestamp[368],
                                y: obj.model.data.predicted_value_lower_bound[368]
                            }, {
                                x: obj.model.data.timestamp[369],
                                y: obj.model.data.predicted_value_lower_bound[369]
                            }, {
                                x: obj.model.data.timestamp[370],
                                y: obj.model.data.predicted_value_lower_bound[370]
                            }, {
                                x: obj.model.data.timestamp[371],
                                y: obj.model.data.predicted_value_lower_bound[371]
                            }, {
                                x: obj.model.data.timestamp[372],
                                y: obj.model.data.predicted_value_lower_bound[372]
                            }, {
                                x: obj.model.data.timestamp[373],
                                y: obj.model.data.predicted_value_lower_bound[373]
                            }, {
                                x: obj.model.data.timestamp[374],
                                y: obj.model.data.predicted_value_lower_bound[374]
                            }, {
                                x: obj.model.data.timestamp[375],
                                y: obj.model.data.predicted_value_lower_bound[375]
                            }, {
                                x: obj.model.data.timestamp[376],
                                y: obj.model.data.predicted_value_lower_bound[376]
                            }, {
                                x: obj.model.data.timestamp[377],
                                y: obj.model.data.predicted_value_lower_bound[377]
                            }, {
                                x: obj.model.data.timestamp[378],
                                y: obj.model.data.predicted_value_lower_bound[378]
                            }, {
                                x: obj.model.data.timestamp[379],
                                y: obj.model.data.predicted_value_lower_bound[379]
                            }, {
                                x: obj.model.data.timestamp[380],
                                y: obj.model.data.predicted_value_lower_bound[380]
                            }, {
                                x: obj.model.data.timestamp[381],
                                y: obj.model.data.predicted_value_lower_bound[381]
                            }, {
                                x: obj.model.data.timestamp[382],
                                y: obj.model.data.predicted_value_lower_bound[382]
                            }, {
                                x: obj.model.data.timestamp[383],
                                y: obj.model.data.predicted_value_lower_bound[383]
                            }, {
                                x: obj.model.data.timestamp[384],
                                y: obj.model.data.predicted_value_lower_bound[384]
                            }, {
                                x: obj.model.data.timestamp[385],
                                y: obj.model.data.predicted_value_lower_bound[385]
                            }, {
                                x: obj.model.data.timestamp[386],
                                y: obj.model.data.predicted_value_lower_bound[386]
                            }, {
                                x: obj.model.data.timestamp[387],
                                y: obj.model.data.predicted_value_lower_bound[387]
                            }, {
                                x: obj.model.data.timestamp[388],
                                y: obj.model.data.predicted_value_lower_bound[388]
                            }, {
                                x: obj.model.data.timestamp[389],
                                y: obj.model.data.predicted_value_lower_bound[389]
                            }, {
                                x: obj.model.data.timestamp[390],
                                y: obj.model.data.predicted_value_lower_bound[390]
                            }, {
                                x: obj.model.data.timestamp[391],
                                y: obj.model.data.predicted_value_lower_bound[391]
                            }, {
                                x: obj.model.data.timestamp[392],
                                y: obj.model.data.predicted_value_lower_bound[392]
                            }, {
                                x: obj.model.data.timestamp[393],
                                y: obj.model.data.predicted_value_lower_bound[393]
                            }, {
                                x: obj.model.data.timestamp[394],
                                y: obj.model.data.predicted_value_lower_bound[394]
                            }, {
                                x: obj.model.data.timestamp[395],
                                y: obj.model.data.predicted_value_lower_bound[395]
                            }
                            ],
                            fill: false,
                            pointRadius: 0,
                            borderColor: 'rgb(0, 128, 0)',
                            tension: 0.1
                        }

                    ]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }

                }
            };

            let ctx = document.getElementById('myChart').getContext('2d');
            let myChart = new Chart(ctx, config);

            let ctx2 = document.getElementById('myChart2').getContext('2d');
            let myChart2 = new Chart(ctx2, config2);

            $(function () {
                let data = [
                    {
                        'date': obj.model.data.timestamp[365],
                        'temperature': obj.model.data.average_dry_bulb_temperature[365],
                        'hdd': parseFloat(obj.model.data.degree_day[365]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[365],
                        'expected': parseFloat(obj.model.data.predicted_value[365]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[366],
                        'temperature': obj.model.data.average_dry_bulb_temperature[366],
                        'hdd': parseFloat(obj.model.data.degree_day[366]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[366],
                        'expected': parseFloat(obj.model.data.predicted_value[366]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[367],
                        'temperature': obj.model.data.average_dry_bulb_temperature[367],
                        'hdd': parseFloat(obj.model.data.degree_day[367]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[367],
                        'expected': parseFloat(obj.model.data.predicted_value[367]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[368],
                        'temperature': obj.model.data.average_dry_bulb_temperature[368],
                        'hdd': parseFloat(obj.model.data.degree_day[368]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[368],
                        'expected': parseFloat(obj.model.data.predicted_value[368]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[369],
                        'temperature': obj.model.data.average_dry_bulb_temperature[369],
                        'hdd': parseFloat(obj.model.data.degree_day[369]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[369],
                        'expected': parseFloat(obj.model.data.predicted_value[369]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[370],
                        'temperature': obj.model.data.average_dry_bulb_temperature[370],
                        'hdd': parseFloat(obj.model.data.degree_day[370]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[370],
                        'expected': parseFloat(obj.model.data.predicted_value[370]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[371],
                        'temperature': obj.model.data.average_dry_bulb_temperature[371],
                        'hdd': parseFloat(obj.model.data.degree_day[371]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[371],
                        'expected': parseFloat(obj.model.data.predicted_value[371]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[372],
                        'temperature': obj.model.data.average_dry_bulb_temperature[372],
                        'hdd': parseFloat(obj.model.data.degree_day[372]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[372],
                        'expected': parseFloat(obj.model.data.predicted_value[372]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[373],
                        'temperature': obj.model.data.average_dry_bulb_temperature[373],
                        'hdd': parseFloat(obj.model.data.degree_day[373]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[373],
                        'expected': parseFloat(obj.model.data.predicted_value[373]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[374],
                        'temperature': obj.model.data.average_dry_bulb_temperature[374],
                        'hdd': parseFloat(obj.model.data.degree_day[374]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[374],
                        'expected': parseFloat(obj.model.data.predicted_value[374]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[375],
                        'temperature': obj.model.data.average_dry_bulb_temperature[375],
                        'hdd': parseFloat(obj.model.data.degree_day[375]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[375],
                        'expected': parseFloat(obj.model.data.predicted_value[375]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[376],
                        'temperature': obj.model.data.average_dry_bulb_temperature[376],
                        'hdd': parseFloat(obj.model.data.degree_day[376]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[376],
                        'expected': parseFloat(obj.model.data.predicted_value[376]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[377],
                        'temperature': obj.model.data.average_dry_bulb_temperature[377],
                        'hdd': parseFloat(obj.model.data.degree_day[377]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[377],
                        'expected': parseFloat(obj.model.data.predicted_value[377]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[378],
                        'temperature': obj.model.data.average_dry_bulb_temperature[378],
                        'hdd': parseFloat(obj.model.data.degree_day[378]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[378],
                        'expected': parseFloat(obj.model.data.predicted_value[378]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[379],
                        'temperature': obj.model.data.average_dry_bulb_temperature[379],
                        'hdd': parseFloat(obj.model.data.degree_day[379]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[379],
                        'expected': parseFloat(obj.model.data.predicted_value[379]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[380],
                        'temperature': obj.model.data.average_dry_bulb_temperature[380],
                        'hdd': parseFloat(obj.model.data.degree_day[380]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[380],
                        'expected': parseFloat(obj.model.data.predicted_value[380]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[381],
                        'temperature': obj.model.data.average_dry_bulb_temperature[381],
                        'hdd': parseFloat(obj.model.data.degree_day[381]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[381],
                        'expected': parseFloat(obj.model.data.predicted_value[381]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[382],
                        'temperature': obj.model.data.average_dry_bulb_temperature[382],
                        'hdd': parseFloat(obj.model.data.degree_day[382]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[382],
                        'expected': parseFloat(obj.model.data.predicted_value[382]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[383],
                        'temperature': obj.model.data.average_dry_bulb_temperature[383],
                        'hdd': parseFloat(obj.model.data.degree_day[383]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[383],
                        'expected': parseFloat(obj.model.data.predicted_value[383]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[384],
                        'temperature': obj.model.data.average_dry_bulb_temperature[384],
                        'hdd': parseFloat(obj.model.data.degree_day[384]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[384],
                        'expected': parseFloat(obj.model.data.predicted_value[384]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[385],
                        'temperature': obj.model.data.average_dry_bulb_temperature[385],
                        'hdd': parseFloat(obj.model.data.degree_day[385]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[385],
                        'expected': parseFloat(obj.model.data.predicted_value[385]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[386],
                        'temperature': obj.model.data.average_dry_bulb_temperature[386],
                        'hdd': parseFloat(obj.model.data.degree_day[386]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[386],
                        'expected': parseFloat(obj.model.data.predicted_value[386]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[387],
                        'temperature': obj.model.data.average_dry_bulb_temperature[387],
                        'hdd': parseFloat(obj.model.data.degree_day[387]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[387],
                        'expected': parseFloat(obj.model.data.predicted_value[387]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[388],
                        'temperature': obj.model.data.average_dry_bulb_temperature[388],
                        'hdd': parseFloat(obj.model.data.degree_day[388]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[388],
                        'expected': parseFloat(obj.model.data.predicted_value[388]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[389],
                        'temperature': obj.model.data.average_dry_bulb_temperature[389],
                        'hdd': parseFloat(obj.model.data.degree_day[389]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[389],
                        'expected': parseFloat(obj.model.data.predicted_value[389]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[390],
                        'temperature': obj.model.data.average_dry_bulb_temperature[390],
                        'hdd': parseFloat(obj.model.data.degree_day[390]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[390],
                        'expected': parseFloat(obj.model.data.predicted_value[390]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[391],
                        'temperature': obj.model.data.average_dry_bulb_temperature[391],
                        'hdd': parseFloat(obj.model.data.degree_day[391]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[391],
                        'expected': parseFloat(obj.model.data.predicted_value[391]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[392],
                        'temperature': obj.model.data.average_dry_bulb_temperature[392],
                        'hdd': parseFloat(obj.model.data.degree_day[392]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[392],
                        'expected': parseFloat(obj.model.data.predicted_value[392]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[393],
                        'temperature': obj.model.data.average_dry_bulb_temperature[393],
                        'hdd': parseFloat(obj.model.data.degree_day[393]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[393],
                        'expected': parseFloat(obj.model.data.predicted_value[393]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[394],
                        'temperature': obj.model.data.average_dry_bulb_temperature[394],
                        'hdd': parseFloat(obj.model.data.degree_day[394]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[394],
                        'expected': parseFloat(obj.model.data.predicted_value[394]).toFixed(0)
                    },
                    {
                        'date': obj.model.data.timestamp[395],
                        'temperature': obj.model.data.average_dry_bulb_temperature[395],
                        'hdd': parseFloat(obj.model.data.degree_day[395]).toFixed(0),
                        'meterReading': obj.model.data.raw_value[395],
                        'expected': parseFloat(obj.model.data.predicted_value[395]).toFixed(0)
                    },
                ]
                $table2.bootstrapTable({ data: data })
            })

        })


    }

})

