
function SelectSupTopName(supTopName) {
    $("#supportTopicMatchTextbox").attr("value", supTopName);
    $("#searchSupTopTree").click();
    $("#SupTopicNameList span").html("");
    $("#SupTopicNameList").attr("class", "");
}

var isActive01 = true;
var isEnterKey01 = false;

//set a variable for storing the count of items showed by search textbox
var totalCount01 = 0;
//initial value of index for locate the items
var index01 = -1;
//set a variable for evaluating whether the background color of item has been set by span's hover event
var isHover01 = false;

//set a variable for storing the value of scrolltop of drop down list(it generated from support top searching feature)
var scrollTopVal = 15;

//oldVal01 used to store the old value of search textbox
var oldVal01 = "";

//show products' name when users enter the value into the textbox
function ShowSupportTopicName(event, value) {

    isActive01 = true;

    //--------------------------------select item by press up or down key----------------------------------------------------------
    if (totalCount01 != 0 && (event.keyCode == 38 || event.keyCode == 40)) {

        // clear the background color of all items
        $("#SupTopicNameList span").css("background-color", "");
        var count = 0;
        if (isHover01) {
            $("#SupTopicNameList span").each(function () {
                //evaluate whether span has set background color
                var bcColor = $(this).css("background-color");
                if (bcColor !== "transparent") {
                    //if evaluate successfully,set the index
                    index01 = count;
                    isHover01 = false;
                    return false;
                }
                count = count + 1;
            });
        }


        //press up key 
        if (event.keyCode == 38) {
            //each span's height is 15px
            var indexHeight = 15;
            //if index equals -1 or 0, set the index to the last span 
            if (index01 == -1 || index01 == 0) {
                index01 = totalCount01 - 1;
                indexHeight = (totalCount01 - 25) * 15;
                scrollTopVal = indexHeight ;
            }
            //distract 1 when press up key
            else {
                index01 = index01 - 1;
                scrollTopVal = scrollTopVal - 15;
            }
            if (index01 > 26) {
                $("#SupTopicNameList").scrollTop(scrollTopVal);
            }
        }
        //press down key
        else if (event.keyCode == 40) {
            //if the index is at the end, reset index
            if (index01 == totalCount01 - 1) {
                index01 = -1;
            }
            //plus 1 when press down key
            index01 = index01 + 1;
            if (index01 > 26) {
                $("#SupTopicNameList").scrollTop(scrollTopVal);
                scrollTopVal = scrollTopVal + 15;
            }
        }
        
        
        var $span = $("#SupTopicNameList span:eq(" + index01 + ")");
        $span.css("background-color", "rgb(171,214,216)");
        //append the text of item to search textbox
        $("#supportTopicMatchTextbox").attr("value", $span.text());
    }
    //--------------------------------------end---------------------------------------------------------------------------------------

    //users enter the "etner" press
    else if (event.keyCode == 13) {
        //reset index
        index01 = -1;
        isActive01 = false;
        var matchedValue = value.match(/\S+/g);
        if (matchedValue.length>1&& oldVal01 !== value) {
            oldVal01 = value;
            $("#searchSupTopTree").click();
        }
    }


    else {
        //reset index
        index01 = -1;
        $("#SupTopicNameList span").html("");
        $("#SupTopicNameList").attr("class", "");
//        if (value == "") {
//            //isHide is used to evoluate whether hide product tree
//            //isHide = false;
//            ReloadSupportTopicTree();
//        }
        
        if (value !== "") {
            var requestUrl01 = window.location.protocol + "//" + window.location.host + pathDir + "/GetMatchSupportTopicLists.srv";
            $.post(requestUrl01, { supTopMatchString: value }, function (data) {
                var jsonData = $.parseJSON(data);
                var html = [];
                var count = 0;
                $.each(jsonData, function (key, val) {
                    html.push('<span class="SupTopNameSpan" onclick="SelectSupTopName(\'' + val.SupportTopicName + '\')">' + val.SupportTopicName + '</span><br/>');
                    count = count + 1;
                });
                if (count > 0) {
                    if (isActive01) {
                        totalCount01 = count;
                        $("#SupTopicNameList").html(html.join(""));
                        //get the width of SupTopicNameList
                        var width = $("#SupTopicNameList").width();
                        $("#SupTopicNameList span").width(width);
                        //                        //bind a hover event for the span within SupTopicNameList
                        //                        $("#SupTopicNameList span").hover(function () {
                        //                            $("#SupTopicNameList span").css("background-color", "");
                        //                                $(this).css("background-color", "rgb(171, 214, 216)");
                        //                        });
                        $("#SupTopicNameList").attr("class", "SupTopicNameListC");
                    }
                }
                else {
                    totalCount01 = 0;
                    $("#SupTopicNameList span").html("");
                }
            });
        }
    }

}

//difine a global variable for storing the xml string
var xmlString01 = "";
function SetxmlString01() {
    var requestUrl01 = window.location.protocol + "//" + window.location.host + pathDir + "/GetSupportTopicTreeXml.srv";
    $.ajax({
        url: requestUrl01,
        type: "POST",
        data: { TYPE: "SupTopTreeXml" },
        success: function (data) {
            xmlString01 = data;
        }
    });
}

//identifier01:true-->search tree; false:-->async tree
var identifier01 = true;

//reload the product tree
function ReloadSupportTopicTree() {
    supTopMatchString = "";
    $("#supportTopicMatchTextbox").val("");
    $("#supportTopicTree div").html("");
    $("#SupTopicNameList span").html("");
    iniSupportTopicTree.data01 = [{
        "id": "All",
        "Text": "Root",
        "Value": "All",
        "showcheck": false,
        complete: false,
        "isexpand": false,
        "checkstate": 0,
        "hasChildren": true,
        "ChildNodes": null,
        "Level": "0"
    }];
    identifier01 = true;
    $("#supportTopicTree").treeview1(iniSupportTopicTree);
    $("#supportTopicTreeDiv").css("display", "block");
}

function DeleteSupportTopicTree() {
    if (!identifier01 || $("#supportTopicMatchTextbox").val() !== "") {
        $("#SupTopicNameList span").html("");
        $("#SupTopicNameList").attr("class", "");
        ReloadSupportTopicTree();
    }

}


function ShowSupTopTree() {
    $("#SupTopicNameList span").html("");
    $("#SupTopicNameList").attr("class", "");
    //get the searching value from textbox
    supTopMatchString = $("#supportTopicMatchTextbox").val();
    //display the loading animate
    $("#loadingSupTopTree").show();

    if (supTopMatchString.length > 0) {
        var requestUrl01 = window.location.protocol + "//" + window.location.host + pathDir + "/FilterSupportTopicTreeXmlByMatchString.srv";
        $.ajax({
            url: requestUrl01,
            type: "POST",
            data: { XmlString: xmlString01, MatchStr: supTopMatchString },
            dataType: "xml",
            success: function (data) {
                $("#loadingSupTopTree").hide();
                var $rootNode = $(data).find("all");
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
                if ($(data).find("all").children().length > 0) {
                    var nodesList = CreateDataSource01(root, $(data).find("all").children(), 0)
                    root["ChildNodes"] = nodesList;
                    iniSupportTopicTree.data01 = [root];
                    $("supportTopicTree div").html("");
                    identifier01 = false;
                    $("#supportTopicTree").treeview1(iniSupportTopicTree);
                }
                else {
                    $("#supportTopicTree").html("<p style='margin-top:10px;margin-left:35px'>No Matched Support Topic Tree</p>");
                }
            }
        });
    }
}


function CreateDataSource01(node, childNodes, level) {
    var nodesList = [];
    level = level + 1;
    $.each(childNodes, function (key, val) {
        var childNode = {
            "id": $(this).attr("id"),
            "Text": (decodeURIComponent($(this).attr("text"))).replace(/\+/g, " "),  
            "Value": (decodeURIComponent($(this).attr("value"))).replace(/\+/g, " "),
            "showcheck": $(this).attr("showcheck") == "true" ? true : false,
            complete: $(this).attr("complete") == "true" ? true : false,
            "isexpand": $(this).attr("isexpand") == "true" ? true : false,
            "checkstate": $(this).attr("checkstate"),
            "hasChildren": $(this).attr("hasChildren") == "true" ? true : false,
            "Level": level
        }
        nodesList.push(childNode);
        var len = $(this).children().length;
        if ($(this).attr("hasChildren") && len !== 0) {
            CreateDataSource01(childNode, $(this).children(), level);
        }
        node["ChildNodes"] = nodesList;
    });
    return nodesList;
}