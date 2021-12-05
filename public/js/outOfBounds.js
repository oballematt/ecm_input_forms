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
        $('.outOfBoundsTable').append(`
        <table style="color: white" id="table3" data-sort-name="%_deviation_avg"
        data-sort-order="desc">
            <thead>
                <tr>
                    <th data-field="building">Building</th>
                    <th data-field="commodity">Commodity</th>
                    <th data-field="meter">Meter</th>
                    <th data-sortable="true" data-field="start_date">Start Date</th>
                    <th data-sortable="true" data-field="end_date">End Date</th>
                    <th data-sortable="true" data-field="days_out_of_range">Days Out of Range</th>
                    <th data-sortable="true" data-field="%_deviation_avg">% Deviation (AVG)</th>
                    <th data-sortable="true" data-field="%_deviation_max">% Deviation (MAX)</th>
                </tr>
            </thead>
        </table>`)

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
                    '%_deviation_avg': deviationAvg[index],
                    '%_deviation_max': deviationMax[index],
                }

            })
            $table.bootstrapTable({ data: data })
        })
    })

})