$(document).ready(() => {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(".pid").prop("readonly", true);

    $('.load').click(function () {
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

    const ids = ['building', 'measure_type', 'status', 'staff_lead', 'staff_colead', 'analyst'];

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
        sessionStorage.removeItem('pid')
    })

    const searchedVal = sessionStorage.getItem('search');

    $("#create").on('click', () => {
        sessionStorage.removeItem('values')
    });

    $("#delete").on('click', () => {
        sessionStorage.removeItem('search')
    });

    if (getPid) {
        $('#successModal').modal('show');
        $('.successMessage').text(`Your Project ID has been successfully created!`)
        $('.successId').text(`${getPid}`)
    };

    if (storedVals) {
        dataObj = JSON.parse(storedVals);
        ids.forEach(id => $('#' + id).val(dataObj[id] || 'Choose...'));
    };

    if (getPid) {
        $("#search").val(getPid);
    } else if (!searchedVal && !getPid) {
        $('#search').val('Project ID');
    } else {
        $('#search').val(searchedVal);
    };

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

    let costImpValues = $('.costPhase:contains("Implementation")').map((i, el) => parseInt($(el).siblings('.sumCosts').text().trim().replace(/,/g, ''), 10)).get();

    let costAnnValues = $('.costPhase:contains("Annual")').map((i, el) => parseInt($(el).siblings('.sumCosts').text().trim().replace(/,/g, ''), 10)).get();

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

    $("#formData").on("change", ["#building", "#measure_type"], () => {
        if ($("#measure_type").val() === null) {

            $("#measure_type").val('');

        } else if ($("#building").val() === null) {

            $("#building").val('');

        } else {
            $(".pid").val($("#building").val() + ' ' + new Date().getFullYear() + ' ' + $("#measure_type").val());
        };
    });

    $("#registerData").on("submit", () => {
        sessionStorage.setItem('registered', 'yes')
    });

    const registered = sessionStorage.getItem('registered')

    if (window.location.href.match('/login')) {
        if (registered) {
            alert("Registration successful! Please Login")
        }
    }

    $("#loginData").on("submit", () => {
        sessionStorage.removeItem('registered')
    });

    let objs =
    {
        '#addCHW': '#showCHW',
        '#addELE': '#showELE',
        '#addSTM': '#showSTM',
        '#addHHW': '#showHHW',
        '#addGAS': '#showGAS',
        '#addWTR': '#showWTR',
        '#addPeakCHW': '#showPeakCHW',
        '#addLabor': '#showLabor',
        '#predChwValue': '#addPredChw',
        '#predEleValue': '#addPredEle',
        '#predStmValue': '#addPredStm',
        '#predHhwValue': '#addPredHhw',
        '#predGasValue': '#addPredGas',
        '#predWtrValue': '#addPredWtr',
        '#predPeakChwValue': '#addPredPeakChw',
        '#predLaborValue': '#addPredLabor',
        '#mvChwValue': '#addMvChw',
        '#mvEleValue': '#addMvEle',
        '#mvStmValue': '#addMvStm',
        '#mvHhwValue': '#addMvHhw',
        '#mvGasValue': '#addMvGas',
        '#mvWtrValue': '#addMvWtr',
        '#mvPeakChwValue': '#addMvPeakChw',
        '#mvLaborValue': '#addMvLabor',
    }

    Object.keys(objs).forEach(function (key) {
        let value = objs[key];
        $(key).on("input", function () {
            $(value).removeAttr("style");
            if ($(this).val() === "") {
                $(value).hide();
            }
        });
    });

    let filterObjs = {
        '#allBtn': '.all',
        '#adamBtn': '.adam',
        '#amandaBtn': '.amanda',
        '#buddyBtn': '.buddy',
        '#cedricBtn': '.cedric',
        '#daveBtn': '.dave',
        '#graceBtn': '.grace',
        '#johnBtn': '.john',
        '#mattBtn': '.matt',
        '#meaganBtn': '.meagan',
        '#patBtn': '.pat',
        '#richardBtn': '.richard',
        '#travisBtn': '.travis',
    }

    Object.keys(filterObjs).forEach(function (key) {
        let value = filterObjs[key];
        let check = $(value).attr('name')
        $(key).on("click", function () {
            $(value).removeAttr("style");
            $('#filterOptions').html(check);
            switch (check) {
                case "All":
                    $('.adam, .amanda, .buddy, .cedric, .dave, .grace, .john, .matt, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "Adam":
                    $('.all, .amanda, .buddy, .cedric, .dave, .grace, .john, .matt, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "Amanda":
                    $('.adam, .all, .buddy, .cedric, .dave, .grace, .john, .matt, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "Buddy":
                    $('.adam, .amanda, .all, .cedric, .dave, .grace, .john, .matt, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "Cedric":
                    $('.adam, .amanda, .buddy, .all, .dave, .grace, .john, .matt, .meagan, .pat, .richard, .travis').hide();
                    break
                case "Dave":
                    $('.adam, .amanda, .buddy, .cedric, .all, .grace, .john, .matt, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "Grace":
                    $('.adam, .amanda, .buddy, .cedric, .dave, .all, .john, .matt, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "John":
                    $('.adam, .amanda, .buddy, .cedric, .dave, .grace, .all, .matt, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "Matt":
                    $('.adam, .amanda, .buddy, .cedric, .dave, .grace, .john, .all, .meagan, .pat, .richard, .travis').hide();
                    break;
                case "Meagan":
                    $('.adam, .amanda, .buddy, .cedric, .dave, .grace, .john, .matt, .all, .pat, .richard, .travis').hide();
                    break;
                case 'Pat':
                    $('.adam, .amanda, .buddy, .cedric, .dave, .grace, .john, .matt, .meagan, .all, .richard, .travis').hide();
                    break;
                case "Richard":
                    $('.adam, .amanda, .buddy, .cedric, .dave, .grace, .john, .matt, .meagan, .pat, .all, .travis').hide();
                    break;
                case 'Travis':
                    $('.adam, .amanda, .buddy, .cedric, .dave, .grace, .john, .matt, .meagan, .pat, .richard, .all').hide();
                    break;
            }
        });
    });


    let valueObjs = {
        '#numCHW': '#addCHW',
        '#numELE': '#addELE',
        '#numSTM': '#addSTM',
        '#numHHW': '#addHHW',
        '#numGAS': '#addGAS',
        '#numWTR': '#addWTR',
        '#numPeakCHW': '#addPeakCHW',
        '#numLabor': '#addLabor',
    }

    Object.keys(valueObjs).forEach(function (key) {
        let value = valueObjs[key];
        console.log(valueObjs)
        if ($(key).text().trim()) {
            $(value).css('color', 'white').prop('disabled', true).val($(key).text().trim())
        }
    })

    $("#baselineBtn").on('click', function () {
        $('#baselineValues').removeAttr("style")
        $("#addBaseline").hide()
    });

    $("#viewBaselineBtn").on('click', function () {
        $("#baselineValues").hide()
        $('#addBaseline').show()
    });

    $(".addBaseline").on('click', function (e) {
        e.preventDefault();
        let commodity = $(this).attr('data-comm-name')
        let name = $(this).attr('name')
        let value = $('#add' + name).val()
        let replacedValue = value.replace(/,/g, '')
        $("#show" + name).css("color", "green")
        let data = {
            project_id: searchedVal,
            commodity: commodity,
            value: replacedValue
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        }).then(
            $(this).off('click'),
            $("#show" + name).removeClass('checkMark'),
            $("#add" + name).prop('disabled', true).css("color", "white")
        )
    })

    $(".editBaseline").on("click", function (e) {
        e.preventDefault();
        let id = $(this).attr('id')
        let commodity = $(this).attr('data-comm-name')
        let name = $(this).attr('name')
        let value = prompt(`Enter new value for ${commodity}`)
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            commodity: commodity,
            value: replacedValue
        }
        $.ajax({
            url: '/find/baseline/' + id,
            method: 'POST',
            data: data
        }).then(
            $("#num" + name).text(value),
            $('#add' + name).val(value)
        )
    })

    $(".deleteBaseline").on("click", function (e) {
        e.preventDefault();
        const id = $(this).attr('id');
        let commodity = $(this).attr('name')
        $.ajax({
            url: '/delete/baseline/' + id,
            method: 'DELETE'
        }).then(
            $("#num" + commodity).text(''),
            $(this).hide(),
            $('#' + id).hide(),
            $('#add' + commodity).css('color', 'black').prop('disabled', false).val('')
        )
    });



    //Ajax calls to create predicted savings
    $("#addPredChw").on('click', (e) => {
        e.preventDefault();
        $("#addPredChw").css("color", "green")
        let value = $("#predChwValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'CHW',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredChw").off('click'),
            $('#addPredChw').removeClass('checkMark'),
            $("#predChwValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addPredEle").on('click', (e) => {
        e.preventDefault();
        $("#addPredEle").css("color", "green")
        let value = $("#predEleValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'ELE',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredEle").off('click'),
            $('#addPredEle').removeClass('checkMark'),
            $("#predEleValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addPredStm").on('click', (e) => {
        e.preventDefault();
        $("#addPredStm").css("color", "green")
        let value = $("#predStmValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'STM',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredStm").off('click'),
            $('#addPredStm').removeClass('checkMark'),
            $("#predStmValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addPredHhw").on('click', (e) => {
        e.preventDefault();
        $("#addPredHhw").css("color", "green")
        let value = $("#predHhwValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'HHW',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredHhw").off('click'),
            $('#addPredHhw').removeClass('checkMark'),
            $("#predHhwValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addPredGas").on('click', (e) => {
        e.preventDefault();
        $("#addPredGas").css("color", "green")
        let value = $("#predGasValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'GAS',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredGas").off('click'),
            $('#addPredGas').removeClass('checkMark'),
            $("#predGasValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addPredWtr").on('click', (e) => {
        e.preventDefault();
        $("#addPredWtr").css("color", "green")
        let value = $("#predWtrValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'WTR',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredWtr").off('click'),
            $('#addPredWtr').removeClass('checkMark'),
            $("#predWtrValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addPredPeakChw").on('click', (e) => {
        e.preventDefault();
        $("#addPredPeakChw").css("color", "green")
        let value = $("#predPeakChwValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'Peak CHW',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredPeakChw").off('click'),
            $('#addPredPeakChw').removeClass('checkMark'),
            $("#predPeakChwValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addPredLabor").on('click', (e) => {
        e.preventDefault();
        $("#addPredLabor").css("color", "green")
        let value = $("#predLaborValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'Predicted',
            commodity: 'Labor',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addPredLabor").off('click'),
            $('#addPredLabor').removeClass('checkMark'),
            $("#predLaborValue").prop('disabled', true).css("color", "white"),
        )
    });;

    // //Ajax calls to create MV savings
    $("#addMvChw").on('click', (e) => {
        e.preventDefault();
        $("#addMvChw").css("color", "green")
        let value = $("#mvChwValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'CHW',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvChw").off('click'),
            $('#addMvChw').removeClass('checkMark'),
            $("#mvChwValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addMvEle").on('click', (e) => {
        e.preventDefault();
        $("#addMvEle").css("color", "green")
        let value = $("#mvEleValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'ELE',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvEle").off('click'),
            $('#addMvEle').removeClass('checkMark'),
            $("#mvEleValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addMvStm").on('click', (e) => {
        e.preventDefault();
        $("#addMvStm").css("color", "green")
        let value = $("#mvStmValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'STM',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvStm").off('click'),
            $('#addMvStm').removeClass('checkMark'),
            $("#mvStmValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addMvHhw").on('click', (e) => {
        e.preventDefault();
        $("#addMvHhw").css("color", "green")
        let value = $("#mvHhwValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'HHW',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvHhw").off('click'),
            $('#addMvHhw').removeClass('checkMark'),
            $("#mvHhwValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addMvGas").on('click', (e) => {
        e.preventDefault();
        $("#addMvGas").css("color", "green")
        let value = $("#mvGasValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'GAS',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvGas").off('click'),
            $('#addMvGas').removeClass('checkMark'),
            $("#mvGasValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addMvWtr").on('click', (e) => {
        e.preventDefault();
        $("#addMvWtr").css("color", "green")
        let value = $("#mvWtrValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'WTR',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvWtr").off('click'),
            $('#addMvWtr').removeClass('checkMark'),
            $("#mvWtrValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addMvPeakChw").on('click', (e) => {
        e.preventDefault();
        $("#addMvPeakChw").css("color", "green")
        let value = $("#mvPeakChwValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'Peak CHW',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvPeakChw").off('click'),
            $('#addMvPeakChw').removeClass('checkMark'),
            $("#mvPeakChwValue").prop('disabled', true).css("color", "white"),
        )
    });

    $("#addMvLabor").on('click', (e) => {
        e.preventDefault();
        $("#addMvLabor").css("color", "green")
        let value = $("#mvLaborValue").val()
        let replacedValue = value.replace(/,/g, '')
        let data = {
            project_id: searchedVal,
            phase: 'M&V',
            commodity: 'Labor',
            value: replacedValue,
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        }).then(
            $("#addMvLabor").off('click'),
            $('#addMvLabor').removeClass('checkMark'),
            $("#mvLaborValue").prop('disabled', true).css("color", "white"),
        )
    });;


    // ajax calls for updating a specific table on an existing project ID, ajax call necessary so that if a user
    //inputs a number with comma separators, the ajax call will remove the commas when submitted to the database to avoid NaN errors.
    $('#formData').on('click', 'button.updateCost', function () {
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
                    window.location = "/";
                }
            });
        }
    });

    $('#formData').on('click', 'button.updateBase', function () {
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
                    window.location = "/";
                }
            });
        }
    });

    $('#formData').on('click', 'button.updateFunding', function () {
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
                    window.location = "/";
                }
            });
        }
    });

    $('#formData').on('click', 'button.updateSavings', function () {
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
                    window.location = "/";
                }
            });
        }
    });

    $('#formData').on('click', 'button.updateMisc', function () {
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
                    window.location = "/";
                }
            });
        }
    });

    // ajax calls used to create a new project, ajax call necessary to add multiple rows of data at once.
    //also removes comma separators if user inputs a value with commas.
    const $table = $("#tableData"),
        $tbody = $table.find('tbody'),
        $cloneRow = $tbody.find('tr').first().clone();

    $table.on('click', 'button.addRow', function (e) {
        e.preventDefault();
        let errors = [];
        let data = {
            project_id: searchedVal,
            imp_or_ann: $(".imp_or_ann").last().val(),
            category: $(".category").last().val(),
            cost: $(".cost").last().val().replace(/,/g, ''),
            hours: $(".hours").last().val()
        };

        $("#errors").text('');

        if (data.project_id === "undefined" || !data.project_id) {
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
                url: '/add_costs_hours',
                type: 'POST',
                data: data
            }).then(
                $tbody.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbody.append($cloneRow.clone()),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/fundings'),
                $('#errors').text(''),
                $(".info").removeAttr('style'),
                $(".infoMessage").text('Your data was successfully added! Search for your project again to view and edit the data below. Otherwise, continue adding data to the other tables ')
            )
        }
    });

    const $tableF = $("#tableDataF"),
        $tbodyF = $tableF.find('tbody'),
        $cloneRowF = $tbodyF.find('tr').first().clone();

    $tableF.on('click', 'button.addRowF', (e) => {
        e.preventDefault();
        let errors = []
        let data = {
            project_id: searchedVal,
            source: $(".source").last().val(),
            implementation: $(".implementation").last().val().replace(/,/g, ''),
            annual: $(".annual").last().val().replace(/,/g, ''),
        }

        $("#errorsF").text('');

        if (data.project_id === "undefined" || !data.project_id) {
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
                $("#errorsF").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>')
            }
        } else {
            $.ajax({
                url: '/add_fundings',
                type: 'POST',
                data: data
            }).then(
                $tbodyF.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbodyF.append($cloneRowF.clone()),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/baseline'),
                $('#errorsF').text(''),
                $(".info").removeAttr('style'),
                $(".infoMessage").text('Your data was successfully added! Search for your project again to view and edit the data below. Otherwise, continue adding data to the other tables ')
            );
        }
    });

    const $tableM = $("#tableDataM"),
        $tbodyM = $tableM.find('tbody'),
        $cloneRowM = $tbodyM.find('tr').first().clone();

    $tableM.on('click', 'button.addRowM', function (e) {
        e.preventDefault()
        let errors = []
        let data = {
            project_id: searchedVal,
            phase: $('.phase').last().val(),
            misc_owner: $('.misc_owner').last().val(),
            misc_savings: $('.misc_savings').last().val().replace(/,/g, ''),
        }

        $("#errorsM").text('');

        if (data.project_id === "undefined" || !data.project_id) {
            errors.push({ text: "Please define a project ID" });
        };

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
                $("#errorsM").append("<p style=\"border: 1px solid black; font-weight: bold\">" + errors[item].text + '</p>');
            };
        } else {

            $.ajax({
                url: '/add_miscsavings',
                type: 'POST',
                data: data,
            }).then(
                $tbodyM.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbodyM.append($cloneRowM.clone()),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/baseline'),
                $('#errorsM').text(''),
                $(".info").removeAttr('style'),
                $(".infoMessage").text('Your data was successfully added! Search for your project again to view and edit the data below. Otherwise, continue adding data to the other tables ')
            );
        }
    });

    //Ajax calls to delete data records from tables without page refresh after every delete.
    $(".deleteCostsHours").on("click", function (e) {
        e.preventDefault();
        const id = $(this).attr('id');
        $.ajax({
            url: '/delete/costs_hours/' + id,
            method: 'DELETE',
        }).then(
            $(this).closest('tr').remove()
        )
    });

    $(".deleteFundings").on("click", function (e) {
        e.preventDefault();
        const id = $(this).attr('id');
        $.ajax({
            url: '/delete/funding/' + id,
            method: 'DELETE',
        }).then(
            $(this).closest('tr').remove()
        )
    });



    $(".deleteSavings").on("click", function (e) {
        e.preventDefault();
        const id = $(this).attr('id');
        $.ajax({
            url: '/delete/savings/' + id,
            method: 'DELETE',
        }).then(
            $(this).closest('tr').remove()
        )
    });

    $(".deleteMiscSavings").on("click", function (e) {
        e.preventDefault();
        const id = $(this).attr('id');
        $.ajax({
            url: '/delete/miscsavings/' + id,
            method: 'DELETE',
        }).then(
            $(this).closest('tr').remove()
        )
    });

    // clears project ID stored in session storage.
    $("#finish").on("click", () => {
        sessionStorage.clear();
    });

});