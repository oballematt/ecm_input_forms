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
        sessionStorage.removeItem('pid')
    })

    const searchedVal = sessionStorage.getItem('search');

    $("#create").on('click', () => {
        sessionStorage.removeItem('values')
    })
    $("#delete").on('click', () => {
        sessionStorage.removeItem('search')
    })

    window.onload = () => {

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

    $("#findB_SValues").on('click', '#chwValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        console.log('works')
        let chw_value = prompt("Please enter a value for CHW.");
        let replacedValue = chw_value.replace(/,/g, '');
        $(".message").text()
        $('.chwValue').append(`<p>[${chw_value}]</p>`);
        let data = {
            project_id: searchedVal,
            commodity: 'CHW',
            value: replacedValue
        };
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data,
            success: function () {
                $(".message").append(`<p>Your value of ${chw_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
            Otherwise, continue adding values to the other commodities.</p>`)
            }
        });
    });

    $("#findB_SValues").on('click', '#eleValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        let ele_value = prompt("Please enter a value for ELE.")
        let replacedValue = ele_value.replace(/,/g, '')
        $('.eleValue').append(`<p>[${ele_value}]</p>`)
        let data = {
            project_id: searchedVal,
            commodity: 'ELE',
            value: replacedValue,
            success: function () {
                $(".message").append(`<p>Your value of ${ele_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        })
    });

    $("#findB_SValues").on('click', '#stmValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        let stm_value = prompt("Please enter a value for STM.")
        let replacedValue = stm_value.replace(/,/g, '')
        $('.stmValue').append(`<p>[${stm_value}]</p>`)
        let data = {
            project_id: searchedVal,
            commodity: 'STM',
            value: replacedValue,
            success: function () {
                $(".message").append(`<p>Your value of ${stm_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        })
    });


    $("#findB_SValues").on('click', '#hhwValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        let hhw_value = prompt("Please enter a value for HHW.")
        let replacedValue = hhw_value.replace(/,/g, '')
        $('.hhwValue').append(`<p>[${hhw_value}]</p>`)
        let data = {
            project_id: searchedVal,
            commodity: 'HHW',
            value: replacedValue,
            success: function () {
                $(".message").append(`<p>Your value of ${hhw_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        })
    });


    $("#findB_SValues").on('click', '#gasValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        let gas_value = prompt("Please enter a value for GAS.")
        let replacedValue = gas_value.replace(/,/g, '')
        $('.gasValue').append(`<p>[${gas_value}]</p>`)
        let data = {
            project_id: searchedVal,
            commodity: 'GAS',
            value: replacedValue,
            success: function () {
                $(".message").append(`<p>Your value of ${gas_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        })
    });

    $("#findB_SValues").on('click', '#wtrValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        let wtr_value = prompt("Please enter a value for WTR.")
        let replacedValue = wtr_value.replace(/,/g, '')
        $('.wtrValue').append(`<p>[${wtr_value}]</p>`)
        let data = {
            project_id: searchedVal,
            commodity: 'WTR',
            value: replacedValue,
            success: function () {
                $(".message").append(`<p>Your value of ${wtr_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        })
    });

    $("#findB_SValues").on('click', '#peakChwValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        let peakChw_value = prompt("Please enter a value for Peak CHW.")
        let replacedValue = peakChw_value.replace(/,/g, '')
        $('.peakChwValue').append(`<p>[${peakChw_value}]</p>`)
        let data = {
            project_id: searchedVal,
            commodity: 'peak_CHW',
            value: replacedValue,
            success: function () {
                $(".message").append(`<p>Your value of ${peakChw_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        })
    });

    $("#findB_SValues").on('click', '#laborValue', (e) => {
        e.preventDefault();
        $('.message').text('')
        let labor_value = prompt("Please enter a value for Labor.")
        let replacedValue = labor_value.replace(/,/g, '')
        $('.laborValue').append(`<p>[${labor_value}]</p>`)
        let data = {
            project_id: searchedVal,
            commodity: 'labor',
            value: replacedValue,
            success: function () {
                $(".message").append(`<p>Your value of ${labor_value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_b_s_values',
            method: 'POST',
            data: data
        })
    });

    //Ajax calls to create predicted savings
    $("#findSavingsValues").on('click', '#predictedChw', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for CHW.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedChw').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'CHW',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#predictedEle', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for ELE.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedEle').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'ELE',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#predictedStm', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for STM.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedStm').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'STM',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#predictedHhw', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for HHW.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedHhw').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'HHW',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#predictedGas', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for GAS.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedGas').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'GAS',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#predictedWtr', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for WTR.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedWtr').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'WTR',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#predictedPeak', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for Peak CHW.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedPeak').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'peak_CHW',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#predictedLabor', (e) => {
        e.preventDefault();
        $('.predictedMessage').text('')
        let value = prompt("Please enter a value for Labor.")
        let replacedValue = value.replace(/,/g, '')
        $('.predictedLabor').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'predicted',
            commodity: 'labor',
            value: replacedValue,
            success: function () {
                $(".predictedMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    //Ajax calls to create MV savings
    $("#findSavingsValues").on('click', '#mvChw', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for CHW.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvChw').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'CHW',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#mvEle', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for ELE.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvEle').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'ELE',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#mvStm', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for STM.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvStm').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'STM',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#mvHhw', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for HHW.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvHhw').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'HHW',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#mvGas', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for GAS.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvGas').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'GAS',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#mvWtr', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for WTR.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvWtr').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'WTR',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#mvPeak', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for Peak CHW.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvPeak').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'peak_CHW',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
    });

    $("#findSavingsValues").on('click', '#mvLabor', (e) => {
        e.preventDefault();
        $('.mvMessage').text('')
        let value = prompt("Please enter a value for Labor.")
        let replacedValue = value.replace(/,/g, '')
        $('.mvLabor').append(`<p>[${value}]</p>`)
        let data = {
            project_id: searchedVal,
            phase: 'mv',
            commodity: 'labor',
            value: replacedValue,
            success: function () {
                $(".mvMessage").append(`<p>Your value of ${value} for ${data.commodity} has been added. Please search for your project again to view the value above.
        Otherwise, continue adding values to the other commodities.</p>`)
            }
        }
        $.ajax({
            url: '/find_savings_values',
            method: 'POST',
            data: data
        })
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
                    window.location = "/";
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
                    window.location = "/";
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
                    window.location = "/";
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
                    window.location = "/";
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
                    window.location = "/";
                }
            });
        }
    });

    const $table = $("#tableData"),
        $tbody = $table.find('tbody'),
        $cloneRow = $tbody.find('tr').first().clone();

    // ajax calls used to create a new project, ajax call necessary to add multiple rows of data at once.
    //also removes comma separators if user inputs a value with commas.
    $table.on('click', 'button.addRow', function (e) {
        const id = $(this).attr('id')
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
                url: '/add/costs_hours/' + id,
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
        const id = $(this).attr('id')
        e.preventDefault();
        let errors = []
        let data = {
            project_id: searchedVal,
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
                url: '/add/fundings/' + id,
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

    $table.on('click', 'button.addRowM', function (e) {
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
            }).then(
                $tbody.find(':input').prop('disabled', true).css("background-color", "green"),
                $tbody.append($cloneRow.clone()),
                $("#next").removeAttr('disabled'),
                $("#link").attr('href', '/baseline'),
                $('#errors').text('')
            );
        }
    });

    // clears project ID stored in session storage.
    $("#finish").on("click", () => {
        sessionStorage.clear();
    });

});