$(document).ready(() => {

    $('#addRow').click(function(e) {
        const cloneRow = $('#tableData tbody tr').first();
        e.preventDefault();
        let data = {
         project_id: $(".project_id").last().val(),
         imp_or_ann: $(".imp_or_ann").last().val(),
         category: $(".category").last().val(),
         cost: $(".cost").last().val(),
         hours: $(".hours").last().val()
    }
        $.ajax({
            url: '/costs_hours',
            type: 'POST',
            data: data
        }).then(
            cloneRow.clone().appendTo('#tableData tbody').find(".cost, .hours").val(''),
            $("#next").removeAttr('disabled'),
            $("#link").attr('href', '/fundings')
        )

    })

    $('#addRowF').click(function(e) {
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

    $('#addRowB').click(function(e) {
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

    $('#addRowS').click(function(e) {
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
            $("#next").removeAttr('disabled'),
            $("#link").attr('href', '/')
        )

    })
})