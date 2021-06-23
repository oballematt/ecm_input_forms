$(document).ready(() => {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(".pid").prop("readonly", true);

    $('#load').click(function () {
        $('#overlay').fadeIn().delay(8000).fadeOut();
        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });
    });

    const numberWithCommas = (number) => {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

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

    const getPid = sessionStorage.getItem('pid');

    const storedVals = sessionStorage.getItem('values');

    $('#searchData').on('submit', () => {
        sessionStorage.setItem("search", $("#search").val());
    })

    const searchedVal = sessionStorage.getItem('search');

    window.onload = () => {
        if (storedVals) {
            dataObj = JSON.parse(storedVals);
            ids.forEach(id => $('#' + id).val(dataObj[id] || 'Choose...'));
        };

        $("#search").val(searchedVal);

        if (!searchedVal || searchedVal === 'null') {
            $("#search").val('Project ID');
        };

        $(".title").text(function (i, curr) {
            if (curr === "peak_CHW") {
                $(this).text('Peak CHW');
            };
        });

        $(".percent").text(function (i, curr) {
            return parseFloat(curr * 100).toFixed(0) + "%";
        });

        $(".years").text(function (i, curr) {
            return parseFloat(curr).toFixed(2);
        });

        $(".whole").each(function () {
            let num = parseFloat($(this).text()).toFixed(0);
            let commaNum = numberWithCommas(num);
            $(this).text(commaNum)
        });

        $(".whole_dollar").each(function () {
            let num = "$" + parseFloat($(this).text()).toFixed(0);
            let commaNum = numberWithCommas(num);
            $(this).text(commaNum)
        });

        $(".commas").each(function () {
            let num = $(this).text();
            let commaNum = numberWithCommas(num);
            $(this).text(commaNum);
        });

    
        let impFundsArray = [];
        let annFundsArray = [];

        let costImpValues = $('.costPhase:contains("implementation")').map((i, el) => parseInt($(el).siblings('.sumCosts').text().trim().replace(/,/g, ''), 10)).get();
        
        let costAnnValues = $('.costPhase:contains("annual")').map((i, el) => parseInt($(el).siblings('.sumCosts').text().trim().replace(/,/g, ''), 10)).get();

        let costImpTotal = costImpValues.reduce((a, b) => a + b, 0);

        let costAnnTotal = costAnnValues.reduce((a, b) => a + b, 0);
        

        $(".impFunds").each(function () {
            let values = parseInt($(this).text().replace(/,/g, ''));
            impFundsArray.push(values);
        });

        $(".annFunds").each(function () {
            let values = parseInt($(this).text().replace(/,/g, ''));
            annFundsArray.push(values);
        });

        let fundImpTotal = impFundsArray.reduce((a, b) => a + b, 0);

        let fundAnnTotal = annFundsArray.reduce((a, b) => a + b, 0);

        const totalImpSum = costImpTotal - fundImpTotal;

        const totalAnnSum = costAnnTotal - fundAnnTotal;

        const impCommaNum = numberWithCommas(totalImpSum);
        const annCommaNum = numberWithCommas(totalAnnSum);

        if (totalImpSum > 1) {
            $('.warning').removeAttr('style')
            $('.display').text(`Warning - Total Implem Fundings is less than Total Implem Costs by: $${impCommaNum} `)
        };

        if (totalAnnSum > 1) {
            $('.warning').removeAttr('style')
            $('.display').text(`Warning - Total Annual Fundings is less than Total Annual Costs by: $${annCommaNum} `)
        };
    };

    $("#formData").on("change", ["#building", "#measure_type"], () => {
        if ($("#measure_type").val() === null) {

            $("#measure_type").val('');

        } else if ($("#building").val() === null) {

            $("#building").val('');

        } else {
            $(".pid").val($("#building").val() + ' ' + new Date().getFullYear() + ' ' + $("#measure_type").val());
        };
    });


    // ajax calls for updating a specific table on an existing project ID, ajax call necessary so that if a user
    //inputs a number with comma separators, the ajax call will remove the commas when submitted to the database to avoid NaN errors.
    $('#formData').on('click', 'button.noCommasCost', function () {
        const id = $(this).attr('id')
        const imp_or_ann = $('.imp_or_ann').attr('value');
        const category = $('.category').attr('value');
        let errors = []
        let data = {
            project_id: searchedVal,
            imp_or_ann: $('.imp_or_ann').val() || imp_or_ann,
            category: $('.category').val() || category,
            cost: $(".cost").val().replace(/,/g, ''),
            hours: $(".hours").val()
        };

        if (!data.cost) {
            errors.push({ text: "Please enter a value for costs" });
        };
        if (!data.hours) {
            errors.push({ text: "Please enter a value for hours" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/find/costs_hours/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasBase', function () {
        const id = $(this).attr('id')
        const commodity = $('.commodity').attr('value');
        let errors = []
        let data = {
            project_id: searchedVal,
            commodity: $('.commodity').val() || commodity,
            value: $('.value').val().replace(/,/g, '')
        }

        if (!data.value) {
            errors.push({ text: "Please enter a value for value field" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/find/baseline/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasFunding', function () {
        const id = $(this).attr('id')
        const source = $('.source').attr('value');
        let errors = []
        let data = {
            project_id: searchedVal,
            commodity: $('.source').val() || source,
            implementation: $('.implementation').val().replace(/,/g, ''),
            annual: $('.annual').val().replace(/,/g, '')
        }

        if (!data.implementation) {
            errors.push({ text: "Please enter a value for implementation" });
        };

        if (!data.annual) {
            errors.push({ text: "Please enter a value for annual" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/find/funding/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasSavings', function () {
        const id = $(this).attr('id')
        const phase = $(".phase").attr('value')
        const commodity = $('.commodity').attr('value');
        let errors = []
        let data = {
            project_id: searchedVal,
            phase: $('.phase').val() || phase,
            commodity: $('.commodity').val() || commodity,
            value: $('.value').val().replace(/,/g, '')
        }

        if (!data.value) {
            errors.push({ text: "Please enter a value for value field" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/find/savings/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasMisc', function () {
        const id = $(this).attr('id')
        const phase = $(".phase").attr('value')
        const owner = $('.misc_owner').attr('value');
        let errors = []
        let data = {
            project_id: searchedVal,
            phase: $('.phase').val() || phase,
            misc_owner: $('.misc_owner').val() || owner,
            misc_savings: $('.misc_savings').val().replace(/,/g, '')
        }

        if (!data.misc_savings) {
            errors.push({ text: "Please enter a value for Misc Savings" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {
            $.ajax({
                url: '/find/miscsavings/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    //ajax calls for adding a new record to a table on an existing project ID, ajax call necessary so that if a user
    //inputs a number with comma separators, the ajax call will remove the commas when submitted to the database to avoid NaN errors.
    $('#formData').on('click', 'button.noCommasBaseAdd', function (e) {
        e.preventDefault()
        const id = $(this).attr('id')
        let errors = []
        let data = {
            project_id: searchedVal,
            commodity: $('.commodity').val(),
            value: $('.value').val().replace(/,/g, '')
        }

        if (!data.commodity) {
            errors.push({ text: "Please select an option for commodity" })
        }

        if (!data.value) {
            errors.push({ text: "Please enter a value for value field" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/add/baseline/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasCostsAdd', function (e) {
        e.preventDefault()
        const id = $(this).attr('id')
        let errors = []
        let data = {
            project_id: searchedVal,
            imp_or_ann: $('.imp_or_ann').val(),
            category: $('.category').val(),
            cost: $('.cost').val().replace(/,/g, ''),
            hours: $('.hours').val().replace(/,/g, '')
        }

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
            errors.push({ text: "Please enter a value for hours (if value is unknown, enter 0)" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/add/costs_hours/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasFundingAdd', function (e) {
        e.preventDefault()
        const id = $(this).attr('id')
        let errors = []
        let data = {
            project_id: searchedVal,
            source: $('.source').val(),
            implementation: $('.implementation').val().replace(/,/g, ''),
            annual: $('.annual').val().replace(/,/g, ''),
        }

        if (!data.source) {
            errors.push({ text: "Please select an option for source" });
        };
        if (!data.implementation) {
            errors.push({ text: "Please enter a value for implementation (if value is unknown, enter 0)" });
        };
        if (!data.annual) {
            errors.push({ text: "Please enter a value for annual (if value is unknown, enter 0)" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/add/fundings/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasSavingsAdd', function (e) {
        e.preventDefault()
        const id = $(this).attr('id')
        let errors = []
        let data = {
            project_id: searchedVal,
            phase: $('.phase').val(),
            commodity: $('.commodity').val(),
            value: $('.value').val().replace(/,/g, ''),
        }

        if (!data.phase) {
            errors.push({ text: "Please select an option for phase" });
        };
        if (!data.commodity) {
            errors.push({ text: "Please select an option for commodity" });
        };
        if (!data.value) {
            errors.push({ text: "Please enter a value for value field (if value is unknown, enter 0)" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/add/savings/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    $('#formData').on('click', 'button.noCommasMiscAdd', function (e) {
        e.preventDefault()
        const id = $(this).attr('id')
        let errors = []
        let data = {
            project_id: searchedVal,
            phase: $('.phase').val(),
            misc_owner: $('.misc_owner').val(),
            misc_savings: $('.misc_savings').val().replace(/,/g, ''),
        }

        if (!data.phase) {
            errors.push({ text: "Please select an option for phase" });
        };
        if (!data.misc_owner) {
            errors.push({ text: "Please select an option for owner" });
        };
        if (!data.misc_savings) {
            errors.push({ text: "Please enter a value for Misc Savings (if value is unknown, enter 0)" });
        };

        if (errors.length > 0) {
            for (var item in errors) {
                $("#errors").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/add/miscsavings/' + id,
                type: 'POST',
                data: data,
                success: function () {
                    window.location = "/find";
                }
            });
        }
    });

    const $table = $("#tableData"),
        $tbody = $table.find('tbody'),
        $cloneRow = $tbody.find('tr').first().clone();

    // ajax calls used to create a new project, ajax call necessary to add multiple rows of data at once.
    //also removes comma separators if user inputs a value with commas.
    $table.on('click', 'button.addRow', (e) => {
        e.preventDefault();
        let errors = [];
        let data = {
            project_id: getPid,
            imp_or_ann: $(".imp_or_ann").last().val(),
            category: $(".category").last().val(),
            cost: $(".cost").last().val().replace(/,/g, ''),
            hours: $(".hours").last().val()
        };

        $("#errors").text('');

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
            errors.push({ text: "Please enter a value for hours (if value is unkown, enter 0)" });
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
            implementation: $(".implementation").last().val().replace(/,/g, ''),
            annual: $(".annual").last().val().replace(/,/g, ''),
        }

        $("#errors").text('');

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
            value: $(".value").last().val().replace(/,/g, ''),
        }

        $("#errors").text('');

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
            value: $(".value").last().val().replace(/,/g, '')
        }

        $("#errors").text('');

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

    // clears project ID stored in session storage when user is creating a new project.
    $("#finish").on("click", () => {
        sessionStorage.clear();
    });

});