/**
* @description {Class} wdTree
* This is the main class of wdTree.
*/
(function ($) {

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
    $.fn.treeview1 = function (settings) {
        var dfop01 =
            {
                method: "POST",
                datatype: "json",
                /**
                * @description {Config} url01  
                * {String} url01 for child nodes retrieving. im
                */
                url01: false,
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
                * @description {Config} data01  
                * {Object} Tree theme. Three themes provided. 'bbit-tree-lines' ,'bbit-tree-no-lines' and 'bbit-tree-arrows'.
                * @sample 
                * data01:[{
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
                data01: null,
                /**
                * {String} Whether to toggle node when node clicked. 
                */
                clicktoggle: true,
                /**
                * {String} Tree theme. Three themes provided. 'bbit-tree-lines' ,'bbit-tree-no-lines' and 'bbit-tree-arrows'. 
                */
                theme: "bbit-tree-lines" //bbit-tree-lines ,bbit-tree-no-lines,bbit-tree-arrows
            };
        var me01 = $(this);

        $.extend(dfop01, settings);
        var treenodes01 = dfop01.data01;
        //allNodes = dfop01.data01;
        var id = me01.attr("id");   //---------------------------------------------------------------node-1
        if (id == null || id == "") {
            id = "bbtree" + new Date().getTime();
            me01.attr("id", id);
        }


        var html = [];
        buildtree(dfop01.data01, html);
        me01.addClass("bbit-tree").html(html.join(""));
        InitEvent(me01);
        //if identifier01 is true, it's async tree, expland the root node(all)
       // if (identifier01) {
            $("#supportTopicTree_All .bbit-tree-ec-icon").click();
       // }
        html = null;
        //pre load the icons
        if (dfop01.showcheck) {
            for (var i = 0; i < 3; i++) {
                var im = new Image();
                im.src = dfop01.cbiconpath + dfop01.icons[i];
            }
        }

        //region 
        function buildtree(data, ht) {
            ht.push("<div class='bbit-tree-bwrap'>"); // Wrap ;
            ht.push("<div class='bbit-tree-body'>"); // body ;
            ht.push("<ul class='bbit-tree-root ", dfop01.theme, "'>"); //root   --------------------------------------theme:bbit-tree-arrows
            if (data && data.length > 0) {
                var l = data.length;
                for (var i = 0; i < l; i++) {
                    buildnode(data[i], ht, 0, i, i == l - 1);         //------------------data[i]:childnodes     ht:html,   0,  (0-2), (2)
                }
                treenodes01 = data;
                dfop01.data01 = data;
            }
            else {                                                  //can be commented
                asnyloadc(null, false, function (data) {
                    if (data && data.length > 0) {
                        treenodes01 = data;
                        dfop01.data01 = data;
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


            //create a level attribute for each node   
            //added 3/26
            //identifier is used to recognize whether it's search tree or async tree
            var level = deep;

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
                ht.push("<img class='bbit-tree-icon' src='" + dfop01.cbiconpath + "s.gif'/>");
            }
            else if (deep > 1) {
                ht.push("<img class='bbit-tree-icon' src='" + dfop01.cbiconpath + "s.gif'/>");
                for (var j = 1; j < deep; j++) {
                    ht.push("<img class='bbit-tree-elbow-line' src='" + dfop01.cbiconpath + "/s.gif'/>");
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
            ht.push("<img class='bbit-tree-ec-icon ", cs.join(" "), "' src='" + dfop01.cbiconpath + "s.gif'/>");
            //ht.push("<img class='bbit-tree-node-icon' src='" + dfop01.cbiconpath + "s.gif'/>");  //edit:delete folder icons
            //----------------------------------------------------------------------for loading.gif--------------------------------------------------------------
            ht.push("<img class='bbit-tree-node-icon' src='" + dfop01.cbiconpath + "s.gif'/>"); //edit:hide the folder icons &&loading image when plus is clicked


            //------------------------------------------------------highlight supTopMatchString--------------------------------------
            //if the text of node includes the value of search textbox of product tree, hightlight this part
            var reg = new RegExp(supTopMatchString, "i");
            var hightLightValue = nd.Text.match(reg);
            var noHightLightValue = "";
            var nodeText = "";
            if (!hightLightValue == null || !hightLightValue == "") {
                var startIndex = nd.Text.toLocaleLowerCase().indexOf(supTopMatchString.toLocaleLowerCase());
                //startIndex=0:the supTopMatchString is at the begining
                if (startIndex == 0) {
                    noHightLightValue = nd.Text.substr(supTopMatchString.length);
                    nodeText = "<font style=';font-weight:bold'>" + hightLightValue + "</font>" + noHightLightValue;
                }
                //evaluate whether the match string occurs at the end
                else if (startIndex == nd.Text.length - supTopMatchString.length) {
                    noHightLightValue = nd.Text.substring(0, startIndex);
                    nodeText = noHightLightValue + "<font style=';font-weight:bold'>" + hightLightValue + "</font>";
                }
                //the supTopMatchString occurs at the middle
                else {
                    var startValue = nd.Text.substring(0, startIndex);
                    var endValue = nd.Text.substr(startIndex + supTopMatchString.length);
                    nodeText = startValue + "<font style=';font-weight:bold'>" + hightLightValue + "</font>" + endValue;
                }

            }
            else {
                nodeText = nd.Text;
            }
            //------------------------------------------------------------------end---------------------------------------------

            //checkbox
            if (dfop01.showcheck && nd.showcheck) {
                if (nd.checkstate == null || nd.checkstate == undefined) {
                    nd.checkstate = 0;
                }
                ht.push("<img  id='", id, "_", nid, "_cb' class='bbit-tree-node-cb' src='", dfop01.cbiconpath, dfop01.icons[nd.checkstate], "'/>");
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
            var t = treenodes01;
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
                    et.attr("src", dfop01.cbiconpath + dfop01.icons[item.checkstate]);
                }
            }
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
                    //this if statement will asynbuild all child nodes(to last child node) under the search features, that affect the user experience
                    //so comment it(if and else)
                    //if (item.complete) {
                    //    item.ChildNodes != null && asnybuild(item.ChildNodes, deep, path, ul, item);
                    //}
                    //else {
                        $(this).addClass("bbit-tree-node-loading");
                        //-----------------------------------------------------------------show loading image-------------------------------
                        $(this).find(".bbit-tree-node-icon").show();
                        //-------------------------------------------------------------------end------------------------------------
                        asnyloadc(item, true, function (data) {
                            var datas = $.parseJSON(data);
                            item.complete = true;
                            item.ChildNodes = datas;
                            asnybuild(datas, deep, path, ul, item);
                        });
                    //}
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
                    var deep = path.split(".").length;

                    $(this).next().hide();
                    if ($(et).hasClass("bbit-tree-elbow-minus")) {
                        $(et).swapClass("bbit-tree-elbow-minus", "bbit-tree-elbow-plus");
                    }
                    else {
                        $(et).swapClass("bbit-tree-elbow-end-minus", "bbit-tree-elbow-end-plus");
                    }
                    $(this).swapClass("bbit-tree-node-expanded", "bbit-tree-node-collapsed");
                }
                else if ($(et).hasClass("bbit-tree-node-cb")) // click on checkbox
                {
                }
            }

            else {
                if (dfop01.citem) {
                    var nid = dfop01.citem.id;
                    $("#" + id + "_" + nid).removeClass("bbit-tree-selected");
                }
                dfop01.citem = item;
                $(this).addClass("bbit-tree-selected");
                if (dfop01.onnodeclick) {
                    if (!item.expand) {
                        item.expand = function () { expandnode.call(item); };
                    }
                    dfop01.onnodeclick.call(this, item);
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

            }
            ul.addClass("bbit-tree-node-ct").css({ "z-index": 0, position: "static", visibility: "visible", top: "auto", left: "auto", display: "" });
            ul.prev().removeClass("bbit-tree-node-loading");
        }
        function asnyloadc(pnode, isAsync, callback) {
            var productLevel2Name
            var productLevel1Name
            var level = 0;
            if (dfop01.url01) {
                if (pnode["Level"] == 2) {
                    productLevel2Name = pnode["Text"];
                    productLevel1Name = pnode["parent"]["Text"];
                    level = 2;
                }
                if (pnode["Level"] == 1) {
                    productLevel1Name = pnode["Text"];
                    productLevel2Name = "";
                    level = 1;
                }
                if (pnode["Level"] == 0) {
                    productLevel1Name = "";
                    productLevel2Name = "";
                    level = 0;
                }
                $.post(dfop01.url01, { IsCheckbox: false, PL1Name: productLevel1Name, PL2Name: productLevel2Name, Level: level }, callback);
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
        return me01;
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