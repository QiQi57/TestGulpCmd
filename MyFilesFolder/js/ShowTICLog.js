//Common

(function ($) {
    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'slow');
        return this; // for chaining...
    }
})(jQuery);
//code by AZ

function sortFunction(a, b) {
    var aCode = 0;
    var bCode = 0;
    for (var i = 0; i < a.toString().length; i++) {
        aCode = aCode + a.charCodeAt(i);
    }
    for (var i = 0; i < b.toString().length; i++) {
        bCode = bCode + b.charCodeAt(i);
    }
    return (aCode - bCode);
}



$(document).ready(function () {
    DisableViewReportButton();
    $("#loadImageDiv").hide();
    $("#showData").hide();
    $("#floatHeaderDiv").hide();
    //$("#reportTable").hide();
    $("#report_image").hide();
    $("#reportFrame").hide();
    $("#TICReportTable").hide();
    //start//define quick date picker
    $("#quickTimeSelector").change(function () {
        var startDate;
        //get and set default data
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        } if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;

        var selectValue = $(this).val();

        if (selectValue == "ytd") {

            $("#startDateInput").val("07/01/2012");
        } else if (selectValue == "3") {
            //calculate start date
            var startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 2);
            $("#startDateInput").val(startDate.getMonth() + "/" + startDate.getDate() + "/" + startDate.getFullYear());
        } else if (selectValue == "6") {
            var startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 5);
            $("#startDateInput").val(startDate.getMonth() + "/" + startDate.getDate() + "/" + startDate.getFullYear());
        }
    });
    //end//

    //start//loading Product Family options
    //getProductInfo();
    //    $("#cluster_Selection").change(function () {
    //        //        DisableCluster();
    //        //        DisableProAndTax();
    //        getProductInfo();
    //    })
    //end//

    //start//loading Taxonomy options
    //    $("#productList").change(function () {
    //        //        DisableProAndTax();
    //        getTaxonomyInfo();
    //    })
    //end//

    //floating header
    function UpdateTableHeaders() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 340) {
            //add if statement, edited by  mamba
            if ($("#TICReportTable").is(":visible")) {
                $("#floatHeaderDiv").show();
            }

        }
        else {
            $("#floatHeaderDiv").hide();
        }
    }

    UpdateTableHeaders();
    //the commented two lines below are moved into viewReportLink's click event (edited by mamba)
    $(window).scroll(UpdateTableHeaders);
    $(window).resize(UpdateTableHeaders);

    $("#overlay").overlay({
        mask: {
            color: '#fff',

            // load mask a little faster  
            loadSpeed: 200,

            // very transparent  
            opacity: 0.5
        },
        closeOnClick: false,
        onBeforeClose: function () {
            // $('#pluginin').html("");  
        }
    });

    $("#close").click(function () {
        $('#overlay').overlay().close();
    });

    $("#close").mousedown(function () {
        $("#close").attr("class", "buttonClick");
    });

    $("#close").mouseup(function () {
        $("#close").attr("class", "metroButton");
    });

    $("#close").mouseover(function () {
        $("#close").attr("class", "buttonOver");
    });

    $("#close").mouseout(function () {
        $("#close").attr("class", "metroButton");
    });

    CloseDetailsBinding();

    $("#export").click(function () {
        var exportButton = $("#export");
        var host = getHostUrl();
        var type = "seam";
        exportButton.attr("disabled", "disabled");
        $.ajax({
            url: host + "/ExportExcel.srv",
            //data: { type: type },
            data: { type: type },
            cache: false,
            success: function (result) {
                if (result == '"-1"') {
                    $("#warningText").html("No data need to be exported, please view report first.");
                    $(".warning").overlay().load();
                }
                else if (result == '"0"') {
                    $("#warningText").html("Report columns is 0, please view report again.");
                    $(".warning").overlay().load();
                }
                else {
                    //                    var data = $.parseJSON(data);
                    $('#iframe').attr('src', 'ExportExcel.srv?type=seam');
                    $('#iframe').load();
                }
                exportButton.removeAttr("disabled");
            },
            error: function (result) {
                alert("error");
                exportButton.removeAttr("disabled");
            }
        });

    });

    ////floating header

    $("#viewReportLink").click(function () {
        DisableViewReportButton();
        $("#totalUserSpan").text("");
        //get parameters
        $("#showData").hide();
        var startDate = $("#startDateInput").val();
        var endDate = $("#endDateInput").val();
        $("#txtStartDate").val(startDate);
        $("#txtEndDate").val(endDate);


        var rankType = $('input[type="radio"][name="rank"]:checked').val();

        if (!startDate) {
            $("#warningText").html("Please select start date.");
            $(".warning").overlay().load();
            return;
        }

        if (!endDate) {
            $("#warningText").html("Please select end date.");
            $(".warning").overlay().load();
            return;
        }
        var actionType = $("#txtTimeHidden").val();
        //TIC report
        //clear data
        $("#TICReportTable > tbody").empty();
        $("#TICReportTable").hide("slow");
        var host = getHostUrl();

        $("#loadImageDiv").show();
        TimerStart();
        $.post(
            host + "/GetTICLog.srv",
            { StartTime: startDate, EndTime: endDate, ActionType: actionType, RankBy: rankType },
            function (data) {
                TimerStop();
                $("#loadImageDiv").hide();
                $("#showData").hide();
                $(".saveAction").show();
                var rowList = $.parseJSON(data); //ticList
                var rowLength = rowList.length;
                if (rowLength < 1) {
                    $("#showData").show();
                    EnableViewReportButton();
                    return;
                }
                var rowString = "";
                var contentRowString = "";
                //var contentRowLength;
                var backgroundColor;

                //set overall info
                $("#totalUserSpan").text(rowLength.toString());

                for (var i = 0; i < rowLength; i++) {
                    //set row color
                    if (i % 2 == 0) {
                        backgroundColor = "#D3DFEE";
                    } else {
                        backgroundColor = "#fff";
                    }

                    //----------------
                    rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td>" + (i + 1).toString() + "</td>" +
                            "<td>" + rowList[i]["VisitorDomain"] + "</td>" +
                            "<td>" + rowList[i]["VisitorName"] + "</td>" +
                            "<td>" + rowList[i]["LastAccessTime"] + "</td>" +
                            "<td><a id='AB" + i + "' tag='" + rowList[i]["VisitorName"] + "' onclick='enable(\"AB" + i + "\")' href='#AA" + i + "' >" + rowList[i]["AccessCount"] + "</a><a style='display:none;'>AA" + i + "</a></td>";

                    $("#TICReportTable>tbody").append(rowString);

                    contentRowString = "";
                    rowString = "";
                }
                $("#TICReportTable").show("slow");
                EnableViewReportButton();
            }
        );
    });

    $(".spexpandLink").live('click', function (event) {
        $(this).hide();
        var startDate = $("#startDateInput").val();
        var endDate = $("#endDateInput").val();
        var spl1 = $(this).attr('spl1');
        var spl2 = $(this).attr('spl2');
        var rowRank = $(this).attr('rank');
        var host = getHostUrl();

        //

        $.post(
            host + "/GetContentInfo.srv",
            { startDate: startDate, endDate: endDate, spl1: spl1, spl2: spl2 },
            function (data) {
                $("#" + rowRank + "_div").hide();
                var rowList = $.parseJSON(data);
                var rowLength = rowList.length;
                var rowString = "";
                for (var i = 0; i < rowLength; i++) {
                    rowString = rowString + "<tr><td width='200px'>" + rowList[i]["ResourceURL"] + "</td><td>" +
                                                     rowList[i]["LinkCount"] + "</td><td>" +
                                                     rowList[i]["ResourceType"] + "</td><td>" +
                                                     rowList[i]["OriginationMethod"] + "</td></tr>";
                }
                var tableString = "<table>" +
                                    "<thead><tr><td>Resource URL</td><td>Usage Count</td><td>Resouce Type</td><td>Origination Method</td></tr></thead>" +
                                    "<tbody>" +
                                        rowString +
                                    "</tbody>" +
                                   "</table>";
                $("#" + rowRank + "_div").append(tableString);
                $("#" + rowRank + "_div").show("slow");

                //var rowdiv = document.getElementById("#" + rowRank + "_div");
                //rowdiv.scrollIntoView(true);
                $("#" + rowRank + "_div").goTo();
            }
        );
    });

    //get and set default data
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm }
    today = mm + '/' + dd + '/' + yyyy;

    //if the month's value is less than 7, the year should be previous year
    if (mm < 7) {
        var startDate = "07/01/" + (yyyy - 1);
        $("#startDateInput").val(startDate);
    }
    else {
        var startDate = "07/01/" + yyyy;
        $("#startDateInput").val(startDate);
    }

    $("#endDateInput").val(today);

    $("#startDateInput").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showAnim: "slideDown",
        onSelect: function (selectedDate) {
            //$("#to").datepicker("option", "minDate", selectedDate);
            clearRadioButton('radio', 'filterForm');
            //            getProductInfo();
        }
    });

    $("#endDateInput").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showAnim: "slideDown",
        onSelect: function (selectedDate) {
            //$("#to").datepicker("option", "minDate", selectedDate);
            clearRadioButton('radio', 'filterForm');
            //            getProductInfo();
        }
    });
});

function clearRadioButton(radiosetname, formid) {
    var form = document.getElementById(formid);
    for (var i = 0; i < form.length; i++) {
        if (form[i].name == radiosetname) {
            document.getElementById(form[i].id).checked = false;
            $("#Span" + form[i].id).attr("class", radio_unchecked);
        }
    }
}

function getHostUrl() {
    var protocol = window.location.protocol;
    var host = window.location.host;
    return protocol + "//" + host + pathDir;
}

function CloseDetailsBinding() {
    $("#closeDetails").click(function () {
        $("#detailsView").html("");
        $('#closeDetails').attr("class", "triangle-down-click");
        $("#detailsView").fadeOut("slow");
    });

    $("#closeDetails").mousedown(function () {
        $("#closeDetails").attr("class", "triangle-down-click");
    });

    $("#closeDetails").mouseup(function () {
        $("#closeDetails").attr("class", "triangle-down");
    });

    $("#closeDetails").mouseover(function () {
        $("#closeDetails").attr("class", "triangle-down-click");
    });

    $("#closeDetails").mouseout(function () {
        $("#closeDetails").attr("class", "triangle-down");
    });
}

//----------
$(window).resize(function () {
    var stdWidth = screen.width;
    var stdHeight = screen.height;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();

    if (browserWidth < stdWidth) {
        /*$('#width').addClass('widthfix');*/
        //$('#width').css("width", stdWidth);
        $('body').addClass('overflowHidden');
        $('body').removeClass('overflowNull');
    }

    else if (browserWidth >= stdWidth) {
        $('#width').addClass('widthauto');
        $('body').addClass('overflowNull');
        $('body').removeClass('overflowHidden');
    }

    if ($('.scorecardSec')) {
        if ($('.trigger').outerHeight() > stdHeight) {
            $(".trigger").css("min-height", $('.scorecardSec').outerHeight());
        }
        else {
            $(".trigger").css("min-height", stdHeight);
        }
    }

    else {
        $(".trigger").css("min-height", stdHeight);
    }
});

$(document).ready(function () {
    $(".trigger").click(function () {
        var id = -1;
        id = $("#txtTag").val(); ;
        if (id != -1) {
            var position = $("#" + id).position();
            if (position != null) {
                if ($(this).attr('class') == 'trigger active') {
                    $("#detailsView").animate({ "margin-left": (position.left - 290) + "px" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1000);
                }
                else {
                    $("#detailsView").animate({ "margin-left": (position.left - 40) + "px" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1000);
                }
            }
        }
        $(".panel").toggle("slow");
        $(this).toggleClass("active");
        return false;
    });

    var stdWidth = 1349;
    var stdHeight = 651;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    if (browserWidth < stdWidth) {
        $('#width').addClass('widthfix');
        $('body').addClass('overflowHidden');
    }

    else if (browserWidth >= stdWidth) {
        $('#width').addClass('widthauto');
        $('body').addClass('overflowNull');
    }

    $('.body').css("min-height", screen.height);
    $('.body').css("min-width", screen.width);
    if ($('.scorecardSec')) {
        if ($('.trigger').outerHeight() > screen.height) {
            $(".trigger").css("min-height", $('.scorecardSec').outerHeight());
        }
        else {
            $(".trigger").css("min-height", screen.height);
        }
    }
    else {
        $(".trigger").css("min-height", screen.height);
    }
});

//function registion
$(document).ready(function () {
    $('.scoreCard').click(function () {
        if ($('#scoreCardContent').is(':visible')) {
            $('#scoreCardContent').slideUp();
            $(this).removeClass('active').html("+ Scorecard ");
        } else {
            $('#scoreCardContent').slideDown();
            $(this).addClass('active').html("-  Scorecard ");
        }
    });
    $('.business').click(function () {
        if ($('#businessContent').is(':visible')) {
            $('#businessContent').slideUp();
            $(this).removeClass('active').html("+ Business :");
        } else {
            $('#businessContent').slideDown();
            $(this).addClass('active').html("-  Business :");
        }
    });
    $('.region').click(function () {
        if ($('#regionContent').is(':visible')) {
            $('#regionContent').slideUp();
            $(this).removeClass('active').html("+ Region :");
        } else {
            $('#regionContent').slideDown();
            $(this).addClass('active').html("-  Region :");
        }
    });
    $('.organization').click(function () {
        if ($('#organizationContent').is(':visible')) {
            $('#organizationContent').slideUp();
            $(this).removeClass('active').html("+ Organization :");
        } else {
            $('#organizationContent').slideDown();
            $(this).addClass('active').html("-  Organization :");
        }
    });
    $('a.calLnk').click(function () {
        $('a.calLnk').removeClass('calSelected');
        $(this).addClass('calSelected');
    });

    $('a.lnkScore').click(function () {
        $('a.lnkScore').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');
    });
});

var successLoadOrg = function () {
    $('#organizationContent').slideDown();
    $(".organization").addClass('active').html("-  Organization :");
    $('.organization').click(function () {
        if ($('#organizationContent').is(':visible')) {
            $('#organizationContent').slideUp();
            $(this).removeClass('active').html("+ Organization :");
        } else {
            $('#organizationContent').slideDown();
            $(this).addClass('active').html("-  Organization :");
        }
    });
}

var successLoadCat = function () {
    $(document).ready(function () {
        $(".brandAllCat .checkbox").dgStyle();
        if ($(".checkbox input").is(":checked")) {
            $(".brandAllCat").css("color", "#ffffff");
        } else {
            $(".brandAllCat").css("color", "#000000");
        }
    });
}

var successLoadBusiness = function () {
    $('#businessContent').slideDown();
    $(".business").addClass('active').html("-  Business :");
    $('.business').click(function () {

        if ($('#businessContent').is(':visible')) {

            $('#businessContent').slideUp();
            $(this).removeClass('active').html("+ Business :");
        } else {
            $('#businessContent').slideDown();
            $(this).addClass('active').html("-  Business :");
        }
    });
}

var successLoadRegion = function () {
    $('#regionContent').slideDown();
    $(".region").addClass('active').html("-  Region :");
    $('.region').click(function () {
        if ($('#regionContent').is(':visible')) {
            $('#regionContent').slideUp();
            $(this).removeClass('active').html("+ Region :");
        } else {
            $('#regionContent').slideDown();
            $(this).addClass('active').html("-  Region :");
        }
    });
}

var successLoadLob = function () {
    $(document).ready(function () {
        $(".brandAllLob .checkbox").dgStyle();
        if ($(".checkbox input").is(":checked")) {
            $(".brandAllLob").css("color", "#ffffff");
        } else {
            $(".brandAllLob").css("color", "#000000");
        }
    });
}

function ClickScore(id, value) {
    $("#ScoreCardId").val(id);
    $("#ScoreCardName").val(value);
    $("#spanScorecard").text(value);
    $(this).css('font-weight', 'bold');
    $("#orgAccord").load("_OrganizationSelect", { scorecardId: id }, successLoadOrg);
}

function ClickOrg(id, value, code) {
    $("#OrganizationId").val(id);
    $("#spanOrg").text(code);
    $("#OrganizationName").val(value);
    $(this).css('font-weight', 'bold');
    $("#businessAccord").load("_BusinessSelect", { scorecardId: $("#ScoreCardId").val(), organizationId: id }, successLoadBusiness);
    $("#regionAccord").load("_RegionSelect", { organizationId: id }, successLoadRegion);
}

function ClickBusiness(id, value) {
    $("#BusinessUnitId").val(id);
    $("#BusinessUnitName").val(value);
    $(this).css('font-weight', 'bold');
    $("#spanBusiness").text(value);
    var scoreId = $("#ScoreCardId").val();
    var orgId = $("#OrganizationId").val();
    var busId = $("#BusinessUnitId").val();
    var regId = $("#RegionId").val();
    if (regId != "" && regId != "0") {
        $("#lobAccord").load("_LOBSelect", { scorecardId: scoreId, organizationId: orgId, businessUnitId: busId, regionId: regId }, successLoadLob);
        $("#lobAccord").css("display", "inline");
    }
}

function ClickRegion(id, value) {
    $("#RegionId").val(id);
    $("#RegionName").val(value);
    $("#spanRegion").text(value);
    $(this).css('font-weight', 'bold');
    var scoreId = $("#ScoreCardId").val();
    var orgId = $("#OrganizationId").val();
    var busId = $("#BusinessUnitId").val();
    // var lobId = $("#Lob").val();
    var regId = $("#RegionId").val();
    $("#lobAccord").load("_LOBSelect", { scorecardId: scoreId, organizationId: orgId, businessUnitId: busId, regionId: regId }, successLoadLob);
    $("#lobAccord").css("display", "inline");
}

function ClickLOB(id) {
    if (!($('#' + id).is(':checked'))) {
        $('#check_all').attr('checked', false)
        GetCat();
        GetLob();

    }
    else if (($('#' + id).is(':checked'))) {
        GetCat();
        GetLob();
    }
    var scoreId = $("#ScoreCardId").val();
    var orgId = $("#OrganizationId").val();
    var busId = $("#BusinessUnitId").val();
    var lobId = $("#Lob").val();
    var regId = $("#RegionId").val();
    $("#catAccord").load("_CategorySelect", { scorecardId: scoreId, organizationId: orgId, businessUnitId: busId, regionId: regId, lineOfBusinessId: lobId }, successLoadCat);
    $("#catAccord").css("display", "inline");
}

function ClickCat(id) {
    $("#CategoryId").val(id);
    if (!($('#' + id).is(':checked'))) {
        $('#check_allcat').attr('checked', false)
    }
}

$("#LobId").click(function () {
    if ($(this).is(':checked')) alert("checked");
});

function GetLob() {
    var div = document.getElementById('lobAccord');
    var textLog = '';
    var chk = div.getElementsByTagName('input');
    var len = chk.length;

    for (var i = 0; i < len; i++) {
        if (chk[i].type === 'checkbox') {
            if (chk[i].checked) {
                if (chk[i].name.match("^lobCheck")) {
                    textLog += chk[i].name.split('_')[1] + ',';
                }
            }
        }
    }
    if (textLog != '') {
        document.getElementById('Lob').value = textLog.substring(0, textLog.length - 1);
    }
}

function GetCat() {
    var div = document.getElementById('catAccord');
    var textLog = '';
    var chk = div.getElementsByTagName('input');
    var len = chk.length;

    for (var i = 0; i < len; i++) {
        if (chk[i].type === 'checkbox') {
            if (chk[i].checked) {
                if (chk[i].name.match("^catCheck")) {
                    textLog += chk[i].name.split('_')[1] + ',';
                }
            }
        }
    }
    if (textLog != '') {
        document.getElementById('Category').value = textLog.substring(0, textLog.length - 1);
    }
}

function Validate() {
    var flag = true;
    var message = '';
    if ($("#ScoreCardId").val() == "" || $("#ScoreCardId").val() == "0") {
        message += "Please Select Scorecard Id\n";
        flag = false;
    }
    if ($("#OrganizationId").val() == "") {
        message += "Please Select Organization Id\n";
        flag = false;
    }
    if ($("#BusinessUnitId").val() == "") {
        message += "Please Select Business Unit Id\n";
        flag = false;
    }
    if ($("#RegionId").val() == "") {
        message += "Please Select Region Id\n";
        flag = false;
    }
    if ($("#Lob").val() == "") {
        message += "Please Select Lob Checkbox\n";
        flag = false;
    }
    if ($("#Category").val() == "") {
        message += "Please Select Category Checkbox\n";
        flag = false;
    }
    if ($("#Year").val() == "") {
        message += "Please Select Year\n";
        flag = false;
    }
    if ($("#Month").val() == "" || $("#Month").val() == "0") {
        message += "Please Select Month\n";
        flag = false;
    }
    if (flag == false) {
        alert(message);
    }
    return flag;
}

$(document).ready(function () {
    var canGoback = "";
    if ('False' != null) {
        canGoback = 'False';
    }
    if (canGoback = "True") {
        if ($('#scoreCardContent').text().length > 0) {
            $('#scoreCardContent').slideDown();
            $('.scoreCard').addClass('active').html("-  Scorecard ");
        }
        if ($('#businessContent').text().length > 0) {
            $('#businessContent').slideDown();
            $('.business').addClass('active').html("-  Business :");
        }
        if ($('#regionContent').text().length > 0) {
            $('#regionContent').slideDown();
            $('.region').addClass('active').html("-  Region :");
        }
        if ($('#organizationContent').text().length > 0) {
            $('#organizationContent').slideDown();
            $('.organization').addClass('active').html("-  Organization :");
        }
    }

});

function Prev() {
    var year = $('label[for=Year]').html();
    var prevYear = parseInt(year) - 1;
    $('label[for=Year]').html(prevYear);
    document.getElementById('Year').value = $('label[for=Year]').html();
}

function Next() {
    var year = $('label[for=Year]').html();
    var nextYear = parseInt(year) + 1;
    $('label[for=Year]').html(nextYear);
    document.getElementById('Year').value = $('label[for=Year]').html();
}

function ClickMonth(month) {
    document.getElementById('Year').value = $('label[for=Year]').html();
    document.getElementById('Month').value = month;
}

function LevelClick(id) {
    if ($('#showContent' + id) != null) {
        if ($('#showContent' + id).is(':visible')) {
            var src = $('#expandcol' + id).attr("src");
            if (src != "" && src != undefined) {
                src = src.replace('collapse-green.gif', 'expand-green.gif');
                $('#expandcol' + id).attr("src", src);
                $('#showContent' + id).slideUp();
            }
        } else {
            var src = $('#expandcol' + id).attr("src");
            if (src != "" && src != undefined) {
                src = src.replace('expand-green.gif', 'collapse-green.gif');
                $('#expandcol' + id).attr("src", src);
                $('#showContent' + id).slideDown();
            }
        }
    }
}

var TimeFlag;
var t = 0;

//function DisableCluster() {
//    $("#cluster_Selection").prop('disabled', 'disabled');
//}

//function EnableCluster() {
//    $("#cluster_Selection").removeAttr("disabled");
//}

//function DisableProAndTax() {
//    $("#productList").prop('disabled', 'disabled');
//    $("#SP_Selection").prop('disabled', 'disabled');
//}

//function EnableProAndTax() {
//    $("#productList").removeAttr("disabled");
//    $("#SP_Selection").removeAttr("disabled");
//}


function AppendAll(divID, txtID, hiddenID) {
    if ($("#" + divID + " input:checkbox:first").attr("checked")) {
        var selectedItems = 0;
        $("#" + divID + " input:checkbox").each(function (key, val) {
            $(this).attr("checked", true);
            selectedItems += 1;
            AppendCheckBoxInfo(divID, txtID, hiddenID)
        });
        selectedItems = selectedItems - 1;
        $("#" + txtID).get(0).value = "(Selected all " + selectedItems + " items)";

    }
    else {
        $("#" + divID + " input:checkbox").each(function (key, val) {
            $(this).attr("checked", false);
        });
        $("#" + txtID).get(0).value = "(Selected 0 item)";
        ClearSelectedItems(hiddenID);
    }
}
function AppendCheckBoxInfo(divID, txtID, hiddenID) {
    count = $("#" + divID + " input:checkbox").get().length - 1;
    var selectedText = "";

    var selectedCount = 0;

    var itemsString = "";
    var totalString = "";
    $("#" + divID + " input:checkbox[value!='All']:checked").each(function () {
        itemsString += $(this).val() + ",";
        selectedCount += 1;

    });
    itemsString = itemsString.substring(0, itemsString.length - 1);
    $('#' + hiddenID).attr("value", itemsString);

    if (selectedCount == count) {
        $("#" + divID + " input:checkbox:first").attr("checked", true);
        totalString = "(Selected all " + selectedCount + " items)";
    }
    if (selectedCount < count) {
        $("#" + divID + " input:checkbox:first").attr("checked", false);
        if (selectedCount == 1) {
            totalString = "(Selected " + selectedCount + " item)";
        }
        else {
            totalString = "(Selected " + selectedCount + " items)";
        }
    }
    if (selectedCount == 0) {
        $("#" + divID + " input:checkbox:first").attr("checked", false);
        totalString = "(Selected 0 item)";
    }
    $('#' + txtID).attr("value", totalString);
}

function ClearSelectedItems(txtID) {
    $('#' + txtID).attr("value", "");
}
function enable(id) {
    $("#detailsView").fadeOut(0);
    var position = $("#" + id).position();
    $("#txtTag").val(id);
    $("#detailsView").css("height", 368);
    $(".nestedtableDiv").css("width", 543);
    $(".nestedtableDiv").css("height", 247);
    $("#detailsView").attr("class", "org_box");
    var link = $("#" + id);
    var visitorName = link.attr("tag");
    var startTime = $("#startDateInput").val();
    var endTime = $("#endDateInput").val();
    var actionType = $("#txtTimeHidden").val();
    var rankType = $('input[type="radio"][name="rank"]:checked').val();
    var count = link.text();
    var height;
    if (count >= 8) {
        height = 392;
    }
    else if (count < 1) {
        height = 144;
    }
    else {
        height = 144 + count * 31;
    }
    GetDetailsView(startTime, endTime, visitorName, actionType, rankType, height);
    $("#detailsView").fadeIn('slow');
    if ($(".trigger").attr('class') == 'trigger active') {
        $("#detailsView").css("margin-left", (position.left - 955) + "px");
    }
    else {
        $("#detailsView").css("margin-left", (position.left - 705) + "px");
    }
    $("#detailsView").css("margin-top", (position.top - 285) + "px");
    CloseDetailsBinding();
    return false;
}
function GetDetailsView(startTime, endTime, visitorName, actionType, rankType, height) {
    $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Please wait...</p>");
    $("#detailsView").css("height", height);
    var host = getHostUrl();
    $.post(host + "/GetTICLogDetails.srv",
        { StartTime: startTime, EndTime: endTime, VisitorName: visitorName, Action: actionType, RankBy: rankType },
        function (data) {
            var rowList = $.parseJSON(data);
            var rowLength = rowList.length;
            if (rowLength < 1) {
                $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>There's no details data.</p>");
                $("#detailsView").css("height", height);
                CloseDetailsBinding();
                return;
            }
            var displayItem = 1;
            if (rowLength >= 8) {
                displayItem = 8;
            }
            else {
                displayItem = rowLength;
            }
            $("#detailsView").css("height", (144 + (31 * displayItem)));
            var contentString = "";
            for (var i = 0; i < rowLength; i++) {

                contentString += "<tr><td width='6%'>" + (i + 1) + "</td><td width='23%'>" + rowList[i]["VisitorDomain"] + " \\ " + rowList[i]["VisitorName"] + "</td><td width='10%'>" + rowList[i]["Action"]
                        + "</td><td width='13%'>" + rowList[i]["Time"] + "</td><td width='38%' style=\'text-align:left;padding-left:10px;\'>" + rowList[i]["Path"] + "</td><td width='10%'>" + rowList[i]["Result"] + "</td></tr>";
            }

            $("#detailsView").html("<span class='org_box_cor cor1'></span><div class='nestedHeader'>" +
                                   "<a href='#CSTC' class='nestedFunctionFront' id='CopySR' onclick='copySR();'>&nbsp;</a><a style='display:none;'>" +
                                   "CSTC</a><a href='#ETE' class='nestedFunction' id='DetailsExport' >&nbsp;</a><a style='display:none;'>" +
                                   "ETE</a><div class='triangle-down' id='closeDetails'></div>" +
                                   "<table class='headertable' id='headertable'><thead><tr class='nestedtableHeader'><td width='6%'>Rank</td><td width='23%'>Domain \\ Name</td>" +
                                   "<td width='10%'>Action</td><td width='13%'>Time</td><td width='38%'>Page Path</td><td width='10%'>Result</td></tr></thead></table></div>" +
                                   "<div  class='nestedtableDiv' id='nestedtableDiv'><table class='nestedtable' id='nestedtable1'>" + contentString + "</table></div><div>");
            CloseDetailsBinding();
            //openTrendingBinding();
            if (rowLength <= 8) {
                $(".nestedtableDiv").css("width", 538);
            }
            if (displayItem < 8) {
                $(".nestedtableDiv").css("height", 1 + (31 * displayItem));
            }
            $('#nestedtable1').tableUI();
            //exportDetailsView();
        });
}
function CloseDetailsBinding() {
    $("#closeDetails").click(function () {
        $("#detailsView").html("");
        $('#closeDetails').attr("class", "triangle-down-click");
        $("#detailsView").fadeOut("slow");
    });

    $("#closeDetails").mousedown(function () {
        $("#closeDetails").attr("class", "triangle-down-click");
    });

    $("#closeDetails").mouseup(function () {
        $("#closeDetails").attr("class", "triangle-down");
    });

    $("#closeDetails").mouseover(function () {
        $("#closeDetails").attr("class", "triangle-down-click");
    });

    $("#closeDetails").mouseout(function () {
        $("#closeDetails").attr("class", "triangle-down");
    });
}