$(document).ready(() => {
    
    $("#formData").on('submit', () => {
        localStorage.setItem('pid', $(".pid").val())
    });

    $('select[name="measure_type"]').on('change', () => {
        $(".pid").val($("#building").val() + ' ' + "2021" + ' ' + $("#measure_type").val())
        $(".pid").removeAttr("style")
    });

    const getPid = localStorage.getItem('pid');

    $(".project_id").val(getPid);
    
    $('#tableData').on('click', 'button.addRow', function (e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = [];
        let data = {
            project_id: $(".project_id").last().val(),
            imp_or_ann: $(".imp_or_ann").last().val(),
            category: $(".category").last().val(),
            cost: $(".cost").last().val(),
            hours: $(".hours").last().val()
        }
        if (!data.project_id) {
            errors.push({text: "please enter a project id"})
        } 
        if (!data.imp_or_ann) {
            errors.push({text: "please select an option for implementation or annual"})
        }
        if (!data.category) {
            errors.push({text: "please select an option for category"})
        }
        if (!data.cost) {
            errors.push({text: "please enter a value for cost (if the cost is unknown, please enter 0)"})
        }
        if (!data.hours) {
            errors.push({text: "please enter a value for hours"})
        }

        if (errors.length > 0){
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>')
            }
        } else {
            $.ajax({
                url: '/costs_hours',
                type: 'POST',
                data: data
            }).then(
                cloneRow.clone().appendTo('#tableData tbody').find(".cost, .hours").val(''),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/fundings'),
                console.log(data),
            )
        }
    })

    $('#tableData').on('click', 'button.addRowF', function (e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let data = {
            project_id: $(".project_id").last().val(),
            source: $(".source").last().val(),
            implementation: $(".implementation").last().val(),
            annual: $(".annual").last().val(),
        }
        $.ajax({
            url: '/fundings',
            type: 'POST',
            data: data
        }).then(
            cloneRow.clone().appendTo('#tableData tbody').find(".implementation, .annual").val(''),
            $("#next").removeAttr('disabled'),
            $("#link").attr('href', '/baseline')
        )
    })

    $('#tableData').on('click', 'button.addRowB', function (e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let data = {
            project_id: $(".project_id").last().val(),
            commodity: $(".commodity").last().val(),
            unit: $(".unit").last().val(),
            value: $(".value").last().val(),
        }
        $.ajax({
            url: '/baseline',
            type: 'POST',
            data: data
        }).then(
            cloneRow.clone().appendTo('#tableData tbody').find(".value").val(''),
            $("#next").removeAttr('disabled'),
            $("#link").attr('href', '/savings')
        )

    })

    $('#tableData').on('click', 'button.addRowS', function (e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let data = {
            project_id: $(".project_id").last().val(),
            phase: $(".phase").last().val(),
            commodity: $(".commodity").last().val(),
            unit: $(".unit").last().val(),
            value: $(".value").last().val()
        }
        $.ajax({
            url: '/savings',
            type: 'POST',
            data: data
        }).then(
            cloneRow.clone().appendTo('#tableData tbody').find(".value").val(''),
            $("#finish").removeAttr('disabled'),
            $("#link").attr('href', '/')
        )

    })

    $("#finish").on("click", () => {
        localStorage.clear();
    })


})