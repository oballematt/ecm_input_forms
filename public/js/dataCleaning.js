
let data = []
let attributes
let analysisIndex
let replaceData = []
let d = new Date()
let endTime = new Date().toISOString().slice(0, 10)
let startTime = new Date(d.getFullYear() - 2, d.getMonth() - 1, 1).toISOString().slice(0, 10)
let updateModelStart
let updateModelEnd
let meterAttributes = false
let outOfBoundsData

$(document).ready(() => {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
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
            $('#filterBy').append('<option selected disabled>Choose...</option>')
            response.map(a => {
                $('#filterBy').append(`<option value=${a.building_id}>${a.building}</option>`)
            })
            $('.dropdown-toggle').text(steward)
        })

    })


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
            $('#collapseRow').load(location.href + " #collapseRow")
            modelApi()

        }
    })

    const modelApi = function () {
        const modelStart = $('.modelStart').val()
        const modelEnd = $('.modelEnd').val()
        const analysisStart = $('.analysisStart').val()
        const analysisEnd = $('.analysisEnd').val()
        const buildingNumber = data[0][0].building_number
        const commodity = data[0][0].commodity_tag
        const meter = data[0][0].meter

        $.when($.ajax({
            url: '/getModel',
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
        }), $.ajax({
            url: '/getConsumption',
            method: 'GET',
            data: {
                buildingNumber: buildingNumber,
                commodity: commodity,
                meter: meter,
                startTimestamp: startTime,
                endTimestamp: endTime
            }

        }), $.ajax({
            type: 'POST',
            url: '/getAttributes',
            data: {
                meter: data[0][0].meter
            }
        })).then((response, response2, response3) => {
            if (response[0] === 'Request failed with status code 504' || response[0] === 'Request failed with status code 500' || response[0] === 'Request failed with status code 503' || response2[0] === 'Request failed with status code 504') {
                modelApi()
                $('.overlayMessage').text('Server not responding, trying your search again. Please do not refresh the page')
            } else if (response === 401) {
                alert('You are not authorized')
            } else {
                $('.displayData').show()
                console.log(response)
                console.log(response2)
                console.log(response3[0])
                if (response3[0].length === 0) {
                    $('.attributesSubmitted').html(`<h6 class="text-warning"><strong>Attributes have not been submitted for this meter</strong></h6>`)
                    meterAttributes = true

                } else if (response3[0][0].train_start === $('.currentStart').text() && response3[0][0].train_end === $('.currentEnd').text()) {
                    meterAttributes = false
                }

                if (response3[0].length === 1) {
                    $(".attributesSubmitted").html(`<h6 style="color: #00B74A"><strong>Last Saved Model: ${response3[0][0].train_end}</strong></h6>`)
                    meterAttributes = true

                }
                attributes = response3[0]
                const analysisIndex = response[0].body.model.data.timestamp.indexOf($('.analysisStart').val())
                let lowLimit = response[0].body.model.data.predicted_value_lower_bound.slice(analysisIndex)
                let xTemp = response[0].body.model.data.average_dry_bulb_temperature.slice(analysisIndex)
                let highLimit = response[0].body.model.data.predicted_value_upper_bound.slice(analysisIndex)
                let rawValue = response[0].body.model.data.raw_value.slice(analysisIndex)
                let xtimestamp = response[0].body.model.data.timestamp.slice(analysisIndex)
                let result = {}
                let result2 = {}
                $('.overlayMessage').text('Getting data, this will take a few seconds')
                $('#overlay').fadeOut()
                $('.baseTemp').html(response[0].body.model.base_temperature)
                $('.autoIgnored').html(parseFloat(response[0].body.model.missing_value.auto_ignored_percentage).toFixed(0) + '%')
                $('.slope').html(parseFloat(response[0].body.model.slope).toFixed(2))
                $('.intercept').html(parseFloat(response[0].body.model.intercept).toFixed(2))
                $('.r2').html(parseFloat(response[0].body.model.max_train_r2).toFixed(2))
                $('.stdDev').html(parseFloat(response[0].body.model.std.train).toFixed(2))
                $('.meterVariable').html(`Variable: ${response[0].body.model.x.toUpperCase()}`)
                $('.currentMeter').text(data[0][0].meter)
                $('.currentBuilding').text(data[0][0].building_number)
                $('.currentCommodity').text(data[0][0].commodity_tag)
                $('.currentVariable').text(response[0].body.model.x)
                $('.currentStart').text(modelStart)
                $('.currentEnd').text(modelEnd)

                console.log(xTemp)
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


                let RawValueArr = Object.keys(result).map(function (key) {
                    return [Number(key), result[key]]
                })

                RawValueArr.sort(function (a, b) {
                    return a[0] - b[0]
                })


                if (data[0][0].commodity_tag === 'W') {
                    $('#hideIfWater').hide()
                    $('#fullWidth').attr('class', 'col-xxl-12')
                }
                const config = {
                    data: {
                        datasets: [{
                            type: "scatter",
                            label: "Meter VS. Temp",
                            data: RawValueArr.map(a => { return { x: a[0], y: Math.trunc(a[1]) } }),
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
                        responsive: true,
                        maintainAspectRatio: false,
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
                                data: rawValueArr2.map(a => { return { x: a[0], y: Math.trunc(a[1]) } }),
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
                        responsive: true,
                        maintainAspectRatio: false,
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
                                    unit: 'day',
                                    tooltipFormat: 'MMM dd, yyyy'
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

                $(function () {
                    const dates = response[0].body.model.data.timestamp.slice(analysisIndex)
                    const temperature = response[0].body.model.data.average_dry_bulb_temperature.slice(analysisIndex)
                    const x = response[0].body.model.data.degree_day.slice(analysisIndex)
                    const occ = response[0].body.model.data.is_occupied.slice(analysisIndex)
                    const meter = response[0].body.model.data.raw_value.slice(analysisIndex)
                    const expected = response[0].body.model.data.predicted_value.slice(analysisIndex)
                    const replacement = response[0].body.model.data.replacement_value.slice(analysisIndex)
                    const reason = response[0].body.model.data.replacement_reason.slice(analysisIndex)
                    const notes = response[0].body.model.data.replacement_notes.slice(analysisIndex)
                    const lowerBound = response[0].body.model.data.predicted_value_lower_bound.slice(analysisIndex)
                    const upperBound = response[0].body.model.data.predicted_value_upper_bound.slice(analysisIndex)

                    dates.map((date, index) => {
                        $('.tableBody').append(`
                    <tr>
                        <td class='position'><input class="form-check-input edit" name='edit' type="checkbox"></td>
                        <td class='date'>${date}</td>
                        <td>${temperature[index]}</td>
                        <td>${$('.currentVariable').text() === 'occ' ? occ[index] : parseFloat(x[index]).toFixed(0)}</td>
                        <td id=${Math.trunc(meter[index])} class='meterReading'>${Math.trunc(meter[index])}</td>
                        <td class='expected'>${parseFloat(expected[index]).toFixed(0)}</td>
                        <td >${replacement[index] === null ? '-' : parseFloat(replacement[index]).toFixed(0)}</td>
                        <td>${reason[index] === null ? '-' : reason[index]}</td>
                        <td>${notes[index] === null ? '-' : notes[index]}</td>
                        <td class="upperBound" style='display: none'>${parseFloat(upperBound[index]).toFixed(0)}</td>
                        <td class="lowerBound" style='display: none'>${parseFloat(lowerBound[index]).toFixed(0)}</td>
                    </tr>`)
                    })
                    $('.x').html(response[0].body.model.x.toUpperCase())
                    $('.tableData tbody tr').each(function () {
                        let meterReading = $(this).find('.meterReading').html()
                        let lowerBound = $(this).find('.lowerBound').html()
                        let upperBound = $(this).find('.upperBound').html()
                        if (parseInt(meterReading, 10) < parseInt(lowerBound, 10)) {
                            $(this).css('background-color', '#F0AD4E')
                            if ($(this).index() === 0) {
                                $(this).children('td:eq(0)').append(`<a  href="#" class="warning firstRow" data-tool-tip="Low Limit: ${lowerBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`)
                            } else {
                                $(this).children('td:eq(0)').append(`<a  href="#" class="warning" data-tool-tip="Low Limit: ${lowerBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`)
                            }
                        }

                        if (parseInt(meterReading, 10) > parseInt(upperBound, 10)) {
                            $(this).css('background-color', '#d9534f')
                            if ($(this).index() === 0) {
                                $(this).children('td:eq(0)').append(`<a  href="#" class="warning firstRow" data-tool-tip="High Limit: ${upperBound}"><i class="fas fa-exclamation-circle fa-2x text-white"></i></a>`)
                            } else {
                                $(this).children('td:eq(0)').append(`<a  href="#" class="warning" data-tool-tip="High Limit: ${upperBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`)
                            }
                        }

                        if ($(this).children('td:eq(4)').text() === $(this).next().children('td:eq(4)').text()) {
                            $(this).css('background-color', '#0275d8')
                            $(this).next().css('background-color', '#0275d8')
                        }
                    })

                })


                const result3 = {}
                const xTimestamp2 = response2[0].body.timestamp
                const yValue = response2[0].body.value
                xTimestamp2.forEach((key, i) => result3[key] = yValue[i])

                const newArr = Object.keys(result3).map(function (key) {
                    return [String(key), result3[key]];
                })


                google.load('visualization', '1', { packages: ['controls', 'charteditor'] });
                google.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('date');
                    data.addColumn('number');

                    newArr.forEach((item) => {
                        data.addRow([new Date(item[0]), item[1]]);
                    })

                    var dash = new google.visualization.Dashboard(document.getElementById('dashboard'));

                    var control = new google.visualization.ControlWrapper({
                        controlType: 'ChartRangeFilter',
                        containerId: 'control_div',
                        state: {
                            range: {
                                start: new Date($('.modelStart').val()),
                                end: new Date($('.modelEnd').val())
                            }
                        },
                        options: {
                            filterColumnIndex: 0,
                            ui: {
                                chartType: 'ScatterChart',
                                chartOptions: {

                                    height: '100',
                                    width: '90%',
                                    colors: ['#15A0C8'],
                                    backgroundColor: {
                                        fill: '#48555F',

                                    },
                                    chartArea: {
                                        height: '100',
                                        width: '90%'
                                    },
                                    hAxis: {
                                        baselineColor: '#FFFFFF',
                                        gridlineColor: '#FFFFFF',
                                        textStyle: { color: '#FFF' }
                                    },

                                }
                            },

                        }
                    });
                    const chartOptions = {
                        legend: 'none',
                        tooltip: {
                            isHtml: true,
                            trigger: 'hover'
                        },
                        pointSize: 10,
                        dataOpacity: 1,
                        colors: ['#15A0C8'],
                        vAxis: {
                            baselineColor: '#000000',
                            gridlineColor: '#000000',
                            textStyle: { color: '#FFF' }
                        },
                        hAxis: {
                            baselineColor: '#000000',
                            gridlineColor: '#000000',
                            textStyle: { color: '#FFF' }
                        },
                        height: 600,
                        width: 1000,
                        backgroundColor: {
                            fill: '#48555F',

                        }
                    };

                    var chart = new google.visualization.ChartWrapper({
                        chartType: 'ScatterChart',
                        containerId: 'chart_div',
                        options: chartOptions
                    });

                    function setOptions(wrapper) {

                        wrapper.setOption('width', '90%');
                        wrapper.setOption('chartArea.width', '90%');

                    }

                    setOptions(chart);


                    dash.bind([control], [chart]);
                    $('.show-hide').on('click', function () {
                        const icon = this.querySelector('i');
                        const text = this.querySelector('span');
                        dash.draw(data);
                        if (icon.classList.contains('fa-eye')) {
                            icon.classList.remove('fa-eye');
                            icon.classList.add('fa-eye-slash');
                            text.innerHTML = 'Hide Historic';
                        } else {
                            icon.classList.remove('fa-eye-slash');
                            icon.classList.add('fa-eye');
                            text.innerHTML = 'Show Historic';
                        }
                    })

                    google.visualization.events.addListener(control, 'statechange', function () {
                        var v = control.getState();
                        document.getElementById('dbgchart').innerHTML = v.range.start.toISOString().slice(0, 10) + ' to ' + v.range.end.toISOString().slice(0, 10);
                        updateModelStart = v.range.start.toISOString().slice(0, 10)
                        updateModelEnd = v.range.end.toISOString().slice(0, 10)
                        return 0;

                    });


                }

                $('.clickbutton').on('click', () => {
                    $('.modelStart').val(updateModelStart)
                    $(".modelEnd").val(updateModelEnd)
                })
            }


        })

    }

    $('.meterAlarm').on('click', () => {
        window.open('/oobt')

    })



    $('#reason').on('change', function () {
        $button3.removeAttr('disabled')
    })
    $button3.click(function () {
        $('input:checkbox:checked', $('.tableData')).each(function () {
            replaceData.push({ 'Date': $(this).closest('tr').find('.date').text(), "Expected": $(this).closest('tr').find('.expected').text(), "index": $(this).closest('tr').index() })
        }).get()

        let checked = $('#replace').is(':checked')
        let notes = []
        let reason = []
        let values = []
        let timestamp = []
        const building_number = data[0][0].building_number
        const commodity_tag = data[0][0].commodity_tag
        const meter = data[0][0].meter
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

            $('.overlayMessage').text('Submitting Data. Please wait...')
            $.ajax({
                url: '/postModel',
                method: 'POST',
                data: {
                    building_number: building_number,
                    commodity_tag: commodity_tag,
                    meter: meter,
                    timestamp: JSON.stringify(timestamp),
                    values: JSON.stringify(values),
                    reason: JSON.stringify(reason),
                    notes: JSON.stringify(notes)

                },
                error: function (jqXhr, textStatus, errorThrown) {
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
                replaceData.forEach((item, i) => {
                    const row = $(`.tableData tbody tr:eq(${item.index})`);
                    const R = c => row.children(`td:eq(${c})`);
                    R(6).text(values[i] === null ? '-' : values[i]);
                    R(7).text(reason[i]);
                    R(8).text(notes[i] === null ? '-' : notes[i]);
                })
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
                $('.successAlert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Your data has been successfully uploaded!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`)

            })
        }
    })

    $('.logout').click(function () {
        if (meterAttributes === true) {
            submitAttributes()
        }
    })

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
        const train_start = $('.currentStart').text()
        const train_end = $('.currentEnd').text()

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
                }).then((response) => {

                })
            }
        }
    }
})


