$(function () {
    let dialog, choice, rowCount = 0, isPreview = false;
    $("#selectable").selectable({
        stop: function () {
            let result = $("#select-result").empty();
            $(".ui-selected", this).each(function () {
                choice = $(this).text();
                result.append(" " + choice);
            });
        }
    });

    delRow = function delRow(row) {
        $("#" + row).remove();
        rowCount--;
    };

    function addField() {
        rowCount++;
        $("#table tbody").append('<tr id=' + rowCount + '>' +
            '<td>' + choice + '</td>' +
            '<td>' + '<button id="del_btn_' + rowCount + '" class="ui-button ui-widget ui-corner-all" ' +
            'onclick=delRow(' + rowCount + ')' + '>删除</button>' + '</td>' +
            '</tr>');
        dialog.dialog("close");
    }


    $("#add_btn").button().on("click", function () {
        dialog.dialog("open");
    });

    $("#preview_btn").button().on("click", function () {
        isPreview = !isPreview;
        if (isPreview) {
            $("#add_btn").css("visibility","hidden");
            $("button[id^='del_btn_']").css("visibility","hidden");
            $(this).text('编辑');
        } else {
            $("#add_btn").css("visibility","visible");
            $("button[id^='del_btn_']").css("visibility","visible");
            $(this).text('预览');
        }
    });

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "确定": addField,
            "取消": function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            dialog.dialog("close");
        }
    });
});