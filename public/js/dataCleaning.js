
let data = []
let attributes
let analysisIndex
let replaceData = []
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
    })

    let $table = $('#table')
    let $table2 = $('#table2')
    let $button = $('#button')
    let $button3 = $('#button3')

    $('#filterBy').on('change', function () {
        $table.bootstrapTable('filterBy', {
            building_number: $(this).val(),
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

    })

    $('.pointer').on('click', function () {
        $('#filterBy').empty()
        const steward = $(this).text()
        $.ajax({
            type: 'POST',
            url: '/buildings',
            data: { steward: steward }
        }).then(function (response) {
            console.log(response)
            $('#filterBy').append('<option selected disabled>Choose...</option>')
            response.map(a => {
                $('#filterBy').append(`<option value=${a.building_id}>${a.building}</option>`)
            })
            $('.dropdown-toggle').text(steward)
        })

    })


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
            $('.tableData').load(location.href + " .tableData")
            modelApi()

        }
    })

    const modelApi = function () {
        const modelStart = $('.modelStart').val()
        const modelEnd = $('.modelEnd').val()
        const analysisStart = $('.analysisStart').val()
        const analysisEnd = $('.analysisEnd').val()

        $.ajax({
            url: '/gateway',
            method: 'GET',
            data: {
                buildingNumber: data[0][0].building_number,
                commodity: data[0][0].commodity_tag,
                meter: data[0][0].meter,
                trainStart: modelStart,
                trainEnd: modelEnd,
                analysisStart: analysisStart,
                analysisEnd: analysisEnd
            },
            error: function (xhr, status, error, response) {
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
            if (response === 'Request failed with status code 504' || response === 'Request failed with status code 500') {
                modelApi()
                $('.overlayMessage').text('Server not responding, trying your search again. Please do not refresh the page')
            } else if (response === 401) {
                alert('You are not authorized')
            } else {
                $('#reportrange span').html('Select a Date Range');
                $('.displayData').show()
                console.log(response)
                meterAttributes = true
                const analysisIndex = response.body.model.data.timestamp.indexOf($('.analysisStart').val())
                let lowLimit = response.body.model.data.predicted_value_lower_bound.slice(analysisIndex)
                let xTemp = response.body.model.data.average_dry_bulb_temperature.slice(analysisIndex)
                let highLimit = response.body.model.data.predicted_value_upper_bound.slice(analysisIndex)
                let rawValue = response.body.model.data.raw_value.slice(analysisIndex)
                let xtimestamp = response.body.model.data.timestamp.slice(analysisIndex)
                let result = {}
                let result2 = {}
                $('.overlayMessage').text('Getting data, this will take a few seconds')
                $('#overlay').fadeOut()
                $('.baseTemp').html(response.body.model.base_temperature)
                $('.autoIgnored').html(parseFloat(response.body.model.missing_value.auto_ignored_percentage).toFixed(0) + '%')
                $('.slope').html(parseFloat(response.body.model.slope).toFixed(2))
                $('.intercept').html(parseFloat(response.body.model.intercept).toFixed(2))
                $('.r2').html(parseFloat(response.body.model.max_train_r2).toFixed(2))
                $('.stdDev').html(parseFloat(response.body.model.std.train).toFixed(2))
                $('.meterVariable').html(`Variable: ${response.body.model.x.toUpperCase()}`)
                $('.currentMeter').text(data[0][0].meter)
                $('.currentBuilding').text(data[0][0].building_number)
                $('.currentCommodity').text(data[0][0].commodity_tag)
                $('.currentVariable').text(response.body.model.x)
                getAttributes()
                const toFindDuplicates = xTemp => xTemp.filter((item, index) => xTemp.indexOf(item) !== index)
                const duplicateElements = toFindDuplicates(xTemp);
                console.log(duplicateElements);

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

                if (data[0][0].commodity_tag === 'W') {
                    $('#hideIfWater').hide()
                    $('#fullWidth').attr('class', 'col-xxl-12')
                    $('#myChart2').css('height', '400px')
                }
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
                            console.log(config.data.datasets[0].data[index].y);
                            var $container = $('.scroll'),
                                $scrollTo = $('#' + config.data.datasets[0].data[index].y)
                            $container.animate({
                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - ($container.height() / 2)
                            });
                            $scrollTo.parent('tr').effect('highlight', {}, 3000)
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
                        },
                        onClick(e) {
                            const activePoints = myChart2.getElementsAtEventForMode(e, 'nearest', {
                                intersect: true
                            }, false)
                            const [{
                                index
                            }] = activePoints;
                            console.log(config2.data.datasets[0].data[index].y);
                            var $container = $('.scroll'),
                                $scrollTo = $('#' + config2.data.datasets[0].data[index].y)
                            $container.animate({
                                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - ($container.height() / 2)
                            });
                            $scrollTo.parent('tr').effect('highlight', {}, 3000)
                        }

                    }
                };
                let ctx2 = document.getElementById('myChart2').getContext('2d');
                let myChart2 = new Chart(ctx2, config2);

                let ctx4 = document.getElementById('myChart4').getContext('2d');
                let myChart4 = new Chart(ctx4, config2);


                $(function () {
                    let endTime
                    let startTime

                    function cb(start, end) {
                        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                        endTime = end.format('YYYY-MM-DD')
                        startTime = start.format('YYYY-MM-DD')
                        $('.consumptionSpinner').append(`<div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span> </div>`)
                    }

                    $('#reportrange').daterangepicker({
                        linkedCalendars: false,
                        showDropdowns: true,
                        autoApply: true,
                        autoUpdateInput: false
                    }, cb);

                    $('.dateRange').on('click', function () {
                        $(this).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...`)
                        consumptionApi()
                    })

                    const consumptionApi = () => {
                        const buildingNumber = data[0][0].building_number
                        const commodity = data[0][0].commodity_tag
                        const meter = data[0][0].meter
                        $.ajax({
                            url: '/getConsumption',
                            method: 'GET',
                            data: {
                                buildingNumber: buildingNumber,
                                commodity: commodity,
                                meter: meter,
                                startTimestamp: startTime,
                                endTimestamp: endTime
                            }
                        }).then(function (response) {
                            console.log(response);
                            if (response === 'Request failed with status code 504') {
                                consumptionApi()
                            } else {
                                $('.dateRange').html('Run')
                            }
                        })
                    }


                });


                $(function () {
                    const dates = response.body.model.data.timestamp.slice(analysisIndex)
                    const temperature = response.body.model.data.average_dry_bulb_temperature.slice(analysisIndex)
                    const x = response.body.model.data.degree_day.slice(analysisIndex)
                    const meter = response.body.model.data.raw_value.slice(analysisIndex)
                    const expected = response.body.model.data.predicted_value.slice(analysisIndex)
                    const replacement = response.body.model.data.replacement_value.slice(analysisIndex)
                    const reason = response.body.model.data.replacement_reason.slice(analysisIndex)
                    const notes = response.body.model.data.replacement_notes.slice(analysisIndex)
                    const lowerBound = response.body.model.data.predicted_value_lower_bound.slice(analysisIndex)
                    const upperBound = response.body.model.data.predicted_value_upper_bound.slice(analysisIndex)

                    dates.map((date, index) => {
                        $('.tableBody').append(`
                    <tr>
                        <td class='position'><input class="form-check-input edit" name='edit' type="checkbox"></td>
                        <td class='date'>${date}</td>
                        <td>${temperature[index]}</td>
                        <td>${x[index] === null ? '-' : parseFloat(x[index]).toFixed(0)}</td>
                        <td id=${meter[index]} class='meterReading'>${meter[index]}</td>
                        <td class='expected'>${parseFloat(expected[index]).toFixed(0)}</td>
                        <td >${replacement[index] === null ? '-' : parseFloat(replacement[index]).toFixed(0)}</td>
                        <td>${reason[index] === null ? '-' : reason[index]}</td>
                        <td>${notes[index] === null ? '-' : notes[index]}</td>
                        <td class="upperBound" style='display: none'>${parseFloat(upperBound[index]).toFixed(0)}</td>
                        <td class="lowerBound" style='display: none'>${parseFloat(lowerBound[index]).toFixed(0)}</td>
                    </tr>`)
                    })
                    $('.tableData tbody tr').on('click', function () {
                        console.log($(this).index())
                    })
                    $('.x').html(response.body.model.x.toUpperCase())
                    $('.tableData tbody tr').each(function () {
                        let meterReading = $(this).find('.meterReading').html()
                        let lowerBound = $(this).find('.lowerBound').html()
                        let upperBound = $(this).find('.upperBound').html()
                        if (parseInt(meterReading, 10) < parseInt(lowerBound, 10)) {
                            $(this).addClass('table-warning')
                            if ($(this).index() === 0) {
                                $(this).children('td:eq(0)').append(`<a href="#" class="warning firstRow" data-tool-tip="Low Limit: ${lowerBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`)

                            } else {
                                $(this).children('td:eq(0)').append(`<a href="#" class="warning" data-tool-tip="Low Limit: ${lowerBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`)
                            }
                        }

                        if (parseInt(meterReading, 10) > parseInt(upperBound, 10)) {
                            $(this).addClass('table-danger')
                            if ($(this).index() === 0) {
                                $(this).children('td:eq(0)').append(`<a href="#" class="warning firstRow" data-tool-tip="High Limit: ${upperBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`)
                            } else {
                                $(this).children('td:eq(0)').append(`<a href="#" class="warning" data-tool-tip="High Limit: ${upperBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`)
                            }
                        }

                        if ($(this).children('td:eq(4)').text() === $(this).next().children('td:eq(4)').text()) {
                            $(this).addClass('table-primary')
                            $(this).next().addClass('table-primary')
                        }
                    })

                })
            }
        })
    }

    $('#reason').on('change', function () {
        $button3.removeAttr('disabled')
    })
    $button3.click(function () {
        $('input:checkbox:checked', $('.tableData')).each(function () {
            replaceData.push({ 'Date': $(this).closest('tr').find('.date').text(), "Expected": $(this).closest('tr').find('.expected').text() })
        }).get()

        let checked = $('#replace').is(':checked')
        let notes = []
        let reason = []
        let values = []
        let timestamp = []
        const analyst = $('.email').text().trim()
        const building_number = data[0][0].building_number
        const commodity_tag = data[0][0].commodity_tag
        const meter = data[0][0].meter
        console.log(replaceData)
        if (replaceData.length === 0) {
            alert('Please select at least one date')
            $('#overlay').hide()
        } else {
            if (checked === true) {
                replaceData.forEach(function (item) {
                    if ($('#notes').val() === '') {
                        notes.push(null)
                    } else {
                        notes.push($('#notes').val())
                    }
                    reason.push($('#reason').val())
                    values.push(parseFloat(item.Expected))
                    timestamp.push(item.Date)
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
                    timestamp.push(item.Date)
                })
            }
            console.log(timestamp)
            console.log(notes)
            console.log(reason)
            console.log(values)
            $('.overlayMessage').text('Submitting Data. Please wait...')
            $.ajax({
                url: '/postGateway',
                method: 'POST',
                data: {
                    analyst: analyst,
                    building_number: building_number,
                    commodity_tag: commodity_tag,
                    meter: meter,
                    timestamp: JSON.stringify(timestamp),
                    values: JSON.stringify(values),
                    reason: JSON.stringify(reason),
                    notes: JSON.stringify(notes)

                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                    if (jqXhr.status === 400) {
                        alert("Invalid Request. Please try again.")
                        $('#overlay').fadeOut()
                    }
                    if (jqXhr.status === 504) {
                        $('#overlay').fadeOut()
                        $('.edit').prop('checked', false)
                        alert('Server Error. Your data has been saved. Please hit the submit button again.')
                    }
                }
            }).then((response) => {
                console.log(response)
                $('#overlay').fadeOut()
                $('.overlayMessage').text('Getting data, this will take a few seconds')
                notes = []
                timestamp = []
                values = []
                reason = []
                replaceData = []
                $('.edit').prop('checked', false)
                $('#replace').prop('checked', false)
                $('#notes').val('')
                $('#reason').val('Choose...')
                $('.successAlert').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Your data has been successfully uploaded!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`)
                setTimeout(function () {
                    $('.successAlert').fadeOut()
                }, 2000)
            })
        }
    })

    $('.logout').click(function () {
        if (meterAttributes === true) {
            submitAttributes()
        }
    })

    let meterAttributes = false

    const submitAttributes = () => {

        let str = $('.autoIgnored').text()
        let newStr = str.substring(0, str.length - 1)
        const building_number = $('.currentBuilding').text()
        const meter = $('.currentMeter').text()
        const commodity_tag = $('.currentCommodity').text()
        const meterVariable = $('.meterVariable').text()
        const x = $('.currentVariable').text()
        let base_temperature = $('.baseTemp').text()
        const auto_ignored_percentage = Number(newStr)
        const slope = Number($('.slope').text())
        const intercept = Number($('.intercept').text())
        const r2 = Number($('.r2').text())
        const std = Number($('.stdDev').text())
        const train_start = $('.modelStart').val()
        const train_end = $('.modelEnd').val()

        if (base_temperature === '') {
            base_temperature = null
        } else {
            base_temperature = Number($('.baseTemp').text())
        }

        if (attributes.length === 0 || attributes[0].base_temperature !== base_temperature || attributes[0].intercept !== intercept || attributes[0].slope !== slope
            || attributes[0].auto_ignored_percentage !== auto_ignored_percentage || attributes[0].r2 !== r2 || attributes[0].std !== std ||
            attributes[0].train_start !== train_start || attributes[0].train_end !== train_end) {
            const confirmSubmit = confirm(`Do you want to submit the current meter attributes for meter: ${$('.currentMeter').text()}

            \u2022 Variable: ${meterVariable}
            \u2022 Base Temp: ${base_temperature}
            \u2022 Auto Ignored: ${auto_ignored_percentage}
            \u2022 Slope: ${slope}
            \u2022 Intercept: ${intercept}
            \u2022 R-Squared: ${r2}
            \u2022 Std Dev: ${std}`)


            if (confirmSubmit === true) {

                $.ajax({
                    type: 'POST',
                    url: '/postAttributes',
                    data: {
                        building_number: building_number,
                        meter: meter,
                        commodity_tag: commodity_tag,
                        train_start: train_start,
                        train_end: train_end,
                        x: x,
                        auto_ignored_percentage: auto_ignored_percentage,
                        base_temperature: base_temperature === 0 ? null : base_temperature,
                        r2: r2,
                        slope: slope,
                        intercept: intercept,
                        std: std
                    }
                }).then(function (response) {
                    console.log(response)
                })
            }
        }
    }
})


