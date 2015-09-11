var radio_unchecked = "radioNoSelect";
var radio_checked = "radioSelect";
var topIssue_unchecked = "rankNoSelect";
var topIssue_unchecked_AV = "rankNoSelect_AV";
var topIssue_checked = "rankSelect";
var topIssue_checked_AV = "rankSelect_AV";
var cluster_unchecked = "clusterNoSelect";
var cluster_checked = "clusterSelect";

function RadioClicked(radioid, radiosetname, formid) {
    // - first, uncheck all radio buttons of the set
    var form = document.getElementById(formid);
    for (var i = 0; i < form.length; i++) {
        if (form[i].name == radiosetname) {
            document.getElementById(form[i].id).checked = false;
            $("#Span" + form[i].id).attr("class", radio_unchecked);
        }
    }
    // - then, check the clicked button
    document.getElementById(radioid).checked = true;
    $("#Span" + radioid).attr("class", radio_checked);
    DateSet();
        getProductInfo();

    return false;
}
function RadioClickedByTopIssue(radioid, radiosetname, formid) {
    var form = document.getElementById(formid);
    for (var i = 0; i < form.length; i++) {
        if (form[i].name == radiosetname) {
            $("#" + form[i].id).checked = false;
            $("#Span" + form[i].id).attr("class", cluster_unchecked);
        }
    }
    // - then, check the clicked button
    document.getElementById(radioid).checked = true;
    $("#Span" + radioid).attr("class", cluster_checked);
    return false;
}
function DateSet() {
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

    var selectValue = $('input[type="radio"][name="radio"]:checked').val();

    if (selectValue == "fytd") {

        //if the month's value is less than 7, the year should be previous year
        if (mm < 7) {
            var startDate = "07/01/" + (yyyy - 1);
            $("#startDateInput").val(startDate);
        }
        else {
            var startDate = "07/01/" + yyyy;
            $("#startDateInput").val(startDate);
        }
        $('#endDateInput').val(today);
    }
    else {
        var startDate = new Date(today);
//        if (startDate.getMonth() + 1 == parseInt(selectValue)) {
//            $('#startDateInput').val("12" + "/01/" + (parseInt(startDate.getFullYear()) - 1));
//            $('#endDateInput').val("12" + "/31/" + (parseInt(startDate.getFullYear()) - 1));
//        }
//        else {
            startDate.setMonth(startDate.getMonth() + 1 - parseInt(selectValue));
            
            //var lastDay = new Date((new Date(Year, Month+1,1))-1)).getDate
            var d = new Date();
            var lastMonth = d.getMonth();
            var lastDay;
            if (d.getMonth() == 0) {
                lastMonth = 12;
            }
            var lastprevious = new Date(d.getFullYear(), d.getMonth(), 0, 23, 59, 59);
            lastDay = lastprevious.getDate();
            var lastYear = lastprevious.getFullYear();
            $('#endDateInput').val(lastMonth + "/" + lastDay + "/" + lastYear);
            var lastallprevious = new Date(startDate.getFullYear(), startDate.getMonth(), 0, 23, 59, 59);
            var lastallmonth = lastallprevious.getMonth() + 1;
            if (lastallmonth == 0) {
                lastallmonth = 12;
            }
            $('#startDateInput').val(lastallmonth + "/01/" + lastallprevious.getFullYear());
        //}
    }
   
}

function mouseMoveIn(spanid) {
    $("#Span" + spanid).attr("class", radio_checked);
    return false;
}

function mouseMoveInTopIssue(spanid) {
    $("#Span" + spanid).attr("class", topIssue_checked);
    return false;
}

function mouseMoveInTopIssue_AV(spanid) {
    $("#Span" + spanid).attr("class", "rankSelect_AV");
    return false;
}

function mouseMoveInCluster(spanid) {
    $("#Span" + spanid).attr("class", cluster_checked);
    return false;
}

function mouseMoveOut(spanid, radiosetname, formid) {
    var div = document.getElementById(formid);
    for (var i = 0; i < div.length; i++) {
        if (div[i].name == radiosetname) {
            if (document.getElementById(div[i].id).checked == false) {
                $("#Span" + div[i].id).attr("class", radio_unchecked);
            }
        }
    }
}

function mouseMoveOutTopIssue_AV(spanid, radiosetname, formid) {
    var div = document.getElementById(formid);
    for (var i = 0; i < div.length; i++) {
        if (div[i].name == radiosetname) {
            if (document.getElementById(div[i].id).checked == false) {
                $("#Span" + div[i].id).attr("class", topIssue_unchecked_AV);
            }
        }
    }
}

function mouseMoveOutTopIssue(spanid, radiosetname, formid) {
    var div = document.getElementById(formid);
    for (var i = 0; i < div.length; i++) {
        if (div[i].name == radiosetname) {
            if (document.getElementById(div[i].id).checked == false) {
                $("#Span" + div[i].id).attr("class", topIssue_unchecked);
            }
        }
    }
}

function mouseMoveOutCluster(spanid, radiosetname, formid) {
    var div = document.getElementById(formid);
    for (var i = 0; i < div.length; i++) {
        if (div[i].name == radiosetname) {
            if (document.getElementById(div[i].id).checked == false) {
                $("#Span" + div[i].id).attr("class", cluster_unchecked);
            }
        }
    }
}



