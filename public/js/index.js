$(document).ready(() => {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(".pid").prop("readonly", true);

    $('#load').click(function(){
		$('#overlay').fadeIn().delay(8000).fadeOut();
        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });
	});

    const dateInput_1 = $('input[name="baseline_start_date"]');

    const dateInput_2 = $('input[name="reporting_period_start_date"]');

    dateInput_1.datepicker();

    dateInput_2.datepicker();

    const ids = ['building', 'measure_type', 'status', 'staff_lead', 'staff_colead', 'analyst', 'addImpAnn', 'addCategory',
        'addBaseCommodity', 'addSource', 'addPhase', 'addSavingsCommodity'];

    let dataObj = {};

    $("#formData").on('submit', () => {
        ids.forEach(id => dataObj[id] = $('#' + id).val());

        sessionStorage.setItem('values', JSON.stringify(dataObj));

        sessionStorage.setItem('pid', $(".pid").val());

    });

    $('#searchData').on('submit', () => {
        sessionStorage.setItem("search", $("#search").val());
    });

    const getPid = sessionStorage.getItem('pid');


    window.onload = () => {
        const storedVals = sessionStorage.getItem('values');
        const searchedVal = sessionStorage.getItem('search');

        $(".title").text(function (i, curr) {
            if (curr === "peak_CHW"){
                $(this).text('Peak CHW');
            };

            if (curr === 'labor'){
                $(this).text("Maintenance");
            };
        });

        $(".percent").text(function (i, curr) {
            return parseFloat(curr * 100).toFixed(0) + "%";
        });

        $(".years").text(function (i, curr) {
            return parseFloat(curr).toFixed(2);
        });

        $(".whole").text(function (i, curr) {
            return parseFloat(curr).toFixed(0);
        });

        $(".whole_dollar").text(function (i, curr) {
            return "$" + parseFloat(curr).toFixed(0);
        });

        if (storedVals) {
            dataObj = JSON.parse(storedVals);
            ids.forEach(id => $('#' + id).val(dataObj[id] || 'Choose...'));
        };

        $("#search").val(searchedVal);

        if (!searchedVal || searchedVal === 'null') {
            $("#search").val('Project ID');
        };
    };

    $("#formData").on("change", ["#building", "#measure_type"], () => {
        if ($("#measure_type").val() === null) {

            $("#measure_type").val('');

        } else if ($("#building").val() === null) {

            $("#building").val('');

        } else {
            $(".pid").val($("#building").val() + ' ' + '2021' + ' ' + $("#measure_type").val());
        };
    });

    const $table = $("#tableData"),
        $tbody = $table.find('tbody'),
        $cloneRow = $tbody.find('tr').first().clone();


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
            errors.push({ text: "Please define a project ID" });
        };
        if (!data.imp_or_ann) {
            errors.push({ text: "Please select an option for implementation or annual" });
        };
        if (!data.category) {
            errors.push({ text: "Please select an option for category" });
        };
        if (!data.cost) {
            errors.push({ text: "Please enter a value for cost (if value is unknown, enter 0)" });
        };
        if (!data.hours) {
            errors.push({ text: "Please enter a value for hours (id values is unkown, enter 0)" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
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
        sessionStorage.clear();
    });

    $(".clear").on("click", () => {
        sessionStorage.removeItem("values")
    })

});