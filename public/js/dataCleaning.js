
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



    let $table = $('#table')
    let $table2 = $('#table2')
    let $button = $('#button')
    let $button2 = $('#button2')
    let $button3 = $('#button3')
    let container = $('#row-container')
    let content = ""


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

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    $button3.click(function () {
        let replaceData = $table2.bootstrapTable('getSelections')
        console.log(replaceData)
        $("html,body").animate({ "scrollTop": $("#row-container").offset().top }, 100);
        replaceData.forEach(function (item, i) {
            if (i == 0) {
                content += '<div class="row">'
            }
            content += `
            <div class="col-md-4">
                <div class="card border-secondary bg-light mb-3" w-100>
                    <div class="card-body text-dark">
                        <div class="card-title d-flex justify-content-between align-items-start">
                            <div>
                                <h5>Replacement:</h5>
                                <strong><p class="card-text ms-2">${item.Meter} <i class="fas fa-arrow-right"></i> ${item.Expected}</p></strong>
                            </div>
                            <span style="font-size:13px;" class="badge rounded-pill bg-primary text-light">${item.Date}</span>
                        </div>
                        <hr>
                        <h5 class="card-title">Steward:</h5>
                        <select id=${makeid(5)} class="form-select steward">
                            <option disabled selected>Choose...</option>
                            <option>Grace Hsieh</option>
                            <option>Matt Stevens</option>
                            <option>Meagan Jones</option>
                        </select>
                        <hr>
                        <h5 class="card-title">Reason:</h5>
                        <select class="form-select reason" id=${makeid(5)}>
                            <option disabled selected>Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <hr>
                        <h5 class="card-title">Notes:</h5>
                        <textarea id=${makeid(5)} class='notes' rows="4" cols="47"></textarea>
                    </div>
                    <div class="card-footer bg-transparent border-secondary text-end">
                        <button data-replacement=${item.Expected} data-date=${item.Date} type="button" class="btn btn-success submit">Submit</button>
                    </div>
                </div>
            </div>`
            if (i != 0 && i % 5 == 0) {
                content += '</div><div class="row">'
            }
        })
        content += '</div>'
        container.append(content)

        $('.notes').on('change', function () {
            let x = $(this).val();
            let id = $(this).attr('id');
            if (!$(this).attr('was-changed')) {
                $('.notes').each(function () {
                    $(this).val(x);
                    $(this).attr('was-changed', true);
                });
                $('.submit').attr('data-notes', $('#' + id).val());
            }
            else {
                $(this).closest('.card').find('.submit').attr('data-notes', $('#' + id).val());
            }
        })
        $('.steward').on('change', function () {
            let x = $(this).val();
            let id = $(this).attr('id');
            if (!$(this).attr('was-changed')) {
                $('.steward').each(function () {
                    $(this).val(x);
                    $(this).attr('was-changed', true);
                });
                $('.submit').attr('data-steward', $('#' + id).val());
            }
            else {
                $(this).closest('.card').find('.submit').attr('data-steward', $('#' + id).val());
            }
        })

        $('.reason').on('change', function () {
            let x = $(this).val();
            let id = $(this).attr('id');
            if (!$(this).attr('was-changed')) {
                $('.reason').each(function () {
                    $(this).val(x);
                    $(this).attr('was-changed', true);
                });
                $('.submit').attr('data-reason', $('#' + id).val());
            }
            else {
                $(this).closest('.card').find('.submit').attr('data-reason', $('#' + id).val());
            }
        })


        $('.submit').on('click', function () {
            const replacement = $(this).attr('data-replacement')
            const date = $(this).attr('data-date')
            const reason = $(this).attr('data-reason')
            const notes = $(this).attr('data-notes')
            const steward = $(this).attr('data-steward')
            console.log(replacement, date, reason, notes, steward)
            // const data = {
            //     timestamp: date,
            //     value: replacement,
            //     reason: 
            // }
        })


    })

    $('#top').on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, 100);

    })

    $(".apiGateway").on("click", function (e) {
        e.preventDefault();
        modelApi()
        valueArray = []
        keyArray = []
        newArray = []
        $('#chartData').load(location.href + " #chartData")
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
            let valueArray = []
            let keyArray = []
            let result = {}
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
            $('#tableData').show()
            valueArray.push(obj.model.data.predicted_value_lower_bound)
            let valueSliceArray = valueArray[0].slice(365)
            keyArray.push(obj.model.data.average_dry_bulb_temperature)
            let keySliceArray = keyArray[0].slice(365)
            keySliceArray.forEach((key, i) => result[key] = valueSliceArray[i])
            var newArray = Object.keys(result).map(function (key) {
                return [Number(key), result[key]];
            })
            newArray.sort(function (a, b) {
                return a[0] - b[0]
            })

            console.log(newArray)


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
                        pointRadius: 5,
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
                        tension: 0.1,
                        borderColor: 'rgb(0, 0, 255)',

                        // }, {
                        //     type: 'line',
                        //     label: 'Low Limit',

                        //     data: [{
                        //         x: subArray[0],
                        //         y: subArray[1]
                        //     }],
                        //     fill: false,
                        //     pointRadius: 0,
                        //     tension: 0.1,
                        //     borderColor: 'rgb(0, 128, 0)',
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };
            let ctx = document.getElementById('myChart').getContext('2d');
            let myChart = new Chart(ctx, config);




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



            let ctx2 = document.getElementById('myChart2').getContext('2d');
            let myChart2 = new Chart(ctx2, config2);

            $(function () {
                let replacementValue = obj.model.data.replacement_value
                let replacementReason = obj.model.data.replacement_reason
                let replacementNotes = obj.model.data.replacement_notes

                let data = [
                    {
                        'Date': obj.model.data.timestamp[365],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[365],
                        'HDD': parseFloat(obj.model.data.degree_day[365]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[365]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[365]).toFixed(0),
                        'Replacement': replacementValue[365] = 'null' ? 'Not Replaced' : replacementValue[365],
                        'Reason': replacementReason[365] = 'null' ? 'No replacement reason' : replacementReason[365],
                        'Notes': replacementNotes[365] = 'null' ? 'No replacement notes' : replacementNotes[365]
                    },
                    {
                        'Date': obj.model.data.timestamp[366],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[366],
                        'HDD': parseFloat(obj.model.data.degree_day[366]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[366]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[366]).toFixed(0),
                        'Replacement': replacementValue[366] = 'null' ? 'Not Replaced' : replacementValue[366],
                        'Reason': replacementReason[366] = 'null' ? 'No replacement reason' : replacementReason[365],
                        'Notes': replacementNotes[366] = 'null' ? 'No replacement notes' : replacementNotes[366]
                    },
                    {
                        'Date': obj.model.data.timestamp[367],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[367],
                        'HDD': parseFloat(obj.model.data.degree_day[367]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[367]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[367]).toFixed(0),
                        'Replacement': replacementValue[367] = 'null' ? 'Not Replaced' : replacementValue[367],
                        'Reason': replacementReason[367] = 'null' ? 'No replacement reason' : replacementReason[367],
                        'Notes': replacementNotes[367] = 'null' ? 'No replacement notes' : replacementNotes[367]
                    },
                    {
                        'Date': obj.model.data.timestamp[368],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[368],
                        'HDD': parseFloat(obj.model.data.degree_day[368]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[368]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[368]).toFixed(0),
                        'Replacement': replacementValue[368] = 'null' ? 'Not Replaced' : replacementValue[368],
                        'Reason': replacementReason[368] = 'null' ? 'No replacement reason' : replacementReason[368],
                        'Notes': replacementNotes[368] = 'null' ? 'No replacement notes' : replacementNotes[368]
                    },
                    {
                        'Date': obj.model.data.timestamp[369],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[369],
                        'HDD': parseFloat(obj.model.data.degree_day[369]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[369]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[369]).toFixed(0),
                        'Replacement': replacementValue[369] = 'null' ? 'Not Replaced' : replacementValue[369],
                        'Reason': replacementReason[369] = 'null' ? 'No replacement reason' : replacementReason[369],
                        'Notes': replacementNotes[369] = 'null' ? 'No replacement notes' : replacementNotes[369]
                    },
                    {
                        'Date': obj.model.data.timestamp[370],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[370],
                        'HDD': parseFloat(obj.model.data.degree_day[370]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[370]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[370]).toFixed(0),
                        'Replacement': replacementValue[370] = 'null' ? 'Not Replaced' : replacementValue[370],
                        'Reason': replacementReason[370] = 'null' ? 'No replacement reason' : replacementReason[370],
                        'Notes': replacementNotes[370] = 'null' ? 'No replacement notes' : replacementNotes[370]
                    },
                    {
                        'Date': obj.model.data.timestamp[371],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[371],
                        'HDD': parseFloat(obj.model.data.degree_day[371]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[371]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[371]).toFixed(0),
                        'Replacement': replacementValue[371] = 'null' ? 'Not Replaced' : replacementValue[371],
                        'Reason': replacementReason[371] = 'null' ? 'No replacement reason' : replacementReason[371],
                        'Notes': replacementNotes[371] = 'null' ? 'No replacement notes' : replacementNotes[371]
                    },
                    {
                        'Date': obj.model.data.timestamp[372],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[372],
                        'HDD': parseFloat(obj.model.data.degree_day[372]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[372]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[372]).toFixed(0),
                        'Replacement': replacementValue[372] = 'null' ? 'Not Replaced' : replacementValue[372],
                        'Reason': replacementReason[372] = 'null' ? 'No replacement reason' : replacementReason[372],
                        'Notes': replacementNotes[372] = 'null' ? 'No replacement notes' : replacementNotes[372]
                    },
                    {
                        'Date': obj.model.data.timestamp[373],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[373],
                        'HDD': parseFloat(obj.model.data.degree_day[373]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[373]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[373]).toFixed(0),
                        'Replacement': replacementValue[373] = 'null' ? 'Not Replaced' : replacementValue[373],
                        'Reason': replacementReason[373] = 'null' ? 'No replacement reason' : replacementReason[373],
                        'Notes': replacementNotes[373] = 'null' ? 'No replacement notes' : replacementNotes[373]
                    },
                    {
                        'Date': obj.model.data.timestamp[374],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[374],
                        'HDD': parseFloat(obj.model.data.degree_day[374]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[374]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[374]).toFixed(0),
                        'Replacement': replacementValue[374] = 'null' ? 'Not Replaced' : replacementValue[374],
                        'Reason': replacementReason[374] = 'null' ? 'No replacement reason' : replacementReason[374],
                        'Notes': replacementNotes[374] = 'null' ? 'No replacement notes' : replacementNotes[374]
                    },
                    {
                        'Date': obj.model.data.timestamp[375],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[375],
                        'HDD': parseFloat(obj.model.data.degree_day[375]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[375]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[375]).toFixed(0),
                        'Replacement': replacementValue[375] = 'null' ? 'Not Replaced' : replacementValue[375],
                        'Reason': replacementReason[375] = 'null' ? 'No replacement reason' : replacementReason[375],
                        'Notes': replacementNotes[375] = 'null' ? 'No replacement notes' : replacementNotes[375]
                    },
                    {
                        'Date': obj.model.data.timestamp[376],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[376],
                        'HDD': parseFloat(obj.model.data.degree_day[376]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[376]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[376]).toFixed(0),
                        'Replacement': replacementValue[376] = 'null' ? 'Not Replaced' : replacementValue[376],
                        'Reason': replacementReason[376] = 'null' ? 'No replacement reason' : replacementReason[376],
                        'Notes': replacementNotes[376] = 'null' ? 'No replacement notes' : replacementNotes[376]
                    },
                    {
                        'Date': obj.model.data.timestamp[377],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[377],
                        'HDD': parseFloat(obj.model.data.degree_day[377]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[377]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[377]).toFixed(0),
                        'Replacement': replacementValue[377] = 'null' ? 'Not Replaced' : replacementValue[377],
                        'Reason': replacementReason[377] = 'null' ? 'No replacement reason' : replacementReason[377],
                        'Notes': replacementNotes[377] = 'null' ? 'No replacement notes' : replacementNotes[377]
                    },
                    {
                        'Date': obj.model.data.timestamp[378],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[378],
                        'HDD': parseFloat(obj.model.data.degree_day[378]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[378]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[378]).toFixed(0),
                        'Replacement': replacementValue[378] = 'null' ? 'Not Replaced' : replacementValue[378],
                        'Reason': replacementReason[378] = 'null' ? 'No replacement reason' : replacementReason[378],
                        'Notes': replacementNotes[378] = 'null' ? 'No replacement notes' : replacementNotes[378]
                    },
                    {
                        'Date': obj.model.data.timestamp[379],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[379],
                        'HDD': parseFloat(obj.model.data.degree_day[379]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[379]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[379]).toFixed(0),
                        'Replacement': replacementValue[379] = 'null' ? 'Not Replaced' : replacementValue[379],
                        'Reason': replacementReason[379] = 'null' ? 'No replacement reason' : replacementReason[379],
                        'Notes': replacementNotes[379] = 'null' ? 'No replacement notes' : replacementNotes[379]
                    },
                    {
                        'Date': obj.model.data.timestamp[380],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[380],
                        'HDD': parseFloat(obj.model.data.degree_day[380]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[380]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[380]).toFixed(0),
                        'Replacement': replacementValue[380] = 'null' ? 'Not Replaced' : replacementValue[380],
                        'Reason': replacementReason[380] = 'null' ? 'No replacement reason' : replacementReason[380],
                        'Notes': replacementNotes[380] = 'null' ? 'No replacement notes' : replacementNotes[380]
                    },
                    {
                        'Date': obj.model.data.timestamp[381],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[381],
                        'HDD': parseFloat(obj.model.data.degree_day[381]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[381]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[381]).toFixed(0),
                        'Replacement': replacementValue[381] = 'null' ? 'Not Replaced' : replacementValue[381],
                        'Reason': replacementReason[381] = 'null' ? 'No replacement reason' : replacementReason[381],
                        'Notes': replacementNotes[381] = 'null' ? 'No replacement notes' : replacementNotes[381]
                    },
                    {
                        'Date': obj.model.data.timestamp[382],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[382],
                        'HDD': parseFloat(obj.model.data.degree_day[382]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[382]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[382]).toFixed(0),
                        'Replacement': replacementValue[382] = 'null' ? 'Not Replaced' : replacementValue[382],
                        'Reason': replacementReason[382] = 'null' ? 'No replacement reason' : replacementReason[382],
                        'Notes': replacementNotes[382] = 'null' ? 'No replacement notes' : replacementNotes[382]
                    },
                    {
                        'Date': obj.model.data.timestamp[383],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[383],
                        'HDD': parseFloat(obj.model.data.degree_day[383]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[383]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[383]).toFixed(0),
                        'Replacement': replacementValue[383] = 'null' ? 'Not Replaced' : replacementValue[383],
                        'Reason': replacementReason[383] = 'null' ? 'No replacement reason' : replacementReason[383],
                        'Notes': replacementNotes[383] = 'null' ? 'No replacement notes' : replacementNotes[383]
                    },
                    {
                        'Date': obj.model.data.timestamp[384],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[384],
                        'HDD': parseFloat(obj.model.data.degree_day[384]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[384]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[384]).toFixed(0),
                        'Replacement': replacementValue[384] = 'null' ? 'Not Replaced' : replacementValue[384],
                        'Reason': replacementReason[384] = 'null' ? 'No replacement reason' : replacementReason[384],
                        'Notes': replacementNotes[384] = 'null' ? 'No replacement notes' : replacementNotes[384]
                    },
                    {
                        'Date': obj.model.data.timestamp[385],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[385],
                        'HDD': parseFloat(obj.model.data.degree_day[385]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[385]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[385]).toFixed(0),
                        'Replacement': replacementValue[385] = 'null' ? 'Not Replaced' : replacementValue[385],
                        'Reason': replacementReason[385] = 'null' ? 'No replacement reason' : replacementReason[385],
                        'Notes': replacementNotes[385] = 'null' ? 'No replacement notes' : replacementNotes[385]
                    },
                    {
                        'Date': obj.model.data.timestamp[386],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[386],
                        'HDD': parseFloat(obj.model.data.degree_day[386]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[386]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[386]).toFixed(0),
                        'Replacement': replacementValue[386] = 'null' ? 'Not Replaced' : replacementValue[386],
                        'Reason': replacementReason[386] = 'null' ? 'No replacement reason' : replacementReason[386],
                        'Notes': replacementNotes[386] = 'null' ? 'No replacement notes' : replacementNotes[386]
                    },
                    {
                        'Date': obj.model.data.timestamp[387],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[387],
                        'HDD': parseFloat(obj.model.data.degree_day[387]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[387]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[387]).toFixed(0),
                        'Replacement': replacementValue[387] = 'null' ? 'Not Replaced' : replacementValue[387],
                        'Reason': replacementReason[387] = 'null' ? 'No replacement reason' : replacementReason[387],
                        'Notes': replacementNotes[387] = 'null' ? 'No replacement notes' : replacementNotes[387]
                    },
                    {
                        'Date': obj.model.data.timestamp[388],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[388],
                        'HDD': parseFloat(obj.model.data.degree_day[388]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[388]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[388]).toFixed(0),
                        'Replacement': replacementValue[388] = 'null' ? 'Not Replaced' : replacementValue[388],
                        'Reason': replacementReason[388] = 'null' ? 'No replacement reason' : replacementReason[388],
                        'Notes': replacementNotes[388] = 'null' ? 'No replacement notes' : replacementNotes[388]
                    },
                    {
                        'Date': obj.model.data.timestamp[389],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[389],
                        'HDD': parseFloat(obj.model.data.degree_day[389]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[389]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[389]).toFixed(0),
                        'Replacement': replacementValue[389] = 'null' ? 'Not Replaced' : replacementValue[389],
                        'Reason': replacementReason[389] = 'null' ? 'No replacement reason' : replacementReason[389],
                        'Notes': replacementNotes[389] = 'null' ? 'No replacement notes' : replacementNotes[389]
                    },
                    {
                        'Date': obj.model.data.timestamp[390],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[390],
                        'HDD': parseFloat(obj.model.data.degree_day[390]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[390]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[390]).toFixed(0),
                        'Replacement': replacementValue[390] = 'null' ? 'Not Replaced' : replacementValue[390],
                        'Reason': replacementReason[390] = 'null' ? 'No replacement reason' : replacementReason[390],
                        'Notes': replacementNotes[390] = 'null' ? 'No replacement notes' : replacementNotes[390]
                    },
                    {
                        'Date': obj.model.data.timestamp[391],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[391],
                        'HDD': parseFloat(obj.model.data.degree_day[391]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[391]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[391]).toFixed(0),
                        'Replacement': replacementValue[391] = 'null' ? 'Not Replaced' : replacementValue[391],
                        'Reason': replacementReason[391] = 'null' ? 'No replacement reason' : replacementReason[391],
                        'Notes': replacementNotes[391] = 'null' ? 'No replacement notes' : replacementNotes[391]
                    },
                    {
                        'Date': obj.model.data.timestamp[392],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[392],
                        'HDD': parseFloat(obj.model.data.degree_day[392]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[392]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[392]).toFixed(0),
                        'Replacement': replacementValue[392] = 'null' ? 'Not Replaced' : replacementValue[392],
                        'Reason': replacementReason[392] = 'null' ? 'No replacement reason' : replacementReason[392],
                        'Notes': replacementNotes[392] = 'null' ? 'No replacement notes' : replacementNotes[392]
                    },
                    {
                        'Date': obj.model.data.timestamp[393],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[393],
                        'HDD': parseFloat(obj.model.data.degree_day[393]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[393]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[393]).toFixed(0),
                        'Replacement': replacementValue[393] = 'null' ? 'Not Replaced' : replacementValue[393],
                        'Reason': replacementReason[393] = 'null' ? 'No replacement reason' : replacementReason[393],
                        'Notes': replacementNotes[393] = 'null' ? 'No replacement notes' : replacementNotes[393]
                    },
                    {
                        'Date': obj.model.data.timestamp[394],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[394],
                        'HDD': parseFloat(obj.model.data.degree_day[394]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[394]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[394]).toFixed(0),
                        'Replacement': replacementValue[394] = 'null' ? 'Not Replaced' : replacementValue[394],
                        'Reason': replacementReason[394] = 'null' ? 'No replacement reason' : replacementReason[394],
                        'Notes': replacementNotes[394] = 'null' ? 'No replacement notes' : replacementNotes[394]
                    },
                    {
                        'Date': obj.model.data.timestamp[395],
                        'Temperature': obj.model.data.average_dry_bulb_temperature[395],
                        'HDD': parseFloat(obj.model.data.degree_day[395]).toFixed(0),
                        'Meter': parseFloat(obj.model.data.raw_value[395]).toFixed(0),
                        'Expected': parseFloat(obj.model.data.predicted_value[395]).toFixed(0),
                        'Replacement': replacementValue[395] = 'null' ? 'Not Replaced' : replacementValue[395],
                        'Reason': replacementReason[395] = 'null' ? 'No replacement reason' : replacementReason[395],
                        'Notes': replacementNotes[395] = 'null' ? 'No replacement notes' : replacementNotes[395]
                    },
                ]
                $table2.bootstrapTable({ data: data })
                $table2.bootstrapTable('load', data)
            })

        })


    }

})


