<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DigIt.aspx.cs" Inherits="DigIt_Rel.DigIt" EnableViewStateMac="false" MasterPageFile="~/Digit.Master"%>
<%@ Import namespace="DigIt_Rel.Tools" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    <title>DigIt</title>
    <link type="text/css" rel="stylesheet" href="<%= FileUtility.SetJsVersion(Context,@"Styles/digitC-7a4af7cd80.css") %>" />
    <link href="Styles/TreeMenuCss/digitC-7a4af7cd80.css" rel="stylesheet" type="text/css" />
    <link href="Styles/TreeMenuCss/search.tree.css" rel="stylesheet" type="text/css" />
    <link href="<%= FileUtility.SetJsVersion(Context,@"Styles/tooltips.css") %>" rel="stylesheet" type="text/css" />
    <link href="Styles/jquery.jqplot.css" rel="stylesheet" type="text/css" />
    <link href="Styles/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />
    <link href="Styles/smartpaginator.css" rel="stylesheet" type="text/css" />
    <link href="Styles/jqcloud.css" rel="stylesheet" type="text/css" />

    <script src="Scripts/TreeMenuScript/jquery.js?ver=20130628" type="text/javascript"></script>
    <script src="Scripts/jquery-1.7.2.min.js?ver=20130628" type="text/javascript"></script>
    <script src="Scripts/jquery-ui.min.js?ver=20130628" type="text/javascript"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js" type="text/javascript"></script>
    <script src="http://cdn.jquerytools.org/1.2.7/all/jquery.tools.min.js" type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/TreeMenuScript/Plugins/jquery.newtree.js") %>' type="text/javascript"></script>
    <script src="Scripts/plotScripts/jquery.jqplot.js" type="text/javascript" ></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/tooltips.js") %>' type="text/javascript"></script> 
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/DigIt.js") %>' type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/Common.js") %>' type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/Global.js") %>' type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/jquery.dropdownList.js") %>' type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/jquery.dropdownList2.js") %>' type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/jquery.dropdownList3.js") %>' type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/RuleReport.js") %>' type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/ReportView.js") %>' type="text/javascript"></script>
    <script src="Scripts/Scrollbar.js" type="text/javascript"></script>
    <script src='<%= FileUtility.SetJsVersion(Context,"Scripts/jquery.reveal.js") %>' type="text/javascript"></script>
    <script src="Scripts/jqcloud.js" type="text/javascript"></script>

    <script type="text/javascript" src="Scripts/smartpaginator.js"></script>

    <script type="text/javascript" src="Scripts/html2canvas.js"></script>
    <script type="text/javascript" src="Scripts/jquery.plugin.html2canvas.js"></script>
    
    <script type="text/javascript" src="Scripts/jscrollpaneScript/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="Scripts/jscrollpaneScript/mwheelIntent.js"></script>
    <script type="text/javascript" src="Scripts/jscrollpaneScript/jquery.jscrollpane.js"></script>

    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.categoryAxisRenderer.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.canvasOverlay.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.dragable.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.pointLabels.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.highlighter.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.cursor.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.pieRenderer.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.enhancedLegendRenderer.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.dateAxisRenderer.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.canvasTextRenderer.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.canvasAxisLabelRenderer.min.js"></script>
    <script type="text/javascript" src="Scripts/plotScripts/plugins/jqplot.barRenderer.min.js"></script>

  <script type="text/javascript">

      //global variable for storing the search value of product tree
      var matchString = "";
      var measure = "<%=measure %>";
      var measureType = "<%=measureType %>";
      var benchmarkType = "<%=benchmarkType %>";
      var benchmarkValue = "<%=benchmarkValue %>";
      var scopeType = "<%=scopeType %>";
      var scanRules = "<%=scanRules %>";
      var scanRulesData;
      var hasClickYTD = false;
      var time = "<%=time %>";
      var mtdMonth = "<%=mtdMonth %>";
      var customerRegion = "<%=customerRegion %>";
      var customerRegionLevel = "<%=customerRegionLevel %>";
      var raasCustomerRegion = "<%=raasCustomerRegion %>";
      var raasCustomerRegionLevel = "<%=raasCustomerRegionLevel %>";
      var caseOwnerRegion = "<%=caseOwnerRegion %>";
      var caseOwnerRegionLevel = "<%=caseOwnerRegionLevel %>";
      var product = "<%=product %>";
      var productLevel = "<%=productLevel %>";

      var profitCenters = "<%=profitCenters %>";
      var profitCentersLevel = "<%=profitCentersLevel%>";
      var ownerFunction = "<%=ownerFunction %>";
      var ownerFunctionLevel = "<%=ownerFunctionLevel%>";
      var scopeValue = "<%=scopeValue %>";
      var isRDC = "<%=isRDC%>";
      var generateReport = "<%=generateReport %>";
      var actionFrom = "<%=actionFrom%>";
      var isFromGuidString = "<%=isFromGuid%>";
      var isFromGuid = isFromGuidString == "False" ? false : true;


      var lastupdatetime = new Array();
      var isFunction = true;


      //CPE,UT,IPD,TMPI,SEATS

      <%--     lastupdatetime["<%=updateTime[0][0] %>"] = new Array();
      lastupdatetime["<%=updateTime[0][0] %>"][0] = "<%=updateTime[0][0] %>";
      lastupdatetime["<%=updateTime[0][0] %>"][1] = "<%=updateTime[0][1] %>";
      
      lastupdatetime["<%=updateTime[1][0] %>"] = new Array();
      lastupdatetime["<%=updateTime[1][0] %>"][0] = "<%=updateTime[1][0] %>";
      lastupdatetime["<%=updateTime[1][0] %>"][1] = "<%=updateTime[1][1] %>";
      
      lastupdatetime["<%=updateTime[2][0] %>"] = new Array();
      lastupdatetime["<%=updateTime[2][0] %>"][0] = "<%=updateTime[2][0] %>";
      lastupdatetime["<%=updateTime[2][0] %>"][1] = "<%=updateTime[2][1] %>";

      lastupdatetime["<%=updateTime[3][0] %>"] = new Array();
      lastupdatetime["<%=updateTime[3][0] %>"][0] = "<%=updateTime[3][0] %>";
      lastupdatetime["<%=updateTime[3][0] %>"][1] = "<%=updateTime[3][1] %>";

      lastupdatetime["<%=updateTime[4][0] %>"] = new Array();
      lastupdatetime["<%=updateTime[4][0] %>"][0] = "<%=updateTime[4][0] %>";
      lastupdatetime["<%=updateTime[4][0] %>"][1] = "<%=updateTime[4][1] %>";

      lastupdatetime["<%=updateTime[5][0] %>"] = new Array();
      lastupdatetime["<%=updateTime[5][0] %>"][0] = "<%=updateTime[5][0] %>";
      lastupdatetime["<%=updateTime[5][0] %>"][1] = "<%=updateTime[5][1] %>";

      lastupdatetime["<%=updateTime[6][0] %>"] = new Array();
      lastupdatetime["<%=updateTime[6][0] %>"][0] = "<%=updateTime[6][0] %>";
      lastupdatetime["<%=updateTime[6][0] %>"][1] = "<%=updateTime[6][1] %>";--%>

      <%
      for (var i = 0;i< updateTime.Length; i++)
      {%>
      var temp = "<%=updateTime[i][0] %>";
      if (temp.length > 0) {
          lastupdatetime["<%=updateTime[i][0] %>"] = new Array();
              lastupdatetime["<%=updateTime[i][0] %>"][0] = "<%=updateTime[i][0] %>";
              lastupdatetime["<%=updateTime[i][0] %>"][1] = "<%=updateTime[i][1] %>";
          }
      <%
      }
      %>

      //global variable for storing the search value of support topic tree
      var supTopMatchString = "";

      //if isHide is true, hide the product tree
      var isHide = true;
      //global variable for storing all product tree nodes
      var allNodes = [];
      //global variable for count of tree nodes
      var treeNodesCount = 1;
      //global variable for selected products
      //var selectedProducts = "";

      //identifier:true-->search tree; false:-->async tree
      var identifier = true;
      var profitCenterIsLoading = false;

      //----------for offering tree-----
      //global variable for storing the search value of product tree
      var offeringmatchString = "";
      //if isHide is true, hide the product tree
      var offeringisHide = true;
      //global variable for storing all product tree nodes
      var offeringallNodes = [];
      //global variable for count of tree nodes
      var offeringtreeNodesCount = 1;
      //global variable for selected products
      var offeringselectedProducts = "";
      //-------------end----------------

      //----------for offering tree-----
      //global variable for storing the search value of product tree
      var customerRegionmatchString = "";
      //if isHide is true, hide the product tree
      var customerRegionisHide = true;
      //global variable for storing all product tree nodes
      var customerRegionallNodes = [];
      //global variable for count of tree nodes
      var customerRegiontreeNodesCount = 1;
      //global variable for selected products
      var customerRegionselectedProducts = "";
      //-------------end----------------

      var postUrl = window.location.protocol + "//" + window.location.host + "/GetProductTree.srv";
      var productTree = {
          showcheck: true,
          url: postUrl
      };
      var initialProductTreeNodes = product.split("|");
      productTree.treeHandler = {
          "xmlStringTreeUrl": "GetProductTreeXml.srv",
          "xmlStringTreeType": "ConvertToTreeString",
          "FilterByMatchStringTreeUrl": "FilterProductTreeXmlByMatchString.srv",
          "matchStringTreeUrl": "GetMatchProductsName.srv",
          "matchStringTreeType": "GetMatchProdcutsName",
          "leafTreeUrl": "GetLeafsOfProductTree.srv",
          "Level3ByLevel1Url": "GetProductLevel3ByLevel1.srv",
          "leafTreeType": "producttree",
          "txtDisplayTree": "txtProductTree",
          "initialTreeNodes": initialProductTreeNodes,
          "initialTreeLevel": productLevel,
          "selectedTreeNodes": "",
          "treeName": ""
      };
      function load() {
          productTree.data = [{
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
          $("#productTree").treeview(productTree);
      }

      //for offering tree
      //      var postUrlOfOfferingTree = window.location.protocol + "//" + window.location.host + "/GetOfferingTree.srv";
      //      var offeringTree = { showcheck: true,
      //          url: postUrlOfOfferingTree
      //      };
      //      var initialOfferingTreeNodes = serviceOffering.split(",");
      //      offeringTree.treeHandler = {
      //          "xmlStringTreeUrl": "GetProductTreeXml.srv",
      //          "xmlStringTreeType": "ConvertToOfferingTreeString",
      //          "FilterByMatchStringTreeUrl": "FilterProductTreeXmlByMatchString.srv",
      //          "matchStringTreeUrl": "GetMatchProductsName.srv",
      //          "matchStringTreeType": "GetMatchOfferingName",
      //          "leafTreeUrl": "GetLeafsOfProductTree.srv",
      //          "Level3ByLevel1Url": "GetOfferingLevel3ByLevel1.srv",
      //          "leafTreeType": "offeringtree",
      //          "txtDisplayTree": "txtOfferingTree",
      //          "initialTreeNodes": initialOfferingTreeNodes,
      //          "initialTreeLevel": "1",
      //          "selectedTreeNodes": ""
      //      };
      //      function loadOfferingTree() {
      //          offeringTree.data = [{
      //              "id": "All",
      //              "Text": "All",
      //              "Value": "All",
      //              "showcheck": false,
      //              complete: false,
      //              "isexpand": false,
      //              "checkstate": 0,
      //              "hasChildren": true,
      //              "ChildNodes": null,
      //              "Level": "0"
      //          }];
      //          $("#offeringTree").treeview(offeringTree);
      //      }


      //for customerRegion tree
      var postUrlOfCustomerRegionTree = window.location.protocol + "//" + window.location.host + "/GetCustomerRegionTree.srv";
      var customerRegionTree = {
          showcheck: true,
          url: postUrlOfCustomerRegionTree
      };
      var initialCustomerRegionTreeNodes = customerRegion.split("|");
      customerRegionTree.treeHandler = {
          "xmlStringTreeUrl": "GetProductTreeXml.srv",
          "xmlStringTreeType": "ConvertToGeoTreeString",
          "FilterByMatchStringTreeUrl": "FilterProductTreeXmlByMatchString.srv",
          "matchStringTreeUrl": "GetMatchProductsName.srv",
          "matchStringTreeType": "GetMatchGeoName",
          "leafTreeUrl": "GetLeafsOfProductTree.srv",
          "Level3ByLevel1Url": "GetCustomerRegionLevel3ByLevel1.srv",
          "leafTreeType": "customerRegiontree",
          "txtDisplayTree": "txtCustomerRegionTree",
          "initialTreeNodes": initialCustomerRegionTreeNodes,
          "initialTreeLevel": customerRegionLevel,
          "treeName": "",
          "selectedTreeNodes": ""
      };
      function loadCustomerRegionTree() {
          customerRegionTree.data = [{
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
          $("#customerRegionTree").treeview(customerRegionTree);
      }

      //for raas customerRegion tree
      var postUrlOfTree = window.location.protocol + "//" + window.location.host + "/GetTree.srv";
      var treeHandler = {
          "xmlStringTreeUrl": "GetProductTreeXml.srv",
          "xmlStringTreeType": "ConvertToCustGeoSeatsTreeString",
          "FilterByMatchStringTreeUrl": "FilterProductTreeXmlByMatchString.srv",
          "matchStringTreeUrl": "GetMatchProductsName.srv",
          "matchStringTreeType": "GetMatchTreeName",
          "leafTreeUrl": "GetLeafsOfProductTree.srv",
          "Level3ByLevel1Url": "GetTreeLevel3ByLevel1.srv",
          "leafTreeType": "custgeoraascpetree",
          "txtDisplayTree": "txtRaasCustomerRegionTree",
          "initialTreeNodes": raasCustomerRegion.split("|"),
          "initialTreeLevel": raasCustomerRegionLevel,
          "treeName": "CustGeo_RaasCPE",
          "selectedTreeNodes": ""
      };

      var raasCustomerRegionTree = {
          showcheck: true,
          url: postUrlOfTree
      };
      raasCustomerRegionTree.treeHandler = treeHandler;
      function loadRaasCustomerRegionTree() {
          raasCustomerRegionTree.data = [{
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
          $("#raasCustomerRegionTree").treeview(raasCustomerRegionTree);
      }

      //for customerRegion tree
      var postUrlOfCaseOwnerRegionTree = window.location.protocol + "//" + window.location.host + "/GetCaseOwnerRegionTree.srv";
      var caseownerRegionTree = {
          showcheck: true,
          url: postUrlOfCustomerRegionTree
      };
      var initialCaseOwnerRegionTreeNodes = caseOwnerRegion.split("|");

      caseownerRegionTree.treeHandler = {
          "xmlStringTreeUrl": "GetProductTreeXml.srv",
          "xmlStringTreeType": "ConvertToCaseOwnerTreeString",
          "FilterByMatchStringTreeUrl": "FilterProductTreeXmlByMatchString.srv",
          "matchStringTreeUrl": "GetMatchProductsName.srv",
          "matchStringTreeType": "GetMatchCaseOwnerName",
          "leafTreeUrl": "GetLeafsOfProductTree.srv",
          "Level3ByLevel1Url": "GetCustomerRegionLevel3ByLevel1.srv",
          "leafTreeType": "caseownerRegiontree",
          "txtDisplayTree": "txtCaseOwnerRegionTree",
          "initialTreeNodes": initialCaseOwnerRegionTreeNodes,
          "initialTreeLevel": caseOwnerRegionLevel,
          "treeName": "",
          "selectedTreeNodes": ""
      };
      function loadCaseOwnerRegionTree() {
          caseownerRegionTree.data = [{
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
          $("#caseownerRegionTree").treeview(caseownerRegionTree);
      }

      //for profitCenters tree
      var postUrlOfProfitCentersTree = window.location.protocol + "//" + window.location.host + "/GetProfitCentersTree.srv";
      var profitCentersTree = {
          showcheck: true,
          url: postUrlOfProfitCentersTree
      };
      var initialProfitCentersTreeNodes = profitCenters.split("|");
      profitCentersTree.treeHandler = {
          "xmlStringTreeUrl": "GetProductTreeXml.srv",
          "xmlStringTreeType": "ConvertToProfitCentersTreeString",
          "FilterByMatchStringTreeUrl": "FilterProductTreeXmlByMatchString.srv",
          "matchStringTreeUrl": "GetMatchProductsName.srv",
          "matchStringTreeType": "GetMatchProfitCentersName",
          "leafTreeUrl": "GetLeafsOfProductTree.srv",
          "Level3ByLevel1Url": "GetProfitCentersLevel3ByLevel1.srv",
          "leafTreeType": "profitCenterstree",
          "txtDisplayTree": "txtProfitCentersTree",
          "initialTreeNodes": initialProfitCentersTreeNodes,
          "initialTreeLevel": profitCentersLevel,
          "treeName": "",
          "selectedTreeNodes": ""
      };
      function loadProfitCentersTree() {
          profitCentersTree.data = [{
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
          if (profitCenters.toLowerCase().indexOf("corphq") >= 0 && profitCenters.length == 6) {
              profitCenterIsLoading = false;
              $("#ProfitCentersLevel1Hidden").val(initialProfitCentersTreeNodes.join("^"));
          }
          else {
              $("#profitCentersTree").treeview(profitCentersTree);
              profitCenterIsLoading = true;
          }
          //$("#profitCentersTree").treeview(profitCentersTree);
      }

      //for ownerfunction tree
      var postUrlOfOwnerFunctionTree = window.location.protocol + "//" + window.location.host + "/GetTree.srv";
      var ownerFunctionTree = {
          showcheck: true,
          url: postUrlOfOwnerFunctionTree
      };
      var initialOwnerFunctionTreeNodes = ownerFunction.split("|");
      ownerFunctionTree.treeHandler = {
          "xmlStringTreeUrl": "GetProductTreeXml.srv",
          "xmlStringTreeType": "ConvertToOwnerFunctionTreeString",
          "FilterByMatchStringTreeUrl": "FilterProductTreeXmlByMatchString.srv",
          "matchStringTreeUrl": "GetMatchProductsName.srv",
          "matchStringTreeType": "GetMatchTreeName",
          "leafTreeUrl": "GetLeafsOfProductTree.srv",
          "Level3ByLevel1Url": "GetTreeLevel3ByLevel1.srv",
          "leafTreeType": "ownerFunctiontree",
          "txtDisplayTree": "txtOwnerFunctionTree",
          "initialTreeNodes": initialOwnerFunctionTreeNodes,
          "initialTreeLevel": ownerFunctionLevel,
          "treeName": "OwnerFunction",
          "selectedTreeNodes": ""
      };



      function loadOwnerFunctionTree() {
          ownerFunctionTree.data = [{
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
          /*
          if (ownerFunction.toLowerCase().indexOf("gbs - asg|gbs - c&e|gbs - commercial shared|gbs - dynamics/sms&p|gbs - pfe") >= 0 && initialOwnerFunctionTreeNodes.length == 4) {
              ownerFunctionIsLoading = false;
              identifier = true;
              $("#OwnerFunctionLevel1Hidden").val(initialProfitCentersTreeNodes.join("^"));
          }
          else {
              $("#ownerFunctionTree").treeview(ownerFunctionTree);
              ownerFunctionIsLoading = true;
          }*/
          $("#ownerFunctionTree").treeview(ownerFunctionTree);
      }


      $(document).ready(function () {
          $("#txtProfitCentersTree").text("Selected all Items");
          $("#txtOwnerFunctionTree").text("Selected all Items");
          $(".filterDiv").ajaxStop(function (event) {
              $(".treeLoading").remove();
          });
          $(".txtProductTree").click(function (event) {
              $(".tree").hide();
              if ($(this).parent().hasClass("ProfitCenter") && !profitCenterIsLoading) {
                  identifier = true;
                  $("#profitCentersTree").treeview(profitCentersTree);
                  profitCenterIsLoading = true;
                  $("#ProfitCentersLevel1Hidden").val(initialProfitCentersTreeNodes.join("^"));
              }
              event.stopPropagation();
              $(this).parent().find(".tree").fadeIn();
              $(this).parent().find(".tree .txtSearchBox").focus();
          });
          $(".dropIcon").click(function (event) {
              //$(".tree").hide();
              if ($(this).parent().hasClass("ProfitCenter") && !profitCenterIsLoading) {
                  identifier = true;
                  $("#profitCentersTree").treeview(profitCentersTree);
                  profitCenterIsLoading = true;
                  $("#ProfitCentersLevel1Hidden").val(initialProfitCentersTreeNodes.join("^"));
              }
              event.stopPropagation();
              //$(this).parent().find(".tree").fadeIn();
              if ($(this).hasClass("dropdownicon")) {
                  $(".dropIcon").each(function () {
                      if ($(this).hasClass("dropupicon")) {
                          $(this).parent().find(".tree").slideUp();
                          $(this).parent().find(".CheckBoxList").slideUp();
                          $(this).removeClass("dropupicon").addClass("dropdownicon");
                      }
                  });
                  $(this).parent().find(".tree").slideDown();
                  $(this).parent().find(".CheckBoxList").slideDown();
                  $(this).removeClass("dropdownicon").addClass("dropupicon");

                  var temp = $(this).parent()[0].innerHTML;
                  var action_str = "";
                  /*
                  Measure
                  Customer Geo
                  Product
                  Owner Geo
                  Profit Centers
                  Owner Function
                  */
                  if (temp.indexOf("ScanRule") > 0) {
                      action_str = "Expand the Rules";
                  }
                  else if (temp.indexOf("Scorecard") > 0) {
                      action_str = "Expand the Offerings";
                  }
                  else if (temp.indexOf("Offering") > 0) {
                      action_str = "Expand the Offering";
                  }
                  else if (temp.indexOf("Measure") > 0) {
                      action_str = "Expand the Measure";
                  }
                  else if (temp.indexOf("Customer Geo") > 0) {
                      action_str = "Expand the Customer Geo";
                  }
                  else if (temp.indexOf("Owner Geo") > 0) {
                      action_str = "Expand the Owner Geo";
                  }

                  else if (temp.indexOf("Profit Centers") > 0) {
                      action_str = "Expand the Profit Centers";
                  }
                  else if (temp.indexOf("Owner Function") > 0) {
                      action_str = "Expand the Owner Function";
                  }
                  else if (temp.indexOf("Product") > 0) {
                      action_str = "Expand the Product";
                  }
                  else if (temp.indexOf("Target And Baseline") > 0) {
                      action_str = "Expand the Target And Baseline ";
                  }
                  if (action_str.length > 0) {
                      var actionLog = {
                          Action: action_str,
                          ActionPage: document.URL,
                          Parameters: "",
                          ActionResult: "Success"
                      }

                      StoreActionLog(actionLog);
                  }


              }
              else {
                  $(this).parent().find(".tree").slideUp();
                  $(this).parent().find(".CheckBoxList").slideUp();
                  $(this).removeClass("dropupicon").addClass("dropdownicon");
              }

              $(this).parent().find(".tree .txtSearchBox").focus();
          });
      });
        </script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div id="ScreenShot">
    <img id="ShotImage"/>
</div>
<div class="loading"></div>
<div class="digitMain">
    <div class="filterMain">
    <div class="digitHeader">
        <header class="mainheader">
            <!--
            <img src="Images/New UI/logo.png" class="logoImg" title="Digit"/>
            <span class="headerlogo">Digit</span>
            -->
            <a class='messageLogo' href='Index.aspx' title='Return To Home'><img src='Images/New UI/logo.png' class='logoImg' title='Digit'/><span class='headerlogo' style='float:left'>Digit</span></a>
            <span class="updatetime">Data Last refreshed : <span id="updateDate"></span></span>
            <span class="updatetime"><span id="BuildVersion"><%=buildVersion %></span></span>
            <div class="digitInfo">
                <span class="userinfo"><a href="http://cdp/Home/index" target="_blank" title="CDP Site">CDP</a> Home</span>
                <span class="userinfo"><a href="http://digit/Documents/Digit%20Help%20Doc.MHT" target="_blank" title="Help">Help</a></b></span>
                <span class="userinfo"><a href="https://microsoft.sharepoint.com/teams/AsiaBOM/BusinessIntelligence/_layouts/15/start.aspx#/Cosmos/Digit.aspx" target="_blank" title="Wiki">DIG.IT. Wiki</a></b></span>
                <span class="userinfo"><a href="http://digit/Documents/DigitIntro20141124.PPTX" target="_blank" title="What is DIG.IT.?">What is DIG.IT.?</a></b></span>
                <span class="userinfo">Welcome <b><%=currentUser %></b></span>
                <span id="helpImg" style="display:none;"><img src="Images/help.png" title="help" /></span>
            </div>
        </header>
<div class="filterDiv">
        
        <div class="column">
            <ul>
                <li class="lititle">Measure to analyze:</li>
                <li>
                    <div class="CheckBoxListDiv">
                        <span class="checkBoxSpan">Measure : </span>
                        <span id="txtMeasures"></span><span class="dropIcon dropdownicon"></span>
                        <div id="measures" class="CheckBoxList"></div>
                    </div>
                </li>
                <li>
                    <div class="filterTime">
                        <span class="timeSpan">Time : </span>
                        <span class="radioSpan"><input type="radio" value="YTD" name="timeRadio"/>&nbsp;YTD</span>
                        <span class="radioSpan"><input type="radio" value="MTD" name="timeRadio"/>&nbsp;MTD</span>
                        <div class="timeDetail">
                            <div class="yearTime">
                                <div class="yearDrop">FY14</div>
                                <div class="yearList">
                                <ul>
                                    <li>FY15</li>
                                    <li>FY16</li>
                                </ul>
                            </div>
                            </div>

                            <div class="monthTime">
                                <ul>
                                    <li value="1">Jul</li><li value="2">Aug</li><li value="3">Sep</li><li value="4">Oct</li><li value="5">Nov</li><li value="6" style="margin-right:0px">Dec</li>
                                </ul>
                                <ul>
                                    <li value="7">Jan</li><li value="8">Feb</li><li value="9">Mar</li><li value="10">Apr</li><li value="11">May</li><li value="12" style="margin-right:0px">Jun</li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="column">
            <ul>
                <li class="lititle">Scope:</li>
                <li>
                    <div class="CheckBoxListDiv ViewDiv" style="display:none">
                        <span class="checkBoxSpan">View:</span>
                        <span id="txtView" name="txtView"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="View" class="CheckBoxList"></div> 
                    </div>
                </li>
                <li style="display:none;">
                    <div class="CheckBoxListDiv IsRDCDiv" >
                        <span class="checkBoxSpan">Is RDC:</span>
                        <span id="txtIsRDC"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="isRDC" class="CheckBoxList"></div> 
                    </div>
                </li>
                <li>
                    <div class="CheckBoxListDiv OfferingTreeDiv">
                        <span class="checkBoxSpan">Offering:</span>
                        <span id="txtOffering" name="txtOfferingTree"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="offeringTree" class="CheckBoxList ScopeCheckBoxList"></div> 
                    </div>
                </li>
                <li>
                    <div id="CustomerRegionTreeDiv" class="treeContainer CustGeo">
                        <span class="treeTitle">Customer Geo:</span>
                        <span id="txtCustomerRegionTree" class="txtProductTree"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="customerRegionTree" class="customerRegionTree tree"></div> 
                    </div>
                </li>
                <li>
                    <div id="RaasCustomerRegionTreeDiv" class="treeContainer RaasCustGeo" style="display:none">
                        <span class="treeTitle">Customer Geo:</span>
                        <span id="txtRaasCustomerRegionTree" class="txtProductTree"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="raasCustomerRegionTree" class="raasCustomerRegionTree tree"></div> 
                    </div>
                </li>
                <li>
                    <div id="ProductTreeDiv" style="position:relative;" class="treeContainer Product">
                        <span class="treeTitle">Product:</span>
                        <span id="txtProductTree" class="txtProductTree"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="productTree" class="productTree tree"></div>
                    </div>
                </li>
                <li>
                    <div id="CaseOwnerRegionTreeDiv" class="treeContainer OwnerGeo">
                        <span class="treeTitle">Owner Geo:</span>
                        <span id="txtCaseOwnerRegionTree" class="txtProductTree"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="caseownerRegionTree" class="caseownerRegionTree tree"></div> 
                    </div>
                </li>
                <li>
                    <div id="ProfitCentersTreeDiv" style="position:relative;" class="treeContainer ProfitCenter">
                        <span class="treeTitle">Profit Centers:</span>
                        <span id="txtProfitCentersTree" class="txtProductTree"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="profitCentersTree" class="profitCentersTree tree"></div>
                    </div>
                </li>
                <li>
                    <div id="OwnerFunctionTreeDiv" style="position:relative;" class="treeContainer OwnerFunction">
                        <span class="treeTitle">Owner Function:</span>
                        <span id="txtOwnerFunctionTree" class="txtProductTree"></span>
                        <span class="dropIcon dropdownicon"></span>
                        <div id="ownerFunctionTree" class="ownerFunctionTree tree"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="column collast">
            <ul>
                <li class="lititle">Scan Rules:</li>
                <li>
                    <div class="CheckBoxListDiv">
                        <span id="txtScanRules" class="checkBoxSpan"></span><span class="dropIcon dropdownicon"></span>
                        <div id="rules" class="CheckBoxList"></div>
                    </div>
                    <div class="clear"></div>
                </li>
                <li class="lititle" style="margin-top:40px;" id="txtBenchmkPrompt">Benchmark:</li>
                <li>
                    <div class="CheckBoxListDiv">
                        <span id="txtBenchmark" class="checkBoxSpan"></span><span class="dropIcon dropdownicon"></span>
                        <div id="benchmark" class="CheckBoxList">
                            <ul>
                                <li style="margin-top:10px;">
                                    <input type="radio" value="Target And Baseline" name="benchmarkRadio"/>Target And Baseline
                                </li>
                                <li style="margin:20px auto;">
                                    <input type="radio" value="SpecifyValue" name="benchmarkRadio"/>Specify Your Value:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="specifyValue" style="width:80px;background:#e4f4f6;border:1px solid #aaa"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="column" style="height:1px;clear:both;">

        </div>
        <div class="column">
            <ul>
                <li>
                     <div class="viewReportDiv"><span class="viewReportButton">Analyze</span></div>
                </li>
            </ul>
        </div>
        <div style="clear:both"></div>
        <%--<section class="filtersection">
            <form id="filterform" runat="server">
                <div>
                <table id="detailTable">
                        <tbody>
                            <tr>
                                <td class="tdtitle">Measure to analyze:</td>
                                <td class="tdtitle">Benchmark:</td>
                                <td class="tdtitle">Scan Rules:</td>
                            </tr>
                            <tr>
                                <td class="CheckBoxListDiv" style="width:381px;">
                                <span class="smalllabletd">Measure : </span>
                                     <input id="txtMeasures" type="text" style="width:246px;"/><span class="dropdownicon"></span>
                                    <div id="measures" class="CheckBoxList"></div>
                                </td>
                                <td style="text-align:left;padding-right:5px;"><span class="benchmarkRadio" style="width:315px">Target And Baseline</span></td>
                                <td class="CheckBoxListDiv">
                                    <input id="txtScanRules" type="text" class="bigInput"/><span class="dropdownicon"></span>
                                    <div id="rules" class="CheckBoxList"></div>
                                </td>
                            </tr>
                            <tr>
                                <td class="CheckBoxListDiv">
                                <span class="smalllabletd">Time : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="timeRadio">YTD</span>
                                    <span class="timeRadio">MTD</span>
                                    <input id="txtMTD" name="txtMTD" type="text" value="12" style="width:135px;font-size:17px;margin-top:1px"/><span class="dropdownicon" style="margin-top:1px;"></span>
                                    <div id="mtdMonths" class="CheckBoxList"></div>
                                </td>
                                <td style="text-align:left;">
                                    <span class="benchmarkRadio specifyValueButton">Specify your value</span>
                                    <input id="specifyValue" name="specifyValue" type="text" disabled="disabled"/>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                   <div class = "filter">
                    <table class="filterTable">
                        <tbody>
                            <tr>
                                <td class="smalllabletd" style="font-family:'Segoe UI Semibold Semibold', 'Segoe UI Semibold';font-size:18px;padding:0px 21px 0px 0px">Scope:</td>
                                 <td class="CheckBoxListDiv">
                                    <span class="scopeRadio">Scorecard</span>
                                    <input id="txtScorecard" name="txtScorecard" type="text" style="width:159px;"/>
                                    <span class="dropdownicon" style="margin-top:5px"></span>
                                    <div id="scorecard" class="CheckBoxList ScopeCheckBoxList"></div> 
                                </td>
                               <td class="labletd">Customer Geo:</td>
                                <td id="CustomerRegionTreeDiv" class="treeContainer CustGeo">
                                    <input id="txtCustomerRegionTree" class="txtProductTree" type="text" />
                                    <span class="dropdownicon"></span>
                                    <div id="customerRegionTree" class="customerRegionTree tree"></div> 
                                </td>
                                <td class="biglabletd">Owner Geo:</td>
                                <td id="CaseOwnerRegionTreeDiv" class="treeContainer OwnerGeo">
                                    <input id="txtCaseOwnerRegionTree" type="text" class="txtProductTree" />
                                    <span class="dropdownicon"></span>
                                    <div id="caseownerRegionTree" class="caseownerRegionTree tree"></div> 
                                </td>
                            </tr>
                            <tr>
                                 <td></td>
                                 <td class="CheckBoxListDiv">
                                 <span class="scopeRadio">Offering</span>
                                    <input id="txtOfferingTree" name="txtOfferingTree" type="text" style="width:159px;"/>
                                    <span class="dropdownicon" style="margin-top:5px"></span>
                                    <div id="offeringTree" class="CheckBoxList ScopeCheckBoxList"></div> 
                                </td>
                                <td class="smalllabletd">Product:</td>
                                <td id="ProductTreeDiv" style="position:relative;" class="treeContainer Product">
                                    <input id="txtProductTree" class="txtProductTree" type="text"/>
                                    <span class="dropdownicon"></span>
                                    <div id="productTree" class="productTree tree"></div>
                                </td>
                                <td class="biglabletd">Profit Centers:</td>
                                <td id="ProfitCentersTreeDiv" style="position:relative;" class="treeContainer ProfitCenter">
                                    <input id="txtProfitCentersTree" class="txtProductTree" type="text"/>
                                    <span class="dropdownicon"></span>
                                    <div id="profitCentersTree" class="profitCentersTree tree"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </form>
        </section>--%>
    </div>
    <div style="clear:both"></div>
</div>
<%--    <div class="filterMessage">
          <div class="filterMore" style="display:none;"></div>
          <div id="toggleDiv"><div class="toggleDivDown"></div></div>
      </div>--%>
        </div>
    <div class="filterMore" style="display:none;"></div>
       <setcion id="reportView">
           <%--Idea Comment Column Popup Window --%>
       </setcion>
    <div class="ideaComments" id="ideaComments">
       <span class="arrow-up"></span>
       <textarea id="txtIdeaComment" class="txtIdeaComment">My Comments To This FeedBack...</textarea>
       <input type="button" value="Submit" id="submitIdeaComment" class="submitIdeaComment"/>
       <input type="button" value="Close" id="closeIdeaComment" class="closeIdeaComment"/>
       <div id="ideaCommentTableDiv">
            <table class="ideaCommentTable" id="ideaCommentTable"> 
            </table>
        </div>
        <div id="ideaCommentFooter" class="ideaCommentFooter">          
            <div id="ideaFooter" class="ideaFooter" style="width:295px"></div>
       </div>
       <input type="hidden" id="ideaDerivedId" />
   </div>
     <footer>
        <div id="footer">
            <%--<div id="totop">TOP</div>--%>
        </div>
    </footer>
    
    </div>
    <div id="feedbackDiv">
        <div id="common_box">
	    <div id="suspended"><div id="availableS" class="availableS"></div></div><div>
	    <div id="content">
            <div id="child1" class="child1">
                <textarea id="txtFeedback" class="txtFeendbackNoFocus">Hi, Digit team...</textarea>
                <input type="button" value="Submit" id="sendFeedback"/>

                <div id="feedbackHeader"></div>
                <div id="feedbackFilter">
                    <div class="feedByTime"><span id="feedByTime">Time</span>
                    <input type="radio" id="RAfeedByTime" class="feedbackRadio" name="feedback" checked="checked" value="Time" tag="feedByTime"/></div>
                    <div class="feedByRate"><span id="feedByRate">Rate</span>
                    <input type="radio" id="RAfeedByRate" class="feedbackRadio" name="feedback" value="Rate" tag="feedByRate"/></div>
                </div>
                <div id="feedbackParting"></div>
                <div id="feedbackTableDiv">
                    <table class="feedbackTable"> 

                    </table>
                </div>
                <div id="feedbackFooter">          
                    <div id="paging" style="margin: auto;"></div>
                </div>
            </div>
            <div id="child2">
                <div id="commentHeader"></div>
                <div class="commentBack">
                    <div id="backContent">
                        <div class="triangle-left" id="triangle-left"></div>
                        <div class="triangle-left-core" id="triangle-left-core"></div>
                        <div class="triangle-left-font" id="triangle-left-font"><a>Back</a></div>
                    </div>
                    <div class="commentsTitle">
                        <span class="commentFont"><span id="feedbackusername"></span> said:      </span>
                        <span class="commentTimeFont">(<span id="feedbackdatetime"></span>)</span>
                    </div>
                    <div class="commentsDetails">
                        <table class='itemTable'>
                            <tr>
                                <td height='65px'>
                                    <textarea readonly="readonly" id="feedbackcontent" class="txtCommentTextarea"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="commentsRate">
                         <div class="triangle-up" id="feedbacktriangleup"></div>
                          <div class="voteVolume" id="feedbackvotevolume"></div>
                    </div>
                    <div class="AddComments">
                        <textarea id="txtFeedbackComment" class="txtFeedbackCommentNoFocus">My Comments To This FeedBack...</textarea>
                        <input type="button" value="Submit" id="sendComment"/>
                        <input type="hidden" id="txtFeedbackID" />
                        <input type="hidden" id="txtAlias" />
                    </div>
                    <div class="commentsLine">
                        <span class="lineFont">Other Comments</span>
                        <div class="commentline"></div>
                    </div>
                    <div id="commentTableDiv">
                        <table class="commentTable">

                        </table>
                    </div>
                    <div id="commentFooter">          
                        <div id="pagingComment" style="margin: auto;"></div>
                    </div>
                </div>
            
            </div>
	    </div>
    </div>
    <div id='FeedbackMask'><div class="feedbackMaskFont">Loading Feedback data...</div></div>
    <div id='CommentMask'><div class="commentMaskFont">Loading Comments data...</div></div>
    <div id='FeedbackSucMask'><div class="FeedbackSucMaskFont"></div></div>
    <div id='CommentSucMask'><div class="CommentSucMaskFont"></div></div>
    </div>
    </div>

    <input type="hidden" id="MeasureHidden"/>
    <input type="hidden" id="BenchMarkTypeHidden"/>
    <input type="hidden" id="BenchMarkValueHidden"/>
    <input type="hidden" id="ScanRulesHidden"/>
    <input type="hidden" id="StartDateHidden"/>
    <input type="hidden" id="EndDateHidden"/>
    <input type="hidden" id="QuickDateHidden"/>
    <input type="hidden" id="MTDMonthHidden" />
    <input type="hidden" id="TimeYearHidden" />
    <input type="hidden" id="TimeMonthHidden" />
    <input type="hidden" id="IsRDC" />

    <input type="hidden" id="ProTreeHtmlHidden"/>
    <input type="hidden" id="ProTreeHeightHidden"/>
    <input type="hidden" id="ProTreeWidthHidden"/>
    <input type="hidden" id="ProTreeIDHidden"/>
    <input type="hidden" id="AllProTreeIDHidden"/>
    <input type="hidden" id="ProTreeItemsHidden"/>
    <input type="hidden" id="ProTreeNodesHidden"/>
    <input type="hidden" id="ProTreeCheckedLevelHidden"/>
    <input type="hidden" id="ProLevel1Hidden"/>
    <input type="hidden" id="ProLevel2Hidden"/>
    <input type="hidden" id="ProLevel3Hidden"/>
    <input type="hidden" id="ProLevel4Hidden"/>
    <input type="hidden" id="ProLevel5Hidden"/>

<%--    <input type="hidden" id="OffTreeHtmlHidden"/>
    <input type="hidden" id="OffTreeHeightHidden"/>
    <input type="hidden" id="OffTreeWidthHidden"/>
    <input type="hidden" id="OffTreeIDHidden"/>
    <input type="hidden" id="OffTreeItemsHidden"/>
    <input type="hidden" id="OffTreeNodesHidden"/>
    <input type="hidden" id="OffTreeCheckedLevelHidden"/>
    <input type="hidden" id="OffLevel1Hidden"/>
    <input type="hidden" id="OffLevel2Hidden"/>
    <input type="hidden" id="OffLevel3Hidden"/>--%>
    <input type="hidden" id="ScopeTypeHidden" />
    <input type="hidden" id="ScopeValueHidden" />

    <input type="hidden" id="CusRegTreeHtmlHidden"/>
    <input type="hidden" id="CusRegTreeHeightHidden"/>
    <input type="hidden" id="CusRegTreeWidthHidden"/>
    <input type="hidden" id="CusRegTreeIDHidden"/>
    <input type="hidden" id="AllCusRegTreeIDHidden"/>
    <input type="hidden" id="CusRegTreeItemsHidden"/>
    <input type="hidden" id="CusRegTreeNodesHidden"/>
    <input type="hidden" id="CusRegTreeCheckedLevelHidden"/>
    <input type="hidden" id="CustomerRegionLevel1Hidden"/>
    <input type="hidden" id="CustomerRegionLevel2Hidden"/>
    <input type="hidden" id="CustomerRegionLevel3Hidden"/>
    <input type="hidden" id="CustomerRegionLevel4Hidden"/>
    <input type="hidden" id="CustomerRegionLevel5Hidden"/>

    <input type="hidden" id="CaseOwRegTreeHtmlHidden"/>
    <input type="hidden" id="CaseOwRegTreeHeightHidden"/>
    <input type="hidden" id="CaseOwRegTreeWidthHidden"/>
    <input type="hidden" id="CaseOwRegTreeIDHidden"/>
    <input type="hidden" id="AllCaseOwRegTreeIDHidden"/>
    <input type="hidden" id="CaseOwRegTreeItemsHidden"/>
    <input type="hidden" id="CaseOwRegTreeNodesHidden"/>
    <input type="hidden" id="CaseOwRegTreeCheckedLevelHidden"/>
    <input type="hidden" id="CaseOwnerRegionLevel1Hidden"/>
    <input type="hidden" id="CaseOwnerRegionLevel2Hidden"/>
    <input type="hidden" id="CaseOwnerRegionLevel3Hidden"/>
    <input type="hidden" id="CaseOwnerRegionLevel4Hidden"/>
    <input type="hidden" id="CaseOwnerRegionLevel5Hidden"/>

    <input type="hidden" id="ProfitCentersTreeHtmlHidden"/>
    <input type="hidden" id="ProfitCentersTreeHeightHidden"/>
    <input type="hidden" id="ProfitCentersTreeWidthHidden"/>
    <input type="hidden" id="ProfitCentersTreeIDHidden"/>
    <input type="hidden" id="AllProfitCentersTreeIDHidden"/>
    <input type="hidden" id="ProfitCentersTreeItemsHidden"/>
    <input type="hidden" id="ProfitCentersTreeNodesHidden"/>
    <input type="hidden" id="ProfitCentersTreeCheckedLevelHidden"/>
    <input type="hidden" id="ProfitCentersLevel1Hidden"/>
    <input type="hidden" id="ProfitCentersLevel2Hidden"/>
    <input type="hidden" id="ProfitCentersLevel3Hidden"/>
    <input type="hidden" id="ProfitCentersLevel4Hidden"/>
    <input type="hidden" id="ProfitCentersLevel5Hidden"/>

    <input type="hidden" id="OwnerFunctionTreeHtmlHidden"/>
    <input type="hidden" id="OwnerFunctionTreeHeightHidden"/>
    <input type="hidden" id="OwnerFunctionTreeWidthHidden"/>
    <input type="hidden" id="OwnerFunctionTreeIDHidden"/>
    <input type="hidden" id="AllOwnerFunctionTreeIDHidden"/>
    <input type="hidden" id="OwnerFunctionTreeItemsHidden"/>
    <input type="hidden" id="OwnerFunctionTreeNodesHidden"/>
    <input type="hidden" id="OwnerFunctionTreeCheckedLevelHidden"/>
    <input type="hidden" id="OwnerFunctionLevel1Hidden"/>
    <input type="hidden" id="OwnerFunctionLevel2Hidden"/>
    <input type="hidden" id="OwnerFunctionLevel3Hidden"/>
    <input type="hidden" id="OwnerFunctionLevel4Hidden"/>
    <input type="hidden" id="OwnerFunctionLevel5Hidden"/>

    <input type="hidden" id="ServiceOfferingIDHidden" />
    <input type="hidden" id="ServiceOfferingLevelHidden" />

    <input type="hidden" id="CrossDrillRuleNameHidden" />
    <input type="hidden" id="CrossDrillRuleIDHidden" />
    <input type="hidden" id="CrossDrillRuleLevelHidden" />
    <form id="formExportRawData" action="ExportRawData.aspx" method="post" target="_blank"></form>
</asp:Content>

