$(document).ready(function () {
    var obj = window.dialogArguments;

    if (obj)
    {
        if (obj.IsDetails)
        {
            ideaDerivedId = obj.IdeaDerivedId;
            ShowDetails(ideaDerivedId);
            if (obj.Status == "success") {
                $("#submitBtn").hide();
            }
            else {
                $("#submitBtn").val("resubmit");
            }
        }
        else
        {
            AutoFillInForm(obj);
        }
    }

    document.onclick = function (e) {
        var ele = e.target || e.srcElement;
        //if isHide is true, hide the product tree
        if (isHide) {
                if (ele.className !== "bbit-tree-ec-icon bbit-tree-elbow-end-minus") {
                    $("#searchDiv").fadeOut("slow");
                    $("#tree").fadeOut("slow");
                    $("#closeTreeDiv").fadeOut("slow");
                }
            $("#productsNameList span").html("");
            $("#productsNameList").removeClass("productsNameListC");
        }
        else {
            isHide = true;
        }
    };
    load();

    $("#ProductTreeDiv").click(function (event) {
        ShowProductTree();
        event.stopPropagation();
    });
    $("#txtProductTree").click(function (event) {
        ShowProductTree();
        event.stopPropagation();
    });
    $("#tree_select_arrow").click(function (event) {
        ShowProductTree();
        event.stopPropagation();
    });
    $("#confirmSelect").click(function () {
        $("#tree").fadeOut();
        $("#searchDiv").fadeOut();
        $("#productsNameList span").html("");
        $("#productsNameList").attr("class", "");
        $("#closeTreeDiv").fadeOut();
        return false;
    });
});
function ShowProductTree() {
    $("#searchDiv").fadeIn("slow");
    $("#matchtextbox").focus();
    $("#closeTreeDiv").fadeIn("slow");
    $("#tree").fadeIn("slow");
    $("#RegionList").hide();
}
function ShowDetails(ideaDerivedId)
{
   
    $("#cancleBtn").hide();
    $("#exitBtn").show();
    $.ajax({
        url: "/IdeaStorage.srv",
        data: { IdeaDerivedId:ideaDerivedId, IsDetails:true,BehaviorType: "read" },
        type: "POST",
        cache: false,
        success: function (data) {
            var result = $.parseJSON(data);
            var rowList = result["_ContentIdeaList"];
            //$("#PriorityDrp").find("option").remove();
            //$("#ReqDetailsDrp").find("option").remove();
            $.each(rowList, function (key, val) {
                $("#TitleInput").val(val.Title);
                $("#audienceCkx input:checkbox").each(function (key1, val1) {
                    if (unescape(val.Audience).indexOf($(this).val()) != -1)
                    {
                        $(this).attr("checked", true);
                    }
                });
                $("#suggAssetTypeCks input:checkbox").each(function (key1, val1) {
                    if (unescape(val.SuggestedAssetType).indexOf($(this).val()) != -1) {
                        $(this).attr("checked", true);
                    }
                });
                //$("#PriorityDrp").append("<option>" + val.TriagePriority + "</option>"); 
                //$("#ReqDetailsDrp").append("<option>" + val.RequestDetails + "</option>"); 
                $("#PriorityDrp").val(val.TriagePriority);
                $("#ReqDetailsDrp").val(val.RequestDetails);

                // Restore Tree.
                if (val.PesProductIds != "" && val.PesProductIds != null) {
                    var treeNodes = unescape(val.TreeNodes);
                    treeNodes = $.parseXML(treeNodes);
                    var treeHTML = unescape(val.TreeHtml);
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

                        $("#tree").height(parseInt(val.TreeHeight));
                        $("#closeTreeDiv").height(parseInt(val.TreeHeight) + 20);
                        $("#calculatingDiv").height(parseInt(val.TreeHeight));

                        $("#tree").width(parseInt(val.TreeWidth));
                        $("#closeTreeDiv").width(parseInt(val.TreeWidth));
                        $("#searchDiv").width(parseInt(val.TreeWidth));
                        $("#matchtextbox").width(parseInt(val.TreeWidth) - 10);
                        $("#productsNameList").width(parseInt(val.TreeWidth));
                        $("#calculatingDiv").width(parseInt(val.TreeWidth));

                        $("#calculatingPar").css("margin-top", ((parseInt(val.TreeHeight) + 28 - 72) / 2));
                        $("#txtProductTree").attr("value", "Selected " + val.TreeItems + " items");
                        selectedProducts = val.TreeID + ",";
                        $("#txtProductTreeHidden").attr("value", selectedProducts);

                    }
                }
               
                    
                $("#SupportTopic").val(val.SupportTopic);
                supportTopicId = val.SupportTopicId;
                $("#Description").val(val.Description);
                $("#BusiJustification").val(val.BusinessJustification);
                $("#RequestedBy").val(val.Requestedby);
                $("#RequestedBy").removeClass("inputTxt");
            });

            
        },
        error: function (error)
        { }
    });
}

function AutoFillInForm(obj)
{
    supportTopicId = obj.SupportId;
    //var busiJustification = "LaborP:" + obj.LaborP + "      Labor:" + obj.Labor + "      TMPI:" + obj.TMPI +
    //                    "\r"+"CaseVolumeP:" + obj.CaseVolP + "       CaseVolume:" + obj.CaseVol +
    //                    "  TB:" + obj.TB + "\r" + "BB:" + obj.BB + "      TotalB:" + obj.TotalB;
    var busiJustification = "Between " + obj.startDate + " and " + obj.endDate + " , " + "Labor hour is " + obj.Labor + "; TMPI is " + obj.TMPI +
                       "; " + "CaseVolume is " + obj.CaseVol +
                       "; Top box is " + obj.TB + " ; " + "bottom box is " + obj.BB;
    $("#SupportTopic").val(obj.FullPath.replace(/\^/g,"\\"));
    $("#BusiJustification").val(busiJustification);
    $("#RequestedBy").val(obj.UserName + "@microsoft.com");
    $("#RequestedBy").removeClass("inputTxt")
}

function SubmitIdea()
{
    var result = ValidateInput();
    if (result == false)
    {
        return false;
    }
    titleVal = $("#TitleInput").val();
    assetTypeVal = GetSelectedValues("suggAssetTypeCks");
    priorityVal = $("#PriorityDrp").val();
    requestedDetailsVal = $("#ReqDetailsDrp").val();
    var value = $("#txtProductTreeHidden").val();
    pesProdIdsVal = value.substring(0, value.length - 1);
    descriptionVal = $("#Description").val();
    busiJustVal = $("#BusiJustification").val();
    requestedByVal = $("#RequestedBy").val();
    //get values of audience
    audienceVal = GetSelectedValues("audienceCkx");
    
    var treeHTML = "";
    var treeID = "";
    var treeHeight = "";
    var treeWidth = "";
    var treeItems = "";
    var treeNodes = "";
    if (pesProdIdsVal != "")
    {
        treeHTML = $("#tree").html();
        treeHTML = escape(treeHTML);
        treeHeight = $("#tree").height();
        treeWidth = $("#tree").width();
        treeID = pesProdIdsVal;
        treeNodes = "<all id='allid' text='all' value='all' showcheck='false' complete='true' checkstate='0' isexpand='true' hasChildren='true'>";
        treeNodes = LoopNodes(allNodes[0].ChildNodes, treeNodes, 0);
        treeNodes = treeNodes + "</all>";
        treeNodes = escape(treeNodes);
        var selectedItemsText = $("#txtProductTree").val();
        treeItems = selectedItemsText.match(/\d+/)[0];
    }
    
    var proTree = {
        TreeHtml: treeHTML,
        TreeHeight: treeHeight,
        TreeWidth: treeWidth,
        TreeID: treeID,
        TreeNodes: treeNodes,
        TreeItems:treeItems
    };

    var ideacontent = {
        IdeaDerivedId:ideaDerivedId,
        Title: titleVal,
        SupportTopicId: supportTopicId,
        Audience: audienceVal,
        SuggAssetType: assetTypeVal,
        Priority: priorityVal,
        ReqDetails: requestedDetailsVal,
        PesProductIDs: pesProdIdsVal,
        SupportTopic: $("#SupportTopic").val(),
        Description: descriptionVal,
        BusJustification: busiJustVal,
        RequestedBy: requestedByVal,
        ProductTree:proTree
    };
    $("#loadImageDiv").show();
    $.ajax({
        url: "/IdeaStorage.srv",
        data: ideacontent,
        type: "POST",
        cache: false,
        success: function (data) {
            var result = $.parseJSON(data);
            if (result["IsSuccess"]) {
                var msg = result["SuccessMsg"];
                if (result["ErrorMsgList"]!=null && result["ErrorMsgList"].length > 0) {
                    msg += " \n"+result["ErrorMsgList"];
                }
                alert(msg);
            } else {
                var error = "";
                error += result["ErrorMsgList"];
                alert(error);
            }
            $("#loadImageDiv").hide();
            if (result.IsSuccess) {
                window.close();
            }
        },
        error: function (error)
        {
            alert("failed to submit!");
            $("#loadImageDiv").hide();
        }
        });
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

function show_confirm()
{
    var r=confirm("Submit successfully!\r\rClick [OK] to view idea lists");
    if (r==true)
    {
        window.open("idealists.aspx");
    }
    //else
    //{
    //    alert("You pressed Cancel!");
    //}
}

function CancleIdea()
{
    window.close(); 
}

function EmptyText(id)
{
    if ($("#" + id).val() == "title for your content idea" || $("#" + id).val() == "someone@example.com")
    {
        $("#" + id).val("");
        $("#" + id).removeClass("inputTxt");
    }
}

function ValidateInput()
{
    $("#errorInfo").empty();
    var title = $("#TitleInput").val();
    var description = $("#Description").val();
    var busiJust = $("#BusiJustification").val();
    var tips = "Please provide values for ";
    var invalidEmailMsg = " email address is invalid.";
    var tipArray = new Array();
    //validate title
    if (title == "title for your content idea" || title == "")
    {
        tipArray.push(" title");
    }
    //validate suggestedassettype
    var assetTypeVal = GetSelectedValues("suggAssetTypeCks");
    if (assetTypeVal == "") {
        
        tipArray.push(" SuggestedAssetType");
    }
    //validate description
    if(description == "")
    {
        tipArray.push(" description");
    }
    //validate busiJustification
    if(busiJust == "")
    {
        tipArray.push(" BusinessJustification");
    }
    var returnVal = true;
    if ($("#RequestedBy").val().trim().length == 0) {
        tipArray.push(" email");
    }
    else if (!ValidateEmailText("RequestedBy")) {
        // invalid email
        if (tipArray.length > 0) {
            tipArray.push(invalidEmailMsg);
        }
        else {
            var invalidEmailHtml = "<ul>";
            invalidEmailHtml += "<li>" + invalidEmailMsg + "</li>";
            invalidEmailHtml += "</ul>";
            $("#errorInfo").append(invalidEmailHtml);
        }
        returnVal = false;
    }
    if (tipArray.length > 0) {
        tips += tipArray.join();
    }
   
    if (tips.toLowerCase() != "please provide values for ")
    {
        var errorhtml = "<ul>";
        errorhtml += "<li>" + tips + "</li>";
        errorhtml += "</ul>";
        $("#errorInfo").append(errorhtml);
        returnVal = false;
    }
    return returnVal;
}

function ValidateEmailText(id) {
    var emailValue = $("#" + id).val().trim();
    if (emailValue == "") {
        return false;
    }
    //$("#ErrorMsg").empty();
    var exp = new RegExp(/^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)+@\w+([\.-]\w+)*\.\w{2,4}$/);
    var result = exp.test($("#"+id).val());
    if (!result || (emailValue.toLowerCase() == "someone@example.com")) {
        return false;
    }
    return true;
}

function GetSelectedValues(cla)
{
    var _selectedValues = "";
    $("#" + cla + " input:checkbox:checked").each(function () {
        _selectedValues += escape($(this).val()) + ",";
    });
    return _selectedValues.substring(0, _selectedValues.length - 1);
}

function SaveTreeState()
{
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
}