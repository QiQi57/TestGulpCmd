
$(document).ready(function () {
    //get the requested file name
    var fileName = ReturnRequestedFileName();

    var eleIdArray = [];
    eleIdArray.push("homeLinkdiv,u127_normal.png,homeLogoDiv,homeLogo,homeLogoOver,home.aspx");
    eleIdArray.push("GBSDiv,u154_normal.png,GBSLogoDiv,GBSLogo,GBSLogoOver,TICInTopIssue.aspx");
    eleIdArray.push("MSSolveDiv,u175_normal.png,MSSolveLogoDiv,MSSolveLogo,MSSolveLogoOver,TICInDetego.aspx");
    eleIdArray.push("SeamDiv,u196_normal.png,SeamLogoDiv,SeamLogo,SeamLogoOver,TICInSeam.aspx");
    eleIdArray.push("RootCauseDiv,u196_normal.png,RootCauseLogoDiv,RootCauseLogo,RootCauseLogoOver,TICInRootCouse.aspx");
    eleIdArray.push("IdeaListDiv,u154_normal.png,IdeaLogoDiv,RootCauseLogo,RootCauseLogoOver,IdeaLists.aspx");

    if (fileName == "home") {
        InitializeBackGround("homeLinkdiv", "u141_normal.png", "homeLogoDiv", "u129_normal.png ");
        eleIdArray.splice(0, 1);
    }
    else if (fileName == "TICInTopIssue") {
        InitializeBackGround("GBSDiv", "u148_normal.png", "GBSLogoDiv", "u150_normal.png");
        eleIdArray.splice(1, 1);

    }
    else if (fileName == "TICInDetego") {
        InitializeBackGround("MSSolveDiv", "u169_normal.png", "MSSolveLogoDiv", "u171_normal.png");
        eleIdArray.splice(2, 1);

    }
    else if (fileName == "TICInSeam") {
        InitializeBackGround("SeamDiv", "u190_normal.png", "SeamLogoDiv", "u192_normal.png");
        eleIdArray.splice(3, 1);
    }
    else if (fileName == "TICInRootCouse") {
        InitializeBackGround("RootCauseDiv", "u1902_normal.png", "RootCauseLogoDiv", "u1501_normal.png");
        eleIdArray.splice(4, 1);
    }
    else if (fileName == "IdeaLists") {
        InitializeBackGround("IdeaListDiv", "u148_normal.png", "IdeaLogoDiv", "u150_normal.png");
        eleIdArray.splice(5, 1);
    }
    BindMouseEvent(eleIdArray);
    BindMouseEventForMenu("slidermenu", "menucontainer");
    AddLinkToMenu(eleIdArray,fileName);
    $(".masterHeader").on("click", "a", ticController.resetPageURL);
});

//function getRelativePath(event) {
//    event.preventDefault();
//    var curPageName = $(this).attr("href"), url;
//    if ($(this).parents(".ticRoot").length) {
//        url = getHostUrl() + "/Pages/All/" + curPageName;
//    } else {
//        url = location.protocol + "//" + location.host + "/" + curPageName;
//    }
//    window.location.href = url;
//}

function ReturnRequestedFileName()
{
    var url = window.location.href;
    var startPosi = url.lastIndexOf("/");
    var endPosi = url.lastIndexOf(".aspx");
    if (endPosi == -1) {
        fileName = "home";
    }
    else {
        var fileName = url.substring(startPosi + 1, endPosi);
    }
    return fileName;
}
function InitializeBackGround(eleId, imgVal,eleIdOfLogo,logoImg) {
    $("#" + eleId).css("background-image", "url('/tic/newUI%207.31/navigation_files/" + imgVal + "')");
    $("#" + eleIdOfLogo).css("background-image", "url('/tic/newUI%207.31/navigation_files/" + logoImg + "')");
}
function BindMouseEvent(eleIdArray) {
    $.each(eleIdArray, function (key, val) {
        var hash = val.split(",");
        var eleId = hash[0];
        var imgVal = hash[1];
        var logoDiv = hash[2];
        var exchClass1 = hash[3];
        var exchClass2 = hash[4];
        $("#" + eleId).hover(function () {
            $("#" + eleId).css("background-image", "url('/tic/newUI%207.31/navigation_files/" + imgVal + "')");
            $("#" + logoDiv).removeClass(exchClass1).addClass(exchClass2);
        },
        function () {
            $("#" + eleId).css("background-image", "");
            $("#" + logoDiv).removeClass(exchClass2).addClass(exchClass1);
        }
        );
    });

}
function BindMouseEventForMenu(eleId, activateEleid) {
    var show;
    $("#" + activateEleid).hover(function () {
        show = setTimeout(function () {
            $("#" + activateEleid).animate({ left: "-10" }, "slow");
        }, 100);
    },
    function () {
        clearTimeout(show);
        $("#" + activateEleid).animate({ left: "-198" }, "slow");
    }
    );
}

function AddLinkToMenu(eleIdArray, pagename) {
    $.each(eleIdArray, function (key, val) {
        var hash = val.split(",");
        var eleId = hash[0];
        var link = hash[5];
        $("#" + eleId).click(function () {
            if (pagename == "home") {
                window.location.href = "Pages/All/" + link;
            }
            else {
                if (link == "home.aspx") {
                    window.location.href = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + pathDir;
                }
                else {
                    window.location.href = link;
                }
            }
        });
        $("#" + eleId).css("cursor", "pointer");
    });
}