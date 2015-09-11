
$(document).ready(function () { 
    
});

function enable(id, fullpath,type) {
    $("#detailsView").fadeOut(0);
    var position = $("#" + id).position();
    $("#txtTag").val(id);
    $("#detailsView").css("width", 590);
    $(".nestedtableDiv").css("width", 543);
    $(".nestedtableDiv").css("height", 247);
    $("#detailsView").attr("class", "org_box");
    var startDate = $("#txtStartDate").val();
    var endDate = $("#txtEndDate").val();
    var SupportTopicDerivedID = -1;
    var link = $("#" + id);
    var count;
    var height;
    SupportTopicDerivedID = link.attr("tag");
    count = link.text();
    if (count >= 8) {
        height = 392;
    }
    else if (count < 1) {
        height = 114;
    }
    else {
        height = 114 + count * 31;
    }
    if (link == null) {
        $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Support Topic ID not in line...</p>");
        $("#detailsView").css("height", height);
    }
    else if (SupportTopicDerivedID == null) {
        $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Support Topic ID missed...</p>");
        $("#detailsView").css("height", height);
    }
    else {
        if (type == "ruleCounts") {
            GetDetailsViewForRuleCounts(startDate, endDate, SupportTopicDerivedID, height, escape(fullpath));
        }
        else if (type == "surveyVol") {
            GetDetailsViewForSurVol(startDate, endDate, SupportTopicDerivedID, height, escape(fullpath));
        }
        else {
            GetDetailsView(startDate, endDate, SupportTopicDerivedID, height, escape(fullpath));
        }
    }
    $("#detailsView").fadeIn('slow');
    if ($(".trigger").attr('class') == 'trigger active') {
        $("#detailsView").css("left", (position.left - 290) + "px");
    }
    else {
        $("#detailsView").css("left", (position.left + 40) + "px");
    }
    $("#detailsView").css("top", (position.top - 10) + "px");
    CloseDetailsBinding();
    return false;
}

function GetDetailsView(startDate, endDate, SupportTopicDerivedID, height, fullpath) {
    $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Please wait...</p>");
    $("#detailsView").css("height", height);
    var GeographyLevel3 = $("#copyRegion").val();
    var productVersion = $("#copyProductVersion").val();
    var pesServicedId = $("#copyPESServicedID").val();
    //var productVersion = "All";
    //var productVersion = $("#okProductTreeHidden").val();
    var host = getHostUrl();
    $.post(host + "/GetMSSolveSeamSRDetails.srv",
        { startDate: startDate, endDate: endDate, SupportTopicDerivedID: SupportTopicDerivedID, GeographyLevel3: GeographyLevel3, productVersion: productVersion, PESServiceID: pesServicedId,Source:selectedSource },
        function (data) {
            document.location.hash = "?guid=" + $("#txtGuid").val();
            var pathArray = unescape(fullpath).split("^");
            var path = "";
            $.each(pathArray, function (key, value) {
                path += value + "\\";
            });
            path = path.substring(0, path.length - 1);
            var rowList = $.parseJSON(data);
            var rowLength = rowList.length;
//            $("#detailsView").width(590);
//            $("#closeDetails").css("margin-left", 515);
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
            $("#detailsView").css("height", (114 + (31 * displayItem)));
            var contentString = "";
            for (var i = 0; i < rowLength; i++) {
                var title;
                var ServiceRequestNumber;
                var cts_tmpi;
                if ($.trim(rowList[i]["Title"]) == "") {
                    title = "-";
                }
                else {
                    if (len($.trim(rowList[i]["Title"])) > 50) {
                        if (len($.trim(rowList[i]["Title"])) == $.trim(rowList[i]["Title"]).length) {
                            title = $.trim(htmlEncode(rowList[i]["Title"])).substring(0, 50) + "...";
                        }
                        else {
                            title = $.trim(htmlEncode(rowList[i]["Title"])).substring(0, 50 / 2) + "...";
                        }
                    }
                    else {
                        title = htmlEncode(rowList[i]["Title"]);
                    }
                }
                if (rowList[i]["ServiceRequestNumber"] == -1) {
                    ServiceRequestNumber = NaN;
                }
                else {
                    ServiceRequestNumber = rowList[i]["ServiceRequestNumber"];
                }
                if (rowList[i]["CTS_TMPI"] == -1) {
                    cts_tmpi = NaN;
                }
                else {
                    cts_tmpi = rowList[i]["CTS_TMPI"];
                }

                contentString += "<tr><td width='6%'>" + (i + 1) + "</td><td width='20%' name='ServiceRequestNumber'>" + ServiceRequestNumber + "</td><td width='61%' style=\'text-align:left;padding-left:10px;\'>" +
                        title + "</td><td width='13%'>" + cts_tmpi + "</td></tr>";

            }

            $("#detailsView").html("<span class='org_box_cor cor1'></span><div class='nestedHeader'>" +
                                   "<a href='javascript:void(0)' class='nestedFunctionFront' id='CopySR' onclick='copySR();'>Copy SR to Clipboard</a><a style='display:none;'>" +
                                   "CSTC</a><a href='javascript:void(0)' class='nestedFunction' id='DetailsExport' >Export to Excel</a><a style='display:none;'>" +
                                   "ETE</a><div class='triangle-down' id='closeDetails'></div>" +
                                   "<table class='headertable' id='headertable'><thead><tr class='nestedtableHeader'><td width='6%'>Rank</td><td width='20%'>Request Number</td>" +
                                   "<td width='61%'>Title</td><td width='13%'>TMPI</td></tr></thead></table></div>" +
                                   "<div  class='nestedtableDiv' id='nestedtableDiv'><table class='nestedtable' id='nestedtable1'>" + contentString + "</table></div>");
            CloseDetailsBinding();
            if (rowLength <= 8) {
                $(".nestedtableDiv").css("width", 538);
            }
            if (displayItem < 8) {
                $(".nestedtableDiv").css("height", 1 + (31 * displayItem));
            }
            $('#nestedtable1').tableUI();
            exportDetailsView();

            // Prepare State data.
            var spl1 = $("#SP_Selection").val();
            var spl2 = $("#STL2_Selection").val();
            var rankType = $('input[type="radio"][name="rank"]:checked').val();

            var taxonomy = "";
            $("#SP_Selection option").each(function () {
                taxonomy += $(this).val() + "^";
            });
            var taxonomySelected = spl1;
            var supportLevel1 = "";
            $("#STL2_Selection option").each(function () {
                supportLevel1 += $(this).val() + "^";
            });
            var supportLevel1Selected = spl2;
            taxonomy = taxonomy.substring(0, taxonomy.length - 1);
            supportLevel1 = supportLevel1.substring(0, supportLevel1.length - 1);
            var GeographyLevel3;
            GeographyLevel3 = $("#txtRegionHidden").val();
            //var originationMethod = $("#originationMethodSelect").val();
            var productLevel1 = $("#ProLevel1HiddenP").val();
            var productLevel2 = $("#ProLevel2HiddenP").val();
            var productLevel3 = $("#ProLevel3HiddenP").val();

            var offeringLevel1 = $("#OffLevel1HiddenP").val();
            var offeringLevel2 = $("#OffLevel2HiddenP").val();
            var offeringLevel3 = $("#OffLevel3HiddenP").val();

            SavePageStatus(startDate, endDate, "", "", "", "", "", "", "", taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, "", "", rankType,"", "Drilldown", "MSSolve", productLevel1, productLevel2, productLevel3, path, "", "", "", "", "", "", offeringLevel1,offeringLevel2,offeringLevel3);
        });
    }

    function GetDetailsViewForSurVol(startDate, endDate, SupportTopicDerivedID, height, fullpath) {
        $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Please wait...</p>");
        $("#detailsView").css("height", height);
        var GeographyLevel3 = $("#copyRegion").val();
        var productVersion = $("#copyProductVersion").val();
        var pesServicedId = $("#copyPESServicedID").val();
        //var productVersion = "All";
        //var productVersion = $("#okProductTreeHidden").val();
        var host = getHostUrl();
        $.post(host + "/GetMSSolveSeamSurveyVolDetails.srv",
        { startDate: startDate, endDate: endDate, SupportTopicDerivedID: SupportTopicDerivedID, GeographyLevel3: GeographyLevel3, productVersion: productVersion, PESServiceID: pesServicedId, Source: selectedSource },
        function (data) {
            document.location.hash = "?guid=" + $("#txtGuid").val();
            var pathArray = unescape(fullpath).split("^");
            var path = "";
            $.each(pathArray, function (key, value) {
                path += value + "\\";
            });
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
            $("#detailsView").css("height", (114 + (31 * displayItem)));
            var contentString = "";
            for (var i = 0; i < rowLength; i++) {
                var ServiceRequestNumber;
                var result;

                if (rowList[i]["ServiceRequestNumber"] == -1) {
                    ServiceRequestNumber = NaN;
                }
                else {
                    ServiceRequestNumber = rowList[i]["ServiceRequestNumber"];
                }
                result = rowList[i]["Result"];

                contentString += "<tr><td width='40%' name='ServiceRequestNumber'>" + ServiceRequestNumber + "</td><td width='60%'>" + result + "</td></tr>";

            }

            $("#detailsView").html("<span class='org_box_cor cor1'></span><div class='nestedHeader'>" +
                                   "<a href='#CSTC' class='nestedFunctionFront' id='CopySR' onclick='copySR();'>Copy SR to Clipboard</a><a style='display:none;'>" +
                                   "CSTC</a><a href='#ETE' class='nestedFunction' id='DetailsExport' >Export to Excel</a><a style='display:none;'>" +
                                   "ETE</a><div class='triangle-down' id='closeDetails'></div>" +
                                   "<table class='headertable' id='headertable'><thead><tr class='nestedtableHeader'><td width='40%'>Request Number</td>" +
                                   "<td width='60%'>Result</td></tr></thead></table></div>" +
                                   "<div  class='nestedtableDiv' id='nestedtableDiv'><table class='nestedtable' id='nestedtable1'>" + contentString + "</table></div>");
            CloseDetailsBinding();
            if (rowLength <= 8) {
                $(".nestedtableDiv").css("width", 538);
            }
            if (displayItem < 8) {
                $(".nestedtableDiv").css("height", 1 + (31 * displayItem));
            }
            $('#nestedtable1').tableUI();
            exportDetailsView();

            // Prepare State data.
            var spl1 = $("#SP_Selection").val();
            var spl2 = $("#STL2_Selection").val();
            var rankType = $('input[type="radio"][name="rank"]:checked').val();

            var taxonomy = "";
            $("#SP_Selection option").each(function () {
                taxonomy += $(this).val() + "^";
            });
            var taxonomySelected = spl1;
            var supportLevel1 = "";
            $("#STL2_Selection option").each(function () {
                supportLevel1 += $(this).val() + "^";
            });
            var supportLevel1Selected = spl2;
            taxonomy = taxonomy.substring(0, taxonomy.length - 1);
            supportLevel1 = supportLevel1.substring(0, supportLevel1.length - 1);
            var GeographyLevel3;
            GeographyLevel3 = $("#txtRegionHidden").val();
            //var originationMethod = $("#originationMethodSelect").val();
            var productLevel1 = $("#ProLevel1HiddenP").val();
            var productLevel2 = $("#ProLevel2HiddenP").val();
            var productLevel3 = $("#ProLevel3HiddenP").val();

            var offeringLevel1 = $("#OffLevel1HiddenP").val();
            var offeringLevel2 = $("#OffLevel2HiddenP").val();
            var offeringLevel3 = $("#OffLevel3HiddenP").val();

            SavePageStatus(startDate, endDate, "", "", "", "", "", "", "", taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, "", "", rankType, "", "DrilldownForSurVol", "MSSolve", productLevel1, productLevel2, productLevel3, path, "", "", "", "", "", "", offeringLevel1, offeringLevel2, offeringLevel3);
        });
    }

    function GetDetailsViewForRuleCounts(startDate, endDate, SupportTopicDerivedID, height, fullpath) {
        $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Please wait...</p>");
        $("#detailsView").css("height", height);
        var host = getHostUrl();
        $.post(host + "/GetMSSolveRuleCountsDetails.srv",
        { startDate: startDate, endDate: endDate, SupportTopicDerivedID: SupportTopicDerivedID },
        function (data) {
            document.location.hash = "?guid=" + $("#txtGuid").val();
            var pathArray = unescape(fullpath).split("^");
            var path = "";
            $.each(pathArray, function (key, value) {
                path += value + "\\";
            });
            path = path.substring(0, path.length - 1);
            var rowList = $.parseJSON(data);
            var rowLength = rowList.length;
            $("#detailsView").width(670);
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
            $("#detailsView").css("height", (114 + (31 * displayItem)));
            var contentString = "";
            for (var i = 0; i < rowLength; i++) {
                var title;
                var author;
                var viewedPer;
                var helpPer;
                var notHelpPer;
                var responsePer;
                if ($.trim(rowList[i]["Title"]) == "") {
                    title = "-";
                }
                else {
                    if (len($.trim(rowList[i]["Title"])) > 40) {
                        if (len($.trim(rowList[i]["Title"])) == $.trim(rowList[i]["Title"]).length) {
                            title = $.trim(htmlEncode(rowList[i]["Title"])).substring(0, 50) + "...";
                        }
                        else {
                            title = $.trim(htmlEncode(rowList[i]["Title"])).substring(0, 50 / 2) + "...";
                        }
                    }
                    else {
                        title = htmlEncode(rowList[i]["Title"]);
                    }
                }
                if (rowList[i]["Author"] == "") {
                    author = "-";
                }
                else {
                    author = rowList[i]["Author"];
                }
                if (rowList[i]["ViewedPer"] == -1) {
                    viewedPer = "-";
                }
                else {
                    viewedPer = rowList[i]["ViewedPer"].toFixed(1) + "%";
                }
                if (rowList[i]["HelpPer"] == -1) {
                    helpPer = "-";
                }
                else {
                    helpPer = rowList[i]["HelpPer"].toFixed(1) + "%";
                }
                if (rowList[i]["NotHelpPer"] == -1) {
                    notHelpPer = "-";
                }
                else {
                    notHelpPer = rowList[i]["NotHelpPer"].toFixed(1) + "%";
                }
                if (rowList[i]["ResponsePer"] == -1) {
                    responsePer = "-";
                }
                else {
                    responsePer = rowList[i]["ResponsePer"].toFixed(1) + "%";
                }
                contentString += "<tr><td width='52%' style=\'text-align:left;\'>" + title + "</td><td width='10.5%' name='ServiceRequestNumber'>" + author + "</td><td width='9%' >" + viewedPer + "</td><td width='7%'>" + helpPer + "</td><td width='10.5%'>" + notHelpPer + "</td><td width='11%'>" + responsePer + "</td></tr>";

            }

            $("#detailsView").html("<span class='org_box_cor cor1'></span><div class='nestedHeader'>" +
                                   "<a href='javascript:void(0)' class='nestedFunctionFront' id='CopySR' onclick='copySR();'>Copy Titles to Clipboard</a><a style='display:none;'>" +
                                   "CSTC</a><a href='javascript:void(0)' class='nestedFunction' id='DetailsExport' >Export to Excel</a><a style='display:none;'>" +
                                   "ETE</a><div class='triangle-down' id='closeDetails' style='margin-left:595px'></div>" +
                                   "<table class='headertable' id='headertable'></table></div>" +
                                   "<div  class='nestedtableDiv' id='nestedtableDiv' style='height:280px;width:630px'><table class='nestedtable' id='nestedtable1' ><thead ><tr class='headertable nestedtableHeader' style='background-color:rgb(0, 0, 60);'><td width='55%'>Title</td><td width='13%'>Author</td>" + "<td width='8%'>Viewed%</td><td width='8%'>Help%</td><td width='8%'>NotHelp%</td><td width='8%'>Response%</td></tr></thead>" + contentString + "</table></div>");
            CloseDetailsBinding();
            if (rowLength <= 8) {
                $(".nestedtableDiv").css("width", 538);
            }
            if (displayItem < 8) {
                $(".nestedtableDiv").css("height", 1 + (31 * (displayItem + 1)));
            }
            $('#nestedtable1').tableUI();
            exportDetailsView();

            // Prepare State data.
            var spl1 = $("#SP_Selection").val();
            var spl2 = $("#STL2_Selection").val();
            var rankType = $('input[type="radio"][name="rank"]:checked').val();

            var taxonomy = "";
            $("#SP_Selection option").each(function () {
                taxonomy += $(this).val() + "^";
            });
            var taxonomySelected = spl1;
            var supportLevel1 = "";
            $("#STL2_Selection option").each(function () {
                supportLevel1 += $(this).val() + "^";
            });
            var supportLevel1Selected = spl2;
            taxonomy = taxonomy.substring(0, taxonomy.length - 1);
            supportLevel1 = supportLevel1.substring(0, supportLevel1.length - 1);
            var GeographyLevel3;
            GeographyLevel3 = $("#txtRegionHidden").val();
            //var originationMethod = $("#originationMethodSelect").val();
            var productLevel1 = $("#ProLevel1HiddenP").val();
            var productLevel2 = $("#ProLevel2HiddenP").val();
            var productLevel3 = $("#ProLevel3HiddenP").val();

            var offeringLevel1 = $("#OffLevel1HiddenP").val();
            var offeringLevel2 = $("#OffLevel2HiddenP").val();
            var offeringLevel3 = $("#OffLevel3HiddenP").val();

            SavePageStatus(startDate, endDate, "", "", "", "", "", "", "", taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, "", "", rankType,"", "DrilldownForRuleCounts", "MSSolve", productLevel1, productLevel2, productLevel3, path, "", "", "", "", "", "", offeringLevel1, offeringLevel2, offeringLevel3);
        });
    }

    function len(o) {
        var s, l = 0, c;
        for (i = 0; i < o.length; i++) {
            var c = o.charAt(i);
            if (c.charCodeAt(0) >= 128) {
                l += 2
            }
            else {
                l += 1
            }
        }
        return l;
    }

    function exportDetailsView() {
        $("#DetailsExport").click(function () {
            var exportButton = $("#DetailsExport");
            var host = getHostUrl();
            exportButton.attr("disabled", "disabled");
            $.ajax({
                url:host+ "/ExportDetailsView.srv",
                //data: { type: type },
                cache: false,
                success: function (result) {
                    if (result == '"-1"') {
                        $("#warningTitle").html("Export Excel Warning :");
                        $("#warningText").html("No data need to be exported, please view report first.");
                        $(".warning").overlay().load();
                    }
                    else if (result == '"0"') {
                        $("#warningTitle").html("Export Excel Warning :");
                        $("#warningText").html("Report columns is 0, please view report again.");
                        $(".warning").overlay().load();
                    }
                    else {
                        $('#iframe').attr('src', 'ExportDetailsView.srv');
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
    }

    function AppendAll(divID, txtID, hiddenID) {
        if ($("#" + divID + " input:checkbox:first").attr("checked")) {
            var selectedItems = 0;
            var itemsString = "";
            $("#" + divID + " input:checkbox").each(function (key, val) {
                $(this).attr("checked", true);
                selectedItems += 1;
                itemsString += $(this).val() + ",";
            });
            //if it's employee region hidden, just need to pass all to the stored procedure
            if (hiddenID == "txtRegionHidden") {
                itemsString = "All";
            }
            $('#' + hiddenID).attr("value", itemsString);
            //remove all item
            selectedItems = selectedItems - 1;
            $("#" + txtID).get(0).value = "Selected all " + selectedItems + " items";

        }
        else {
            $("#" + divID + " input:checkbox").each(function (key, val) {
                $(this).attr("checked", false);
            });
            $("#" + txtID).get(0).value = "Selected 0 item";
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
            totalString = "Selected all " + selectedCount + " items";
            if (hiddenID == "txtRegionHidden") {
                $('#' + hiddenID).attr("value", "All");
            }
        }
        if (selectedCount < count) {
            $("#" + divID + " input:checkbox:first").attr("checked", false);
            if (selectedCount == 1) {
                totalString = "Selected " + selectedCount + " item";
            }
            else {
                totalString = "Selected " + selectedCount + " items";
            }
        }
        if (selectedCount == 0) {
            $("#" + divID + " input:checkbox:first").attr("checked", false);
            totalString = "Selected 0 item";
        }
        $('#' + txtID).attr("value", totalString);
    }

    function ClearSelectedItems(txtID) {
        $('#' + txtID).attr("value", "");
    }   $(document).ready(function () {
        AppendAll('RegionList', 'txtRegion', 'txtRegionHidden');
    });

    $(document).ready(function () {
        SetxmlString01();
        SetXmlString();
        SetXmlStringForOfferingTree("NonTopIssueGBS");
    });

    //floating header
    function UpdateTableHeaders() {
        var scrollTop = $(window).scrollTop();
        //get the height of float header
        var fHeaderHeight = $("#floatHeaderDiv").height();
        if (scrollTop > 535) {
            //add if statement, edited by  mamba
            if ($("#TICReportTable").is(":visible")) {
                $("#floatHeaderDiv").show();
                $("#supportTopicTreeDiv").css("top", 20);
                $("#supportTopicTreeDiv").css("position", "fixed");
            }

        }
        else {
            $("#floatHeaderDiv").hide();
            $("#supportTopicTreeDiv").css("top", 385);
            $("#supportTopicTreeDiv").css("position", "absolute");
        }
    }

    UpdateTableHeaders();

    $(window).scroll(UpdateTableHeaders);
    $(window).resize(UpdateTableHeaders);
    ////floating header

    function DrillDownTrending(trendID, title, s1, datediff, Xlabor) {
        var startDate = s1[0][0];
        //s1[0][1] = 0;
        s1.shift();
        var ymax = 0;
        $.each(s1, function (key, value) {
            if (parseInt(ymax) < parseInt(value[1])) {
                ymax = parseInt(value[1]);
            }
        });
        ymax = parseInt(ymax) + 5;
        var intervalTick = parseInt(ymax / 5);
        intervalTick += 1;
        ymax = intervalTick * 5;
        plot1 = $.jqplot(trendID, [s1], {
            title: title,
            // Turns on animatino for all series in this plot.        
            animate: true,
            // Will animate plot on calls to plot1.replot({resetAxes:true})       
            animateReplot: true,
            cursor: {
                show: true,
                zoom: true,
                looseZoom: true,
                showTooltip: false
            },
            axesDefaults: {
//                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
//                tickOptions: {
//                    angle: -50,
//                    fontSize: '10pt'
//                }
                //pad: 0

            },
            axes: {
                // These options will set up the x axis like a category axis.            
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer,
                    min: startDate,
                    tickInterval: datediff,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    tickOptions: {
                        angle: -50,
                        fontSize: '10pt'
                    }
                },

                yaxis: {
                    max: ymax,
                    min: 0,
                    tickInterval: intervalTick,
                    autoscale: true,
                    label: Xlabor,
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    labelOptions: {
                        show: true,
                        fontSize: '10pt'
                    }
//                    tickOptions: {
//                        formatString: '%d'
//                    }
                }
            },
            seriesColors: ["#40B677"],
            highlighter:
                {
                    show: true,
                    showLabel: true,
                    tooltipAxes: 'both',
                    tooltipOffset: 2,
                    tooltipSeparator: ', Volume: ',
                    sizeAdjust: 7.5
                }
        });
        }

    var flag = true;
    function getTrendingData(SupportTopicDerivedID, fullPath, laborP, labor, TMPI, CaseVolumeP, CaseVolume, TB, BB, totalB, type, Xlabor, trendID, title) {
        var host = getHostUrl();
        var startDate = $("#trendStartDate").val();
        var endDate = $("#txtEndDate").val();
        var supportTopicDerivedID = SupportTopicDerivedID;
        var GeographyLevel3 = $("#copyRegion").val();
        var productVersion = $("#copyProductVersion").val();
        var pesServicedId = $("#copyPESServicedID").val();
        var type = type;
        $.post(host + "/GetTrendingData.srv",
        { startDate: startDate, endDate: endDate, supportTopicDerivedID: supportTopicDerivedID,
            GeographyLevel3: GeographyLevel3, productVersion: productVersion, type: type, PESServiceID: pesServicedId
        },
        function (data) {
            document.location.hash = "?guid=" + $("#txtGuid").val();
            var rowList = $.parseJSON(data);  

            if (rowList.length < 1 && trendID == "trendingLaborCanvas" || !flag) {
                $("#LaborTrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no labor trending data.</p>");
                CloseDetailsBindingTrend();
                return;
            }

            if (rowList.length < 1 && trendID == "trendingTMPICanvas" || !flag) {
                $("#TMPITrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no TMPI trending data.</p>");
                CloseDetailsBindingTrend();
                return;
            }

            if (rowList.length < 1 && trendID == "trendingVolumeCanvas") {
                flag=false;
                $("#VolumeTrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no TMPI trending data.</p>");
                $("#LaborTrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no labor trending data.</p>");
                $("#TMPITrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no TMPI trending data.</p>");
                CloseDetailsBindingTrend();
                return;
            }
            var datediff = rowList[0][1];

            DrillDownTrending(trendID, title, rowList, datediff, Xlabor);
        });

    }

    function showTrendingWindow(id, timerange, SupportTopicDerivedID, fullPath, laborP, labor, TMPI, CaseVolumeP, CaseVolume, TB, BB, totalB) {
        flag = true;
        if (SupportTopicDerivedID == null) {
            $("#trendContent").html("<div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down-trend' id='closeTrend'></div></div><p style='color:#ffffff;margin-left:400px; margin-top:200px;'>There's no trending data.</p>");
            CloseDetailsBindingTrend();
        }
        else {
            var pathArray = unescape(fullPath).split("^");
            var path = "";
            $.each(pathArray, function (key, value) {
                path += value + "\\";
            });
            path = path.substring(0, path.length - 1);
            $("#trendContent").html("<div><div style='margin-top:5%; margin-left:3%;'><div class='triangle-down-trend' id='closeTrend'></div></div>" +
                            "<div id='trending'>Trend Analysis</div><div class=treningDetails><table><tr><td colspan='2'><b>Support Topic:</b></td></tr>" +
                            "<tr><td colspan='2' style='height:45px;vertical-align:top;line-height:15px'>" + path + "</td></tr>" +
                            "<tr><td width='50%'><b>Time Range:</b></td><td>" + timerange +
                            "</td></tr><tr><td><b>Labor %:</b></td><td>" + laborP + "</td></tr><tr><td><b>Labor Hours:</b></td><td>" + labor + "</td></tr><tr><td><b>AVG TMPI:</b></td><td>"
                             + TMPI + "</td><tr><tr><td><b>Volume %:</b></td><td>" + CaseVolumeP + "</td></tr><tr><td><b>Volume:</b></td><td>" + CaseVolume +
                             "</td></tr><tr><td><b>CPE TB %:</b></td><td>" + TB + "</td></tr><tr><td><b>CPE BB %:</b></td><td>" + BB +
                             "</td></tr><tr><td><b>Survey Total:</b></td><td>" + totalB + "</td></tr></table></div>" +
                            "<div id='trendingVolumeCanvas' class='trendingVolumeCanvas'><div id='VolumeTrending'></div></div>" +
                            "<div id='trendingLaborCanvas' class='trendingLaborCanvas'><div id='LaborTrending'></div></div>" +
                            "<div id='trendingTMPICanvas' class='trendingTMPICanvas'><div id='TMPITrending'></div></div></div>");
            $("#VolumeTrending").html("<p style='color:#000000;margin-left:180px; margin-top:120px;'>Loading...</p><img style='color:#000000;margin-left:90px; margin-top:10px;'" +
                                      " src='../../images/MetroLoading.gif' alt='calculating...' />");
            $("#LaborTrending").html("<p style='color:#000000;margin-left:180px; margin-top:120px;'>Loading...</p><img style='color:#000000;margin-left:90px; margin-top:10px;'" +
                                      " src='../../images/MetroLoading.gif' alt='calculating...' />");
            $("#TMPITrending").html("<p style='color:#000000;margin-left:180px; margin-top:120px;'>Loading...</p><img style='color:#000000;margin-left:90px; margin-top:10px;'" +
                                      " src='../../images/MetroLoading.gif' alt='calculating...' />");

            getTrendingData(SupportTopicDerivedID, fullPath, laborP, labor, TMPI, CaseVolumeP, CaseVolume, TB, BB, totalB, "NotTopIssue", "Volume (numeric)", "trendingVolumeCanvas", "Volume Trend");
            getTrendingData(SupportTopicDerivedID, fullPath, laborP, labor, TMPI, CaseVolumeP, CaseVolume, TB, BB, totalB, "LaborNotTopIssue", "Labor (hours)", "trendingLaborCanvas", "Labor Trend");
            getTrendingData(SupportTopicDerivedID, fullPath, laborP, labor, TMPI, CaseVolumeP, CaseVolume, TB, BB, totalB, "TMPINotTopIssue", "TMPI (mins)", "trendingTMPICanvas", "TMPI Trend");

            // Prepare State data.
            var startDate = $("#txtStartDate").val();
            var endDate = $("#txtEndDate").val();

            var spl1 = $("#SP_Selection").val();
            var spl2 = $("#STL2_Selection").val();
            var rankType = $('input[type="radio"][name="rank"]:checked').val();

            var taxonomy = "";
            $("#SP_Selection option").each(function () {
                taxonomy += $(this).val() + "^";
            });
            var taxonomySelected = spl1;
            var supportLevel1 = "";
            $("#STL2_Selection option").each(function () {
                supportLevel1 += $(this).val() + "^";
            });
            var supportLevel1Selected = spl2;
            taxonomy = taxonomy.substring(0, taxonomy.length - 1);
            supportLevel1 = supportLevel1.substring(0, supportLevel1.length - 1);
            var GeographyLevel3;
            GeographyLevel3 = $("#txtRegionHidden").val();
            //var originationMethod = $("#originationMethodSelect").val();
            var productLevel1 = $("#ProLevel1HiddenP").val();
            var productLevel2 = $("#ProLevel2HiddenP").val();
            var productLevel3 = $("#ProLevel3HiddenP").val();

            var offeringLevel1 = $("#OffLevel1HiddenP").val();
            var offeringLevel2 = $("#OffLevel2HiddenP").val();
            var offeringLevel3 = $("#OffLevel3HiddenP").val();

            SavePageStatus(startDate, endDate, "", "", "", "", "", "", "", taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, "", "", rankType,"", "Trending", "MSSolve", productLevel1, productLevel2, productLevel3, path,"","","","","","",offeringLevel1,offeringLevel2,offeringLevel3);
            CloseDetailsBindingTrend();
        }
    }

    function TrendClickEvent(trendID, timerange, SupportTopicDerivedID, fullpath, laborP, labor, TMPI, volumeP, volume, TB, BB, totalB) {
        $("#trendMask").css("height", $(document).height());
        $("#trendMask").fadeTo(500, 0.25);
        $("#trendContent").html("<div>Loading..</div>");
        var $t = $('#trendTransition'),
        to = $("#" + trendID).offset();
        var height = screen.height;
        var width = $(document).width();
        var top = $(window).scrollTop();
        $('#trendContent').css({ width: 60, height: 60 });
        $('#trendContent').css("background", "#40B677");
        $t.css({
            top: to.top,
            left: to.left,
            display: 'block'
            }).animate({
                top: height / 2 + top,
                left: width / 2
            }, 600, function () {
                $(this).animate({
                    top: height * 0.15 + top,
                    left: width * 0.2
            }, 600);

            $('#trendContent').animate({
                width: 996.09,
                height: 644
            }, 600, function () {
                // open dialog here
                showTrendingWindow(trendID, timerange, SupportTopicDerivedID,
                escape(fullpath), laborP, labor, TMPI, volumeP, volume, TB, BB, totalB);
                CloseDetailsBindingTrend();
            });
        });
    }

    function LoadTaxonomyBasedOnTree()
    {
          $("#SP_Selection").attr("disabled", true);
          $("#STL2_Selection").attr("disabled", true);

          var value = $("#txtProductTreeHidden").attr("value");
          var modifiedValue = value.substring(0, value.length - 1);
          $("#okProductTreeHidden").attr("value", modifiedValue); //
          getProductInfo();
          $("#tree").fadeOut();
          $("#searchDiv").fadeOut();
          $("#productsNameList span").html("");
          $("#productsNameList").attr("class", "");
          $("#closeTreeDiv").fadeOut();
    }
    
    function ShowProductTree()
    {
        $("#searchDiv").fadeIn("slow");
        $("#matchtextbox").focus();
        $("#closeTreeDiv").fadeIn("slow");
        $("#tree").fadeIn("slow");
        $("#RegionList").hide();
    }
    function ShowOfferingTree() {
        $("#searchOffTrDiv").fadeIn("slow");
        $("#offTrMatchTextbox").focus();
        $("#closeOfferingTreeDiv").fadeIn("slow");
        $("#offeringTree").fadeIn("slow");
        $("#RegionList").hide();
        $("#TimeRangeList").css("display", "none");
        $("#divCheckBoxList").css("display", "none");
    }
    function HideOfferingTree() {
        $("#searchOffTrDiv").hide();
        $("#offeringTree").hide();
        $("#closeOfferingTreeDiv").hide();
    }
    function ShowRegion()
    {
        $("#RegionList").slideDown();
        $("#searchDiv").fadeOut("slow");
        $("#tree").fadeOut("slow");
        $("#closeTreeDiv").fadeOut("slow");
    }
    function CloseSupTopTree() {
        $("#supportTopicTreeDiv").fadeOut("slow");
    }

    /////////////////////////////////////////////////////////////
    // Feedback module script functions.
    var suspendedflag = 0;
    var childFlag = true;
    var currentFeedbackPageindex = 1;
    $(document).ready(function () {
        var suspended = $("#availableS");
        $("#feedByTime").css("background-color", "#000000");
        $("#feedByTime").css("color", "#ffffff");
        $("#availableS").click(function () {
            if (suspendedflag == 0) {
                expand();
            } else if (suspendedflag == 1) {
                contracts();
            }
        });

        $("#availableS").mousedown(function () {
            $("#availableS").attr("class", "availableS-Focus");
        });

        $("#availableS").mouseup(function () {
            $("#availableS").attr("class", "availableS");
        });

        $("#availableS").mouseover(function () {
            $("#availableS").attr("class", "availableS-Focus");
        });

        $("#availableS").mouseout(function () {
            $("#availableS").attr("class", "availableS");
        });


        $("#txtFeedback").focus(function () {
            $("#txtFeedback").attr("class", "txtFeedback");
            if ($("#txtFeedback").val() == "Hi, TIC team...") {
                $("#txtFeedback").val("");
            }
        });

        $("#txtFeedback").focusout(function () {
            if ($("#txtFeedback").val() == "") {
                $("#txtFeedback").attr("class", "txtFeendbackNoFocus");
                $("#txtFeedback").val("Hi, TIC team...");
            }
        });

        $("#txtFeedbackComment").focus(function () {
            $("#txtFeedbackComment").attr("class", "txtFeedbackComment");
            if ($("#txtFeedbackComment").val() == "My Comments To This FeedBack...") {
                $("#txtFeedbackComment").val("");
            }
        });

        $("#txtFeedbackComment").focusout(function () {
            if ($("#txtFeedbackComment").val() == "") {
                $("#txtFeedbackComment").attr("class", "txtFeedbackCommentNoFocus");
                $("#txtFeedbackComment").val("My Comments To This FeedBack...");
            }
        });

        // Add feedback into database.
        $("#sendFeedback").click(function () {
            var feedbackText = $.trim($("#txtFeedback").val());
            var trueLength = getLen(feedbackText);
            if (feedbackText == "" || feedbackText.length == 0 || feedbackText == "Hi, TIC team...") {
                InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Please input your feedback first, thank you.",
             "sendFeedback");
            }
//            else if (trueLength > 1000) {
//                InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Feedback must be less than 1000 characters.",
//             "sendFeedback");
//            }
            else {
                AddFeedback(feedbackText);
            }
        });

        // Add comments into database.
        $("#sendComment").click(function () {
            var commentText = $.trim($("#txtFeedbackComment").val());
            var trueLength = getLen(commentText);
            if (commentText == "" || commentText.length == 0 || commentText == "My Comments To This FeedBack...") {
                InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Please input your comment first, thank you.",
             "sendComment");
            }
//            else if (trueLength > 500) {
//                InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Comment must be less than 500 characters.",
//             "sendComment");
//            }
            else {
                var feedbackid = $("#txtFeedbackID").val();
                var fAlias = $("#txtAlias").val();
                AddFeedbackComments(commentText, feedbackid, fAlias);
            }
        });

        $("#feedByTime").click(function () {
            checkFilter("feedByTime");
        });

        $("#feedByTime").mousedown(function () {
            $("#feedByTime").css("background-color", "#000000");
            $("#feedByTime").css("color", "#ffffff");
        });

        $("#feedByTime").mouseup(function () {
            $("#feedByTime").css("background-color", "#000000");
            $("#feedByTime").css("color", "#ffffff");
        });

        $("#feedByTime").mouseover(function () {
            $("#feedByTime").css("background-color", "#000000");
            $("#feedByTime").css("color", "#ffffff");
        });

        $("#feedByTime").mouseout(function () {
            if ($('#RAfeedByTime').prop("checked") != true) {
                $("#feedByTime").css("background-color", "#CD7011");
                $("#feedByTime").css("color", "#000000")
            }
        });

        $("#feedByRate").click(function () {
            checkFilter("feedByRate");
        });

        $("#feedByRate").mousedown(function () {
            $("#feedByRate").css("background-color", "#000000");
            $("#feedByRate").css("color", "#ffffff");
        });

        $("#feedByRate").mouseup(function () {
            $("#feedByRate").css("background-color", "#000000");
            $("#feedByRate").css("color", "#ffffff");
        });

        $("#feedByRate").mouseover(function () {
            $("#feedByRate").css("background-color", "#000000");
            $("#feedByRate").css("color", "#ffffff");
        });

        $("#feedByRate").mouseout(function () {
            if ($('#RAfeedByRate').prop("checked") != true) {
                $("#feedByRate").css("background-color", "#CD7011");
                $("#feedByRate").css("color", "#000000");
            }
        });

        $("#backContent").click(function () {
            ViewCommentsByFeedbackID("", "", "", "", "", "left");
        });

        $("#backContent").mousedown(function () {
            $("#triangle-left").attr("class", "triangle-left-onfocus");
            $("#triangle-left-core").attr("class", "triangle-left-core-onfocus");
        });

        $("#backContent").mouseup(function () {
            $("#triangle-left").attr("class", "triangle-left");
            $("#triangle-left-core").attr("class", "triangle-left-core");
        });

        $("#backContent").mouseover(function () {
            $("#triangle-left").attr("class", "triangle-left-onfocus");
            $("#triangle-left-core").attr("class", "triangle-left-core-onfocus");
        });

        $("#backContent").mouseout(function () {
            $("#triangle-left").attr("class", "triangle-left");
            $("#triangle-left-core").attr("class", "triangle-left-core");
        });

        $("#feedbacktriangleup").click(function () {
            if ($("#feedbackvotevolume").attr("class") == "voteVolume") {
                var feedbackid = $("#txtFeedbackID").val();
                var volume = $("#feedbackvotevolume").html();
                AddFeedbackRate(feedbackid, volume, "test");
                $("#feedbackvotevolume").html("");
                $("#feedbackvotevolume").html(parseInt(volume) + 1);
                $("#feedbackvotevolume").attr("class", "voteVolumeDis");
                $("#feedbacktriangleup").attr("class", "triangle-up-dis");
            }
        });
    });


    function contracts() {
        var combox = $("#common_box");
        var width = combox.width();
        if (width == 350 && suspendedflag == 1) {
            //
            combox.animate({ width: "35px" }, 500, function () {
                $("#content").hide();
            });
            suspendedflag = 0;
        } else {

        }
    }


    function expand() {
        var combox = $("#common_box");
        var width = combox.width();
        if (childFlag == true) {
            $("#FeedbackMask").fadeTo(500, 0.25);
        }
        if (width == 35 && suspendedflag == 0) {
            $("#content").show();
            combox.animate({ width: "350px" }, 500, function () {
                var radioSelected = $('input:radio[name="feedback"]:checked');
                if (currentFeedbackPageindex == 1) {
                    LoadFeedback(currentFeedbackPageindex, 5, true, radioSelected.val());
                }
                else {
                    LoadFeedback(currentFeedbackPageindex, 5, false, radioSelected.val());
                }
            });
            suspendedflag = 1;
        } else {

        }
    }

    function checkFilter(spanid) {
        var radios = $('input:radio[name="feedback"]');
        $.each(radios, function () {
            $(this).prop("checked", false);
            var thisID = $(this).attr("tag");
            $("#" + thisID).css("background-color", "#CD7011");
            $("#" + thisID).css("color", "#000000");
        });
        $("#RA" + spanid).prop("checked", true);
        $("#" + spanid).css("background-color", "#000000");
        $("#" + spanid).css("color", "#ffffff");
        var radioSelected = $('input:radio[name="feedback"]:checked');
        $("#FeedbackMask").fadeTo(500, 0.25);
        currentFeedbackPageindex = 1;
        LoadFeedback(1, 5, true, radioSelected.val());
    }

    function LoadFeedback(PageIndex, PageSize, IsInit, OrderType) {
        var host = getHostUrl();
        $.post(host + "/ViewFeedbackContent.srv",
        { PageIndex: PageIndex, PageSize: PageSize, OrderType: OrderType },
        function (data) {
            //document.location.hash = "?guid=" + $("#txtGuid").val();
            var rowList = $.parseJSON(data);
            if (rowList["AllFeedbackContent"] == undefined && data.length == 65) {
                $(".feedbackTable").html("");
                $(".feedbackTable").html("<tr><td>No feedbacks.</td></tr>");
                $("#FeedbackMask").hide();
                return false;
            }
            var totalRecord = rowList["TotalFeedbackNum"];
            var totalPageNum = rowList["TotalPageNum"];
            if (IsInit) {
                LoadFeedbackStructure(totalRecord, totalPageNum);
            }

            if (totalPageNum == 1) {
                $("#paging span").attr("style", "margin-top:5px");
                $("#paging div.short").attr("style", "margin-top:15px");
            }
            if (totalPageNum == 2) {
                $("#paging ul li a").css("width", 15);
                $("#paging div.short").css("margin-top", 15);
            }
            if (totalPageNum > 2) {
                $("#paging ul li a").css("width", 15);
                $("#paging div.short").css("margin-top", 15);
            }

            var FeedbackList = rowList["AllFeedbackContent"];
            OrganizeFeedbackCode(FeedbackList);
        });
    }

    function LoadFeedbackStructure(totalRecord, totalPageNum) {
        $('#paging').smartpaginator({
            totalrecords: totalRecord,
            recordsperpage: 5,
            controlsalways: true,
            datacontainer: 'feedbackTable',
            dataelement: 'tr',
            initval: 0,
            next: 'Next',
            prev: 'Prev',
            first: 'First',
            last: 'Last',
            theme: 'mssolve',
            onchange: function (newPage) {
                $("#FeedbackMask").fadeTo(500, 0.25);
                // onchange event.
                if (totalPageNum == 1) {
                    $("#paging span").attr("style", "margin-top:5px");
                    $("#paging div.short").attr("style", "margin-top:15px");
                }
                if (totalPageNum == 2) {
                    $("#paging ul li a").css("width", 15);
                    $("#paging div.short").css("margin-top", 15);
                }
                if (totalPageNum > 2) {
                    $("#paging ul li a").css("width", 15);
                    $("#paging div.short").css("margin-top", 15);
                }
                var radioSelected = $('input:radio[name="feedback"]:checked');
                currentFeedbackPageindex = newPage;
                LoadFeedback(newPage, 5, false, radioSelected.val());
            }
        });
    }

    function OrganizeFeedbackCode(FeedbackList) {
        var feedbackHtml = "";

        for (var i = 0; i < FeedbackList.length; i++) {
            var canVote = FeedbackList[i]["CanVote"];
            var voteClassName = "triangle-up";
            var fontClassName = "voteVolume";
            if (canVote == "0") {
                voteClassName = "triangle-up-dis";
                fontClassName = "voteVolumeDis";

            }
            //triangle-up-dis
            var content = FeedbackList[i]["FeedBackDetailsContent"];
            var displayContent = "";
            var transformContent = "";
            if (content.length > 95) {
                displayContent = subString(content, 95);
                displayContent += "...";
            }
            else {
                displayContent = content;
            }
            transformContent = content.replace(/'/g, "");
            transformContent = transformContent.replace(/"/g, "");
            transformContent = encodeURIComponent(transformContent);

            feedbackHtml += "<tr><td><table class='itemTable'><tr><td height='67px'  onclick='ViewCommentsByFeedbackID(\"" +
                        FeedbackList[i]["FeedbackID"] + "\", 1, 3, true, \"" + transformContent + "\",\"right\", " + i + " ,\"" + FeedbackList[i]["Alias"] + "\", \"" +
                        FeedbackList[i]["CreatedTime"] + "\");'><div style='color:#b9a862;font-size:13px;margin-top:5px;'>" + FeedbackList[i]["Alias"] +
                       " said:</div> <div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>" + FeedbackList[i]["CreatedTime"] + "</div><br /><span style='color:#ffffff;font-size:13px;'>" + displayContent +
                       "</span></td></tr><tr><td height='15px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(138,139,125);'>" +
                       "<div class='CommentsCountDiv'  onclick='ViewCommentsByFeedbackID(\"" +
                        FeedbackList[i]["FeedbackID"] + "\", 1, 3, true, \"" + transformContent + "\",\"right\", " + i + " ,\"" + FeedbackList[i]["Alias"] + "\", \"" +
                        FeedbackList[i]["CreatedTime"] + "\");'>Comments(<span>" + FeedbackList[i]["CommentsCount"] + "</span>)  > ></div><div class='Morefeed'><div id='voteDIV" + i + "' class='" + voteClassName + "' onclick='AddFeedbackRate(\"" +
                       FeedbackList[i]["FeedbackID"] + "\", \"" + FeedbackList[i]["Rate"] + "\", \"" + i + "\");'></div>" +
                       "<div class='" + fontClassName + "' id='vote" + i + "'>" + FeedbackList[i]["Rate"] + "</div></div></td></tr></table></td></tr>";

        }
        $(".feedbackTable").html("");
        $(".feedbackTable").html(feedbackHtml);
        $("#FeedbackMask").hide();
    }

    function ViewCommentsByFeedbackID(FeedbackID, PageIndex, PageSize, IsInit, CommentsDetails, Direction, Voteid, Alias, Time) {
        if (childFlag && Direction == "right") {
            $("#child1").animate({ marginLeft: "-320px" }, 500);
            $("#child2").animate({ marginLeft: "0px" }, 500, function () {
                $("#CommentMask").fadeTo(500, 0.25);
                LoadFeedbackComments(FeedbackID, PageIndex, PageSize, true);
            });
            childFlag = !childFlag;
            $("#txtFeedbackID").val(FeedbackID);
            $("#txtAlias").val(Alias);
            var CanVote = $("#vote" + Voteid).attr("class");
            if (CanVote == "voteVolume") {
                $("#feedbacktriangleup").attr("class", "triangle-up");
                $("#feedbackvotevolume").attr("class", "voteVolume");
            }
            else {
                $("#feedbacktriangleup").attr("class", "triangle-up-dis");
                $("#feedbackvotevolume").attr("class", "voteVolumeDis");
            }
            $("#feedbackvotevolume").html("");
            $("#feedbackvotevolume").html($("#vote" + Voteid).html());
            $("#feedbackusername").html("");
            $("#feedbackusername").html(Alias);
            $("#feedbackdatetime").html("");
            $("#feedbackdatetime").html(Time);
            $("#feedbackcontent").html("");
            var content = decodeURIComponent(CommentsDetails);
            $("#feedbackcontent").html(content);
        }
        else if (!childFlag && Direction == "left") {
            $("#child1").animate({ marginLeft: "0px" }, 500);
            $("#child2").animate({ marginLeft: "330px" }, 500, function () {
                $("#FeedbackMask").fadeTo(500, 0.25);
                var radioSelected = $('input:radio[name="feedback"]:checked');
                LoadFeedback(currentFeedbackPageindex, 5, false, radioSelected.val());
            });
            childFlag = !childFlag;

        }
    }

    function LoadFeedbackComments(FeedbackID, PageIndex, PageSize, IsInit) {
        var host = getHostUrl();
        $.post(host + "/ViewFeedbackComments.srv",
        { FeedbackID: FeedbackID, PageIndex: PageIndex, PageSize: PageSize },
        function (data) {
            //document.location.hash = "?guid=" + $("#txtGuid").val();
            var rowList = $.parseJSON(data);
            if (rowList.length < 1) {
                return false;
            }
            var totalRecord = rowList["TotalFeedbackNum"];
            var totalPageNum = rowList["TotalPageNum"];

            if (IsInit) {
                LoadFeedbackCommentsStructure(FeedbackID, totalRecord, totalPageNum);
            }

            if (totalPageNum == 1) {
                $("#pagingComment span").attr("style", "margin-top:5px");
                $("#pagingComment div.short").attr("style", "margin-top:15px");
            }
            if (totalPageNum == 2) {
                $("#pagingComment ul li a").css("width", 15);
                $("#pagingComment div.short").css("margin-top", 15);
            }
            if (totalPageNum > 2) {
                $("#pagingComment ul li a").css("width", 15);
                $("#pagingComment div.short").css("margin-top", 15);
            }

            var CommentList = rowList["AllFeedbackComment"];
            OrganizeFeedbackCommentsCode(CommentList);
        });
    }

    function LoadFeedbackCommentsStructure(FeedbackID, totalRecord, totalPageNum) {
        $('#pagingComment').smartpaginator({
            totalrecords: totalRecord,
            recordsperpage: 3,
            controlsalways: true,
            datacontainer: 'commentTable',
            dataelement: 'tr',
            initval: 0,
            next: 'Next',
            prev: 'Prev',
            first: 'First',
            last: 'Last',
            theme: 'mssolve',
            onchange: function (newPage) {
                // onchange event.
                if (totalPageNum == 1) {
                    $("#pagingComment span").attr("style", "margin-top:5px");
                    $("#pagingComment div.short").attr("style", "margin-top:15px");
                }
                if (totalPageNum == 2) {
                    $("#pagingComment ul li a").css("width", 15);
                    $("#pagingComment div.short").css("margin-top", 15);
                }
                if (totalPageNum > 2) {
                    $("#pagingComment ul li a").css("width", 15);
                    $("#pagingComment div.short").css("margin-top", 15);
                }
                currentFeedbackCommentPageIndex = newPage;
                $("#CommentMask").fadeTo(500, 0.25);
                LoadFeedbackComments(FeedbackID, newPage, 3, false);
            }
        });
    }

    function OrganizeFeedbackCommentsCode(CommentList) {
        if (CommentList == null) {
            $(".commentTable").html("");
            $(".commentTable").html("<tr><td>No comments</td></tr>");
            $("#CommentMask").hide();
            return false;
        }
        var commentHtml = "";

        for (var i = 0; i < CommentList.length; i++) {

            //triangle-up-dis
            var content = CommentList[i]["Comments"];

            commentHtml += "<tr><td><table class='itemTable'><tr><td height='82px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(0,0,0);'><div style='color:#b9a862;font-size:13px;margin-top:2px;'>" +
                        CommentList[i]["Alias"] + " said: </div><div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>(" + CommentList[i]["CreatedTime"] + ")</div><br /><textarea  readonly='readonly' class='otherCommentTextarea'>" +
                       content + "</textarea></td></tr></table></td></tr>";

        }
        $(".commentTable").html("");
        $(".commentTable").html(commentHtml);
        $("#CommentMask").hide();
    }

    function AddFeedback(FeedBackDetailsContent) {
        var host = getHostUrl();
        $("#FeedbackSucMask").fadeTo(500, 0.25);
        $(".FeedbackSucMaskFont").html("");
        $(".FeedbackSucMaskFont").html("Sending...");
        $("#sendFeedback").prop('disabled', 'disabled');
        $.post(host + "/AddFeedBackContent.srv",
        { FeedBackDetailsContent: FeedBackDetailsContent },
        function (data) {
            if (data == "error") {
                InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Send Faild. Please contactTIC Team.", "sendFeedback");
            }
            else {
                InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Send Success.", "sendFeedback");

                $("#FeedbackMask").fadeTo(500, 0.25);
                var radioSelected = $('input:radio[name="feedback"]:checked');
                LoadFeedback(1, 5, true, radioSelected.val());
            }
        });
    }

    function InvokeFeedbackReminder(MaskId, fontClass, reminderText, referenceButtonid) {
        $("#" + MaskId).fadeTo(500, 0.25);
        $("." + fontClass).html("");
        $("." + fontClass).html(reminderText);
        $("#" + referenceButtonid).prop('disabled', 'disabled');
        setTimeout(function closeMask() {
            $("#" + MaskId).hide();
            $("#" + referenceButtonid).removeAttr('disabled', 'disabled');
        }, 2000);
    }

    function InvokeCommentReminder(MaskId, fontClass, reminderText, referenceButtonid) {
        $("#" + MaskId).fadeTo(500, 0.25);
        $("." + fontClass).html("");
        $("." + fontClass).html(reminderText);
        $("#" + referenceButtonid).prop('disabled', 'disabled');
        setTimeout(function closeMask() {
            $("#" + MaskId).hide();
            $("#" + referenceButtonid).removeAttr('disabled', 'disabled');
        }, 2000);
    }

    function AddFeedbackRate(FeedbackId, CurrentVoteNum, Voteid) {
        var host = getHostUrl();
        $.post(host + "/AddFeedBackRate.srv",
        { FeedbackId: FeedbackId },
        function (data) {
            if (data == "error") {
                $("#warningTitle").html("Rate Feedback");
                $("#warningText").html("Rate Failed. Please contact TIC team.");
                $(".warning").overlay().load();
            }
            else if (data == "0") {
                $("#vote" + Voteid).html("");
                $("#vote" + Voteid).html(parseInt(CurrentVoteNum) + 1);
                $("#vote" + Voteid).attr("class", "voteVolumeDis");
                $("#voteDIV" + Voteid).attr("class", "triangle-up-dis");
            }
            //        else {
            //            $("#warningTitle").html("Rate Feedback");
            //            $("#warningText").html("You've voted it or you cant vote your feedback.");
            //            $(".warning").overlay().load();
            //        }
        });
    }

    function AddFeedbackComments(Comment, FeedBackID, FAlias) {
        var host = getHostUrl();
        $.post(host + "/AddFeedBackComment.srv",
        { Comment: Comment, FeedBackID: FeedBackID, FAlias: FAlias },
        function (data) {
            if (data == "error") {
                InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Send Faild. Please contactTIC Team.",
             "sendComment");
            }
            else {
                InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Send Success.",
             "sendComment");

                $("#CommentMask").fadeTo(500, 0.25);
                LoadFeedbackComments(FeedBackID, 1, 3, true);
            }
        });
    }



    //////////////////////////////////////////////////////////
          