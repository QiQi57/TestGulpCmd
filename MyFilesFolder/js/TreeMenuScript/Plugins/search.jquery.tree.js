
function SelectProductName(productName) {
    $("#matchtextbox").attr("value", productName);
    $("#searchProductTree").click();
    $("#productsNameList span").html("");
    //$("#productsNameList").attr("class", "");
    $("#productsNameList").removeClass("productsNameListC");

}

var isActive = true;
var isEnterKey = false;

//set a variable for storing the count of items showed by search textbox
var totalCount=0;
//initial value of index for locate the items
var index = -1;
//set a variable for evaluating whether the background color of item has been set by span's hover event
var isHover = false;

//show products' name when users enter the value into the textbox
function ShowProductName(event, value) {

    isActive = true;

     //--------------------------------select item by press up or down key----------------------------------------------------------
    if (totalCount != 0&&(event.keyCode == 38||event.keyCode == 40)) {

        // clear the background color of all items
        $("#productsNameList span").css("background-color","");
        var count = 0;
        if (isHover) {
            $("#productsNameList span").each(function () {
                //evaluate whether span has set background color
                var bcColor = $(this).css("background-color");
                if (bcColor !== "transparent") {
                    //if evaluate successfully,set the index
                    index = count;
                    isHover = false;
                    return false;
                }
                count = count + 1;
            });
        }

      
        //press up key 
        if (event.keyCode == 38) {
            //if index equals -1 or 0, set the index to the last span 
            if (index == -1 || index == 0) {
                index = totalCount - 1;
            }
            //distract 1 when press up key
            else {
                index = index - 1;
            }
        }
        //press down key
        else if (event.keyCode == 40) {
            //if the index is at the end, reset index
            if (index == totalCount - 1) {
                index = -1;
            }
            //plus 1 when press down key
            index = index + 1;
        }
        if (index > 25) {
            $("#productsNameList").scrollTop(300);
        }
        else {
            $("#productsNameList").scrollTop(0);

        }
        var $span = $("#productsNameList span:eq(" + index + ")");
        $span.css("background-color", "rgb(171,214,216)");
        //append the text of item to search textbox
        $("#matchtextbox").attr("value", $span.text());
    }
    //--------------------------------------end---------------------------------------------------------------------------------------

    else if (event.keyCode == 13) {
        //reset index
        index = -1;
        isActive = false;
        $("#searchProductTree").click();
    }


    else {
        //reset index
        index = -1;
        $("#productsNameList span").html("");
        //$("#productsNameList").attr("class", "");
        $("#productsNameList").removeClass("productsNameListC");

        if (value == "") {
            //isHide is used to evoluate whether hide product tree
            isHide = false;
            ReloadProductTree();
        }
        var oldVal = "";
        if (oldVal !== value) {
            oldVal = value;
            var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/GetMatchProductsName.srv";
            $.post(requestUrl, { matchString: value,TreeType:"GetMatchProdcutsName" }, function (data) {
                var jsonData = $.parseJSON(data);
                var html = [];
                var count = 0;
                $.each(jsonData, function (key, val) {
                    html.push('<span class="productNameSpan" onclick="SelectProductName(\'' + val.ProductName + '\')">' + val.ProductName + '</span><br/>');
                    count = count + 1;
                });
                if (count > 0) {
                    if (isActive) {
                        totalCount = count;
                        $("#productsNameList").html(html.join(""));
                        //get the width of productsnamelist
                        var width = $("#productsNameList").width();
                        $("#productsNameList span").width(width);
                        //                        //bind a hover event for the span within productsNameList
                        //                        $("#productsNameList span").hover(function () {
                        //                            $("#productsNameList span").css("background-color", "");
                        //                                $(this).css("background-color", "rgb(171, 214, 216)");
                        //                        });
                        //$("#productsNameList").attr("class", "productsNameListC");
                        $("#productsNameList").addClass("productsNameListC");
                    }
                }
                else {
                    totalCount = 0;
                    $("#productsNameList span").html("");
                }
            });
        }
    }

}

//assoicate enter key with search button
function TriggerEnterKey(event) {

}

//difine a global variable for storing the xml string
var xmlString = "";
function SetXmlString(pageName) {
    var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/GetProductTreeXml.srv";
    $.post(requestUrl,{PageName:pageName,TreeType:"ConvertToTreeString"}, function (data) {
        xmlString = data;
    });
}

//identifier:true-->search tree; false:-->async tree
var identifier = true;

//reload the product tree
function ReloadProductTree() {
    matchString = "";
    $("#matchtextbox").val("");
    $("#tree div").html("");
    $("#productsNameList span").html("");
    o.data = [{
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
    identifier = true;
    treeNodesCount = 1;
    $("#txtProductTree").attr("value", "Selected 0 Item");
    selectedProducts = "";
    $("#txtProductTreeHidden").attr("value", "");
    $("#tree").treeview(o);
    $("#tree").width(230);
    $("#closeTreeDiv").width(230);
    $("#matchtextbox").width(220);
    $("#searchDiv").width(230);
}

function DeleteProductsTree() {
    if (!identifier || $("#matchtextbox").val() !== "") {
        $("#productsNameList span").html("");
        //$("#productsNameList").attr("class", "");
        $("#productsNameList").removeClass("productsNameListC");
        ReloadProductTree();
    }

}


function ShowProductsTree() {
    selectedProducts = "";
    selectedItems = 0;
    $("#txtProductTree").attr("value", "Selected " + selectedItems + " item");
    $("#txtProductTreeHidden").attr("value", "");
    
    //clear selected value of product view panel and Audience View panel
    var patt = /TICInTopIssue.aspx/g;
    if (patt.test(window.location.pathname)) {
        var listItemsOfProView = $('input[type="checkbox"][name="radio"]:checked');
        listItemsOfProView.each(function (idx, ck) {
            $(ck).prop("checked", false);
            $(ck).parent().next().attr("class", "rankNoSelect");
        });
        var listItemsOfAudView = $('input[type="radio"][name="av"]:checked');
        listItemsOfAudView.each(function (idx, ck) {
            $(ck).prop("checked", false);
            $(ck).parent().next().attr("class", "rankNoSelect_AV");
        });
    }



    $("#productsNameList span").html("");
    //$("#productsNameList").attr("class", "");
    $("#productsNameList").removeClass("productsNameListC");

    //get the searching value from textbox
    matchString = $("#matchtextbox").val();
    if (matchString.length > 0) {
        var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/FilterProductTreeXmlByMatchString.srv";
        $.ajax({
            url: requestUrl,
            type: "POST",
            data: { XmlString: escape(xmlString), MatchStr: matchString },
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
                    var nodesList = CreateDataSource(root, $(data).find("all").children(), 0)
                    root["ChildNodes"] = nodesList;
                    o.data = [root];
                    $("#tree div").html("");
                    identifier = false;
                    treeNodesCount = 1;
                    $("#tree").treeview(o);

                    //set the height of product tree
                    var oldHeight01 = 180; //the old height of product tree div(id:tree)
                    var oldHeight02 = 200; //the old height of close product tree div(id:closeTreeDiv)
                    //var count = $(".bbit-tree-node-ct:visible li").get().length;
                    var height = $("#tree").height();
                    if (treeNodesCount > 30) {
                        var decreaseCount = 20;  //30 nodes is the max number of product tree container, initialy, the product tree container includes 10
                        for (var i = 0; i < decreaseCount; i++) {
                            oldHeight01 += 18;
                            oldHeight02 += 18;
                        }
                    }
                    else {
                        var decreaseCount = treeNodesCount - 10;
                        for (var i = 0; i < decreaseCount; i++) {
                            oldHeight01 += 18;
                            oldHeight02 += 18;
                        }
                    }
                    //set the new height for product tree div
                    $("#tree").height(oldHeight01);
                    $("#closeTreeDiv").height(oldHeight02);
                    $("#calculatingDiv").height(oldHeight01);
                    $("#calculatingPar").css("margin-top", ((oldHeight01 + 28 - 72) / 2));

                }
                else {
                    $("#tree").html("<p style='margin-top:10px;margin-left:35px'>No Match Product Tree</p>");
                }
                //                    else {
                //                        $("#tree").treeview(o);
                //                    }
            }
        });
    }
}


function CreateDataSource(node, childNodes, level) {
    var nodesList = [];
    level = level + 1;
    $.each(childNodes, function (key, val) {
        var childNode = {
            "id": $(this).attr("id"),
            "Text": unescape($(this).attr("text")),
            "Value": unescape($(this).attr("value")),
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
            CreateDataSource(childNode, $(this).children(), level);
        }
        node["ChildNodes"] = nodesList;
    });
    return nodesList;
}