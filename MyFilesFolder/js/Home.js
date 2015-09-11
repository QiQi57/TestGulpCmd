$(document).ready(function() {
    $(".TopContent").animate({ width: "70%" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1500);
    $(".IssueContent").animate({ width: "80%" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1500);
    $(".ContentContent").animate({ width: "60%" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1500);
    $(".DashboardContent").animate({ width: "75%" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1500);

    setInterval(function() {
        var image = $("#image");
        image.fadeOut('slow', function() {
            var imageUrl = image.css('background-image').toString();
            if (imageUrl.indexOf("/images/test.jpg") >= 0) {
                image.css('background-image', 'url("../images/homebackground.png")');
            } else {
                image.css('background-image', 'url("../images/test.jpg")');
            }
            image.fadeIn('slow');
        });
    }, 7000);

    var angel = 0;
    var timer = null;
    var interval = 1500;
    $("#goodimage").hover(function() {

            timer = setInterval(rotate, 50);
            //$("#goodimage").animate({ -ms-transform: "rotate(30ddeg)" }, 1500);
        },
        function() {
            //$("#goodimage").
        });

    function rotate(id) {
        $("#" + id).css("-ms-transform", "rotate(" + angel + "deg)");
        angel += 50 * 30 / interval;
        if (angel >= 30) {
            clearInterval(timer);
        }
    }
    //top issue block
    //$(".dynamicMagStickerC div.Sticker").css("width", "205px"); //256px -> 205px.
    //$(".dynamicMagStickerC div.BCOuterContainerC").css("width", "205px"); //256px -> 205px.
    //$(".dynamicMagStickerC div.hottestReportC").css("width", "205px");

    //$(".dynamicMagStickerC div.BCTranspC").css("width", "205px");
    //$(".dynamicMagStickerC div.GBSBCImg2C").css("width", "205px");

    ////top content(Incident) block
    //$(".dynamicMagStickerC div.UpdateTimeC").css("width", "205px");

    //Idea block
   // $(".dynamicMagStickerC div#bodyIdeaDiv").css("width", "205px");
});

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
    return protocol + "//" + host+pathDir;
}
