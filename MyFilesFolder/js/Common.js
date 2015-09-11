var pathDir = "/TIC";
//sample: http://andrewzhu-msft:8088
function getHostUrl() {
    var protocol = window.location.protocol;
    var host = window.location.host;
    return protocol + "//" + host + pathDir;
}

function htmlEncode(value) {
    if (value) {
        return $('<div />').text(value).html();
    }
    else {
        return '';
    }
}

function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    }
    else {
        return '';
    }
}

function copyToClipboard(text, count) {
    clipboardData.setData('Text', text);
    if (count != 0) {
        $("#warningText").html("Copy " + count + " items Successfully.");
        $(".warningTitle").html("<span>Copy to clipboard:</span>");
        $(".warning").overlay().load();
    }
    else {
        $("#warningText").html("Copy 0 item.");
        $(".warningTitle").html("<span>Copy to clipboard:</span>");
        $(".warning").overlay().load();
    }
}

function copySR() {
    var items = $("[name='ServiceRequestNumber']");
    var SRString = "";
    var count = 0;
    items.each(function () {
        SRString += $(this).text() + "\r\n";
        count += 1;
    });
    copyToClipboard(SRString,count);
}

function DisableViewReportButton() {
    $("#viewReportLink").prop('disabled', 'disabled');
}

function EnableViewReportButton() {
    $("#viewReportLink").removeAttr("disabled");
}


function TimerStart() {
    var cost = parseInt($("#searchTimeCost").text());
    t = t + 1;
    $("#searchTimeCost").text(t);
    flag = setTimeout("TimerStart()", 1000);           
}

function TimerStop() {
    clearTimeout(flag);
    t = 0;
}

/// String Handlers for multiple language and special characters //
function getLen(str) {
    var totallength = 0;
    for (var i = 0; i < str.length; i++) {
        var intCode = str.charCodeAt(i);
        if (intCode >= 0 && intCode <= 128) {
            totallength = totallength + 1;
        }
        else {
            totallength = totallength + 2;
        }
    } //end for
    return totallength;
}

function subString(str, len, hasDot) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        }
        else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
}
/////////////////////////////////////////////////////

function SavePageStatus(startDate, endDate, quickSelect, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems, taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, originationMethod, ranktypeID, rankBy,rankValue, generalType, type, ProductLevel1, ProductLevel2, ProductLevel3, supportFullPath, offeringTreeHTML, offeringTreeID, offeringTreeNodes, offeringTreeHeight, offeringTreeWidth, offeringTreeItems,offeringLevel1,offeringLevel2,offeringLevel3) {
    $.ajax({
        url: getHostUrl() +"/GetUniqueUrlHandler.srv",
        data: { type: type, startDate: startDate, endDate: endDate, quickSelect: quickSelect, treeHTML: treeHTML, treeID: treeID,
            treeNodes: treeNodes, treeHeight: treeHeight, treeWidth: treeWidth, treeItems: treeItems, taxonomy: taxonomy,
            taxonomySelected: taxonomySelected, supportLevel1: supportLevel1, supportLevel1Selected: supportLevel1Selected,
            GeographyLevel3: GeographyLevel3, originationMethod: originationMethod, ranktypeID: ranktypeID, rankBy: rankBy, rankValueID:rankValue,
            generalType: generalType, ProductLevel1: ProductLevel1, ProductLevel2: ProductLevel2, ProductLevel3: ProductLevel3,
            supportFullPath: supportFullPath, OffTreeHTML: offeringTreeHTML, OffTreeID: offeringTreeID, OffTreeNodes: offeringTreeNodes, OffTreeHeight: offeringTreeHeight, OffTreeWidth: offeringTreeWidth, OffTreeItems: offeringTreeItems, OffLevel1: offeringLevel1, OffLevel2: offeringLevel2, OffLevel3: offeringLevel3
        },
        type: "POST",
        cache: false,
        success: function (result) {
            var guid = $.parseJSON(result);
            if (generalType == "Viewreport") {
                document.location.hash = "?guid=" + guid;
                $("#txtGuid").val(guid);
            }
            
        },
        error: function (result) {
            alert("error");
        }
    });
}

//  RootCause page and Top Content(Seam) page will use this method.
function SavePageStatusRootCause(selectedSource, startDate, endDate, quickSelect, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems, taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, originationMethod, ranktypeID, rankBy, rankValue, topValue, generalType, type, ProductLevel1, ProductLevel2, ProductLevel3, supportFullPath, offeringTreeHTML, offeringTreeID, offeringTreeNodes, offeringTreeHeight, offeringTreeWidth, offeringTreeItems, offeringLevel1, offeringLevel2, offeringLevel3) {
    $.ajax({
        url: getHostUrl() +"/GetUniqueUrlHandler.srv",
        data: {
            source: selectedSource, type: type, startDate: startDate, endDate: endDate, quickSelect: quickSelect, treeHTML: treeHTML, treeID: treeID,
            treeNodes: treeNodes, treeHeight: treeHeight, treeWidth: treeWidth, treeItems: treeItems, taxonomy: taxonomy,
            taxonomySelected: taxonomySelected, supportLevel1: supportLevel1, supportLevel1Selected: supportLevel1Selected,
            GeographyLevel3: GeographyLevel3, originationMethod: originationMethod, ranktypeID: ranktypeID, rankBy: rankBy, rankValueID: rankValue,topValue:topValue,
            generalType: generalType, ProductLevel1: ProductLevel1, ProductLevel2: ProductLevel2, ProductLevel3: ProductLevel3,
            supportFullPath: supportFullPath, OffTreeHTML: offeringTreeHTML, OffTreeID: offeringTreeID, OffTreeNodes: offeringTreeNodes, OffTreeHeight: offeringTreeHeight, OffTreeWidth: offeringTreeWidth, OffTreeItems: offeringTreeItems, OffLevel1: offeringLevel1, OffLevel2: offeringLevel2, OffLevel3: offeringLevel3
        },
        type: "POST",
        cache: false,
        success: function (result) {
            var guid = $.parseJSON(result);
            if (generalType == "Viewreport") {
                document.location.hash = "?guid=" + guid;
                $("#txtGuid").val(guid);
            }

        },
        error: function (result) {
            alert("error");
        }
    });
}

function SavePageStatusSeam(selectedSource, startDate, endDate, quickSelect, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems, taxonomy, taxonomySelected, supportLevel1, supportLevel1Selected,
                GeographyLevel3, originationMethod, ranktypeID, rankBy, rankValue, generalType, type, ProductLevel1, ProductLevel2, ProductLevel3, supportFullPath, offeringTreeHTML, offeringTreeID, offeringTreeNodes, offeringTreeHeight, offeringTreeWidth, offeringTreeItems, offeringLevel1, offeringLevel2, offeringLevel3) {
    $.ajax({
        url:getHostUrl() +"/GetUniqueUrlHandler.srv",
        data: {
            source: selectedSource, type: type, startDate: startDate, endDate: endDate, quickSelect: quickSelect, treeHTML: treeHTML, treeID: treeID,
            treeNodes: treeNodes, treeHeight: treeHeight, treeWidth: treeWidth, treeItems: treeItems, taxonomy: taxonomy,
            taxonomySelected: taxonomySelected, supportLevel1: supportLevel1, supportLevel1Selected: supportLevel1Selected,
            GeographyLevel3: GeographyLevel3, originationMethod: originationMethod, ranktypeID: ranktypeID, rankBy: rankBy, rankValueID: rankValue, 
            generalType: generalType, ProductLevel1: ProductLevel1, ProductLevel2: ProductLevel2, ProductLevel3: ProductLevel3,
            supportFullPath: supportFullPath, OffTreeHTML: offeringTreeHTML, OffTreeID: offeringTreeID, OffTreeNodes: offeringTreeNodes, OffTreeHeight: offeringTreeHeight, OffTreeWidth: offeringTreeWidth, OffTreeItems: offeringTreeItems, OffLevel1: offeringLevel1, OffLevel2: offeringLevel2, OffLevel3: offeringLevel3
        },
        type: "POST",
        cache: false,
        success: function (result) {
            var guid = $.parseJSON(result);
            if (generalType == "Viewreport") {
                document.location.hash = "?guid=" + guid;
                $("#txtGuid").val(guid);
            }

        },
        error: function (result) {
            alert("error");
        }
    });
}

function SavePageStatusTopissue(CommercialProductLevel2ID, Quaters, Taxonomy, Region, RankType, RankValue,critsitID, AudienceView, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems,
                 rankBy, generalType, type, isTreeOrProView, ProductLevel1, ProductLevel2, ProductLevel3, supportFullPath, offeringTreeHTML, offeringTreeID, offeringTreeNodes, offeringTreeHeight, offeringTreeWidth, offeringTreeItems, offeringLevel1, offeringLevel2, offeringLevel3,cusRegTrHTML,cusRegTrID,cusRegTrNodes,cusRegTrHeight,cusRegTrWidth,cusRegTrItems,cusRegL1,cusRegL2,cusRegL3) {
    $.ajax({
        url: getHostUrl() +"/GetUniqueUrlHandler.srv",
        data: { type: type, CommercialProductLevel2ID: CommercialProductLevel2ID, Quaters: Quaters, Taxonomy: Taxonomy, Region: Region,
            RankType: RankType, RankValue: RankValue,critsitID:critsitID, AudienceView: AudienceView, treeHTML: treeHTML, treeID: treeID,
            treeNodes: treeNodes, treeHeight: treeHeight, treeWidth: treeWidth, treeItems: treeItems, generalType: generalType,
            rankBy: rankBy, ProductLevel1: ProductLevel1, ProductLevel2: ProductLevel2, ProductLevel3: ProductLevel3,
            supportFullPath: supportFullPath, isTreeOrProView: isTreeOrProView, OffTreeHTML: offeringTreeHTML, OffTreeID: offeringTreeID, OffTreeNodes: offeringTreeNodes, OffTreeHeight: offeringTreeHeight, OffTreeWidth: offeringTreeWidth, OffTreeItems: offeringTreeItems, OffLevel1: offeringLevel1, OffLevel2: offeringLevel2, OffLevel3: offeringLevel3, CusRegHTML: cusRegTrHTML, CusRegTreeID: cusRegTrID, CusRegTreeNodes: cusRegTrNodes, CusRegTreeHeight: cusRegTrHeight, CusRegTreeWidth: cusRegTrWidth, CusRegTreeItems: cusRegTrItems, CusRegLevel1: cusRegL1, CusRegLevel2: cusRegL2, CusRegLevel3: cusRegL3
        },
        type: "POST",
        cache: false,
        success: function (result) {
            var model = $.parseJSON(result);
            if (generalType == "Viewreport") {
                var guid = model.GUID;
                document.location.hash = "?guid=" + guid;
                $("#txtGuid").val(guid);
            }
            if (model.ProductLevel1 != "") {
                $("#ProLevel1HiddenP").val(model.ProductLevel1);
                $("#ProLevel2HiddenP").val(model.ProductLevel2);
                $("#ProLevel3HiddenP").val(model.ProductLevel3);
            }
        },
        error: function (result) {
            alert("error");
        }
    });  
}

function SavePageStatusWithoutParam(type, generaltype) {
    var param = {
        type: type,
        generaltype: generaltype
    };
    $.ajax({
        url: getHostUrl() +"/GetUniqueUrlHandler.srv",
        data: param,
        type: "POST",
        cache: false,
        success: function (result) {
            var guid = $.parseJSON(result);
            if (generaltype == "ViewReport") {
                document.location.hash = "&guid=" + guid;
                //$("#txtGuid").val(guid);
            }
            
        },
        error: function(result) {
            alert("error");
        }
    });
}

function getTrendStartDate(startDate, endDate) {
    var startDt = new Date(startDate);
    var endDt = new Date(endDate);
    if (startDt > endDt) {
        var temDate = startDt;
        startDt = endDt;
        endDt = temDate;
    }
    
    //var selectedDate = $("#selectedDate span.radioSelect").text();
    if ((endDt.getMonth() - startDt.getMonth()) < 6) {
        if ((endDt.getMonth() - 6) <0)
        {
            startDt.setYear(endDt.getFullYear() - 1);
            startDt.setMonth(endDt.getMonth() + 6);
        }
        else
        {
            startDt.setMonth(endDt.getMonth() - 6);
        }
        
        return startDt.getMonth() + 1 + "/" + startDt.getDate() + "/" + startDt.getFullYear();
    }
    
    
    return startDate;
}

function escapeText(text) {
    if (text) {
        text = text.replace(/&/gi, "&#38;");
    }
    else {
        text = "";
    }
    return text;
}

function bindCrisitEvent(spanSelector, selectedSpanSelector) {
    var selectedSpanId;
    $(spanSelector).mouseover(function (event) {
        selectedSpanId = $(selectedSpanSelector)[0].id;
        var target = event.target;
        $("#" + target.id).attr("class", cluster_checked); //.removeClass(cluster_unchecked).addClass(cluster_checked);
    });
    $(spanSelector).mouseout(function (event) {
        var target = event.target;
        if (target.id != selectedSpanId) {
            $("#" + target.id).attr("class", cluster_unchecked); //.removeClass(cluster_checked).addClass(cluster_unchecked);
        }
    });
    $(spanSelector).click(function (event) {
        var target = event.target;
        $(spanSelector).each(function () {
            if ($(this).hasClass(cluster_checked)) {
                $(this).attr("class", cluster_unchecked); //.removeClass(cluster_checked).addClass(cluster_unchecked);
            }
        });
        $("#" + target.id).attr("class", cluster_checked);//.removeClass(cluster_unchecked).addClass(cluster_checked);
        selectedSpanId = target.id;
    });
}