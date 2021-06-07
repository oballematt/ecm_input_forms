$(document).ready(() => {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    const ids = ['building', 'measure_type', 'status', 'staff_lead', 'staff_colead', 'analyst', 'addImpAnn', 'addCategory', 
    'addBaseCommodity', 'addSource', 'addPhase', 'addSavingsCommodity'];

    let dataObj = {};

    $("#formData").on('submit', () => {
        ids.forEach(id => dataObj[id] = $('#' + id).val());

        localStorage.setItem('values', JSON.stringify(dataObj));

        localStorage.setItem('pid', $(".pid").val());

    });

    $('#searchData').on('submit', () => {
        localStorage.setItem("search", $("#search").val())
    })

    const getPid = localStorage.getItem('pid');

    window.onload = () => {
        const storedVals = localStorage.getItem('values');
        const searchedVal = localStorage.getItem('search')

        if (storedVals) {
            dataObj = JSON.parse(storedVals)
            ids.forEach(id => $('#' + id).val(dataObj[id] || 'Choose...'));
        };

        $("#search").val(searchedVal)
    };

    $('select[name="measure_type"]').on('change', () => {
        $(".pid").val($("#building").val() + ' ' + "2021" + ' ' + $("#measure_type").val());
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

    const $table = $("#tableData"),
          $tbody = $table.find('tbody'),
          $cloneRow = $tbody.find('tr').first().clone()


    $table.on('click', 'button.addRow', (e) => {
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
                $tbody.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbody.append($cloneRow.clone()),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/fundings'),
                $('#errors').text('')
            )
        }
    });


    $table.on('click', 'button.addRowF', (e) => {
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
            errors.push({ text: "Please enter a value for implementation (if value is unknown, enter 0)" })
        };
        if (!data.annual) {
            errors.push({ text: "Please enter a value for annual (if value is unknown, enter 0)" })
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
                $tbody.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbody.append($cloneRow.clone()),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/baseline'),
                $('#errors').text('')
            );
        }
    });

    $table.on('click', 'button.addRowB', (e) => {

        e.preventDefault();
        let errors = []
        let data = {
            project_id: getPid,
            commodity: $(".commodity").last().val(),
            value: $(".value").last().val(),
        }

        if (data.project_id === "undefined") {
            errors.push({ text: "Please define a project ID" })
        };
        if (!data.commodity) {
            errors.push({ text: "Please select an option for commodity" })
        };
        if (!data.value) {
            errors.push({ text: "Please enter a value for value field (if value is unknown, enter 0)" })
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
                $tbody.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbody.append($cloneRow.clone()),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/savings'),
                $('#errors').text('')
            )
        }
    });

    $table.on('click', 'button.addRowS', (e) => {
        e.preventDefault();
        let errors = []
        let data = {
            project_id: getPid,
            phase: $(".phase").last().val(),
            commodity: $(".commodity").last().val(),
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
        if (!data.value) {
            errors.push({ text: "Please enter a value for value field (if value is unknown, enter 0)" })
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
                $tbody.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbody.append($cloneRow.clone()),
                $("#finish").removeAttr('disabled'),
                $("#link").attr('href', '/'),
                $('#errors').text('')
            )
        }
    });

    $("#finish").on("click", () => {
        localStorage.clear();
    });

    $(".clear").on("click", () => {
        localStorage.removeItem("values")
    })

});