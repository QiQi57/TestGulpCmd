//the GBS Sticker

var GBSEffectModel = new EffectModel();
GBSEffectModel.effInterval = 5000;
GBSEffectModel.target.push("#GBSBCImg1");
GBSEffectModel.target.push("#GBShottestReport");
GBSEffectModel.target.push("#GBSBCOuterContainer");
GBSEffectModel.slideUpTarget = "#GBSBCImg2";
GBSEffectModel.slideDownOrder = 2;
GBSEffectModel.fadeInOrder = 1;
GBSEffectModel.fadeIn1Order = 3;
GBSEffectModel.startingBehavior =FadeIn ;
GBSEffectModel.secondBehavior = SlideDown;
GBSEffectModel.thirdBehavior = FadeIn1;
GBSEffectModel.initialEffect = InitialEffect;

//the MSSolve Sticker

var MSSolveEffectModel = new EffectModel();
MSSolveEffectModel.effInterval = 6000;
MSSolveEffectModel.target.push("#MSSolveBCImg1");
MSSolveEffectModel.target.push("#MSSolveBCOuterContainer");
MSSolveEffectModel.target.push("#MSSolveUpdateTime");
MSSolveEffectModel.slideUpTarget = "#MSSolveBCImg2";
MSSolveEffectModel.slideDownOrder = 1;
MSSolveEffectModel.fadeInOrder = 2;
MSSolveEffectModel.fadeIn1Order = 3;
MSSolveEffectModel.startingBehavior = SlideDown;
MSSolveEffectModel.secondBehavior = FadeIn;
MSSolveEffectModel.thirdBehavior = FadeIn1;
MSSolveEffectModel.initialEffect = InitialEffect;

//the Seam Sticker

var SeamEffectModel = new EffectModel();
SeamEffectModel.effInterval = 5000;
SeamEffectModel.target.push("#SeamBCImg1");
SeamEffectModel.target.push("#SeamHottestReport");
SeamEffectModel.target.push("#SeamBCOuterContainer");
SeamEffectModel.slideUpTarget = "#SeamBCImg2";
SeamEffectModel.slideDownOrder = 2;
SeamEffectModel.fadeInOrder = 1;
SeamEffectModel.fadeIn1Order = 3;
SeamEffectModel.startingBehavior = FadeIn ;
SeamEffectModel.secondBehavior =SlideDown ;
SeamEffectModel.thirdBehavior = FadeIn1;
SeamEffectModel.initialEffect = InitialEffect;

$(document).ready(function () {
    var tips = getUrlVars()["tips"];
    if (tips == "unauthorized") {
        $("#tipsDiv").show();
    }
    //set the position for GBS Sticker
    //var GBSCoordinate = GetPositionOf("#bodyGBSDiv");
    //$("#GBSUpdateTime").css("left", GBSCoordinate[0]);
    //$("#GBSUpdateTime").css("bottom", $(window).height() - GBSCoordinate[1] - 166);
    //$("#GBSBCImg2").css("left", GBSCoordinate[0]+3);
    //$("#GBSBCImg2").css("bottom", $(window).height() - GBSCoordinate[1] - 164);
    //set the hover event and add a link for GBS Sticker
    $("#bodyGBSDiv").click(function () {
        window.location.href = "Pages/All/TICInTopIssue.aspx";
    });
    $("#bodyGBSDiv").css("cursor", "pointer");

    //set the position for MSSolve Sticker
    var MSSolveCoordinate = GetPositionOf("#bodyMSSolveDiv");
    //$("#MSSolveBCImg2").css("left", MSSolveCoordinate[0] + 3);
    //$("#MSSolveBCImg2Containter").css("left", 3);

    //$("#MSSolveBCImg2Containter").css("bottom", 0);
    //set the hover event and add a link for MSSolve Sticker
    $("#bodyMSSolveDiv").click(function () {
        window.location.href = "Pages/All/TICInDetego.aspx";
    });
    $("#bodyMSSolveDiv").css("cursor", "pointer");

    //set the position for Seam Sticker
    //var MSSolveCoordinate = GetPositionOf("#bodySeamDiv");
    //$("#SeamBCImg2").css("left", MSSolveCoordinate[0] + 3);
    //$("#SeamBCImg2").css("bottom", $(window).height() - MSSolveCoordinate[1] - 164);
    //set the hover event and add a link for Seam Sticker
    $("#bodySeamDiv").click(function () {
        window.location.href = "Pages/All/TICInSeam.aspx";
    });
    $("#bodySeamDiv").css("cursor", "pointer");

    $("#bodyOtherDiv").click(function () {
        window.location.href = "Pages/All/TICInRootCouse.aspx";
    });
    $("#bodyOtherDiv").css("cursor", "pointer");

    $("#bodyIdeaDiv").click(function() {
        window.location.href = "Pages/All/IdeaLists.aspx";
    });
    $("#bodyIdeaDiv").css("cursor","pointer");

    GBSEffectModel.initialEffect();
    setTimeout("MSSolveEffectModel.initialEffect()", 2000);
    setTimeout("SeamEffectModel.initialEffect()", 2000);
});

function GetPositionOf(eleId) {
    var posi = $(eleId).position();
    var coordinate = [];
    coordinate.push(posi.left);
    coordinate.push(posi.top);
    return coordinate;
}
function SlideDown() {
    if (this.slideDownOrder == 1) {
        $(this.target[0]).hide();
        $(this.target[1]).show();
        $(this.slideUpTarget).animate({ bottom: "162px" }, "1000");
        setTimeout(this.bind(this, this.secondBehavior), this.effInterval + 1000);
    }
    if (this.slideDownOrder == 2) {
        $(this.target[1]).hide();
        $(this.target[2]).show();
        $(this.slideUpTarget).animate({ bottom: "162px" }, "1000");
        setTimeout(this.bind(this, this.thirdBehavior), this.effInterval+1000);
    }
    if (this.slideDownOrder == 3) {
        $(this.target[2]).hide();
        $(this.target[0]).show();
        $(this.slideUpTarget).animate({ bottom: "162px" }, "1000");
        setTimeout(this.bind(this, this.startingBehavior), this.effInterval+1000);
    }
    setTimeout(this.bind(this, ResetPosition), this.effInterval + 1000);
}
function FadeIn() {
    if (this.fadeInOrder == 1) {
        $(this.target[0]).hide();
        $(this.target[1]).fadeIn("slow");
        setTimeout(this.bind(this, this.secondBehavior), this.effInterval);
    }
    if (this.fadeInOrder == 2) {
        $(this.target[1]).hide();
        $(this.target[2]).fadeIn("slow");
        setTimeout(this.bind(this, this.thirdBehavior), this.effInterval);
    }
    if (this.fadeInOrder == 3) {
        $(this.target[2]).hide();
        $(this.target[0]).fadeIn("slow");
        setTimeout(this.bind(this, this.startingBehavior), this.effInterval);
    }
}
function FadeIn1() {
    if (this.fadeIn1Order == 1) {
        $(this.target[1]).hide();
        $(this.target[0]).fadeIn("slow");
        setTimeout(this.bind(this, this.secondBehavior), this.effInterval);
    }
    if (this.fadeIn1Order == 2) {
        $(this.target[1]).fadeIn("slow");
        $(this.target[2]).hide();
        setTimeout(this.bind(this, this.thirdBehavior), this.effInterval);
    }
    if (this.fadeIn1Order == 3) {
        $(this.target[2]).hide();
        $(this.target[0]).fadeIn("slow");
        setTimeout(this.bind(this, this.startingBehavior), this.effInterval);
    }
}

function ResetPosition() {
    $(this.slideUpTarget).css("bottom", "0");
}

function InitialEffect() {
    setTimeout(this.bind(this, this.startingBehavior), this.effInterval);
}

function EffectModel() {
    this.effInterval = 0;
    this.target = [];
    this.slideUpTarget = "";
    this.slideDownOrder = 0
    this.fadeInOrder = 0;
    this.fadeIn1Order = 0;
    this.bind = function (obj, func) {
        return function () {
            return func.apply(obj, arguments);
        }
    };
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