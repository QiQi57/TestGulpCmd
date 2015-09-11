$(document).ready(function () {
    
    var url = window.location.href;
    var queryStr = "";
    var st = "";
    var d1 = "";
    var d2 = "";

    if (url.indexOf("?") > 0) {
        queryStr = url.split("?");
        st = queryStr[1].split("&")[2];
        d1 = queryStr[1].split("&")[0];
        d2 = queryStr[1].split("&")[1];
        ViewButton("supportTopic", st.split("=")[1].toString());
        //
        //var endDate = new Date(d2.split("=")[1].toString());
        //var startDate = new Date(d1.split("=")[1].toString());
        $("#startDateInput").val(d1.split("=")[1].toString());
        $("#endDateInput").val(d2.split("=")[1].toString());
        //ViewReport();

        //only show success idea
        ChangeStatus("successstatus", "0");
        InitializeSuppTopicsDrp(true, st.split("=")[1].toString());

        
    }
    else {
        ViewButton("all", "");
        InitializeSuppTopicsDrp(false);

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
        ChangeStatus("allstatus", "all");
    }

    

    $("#viewReportLink").click(function () {
        ViewReport(true);
    });

    


    
    

    $("#startDateInput").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showAnim: "slideDown",
        onSelect: function (selectedDate) {
            //$("#startDateInput").datepicker("option", "showAnim", slideDown);
            //clearRadioButton('radio', 'filterForm');
            //getProductInfo();
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
            //clearRadioButton('radio', 'filterForm');
            //getProductInfo();
        }
    });

    $("#closeIdeaComment").click(function() {
        $("#ideaComments").hide();
    });

    $("#submitIdeaComment").click(function() {
        SubmitIdeaComment();
    });

    $("#txtIdeaComment").focus(function() {
        var content = $(this).val();
        if (content == this.defaultValue) {
            $(this).val('');
        }
    });
    $("#txtIdeaComment").blur(function() {
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    });
});

function SubmitIdeaComment() {
    var comment = $("#txtIdeaComment").val();
    var ideaDerivedId = $("#ideaDerivedId").val();
    var ideaOwner = $("#ideaOwner" + ideaDerivedId).text();
    var commentData = {
        ideaDerivedId: ideaDerivedId,
        comment: comment,
        senderName: "comment",
        ideaOwner:ideaOwner
    };
    $.ajax({
        url: "/SubmitIdeaComment.srv",
        data: commentData,
        type: "POST",
        Cache: false,
        success: function (data) {
            if (data == "error") {
                alert(data);
            } else {
                LoadIdeaComment(ideaDerivedId);
              //  $("#comment" + ideaDerivedId + " span").text();
            }
            // var jsonData = $.parseJSON(data);
        },
        error: function(error) {
            
        }
    });
    $("#txtIdeaComment").val('');
}

function InitializeSuppTopicsDrp(hasDefaultVal,defaultValue)
{
    $.ajax({
        url:"/IdeaStorage.srv",
        data:"",
        type:"GET",
        cache:false,
        success: function (data) {
            var jsonData = $.parseJSON(data);
            //supportTopicDrp
            var drpHtml = "";
            var hasDefaultSupportTopicId = false;
            $.each(jsonData, function (key, val) {
                
                if ((true == hasDefaultVal) &&(defaultValue == val.SupportTopicId))
                {
                    drpHtml += "<option value=\"" + val.SupportTopicId + "\" selected=\"selected\" >" + val.SupportTopic + "</option>";
                    hasDefaultSupportTopicId = true;
                }
                else
                {
                    drpHtml += "<option value=\"" + val.SupportTopicId + "\">" + val.SupportTopic + "</option>";
                }
            });
            $("#supportTopicDrp").empty();
            $("#supportTopicDrp").append(drpHtml);
            if (!hasDefaultVal) {
                $("#supportTopicDrp").attr("disabled", "true");
            }
            else {

                if (hasDefaultSupportTopicId) {
                    ViewReport(false);
                }
                else {
                   alert("There is no content idea for this support topic!")
                }
            }
        }
    });
}



function GetIdeaList(startTime,endTime,status,viewType, viewValue)
{
    var form = {
        StartTime: startTime,
        EndTime: endTime,
        Status: status,
        ViewType: viewType,
        ViewValue: viewValue,
        IsDetails: false,
        BehaviorType: "read"
    }
    $("#loadImageDiv").show();
    $.ajax({
        url: "/IdeaStorage.srv",
        data: form,
        type: "POST",
        cache: false,
        success: function (data) {
            $("#loadImageDiv").hide();
            $(".saveAction").show();
            var result = $.parseJSON(data);
            var totalIdea = result["_ContentIdeaList"].length;
            var totalHtml = "";
            if (status != "all") {
                totalHtml = "<span>Total idea:<font style='font-weight:bold' id='totalSTSpan'>" + totalIdea + "</font></span>";
            }
            else {
                totalHtml = "<span>Total idea:<font style='font-weight:bold' id='totalSTSpan'>" + totalIdea + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                            "<span>Total success:<font style=';font-weight:bold' id='totalCaseSpan'>" + result.SuccessCount  + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;" +
                            "<span>Total failure :<font style=';font-weight:bold' id='totalCaseSpan'>" + result.FailureCount + "</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;";
            }
            $("#sumInfo").empty();
            $("#sumInfo").append(totalHtml)
            var tbody = GenerateTBody(result["_ContentIdeaList"]);
            $("#IdeaList").append(tbody);
        },
        error: function (error)
        { }
    });
}

function ViewReport(hasTimerange)
{
    $("#IdeaList tbody").empty();
    $("#sumInfo").empty();
    var starttime = "";
    var endtime = "";
    if (hasTimerange)
    {
        starttime = $("#startDateInput").val();
        endtime = $("#endDateInput").val();
    }
    
    if ($(".viewById").hasClass("viewBtnSelected"))
    {
        viewValue = $("#supportTopicDrp").val();
    }
    SavePageStatusWithoutParam("idealist", "ViewReport");
    GetIdeaList(starttime, endtime, status, viewType, viewValue);
}

function GenerateTBody(json)
{
    var tbodyStr="<tbody>";
    $.each(json, function (key, val) {

        var canVote = val.CanVote;
        var voteClassName = "triangle-up ideaVote";
        var fontClassName = "ideaVoteVolume";
        if (canVote == "0") {
            voteClassName = "triangle-up-dis ideaVote";
            fontClassName = "ideaVoteVolumeDis";
        }

        tbodyStr += "<tr>";
        tbodyStr += "<td><a href='javascript:void(0)' onclick='showDetails(\"" + val.ideaDerivedId + "\",\"" + val.Status + "\")'>" + val.Title + "</td>" +
            "<td>" + val.SupportTopic + "</td>" +
            "<td><a href='https://microsoft.sharepoint.com/teams/ContentIdea/RequestsList/Forms/DispForm.aspx?ID=" + val.ID.toString().substring(val.ID.toString().lastIndexOf('-') + 1, val.ID.length) + "' target=_blank>" + val.ID + "</a></td>" +
            "<td>" + val.Status + "</td>" +
            "<td>" + val.CreatedTime + "</td>" +
            "<td>" + val.IdeaState + "</td>" +
            "<td id='ideaOwner" + val.ideaDerivedId + "'>" + val.UserName + "</td>" +
            "<td class='commentTd'>" + "<div id='" + val.ideaDerivedId + "' class='" + voteClassName + "' onclick='addIdeaVote(\"" + val.ideaDerivedId + "\",\"" + val.TotalVote + "\",\"" + val.CanVote
            + "\")'></div><div class='" + fontClassName + "' id='voteCount" + val.ideaDerivedId + "'>" + val.TotalVote
            + "</div><div class='ideaDetails' id='comment" + val.ideaDerivedId + "' onclick='addIdeaComment(\"" + val.ideaDerivedId + "\")'><a href='javascript:void(0)'>Comments(<span>" + val.TotalComment + "</span>)</a></div></td>";
        tbodyStr += "</tr>";
    });
    return tbodyStr;
}

function showDetails(ideaDerivedId,status)
{
    var obj = new Object();
    obj.IsDetails = true;
    obj.IdeaDerivedId = ideaDerivedId;
    obj.Status = status;
    window.showModelessDialog("ideaform.aspx", obj, "dialogWidth=700px;dialogHeight=700px");
}

function ViewButton(category,val) {
    $(".viewbtn").removeClass("viewBtnSelected");
    $("#supportTopicDrp").attr("disabled", "true");
    if (category == "all")
    {
        $(".viewAll").addClass("viewBtnSelected");
    }
    else if (category == "my")
    {
        $(".viewMy").addClass("viewBtnSelected");
        val = $("#HeadLoginView_HeadLoginName").text();
    }
    else  //by support id
    {
        $("#supportTopicDrp").removeAttr("disabled");
        $(".viewById").addClass("viewBtnSelected");
        $("#supportTopicDrp").val(val);
    }
    viewType = category;
    viewValue = val;
   
}

function ChangeStatus(id,val) {
    $(".statusbtn").removeClass("statusBtnSelected");
    $("#" + id).addClass("statusBtnSelected");
    status = val;
}

function CreateIdea()
{
    window.open("ideaform.aspx", "_blank");
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
        combox.animate({ width: "30px" }, 500, function () {
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
    if (width == 30 && suspendedflag == 0) {
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
function getHostUrl() {
    var protocol = window.location.protocol;
    var host = window.location.host;
    return protocol + "//" + host + pathDir;
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

function addIdeaVote(ideaDerivedId, totalVote, canVote)
{
    var voteStatus = $("#" + ideaDerivedId).attr("class");
    if (voteStatus.indexOf("triangle-up-dis")>=0) {
        return false;
    }
    var voteData = {
        ideaDerivedId: ideaDerivedId,
        vote: "true",
        senderName:"vote"
    };
    $.ajax({
        url: "/SubmitIdeaComment.srv",
        data: voteData,
        type:"POST",
        cache: false,
        success: function(data) {
            if (data == "error") {
                alert("error occur.");
            }
            else if (data == "success") {
                $("#" + ideaDerivedId).removeClass("triangle-up").addClass("triangle-up-dis");
                $("#voteCount" + ideaDerivedId).html();
                $("#voteCount" + ideaDerivedId).html(parseInt(totalVote) + 1);//parseInt(CurrentVoteNum) +
                $("#voteCount" + ideaDerivedId).addClass("ideaVoteVolumeDis");
            }
        },
        error: function(error) {
            alert("error occur.");
        }
    });

    //var position = $("#"+ideaDerivedId).position();
    //$("#ideaComments").css("margin-left", (position.left-200)+"px");
    //$("#ideaComments").css("margin-top", (position.top-200)+"px");
    //$("#ideaComments").show();
}

function addIdeaComment(ideaDerivedId) {
    var position = $("#comment"+ideaDerivedId).position();
    $("#ideaComments").css("margin-left", (position.left-300)+"px");
    $("#ideaComments").css("margin-top", (position.top-200)+"px");
    $("#ideaComments").show();
    $("#ideaDerivedId").val(ideaDerivedId);
    //var firstLoad = true;
    //var pageIndex ;
    //var pageSize = 5;
    //if (firstLoad) {
    //    pageIndex = 1;
    //    loadIdeaPaging(ideaDerivedId);
    // }

    //var pagesize = 3;
    //var defaultPageIndex = 1;
    //loadIdeaCommentData(ideaDerivedId, pagesize, defaultPageIndex, true);
    LoadIdeaComment(ideaDerivedId);
    //  loadIdeaPaging(ideaDerivedId);
}

function LoadIdeaComment(ideaDerivedId) {
    var pagesize = 3;
    var defaultPageIndex = 1;
    loadIdeaCommentData(ideaDerivedId, pagesize, defaultPageIndex, true);
}

function getTotalComment(ideaDerivedId, newPage) {
    var viewCommentParam = {
        senderName: "commentView",
        pageSize: pageSize,
        pageIndex: newPage,
        ideaDerivedId: ideaDerivedId
    };
    $.ajax
    ({
        url: "/SubmitIdeaComment.srv",
        data: viewCommentParam,
        type: "POST",
        cache: false,
        success: function (data) {
            var commentList = $.parseJSON(data);
            createCommentHtml(commentList.IdeaCommentDetail);
        },
        error: function (error) {
            alert("error occur");//test code
        }
    });
}

function loadIdeaPaging(ideaDerivedId, totalComment, pagesize, defaultPageIndex) {
   
    $('#ideaFooter').smartpaginator({
        totalrecords: totalComment,
        recordsperpage: pagesize,
        controlsalways: true,
        datacontainer: 'feedbackTable',
        dataelement: 'tr',
        initval: 0,
        next: 'Next',
        prev: 'Prev',
        first: 'First',
        last: 'Last',
        theme: 'mssolve',//mssolve
        onchange: function (newPage) {
            $("#FeedbackMask").fadeTo(500, 0.25);
            // onchange event.
            if (totalComment == 1) {
                $("#ideaFooter span").attr("style", "margin-top:5px");
                $("#ideaFooter div.short").attr("style", "margin-top:0px");
               // $("#ideaFooter div.btn").attr("class", "disabled");
            }
            if (totalComment == 2) {
                $("#ideaFooter ul li a").css("width", 15);
                $("#ideaFooter div.short").css("margin-top", 0);
            }
            if (totalComment > 2) {
                $("#ideaFooter ul li a").css("width", 15);
                $("#ideaFooter div.short").css("margin-top", 0);
               // $("#ideaFooter div.short").css("width",)
            }
           // $("#ideaFooter").css("width", "295px");
            //var radioSelected = $('input:radio[name="feedback"]:checked');
            //currentFeedbackPageindex = newPage;
            //LoadFeedback(newPage, 5, false, radioSelected.val());
            loadIdeaCommentData(ideaDerivedId, pagesize, newPage,false);
        }
    });

    //load the default first page value
    loadIdeaCommentData(ideaDerivedId, pagesize, defaultPageIndex, false);
    
}

function loadIdeaCommentData(ideaDerivedId, pageSize, newPage, isFirstLoad) {
    var totalComment;
    var viewCommentParam = {
        senderName: "commentView",
        pageSize: pageSize,
        pageIndex: newPage,
        ideaDerivedId: ideaDerivedId
    };
    $.ajax
    ({
        url: "/SubmitIdeaComment.srv",
        data: viewCommentParam,
        type: "POST",
        cache: false,
        success: function(data) {
            var commentList = $.parseJSON(data);
            if (isFirstLoad) {
                totalComment = commentList.TotalComments;
                loadIdeaPaging(ideaDerivedId, totalComment, pageSize, newPage);
            } else {
                createCommentHtml(commentList.IdeaCommentDetail);
            }
        },
        error: function(error) {
            alert("error occur"); //test code
        }
    });
}

function createCommentHtml(commentList) {
    var commentHtml = "";
    $("#ideaCommentTable").html("");
    for (var i = 0; i < commentList.length; i++) {
        commentHtml += "<tr><td><table class='ideaCommentTable'><tr><td height='67px'><div style='color:#b9a862;font-size:13px;margin-top:0px;'>" + commentList[i]["Alias"] +
            " said:</div> <div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>" + commentList[i]["CreatedTime"] + "</div><span style='color:#ffffff;font-size:13px;'>" + commentList[i]["Comment"] +
            "</span></td></tr><tr><td height='3px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(138,139,125);'>" +
           "</td></tr></table></td></tr>";
    }
    $("#ideaCommentTable").append(commentHtml);
}
////////////////////////////////////////////////////
