
function SelectCusRegName(productName) {
    $("#cusRegionTrMatchTextbox").attr("value", productName);
    $("#searchCusRegionTree").click();
    $("#cusRegionNamesList span").html("");
    //    $("#cusRegionNamesList").attr("class", "");
    $("#cusRegionNamesList").removeClass("productsNameListC");

}

var isActiveForCusRegTree = true;
var isEnterKeyForCusRegTree = false;

//set a variable for storing the count of items showed by search textbox
var totalCountForCusRegTree=0;
//initial value of indexForCusRegTree for locate the items
var indexForCusRegTree = -1;
//set a variable for evaluating whether the background color of item has been set by span's hover event
var isHoverForCusRegTree = false;

//show products' name when users enter the value into the textbox
function ShowCusRegionName(event, value) {

    isActiveForCusRegTree = true;

     //--------------------------------select item by press up or down key----------------------------------------------------------
    if (totalCountForCusRegTree != 0&&(event.keyCode == 38||event.keyCode == 40)) {

        // clear the background color of all items
        $("#cusRegionNamesList span").css("background-color","");
        var count = 0;
        if (isHoverForCusRegTree) {
            $("#cusRegionNamesList span").each(function () {
                //evaluate whether span has set background color
                var bcColor = $(this).css("background-color");
                if (bcColor !== "transparent") {
                    //if evaluate successfully,set the indexForCusRegTree
                    indexForCusRegTree = count;
                    isHoverForCusRegTree = false;
                    return false;
                }
                count = count + 1;
            });
        }

      
        //press up key 
        if (event.keyCode == 38) {
            //if indexForCusRegTree equals -1 or 0, set the indexForCusRegTree to the last span 
            if (indexForCusRegTree == -1 || indexForCusRegTree == 0) {
                indexForCusRegTree = totalCountForCusRegTree - 1;
            }
            //distract 1 when press up key
            else {
                indexForCusRegTree = indexForCusRegTree - 1;
            }
        }
        //press down key
        else if (event.keyCode == 40) {
            //if the indexForCusRegTree is at the end, reset indexForCusRegTree
            if (indexForCusRegTree == totalCountForCusRegTree - 1) {
                indexForCusRegTree = -1;
            }
            //plus 1 when press down key
            indexForCusRegTree = indexForCusRegTree + 1;
        }
        if (indexForCusRegTree > 25) {
            $("#cusRegionNamesList").scrollTop(300);
        }
        else {
            $("#cusRegionNamesList").scrollTop(0);

        }
        var $span = $("#cusRegionNamesList span:eq(" + indexForCusRegTree + ")");
        $span.css("background-color", "rgb(171,214,216)");
        //append the text of item to search textbox
        $("#cusRegionTrMatchTextbox").attr("value", $span.text());
    }
    //--------------------------------------end---------------------------------------------------------------------------------------

    else if (event.keyCode == 13) {
        //reset indexForCusRegTree
        indexForCusRegTree = -1;
        isActiveForCusRegTree = false;
        $("#searchCusRegionTree").click();
    }


    else {
        //reset indexForCusRegTree
        indexForCusRegTree = -1;
        $("#cusRegionNamesList span").html("");
        //$("#cusRegionNamesList").attr("class", "");
        $("#cusRegionNamesList").removeClass("productsNameListC");
        if (value == "") {
            //isHide is used to evoluate whether hide product tree
            isHide = false;
            ReloadOfferingTree();
        }
        var oldVal = "";
        if (oldVal !== value) {
            oldVal = value;
            var requestUrl = window.location.protocol + "//" + window.location.host +pathDir+ "/GetMatchProductsName.srv";
            $.post(requestUrl, { matchString: value, TreeType: "GetMatchGeoName" }, function (data) {
                var jsonData = $.parseJSON(data);
                var html = [];
                var count = 0;
                $.each(jsonData, function (key, val) {
                    html.push('<span class="productNameSpan" onclick="SelectCusRegName(\'' + val.ProductName + '\')">' + val.ProductName + '</span><br/>');
                    count = count + 1;
                });
                if (count > 0) {
                    if (isActiveForCusRegTree) {
                        totalCountForCusRegTree = count;
                        $("#cusRegionNamesList").html(html.join(""));
                        //get the width of cusRegionNamesList
                        var width = $("#cusRegionNamesList").width();
                        $("#cusRegionNamesList span").width(width);
                        //                        //bind a hover event for the span within cusRegionNamesList
                        //                        $("#cusRegionNamesList span").hover(function () {
                        //                            $("#cusRegionNamesList span").css("background-color", "");
                        //                                $(this).css("background-color", "rgb(171, 214, 216)");
                        //                        });
                        //$("#cusRegionNamesList").attr("class", "productsNameListC");
                        $("#cusRegionNamesList").addClass("productsNameListC");
                    }
                }
                else {
                    totalCountForCusRegTree = 0;
                    $("#cusRegionNamesList span").html("");
                }
            });
        }
    }

}

//assoicate enter key with search button
function TriggerEnterKey1(event) {

}

//difine a global variable for storing the xml string
var xmlStringForCusRegTree = "";
function SetxmlStringForCusRegTree(pageName) {
    var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/GetProductTreeXml.srv";
    $.post(requestUrl, { PageName: pageName, TreeType: "ConvertToGeoTreeString" }, function (data) {
        xmlStringForCusRegTree = data;
    });
}

//identifierForCusRegTree:true-->search tree; false:-->async tree
var identifierForCusRegTree = true;

//reload the customer region tree
function ReloadCusRegTree() {
    cusRegmatchString = "";
    $("#cusRegionTrMatchTextbox").val("");
    $("#cusRegionTree div").html("");
    $("#cusRegionNamesList span").html("");
    cusRegionTree.data = [{
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
    identifierForCusRegTree = true;
    cusRegiontreeNodesCount = 1;
    $("#txtcusRegionTree").attr("value", "Selected all Items");
    cusRegionselectedProducts = "";
    $("#txtcusRegionTreeHidden").attr("value", "");
    $("#cusRegionTree").cusRegiontreeview(cusRegionTree);
    $("#cusRegionTree").width(230);
    $("#closecusRegionTreeDiv").width(230);
    $("#cusRegionTrMatchTextbox").width(220);
    $("#searchcusRegionTreeDiv").width(230);
}

function DeleteCusRegionTree() {
    if (!identifierForCusRegTree || $("#cusRegionTrMatchTextbox").val() !== "") {
        $("#cusRegionNamesList span").html("");
        //$("#cusRegionNamesList").attr("class", "");
        $("#cusRegionNamesList").removeClass("productsNameListC");
        ReloadCusRegTree();
    }

}


function LoadFilteredCusRegionTree() {
    cusRegionselectedProducts = "";
    cusRegSelectedItems = 0;
    $("#txtcusRegionTree").attr("value", "Selected " + cusRegSelectedItems + " item");
    $("#txtcusRegionTreeHidden").attr("value", "");
    

    $("#cusRegionNamesList span").html("");
    //$("#cusRegionNamesList").attr("class", "");
    $("#cusRegionNamesList").removeClass("productsNameListC");
    //get the searching value from textbox
    cusRegmatchString = $("#cusRegionTrMatchTextbox").val();
    if (cusRegmatchString.length > 0) {
        var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/FilterProductTreeXmlByMatchString.srv";
        $.ajax({
            url: requestUrl,
            type: "POST",
            data: { XmlString: escape(xmlStringForCusRegTree), MatchStr: matchString },
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
                    var nodesList = CreateDataSourceForCusRegTree(root, $(data).find("all").children(), 0)
                    root["ChildNodes"] = nodesList;
                    o.data = [root];
                    $("#cusRegionTree div").html("");
                    identifierForCusRegTree = false;
                    cusRegiontreeNodesCount = 1;
                    $("#cusRegionTree").cusRegiontreeview(o);
//                    //set the height of product tree
//                    var oldHeight01 = 180; //the old height of product tree div(id:tree)
//                    var oldHeight02 = 200; //the old height of close product tree div(id:closecusRegionTreeDiv)
//                    //var count = $(".bbit-tree-node-ct:visible li").get().length;
//                    var height = $("#cusRegionTree").height();
//                    if (cusRegionTreeNodesCount > 30) {
//                        var decreaseCount = 20;  //30 nodes is the max number of product tree container, initialy, the product tree container includes 10
//                        for (var i = 0; i < decreaseCount; i++) {
//                            oldHeight01 += 18;
//                            oldHeight02 += 18;
//                        }
//                    }
//                    else {
//                        var decreaseCount = cusRegionTreeNodesCount - 10;
//                        for (var i = 0; i < decreaseCount; i++) {
//                            oldHeight01 += 18;
//                            oldHeight02 += 18;
//                        }
//                    }
//                    //set the new height for product tree div
//                    $("#cusRegionTree").height(oldHeight01);
//                    $("#closecusRegionTree").height(oldHeight02);
//                    $("#calculatingDiv").height(oldHeight01);
//                    $("#calculatingPar").css("margin-top", ((oldHeight01 + 28 - 72) / 2));
                    setupSizeOfCusRegTree();
                }
                else {
                    $("#cusRegionTree").html("<p style='margin-top:10px;margin-left:35px'>No Match Offering Tree</p>");
                }
                //                    else {
                //                        $("#cusRegionTree").cusRegionTreeview(o);
                //                    }
            }
        });
    }
}
function setupSizeOfCusRegTree() {
    var newHeightOfTree = 0;
    var newHeightOfCloseTree = 0;
    var firstNodes = $("#cusRegionTree div[level='0']").next("ul").children("li");
    var count = firstNodes.length;
    var totalCount = CalculateTotalNodesForCusRegTr(firstNodes, count);
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
    $("#cusRegionTree").height(newHeightOfTree);
    $("#closecusRegionTreeDiv").height(newHeightOfCloseTree);
    $("#calculatingDiv").height(newHeightOfCloseTree + 28);
    //$("#calculatingDiv").css("line-height", newHeightOfCloseTree + 28);
    $("#calculatingPar").css("margin-top", ((newHeightOfCloseTree + 28 - 72) / 2));

}

function CalculateTotalNodesForCusRegTr(nodes, count) {
    $.each(nodes, function (key, val) {
        var childNodes;
        if ($(this).children("ul").is(":visible")) {
            childNodes = $(this).children("ul").children("li");
            count += childNodes.length;
            count = CalculateTotalNodesForCusRegTr(childNodes, count);
        }
    });
    return count;
}

function CreateDataSourceForCusRegTree(node, childNodes, level) {
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
            CreateDataSourceForCusRegTree(childNode, $(this).children(), level);
        }
        node["ChildNodes"] = nodesList;
    });
    return nodesList;
}