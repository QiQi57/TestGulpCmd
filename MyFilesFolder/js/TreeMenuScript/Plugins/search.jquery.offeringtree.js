
function SelectOfferingName(productName) {
    $("#offTrMatchTextbox").attr("value", productName);
    $("#searchOffTree").click();
    $("#offeringNameList span").html("");
    //    $("#offeringNameList").attr("class", "");
    $("#offeringNameList").removeClass("productsNameListC");

}

var isActiveForOfferingTree = true;
var isEnterKeyForOfferingTree = false;

//set a variable for storing the count of items showed by search textbox
var totalCountForOfferingTree=0;
//initial value of indexForOfferingTree for locate the items
var indexForOfferingTree = -1;
//set a variable for evaluating whether the background color of item has been set by span's hover event
var isHoverForOfferingTree = false;

//show products' name when users enter the value into the textbox
function ShowOfferingName(event, value) {

    isActiveForOfferingTree = true;

     //--------------------------------select item by press up or down key----------------------------------------------------------
    if (totalCountForOfferingTree != 0&&(event.keyCode == 38||event.keyCode == 40)) {

        // clear the background color of all items
        $("#offeringNameList span").css("background-color","");
        var count = 0;
        if (isHoverForOfferingTree) {
            $("#offeringNameList span").each(function () {
                //evaluate whether span has set background color
                var bcColor = $(this).css("background-color");
                if (bcColor !== "transparent") {
                    //if evaluate successfully,set the indexForOfferingTree
                    indexForOfferingTree = count;
                    isHoverForOfferingTree = false;
                    return false;
                }
                count = count + 1;
            });
        }

      
        //press up key 
        if (event.keyCode == 38) {
            //if indexForOfferingTree equals -1 or 0, set the indexForOfferingTree to the last span 
            if (indexForOfferingTree == -1 || indexForOfferingTree == 0) {
                indexForOfferingTree = totalCountForOfferingTree - 1;
            }
            //distract 1 when press up key
            else {
                indexForOfferingTree = indexForOfferingTree - 1;
            }
        }
        //press down key
        else if (event.keyCode == 40) {
            //if the indexForOfferingTree is at the end, reset indexForOfferingTree
            if (indexForOfferingTree == totalCountForOfferingTree - 1) {
                indexForOfferingTree = -1;
            }
            //plus 1 when press down key
            indexForOfferingTree = indexForOfferingTree + 1;
        }
        if (indexForOfferingTree > 25) {
            $("#offeringNameList").scrollTop(300);
        }
        else {
            $("#offeringNameList").scrollTop(0);

        }
        var $span = $("#offeringNameList span:eq(" + indexForOfferingTree + ")");
        $span.css("background-color", "rgb(171,214,216)");
        //append the text of item to search textbox
        $("#offTrMatchTextbox").attr("value", $span.text());
    }
    //--------------------------------------end---------------------------------------------------------------------------------------

    else if (event.keyCode == 13) {
        //reset indexForOfferingTree
        indexForOfferingTree = -1;
        isActiveForOfferingTree = false;
        $("#searchOffTree").click();
    }


    else {
        //reset indexForOfferingTree
        indexForOfferingTree = -1;
        $("#offeringNameList span").html("");
        //$("#offeringNameList").attr("class", "");
        $("#offeringNameList").removeClass("productsNameListC");
        if (value == "") {
            //isHide is used to evoluate whether hide product tree
            isHide = false;
            ReloadOfferingTree();
        }
        var oldVal = "";
        if (oldVal !== value) {
            oldVal = value;
            var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/GetMatchProductsName.srv";
            $.post(requestUrl, { matchString: value, TreeType: "GetMatchOfferingName" }, function (data) {
                var jsonData = $.parseJSON(data);
                var html = [];
                var count = 0;
                $.each(jsonData, function (key, val) {
                    html.push('<span class="productNameSpan" onclick="SelectOfferingName(\'' + val.ProductName + '\')">' + val.ProductName + '</span><br/>');
                    count = count + 1;
                });
                if (count > 0) {
                    if (isActiveForOfferingTree) {
                        totalCountForOfferingTree = count;
                        $("#offeringNameList").html(html.join(""));
                        //get the width of offeringNameList
                        var width = $("#offeringNameList").width();
                        $("#offeringNameList span").width(width);
                        //                        //bind a hover event for the span within offeringNameList
                        //                        $("#offeringNameList span").hover(function () {
                        //                            $("#offeringNameList span").css("background-color", "");
                        //                                $(this).css("background-color", "rgb(171, 214, 216)");
                        //                        });
                        //$("#offeringNameList").attr("class", "productsNameListC");
                        $("#offeringNameList").addClass("productsNameListC");
                    }
                }
                else {
                    totalCountForOfferingTree = 0;
                    $("#offeringNameList span").html("");
                }
            });
        }
    }

}

//assoicate enter key with search button
function TriggerEnterKey1(event) {

}

//difine a global variable for storing the xml string
var xmlStringForOfferingTree = "";
function SetXmlStringForOfferingTree(pageName) {
    var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/GetProductTreeXml.srv";
    $.post(requestUrl, { PageName: pageName, TreeType: "ConvertToOfferingTreeString" }, function (data) {
        xmlStringForOfferingTree = data;
    });
}

//identifierForOfferingTree:true-->search tree; false:-->async tree
var identifierForOfferingTree = true;

//reload the product tree
function ReloadOfferingTree() {
    offeringmatchString = "";
    $("#offTrMatchTextbox").val("");
    $("#offeringTree div").html("");
    $("#offeringNameList span").html("");
    offeringTree.data = [{
        "id": "All",
        "Text": "All",
        "Value": "All",
        "showcheck": false,
        complete: false,
        "isexpand": false,
        "checkstate": 0,
        "hasChildren": true,
        "ChildNodes": null,
        "Level": "0"
    }];
    identifierForOfferingTree = true;
    offeringtreeNodesCount = 1;
    $("#txtOfferingTree").attr("value", "Selected all Items");
    offeringselectedProducts = "";
    $("#txtOfferingTreeHidden").attr("value", "");
    $("#offeringTree").offeringtreeview(offeringTree);
    $("#offeringTree").width(230);
    $("#closeOfferingTreeDiv").width(230);
    $("#offTrMatchTextbox").width(220);
    $("#searchOffTrDiv").width(230);
}

function DeleteOfferingTree() {
    if (!identifierForOfferingTree || $("#offTrMatchTextbox").val() !== "") {
        $("#offeringNameList span").html("");
        //$("#offeringNameList").attr("class", "");
        $("#offeringNameList").removeClass("productsNameListC");
        ReloadOfferingTree();
    }

}


function LoadFilteredOfferingTree() {
    offeringselectedProducts = "";
    offeringSelectedItems = 0;
    $("#txtOfferingTree").attr("value", "Selected " + offeringSelectedItems + " item");
    $("#txtOfferingTreeHidden").attr("value", "");
    

    $("#offeringNameList span").html("");
    //$("#offeringNameList").attr("class", "");
    $("#offeringNameList").removeClass("productsNameListC");
    //get the searching value from textbox
    offeringmatchString = $("#offTrMatchTextbox").val();
    if (offeringmatchString.length > 0) {
        var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/FilterProductTreeXmlByMatchString.srv";
        $.ajax({
            url: requestUrl,
            type: "POST",
            data: { XmlString: escape(xmlStringForOfferingTree), MatchStr: matchString },
            dataType: "xml",
            success: function (data) {
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
                    var nodesList = CreateDataSourceForOfferingTree(root, $(data).find("all").children(), 0)
                    root["ChildNodes"] = nodesList;
                    o.data = [root];
                    $("#offeringTree div").html("");
                    identifierForOfferingTree = false;
                    offeringtreeNodesCount = 1;
                    $("#offeringTree").offeringtreeview(o);
//                    //set the height of product tree
//                    var oldHeight01 = 180; //the old height of product tree div(id:tree)
//                    var oldHeight02 = 200; //the old height of close product tree div(id:closeOfferingTreeDiv)
//                    //var count = $(".bbit-tree-node-ct:visible li").get().length;
//                    var height = $("#offeringTree").height();
//                    if (offeringtreeNodesCount > 30) {
//                        var decreaseCount = 20;  //30 nodes is the max number of product tree container, initialy, the product tree container includes 10
//                        for (var i = 0; i < decreaseCount; i++) {
//                            oldHeight01 += 18;
//                            oldHeight02 += 18;
//                        }
//                    }
//                    else {
//                        var decreaseCount = offeringtreeNodesCount - 10;
//                        for (var i = 0; i < decreaseCount; i++) {
//                            oldHeight01 += 18;
//                            oldHeight02 += 18;
//                        }
//                    }
//                    //set the new height for product tree div
//                    $("#offeringTree").height(oldHeight01);
//                    $("#closeOfferingTreeDiv").height(oldHeight02);
//                    $("#calculatingDiv").height(oldHeight01);
//                    $("#calculatingPar").css("margin-top", ((oldHeight01 + 28 - 72) / 2));
                    setupSizeOfTree();
                }
                else {
                    $("#offeringTree").html("<p style='margin-top:10px;margin-left:35px'>No Match Offering Tree</p>");
                }
                //                    else {
                //                        $("#offeringTree").offeringtreeview(o);
                //                    }
            }
        });
    }
}
function setupSizeOfTree() {
    var newHeightOfTree = 0;
    var newHeightOfCloseTree = 0;
    var firstNodes = $("#offeringTree div[level='0']").next("ul").children("li");
    var count = firstNodes.length;
    var totalCount = CalculateTotalNodes(firstNodes, count);
    //plus the root node
    totalCount += 1;
    if (totalCount < 11) {
        newHeightOfTree = 180;
    }
    else if (totalCount > 10 && totalCount < 31) {
        newHeightOfTree = totalCount * 18;
    }
    else {
        newHeightOfTree = 30 * 18;
    }
    var newHeightOfCloseTree = newHeightOfTree + 20;
    $("#offeringTree").height(newHeightOfTree);
    $("#closeOfferingTreeDiv").height(newHeightOfCloseTree);
    $("#calculatingDiv").height(newHeightOfCloseTree + 28);
    //$("#calculatingDiv").css("line-height", newHeightOfCloseTree + 28);
    $("#calculatingPar").css("margin-top", ((newHeightOfCloseTree + 28 - 72) / 2));

}

function CalculateTotalNodes(nodes, count) {
    $.each(nodes, function (key, val) {
        var childNodes;
        if ($(this).children("ul").is(":visible")) {
            childNodes = $(this).children("ul").children("li");
            count += childNodes.length;
            count = CalculateTotalNodes(childNodes, count);
        }
    });
    return count;
}

function CreateDataSourceForOfferingTree(node, childNodes, level) {
    var nodesList = [];
    level = level + 1;
    $.each(childNodes, function (key, val) {
        var childNode = {
            "id": $(this).attr("id"),
            "Text": $(this).attr("text"),
            "Value": $(this).attr("value"),
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
            CreateDataSourceForOfferingTree(childNode, $(this).children(), level);
        }
        node["ChildNodes"] = nodesList;
    });
    return nodesList;
}