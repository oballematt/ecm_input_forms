$(document).ready(() => {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $("#formData").on('submit', () => {
        localStorage.setItem('pid', $(".pid").val())
    });

    const getPid = localStorage.getItem('pid');

    $(".project_id").val(getPid);

    $("#measure_type").on("change", () => {
        localStorage.setItem('val', $("#measure_type").val())
    });

    window.onload = () => {
        const getVal = localStorage.getItem('val');
        $('#measure_type').val(getVal);
    };

    $('select[name="measure_type"]').on('change', () => {
        $(".pid").val($("#building").val() + ' ' + "2021" + ' ' + $("#measure_type").val());
        $(".pid").removeAttr("style");
    });


    const dateInput_1 = $('input[name="baseline_start_date"]');

    const dateInput_2 = $('input[name="reporting_period_start_date"]');

    const options = {
        format: 'mm/dd/yyyy',
        todayHighlight: true,
        autoclose: true,
        todayBtn: true
    };

    dateInput_1.datepicker(options);

    dateInput_2.datepicker(options);

    $('#tableData').on('click', 'button.addRow', (e) => {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = [];
        let data = {
            project_id: getPid,
            imp_or_ann: $(".imp_or_ann").last().val(),
            category: $(".category").last().val(),
            cost: $(".cost").last().val(),
            hours: $(".hours").last().val()
        }
        if (data.project_id === "undefined") {
            errors.push({ text: "Please define a project ID" })
        };
        if (!data.imp_or_ann) {
            errors.push({ text: "Please select an option for implementation or annual" })
        };
        if (!data.category) {
            errors.push({ text: "Please select an option for category" })
        };
        if (!data.cost) {
            errors.push({ text: "Please enter a value for cost (if the cost is unknown, enter 0)" })
        };
        if (!data.hours) {
            errors.push({ text: "Please enter a value for hours" })
        };

        if (errors.length > 0) {
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
    });

    $('#tableData').on('click', 'button.addRowF', (e) => {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = []
        let data = {
            project_id: getPid,
            source: $(".source").last().val(),
            implementation: $(".implementation").last().val(),
            annual: $(".annual").last().val(),
        }
        if (data.project_id === "undefined") {
            errors.push({ text: "Please define a project ID" })
        };
        if (!data.source) {
            errors.push({ text: "Please select an option for source" })
        };
        if (!data.implementation) {
            errors.push({ text: "Please enter a value for implementation" })
        };
        if (!data.annual) {
            errors.push({ text: "Please enter a value for annual" })
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>')
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
    });

    $("#tableData").on("change", ".commodity", function () {
        if ($(this).val() === 'CHW') $(this).closest('tr').find(".unit").val("tonhr");

        if ($(this).val() === 'ELE') $(this).closest('tr').find(".unit").val("kWh");

        if ($(this).val() === 'STM') $(this).closest('tr').find(".unit").val("lb");

        if ($(this).val() === 'HHW') $(this).closest('tr').find(".unit").val("mmbtu");

        if ($(this).val() === 'GAS') $(this).closest('tr').find(".unit").val("CCF");

        if ($(this).val() === 'WATER') $(this).closest('tr').find(".unit").val("kgal");

        if ($(this).val() === 'PEAK_CHW') $(this).closest('tr').find(".unit").val("ton");

        if ($(this).val() === 'LABOR') $(this).closest('tr').find(".unit").val("Hours");
    })

    $('#tableData').on('click', 'button.addRowB', (e) => {

        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = []
        let data = {
            project_id: getPid,
            commodity: $(".commodity").last().val(),
            unit: $(".unit").last().val(),
            value: $(".value").last().val(),
        }

        if (data.project_id === "undefined") {
            errors.push({ text: "Please define a project ID" })
        };
        if (!data.commodity) {
            errors.push({ text: "Please select an option for commodity" })
        };
        if (!data.unit) {
            errors.push({ text: "Please select an option for unit" })
        };
        if (!data.value) {
            errors.push({ text: "Please enter a value for value field" })
        }

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>')
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
    });

    $('#tableData').on('click', 'button.addRowS', (e) => {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let errors = []
        let data = {
            project_id: getPid,
            phase: $(".phase").last().val(),
            commodity: $(".commodity").last().val(),
            unit: $(".unit").last().val(),
            value: $(".value").last().val()
        }

        if (data.project_id === "undefined") {
            errors.push({ text: "Please define a project ID" })
        };
        if (!data.phase) {
            errors.push({ text: "Please select an option for phase" })
        };
        if (!data.commodity) {
            errors.push({ text: "Please select an option for commodity" })
        };
        if (!data.unit) {
            errors.push({ text: "Please select an option for unit" })
        };
        if (!data.value) {
            errors.push({ text: "Please enter a value for value field" })
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>')
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
    });

    $("#finish").on("click", () => {
        localStorage.clear();
    });

});