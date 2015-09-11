//code by AZ
//Common
$(document).ready(function () {
//    var script = document.createElement('script');
//    script.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
//    script.type = 'text/javascript';
//    document.getElementsByTagName('head')[0].appendChild(script);

    // $('head').append("<link href='../../Styles/FilterCSS.css?ver=20130530' rel='stylesheet' type='text/css' />");
    
});
function NewIdea(username,supportId, fullpath,laborP,labor,TMPI,caseVolP,caseVol,TB,BB,totalB,startDate,endDate) {
    var obj = new Object();
    obj.UserName = username;
    obj.SupportId = supportId;
    obj.FullPath = fullpath;
    obj.LaborP = laborP;
    obj.Labor = labor;
    obj.TMPI = TMPI;
    obj.CaseVolP = caseVolP;
    obj.CaseVol = caseVol;
    obj.TB = TB;
    obj.BB = BB;
    obj.TotalB = totalB;
    obj.startDate = startDate;
    obj.endDate = endDate;
    window.showModelessDialog("ideaform.aspx", obj, "dialogWidth=700px;dialogHeight=700px");
}
(function ($) {
    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'slow');
        return this; // for chaining...
    }
})(jQuery);


//function for get filter info
var filterDictJson;
function getProductInfo() {
    var productLevel1 = "";
    var productLevel2 = "";
    var productLevel3 = "";
    var productLevel4 = "";
    var value = $("#okProductTreeHidden").val();
    var productVersion = value;
    var host = getHostUrl();
    var type = "date";
    var startDate = $("#startDateInput").val();
    var endDate = $("#endDateInput").val();
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
                $("#STL2_Selection").append("<option value='no'>(No taxonomy exists.)</option>");
                $("#DisplayLevel1").text("Taxonomy");
                $("#DisplayTaxonomy").text("Support Topic Level 1");
                return;
            }
            //            filterDictJson = filterDictJson.sort(sortFunction);
            //            filterDictJson.reverse();
            $("#SP_Selection").append("<option value='all'>All</option>");
            $.each(filterDictJson, function (key, val) {
                //get key and append it into the Product Family selection
                $("#SP_Selection").append("<option value='" + val + "'>" + val + "</option>");
            });
            $("#SP_Selection").attr("disabled", false);

            getSTL2();
            $(".filterTitle").show(); //for solving the ie bug
            //    EnableCluster();
            //    EnableProAndTax();
        }
    );
}

//function to get support topic level2
function getSTL2() {
    var stLevel2Options = "";
    $("#SP_Selection option").each(function() {
        stLevel2Options += $(this).val() + "^";
    });
    var STL1 = $("#SP_Selection").val();
    var host = getHostUrl();
    $.post(
        host + "/GetSTL2.srv",
        {
            STL1: STL1,
            rcLevel1Options: stLevel2Options
        },
        function (data) {
            $("#STL2_Selection").find("option").remove();
            var STL2Array = $.parseJSON(data);
            //show it in page
            $("#STL2_Selection").append("<option value='All'>" + "All" + "</option>");
            for (var i = 0; i < (STL2Array.length); i++) {
                $("#STL2_Selection").append("<option value='" + STL2Array[i] + "'>" + STL2Array[i] + "</option>");
            }
            $("#STL2_Selection").attr("disabled", false);
            $("#DisplayLevel1").text($("#SP_Selection option:selected").text());
            $("#DisplayTaxonomy").text($("#STL2_Selection option:selected").text());
            EnableViewReportButton();
        }
    );
}

//function for sorting taxonomy
function sortFunction(a, b) {
    var aCode=0;
    var bCode=0;
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
    //end//

    //    //floating header
    //    function UpdateTableHeaders() {
    //        var scrollTop = $(window).scrollTop();
    //        if (scrollTop > 240) {
    //            $("#floatHeaderDiv").show();
    //        }
    //        else {
    //            $("#floatHeaderDiv").hide();
    //        }
    //    }

    //    UpdateTableHeaders();
    //    $(window).scroll(UpdateTableHeaders);
    //    $(window).resize(UpdateTableHeaders);

    //    ////floating header

    //    function UpdateFeedback() {
    //        var scrollLeft = $(window).scrollLeft();
    //        $("#common_box").css("right", -parseInt(scrollLeft));
    //        $("#common_box").css("position", "absolute");

    //    }

    //UpdateFeedback();
    //the commented two lines below are moved into viewReportLink's click event (edited by mamba)
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
        var type = "mssolved";
        var totalSTNumber = $("#totalSTSpan").text() == null ? "-" : $("#totalSTSpan").text();
        var totalSRVolume = $("#totalCaseSpan").text() == null ? "-" : $("#totalCaseSpan").text();
        var avgTMPI = $("#totalAVGTMPI").text() == null ? "-" : $("#totalAVGTMPI").text();
        var avgDTS = $("#totalAVGDTS").text() == null ? "-" : $("#totalAVGDTS").text();
        var avgTB = $("#AvgTB").text() == null ? "-" : $("#AvgTB").text();
        var avgBB = $("#AvgBB").text() == null ? "-" : $("#AvgBB").text();
        var UDEPercent = $("#totalReceivedPrecent").text() == null ? "-" : $("#totalReceivedPrecent").text();
        var SDP = $("#totalUploadPrecent").text() == null ? "-" : $("#totalUploadPrecent").text();
        var avgAnswerRate = "null";
        if ($("#answerRateStr").length > 0) {
            avgAnswerRate = $("#answerRateStr").text() == null ? "-" : $("#answerRateStr").text();
        }
        exportButton.attr("disabled", "disabled");
        $.ajax({
            url: host+"/ExportExcel.srv",
            //data: { type: type },
            data: { type: type, TotalSTNumber: totalSTNumber, TotalSRVolume: totalSRVolume, AVGTMPI: avgTMPI, AVGDTS: avgDTS, AVGTB: avgTB, AVGBB: avgBB,
                UDEPercent: UDEPercent, SDP: SDP, AVGAnswerRate: avgAnswerRate
            },
            cache: false,
            success: function (result) {
                if (result == '"-1"') {
                    $("#warningTitle").html("Export Excel Warning :");
                    $("#warningText").html("No data selected, please run the report first");
                    $(".warning").overlay().load();
                }
                else if (result == '"0"') {
                    $("#warningTitle").html("Export Excel Warning :");
                    $("#warningText").html("Report columns is 0, please run thr report again.");
                    $(".warning").overlay().load();
                }
                else {
                    //                    var data = $.parseJSON(data);
                    $('#iframe').attr('src', 'ExportExcel.srv?type=mssolved&TotalSTNumber=' + totalSTNumber + '&TotalSRVolume=' + totalSRVolume + '&AVGTMPI=' + avgTMPI + '&AVGDTS=' + avgDTS + '&AVGTB=' + avgTB + '&AVGBB=' + avgBB + '&UDEPercent=' + UDEPercent + '&SDP=' + SDP + '&AVGAnswerRate=' + avgAnswerRate);
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

    $("#viewReportLink").click(function () {
        ViewReport("click");
    });

    var RestoreFlag = true;
    if (RestoreFlag == true) {
        RestorePageStatus();
    }

    function ViewReport(action) {



        //get parameters
        DisableViewReportButton();
        $("#statisticDiv").html("");
        $("#export").hide();
        $("#viewAllIdeas").hide();
        //$("#totalSTSpan").text("");
        //$("#totalCaseSpan").text("");
        $("#showData").hide();
        $("#detailsView").fadeOut(0);
        var startDate = $("#startDateInput").val();
        var endDate = $("#endDateInput").val();
        $("#txtStartDate").val(startDate);
        $("#txtEndDate").val(endDate);
        var spl1 = $("#SP_Selection").val();
        var spl2 = $("#STL2_Selection").val();
        var rankType = $('input[type="radio"][name="rank"]:checked').val();
        var RankValue = $('input[type="radio"][name="top"]:checked').val();
        var originationMethod = $("#originationMethodSelect").val();

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
        //var productVersion = "All";
        var productVersion = $("#okProductTreeHidden").val();

        var pesServiceID = $("#txtOfferingTreeHidden").val();
        if (pesServiceID == "" || pesServiceID == null) {
            pesServiceID = "all";
            $("#OffLevel1HiddenP").val("All");
            $("#OffLevel2HiddenP").val("All");
            $("#OffLevel3HiddenP").val("All");
        }
        else {
            pesServiceID = pesServiceID.substring(0, pesServiceID.length - 1);
            $("#OffLevel1HiddenP").val($("#OffLevel1Hidden").val());
            $("#OffLevel2HiddenP").val($("#OffLevel2Hidden").val());
            $("#OffLevel3HiddenP").val($("#OffLevel3Hidden").val());
        }

        //TIC report
        //clear data
        $("#TICReportTable > tbody").empty();
        $("#TICReportTable").hide();
        $("#TICReportTable2").hide();
        var host = getHostUrl();

        // Copy filter into hidden texts
        $("#copyRegion").val(GeographyLevel3);
        $("#copyProductVersion").val(productVersion);
        $("#copyPESServicedID").val(pesServiceID);

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

        offTreeHTML = $("#offeringTree").html();
        offTreeHTML = escape(offTreeHTML);
        offTreeHeight = $("#offeringTree").height();
        offTreeWidth = $("#offeringTree").width();
        offTreeID = pesServiceID;
        offTreeNodes = "<all id='allid' text='all' value='all' showcheck='false' complete='true' checkstate='0' isexpand='true' hasChildren='true'>";
        offTreeNodes = LoopNodes(offeringallNodes[0].ChildNodes, offTreeNodes, 0);
        offTreeNodes = offTreeNodes + "</all>";
        offTreeNodes = escape(offTreeNodes);
        selectedItemsText = $("#txtOfferingTree").val().toLowerCase();
        if (selectedItemsText == "selected all items") {
            offTreeItems = "all";
        }
        else {
            offTreeItems = selectedItemsText.match(/\d+/)[0];
        }
        var ranktypeID = $('input[type="radio"][name="rank"]:checked').attr("id");
        var rankvalueID = $('input[type="radio"][name="top"]:checked').attr("id");
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
        $("#ProLevel1HiddenP").val($("#ProLevel1Hidden").val());
        $("#ProLevel2HiddenP").val($("#ProLevel2Hidden").val());
        $("#ProLevel3HiddenP").val($("#ProLevel3Hidden").val());

        var trendStartDate = getTrendStartDate(startDate, endDate);
        $("#trendStartDate").val(trendStartDate);

        if (action == "click") {
            SavePageStatus(startDate, endDate, quickSelect, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems, taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, originationMethod, ranktypeID, rankType,rankvalueID, "Viewreport", "MSSolve", $("#ProLevel1HiddenP").val(), $("#ProLevel2HiddenP").val(), $("#ProLevel3HiddenP").val(), "", offTreeHTML, offTreeID, offTreeNodes, offTreeHeight, offTreeWidth, offTreeItems, $("#OffLevel1HiddenP").val(), $("#OffLevel2HiddenP").val(), $("#OffLevel3HiddenP").val());
        }

        $("#loadImageDiv").show();
        TimerStart();
        $.post(
            host + "/GetCaseInfoBySTL1L2.srv",
            { startDate: startDate, endDate: endDate, productVersion: productVersion, spl1: spl1, spl2: spl2, GeographyLevel3: GeographyLevel3, originationMethod: originationMethod, rankType: rankType, rankValue:RankValue, InputPESServiceID: pesServiceID },
            function (data) {
                var domainName = $("#HeadLoginView_HeadLoginName").text();
                var userName = domainName.split("\\")[1];
                TimerStop();
                $("#loadImageDiv").hide();
                $("#showData").hide();
                $(".saveAction").show();
                var ticInfoJson = $.parseJSON(data); //ticList
                var rowList = ticInfoJson["TICInfoList"];
                var rowLength = (rowList == undefined) ? 0 : rowList.length;
                if (rowLength < 1) {
                    $("#showData").show();
                    var statisticHtml = "<span>Total ST Number:<font style=';font-weight:bold' id='totalSTSpan'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>Total SR Case:<font style=';font-weight:bold' id='totalCaseSpan'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>AVG TMPI:<font style=';font-weight:bold' id='totalAVGTMPI'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                     "<span>AVG DTS:<font style=';font-weight:bold' id='totalAVGDTS'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                      "<span>AVG TB:<font style=';font-weight:bold' id='AvgTB'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>AVG BB:<font style=';font-weight:bold' id='AvgBB'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                   "<span>SR File Received  %:<font style=';font-weight:bold' id='totalReceivedPrecent'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                "<span>SR MsgViewed %:<font style=';font-weight:bold' id='totalUploadPrecent'>-</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                "<span>AVG Answer Rate:<font style=';font-weight:bold' id='answerRateStr'>-</font></span>";
                    $("#statisticDiv").html(statisticHtml);
                    EnableViewReportButton();
                    return;
                }

                var rowString = "";
                var contentRowString = "";
                var contentRowLength;
                var backgroundColor;
                var totalSTNumber;
                var totalSRCase;
                var udeFileReceivedCount;
                var udeFileReceivedPercent;
                var sdpUploadedCount;
                var sdpUploadedPercent;
                var _avgTMPI = 0;
                var _avgDTS = 0;
                var _avgTB = 0;
                var _avgBB = 0;
                var _avgAnswerRate = 0;
                var _cThreadVol = 0;
                var answerRateStr = "";
                var _totalVolume = 0;

                // Used for display complete support topic full path or not.
                // If you want to show all, please set displayCompleteSupportTopicOnly variable to false.
                var rank = 1;
                var displayCompleteSupportTopicOnly = true;
                // Used for get 
                var availableRow = 0;

                //set overall info
                totalSTNumber = rowLength;



                if (ticInfoJson["AVGTMPI"] == -1) {
                    _avgTMPI = "-";
                }
                else {
                    _avgTMPI = ticInfoJson["AVGTMPI"].toFixed(1);
                }
                if (ticInfoJson["AVGDTS"] == -1) {
                    _avgDTS = "-";
                }
                else {
                    _avgDTS = ticInfoJson["AVGDTS"].toFixed(1);
                }
                if (ticInfoJson["AVGTB"] == -1) {
                    _avgTB = "-";
                }
                else {
                    _avgTB = ticInfoJson["AVGTB"].toFixed(1) + "%";
                }
                if (ticInfoJson["AVGBB"] == -1) {
                    _avgBB = "-";
                }
                else {
                    _avgBB = ticInfoJson["AVGBB"].toFixed(1) + "%";
                }
                if (ticInfoJson["TotalVolume"] == -1) {
                    _totalVolume = "-";
                }
                else {
                    _totalVolume = parseInt(ticInfoJson["TotalVolume"]);
                }
                udeFileReceivedCount = ticInfoJson["UDEFileReceivedCount"];
                if (udeFileReceivedCount > 0) {
                    udeFileReceivedPercent = ((udeFileReceivedCount / _totalVolume) * 100).toFixed(1) + "%";
                }
                else {
                    udeFileReceivedPercent = "-";
                }
                sdpUploadedCount = ticInfoJson["SDPUploadedCount"];
                if (sdpUploadedCount > 0) {
                    sdpUploadedPercent = ((sdpUploadedCount / _totalVolume) * 100).toFixed(1) + "%";
                }
                else {
                    sdpUploadedPercent = "-";
                }
                //                if (rowList[0]["TotalVolume"] == -1) {
                //                    totalSRCase = "-";
                //                }
                //                else {
                //                    totalSRCase = rowList[0]["TotalVolume"];
                //                }
                //$("#totalSTSpan").text(rowLength.toString());
                //$("#totalCaseSpan").text(rowList[0]["TotalVolume"].toString());

                for (var i = 0; i < rowLength; i++) {
                    //                    if (i % 2 == 0) {
                    //                        backgroundColor = "#FFFFFF";
                    //                    } else {
                    //                        backgroundColor = "#D3DFEE";
                    //                    }

                    if (backgroundColor == "#D3DFEE") {
                        backgroundColor = "#D3DFEE";
                    }
                    else {
                        backgroundColor = "#fff";
                    }
                    contentRowLength = rowList[i]["ContentList"].length;
                    if (rowList[i]["ContentList"].length > 0) {
                        var linkCount;
                        var pageView;
                        var responseCount;
                        var successRate;
                        if (rowList[i]["ContentList"][0]["LinkCount"] == -1) {
                            linkCount = "-";
                        }
                        else {
                            linkCount = rowList[i]["ContentList"][0]["LinkCount"];
                        }
                        if (rowList[i]["ContentList"][0]["PageViews"] == -1) {
                            pageView = "-";
                        }
                        else {
                            pageView = rowList[i]["ContentList"][0]["PageViews"];
                        }
                        if (rowList[i]["ContentList"][0]["ResponseCount"] == -1) {
                            responseCount = "-";
                        }
                        else {
                            responseCount = rowList[i]["ContentList"][0]["ResponseCount"];
                        }
                        if (rowList[i]["ContentList"][0]["SuccessRate"] == -1) {
                            successRate = "-";
                        }
                        else {
                            successRate = rowList[i]["ContentList"][0]["SuccessRate"];
                            successRate += "%";
                        }

                        contentRowString = "<td class='urlCell' style=\'text-align:left;padding-left:10px;\'>" +
                                                            "<a href='" + rowList[i]["ContentList"][0]["ResourceURL"] + "' target='_blank'>" +
                                                            rowList[i]["ContentList"][0]["ResourceURL"] + "</a></td><td>" +
                                                            linkCount + "</td><td>" +
                                                            pageView + "</td><td>" +
                                                            successRate + "</td><td>" +
                                                            responseCount + "</td><td>" +
                                                            rowList[i]["ContentList"][0]["ResourceType"] + "</td><td>" +
                                                            rowList[i]["ContentList"][0]["OriginationMethod"] + "</td>" +
                                                            "<tr>"
                    }
                    for (var j = 1; j < contentRowLength; j++) {
                        var linkCountM;
                        var pageViewM;
                        var responseCountM;
                        var successRateM;
                        if (rowList[i]["ContentList"][j]["LinkCount"] == -1) {
                            linkCountM = "-";
                        }
                        else {
                            linkCountM = rowList[i]["ContentList"][j]["LinkCount"];
                        }
                        if (rowList[i]["ContentList"][j]["PageViews"] == -1) {
                            pageViewM = "-";
                        }
                        else {
                            pageViewM = rowList[i]["ContentList"][j]["PageViews"];
                        }
                        if (rowList[i]["ContentList"][j]["ResponseCount"] == -1) {
                            responseCountM = "-";
                        }
                        else {
                            responseCountM = rowList[i]["ContentList"][j]["ResponseCount"];
                        }
                        if (rowList[i]["ContentList"][j]["SuccessRate"] == -1) {
                            successRateM = "-";
                        }
                        else {
                            successRateM = rowList[i]["ContentList"][j]["SuccessRate"];
                            successRateM += "%";
                        }
                        contentRowString = contentRowString + "<tr style='background-color:" + backgroundColor + "'><td style=\'text-align:left;padding-left:10px;\' class='urlCell'>" +
                                                                "<a href='" + rowList[i]["ContentList"][j]["ResourceURL"] + "' target='_blank'>" +
                                                                rowList[i]["ContentList"][j]["ResourceURL"] + "</a></td><td>" +
                                                            linkCountM + "</td><td>" +
                                                            pageViewM + "</td><td>" +
                                                            successRateM + "</td><td>" +
                                                            responseCountM + "</td><td>" +
                                                            rowList[i]["ContentList"][j]["ResourceType"] + "</td><td>" +
                                                            rowList[i]["ContentList"][j]["OriginationMethod"] + "</td>" +
                                                            "</tr>";
                    }

                    if (contentRowLength == 0) {
                        contentRowString = "<td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                    }

                    var labor;
                    var laborP;
                    var TMPI;
                    var AVG_DTS;
                    var CaseVolume;
                    var CaseVolumeP;
                    var totalB;
                    var TB;
                    var BB;
                    var UDEP;
                    var SDPP;
                    var ruleCounts = 0;
                    var ideaCount = 0;
                    var CThreadVolume;
                    var CPageView;
                    var CAnswerRate;
                    var CMSFTAnswer;
                    var CMVPAnswer;
                    var CMCCAnswer;
                    var CUniqueUsers;
                    var SupportTopicDerivedID = rowList[i]["SupportTopicDerivedID"];
                    if (SupportTopicDerivedID == -1) {
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
                        //_avgTMPI += rowList[i]["AvgTMPI"];
                    }
                    if (rowList[i]["AVG_DTS"] == -1) {
                        AVG_DTS = "-";
                    }
                    else {
                        AVG_DTS = rowList[i]["AVG_DTS"].toFixed(0);
                        //_avgDTS += rowList[i]["AVG_DTS"];
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
                    if (rowList[i]["UDEPresent"] == -1) {
                        UDEP = "-";
                    }
                    else {
                        UDEP = rowList[i]["UDEPresent"].toFixed(1);
                        UDEP += "%";
                    }
                    if (rowList[i]["SDPPresent"] == -1) {
                        SDPP = "-";
                    }
                    else {
                        SDPP = rowList[i]["SDPPresent"].toFixed(1);
                        SDPP += "%";
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
                            //totalTB += (rowList[i]["CPE_TB"] / rowList[i]["TotalSurvey"]) * 100;
                        }
                        if (rowList[i]["CPE_BB"] == -1) {
                            BB = "0";
                            BB += "%";
                        }
                        else {
                            BB = ((rowList[i]["CPE_BB"] / rowList[i]["TotalSurvey"]) * 100).toFixed(1);
                            BB += "%";
                            //totalBB += (rowList[i]["CPE_BB"] / rowList[i]["TotalSurvey"]) * 100;
                        }
                    }
                    if (rowList[i]["RuleCounts"] == -1) {
                        ruleCounts = "-";
                    }
                    else {
                        ruleCounts = rowList[i]["RuleCounts"];
                    }
                    if (rowList[i]["IdeaCount"] == -1) {
                        ideaCount = "-";
                    }
                    else {
                        ideaCount = rowList[i]["IdeaCount"];
                    }
                    
                    if (rowList[i]["ThreadVolumn"] == -1 || rowList[i]["ThreadVolumn"] == 0) {
                        CThreadVolume = "-";
                    }
                    else {
                        CThreadVolume = rowList[i]["ThreadVolumn"];
                        _cThreadVol += rowList[i]["ThreadVolumn"];
                        _avgAnswerRate += (rowList[i]["ThreadVolumn"]) * (rowList[i]["AnswerRate"] == -1 ? 0 : rowList[i]["AnswerRate"]);
                    }
                    if (rowList[i]["PageViews"] == -1 || rowList[i]["PageViews"] == 0) {
                        CPageView = "-";
                    }
                    else {
                        CPageView = rowList[i]["PageViews"];
                    }
                    if (rowList[i]["AnswerRate"] == -1 || rowList[i]["AnswerRate"] == 0) {
                        CAnswerRate = "-";
                    }
                    else {
                        CAnswerRate = (rowList[i]["AnswerRate"].toFixed(1)) * 100;
                        CAnswerRate += "%"
                    }

                    if (rowList[i]["MSFTAnsweredNum"] == -1 || rowList[i]["MSFTAnsweredNum"] == 0) {
                        CMSFTAnswer = "-";
                    }
                    else {
                        CMSFTAnswer = rowList[i]["MSFTAnsweredNum"];
                    }
                    if (rowList[i]["MVPAnsweredNum"] == -1 || rowList[i]["MVPAnsweredNum"] == 0) {
                        CMVPAnswer = "-";
                    }
                    else {
                        CMVPAnswer = rowList[i]["MVPAnsweredNum"];
                    }
                    if (rowList[i]["MCCAnsweredNum"] == -1 || rowList[i]["MCCAnsweredNum"] == 0) {
                        CMCCAnswer = "-";
                    }
                    else {
                        CMCCAnswer = rowList[i]["MCCAnsweredNum"];
                    }
                    if (rowList[i]["UniqueUsers"] == -1 || rowList[i]["UniqueUsers"] == 0) {
                        CUniqueUsers = "-";
                    }
                    else {
                        CUniqueUsers = rowList[i]["UniqueUsers"];
                    }
                    var fullpath = rowList[i]["SupportTopicFullPath"];
                    var fullArray = rowList[i]["SupportTopicFullPath"].replace(/\"/gi, "&#34;").replace(/&/gi, "&#38;").replace(/'/gi, "&#39;").replace("(", "&#40;", "gi").replace(")", "&#41;", "gi").split("\\");
                    var fullpath = "";
                    $.each(fullArray, function (key, value) {
                        fullpath += value + "^";
                    });
                    fullpath = fullpath.substring(0, fullpath.length - 1);
                    var timerange = trendStartDate + " - " + endDate;

                    var SupportTopicCount = rowList[i]["SupportTopicFullPath"].split('\\').length;
                    if (displayCompleteSupportTopicOnly) {
                        if (SupportTopicCount == 3) {
                            if (rowList[i]["IsCommunity"] == -1) {
                                $("#forumVol").hide();
                                $("#pageview").hide();
                                $("#answerrate").hide();
                                $("#msftanswered").hide();
                                $("#mvpanswered").hide();
                                $("#mccanswered").hide();
                                $("#uniqueuser").hide();
                                $("#comunityTitle").hide();
                                $("#forumVolH").hide();
                                $("#pageviewH").hide();
                                $("#answerrateH").hide();
                                $("#msftansweredH").hide();
                                $("#mvpansweredH").hide();
                                $("#mccansweredH").hide();
                                $("#uniqueuserH").hide();
                                $("#comunityTitleH").hide();
                                //----------------
                                rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + rank.toString() + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "' href='#BB" + i +
                            "' ><img id='imgBA" + i + "' class='TrendImage'   " +
                            "onclick='TrendClickEvent(\"BA" + i + "\", \"" + timerange + "\" , \"" + SupportTopicDerivedID + "\", \"" +
                            fullpath + "\",\"" + laborP + "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP + "\",\"" + CaseVolume + "\",\"" + TB +
                            "\",\"" + BB + "\",\"" + totalB + "\");' /></a><a style='display:none;'>BB" + i + "</a></td>" +
                            "<td style=\'text-align:left;padding-left:10px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["SupportTopicFullPath"] + "</td>" +
                            
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + AVG_DTS + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CaseVolumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \"" + fullpath + "\")' href='#AA" + i + "' >" + CaseVolume + "</a><a style='display:none;'>AA" + i + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \"" + fullpath + "\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + UDEP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + SDPP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'><a id='RC" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"RC" + i + "\", \"" + SupportTopicDerivedID + "\",\"ruleCounts\")' href='javascript:void(0)' >" + ruleCounts + "</a><a style='display:none;'>RC" + i + "</a></td>" +

                            //"<td rowspan=" + (contentRowLength + 1) + "><a href='idealists.aspx?startDate=" + startDate + "&endDate=" + endDate + "&supportid=" + SupportTopicDerivedID + "' target='_blank'>" +
                            //ideaCount+"</a><br/><br/><a href='javascript:void(0)' onclick='NewIdea(\"" + userName+"\",\"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP + "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP +
                            //"\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\",\"" + startDate + "\",\"" + endDate + "\")'>Create a content request</a>" + "</td>" +

                            contentRowString

                            }
                            else {
                                $("#forumVol").show();
                                $("#pageview").show();
                                $("#answerrate").show();
                                $("#msftanswered").show();
                                $("#mvpanswered").show();
                                $("#mccanswered").show();
                                $("#uniqueuser").show();
                                $("#comunityTitle").show();
                                $("#forumVolH").show();
                                $("#pageviewH").show();
                                $("#answerrateH").show();
                                $("#msftansweredH").show();
                                $("#mvpansweredH").show();
                                $("#mccansweredH").show();
                                $("#uniqueuserH").show();
                                $("#comunityTitleH").show();

                                rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + rank.toString() + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "' href='#BB" + i + "' ><img id='imgBA" + i + "' class='TrendImage'   " +
                            "onclick='TrendClickEvent(\"BA" + i + "\", \"" + timerange + "\" , \"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP +
                            "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP + "\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\");' /></a></a><a style='display:none;'>BB" + i + "</a></td>" +
                            "<td style=\'text-align:left;padding-left:10px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["SupportTopicFullPath"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + AVG_DTS + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CaseVolumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \"" + fullpath + "\",\"volume\")' href='#AA" + i + "' >" + CaseVolume + "</a><a style='display:none;'>AA" + i + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \"" + fullpath + "\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + UDEP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + SDPP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'><a id='RC" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"RC" + i + "\", \"" + fullpath + "\",\"ruleCounts\")' href='javascript:void(0)' >" + ruleCounts + "</a><a style='display:none;'>RC" + i + "</a></td>" +

                            
                            //"<td rowspan=" + (contentRowLength + 1) + "><a href='idealists.aspx?startDate=" + startDate + "&endDate=" + endDate + "&supportid=" + SupportTopicDerivedID + "' target='_blank'>" + ideaCount + "</a><br/><br/><a href='javascript:void(0)' onclick='NewIdea(\"" + userName + "\",\"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP + "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP +
                            //"\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\",\"" + startDate + "\",\"" + endDate + "\")'>Create a content request</a>" + "</td>" +

                            "<td rowspan=" + (contentRowLength + 1) + ">" + CThreadVolume + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CPageView + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CAnswerRate + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CMSFTAnswer + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CMVPAnswer + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CMCCAnswer + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'>" + CUniqueUsers + "</td>" +
                            contentRowString
                            }
                            $("#TICReportTable>tbody").append(rowString);
                            rank += 1;
                            if (backgroundColor == "#D3DFEE") {
                                backgroundColor = "#fff";
                            }
                            else {
                                backgroundColor = "#D3DFEE";
                            }
                            availableRow += 1;
                        }
                    }
                    else {
                        if (rowList[i]["IsCommunity"] == -1) {
                            $("#forumVol").hide();
                            $("#pageview").hide();
                            $("#answerrate").hide();
                            $("#msftanswered").hide();
                            $("#mvpanswered").hide();
                            $("#mccanswered").hide();
                            $("#uniqueuser").hide();
                            $("#comunityTitle").hide();
                            $("#forumVolH").hide();
                            $("#pageviewH").hide();
                            $("#answerrateH").hide();
                            $("#msftansweredH").hide();
                            $("#mvpansweredH").hide();
                            $("#mccansweredH").hide();
                            $("#uniqueuserH").hide();
                            $("#comunityTitleH").hide();
                            //----------------
                            rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + (i + 1).toString() + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "' href='#BB" + i + "' ><img id='imgBA" + i + "' class='TrendImage'   " +
                            "onclick='TrendClickEvent(\"BA" + i + "\", \"" + timerange + "\" , \"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP +
                            "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP + "\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\");' /></a><a style='display:none;'>BB" + i + "</a></td>" +
                            "<td style=\'text-align:left;padding-left:10px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["SupportTopicFullPath"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + AVG_DTS + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CaseVolumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \"" + fullpath + "\")' href='#AA" + i + "' >" + CaseVolume + "</a><a style='display:none;'>AA" + i + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \"" + fullpath + "\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + UDEP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'>" + SDPP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'><a id='RC" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"RC" + i + "\", \"" + fullpath + "\",\"ruleCounts\")' href='javascript:void(0)' >" + ruleCounts + "</a><a style='display:none;'>RC" + i + "</a></td>" +

                            
                            //"<td rowspan=" + (contentRowLength + 1) + "><a href='idealists.aspx?startDate=" + startDate + "&endDate=" + endDate + "&supportid=" + SupportTopicDerivedID + "' target='_blank'>" + ideaCount + "</a><br/><br/><a href='javascript:void(0)' onclick='NewIdea(\"" + userName + "\",\"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP + "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP +
                            //"\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\",\"" + startDate + "\",\"" + endDate + "\")'>Create a content request</a>" + "</td>" +

                            contentRowString
                        }
                        else {
                            $("#forumVol").show();
                            $("#pageview").show();
                            $("#answerrate").show();
                            $("#msftanswered").show();
                            $("#mvpanswered").show();
                            $("#mccanswered").show();
                            $("#uniqueuser").show();
                            $("#comunityTitle").show();
                            $("#forumVolH").show();
                            $("#pageviewH").show();
                            $("#answerrateH").show();
                            $("#msftansweredH").show();
                            $("#mvpansweredH").show();
                            $("#mccansweredH").show();
                            $("#uniqueuserH").show();
                            $("#comunityTitleH").show();

                            rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + (i + 1).toString() + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "' href='#BB" + i + "' ><img id='imgBA" + i + "' class='TrendImage'   " +
                            "onclick='TrendClickEvent(\"BA" + i + "\", \"" + timerange + "\" , \"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP +
                            "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP + "\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\");' /></a></a><a style='display:none;'>BB" + i + "</a></td>" +
                            
                            "<td style=\'text-align:left;padding-left:10px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["SupportTopicFullPath"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + AVG_DTS + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CaseVolumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \"" + fullpath + "\")' href='#AA" + i + "' >" + CaseVolume + "</a><a style='display:none;'>AA" + i + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \"" + fullpath + "\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + UDEP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'>" + SDPP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + " style='border-right-width:2px'><a id='RC" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"RC" + i + "\", \"" + fullpath + "\",\"ruleCounts\")' href='javascript:void(0)' >" + ruleCounts + "</a><a style='display:none;'>RC" + i + "</a></td>" +

                            
                            //"<td rowspan=" + (contentRowLength + 1) + "><a href='idealists.aspx?startDate=" + startDate + "&endDate=" + endDate + "&supportid=" + SupportTopicDerivedID + "' target='_blank'>" + ideaCount + "</a><br/><br/><a href='javascript:void(0)' onclick='NewIdea(\"" + userName + "\",\"" + SupportTopicDerivedID + "\", \"" + fullpath + "\",\"" + laborP + "\",\"" + labor + "\",\"" + TMPI + "\",\"" + CaseVolumeP +
                            //"\",\"" + CaseVolume + "\",\"" + TB + "\",\"" + BB + "\",\"" + totalB + "\",\"" + startDate + "\",\"" + endDate + "\")'>Create a content request</a>" + "</td>" +

                            "<td rowspan=" + (contentRowLength + 1) + ">" + CThreadVolume + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CPageView + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CAnswerRate + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CMSFTAnswer + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CMVPAnswer + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CMCCAnswer + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + CUniqueUsers + "</td>" +
                            contentRowString;
                        }
                        $("#TICReportTable>tbody").append(rowString);
                    }


                    contentRowLength = 0;
                    contentRowString = "";
                    rowString = "";
                }

                var statisticHtml = "<span>Total ST Number:<font style=';font-weight:bold' id='totalSTSpan'>" + totalSTNumber.toString() + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>Total SR Volume:<font style=';font-weight:bold' id='totalCaseSpan'>" + _totalVolume + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>AVG TMPI:<font style=';font-weight:bold' id='totalAVGTMPI'>" + _avgTMPI + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                     "<span>AVG DTS:<font style=';font-weight:bold' id='totalAVGDTS'>" + _avgDTS + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                      "<span>AVG TB:<font style=';font-weight:bold' id='AvgTB'>" + _avgTB + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>AVG BB:<font style=';font-weight:bold' id='AvgBB'>" + _avgBB + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                                    "<span>SR File Received  %:<font style=';font-weight:bold' id='totalReceivedPrecent'>" + udeFileReceivedPercent + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;";
                if (_avgAnswerRate == 0) {
                    statisticHtml += "<span>SR MsgViewed %:<font style=';font-weight:bold' id='totalUploadPrecent'>" + sdpUploadedPercent + "</font></span>";
                }
                else {
                    statisticHtml += "<span>SR MsgViewed %:<font style=';font-weight:bold' id='totalUploadPrecent'>" + sdpUploadedPercent + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" + "<span>AVG Answer Rate:<font style=';font-weight:bold' id='answerRateStr'>" + (_avgAnswerRate / _cThreadVol).toFixed(1) * 100 + "%</font></span>";
                }

                /* "<span>SDP Uploaded Count:<font style=';font-weight:bold' id='totalUploadCount'>" + sdpUploadedCount.toString() + "</font></span>&nbsp;&nbsp;" +*/
                $("#statisticDiv").html(statisticHtml);
                $("#export").show();
                $("#viewAllIdeas").show();
                // When no available row. hide
                // Change case number.
                if (displayCompleteSupportTopicOnly) {
                    $("#totalSTSpan").html((rank - 1).toString());
                }

                if (displayCompleteSupportTopicOnly && availableRow != 0) {
                    $("#TICReportTable").show("slow");
                    $("#TICReportTable2").show("slow");
                }
                else {
                    $("#showData").show();
                    EnableViewReportButton();
                    $("#totalSTSpan").html("");
                    $("#totalCaseSpan").html("");
                    $("#totalAVGDTS").html("");
                    $("#totalAVGTMPI").html("");
                    $("#AvgTB").html("");
                    $("#AvgBB").html("");
                    $("#totalReceivedPrecent").html("");
                    $("#totalUploadPrecent").html("");
                    $("#answerRateStr").html("");
                    return;
                }
                //--------------------------reset the position of support topic tree---------------------
                //get the width of supportTopticTD
                var supTopTDWidth = $("#supportTopticTD").width();
                //width of left arrow is 20
                var tdLeftPosition = $("#supportTopticTD").position();

                $("#supportTopicTreeDiv").css("left", tdLeftPosition.left + 20 + supTopTDWidth);
                //------------------------------------------end------------------------------------------
                EnableViewReportButton();
            }
        );
    }


    //    function SavePageStatus(startDate, endDate, quickSelect, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems, taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
    //                originationMethod, GeographyLevel3, ranktypeID) {
    //        var type = "mssolve";
    //        var generalType = "viewreport";
    //        $.ajax({
    //            url: "/GetUniqueUrlHandler.srv",
    //            data: { type: type, startDate: startDate, endDate: endDate, quickSelect: quickSelect, treeHTML: treeHTML, treeID: treeID,
    //                treeNodes: treeNodes, treeHeight: treeHeight, treeWidth: treeWidth, treeItems: treeItems, taxonomy: taxonomy,
    //                taxonomySelected: taxonomySelected, supportLevel1: supportLevel1, supportLevel1Selected: supportLevel1Selected,
    //                originationMethod: originationMethod, GeographyLevel3: GeographyLevel3, ranktypeID: ranktypeID, generalType: generalType 
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

    //function NewIdea(supportId)
    //{
    //    window.showModalDialog("ideaform.aspx", "", "dialogWidth=400px;dialogHeight=400px");
    //}

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
                            $("#warningTitle").html("Restore Page Status :");
                            $("#warningText").html("No related filter info.");
                            $(".warning").overlay().load();
                            return;
                        }

                        // Restore hidden text
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
                        var trendStartDate = getTrendStartDate(startdate, enddate);
                        $("#trendStartDate").val(trendStartDate);

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

                            $("#tree").height(parseInt(rowList.TreeHeight));
                            $("#closeTreeDiv").height(parseInt(rowList.TreeHeight) + 20);
                            $("#calculatingDiv").height(parseInt(rowList.TreeHeight));

                            $("#tree").width(parseInt(rowList.TreeWidth));
                            $("#closeTreeDiv").width(parseInt(rowList.TreeWidth));
                            $("#searchDiv").width(parseInt(rowList.TreeWidth));
                            $("#matchtextbox").width(parseInt(rowList.TreeWidth) - 10);
                            $("#productsNameList").width(parseInt(rowList.TreeWidth));
                            $("#calculatingDiv").width(parseInt(rowList.TreeWidth));

                            $("#calculatingPar").css("margin-top", ((parseInt(rowList.TreeHeight) + 28 - 72) / 2));
                            $("#txtProductTree").attr("value", "Selected " + rowList.TreeItems + " items");
                            selectedProducts = rowList.TreeID + ",";
                            $("#txtProductTreeHidden").attr("value", selectedProducts);

                        }

                        //restore Offering Tree
                        var offTreeNodes = unescape(rowList.OffTreeNodes);
                        offTreeNodes = $.parseXML(offTreeNodes);
                        var offTreeHTML = unescape(rowList.OffTreeHtml);
                        var $offRootNode = $(offTreeNodes).find("all");
                        var offRoot = {
                            "id": $offRootNode.attr("id"),
                            "Text": $offRootNode.attr("text"),
                            "value": $offRootNode.attr("value"),
                            "showcheck": $offRootNode.attr("showcheck") == "true" ? true : false,
                            complete: $offRootNode.attr("complete") == "true" ? true : false,
                            "isexpand": $offRootNode.attr("isexpand") == "true" ? true : false,
                            "checkstate": $offRootNode.attr("checkstate"),
                            "hasChildren": $offRootNode.attr("hasChildren") == "true" ? true : false,
                            "Level": "0"
                        }
                        if ($(offTreeNodes).find("all").children().length > 0) {
                            var nodesList = CreateDataSource(offRoot, $(offTreeNodes).find("all").children(), 0)
                            offRoot["ChildNodes"] = nodesList;
                            offeringTree.data = [offRoot];
                            identifierForOfferingTree = false;
                            $("#offeringTree").offeringtreeview(offeringTree);

                            $("#offeringTree").height(parseInt(rowList.OffTreeHeight));
                            $("#closeOfferingTreeDiv").height(parseInt(rowList.OffTreeHeight) + 20);
                            $("#calculatingDiv").height(parseInt(rowList.OffTreeHeight));

                            $("#offeringTree").width(parseInt(rowList.OffTreeWidth));
                            $("#closeOfferingTreeDiv").width(parseInt(rowList.OffTreeWidth));
                            $("#searchOffTrDiv").width(parseInt(rowList.OffTreeWidth));
                            $("#offTrMatchTextbox").width(parseInt(rowList.OffTreeWidth) - 10);
                            $("#offeringNameList").width(parseInt(rowList.OffTreeWidth));
                            $("#calculatingDiv").width(parseInt(rowList.OffTreeWidth));

                            $("#calculatingPar").css("margin-top", ((parseInt(rowList.OffTreeHeight) + 28 - 72) / 2));
                            $("#txtOfferingTree").attr("value", "Selected " + rowList.OffTreeItems + " items");
                            offeringselectedProducts = rowList.OffTreeID + ",";
                            $("#txtOfferingTreeHidden").attr("value", offeringselectedProducts);

                        }


                        // Restore Taxonomy.
                        var taxonomy = rowList.Taxonomy;
                        var taxArray = new Array();
                        taxArray = taxonomy.split('^');
                        $.each(taxArray, function (key, value) {
                            $("#SP_Selection").append("<option value='" + value + "'>" + value + "</option>");
                        });
                        var taxonomyselect = rowList.TaxonomySelected;
                        $("#SP_Selection").find("option[value='" + taxonomyselect + "']").attr("selected", true);
                        $("#DisplayLevel1").text(taxonomyselect);

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

                        //Restore origination method
                        var origination = rowList.OriginationMethod;
                        $("#originationMethodSelect").find("option[value='" + origination + "']").attr("selected", true);

                        // Restore Region dropdownlist
                        var region = rowList.Region;
                        if (region != "") {
                            var reArray = new Array();
                            reArray = region.split(',');
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

                        var rankvalue = rowList.RankValue;
                        $("#filterForm3 input[type='radio'][name='top']:checked").attr("checked", false);
                        $("#filterForm3 span.clusterSelect").attr("class", cluster_unchecked);
                        $("#" + rankvalue).attr("checked", true);
                        $("#Span" + rankvalue).attr("class", cluster_checked);

                        // Re-binding taxonomy by product level2 and remember selected taxonomy items.
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
    //andrew change the value from 7 to 8 to avoid start 7/1 and end 7/1 bug
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
            //$("#startDateInput").datepicker("option", "showAnim", slideDown);
            clearRadioButton('radio', 'filterForm');
            getProductInfo();
        }
        //var a = $("#SP_Selection").attr("disable");

    });

    $("#endDateInput").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showAnim: "slideDown",
        onSelect: function (selectedDate) {
            //$("#endDateInput").datepicker("option", "showAnim", "slideDown");
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
                    //$("#detailsView").animate({ "margin-left": (position.left - 290) + "px" }, 3000);
                }
                else {
                    //$("#detailsView").animate({ "margin-left": (position.left - 40) + "px" }, 3000);
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