let startDate
let endDate
$(document).ready(() => {

    $.ajax({
        url: '/getAlarm',
        type: 'GET',
        data: {
            endTimestamp: '2021-03-11',
            startTimestamp: '2020-11-30',
            dayThreshold: 1,
            analyst: 'grace.hsieh@austin.utexas.edu'
        }
    }).then(response => {
        $('.ring').hide()
        console.log(response)
        $('.display').show()

        var $table = $('#table3')

        $(function () {
            let building = response.body.building_abbreviation
            let commodity = response.body.commodity_tag
            let meter = response.body.meter
            let startDate = response.body.start_timestamp
            let endDate = response.body.end_timestamp
            let daysOutOfRange = response.body.out_of_bound_day_count
            let deviationAvg = response.body.average_percentage_error
            let deviationMax = response.body.maximum_percentage_error
            let data = building.map((bldg, index) => {

                return {
                    'building': bldg,
                    'commodity': commodity[index],
                    'meter': meter[index],
                    'start_date': startDate[index],
                    'end_date': endDate[index],
                    'days_out_of_range': daysOutOfRange[index],
                    'deviation_avg': parseFloat(deviationAvg[index]).toFixed(2),
                    'deviation_max': parseFloat(deviationMax[index]).toFixed(2),
                }

            })
            $table.bootstrapTable({ data: data })
        })
    })



    $(function () {

        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            startDate = start.format('YYYY-MM-DD')
            endDate = end.format('YYYY-MM-DD')
        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end)

    });


    $('#daterange').on('click', function () {
        $(this).html(` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>`)
        $(this).prop("disabled", true)
        $.ajax({
            url: '/getAlarm',
            type: 'GET',
            data: {
                startTimestamp: startDate,
                endTimestamp: endDate,
                dayThreshold: 1,
                analyst: 'grace.hsieh@austin.utexas.edu'
            }
        }).then((response) => {
            console.log(response)
            $(this).prop("disabled", false);
            $(this).html('Run')
            var $table = $('#table3')
            $(function () {

                let building = response.body.building_abbreviation
                let commodity = response.body.commodity_tag
                let meter = response.body.meter
                let startDate = response.body.start_timestamp
                let endDate = response.body.end_timestamp
                let daysOutOfRange = response.body.out_of_bound_day_count
                let deviationAvg = response.body.average_percentage_error
                let deviationMax = response.body.maximum_percentage_error
                let data = building.map((bldg, index) => {

                    return {
                        'building': bldg,
                        'commodity': commodity[index],
                        'meter': meter[index],
                        'start_date': startDate[index],
                        'end_date': endDate[index],
                        'days_out_of_range': daysOutOfRange[index],
                        'deviation_avg': parseFloat(deviationAvg[index]).toFixed(2),
                        'deviation_max': parseFloat(deviationMax[index]).toFixed(2),
                    }

                })
                $table.bootstrapTable('load', data)
            })
        })

    })


})