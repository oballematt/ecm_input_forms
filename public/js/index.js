$(document).ready(() => {

    const getPid = localStorage.getItem('pid')

    $(".project_id").val(getPid)

    $("#formData").on('submit', () => {
        localStorage.setItem('pid', $(".pid").val())
    })

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
            errors.push({ text: "please enter a project id" })
        }
        if (!data.imp_or_ann) {
            errors.push({ text: "please select an option" })
        }
        if (!data.category) {
            errors.push({ text: "please select an option" })
        }
        if (!data.cost) {
            errors.push({ text: "please enter a value for cost" })
        }
        if (!data.hours) {
            errors.push({ text: "please enter a value for hours" })

            if (errors.length > 0) {
                for (var item in errors) {
                    $("#errors").append("<p style=\"border: 1px solid black;\">" + errors[item].text + '</p>')
                }
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
            )
        }
    })

    $('#tableData').on('click', 'button.addRowF', function (e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = []
        let data = {
            project_id: $(".project_id").last().val(),
            source: $(".source").last().val(),
            implementation: $(".implementation").last().val(),
            annual: $(".annual").last().val(),
        }
        if (!data.project_id) {
            errors.push({ text: "please enter a project id" })
        }
        if (!data.source) {
            errors.push({ text: "please select an option for source" })
        }
        if (!data.implementation) {
            errors.push({ text: "please enter a value for implementation" })
        }
        if (!data.annual) {
            errors.push({ text: "please enter a value for annual" })
        }

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black;\">" + errors[item].text + '</p>')
            }

        } else {
            $.ajax({
                url: '/fundings',
                type: 'POST',
                data: data
            }).then(
                cloneRow.clone().appendTo('#tableData tbody').find(".implementation, .annual").val(''),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/baseline')
            )
        }
    })

    $('#tableData').on('click', 'button.addRowB', function (e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = []
        let data = {
            project_id: $(".project_id").last().val(),
            commodity: $(".commodity").last().val(),
            unit: $(".unit").last().val(),
            value: $(".value").last().val(),
        }

        if (!data.project_id) {
            errors.push({ text: "please enter a project id" })
        }
        if (!data.commodity) {
            errors.push({ text: "please select an option for commodity" })
        }
        if (!data.unit) {
            errors.push({ text: "please enter an option for unit" })
        }
        if (!data.value) {
            errors.push({ text: "please enter a value" })
        }

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black;\">" + errors[item].text + '</p>')
            }

        } else {
            $.ajax({
                url: '/baseline',
                type: 'POST',
                data: data
            }).then(
                cloneRow.clone().appendTo('#tableData tbody').find(".value").val(''),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/savings')
            )
        }

    })

    $('#tableData').on('click', 'button.addRowS', function (e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = []
        let data = {
            project_id: $(".project_id").last().val(),
            phase: $(".phase").last().val(),
            commodity: $(".commodity").last().val(),
            unit: $(".unit").last().val(),
            value: $(".value").last().val()
        }
        if (!data.project_id) {
            errors.push({ text: "please enter a project id" })
        }
        if (!data.phase) {
            errors.push({ text: "please select an option for phase" })
        }
        if (!data.commodity) {
            errors.push({ text: "please select an option for commodity" })
        }
        if (!data.unit) {
            errors.push({ text: "please select an option for unit" })
        }
        if (!data.value) {
            errors.push({ text: "please enter a value" })
        }

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black;\">" + errors[item].text + '</p>')
            }

        } else {
            $.ajax({
                url: '/savings',
                type: 'POST',
                data: data
            }).then(
                cloneRow.clone().appendTo('#tableData tbody').find(".value").val(''),
                $("#finish").removeAttr('disabled'),
                $("#link").attr('href', '/')
            )
        }

    })

    $("#finish").on("click", () => {
        localStorage.clear();
    })
})