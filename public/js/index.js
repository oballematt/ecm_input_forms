$(document).ready(() => {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    const dataArray = []

    $("#formData").on('submit', () => {
        dataArray.push($("#building").val());
        dataArray.push($("#measure_type").val());
        dataArray.push($("#status").val());
        dataArray.push($("#staff_lead").val());
        dataArray.push($("#staff_colead").val());
        dataArray.push($("#analyst").val());
        dataArray.push($("#addImpAnn").val());
        dataArray.push($("#addCategory").val());
        dataArray.push($("#addBaseCommodity").val());
        dataArray.push($("#addSource").val());
        dataArray.push($("#addPhase").val());
        dataArray.push($("#addSavingsCommodity").val());
        localStorage.setItem('pid', $(".pid").val())
        localStorage.setItem('values', JSON.stringify(dataArray))
    });

    const getPid = localStorage.getItem('pid');

    window.onload = () => {
        const getVal = JSON.parse(localStorage.getItem('values'));
        $('#building').val(getVal[0]);
        $('#measure_type').val(getVal[1]);
        $('#status').val(getVal[2]);
        $('#staff_lead').val(getVal[3]);
        $('#staff_colead').val(getVal[4]);
        $('#analyst').val(getVal[5]);
        $('#addImpAnn').val(getVal[6]);
        $('#addCategory').val(getVal[7]);
        $('#addBaseCommodity').val(getVal[8]);
        $('#addSource').val(getVal[9]);
        $('#addPhase').val(getVal[10]);
        $('#addSavingsCommodity').val(getVal[11]);

        if(getVal[0] === null){
            $("#building").val("Choose...")
        }
        if(getVal[1] === null){
            $("#measure_type").val("Choose...")
        }
        if(getVal[2] === null){
            $("#status").val("Choose...")
        }
        if(getVal[3] === null){
            $("#staff_lead").val("Choose...")
        }
        if(getVal[4] === null){
            $("#staff_colead").val("Choose...")
        }
        if(getVal[5] === null){
            $("#analyst").val("Choose...")
        }
        if(getVal[6] === null){
            $("#addImpAnn").val("Choose...")
        }
        if(getVal[7] === null){
            $("#addCategory").val("Choose...")
        }
        if(getVal[8] === null){
            $("#addBaseCommodity").val("Choose...")
        }
        if(getVal[9] === null){
            $("#addSource").val("Choose...")
        }
        if(getVal[10] === null){
            $("#addPhase").val("Choose...")
        }
        if(getVal[11] === null){
            $("#addSavingsCommodity").val("Choose...")
        }
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
                $('#errors').text('')
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
                $("#link").attr('href', '/baseline'),
                $('#errors').text('')
            )
        }
    });

    $('#tableData').on('click', 'button.addRowB', (e) => {

        const cloneRow = $('#tableData tbody tr').first();
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
                $("#link").attr('href', '/savings'),
                $('#errors').text('')
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
                $("#link").attr('href', '/'),
                $('#errors').text('')
            )
        }
    });

    $("#finish").on("click", () => {
        localStorage.clear();
    });

});