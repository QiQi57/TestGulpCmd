/**
* @description {Class} wdTree
* This is the main class of wdTree.
*/
(function ($) {
    //declare 3 array variables for separately storing the list of offeringLevel1, offeringLevel2 and offeringsLevel3
    var offeringLevel1 = [];
    var offeringLevel2 = [];
    var offeringLevel3 = [];
    var offeringSelectedItems = 0;
    $.fn.swapClass = function (c1, c2) {
        return this.removeClass(c1).addClass(c2);
    };
    $.fn.switchClass = function (c1, c2) {
        if (this.hasClass(c1)) {
            return this.swapClass(c1, c2);
        }
        else {
            return this.swapClass(c2, c1);
        }
    };
    $.fn.offeringtreeview = function (settings) {
        var dfop =
            {
                method: "POST",
                datatype: "json",
                /**
                * @description {Config} url  
                * {String} Url for child nodes retrieving. im
                */
                url: false,
                /**
                * {String} Checkbox image path.
                */
                cbiconpath: "../../Styles/TreeMenuCss/images/icons/",
                icons: ["checkbox_0.gif", "checkbox_1.gif", "checkbox_2.gif"],
                /**
                * {Boolean} Whether to show check box or not. 
                */
                showcheck: false,

                /*
                * Fired when check box is clicked on.
                */
                oncheckboxclick: false,
                /**
                * Fired when a node is clicked on.
                */
                onnodeclick: false,
                /**
                * @description {Config} cascadecheck  
                * {Boolean} Whether node being seleted leads to parent/sub node being selected.  
                */
                cascadecheck: true,

                /**
                * @description {Config} data  
                * {Object} Tree theme. Three themes provided. 'bbit-tree-lines' ,'bbit-tree-no-lines' and 'bbit-tree-arrows'.
                * @sample 
                * data:[{
                * id:"node1", //node id
                * text:"node 1", //node text for display.
                * value:"1", //node value
                * showcheck:false, //whether to show checkbox
                * checkstate:0, //Checkbox checking state. 0 for unchecked, 1 for partial checked, 2 for checked.
                * hasChildren:true, //If hasChildren and complete set to true, and ChildNodes is empty, tree will request server to get sub node.
                * isexpand:false, //Expand or collapse.
                * complete:false, //See hasChildren.
                * ChildNodes:[] // child nodes
                * }]                  
                *  */
                data: null,
                /**
                * {String} Whether to toggle node when node clicked. 
                */
                clicktoggle: true,
                /**
                * {String} Tree theme. Three themes provided. 'bbit-tree-lines' ,'bbit-tree-no-lines' and 'bbit-tree-arrows'. 
                */
                theme: "bbit-tree-lines" //bbit-tree-lines ,bbit-tree-no-lines,bbit-tree-arrows
            };
        var me = $(this);

        $.extend(dfop, settings);
        var treenodes = dfop.data;
        offeringallNodes = dfop.data;
        var id = me.attr("id");   //---------------------------------------------------------------node-1
        if (id == null || id == "") {
            id = "bbtree" + new Date().getTime();
            me.attr("id", id);
        }


        var html = [];
        buildtree(dfop.data, html);
        me.addClass("bbit-tree").html(html.join(""));
        InitEvent(me);

        $("#OffTreeClearSelect").click(nodeclick);
        //if identifierForOfferingTree is true, it's async tree, expland the root node(all)
        if (identifierForOfferingTree) {
            $("#offeringTree .bbit-tree-ec-icon").click();
        }

        html = null;

        //pre load the icons
        if (dfop.showcheck) {
            for (var i = 0; i < 3; i++) {
                var im = new Image();
                im.src = dfop.cbiconpath + dfop.icons[i];
            }
        }

        //region  
        function buildtree(data, ht) {
            ht.push("<div class='bbit-tree-bwrap'>"); // Wrap ;
            ht.push("<div class='bbit-tree-body'>"); // body ;
            ht.push("<ul class='bbit-tree-root ", dfop.theme, "'>"); //root   --------------------------------------theme:bbit-tree-arrows
            if (data && data.length > 0) {
                var l = data.length;
                for (var i = 0; i < l; i++) {
                    buildnode(data[i], ht, 0, i, i == l - 1);         //------------------data[i]:childnodes     ht:html,   0,  (0-2), (2)
                }
                treenodes = data;
                dfop.data = data;
            }
            else {                                                  //can be commented
                asnyloadc(null, false, function (data) {
                    if (data && data.length > 0) {
                        treenodes = data;
                        dfop.data = data;
                        var l = data.length;
                        for (var i = 0; i < l; i++) {
                            buildnode(data[i], ht, 0, i, i == l - 1);
                        }
                    }
                });
            }                                                    //can be commented
            ht.push("</ul>"); // root and;
            ht.push("</div>"); // body end;
            ht.push("</div>"); // Wrap end;
        }


        //endregion
        function buildnode(nd, ht, deep, path, isend) {   //------------------data[i]:childnodes     ht:html,   0,  (0-2), (2)

            //treeNodesCount = treeNodesCount + 1;

            //create a level attribute for each node   
            //added 3/26
            //identifierForOfferingTree is used to recognize whether it's search tree or async tree
            var level = deep;
            if (!identifierForOfferingTree) {


                var oldWidth1 = 180; //the old width of product tree div(id:tree)
                var oldWidth2 = 180; //the old width of close product tree div(id:closeTreeDiv)
                var searchTextbox = 170;
                if ($("#offeringTree").width() < 340) {
                    for (var i = 0; i < deep; i++) {
                        oldWidth1 += 50;
                        oldWidth2 += 50;
                        searchTextbox += 50;
                    }
                    $("#offeringTree").width(oldWidth1);
                    $("#closeOfferingTreeDiv").width(oldWidth2);
                    $("#searchOffTrDiv").width(oldWidth2);
                    $("#offTrMatchTextbox").width(searchTextbox);
                    $("#offeringNameList").width(oldWidth2);
                    $("#calculatingDiv").width(oldWidth2);
                }
            }
            //var nid = nd.id.replace(/[^\w]/gi, "_");     //-------------------nd.id="node-1";   \w:look at words      nid:node_1
            var nid = nd.id     //-------------------nd.id="node-1";   \w:look at words      nid:node_1
            ht.push("<li class='bbit-tree-node'>");
            ht.push("<div id='", id, "_", nid, "' tpath='", path, "' level='", level, "' unselectable='on' title='", nd.Text, "'");
            var cs = [];
            cs.push("bbit-tree-node-el");    //------------------cs is used to set the folder style or end nodes style, can be deleted
            if (nd.hasChildren) {
                cs.push(nd.isexpand ? "bbit-tree-node-expanded" : "bbit-tree-node-collapsed");
            }
            else {
                cs.push("bbit-tree-node-leaf");
            }
            if (nd.classes) { cs.push(nd.classes); }

            ht.push(" class='", cs.join(" "), "'>");     //----------------------------set the value of class of div
            //span indent
            ht.push("<span class='bbit-tree-node-indent'>");
            if (deep == 1) {                            //-------------------------deep:0
                ht.push("<img class='bbit-tree-icon' src='" + dfop.cbiconpath + "s.gif'/>");
            }
            else if (deep > 1) {
                ht.push("<img class='bbit-tree-icon' src='" + dfop.cbiconpath + "s.gif'/>");
                for (var j = 1; j < deep; j++) {
                    ht.push("<img class='bbit-tree-elbow-line' src='" + dfop.cbiconpath + "/s.gif'/>");
                }
            }
            ht.push("</span>");
            //img
            cs.length = 0;
            if (nd.hasChildren) {
                if (nd.isexpand) {
                    cs.push(isend ? "bbit-tree-elbow-end-minus" : "bbit-tree-elbow-minus");
                }
                else {
                    cs.push(isend ? "bbit-tree-elbow-end-plus" : "bbit-tree-elbow-plus");
                }
            }
            else {
                cs.push(isend ? "bbit-tree-elbow-end" : "bbit-tree-elbow");
            }
            ht.push("<img class='bbit-tree-ec-icon ", cs.join(" "), "' src='" + dfop.cbiconpath + "s.gif'/>");
            //ht.push("<img class='bbit-tree-node-icon' src='" + dfop.cbiconpath + "s.gif'/>");  //edit:delete folder icons
            //----------------------------------------------------------------------for loading.gif--------------------------------------------------------------
            ht.push("<img class='bbit-tree-node-icon' src='" + dfop.cbiconpath + "s.gif'/>"); //edit:hide the folder icons &&loading image when plus is clicked
            //---------------------------------------------------------------------------------------------------------------------------------------------------

            //------------------------------------------------------highlight offeringmatchString--------------------------------------
            //if the text of node includes the value of search textbox of product tree, hightlight this part
            var reg = new RegExp(offeringmatchString, "i");
            var hightLightValue = nd && nd.Text && nd.Text.match(reg);
            var noHightLightValue = "";
            var nodeText = "";
            if (!hightLightValue == null || !hightLightValue == "") {
                var startIndex = nd.Text.toLocaleLowerCase().indexOf(offeringmatchString.toLocaleLowerCase());
                //startIndex=0:the offeringmatchString is at the begining
                if (startIndex == 0) {
                    noHightLightValue = nd.Text.substr(offeringmatchString.length);
                    nodeText = "<font style=';font-weight:bold'>" + hightLightValue + "</font>" + noHightLightValue;
                }
                //evaluate whether the match string occurs at the end
                else if (startIndex == nd.Text.length - offeringmatchString.length) {
                    noHightLightValue = nd.Text.substring(0, startIndex);
                    nodeText = noHightLightValue + "<font style=';font-weight:bold'>" + hightLightValue + "</font>";
                }
                //the offeringmatchString occurs at the middle position
                else {
                    var startValue = nd.Text.substring(0, startIndex);
                    var endValue = nd.Text.substr(startIndex + offeringmatchString.length);
                    nodeText = startValue + "<font style=';font-weight:bold'>" + hightLightValue + "</font>" + endValue;
                }

            }
            else {
                nodeText = nd.Text;
            }
            //------------------------------------------------------------------end---------------------------------------------

            //checkbox
            if (dfop.showcheck && nd.showcheck) {
                if (nd.checkstate == null || nd.checkstate == undefined) {
                    nd.checkstate = 0;
                }
                ht.push("<img  id='", id, "_", nid, "_cb' class='bbit-tree-node-cb' src='", dfop.cbiconpath, dfop.icons[nd.checkstate], "'/>");
                //a
                ht.push("<a hideFocus class='bbit-tree-node-anchor' tabIndex=1 href='javascript:void(0);'>");
                ht.push("<span class='bbit-tree-node-span' unselectable='on'>", nodeText, "</span>");
                ht.push("</a>");
            }
            else {
                //a
                ht.push("<a hideFocus class='bbit-tree-node-anchor' tabIndex=1 href='javascript:void(0);'>");
                ht.push("<span unselectable='on'>", nodeText, "</span>");
                ht.push("</a>");
            }
            //
            //a
            ht.push("</div>");
            //Child
            if (nd.hasChildren) {
                if (nd.isexpand) {
                    ht.push("<ul  class='bbit-tree-node-ct'  style='z-index: 0; position: static; visibility: visible; top: auto; left: auto;'>");
                    if (nd.ChildNodes) {
                        var l = nd.ChildNodes.length;
                        for (var k = 0; k < l; k++) {
                            nd.ChildNodes[k].parent = nd;
                            buildnode(nd.ChildNodes[k], ht, deep + 1, path + "." + k, k == l - 1);
                        }
                    }
                    ht.push("</ul>");
                }
                else {
                    ht.push("<ul style='display:none;'></ul>");
                }
            }
            ht.push("</li>");
            nd.render = true;
            //--------------------------------------------------------------------------------------hide the loading gif--------------------------------
            $(".bbit-tree-node-icon").hide();
            //---------------------------------------------------------------------------------------end---------------------------------------------------------
        }
        function getItem(path) {
            var ap = path.split(".");
            var t = treenodes;
            for (var i = 0; i < ap.length; i++) {
                if (i == 0) {
                    t = t[ap[i]];
                }
                else {
                    t = t.ChildNodes[ap[i]];  //dfasfaskdfjlaksdf----------------------------------------------------------------------------
                }
            }
            return t;
        }

        function check(item, state, type) { //0 1  1(gif)
            var pstate = item.checkstate;
            if (type == 1) {
                item.checkstate = state;
            }
            else {// go to childnodes
                var cs = item.ChildNodes;
                var l = cs.length;
                var ch = true;
                for (var i = 0; i < l; i++) {
                    if ((state == 1 && cs[i].checkstate != 1) || state == 0 && cs[i].checkstate != 0) {
                        ch = false;
                        break;
                    }
                }
                if (ch) {
                    item.checkstate = state;
                }
                else {
                    item.checkstate = 2;
                }
            }
            //change show and store the value of checkbox to the hidden string
            if (item.render && pstate != item.checkstate) {
                //                var nid = item.id.replace(/[^\w]/gi, "_");
                var nid = item.id;
                var et = $("#" + id + "_" + nid + "_cb");
                if (et.length == 1) {
                    et.attr("src", dfop.cbiconpath + dfop.icons[item.checkstate]);
                    //estimate the item.checkstate, 0  
                    if (item.checkstate == 0) {
                        if (item.Level == 1) {
                            var pOfElement = IsInArrayOff(item.Value, offeringLevel1);
                            if (pOfElement > -1) {
                                offeringLevel1.splice(pOfElement, 1);
                            }
                        }
                        if (item.Level == 2) {
                            var pOfElement = IsInArrayOff(item.Value, offeringLevel2);
                            if (pOfElement > -1) {
                                offeringLevel2.splice(pOfElement, 1);
                            }
                        }
                        if (item.Level == 3) {
                            var pOfElement = IsInArrayOff(item.Value, offeringLevel3);
                            if (pOfElement > -1) {
                                offeringLevel3.splice(pOfElement, 1);
                            }
                        }
                    }
                    else {
                        if (item.Level == 1) {
                            var pOfElement1 = IsInArrayOff(item.Value, offeringLevel1);
                            if (pOfElement1 == -1) {
                                AddEleInArrayOff(item.Value, offeringLevel1);
                            }
                        }
                        if (item.Level == 2) {
                            var pOfElement2 = IsInArrayOff(item.Value, offeringLevel2);
                            var pOfElement1 = IsInArrayOff(item.parent.Value, offeringLevel1);
                            if (pOfElement2 == -1) {
                                AddEleInArrayOff(item.Value, offeringLevel2);
                            }
                            if (pOfElement1 == -1) {
                                AddEleInArrayOff(item.parent.Value, offeringLevel1);
                            }
                        }
                        if (item.Level == 3) {
                            var pOfElement3 = IsInArrayOff(item.Value, offeringLevel3);
                            var pOfElement2 = IsInArrayOff(item.parent.Value, offeringLevel2);
                            var pOfElement1 = IsInArrayOff(item.parent.parent.Value, offeringLevel1);
                            if (pOfElement3 == -1) {
                                AddEleInArrayOff(item.Value, offeringLevel3);
                            }
                            if (pOfElement2 == -1) {
                                AddEleInArrayOff(item.parent.Value, offeringLevel2);
                            }
                            if (pOfElement1 == -1) {
                                AddEleInArrayOff(item.parent.parent.Value, offeringLevel1);
                            }
                        }
                    }

                }
                $("#OffLevel1Hidden").val(offeringLevel1.join('^'));
                $("#OffLevel2Hidden").val(offeringLevel2.join('^'));
                $("#OffLevel3Hidden").val(offeringLevel3.join('^'));
            }
        }

        function IsInArrayOff(ele, arr) {
            return $.inArray(ele, arr);
        }
        function AddEleInArrayOff(ele, arr) {
            arr.push(ele);
        }

        //iterate all children nodes
        function cascade(fn, item, args) {
            if (fn(item, args, 1) != false) {
                if (item.ChildNodes != null && item.ChildNodes.length > 0) {
                    var cs = item.ChildNodes;
                    for (var i = 0, len = cs.length; i < len; i++) {
                        cascade(fn, cs[i], args);
                    }
                }
            }
        }
        //bubble to parent
        function bubble(fn, item, args) {
            var p = item.parent;
            while (p) {
                if (fn(p, args, 0) === false) {
                    break;
                }
                p = p.parent;
            }
        }

        function nodeclick(e) {

            var et = e.target || e.srcElement;
            if (et.id == "OffTreeClearSelect") {
                path = "0";
                item = getItem(path);
                var state = 0;
                item.itemstate = 0;
                cascade(check, item, state);
                offeringselectedProducts = "";
                offeringSelectedItems = 0;
                $("#txtOfferingTree").attr("value", "Selected all items");
                $("#txtOfferingTreeHidden").attr("value", "");
                return;
            }
            var path = $(this).attr("tpath");
            var nodeLevel = $(this).attr("level");
            var item = getItem(path);
            if (et.tagName == "IMG" || (et.tagName == "SPAN" && nodeLevel > 1) || et.tagName == "FONT") {

                var ul = $(this).next(); //"bbit-tree-node-ct"
                //+ if collapsed, expend it 
                if ($(et).hasClass("bbit-tree-elbow-plus") || $(et).hasClass("bbit-tree-elbow-end-plus")) {

                    //                    var ul = $(this).next(); //"bbit-tree-node-ct"
                    //                    if (ul.hasClass("bbit-tree-node-ct")) {
                    //                        ul.show();
                    //                    }
                    //                    else {



                    //-----------------------------------------------------------------------------show checkbox
                    //                    var divId = $(this).attr("id");
                    //                    $("#" + divId + " .bbit-tree-node-cb").show();
                    //------------------------------------------------------------------------------show checkbox end
                    var deep = path.split(".").length;
                    //--------------------------------------------------------------------------change the width of product tree div----------------------------


                    var nodeLevel = $(this).attr("level");
                    //get the count of nodes under this level
                    var countOfNodes = $("div[level='" + nodeLevel + "'").next("ul:visible").length;
                    if (countOfNodes == 0) {
                        var oldWidth1 = 180; //the old width of product tree div(id:tree)
                        var oldWidth2 = 180; //the old width of close product tree div(id:closeTreeDiv)
                        var searchTextbox = 170;
                        nodeLevel = parseInt(nodeLevel) + 1;
                        if ($("#offeringTree").width() < 340) {
                            for (var i = 0; i < nodeLevel; i++) {
                                oldWidth1 += 50;
                                oldWidth2 += 50;
                                searchTextbox += 50;
                            }
                            $("#offeringTree").width(oldWidth1);
                            $("#closeOfferingTreeDiv").width(oldWidth2);
                            $("#searchOffTrDiv").width(oldWidth2);
                            $("#offTrMatchTextbox").width(searchTextbox);
                            $("#offeringNameList").width(oldWidth2);
                            $("#calculatingDiv").width(oldWidth2);
                        }
                    }

                    //------------------------------------------------------------------------------end--------------------------------------
                    //this if statement will asynbuild all child nodes(to last child node) under the search features, that affect the user experience
                    //so comment it(if and else)
                    //                    if (item.complete) {
                    //                        item.ChildNodes != null && asnybuild(item.ChildNodes, deep, path, ul, item);
                    //                    }
                    //                    else {
                    $(this).addClass("bbit-tree-node-loading");
                    //-----------------------------------------------------------------show loading image-------------------------------
                    $(this).find(".bbit-tree-node-icon").show();
                    //-------------------------------------------------------------------end------------------------------------
                    asnyloadc(item, true, function (data) {
                        var datas = $.parseJSON(data);
                        item.complete = true;
                        item.ChildNodes = datas;
                        if (item.checkstate == 1 && item.Level == 2) {
                            $.each(datas, function (key, val) {
                                var isExist = IsInArrayOff(val.Text, offeringLevel3);
                                if (isExist == -1) {
                                    offeringLevel3.push(val.Text);
                                }
                            });
                            $("#OffLevel3Hidden").val(offeringLevel3.join('^'));
                        }
                        asnybuild(datas, deep, path, ul, item);
                        setupSizeOfTree();
                    });
                    //                    }
                    //                    }
                    if ($(et).hasClass("bbit-tree-elbow-plus")) {
                        $(et).swapClass("bbit-tree-elbow-plus", "bbit-tree-elbow-minus");
                    }
                    else {
                        $(et).swapClass("bbit-tree-elbow-end-plus", "bbit-tree-elbow-end-minus");
                    }
                    $(this).swapClass("bbit-tree-node-collapsed", "bbit-tree-node-expanded");
                }
                //if expended, collapse it
                else if ($(et).hasClass("bbit-tree-elbow-minus") || $(et).hasClass("bbit-tree-elbow-end-minus")) {
                    //--------------------------------------------------------------------------change the width of product tree div--------------------------
                    //added 3/26
                    var nodeLevel = $(this).attr("level");
                    //get the count of nodes under this level
                    nodeLevel = parseInt(nodeLevel);
                    var countOfNodes = $("#offeringTree div[level='" + nodeLevel + "'").next(" ul:visible").length;
                    if (countOfNodes == 1 && nodeLevel < 3) {
                        var oldWidth1 = 180; //the old width of product tree div(id:tree)
                        var oldWidth2 = 180; //the old width of close product tree div(id:closeTreeDiv)
                        var searchTextbox = 170;
                        if (oldWidth1 < 340) {
                            for (var i = 0; i < nodeLevel; i++) {
                                oldWidth1 += 50;
                                oldWidth2 += 50;
                                searchTextbox += 50;
                            }
                        }

                        $("#offeringTree").width(oldWidth1);
                        $("#closeOfferingTreeDiv").width(oldWidth2);
                        $("#searchOffTrDiv").width(oldWidth2);
                        $("#offTrMatchTextbox").width(searchTextbox);
                        $("#offeringNameList").width(oldWidth2);
                        $("#calculatingDiv").width(oldWidth2);
                    }

                    var deep = path.split(".").length;

                    $(this).next().hide();
                    if ($(et).hasClass("bbit-tree-elbow-minus")) {
                        $(et).swapClass("bbit-tree-elbow-minus", "bbit-tree-elbow-plus");
                    }
                    else {
                        $(et).swapClass("bbit-tree-elbow-end-minus", "bbit-tree-elbow-end-plus");
                    }
                    $(this).swapClass("bbit-tree-node-expanded", "bbit-tree-node-collapsed");
                    setupSizeOfTree();
                }
                else if ($(et).hasClass("bbit-tree-node-cb") || $(et).hasClass("bbit-tree-node-span") || et.tagName == "FONT") // click on checkbox
                {

                    //if the checkbox's level 2, get/remove its next nodes' values
                    if (nodeLevel == 2) {
                        if (item.checkstate == 0) {
                            asnyloadc(item, true, function (data) {
                                var datas = $.parseJSON(data);
                                $.each(datas, function (key, val) {
                                    var isExist = IsInArrayOff(val.Text, offeringLevel3);
                                    if (isExist == -1) {
                                        offeringLevel3.push(val.Text);
                                    }
                                });
                                $("#OffLevel3Hidden").val(offeringLevel3.join('^'));
                            });
                        }
                        if (item.checkstate == 1) {
                            asnyloadc(item, true, function (data) {
                                var datas = $.parseJSON(data);
                                $.each(datas, function (key, val) {
                                    var isExist = IsInArrayOff(val.Text, offeringLevel3);
                                    if (isExist > -1) {
                                        offeringLevel3.splice(isExist, 1);
                                    }
                                });
                                $("#OffLevel3Hidden").val(offeringLevel3.join('^'));
                            });
                        }
                    }
                    //if the checkbox's level 2, get/remove its next nodes' values
                    if (nodeLevel == 1) {
                        if (item.checkstate == 0) {
                            asnyloadc(item, true, function (data) {
                                var datas = $.parseJSON(data);
                                $.each(datas, function (key, val) {
                                    var isExist = IsInArrayOff(val.Text, offeringLevel2);
                                    if (isExist == -1) {
                                        offeringLevel2.push(val.Text);
                                    }
                                });
                                $("#OffLevel2Hidden").val(offeringLevel2.join('^'));
                            });

                            LoadLevel3ByLevel1(item.Text, "push");
                        }
                        if (item.checkstate == 1) {
                            asnyloadc(item, true, function (data) {
                                var datas = $.parseJSON(data);
                                $.each(datas, function (key, val) {
                                    var isExist = IsInArrayOff(val.Text, offeringLevel2);
                                    if (isExist > -1) {
                                        offeringLevel2.splice(isExist, 1);
                                    }
                                });
                                $("#OffLevel2Hidden").val(offeringLevel2.join('^'));
                            });
                             LoadLevel3ByLevel1(item.Text, "slice");
                            
                        }
                    }

                    //---disable the ok button when the onclick event of checkbox is executing
                    $("#OffTreeConfirmSelect").attr("disabled", "disabled");
                    $("#txtOfferingTree").attr("value", "calculating items");
                    //--end

                    //get the position of product tree div
                    var position = $("#offeringTree").position();
                    var heightOfcalculatingDiv = $("#closeOfferingTreeDiv").height();
                    $("#calculatingDiv").height(heightOfcalculatingDiv + 28);
                    //set the position of calculatingDiv and DisableProductTreeDiv
                    $("#calculatingDiv").css("left", position.left);
                    $("#calculatingDiv").css("top", position.top);

                    $("#calculatingDiv").show();
                    //$("#DisableProductTreeDiv").show();
                    //--------------------------------------------Is Checkbox for level 3 or 4-------------------------------------------
                    var productLevel5Name
                    var productLevel4Name
                    var productLevel3Name
                    var productLevel2Name
                    var productLevel1Name
                    var checkAction = item.checkstate != 1 ? 1 : 0
                    if (item["Level"] == 5) {
                        productLevel5Name = item["Text"];
                        productLevel4Name = item["parent"]["Text"];
                        productLevel3Name = item["parent"]["parent"]["Text"];
                        productLevel2Name = item["parent"]["parent"]["parent"]["Text"];
                        productLevel1Name = item["parent"]["parent"]["parent"]["parent"]["Text"];
                    }
                    if (item["Level"] == 4) {
                        productLevel4Name = item["Text"];
                        productLevel3Name = item["parent"]["Text"];
                        productLevel2Name = item["parent"]["parent"]["Text"];
                        productLevel1Name = item["parent"]["parent"]["parent"]["Text"];
                        productLevel5Name = "";
                    }
                    if (item["Level"] == 3) {
                        productLevel3Name = item["Text"];
                        productLevel2Name = item["parent"]["Text"];
                        productLevel1Name = item["parent"]["parent"]["Text"];
                        productLevel4Name = "";
                        productLevel5Name = "";
                    }
                    if (item["Level"] == 2) {
                        productLevel2Name = item["Text"];
                        productLevel1Name = item["parent"]["Text"];
                        productLevel3Name = "";
                        productLevel4Name = "";
                        productLevel5Name = "";
                    }
                    if (item["Level"] == 1) {
                        productLevel1Name = item["Text"];
                        productLevel2Name = "";
                        productLevel3Name = "";
                        productLevel4Name = "";
                        productLevel5Name = "";
                    }
                    //if (item.Level == 3 || item.Level == 4 || item.Level == 2) {

                    var postUrl = window.location.protocol + "//" + window.location.host + pathDir + "/GetLeafsOfProductTree.srv";
                    $.post(postUrl, { TreeType: "offeringtree", IsCheckbox: true, PL1Name: productLevel1Name, PL2Name: productLevel2Name, PL3Name: productLevel3Name, PL4Name: productLevel4Name, PL5Name: productLevel5Name, Level: item.Level }, function (data1) {
                        var getData = $.parseJSON(data1);

                        //                        $.each(getData, function (key, val) {
                        //                            offeringselectedProducts = val.LeafsId;
                        //                            offeringSelectedItems = val.Leafs;
                        //                        });
                        //                        $("#txtOfferingTree").attr("value", "Selected " + offeringSelectedItems + " item(s)");
                        //                        $("#txtOfferingTreeHidden").attr("value", offeringselectedProducts);
                        //                        $("#OffTreeConfirmSelect").removeAttr("disabled");
                        //                        $("#calculatingDiv").hide();
                        //                        
                        if (item.checkstate == 1) {
                            var productsArray = offeringselectedProducts.split(",");
                            $.each(getData, function (key, val) {

                                var existInArray = $.inArray(val.LeafsId, productsArray);
                                if (existInArray == -1) {
                                    offeringselectedProducts += val.LeafsId + ",";
                                }
                            });
                            var productLeafs = offeringselectedProducts.substring(0, offeringselectedProducts.length - 1);
                            var offeringSelectedItems = productLeafs.split(",").length;
                            if (offeringselectedProducts == '') {
                                offeringSelectedItems = 0;
                                $("#txtOfferingTree").attr("value", "Selected all item");
                            }
                            else {
                                offeringSelectedItems = productLeafs.split(",").length;
                                $("#txtOfferingTree").attr("value", "Selected " + offeringSelectedItems + " items");
                            }


                            $("#txtOfferingTreeHidden").attr("value", offeringselectedProducts);
                            $("#OffTreeConfirmSelect").removeAttr("disabled");
                            $("#calculatingDiv").hide();
                            //$("#DisableProductTreeDiv").hide();
                        }
                        if (item.checkstate == 0) {
                            offeringselectedProducts = offeringselectedProducts.substring(0, offeringselectedProducts.length - 1);
                            var productsArray = offeringselectedProducts.split(",");

                            $.each(getData, function (key, val) {
                                var existInArray = $.inArray(val.LeafsId, productsArray);
                                if (existInArray > -1) {
                                    productsArray.splice(existInArray, 1);
                                }

                            });
                            if (productsArray.length == 0) {
                                offeringselectedProducts = "";
                            }
                            else {
                                offeringselectedProducts = productsArray.join(",");

                                offeringselectedProducts += ",";
                            }
                            var productLeafs = offeringselectedProducts.substring(0, offeringselectedProducts.length - 1);
                            var offeringSelectedItems = productLeafs.split(",").length;
                            if (offeringselectedProducts == '') {
                                offeringSelectedItems = 0;
                                $("#txtOfferingTree").attr("value", "Selected all item");
                            }
                            else {
                                offeringSelectedItems = productLeafs.split(",").length;
                                $("#txtOfferingTree").attr("value", "Selected " + offeringSelectedItems + " items");
                            }
                            $("#txtOfferingTreeHidden").attr("value", offeringselectedProducts);
                            $("#OffTreeConfirmSelect").removeAttr("disabled");
                            $("#calculatingDiv").hide();
                            //$("#DisableProductTreeDiv").hide();
                        }
                    });

                    var s = item.checkstate != 1 ? 1 : 0;
                    var r = true;
                    if (dfop.oncheckboxclick) {
                        r = dfop.oncheckboxclick.call(et, item, s);
                        //------------------------------------------
                        asnyloadc(item, true, function (data) {
                            var datas = $.parseJSON(data);
                            item.complete = true;
                            item.ChildNodes = datas;
                            asnybuild(datas, deep, path, ul, item);
                        });
                        //------------------------------------------------------
                    }
                    if (r != false) {
                        if (dfop.cascadecheck) {
                            cascade(check, item, s);
                            bubble(check, item, s);
                        }
                        else {
                            check(item, s, 1);
                        }
                    }
                }
            }

            else {
                if (dfop.citem) {
                    var nid = dfop.citem.id;
                    $("#" + id + "_" + nid).removeClass("bbit-tree-selected");
                }
                dfop.citem = item;
                $(this).addClass("bbit-tree-selected");
                if (dfop.onnodeclick) {
                    if (!item.expand) {
                        item.expand = function () { expandnode.call(item); };
                    }
                    dfop.onnodeclick.call(this, item);
                }
            }
        }
        function expandnode() {
            var item = this;
            //var nid = item.id.replace(/[^\w]/gi, "_");
            var nid = item.id;
            var img = $("#" + id + "_" + nid + " img.bbit-tree-ec-icon");
            if (img.length > 0) {
                img.click();
            }
        }

        //load nodes' name of level 3 by level1's value
        function LoadLevel3ByLevel1(level1, action) {
            var requestUrl = window.location.protocol + "//" + window.location.host + pathDir + "/GetOfferingLevel3ByLevel1.srv";
            $.ajax({
                url: requestUrl,
                type: "GET",
                data: "Level1="+level1,
                dataType: "text",
                success: function (data) {
                    var result = data.split("^");
                    if (action == "push") {
                        $.each(result, function (key, val) {
                            var isExist = IsInArrayOff(val, offeringLevel3);
                            if (isExist == -1) {
                                offeringLevel3.push(val);
                            }
                        });
                        $("#OffLevel3Hidden").val(offeringLevel3.join('^'));
                    }
                    if (action == "slice") {
                        $.each(result, function (key, val) {
                            var isExist = IsInArrayOff(val, offeringLevel3);
                            if (isExist > -1) {
                                offeringLevel3.splice(isExist, 1);
                            }
                        });
                        $("#OffLevel3Hidden").val(offeringLevel3.join('^'));
                    }
                }
            });

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

        function asnybuild(nodes, deep, path, ul, pnode) {
            var l = nodes.length;
            if (l > 0) {
                var ht = [];
                var i = 0;
                $.each(nodes, function (key, val) {
                    val.parent = pnode;
                    buildnode(val, ht, deep, path + "." + i, i == l - 1);
                    i += 1;
                });
                //                for (var i = 0; i < l; i++) {
                //                    nodes[i].parent = pnode;
                //                    buildnode(nodes[i], ht, deep, path + "." + i, i == l - 1);
                //                }
                ul.html(ht.join(""));
                ht = null;
                InitEvent(ul);

                //-------------------------------------------------------------------------------dynamicly change the height of product tree---------------
                //                var oldHeight1 = 180; //the old height of product tree div(id:tree)
                //                var oldHeight2 = 200; //the old height of close product tree div(id:closeTreeDiv)
                //                //var count = $(".bbit-tree-node-ct:visible li").get().length;
                //                var height = $("#offeringTree").height();
                //                if (treeNodesCount > 30) {
                //                    var decreaseCount = 20;  //30 nodes is the max number of product tree container, initialy, the product tree container includes 10
                //                    for (var i = 0; i < decreaseCount; i++) {
                //                        oldHeight1 += 18;
                //                        oldHeight2 += 18;
                //                    }
                //                }
                //                else {
                //                    var decreaseCount = treeNodesCount - 10;
                //                    for (var i = 0; i < decreaseCount; i++) {
                //                        oldHeight1 += 18;
                //                        oldHeight2 += 18;
                //                    }
                //                }
                //                //set the new height for product tree div
                //                $("#offeringTree").height(oldHeight1);
                //                $("#closeOfferingTreeDiv").height(oldHeight2);
                //                $("#calculatingDiv").height(oldHeight2 + 28);
                //                //$("#calculatingDiv").css("line-height", oldHeight2 + 28);
                //                $("#calculatingPar").css("margin-top", ((oldHeight2 + 28 - 72) / 2));

                //------------------------------------------------------------------------------------------------------------end-------------------------------
            }
            ul.addClass("bbit-tree-node-ct").css({ "z-index": 0, position: "static", visibility: "visible", top: "auto", left: "auto", display: "" });
            ul.prev().removeClass("bbit-tree-node-loading");
        }
        function asnyloadc(pnode, isAsync, callback) {
            var productLevel4Name
            var productLevel3Name
            var productLevel2Name
            var productLevel1Name
            var level = 0;
            if (dfop.url) {
                if (pnode["Level"] == 4) {
                    productLevel4Name = pnode["Text"];
                    productLevel3Name = pnode["parent"]["Text"];
                    productLevel2Name = pnode["parent"]["parent"]["Text"];
                    productLevel1Name = pnode["parent"]["parent"]["parent"]["Text"];
                    level = 4;
                }
                if (pnode["Level"] == 3) {
                    productLevel3Name = pnode["Text"];
                    productLevel2Name = pnode["parent"]["Text"];
                    productLevel1Name = pnode["parent"]["parent"]["Text"];
                    productLevel4Name = "";
                    level = 3;
                }
                if (pnode["Level"] == 2) {
                    productLevel2Name = pnode["Text"];
                    productLevel1Name = pnode["parent"]["Text"];
                    productLevel3Name = "";
                    productLevel4Name = "";

                    level = 2;
                }
                if (pnode["Level"] == 1) {
                    productLevel1Name = pnode["Text"];
                    productLevel2Name = "";
                    productLevel3Name = "";
                    productLevel4Name = "";

                    level = 1;
                }
                if (pnode["Level"] == 0) {
                    productLevel1Name = "";
                    productLevel2Name = "";
                    productLevel3Name = "";
                    productLevel4Name = "";
                    level = 0;
                }
                $.post(dfop.url, { IsCheckbox: false, PL1Name: productLevel1Name, PL2Name: productLevel2Name, PL3Name: productLevel3Name, PL4Name: productLevel4Name, Level: level, IsChecked: pnode["checkstate"] }, callback);
                //--------------------------------------------------------added:  IsChecked: pnode["checkstate"]-------------------------------------------
                //                if (pnode && pnode != null)
                //                    var param = builparam(pnode);
                //                $.ajax({
                //                    type: dfop.method,
                //                    url: dfop.url,
                //                    parent: param,
                //                    async: isAsync,
                //                    dataType: dfop.datatype,
                //                    success: callback,
                //                    error: function (e) { alert("error occur!"); }
                //                });
            }
        }
        function builparam(node) {
            var p = [{ name: "id", value: encodeURIComponent(node.id) }
                    , { name: "text", value: encodeURIComponent(node.text) }
                    , { name: "value", value: encodeURIComponent(node.value) }
                    , { name: "parent", value: "All" }
                    , { name: "parentLevel", value: "0" }
                    , { name: "value", value: encodeURIComponent(node.value) }
                    , { name: "checkstate", value: node.checkstate}];
            return p;
        }
        function bindevent() {
            $(this).hover(function () {
                $(this).addClass("bbit-tree-node-over");
            }, function () {
                $(this).removeClass("bbit-tree-node-over");
            }).click(nodeclick)
             .find("img.bbit-tree-ec-icon").each(function (e) {
                 if (!$(this).hasClass("bbit-tree-elbow")) {
                     $(this).hover(function () {
                         $(this).parent().addClass("bbit-tree-ec-over");
                     }, function () {
                         $(this).parent().removeClass("bbit-tree-ec-over");
                     });
                 }
             });
        }
        function InitEvent(parent) {
            var nodes = $("li.bbit-tree-node>div", parent);
            nodes.each(bindevent);
        }
        function reflash(itemId) {
            //            var nid = itemId.replace(/[^\w-]/gi, "_");
            var nid = itemId;
            var node = $("#" + id + "_" + nid);
            if (node.length > 0) {
                node.addClass("bbit-tree-node-loading");
                var isend = node.hasClass("bbit-tree-elbow-end") || node.hasClass("bbit-tree-elbow-end-plus") || node.hasClass("bbit-tree-elbow-end-minus");
                var path = node.attr("tpath");
                var deep = path.split(".").length;
                var item = getItem(path);
                if (item) {
                    asnyloadc(item, true, function (data) {
                        item.complete = true;
                        item.ChildNodes = data;
                        item.isexpand = true;
                        if (data && data.length > 0) {
                            item.hasChildren = true;
                        }
                        else {
                            item.hasChildren = false;
                        }
                        var ht = [];
                        buildnode(item, ht, deep - 1, path, isend);
                        ht.shift();
                        ht.pop();
                        var li = node.parent();
                        li.html(ht.join(""));
                        ht = null;
                        InitEvent(li);
                        bindevent.call(li.find(">div"));
                    });
                }
            }
            else {
                //node not created yet
            }
        }
        String.prototype.replaceString = function (s1, s2) {
            this.str = this;
            if (s1.length == 0) return this.str;
            var idx = this.str.indexOf(s1);
            while (idx >= 0) {
                this.str = this.str.substring(0, idx) + s2 + this.str.substr(idx + s1.length);
                idx = this.str.indexOf(s1);
            }
            return this.str;
        }

        function getck(items, c, fn) {
            for (var i = 0, l = items.length; i < l; i++) {
                (items[i].showcheck == true && items[i].checkstate == 1) && c.push(fn(items[i]));
                if (items[i].ChildNodes != null && items[i].ChildNodes.length > 0) {
                    getck(items[i].ChildNodes, c, fn);
                }
            }
        }
        function getCkAndHalfCk(items, c, fn) {
            for (var i = 0, l = items.length; i < l; i++) {
                (items[i].showcheck == true && (items[i].checkstate == 1 || items[i].checkstate == 2)) && c.push(fn(items[i]));
                if (items[i].ChildNodes != null && items[i].ChildNodes.length > 0) {
                    getCkAndHalfCk(items[i].ChildNodes, c, fn);
                }
            }
        }
        me[0].t = {
            getSelectedNodes: function (gethalfchecknode) {
                var s = [];
                if (gethalfchecknode) {
                    getCkAndHalfCk(treenodes, s, function (item) { return item; });
                }
                else {
                    getck(treenodes, s, function (item) { return item; });
                }
                return s;
            },
            getSelectedValues: function () {
                var s = [];
                getck(treenodes, s, function (item) { return item.value; });
                return s;
            },
            getCurrentItem: function () {
                return dfop.citem;
            },
            reflash: function (itemOrItemId) {
                var id;
                if (typeof (itemOrItemId) == "string") {
                    id = itemOrItemId;
                }
                else {
                    id = itemOrItemId.id;
                }
                reflash(id);
            }
        };
        return me;
    };
    //get all checked nodes, and put them into array. no hierarchy
    $.fn.getCheckedNodes = function () {
        if (this[0].t) {
            return this[0].t.getSelectedValues();
        }
        return null;
    };
    $.fn.getTSNs = function (gethalfchecknode) {
        if (this[0].t) {
            return this[0].t.getSelectedNodes(gethalfchecknode);
        }
        return null;
    };
    $.fn.getCurrentNode = function () {
        if (this[0].t) {
            return this[0].t.getCurrentItem();
        }
        return null;
    };
    $.fn.reflash = function (ItemOrItemId) {
        if (this[0].t) {
            return this[0].t.reflash(ItemOrItemId);
        }
    };

})(jQuery);