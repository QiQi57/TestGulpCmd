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

//function for get filter info
var filterDictJson;

function getProductInfo() {
    var productLevel1 = "";
    var productLevel2 = "";
    var productLevel3 = "";
    var productLevel4 = "";
    var productVersion = "";
    var startDate = "";
    var endDate = "";
    var value = $("#okProductTreeHidden").val();
    productVersion = value;
    var host = getHostUrl();
    var type = "rootcause";
    startDate = $("#startDateInput").val();
    endDate = $("#endDateInput").val();
    DisableViewReportButton();
    $.post(
        host + "/GetTaxonomyByProductTree.srv",
        { productLevel1: productLevel1, productLevel2: productLevel2, productLevel3: productLevel3, productLevel4: productLevel4,
            productVersion: productVersion, type: type, startDate: startDate, endDate: endDate
        },
        function (data) {
            filterDictJson = $.parseJSON(data);
            $("#SP_Selection").find("option").remove();
            $("#STL2_Selection").find("option").remove();
            var rowLength = filterDictJson.length;
            if (rowLength < 1) {
                $("#SP_Selection").append("<option value='no'>(No taxonomy exists.)</option>");
                $("#STL2_Selection").append("<option value='no'>(No root cause level exists.)</option>");
                $("#DisplayLevel1").text("Taxonomy");
                $("#DisplayTaxonomy").text("Support Topic Level 1");
                return;
            }
//            filterDictJson = filterDictJson.sort(sortFunction);
//            filterDictJson.reverse();
            $.each(filterDictJson, function (key, val) {
                //get key and append it into the Product Family selection
                $("#SP_Selection").append("<option value='" + val.TaxonomyName + "'>" + val.TaxonomyName + "</option>");
            });
            $("#SP_Selection").attr("disabled", false);

            getSTL2();
            EnableViewReportButton();
            $(".filterTitle").show(); //for solving the ie bug
            //    EnableCluster();
            //    EnableProAndTax();
        }
    );
}

function getSTL2() {
    var rcLevel1Options = "";
    $("#SP_Selection option").each(function () {
        rcLevel1Options += $(this).val() + "^";
    });
    var STL1 = $("#SP_Selection").val();
    var host = getHostUrl();
    $.post(
        host + "/GetSTL2.srv",
        {
            STL1: STL1,
            rcLevel1Options: rcLevel1Options
        },
        function (data) {
            $("#STL2_Selection").find("option").remove();
            var STL2Array = $.parseJSON(data);
            //show it in page
            var $STlevel2 = $("#STL2_Selection");
            $STlevel2.append("<option value='All'>" + "All" + "</option>");
            for (var i = 0; i < (STL2Array.length) ; i++) {
                //if (STL2Array[i].length > 50) {
                //    STL2Array[i]= STL2Array[i].substring(0,50)+"...";
                //}
                $STlevel2.append("<option value='" + STL2Array[i] + "'>" + STL2Array[i] + "</option>");
            }
            $("#STL2_Selection").attr("disabled", false);
            $("#DisplayLevel1").text($("#SP_Selection option:selected").text());
            $("#DisplayTaxonomy").text($("#STL2_Selection option:selected").text());
            EnableViewReportButton();
        }
    );
}

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
    var guid = getUrlVars()["guid"];
    $("#txtGuid").val(guid);

    DisableViewReportButton();
    $("#loadImageDiv").hide();
    $("#showData").hide();
    $("#floatHeaderDiv").hide();
    //$("#reportTable").hide();
    $("#report_image").hide();
    $("#reportFrame").hide();
    $("#TICReportTable").hide();
    $("#TICReportTable2").hide();
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

    //start//loading STL2 options
    $("#SP_Selection").change(function () {
        $("#DisplayLevel1").text($("#SP_Selection option:selected").text());
        DisableViewReportButton();
        getSTL2();
    });

    $("#STL2_Selection").change(function () {
        $("#DisplayTaxonomy").text($("#STL2_Selection option:selected").text());
    });

    //floating header
    function UpdateTableHeaders() {
        if ($(window).scrollLeft() > 0) {
            //var leftOfFloatHeaderDiv = $("#floatHeaderDiv").position().left;
            //81 is from the result of above comment line
            var left = $(window).scrollLeft()
            $("#floatHeaderDiv").css("left", -left + 81);
        }
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

    //    function UpdateFeedback() {
    //        var scrollLeft = $(window).scrollLeft();
    //        $("#common_box").css("right", -parseInt(scrollLeft));
    //        $("#common_box").css("position", "absolute");

    //    }

    UpdateTableHeaders();
    //    UpdateFeedback();
    //the commented two lines below are moved into viewReportLink's click event (edited by mamba)
    $(window).scroll(UpdateTableHeaders);
    $(window).resize(UpdateTableHeaders);
    //    $(window).scroll(UpdateFeedback);
    //    $(window).resize(UpdateFeedback);

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
        var type = "rootcause";
        var totalSTNumber = $("#totalSTSpan").text() == null ? "-" : $("#totalSTSpan").text();
        var totalSRVolume = $("#totalCaseSpan").text() == null ? "-" : $("#totalCaseSpan").text();
        var avgTMPI = $("#AvgTMPI").text() == null ? "-" : $("#AvgTMPI").text();
        var avgDTS = $("#AvgDTS").text() == null ? "-" : $("#AvgDTS").text();
        var avgTB = $("#AvgTB").text() == null ? "-" : $("#AvgTB").text();
        var avgBB = $("#AvgBB").text() == null ? "-" : $("#AvgBB").text();
        exportButton.attr("disabled", "disabled");
        $.ajax({
            url: host + "/ExportExcel.srv",
            //data: { type: type },
            data: { type: type, TotalSTNumber: totalSTNumber, TotalSRVolume: totalSRVolume, AVGTMPI: avgTMPI, AVGDTS: avgDTS, AVGTB: avgTB, AVGBB: avgBB },
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
                    //                    var data = $.parseJSON(data);
                    $('#iframe').attr('src', 'ExportExcel.srv?type=rootcause&TotalSTNumber=' + totalSTNumber + '&TotalSRVolume=' + totalSRVolume + '&AVGTMPI=' + avgTMPI + '&AVGDTS=' + avgDTS + '&AVGTB=' + avgTB + '&AVGBB=' + avgBB);
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
        //SaveProductTree();
        ViewReport("click");
    });

    var RestoreFlag = true;
    if (RestoreFlag == true) {
        RestorePageStatus();
    }

    function ViewReport(action) {
        DisableViewReportButton();
        $("#statisticDiv").html("");
        $("#export").hide();
        //$("#overallInfoDiv").hide();
        //        $("#totalSTSpan").text("");
        //        $("#totalCaseSpan").text("");
        //get parameters
        $("#showData").hide();
        $("#detailsView").fadeOut(0);
        var startDate = $("#startDateInput").val();
        var endDate = $("#endDateInput").val();
        $("#txtStartDate").val(startDate);
        $("#txtEndDate").val(endDate);


        var spl1 = $("#SP_Selection").val();
        var spl2 = $("#STL2_Selection").val();
        var rankType = $('input[type="radio"][name="rank"]:checked').val();
        var topValue = $('input[type="radio"][name="top"]:checked').val();
        if (!startDate) {
            $("#warningTitle").html("View Report :");
            $("#warningText").html("Please select start date.");
            $(".warning").overlay().load();
            return;
        }

        if (!endDate) {
            $("#warningTitle").html("View Report :");
            $("#warningText").html("Please select end date.");
            $(".warning").overlay().load();
            return;
        }

        var GeographyLevel3;
        GeographyLevel3 = $("#txtRegionHidden").val();
        var productVersion = $("#okProductTreeHidden").val();
        //        var pesServiceID = $("#txtOfferingTreeHidden").val();
        //        if (pesServiceID == "" || pesServiceID == null) {
        //            pesServiceID = "all";
        //            $("#OffLevel1HiddenP").val("All");
        //            $("#OffLevel2HiddenP").val("All");
        //            $("#OffLevel3HiddenP").val("All");
        //        }
        //        else {
        //            pesServiceID = pesServiceID.substring(0, pesServiceID.length - 1);
        //            $("#OffLevel1HiddenP").val($("#OffLevel1Hidden").val());
        //            $("#OffLevel2HiddenP").val($("#OffLevel2Hidden").val());
        //            $("#OffLevel3HiddenP").val($("#OffLevel3Hidden").val());
        //        }

        //TIC report
        //clear data
        $("#TICReportTable > tbody").empty();
        $("#TICReportTable").hide();
        $("#TICReportTable2").hide();
        var host = getHostUrl();

        // Copy filter into hidden texts
        $("#copyRegion").val(GeographyLevel3);
        $("#copyProductVersion").val(productVersion);
        //$("#copyPESServicedID").val(pesServiceID);


        // Prepare State data.
        var quickSelect = "";
        $("#filterForm input:radio:checked").each(function (key, value) {
            quickSelect = $(this).attr("id");
        });
        var treeHTML = "";
        var treeID = "";
        var treeHeight = "";
        var treeWidth = "";
        var treeItems = "";
        var treeNodes = "";

        treeHTML = $("#tree").html();
        treeHTML = escape(treeHTML);
        treeHeight = $("#tree").height();
        treeWidth = $("#tree").width();
        treeID = productVersion;
        treeNodes = "<all id='allid' text='all' value='all' showcheck='false' complete='true' checkstate='0' isexpand='true' hasChildren='true'>";
        treeNodes = LoopNodes(allNodes[0].ChildNodes, treeNodes, 0);
        treeNodes = treeNodes + "</all>";
        treeNodes = escape(treeNodes);
        var selectedItemsText = $("#txtProductTree").val();
        treeItems = selectedItemsText.match(/\d+/)[0];


        var offTreeHTML = "";
        var offTreeID = "";
        var offTreeHeight = "";
        var offTreeWidth = "";
        var offTreeItems = "";
        var offTreeNodes = "";

        //        offTreeHTML = $("#offeringTree").html();
        //        offTreeHTML = escape(offTreeHTML);
        //        offTreeHeight = $("#offeringTree").height();
        //        offTreeWidth = $("#offeringTree").width();
        //        offTreeID = pesServiceID;
        //        offTreeNodes = "<all id='allid' text='all' value='all' showcheck='false' complete='true' checkstate='0' isexpand='true' hasChildren='true'>";
        //        offTreeNodes = LoopNodes(offeringallNodes[0].ChildNodes, offTreeNodes, 0);
        //        offTreeNodes = offTreeNodes + "</all>";
        //        offTreeNodes = escape(offTreeNodes);
        //        selectedItemsText = $("#txtOfferingTree").val().toLowerCase();
        //        if (selectedItemsText == "selected all items") {
        //            offTreeItems = "all";
        //        }
        //        else {
        //            offTreeItems = selectedItemsText.match(/\d+/)[0];
        //        }


        var ranktypeID = $('input[type="radio"][name="rank"]:checked').attr("id");
        var taxonomy = "";
        $("#SP_Selection option").each(function () {
            taxonomy += $(this).val() + "^";
        });
        //var taxonomySelected = $("#SP_Selection option:selected").text() + "*" + $("#SP_Selection").val();
        var supportLevel1 = "";
        $("#STL2_Selection option").each(function () {
            supportLevel1 += $(this).val() + "^";
        });
        var supportLevel1Selected = spl2; // spl2;
        taxonomy = taxonomy.substring(0, taxonomy.length - 1);
        //supportLevel1 = supportLevel1.substring(0, supportLevel1.length - 1);
        $("#ProLevel1HiddenP").val($("#ProLevel1Hidden").val());
        $("#ProLevel2HiddenP").val($("#ProLevel2Hidden").val());
        $("#ProLevel3HiddenP").val($("#ProLevel3Hidden").val());

        var trendStartDate = getTrendStartDate(startDate, endDate);
        $("#trendStartDate").val(trendStartDate);
        if (action == "click") {
            SavePageStatusRootCause(selectedSource, startDate, endDate, quickSelect, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems, taxonomy, spl1, supportLevel1, supportLevel1Selected,
                GeographyLevel3, "", ranktypeID, rankType,"",topValue, "Viewreport", "RootCause", $("#ProLevel1HiddenP").val(), $("#ProLevel2HiddenP").val(), $("#ProLevel3HiddenP").val(), "", offTreeHTML, offTreeID, offTreeNodes, offTreeHeight, offTreeWidth, offTreeItems, $("#OffLevel1HiddenP").val(), $("#OffLevel2HiddenP").val(), $("#OffLevel3HiddenP").val());
        }


        $("#loadImageDiv").show();
        TimerStart();
        $.post(
            host + "/GetCaseInfoByRootCause.srv",
            { startDate: startDate, endDate: endDate, productVersion: productVersion, selectedRootCause: spl1, Source: selectedSource, spl2: spl2, GeographyLevel3: GeographyLevel3, rankType: rankType, topValue: topValue, InputPESServiceID: "" },
            function (data) {
                TimerStop();
                $("#loadImageDiv").hide();
                $("#showData").hide();
                $(".saveAction").show();
                var ticInfoRootCauseJason = $.parseJSON(data); //ticList
                var rowList = ticInfoRootCauseJason["TICInfoList"];
                var rowLength = rowList.length;
                if (rowLength < 1) {
                    $("#showData").show();
                    EnableViewReportButton();
                    return;
                }

                var rowString = "";
                var contentRowString = "";
                var pageViewsRowString = "";
                var successRateRowString = "";
                var successCountRowString = "";
                var responseCountRowString = "";
                var contentRowLength;
                var backgroundColor = "#fff";
                var productsString = "";


                var _avgTMPI = 0;
                var _avgDTS = 0;
                var _avgTB = 0;
                var _avgBB = 0;
                var _totalVolume = 0;
                //var _avgAnswerRate;
                if (ticInfoRootCauseJason["AVGTMPI"] == -1) {
                    _avgTMPI = "-";
                }
                else {
                    _avgTMPI = ticInfoRootCauseJason["AVGTMPI"].toFixed(1);
                }
                if (ticInfoRootCauseJason["AVGDTS"] == -1) {
                    _avgDTS = "-";
                }
                else {
                    _avgDTS = ticInfoRootCauseJason["AVGDTS"].toFixed(1);
                }
                if (ticInfoRootCauseJason["AVGTB"] == -1) {
                    _avgTB = "-";
                }
                else {
                    _avgTB = ticInfoRootCauseJason["AVGTB"].toFixed(1) + "%";
                }
                if (ticInfoRootCauseJason["AVGBB"] == -1) {
                    _avgBB = "-";
                }
                else {
                    _avgBB = ticInfoRootCauseJason["AVGBB"].toFixed(1) + "%";
                }
                if (ticInfoRootCauseJason["TotalVolume"] == -1) {
                    _totalVolume = "-";
                }
                else {
                    _totalVolume = parseInt(ticInfoRootCauseJason["TotalVolume"]);
                }

                //set overall info
                //$("#overallInfoDiv").show();
                //$("#totalSTSpan").text(rowLength.toString());
                //$("#totalCaseSpan").text(rowList[0]["TotalVolume"].toString());

                var urlPattern = new RegExp("[http://*]|[https://*]");
                var seamResource;
                var seamTitle;
                var seamUrl;
                var pageViews;
                var successRate;
                var successCount;
                var responseCount;

                // Used for display complete support topic full path or not.
                // If you want to show all, please set displayCompleteSupportTopicOnly variable to false.
                var rank = 1;
                var displayCompleteSupportTopicOnly = false;
                // Used for get 
                var availableRow = 0;

                for (var i = 0; i < rowLength; i++) {
                    //set row color
                    //------------------if else statement added by mamba--------------
                    if (backgroundColor == "#D3DFEE") {
                        backgroundColor = "#D3DFEE";
                    }
                    else {
                        backgroundColor = "#fff";
                    }
                    //------------------------end---------------------------------

                    //------------commented by mamba------------
                    //                    if (i % 2 == 0) {
                    //                        backgroundColor = "#D3DFEE";
                    //                    } else {
                    //                        backgroundColor = "#fff";
                    //                    }
                    //------------end---------------------------

                    //get product list
                    //                    var productArray = rowList[i]["ProductList"];

                    //                    for (var k = 0; k < productArray.length; k++) {
                    //                        productsString = "[" + productArray[k] + "]</br>" + productsString;
                    //                    }

                    //so far, the handler doesn't return the seam/rootcause content list, 
                    //so set the default value 0
                    //contentRowLength = rowList[i]["SeamContentList"].length;
                    contentRowLength = 0;
                    //use regular expression to identify the url ttyle

                    if (contentRowLength > 0) {
                        seamResource = rowList[i]["SeamContentList"][0];
                        seamTitle = seamResource.Title.toString();
                        seamUrl = seamResource.ResourceURL.toString();
                        if (seamResource.PageViews == -1) {
                            pageViews = "-";
                        }
                        else {
                            pageViews = seamResource.PageViews;
                        }
                        if (seamResource.SuccessRate == -1) {
                            successRate = "-";
                        }
                        else {
                            successRate = seamResource.SuccessRate;
                        }
                        if (seamResource.SuccessCount == -1) {
                            successCount = "-";
                        }
                        else {
                            successCount = seamResource.SuccessCount;
                        }
                        if (seamResource.ResponseCount == -1) {
                            responseCount = "-";
                        }
                        else {
                            responseCount = seamResource.ResponseCount;
                        }
                        if (seamTitle.length == 0) {
                            seamTitle = seamUrl;
                        }

                        if (urlPattern.test(seamUrl)) {
                            contentRowString = "<td class='urlCell' style=\'text-align:left;padding-left:20px;\'><a href='" + seamUrl + "' target='_blank'>" + seamTitle + "</a></td>" +
                            "<td style=\'text-align:center;\'>" + pageViews + "</td>" +
                            "<td style=\'text-align:center;\'>" + successRate + "</td>" +
                            "<td  style=\'text-align:center;\'>" + successCount + "</td>" +
                            "<td  style=\'text-align:center;\'>" + responseCount + "</td><tr>";
                        } else {
                            contentRowString = "<td class='urlCell' style=\'text-align:left;padding-left:20px;\'></td>" +
                            "<td  style=\'text-align:center;\'></td>" +
                           "<td  style=\'text-align:center;\'></td>" +
                            "<td  style=\'text-align:center;\'></td>" +
                           "<td  style=\'text-align:center;\'></td><tr>";
                        }

                    }

                    for (var j = 1; j < contentRowLength; j++) {
                        seamResource = rowList[i]["SeamContentList"][j];
                        seamTitle = seamResource.Title.toString();
                        seamUrl = seamResource.ResourceURL.toString();
                        if (seamResource.PageViews == -1) {
                            pageViews = "-";
                        }
                        else {
                            pageViews = seamResource.PageViews;
                        }
                        if (seamResource.SuccessRate == -1) {
                            successRate = "-";
                        }
                        else {
                            successRate = seamResource.SuccessRate;
                        }
                        if (seamResource.SuccessCount == -1) {
                            successCount = "-";
                        }
                        else {
                            successCount = seamResource.SuccessCount;
                        }
                        if (seamResource.ResponseCount == -1) {
                            responseCount = "-";
                        }
                        else {
                            responseCount = seamResource.ResponseCount;
                        }
                        if (seamTitle.length == 0) {
                            seamTitle = seamUrl;
                        }
                        if (urlPattern.test(seamUrl)) {
                            contentRowString = contentRowString + "<tr style='background-color:" + backgroundColor + "'><td style=\'text-align:left;padding-left:20px;\'><a href='" + seamUrl + "' target='_blank'>" + seamTitle + "</a></td>" +
                            "<td style=\'text-align:center;\'>" + pageViews + "</td>" +
                            "<td style=\'text-align:center;\'>" + successRate + "</td>" +
                            "<td style=\'text-align:center;\'>" + successCount + "</td>" +
                            "<td style=\'text-align:center;\'>" + responseCount + "</td></tr>";

                        }
                        else {
                            //contentRowString = contentRowString + "<tr style='background-color:" + backgroundColor + "'><td class='urlCell'></td></tr>";
                            contentRowLength = contentRowLength - 1;
                        }
                    }

                    if (contentRowLength == 0) {
                        contentRowString = "<td></td><td></td><td></td><td></td><td></td><tr>";
                    }


                    //exclude the symptom
                    //var Symptom = rowList[i]["Symptom"];
                    //                    var syLength = Symptom.length;
                    //                    var syString = "<table class='syRootTable'>";
                    //                    if (syLength > 0) {
                    //                        for (var k = 0; k < syLength; k++) {
                    //                            syString += "<tr><td style='text-align:left; border-style:none; border-width:0px; overflow:hidden; word-wrap: break-word; text-overflow: ellipsis;'>" + Symptom[k] + "</td></tr>";
                    //                        }
                    //                    }
                    //                    syString += "</table>";

                    var Rootcase = rowList[i]["FPOfRootCause"];
                    var rootLength = Rootcase.length;
                    var rootString = "<table class='syRootTable' style='border-style:none; border-width:0px;'>";
                    if (rootLength > 0) {
                        for (var l = 0; l < rootLength; l++) {
                            rootString += "<tr><td style='text-align:left; border-style:none; border-width:0px; overflow:hidden; word-wrap: break-word; text-overflow: ellipsis;'>" + Rootcase[l].RowNum + "&nbsp;&nbsp;" + Rootcase[l].SupportTopicFullPath + "&nbsp;&nbsp;[" + Rootcase[l].CountOfSupportTopicFullPath + "]</td></tr>";
                        }
                    }
                    rootString += "</table>";

                    var labor;
                    var laborP;
                    var TMPI;
                    var avgDTS;
                    var CaseVolume;
                    var CaseVolumeP;
                    var totalB;
                    var TB;
                    var BB;
                    var SupportTopicDerivedID = rowList[i]["ClassificationId"];

                    if (SupportTopicDerivedID == -2) {
                        $("#warningTitle").html("View Report :");
                        $("#warningText").html("Cannot find details about current Support Topic.");
                        $(".warning").overlay().load();
                    }
                    if (rowList[i]["LaborBySupportTopicL2"] == -1) {
                        labor = "-";
                    }
                    else {
                        labor = rowList[i]["LaborBySupportTopicL2"].toFixed(0);
                    }
                    if (rowList[i]["LaborPresent"] == -1) {
                        laborP = "-";
                    }
                    else {
                        laborP = rowList[i]["LaborPresent"].toFixed(1);
                        laborP += "%";
                    }
                    if (rowList[i]["AvgTMPI"] == -1) {
                        TMPI = "-";
                    }
                    else {
                        TMPI = rowList[i]["AvgTMPI"].toFixed(0);
                        //totalTMPI += rowList[i]["AvgTMPI"];
                    }

                    if (rowList[i]["AVG_DTS"] == -1) {
                        avgDTS = "-";
                    }
                    else {
                        avgDTS = rowList[i]["AVG_DTS"].toFixed(0);
                        //totalDTS += rowList[i]["AVG_DTS"];
                    }

                    if (_totalVolume == 0) {
                        CaseVolume = "-";
                        CaseVolumeP = "-";
                    }
                    else if (_totalVolume == -1) {
                        CaseVolume = "-";
                        CaseVolumeP = "-";
                    }
                    else {
                        if (rowList[i]["CaseVolume"] == -1) {
                            CaseVolume = "-";
                            CaseVolumeP = "-";
                        }
                        else {
                            CaseVolume = rowList[i]["CaseVolume"];
                            CaseVolumeP = ((rowList[i]["CaseVolume"] / _totalVolume) * 100).toFixed(1);
                            CaseVolumeP += "%";
                        }
                    }

                    if (rowList[i]["TotalSurvey"] == 0) {
                        totalB = 0;
                        TB = '-';
                        BB = '-';
                    }
                    else if (rowList[i]["TotalSurvey"] == -1) {
                        totalB = "-";
                        TB = "-";
                        BB = "-";
                    }
                    else {
                        totalB = rowList[i]["TotalSurvey"];
                        if (rowList[i]["CPE_TB"] == -1) {
                            TB = "0";
                            TB += "%";
                        }
                        else {
                            TB = ((rowList[i]["CPE_TB"] / rowList[i]["TotalSurvey"]) * 100).toFixed(1);
                            TB += "%";
                            //totalTB += (rowList[i]["CPE_TB"] / rowList[i]["TotalSurvey"]) * 100
                        }
                        if (rowList[i]["CPE_BB"] == -1) {
                            BB = "0";
                            BB += "%";
                        }
                        else {
                            BB = ((rowList[i]["CPE_BB"] / rowList[i]["TotalSurvey"]) * 100).toFixed(1);
                            //totalBB += (rowList[i]["CPE_BB"] / rowList[i]["TotalSurvey"]) * 100;
                            BB += "%";
                        }
                    }

                    //var SupportTopicCount = rowList[i]["SupportTopicFullPath"].split('\\').length;
                    var fullArray = rowList[i]["ClassificationPath"].replace(/\"/gi, "&#34;").replace(/&/gi, "&#38;").replace(/'/gi, "&#39;").replace("(", "&#40;", "gi").replace(")", "&#41;", "gi").split("\\");
                    var fullpath = "";
                    $.each(fullArray, function (key, value) {
                        fullpath += value + "^";
                    });
                    fullpath = fullpath.substring(0, fullpath.length - 1);
                    var timerange = trendStartDate + " - " + endDate;
                    if (displayCompleteSupportTopicOnly) {
                        if (SupportTopicCount == 3) {

                            rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + rank.toString() + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "' href='#BB" + i + "' ><img id='imgBA" + i + "' class='TrendImage'   " +
                            "onclick='TrendClickEvent(\"BA" + i + "\", \"" + timerange + "\" , \"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP +
                            "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP + "\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\");' /></a><a style='display:none;'>BB" + i + "</a></td>" +
                            "<td style=\'text-align:left;padding-left:20px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["SupportTopicFullPath"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + avgDTS + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CaseVolumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \"" + fullpath + "\")' href='#AA" + i + "' >" + CaseVolume + "</a><a style='display:none;'>AA" + i + "</a></td>" +
                            "<td class='multiplierVal' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["Multiplier"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \"" + fullpath + "\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'>" + rootString + "</td>" +
                            contentRowString;
                            $("#TICReportTable>tbody").append(rowString);
                            rank += 1;
                            //------------------if else statement added by mamba--------------
                            if (backgroundColor == "#D3DFEE") {
                                backgroundColor = "#fff";
                            }
                            else {
                                backgroundColor = "#D3DFEE";
                            }
                            availableRow += 1;
                            //----------------------------end-----------------------------------
                        }
                    }
                    else {
                        rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + (i + 1).toString() + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "' href='#BB" + i + "' ><img id='imgBA" + i + "' class='TrendImage'   " +
                            "onclick='TrendClickEvent(\"BA" + i + "\", \"" + timerange + "\" , \"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP +
                            "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP + "\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\");' /></a><a style='display:none;'>BB" + i + "</a></td>" +
                            "<td style=\'text-align:left;padding-left:20px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["ClassificationPath"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + avgDTS + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CaseVolumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \"" + fullpath + "\")' href='#AA" + i + "' >" + CaseVolume + "</a><a style='display:none;'>AA" + i + "</a></td>" +
                            "<td class='multiplierVal' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["Multiplier"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \"" + fullpath + "\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>" +
                        //"<td rowspan=" + (contentRowLength + 1) + ">" + syString + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'>" + rootString + "</td>"; // +
                        //contentRowString;

                        $("#TICReportTable>tbody").append(rowString);
                        availableRow += 1;
                    }

                    contentRowLength = 0;
                    contentRowString = "";
                    rowString = "";
                }
                if (selectedSource != '1') {
                    $("#multiplierCol").hide();
                    $("#TICReportTable .multiplierVal").hide();
                } else {
                    $("#multiplierCol").show();
                    $("#TICReportTable .multiplierVal").show();
                }

                //$("#totalSTSpan").text(rowLength.toString());
                //$("#totalCaseSpan").text(rowList[0]["TotalVolume"].toString());
                var statisticHtml = "<span>Total RC Number:<font style=';font-weight:bold' id='totalSTSpan'>" + rowLength.toString() + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>Total SR Volume:<font style=';font-weight:bold' id='totalCaseSpan'>" + _totalVolume + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>AVG TMPI:<font style=';font-weight:bold' id='AvgTMPI'>" + _avgTMPI + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>AVG DTS:<font style=';font-weight:bold' id='AvgDTS'>" + _avgDTS + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>TB:<font style=';font-weight:bold' id='AvgTB'>" + _avgTB + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>BB:<font style=';font-weight:bold' id='AvgBB'>" + _avgBB + "</font></span>";
                $("#statisticDiv").html(statisticHtml);
                $("#export").show();

                // Change case number.
                if (displayCompleteSupportTopicOnly) {
                    $("#totalSTSpan").text((rank - 1).toString());
                }

                // When no available row. hide
                if (!displayCompleteSupportTopicOnly && availableRow != 0) {
                    $("#TICReportTable").show("slow");
                    $("#TICReportTable2").show("slow");
                }
                else {
                    $("#showData").show();
                    EnableViewReportButton();
                    //$("#statisticDiv").html("");
                    $("#totalSTSpan").text("");
                    $("#totalCaseSpan").text("");
                    $("#AvgTMPI").text("");
                    $("#AvgDTS").text("");
                    $("#AvgTB").text("");
                    $("#AvgBB").text("");
                    return;
                }


                //--------------------------reset the position of support topic tree---------------------
                //get the width of supportTopticTD
                var supTopTDWidth = $("#supportTopticTD").width();
                //width of left arrow is 20
                var tdLeftPosition = $("#supportTopticTD").position();
                $("#supportTopicTreeDiv").css("left", tdLeftPosition.left + 20 + supTopTDWidth + 59);
                //------------------------------------------end------------------------------------------
                EnableViewReportButton();
            }
        );
    }

    //    function SavePageStatus(startDate, endDate, quickSelect, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems, taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
    //                GeographyLevel3, ranktypeID, generalType, ProductLevel1, ProductLevel2, ProductLevel3) {
    //        var type = "seam";
    //        $.ajax({
    //            url: "/GetUniqueUrlHandler.srv",
    //            data: { type: type, startDate: startDate, endDate: endDate, quickSelect: quickSelect, treeHTML: treeHTML, treeID: treeID,
    //                treeNodes: treeNodes, treeHeight: treeHeight, treeWidth: treeWidth, treeItems: treeItems, taxonomy: taxonomy,
    //                taxonomySelected: taxonomySelected, supportLevel1: supportLevel1, supportLevel1Selected: supportLevel1Selected,
    //                GeographyLevel3: GeographyLevel3, ranktypeID: ranktypeID, generalType: generalType, ProductLevel1: ProductLevel1,
    //                ProductLevel2: ProductLevel2, ProductLevel3: ProductLevel3
    //            },
    //            type: "POST",
    //            cache: false,
    //            success: function (result) {
    //                var guid = $.parseJSON(result);
    //                document.location.hash = "?guid=" + guid;
    //                $("#txtGuid").val(guid);
    //            },
    //            error: function (result) {
    //                alert("error");
    //            }
    //        });
    //    }

    function RestorePageStatus() {
        RestoreFlag = true;
        var host = getHostUrl();
        var IsPostBack = $("#txtPostBack").val();
        if (IsPostBack == "true") {
            $("#txtPostBack").val("false");
            var guid = getUrlVars()["guid"];
            if (guid === undefined) {
            }
            else {
                $("#txtGuid").val(guid);
                $.ajax({
                    url: host + "/RestorePageStateHandler.srv",
                    data: { guid: guid },
                    type: "POST",
                    cache: false,
                    success: function (result) {
                        $("#SP_Selection").removeAttr("disabled");
                        $("#STL2_Selection").removeAttr("disabled");
                        var rowList = $.parseJSON(result);
                        if (rowList.length < 1) {
                            $("#warningTitle").html("Resotre Page Status :");
                            $("#warningText").html("No related filter info.");
                            $(".warning").overlay().load();
                            return;
                        }

                        // Restore hidden text
                        // Set selectedSource depend on the return value.
                        selectedSource = rowList.Source;
                        switch (rowList.Source) {
                            case '1':
                                $("#sbis").removeClass("clusterNoSelect").addClass("clusterSelect");
                                $("#mssolve").removeClass("clusterSelect").addClass("clusterNoSelect");
                                $("#asbis_mssolve").removeClass("clusterSelect").addClass("clusterNoSelect");
                                break;
                            case '2':
                                $("#mssolve").removeClass("clusterNoSelect").addClass("clusterSelect");
                                $("#asbis_mssolve").removeClass("clusterSelect").addClass("clusterNoSelect");
                                $("#sbis").removeClass("clusterSelect").addClass("clusterNoSelect");
                                break;
                            default:
                                $("#asbis_mssolve").removeClass("clusterNoSelect").addClass("clusterSelect");
                                $("#sbis").removeClass("clusterSelect").addClass("clusterNoSelect");
                                $("#mssolve").removeClass("clusterSelect").addClass("clusterNoSelect");
                                break;
                        }
                        $("#txtRegionHidden").val(rowList.Region);
                        $("#txtStartDate").val(rowList.StartDate);
                        $("#txtEndDate").val(rowList.EndDate);
                        $("#copyRegion").val(rowList.Region);
                        $("#copyProductVersion").val(rowList.TreeID);
                        $("#okProductTreeHidden").val(rowList.TreeID);
                        $("#copyPESServicedID").val(rowList.OffTreeID);
                        $("#txtOfferingTreeHidden").val(rowList.OffTreeID);
                        $("#ProLevel1Hidden").val(rowList.ProductLevel1)
                        $("#ProLevel2Hidden").val(rowList.ProductLevel2)
                        $("#ProLevel3Hidden").val(rowList.ProductLevel3)
                        $("#OffLevel1Hidden").val(rowList.OffLevel1)
                        $("#OffLevel2Hidden").val(rowList.OffLevel2)
                        $("#OffLevel3Hidden").val(rowList.OffLevel3)

                        // Restore Start and End date.
                        var startdate = rowList.StartDate;
                        $("#startDateInput").val(startdate);
                        var enddate = rowList.EndDate;
                        $("#endDateInput").val(enddate);

                        // Restore quick select.
                        var quickdate = rowList.QuickDate;
                        $("#" + quickdate).attr("checked", true);
                        $("#Span" + quickdate).attr("class", radio_checked);

                        // Restore Tree.
                        var treeNodes = escapeText(unescape(rowList.TreeNodes));
                        treeNodes = $.parseXML(treeNodes);
                        var treeHTML = unescape(rowList.TreeHtml);
                        var $rootNode = $(treeNodes).find("all");
                        var root = {
                            "id": $rootNode.attr("id"),
                            "Text": $rootNode.attr("text"),
                            "value": $rootNode.attr("value"),
                            "showcheck": $rootNode.attr("showcheck") == "true" ? true : false,
                            complete: $rootNode.attr("complete") == "true" ? true : false,
                            "isexpand": $rootNode.attr("isexpand") == "true" ? true : false,
                            "checkstate": $rootNode.attr("checkstate"),
                            "hasChildren": $rootNode.attr("hasChildren") == "true" ? true : false,
                            "Level": "0"
                        }
                        if ($(treeNodes).find("all").children().length > 0) {
                            var nodesList = CreateDataSource(root, $(treeNodes).find("all").children(), 0)
                            root["ChildNodes"] = nodesList;
                            o.data = [root];
                            identifier = false;
                            $("#tree").treeview(o);
                            $("#tree").width(parseInt(rowList.TreeWidth));
                            $("#closeTreeDiv").width(parseInt(rowList.TreeWidth));
                            $("#searchDiv").width(parseInt(rowList.TreeWidth));
                            $(".searchtextbox").width(parseInt(rowList.TreeWidth) - 10);
                            $("#productsNameList").width(parseInt(rowList.TreeWidth));
                            $("#calculatingDiv").width(parseInt(rowList.TreeWidth));
                            $("#tree").height(parseInt(rowList.TreeHeight));
                            $("#closeTreeDiv").height(parseInt(rowList.TreeHeight) + 20);
                            $("#calculatingDiv").height(parseInt(rowList.TreeHeight));
                            $("#calculatingPar").css("margin-top", ((parseInt(rowList.TreeHeight) + 28 - 72) / 2));
                            $("#txtProductTree").attr("value", "Selected " + rowList.TreeItems + " items");
                            selectedProducts = rowList.TreeID + ",";
                            $("#txtProductTreeHidden").attr("value", selectedProducts);
                        }

                        //restore Offering Tree
                        //                        var offTreeNodes = unescape(rowList.OffTreeNodes);
                        //                        offTreeNodes = $.parseXML(offTreeNodes);
                        //                        var offTreeHTML = unescape(rowList.OffTreeHtml);
                        //                        var $offRootNode = $(offTreeNodes).find("all");
                        //                        var offRoot = {
                        //                            "id": $offRootNode.attr("id"),
                        //                            "Text": $offRootNode.attr("text"),
                        //                            "value": $offRootNode.attr("value"),
                        //                            "showcheck": $offRootNode.attr("showcheck") == "true" ? true : false,
                        //                            complete: $offRootNode.attr("complete") == "true" ? true : false,
                        //                            "isexpand": $offRootNode.attr("isexpand") == "true" ? true : false,
                        //                            "checkstate": $offRootNode.attr("checkstate"),
                        //                            "hasChildren": $offRootNode.attr("hasChildren") == "true" ? true : false,
                        //                            "Level": "0"
                        //                        }
                        //                        if ($(offTreeNodes).find("all").children().length > 0) {
                        //                            var nodesList = CreateDataSource(offRoot, $(offTreeNodes).find("all").children(), 0)
                        //                            offRoot["ChildNodes"] = nodesList;
                        //                            offeringTree.data = [offRoot];
                        //                            identifierForOfferingTree = false;
                        //                            $("#offeringTree").offeringtreeview(offeringTree);

                        //                            $("#offeringTree").height(parseInt(rowList.OffTreeHeight));
                        //                            $("#closeOfferingTreeDiv").height(parseInt(rowList.OffTreeHeight) + 20);
                        //                            $("#calculatingDiv").height(parseInt(rowList.OffTreeHeight));

                        //                            $("#offeringTree").width(parseInt(rowList.OffTreeWidth));
                        //                            $("#closeOfferingTreeDiv").width(parseInt(rowList.OffTreeWidth));
                        //                            $("#searchOffTrDiv").width(parseInt(rowList.OffTreeWidth));
                        //                            $("#offTrMatchTextbox").width(parseInt(rowList.OffTreeWidth) - 10);
                        //                            $("#offeringNameList").width(parseInt(rowList.OffTreeWidth));
                        //                            $("#calculatingDiv").width(parseInt(rowList.OffTreeWidth));

                        //                            $("#calculatingPar").css("margin-top", ((parseInt(rowList.OffTreeHeight) + 28 - 72) / 2));
                        //                            $("#txtOfferingTree").attr("value", "Selected " + rowList.OffTreeItems + " items");
                        //                            offeringselectedProducts = rowList.OffTreeID + ",";
                        //                            $("#txtOfferingTreeHidden").attr("value", offeringselectedProducts);

                        //                        }

                        // Restore Taxonomy.
                        var taxonomy = rowList.Taxonomy;
                        var taxArray = new Array();
                        taxArray = taxonomy.split('^');
                        $.each(taxArray, function (key, value) {
                            $("#SP_Selection").append("<option value='" + value.toString() + "'>" + value.toString() + "</option>");
                        });
                        var taxonomyselect = rowList.TaxonomySelected;
                        $("#SP_Selection").find("option[value='" + taxonomyselect + "']").attr("selected", true);
                        $("#DisplayLevel1").text(rowList.TaxonomySelected);

                        // Restore Support Topic Level 1.
                         var stl1 = rowList.SupportTopicLevel1;
                         var stl1Array = new Array();
                         stl1Array = stl1.split('^');
                         $.each(stl1Array, function (key, value) {
                             $("#STL2_Selection").append("<option value='" + value + "'>" + value + "</option>");
                         });
                         var stl1select = rowList.SupportTopicLevel1Selected;
                         $("#STL2_Selection").find("option[value='" + stl1select + "']").attr("selected", true);
                         $("#DisplayTaxonomy").text(stl1select);

                        // Restore Region dropdownlist
                        var region = rowList.Region;
                        if (region != "") {
                            var reArray = new Array();
                            reArray = region.split('^');
                            $("#RegionList input:checkbox").each(function (key, val) {
                                $(this).attr("checked", false);
                            });
                            var count = 0;
                            $.each(reArray, function (key, value) {
                                $("#RegionList input:checkbox").each(function (key, val) {
                                    if (region == "All") {
                                        $(this).attr("checked", true);
                                    }
                                    else {
                                        if ($(this).val() == value) {
                                            $(this).attr("checked", true);
                                            count += 1;
                                        }
                                    }
                                });
                            });
                            if (region == "All") {
                                $("#txtRegion").val("Selected all 12 items");
                            }
                            else {
                                $("#txtRegion").val("Selected " + count + " items");
                            }
                        }

                        // Restore rank type
                        var ranktype = rowList.RankType;
                        $("#RadioFieldID10").attr("checked", false);
                        $("#SpanRadioFieldID10").attr("class", cluster_unchecked);
                        $("#" + ranktype).attr("checked", true);
                        $("#Span" + ranktype).attr("class", cluster_checked);

                        // Get top value
                        $("#RadioFieldID1" + rowList.TopValue).attr("checked", true);
                        $("#SpanRadioFieldID1" + rowList.TopValue).attr("class", cluster_checked);
                        $("#filterForm3 span").each(function(){
                            var selectId = "SpanRadioFieldID1" + rowList.TopValue;
                            if (this.id == selectId) {
                                $(this).attr("class", cluster_checked);
                            } else {
                                $(this).attr("class", cluster_unchecked);
                            }
                        });
                        ViewReport("restore");
                    },
                    error: function (result) {
                        alert("error");
                    }
                });
            }
        }
        else {

        }
    }

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function LoopNodes(nodes, str, level) {
        var xmlStr1 = "";
        level = level + 1;
        $.each(nodes, function (key, val) {
            if (val.ChildNodes != null) {
                str = str + "<SupportLevel" + level + " id='" + val.id + "' text='" + val.Text + "' value='" + val.Value + "' showcheck='" + val.showcheck + "' complete='" + val.complete + "' checkstate='" + val.checkstate + "' isexpand='" + true + "' hasChildren='" + val.hasChildren + "'>";
                xmlStr1 = LoopNodes(val.ChildNodes, str, level);
                str = xmlStr1;
            }
            else {
                str = str + "<SupportLevel" + level + " id='" + val.id + "' text='" + val.Text + "' value='" + val.Value + "' showcheck='" + val.showcheck + "' complete='" + val.complete + "' checkstate='" + val.checkstate + "' isexpand='" + false + "' hasChildren='" + val.hasChildren + "'>";
            }
            str = str + "</SupportLevel" + level + ">";
            xmlStr1 = str;
        });
        return xmlStr1;
    }


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
            getProductInfo();
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
            getProductInfo();
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
function CloseDetailsBindingTrend() {
    $("#closeTrend").click(function () {
        $("#trendContent").html("<div>Closing...</div>");
        $("#trendTransition").hide();
        $("#trendMask").hide();
        $('#closeTrend').attr("class", "triangle-down-click-trend");
    });

    $("#closeTrend").mousedown(function () {
        $("#closeTrend").attr("class", "triangle-down-click-trend");
    });

    $("#closeTrend").mouseup(function () {
        $("#closeTrend").attr("class", "triangle-down-trend");
    });

    $("#closeTrend").mouseover(function () {
        $("#closeTrend").attr("class", "triangle-down-click-trend");
    });

    $("#closeTrend").mouseout(function () {
        $("#closeTrend").attr("class", "triangle-down-trend");
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
//--------added by mamba-----
//the initial value is false, 
var panelIsVisible = false;
//---------end------------
$(document).ready(function () {
    $(".trigger").click(function () {
        var id = -1;
        id = $("#txtTag").val(); ;
        if (id != -1) {
            var position = $("#" + id).position();
            if (position != null) {
                if ($(this).attr('class') == 'trigger active') {
                    //$("#detailsView").animate({ "margin-left": (position.left - 290) + "px" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1000);
                }
                else {
                    //$("#detailsView").animate({ "margin-left": (position.left - 40) + "px" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1000);
                }
            }
        }
        $(".panel").toggle("slow");
        //--------added by mamba----------------
        //move the calculating div
        var panelWidth = 250; //this value based on the panel's width(250)
        //get the position of cover of tree
        var position1 = $("#calculatingDiv").position();
        //reset the postion of cover of tree when it's visible
        if (!panelIsVisible) {
            if ($("#calculatingDiv").is(":visible")) {
                panelIsVisible = true;
                $("#calculatingDiv").animate({ left: (position1.left + panelWidth) + "px" }, "slow");
            }
            panelIsVisible = true;
        }
        else {
            if ($("#calculatingDiv").is(":visible")) {
                panelIsVisible = true;
                $("#calculatingDiv").animate({ left: (position1.left - panelWidth) + "px" }, "slow");
            }
            panelIsVisible = false;
        }
        //----------------end------------------------
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

    $('#viewReportLink').click(function () {

    });
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

