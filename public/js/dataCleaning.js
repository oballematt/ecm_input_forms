
let data = []
let attributes


$(document).ready(() => {


    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)

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
    })

    let $table = $('#table')
    let $table2 = $('#table2')
    let $button = $('#button')
    let $button2 = $('#button2')
    let $button3 = $('#button3')
    let container = $('#row-container')

    $('#filterBy').on('change', function () {
        $table.bootstrapTable('filterBy', {
            building_abbreviation: $(this).val(),
        });
    })
    $('.reset').on('click', function () {
        $table.bootstrapTable('filterBy', {});
        $('#filterBy').val('Filter By')
    })

    $(function () {
        let isChecked = false
        $table.on('change', $('input[name="btSelectItem"]'), function () {
            isChecked = true;
            data = []
        })
        $button.click(function () {
            if (isChecked === false) {
                alert('Please select a meter')
            }
            else {
                let modelStart = new Date()
                let modelEnd = new Date()
                let analysisStart = new Date()
                let analysisEnd = new Date()

                modelStart.setDate(1)
                modelStart.setMonth(modelStart.getMonth() - 1)
                modelStart.setYear(modelStart.getFullYear() - 1)

                modelEnd.setDate(1)
                modelEnd.setMonth(modelEnd.getMonth() - 1)
                modelEnd.setYear(modelEnd.getFullYear() - 1)
                modelEnd.setDate(+364)

                analysisStart.setDate(1)
                analysisStart.setMonth(analysisStart.getMonth() - 1);

                analysisEnd.setDate(0)
                analysisEnd.setMonth(analysisEnd.getMonth())

                $('.modelStart').datepicker('setDate', modelStart)
                $('.modelEnd').datepicker('setDate', modelEnd)
                $('.analysisStart').datepicker('setDate', analysisStart)
                $('.analysisEnd').datepicker('setDate', analysisEnd)

                data.push($table.bootstrapTable('getSelections'))
                $('.disabled').attr('disabled', false)
                $('.meterSelection').html(`${data[0][0].meter}`)

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

    let replaceData

    $button3.click(function () {
        replaceData = $table2.bootstrapTable('getSelections')
        console.log(replaceData)
        if (replaceData.length === 0) {
            alert('Please select at least one option')
        } else {
            container.show()
            $('.submit').show()
            $('#reason').removeAttr('disabled')
            $('#notes').removeAttr('disabled')
            $('#reason').val('meter issue')

            replaceData.forEach(function (item) {
                $("#replaceTable").append(
                    `<tr class="text-end">
                    <td>
                        ${item.Date}
                    </td>
                    <td>
                        ${item.Meter}
                    </td>
                    <td>
                        ${item.Expected}
                    </td>
                </tr>`)

            })

            $("#reason").on('change', function () {
                $('#replaceTable').empty()
                if ($(this).val() != 'meter issue') {
                    $('.replaceReason').html('Reason')
                    replaceData.forEach(function (item) {
                        $("#replaceTable").append(
                            `<tr class="text-end">
                            <td>
                                ${item.Date}
                            </td>
                            <td>
                                ${item.Meter}
                            </td>
                            <td>
                                ${$('#reason').val()}
                            </td>
                        </tr>`)
                    })
                } else {
                    $('.replaceReason').html('Replacement Value')
                    replaceData.forEach(function (item) {
                        $("#replaceTable").append(
                            `<tr class="text-end">
                            <td>
                                ${item.Date}
                            </td>
                            <td>
                                ${item.Meter}
                            </td>
                            <td>
                                ${item.Expected}
                            </td>
                        </tr>`)
                    })

                }
            })
        }
    })

    $.ajax({
        type: 'POST',
        url: '/buildings',
        data: { steward: $('.user').text().trim() }
    }).then(function (response) {
        console.log(response)
        if (response.length === 0) {
            $('.allBuildings').show()
        } else {
            response.map(a => {
                $('#filterBy').append(`<option>${a.building}</option>`)
            })
        }
    })

    $('.submit').on('click', function (e) {
        e.preventDefault()
        let notes = []
        let reason = []
        let values = []
        let date = []
        const buildingNumber = data[0][0].building_number
        const commodityTag = data[0][0].commodity_tag
        const meter = data[0][0].meter
        if ($('#reason').val() === 'meter issue') {

            replaceData.forEach(function (item) {
                if ($('#notes').val() === '') {
                    notes.push(null)
                } else {
                    notes.push($('#notes').val())
                }

                reason.push($('#reason').val())
                values.push(parseFloat(item.Expected))
                date.push(item.Date)
            })
        } else {

            replaceData.forEach(function (item) {
                if ($('#notes').val() === '') {
                    notes.push(null)
                } else {
                    notes.push($('#notes').val())
                }

                reason.push($('#reason').val())
                values.push(null)
                date.push(item.Date)
            })
        }
        console.log(notes)
        console.log(reason)
        console.log(values)
        console.log(date)
        $('.overlayMessage').text('Submitting Data. Please wait...')

        $.ajax({
            url: `https://c074vo0soh.execute-api.us-east-1.amazonaws.com/beta/building_meter_replacement`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "analyst": $('.email').text().trim(),
                "building_number": buildingNumber,
                "commodity_tag": commodityTag,
                "meter": meter,
                "data": {
                    "timestamp": date,
                    "value": values,
                    "reason": reason,
                    "notes": notes,
                }
            }),
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
                if (jqXhr.status === 400) {
                    alert("Invalid Request. Please try again.")
                    $('#overlay').fadeOut()
                }
                if (jqXhr.status === 504) {
                    $('#overlay').fadeOut()
                    alert('Server Error. Please submit your data again.')
                }
            }
        }).then(() => {
            $('#replaceTable').empty()
            $('#overlay').fadeOut()
            $('.overlayMessage').text('Getting data, this will take a few seconds')
            notes = []
            date = []
            values = []
            reason = []
            $table2.bootstrapTable('uncheckAll')
            toast.show()
        })

    })

    let meterAttributes = false

    const submitAttributes = () => {

        let str = $('.autoIgnored').text()
        let newStr = str.substring(0, str.length - 1)

        const meterVariable = $('.meterVariable').text()
        const baseTemp = $('.baseTemp').text()
        const autoIgnored = Number(newStr)
        const slope = $('.slope').text()
        const intercept = $('.intercept').text()
        const r2 = $('.r2').text()
        const stdDev = $('.stdDev').text()
        const trainStart = $('.modelStart').val()
        const trainEnd = $('.modelEnd').val()

     
        if (attributes.length === 0 || attributes[0].base_temperature !== Number(baseTemp) || attributes[0].intercept !== Number(intercept) || attributes[0].slope !== Number(slope)
            || attributes[0].auto_ignored_percentage !== autoIgnored || attributes[0].r2 !== Number(r2) || attributes[0].std !== Number(stdDev) ||
            attributes[0].train_start !== trainStart || attributes[0].train_end !== trainEnd) {
            const confirmSubmit = confirm(`Do you want to submit the current meter attributes for meter: ${$('.currentMeter').text()}

            \u2022 Variable: ${meterVariable}
            \u2022 Base Temp: ${baseTemp}
            \u2022 Auto Ignored: ${autoIgnored}
            \u2022 Slope: ${slope}
            \u2022 Intercept: ${intercept}
            \u2022 R-Squared: ${r2}
            \u2022 Std Dev: ${stdDev}`)


            if (confirmSubmit === true) {

                $.ajax({
                    dataType: 'json',
                    contentType: 'application/json',
                    type: 'POST',
                    url: 'https://c074vo0soh.execute-api.us-east-1.amazonaws.com/beta/model',
                    data: JSON.stringify({
                        building_number: $('.currentBuilding').text(),
                        meter: $('.currentMeter').text(),
                        commodity_tag: $('.currentCommodity').text(),
                        train_start: $('.modelStart').val(),
                        train_end: $('.modelEnd').val(),
                        x: $('.meterVariable').text().toLowerCase(),
                        auto_ignored_percentage: Number(autoIgnored),
                        base_temperature: Number($('.baseTemp').text()) === 0 ? null : Number($('.baseTemp').text()),
                        r2: Number($('.r2').text()),
                        slope: Number($('.slope').text()),
                        intercept: Number($('.intercept').text()),
                        std: Number($('.stdDev').text())
                    })
                }).then(function (response) {
                    console.log(response)
                })
            }
        }
    }

    const getAttributes = function () {

        const getData = {
            meter: $('.currentMeter').text(),
        }
        $.ajax({
            type: 'POST',
            url: '/getAttributes',
            data: getData
        }).then((response) => {
            attributes = response
            console.log(attributes)

        })
    }

    $(".apiGateway").on("click", function (e) {
        e.preventDefault();

        if (data.length === 0) {
            alert('No meter selected. Please click "Confirm Meter Selection" to confirm your selected meter')
            $('#overlay').hide()
        } else {
            if (meterAttributes === true) {
                submitAttributes()
            }
            $('#chartData').load(location.href + " #chartData")
            $('#chartData2').load(location.href + " #chartData2")
            $('#chartData3').load(location.href + " #chartData3")
            modelApi()

        }
    })

    const modelApi = function () {
        const modelStart = $('.modelStart').val()
        const modelEnd = $('.modelEnd').val()
        const analysisStart = $('.analysisStart').val()
        const analysisEnd = $('.analysisEnd').val()

        $.ajax({
            url: `https://c074vo0soh.execute-api.us-east-1.amazonaws.com/beta/model?building_number=${data[0][0].building_number}&commodity_tag=${data[0][0].commodity_tag}&meter=${data[0][0].meter}&train_start=${modelStart}&train_end=${modelEnd}&analysis_start=${analysisStart}&analysis_end=${analysisEnd}`,
            method: 'GET',
            error: function (xhr, status, error) {
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
            meterAttributes = true
            $('.expand').show()
            let lowLimit = obj.model.data.predicted_value_lower_bound.slice(365)
            let xTemp = obj.model.data.average_dry_bulb_temperature.slice(365)
            let highLimit = obj.model.data.predicted_value_upper_bound.slice(365)
            let rawValue = obj.model.data.raw_value.slice(365)
            let xtimestamp = obj.model.data.timestamp.slice(365)
            let result = {}
            let result2 = {}
            console.log(obj)
            $('.overlayMessage').text('Getting data, this will take a few seconds')
            $('#overlay').fadeOut()
            $('.baseTemp').html(obj.model.base_temperature)
            $('.autoIgnored').html(parseFloat(obj.model.missing_value.auto_ignored_percentage).toFixed(0) + '%')
            $('.slope').html(parseFloat(obj.model.slope).toFixed(2))
            $('.intercept').html(parseFloat(obj.model.intercept).toFixed(2))
            $('.r2').html(parseFloat(obj.model.max_train_r2).toFixed(2))
            $('.stdDev').html(parseFloat(obj.model.std.train).toFixed(2))
            $('.meterVariable').html(obj.model.x.toUpperCase())
            $('.currentMeter').text(data[0][0].meter)
            $('.currentBuilding').text(data[0][0].building_number)
            $('.currentCommodity').text(data[0][0].commodity_tag)
            $('#tableData').show()
            getAttributes()

            xTemp.forEach((key, i) => result[key] = lowLimit[i])

            var lowLimitArr = Object.keys(result).map(function (key) {
                return [Number(key), result[key]];
            })
            lowLimitArr.sort(function (a, b) {
                return a[0] - b[0]
            })


            xTemp.forEach((key, i) => result[key] = highLimit[i])

            let highLimitArr = Object.keys(result).map(function (key) {
                return [Number(key), result[key]]
            })

            highLimitArr.sort(function (a, b) {
                return a[0] - b[0]
            })


            xTemp.forEach((key, i) => {
                result[key] = rawValue[i]
            })
            console.log(result)

            let RawValueArr = Object.keys(result).map(function (key) {
                return [Number(key), result[key]]
            })

            RawValueArr.sort(function (a, b) {
                return a[0] - b[0]
            })


            const config = {
                data: {
                    datasets: [{
                        type: "scatter",
                        label: "Meter VS. Temp",
                        data: RawValueArr.map(a => { return { x: a[0], y: a[1] } }),
                        backgroundColor: '#00FFFF',
                        pointRadius: 5,
                    }, {
                        type: 'line',
                        label: 'High Limit',
                        data: highLimitArr.map(a => { return { x: a[0], y: a[1] } }),
                        fill: false,
                        pointRadius: 0,
                        tension: 0.1,
                        borderColor: 'white',

                    },
                    {
                        type: 'line',
                        label: 'Low Limit',
                        data: lowLimitArr.map(a => { return { x: a[0], y: a[1] } }),
                        fill: false,
                        pointRadius: 0,
                        tension: 0.1,
                        borderColor: '#ffcc66',
                    }
                    ]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: 'white'
                            },
                            grid: {

                                color: 'black'

                            }

                        },
                        x: {
                            ticks: {
                                color: 'white'
                            },
                            grid: {

                                color: 'black'

                            }
                        },


                    },
                    onClick(e) {
                        const activePoints = myChart.getElementsAtEventForMode(e, 'nearest', {
                            intersect: true
                        }, false)
                        const [{
                            index
                        }] = activePoints;
                        console.log(config.data.datasets[0].data[index]);
                    }
                }

            };
            let ctx = document.getElementById('myChart').getContext('2d');
            let myChart = new Chart(ctx, config);

            let ctx3 = document.getElementById('myChart3').getContext('2d');
            let myChart3 = new Chart(ctx3, config);

            xtimestamp.forEach((key, i) => result2[key] = rawValue[i])

            let rawValueArr2 = Object.keys(result2).map(function (key) {
                return [String(key), result2[key]];
            })

            rawValueArr2.sort(function (a, b) {
                return a[0] - b[0]
            })

            xtimestamp.forEach((key, i) => result2[key] = highLimit[i])
            let highLimitArr2 = Object.keys(result2).map(function (key) {
                return [String(key), result2[key]]
            })
            highLimitArr2.sort(function (a, b) {
                return a[0] - b[0]
            })

            xtimestamp.forEach((key, i) => result2[key] = lowLimit[i])
            var lowLimitArr2 = Object.keys(result2).map(function (key) {
                return [String(key), result2[key]];
            })
            lowLimitArr2.sort(function (a, b) {
                return a[0] - b[0]
            })
            const config2 = {

                data: {
                    datasets: [
                        {
                            type: 'scatter',
                            label: "Meter VS. Dates",
                            data: rawValueArr2.map(a => { return { x: a[0], y: a[1] } }),
                            pointRadius: 5,
                            backgroundColor: '#00FFFF',
                        }, {
                            type: 'line',
                            label: 'High Limit',
                            data: highLimitArr2.map(a => { return { x: a[0], y: a[1] } }),
                            fill: false,
                            pointRadius: 0,
                            borderColor: 'white',
                            tension: 0.1
                        }, {
                            type: 'line',
                            label: 'Low Limit',
                            data: lowLimitArr2.map(a => { return { x: a[0], y: a[1] } }),
                            fill: false,
                            pointRadius: 0,
                            borderColor: '#ffcc66',
                            tension: 0.1
                        }

                    ]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            },
                            ticks: {
                                color: 'white'
                            },
                            grid: {

                                color: 'black'

                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: 'white'
                            },
                            grid: {

                                color: 'black'

                            }

                        }
                    }

                }
            };
            let ctx2 = document.getElementById('myChart2').getContext('2d');
            let myChart2 = new Chart(ctx2, config2);

            let ctx4 = document.getElementById('myChart4').getContext('2d');
            let myChart4 = new Chart(ctx4, config2);

            $(function () {

                let dates = obj.model.data.timestamp.slice(365)
                let temperature = obj.model.data.average_dry_bulb_temperature.slice(365)
                let hdd = obj.model.data.degree_day ? obj.model.data.degree_day.slice(365) : 'No Value'
                let meter = obj.model.data.raw_value.slice(365)
                let expected = obj.model.data.predicted_value.slice(365)
                let replacement = obj.model.data.replacement_value.slice(365)
                let reason = obj.model.data.replacement_reason.slice(365)
                let notes = obj.model.data.replacement_notes.slice(365)


                let data = dates.map((date, index) => {
                    return {
                        'Date': date,
                        'Temperature': temperature[index],
                        'HDD': hdd === 'No Value' ? hdd : parseFloat(hdd[index]).toFixed(0),
                        'Meter': meter[index],
                        'Expected': parseFloat(expected[index]).toFixed(0),
                        'Replacement': replacement[index],
                        'Reason': reason[index],
                        'Notes': notes[index],
                    }
                })

                $table2.bootstrapTable({ data: data })
                $table2.bootstrapTable('load', data)

            })

        })
    }

})


