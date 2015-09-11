function sortFunction(e,t){for(var a=0,i=0,n=0;n<e.toString().length;n++)a+=e.charCodeAt(n);for(var n=0;n<t.toString().length;n++)i+=t.charCodeAt(n);return a-i}function clearRadioButton(e,t){for(var a=document.getElementById(t),i=0;i<a.length;i++)a[i].name==e&&(document.getElementById(a[i].id).checked=!1,$("#Span"+a[i].id).attr("class",radio_unchecked))}function getHostUrl(){var e=window.location.protocol,t=window.location.host;return e+"//"+t+pathDir}function CloseDetailsBinding(){$("#closeDetails").click(function(){$("#detailsView").html(""),$("#closeDetails").attr("class","triangle-down-click"),$("#detailsView").fadeOut("slow")}),$("#closeDetails").mousedown(function(){$("#closeDetails").attr("class","triangle-down-click")}),$("#closeDetails").mouseup(function(){$("#closeDetails").attr("class","triangle-down")}),$("#closeDetails").mouseover(function(){$("#closeDetails").attr("class","triangle-down-click")}),$("#closeDetails").mouseout(function(){$("#closeDetails").attr("class","triangle-down")})}function ClickScore(e,t){$("#ScoreCardId").val(e),$("#ScoreCardName").val(t),$("#spanScorecard").text(t),$(this).css("font-weight","bold"),$("#orgAccord").load("_OrganizationSelect",{scorecardId:e},successLoadOrg)}function ClickOrg(e,t,a){$("#OrganizationId").val(e),$("#spanOrg").text(a),$("#OrganizationName").val(t),$(this).css("font-weight","bold"),$("#businessAccord").load("_BusinessSelect",{scorecardId:$("#ScoreCardId").val(),organizationId:e},successLoadBusiness),$("#regionAccord").load("_RegionSelect",{organizationId:e},successLoadRegion)}function ClickBusiness(e,t){$("#BusinessUnitId").val(e),$("#BusinessUnitName").val(t),$(this).css("font-weight","bold"),$("#spanBusiness").text(t);var a=$("#ScoreCardId").val(),i=$("#OrganizationId").val(),n=$("#BusinessUnitId").val(),o=$("#RegionId").val();""!=o&&"0"!=o&&($("#lobAccord").load("_LOBSelect",{scorecardId:a,organizationId:i,businessUnitId:n,regionId:o},successLoadLob),$("#lobAccord").css("display","inline"))}function ClickRegion(e,t){$("#RegionId").val(e),$("#RegionName").val(t),$("#spanRegion").text(t),$(this).css("font-weight","bold");var a=$("#ScoreCardId").val(),i=$("#OrganizationId").val(),n=$("#BusinessUnitId").val(),o=$("#RegionId").val();$("#lobAccord").load("_LOBSelect",{scorecardId:a,organizationId:i,businessUnitId:n,regionId:o},successLoadLob),$("#lobAccord").css("display","inline")}function ClickLOB(e){$("#"+e).is(":checked")?$("#"+e).is(":checked")&&(GetCat(),GetLob()):($("#check_all").attr("checked",!1),GetCat(),GetLob());var t=$("#ScoreCardId").val(),a=$("#OrganizationId").val(),i=$("#BusinessUnitId").val(),n=$("#Lob").val(),o=$("#RegionId").val();$("#catAccord").load("_CategorySelect",{scorecardId:t,organizationId:a,businessUnitId:i,regionId:o,lineOfBusinessId:n},successLoadCat),$("#catAccord").css("display","inline")}function ClickCat(e){$("#CategoryId").val(e),$("#"+e).is(":checked")||$("#check_allcat").attr("checked",!1)}function GetLob(){for(var e=document.getElementById("lobAccord"),t="",a=e.getElementsByTagName("input"),i=a.length,n=0;i>n;n++)"checkbox"===a[n].type&&a[n].checked&&a[n].name.match("^lobCheck")&&(t+=a[n].name.split("_")[1]+",");""!=t&&(document.getElementById("Lob").value=t.substring(0,t.length-1))}function GetCat(){for(var e=document.getElementById("catAccord"),t="",a=e.getElementsByTagName("input"),i=a.length,n=0;i>n;n++)"checkbox"===a[n].type&&a[n].checked&&a[n].name.match("^catCheck")&&(t+=a[n].name.split("_")[1]+",");""!=t&&(document.getElementById("Category").value=t.substring(0,t.length-1))}function Validate(){var e=!0,t="";return(""==$("#ScoreCardId").val()||"0"==$("#ScoreCardId").val())&&(t+="Please Select Scorecard Id\n",e=!1),""==$("#OrganizationId").val()&&(t+="Please Select Organization Id\n",e=!1),""==$("#BusinessUnitId").val()&&(t+="Please Select Business Unit Id\n",e=!1),""==$("#RegionId").val()&&(t+="Please Select Region Id\n",e=!1),""==$("#Lob").val()&&(t+="Please Select Lob Checkbox\n",e=!1),""==$("#Category").val()&&(t+="Please Select Category Checkbox\n",e=!1),""==$("#Year").val()&&(t+="Please Select Year\n",e=!1),(""==$("#Month").val()||"0"==$("#Month").val())&&(t+="Please Select Month\n",e=!1),0==e&&alert(t),e}function Prev(){var e=$("label[for=Year]").html(),t=parseInt(e)-1;$("label[for=Year]").html(t),document.getElementById("Year").value=$("label[for=Year]").html()}function Next(){var e=$("label[for=Year]").html(),t=parseInt(e)+1;$("label[for=Year]").html(t),document.getElementById("Year").value=$("label[for=Year]").html()}function ClickMonth(e){document.getElementById("Year").value=$("label[for=Year]").html(),document.getElementById("Month").value=e}function LevelClick(e){if(null!=$("#showContent"+e))if($("#showContent"+e).is(":visible")){var t=$("#expandcol"+e).attr("src");""!=t&&void 0!=t&&(t=t.replace("collapse-green.gif","expand-green.gif"),$("#expandcol"+e).attr("src",t),$("#showContent"+e).slideUp())}else{var t=$("#expandcol"+e).attr("src");""!=t&&void 0!=t&&(t=t.replace("expand-green.gif","collapse-green.gif"),$("#expandcol"+e).attr("src",t),$("#showContent"+e).slideDown())}}function AppendAll(e,t,a){if($("#"+e+" input:checkbox:first").attr("checked")){var i=0;$("#"+e+" input:checkbox").each(function(n,o){$(this).attr("checked",!0),i+=1,AppendCheckBoxInfo(e,t,a)}),i-=1,$("#"+t).get(0).value="(Selected all "+i+" items)"}else $("#"+e+" input:checkbox").each(function(e,t){$(this).attr("checked",!1)}),$("#"+t).get(0).value="(Selected 0 item)",ClearSelectedItems(a)}function AppendCheckBoxInfo(e,t,a){count=$("#"+e+" input:checkbox").get().length-1;var i=0,n="",o="";$("#"+e+" input:checkbox[value!='All']:checked").each(function(){n+=$(this).val()+",",i+=1}),n=n.substring(0,n.length-1),$("#"+a).attr("value",n),i==count&&($("#"+e+" input:checkbox:first").attr("checked",!0),o="(Selected all "+i+" items)"),i<count&&($("#"+e+" input:checkbox:first").attr("checked",!1),o=1==i?"(Selected "+i+" item)":"(Selected "+i+" items)"),0==i&&($("#"+e+" input:checkbox:first").attr("checked",!1),o="(Selected 0 item)"),$("#"+t).attr("value",o)}function ClearSelectedItems(e){$("#"+e).attr("value","")}function enable(e){$("#detailsView").fadeOut(0);var t=$("#"+e).position();$("#txtTag").val(e),$("#detailsView").css("height",368),$(".nestedtableDiv").css("width",543),$(".nestedtableDiv").css("height",247),$("#detailsView").attr("class","org_box");var a,i=$("#"+e),n=i.attr("tag"),o=$("#startDateInput").val(),s=$("#endDateInput").val(),l=$("#txtTimeHidden").val(),c=$('input[type="radio"][name="rank"]:checked').val(),r=i.text();return a=r>=8?392:1>r?144:144+31*r,GetDetailsView(o,s,n,l,c,a),$("#detailsView").fadeIn("slow"),"trigger active"==$(".trigger").attr("class")?$("#detailsView").css("margin-left",t.left-955+"px"):$("#detailsView").css("margin-left",t.left-705+"px"),$("#detailsView").css("margin-top",t.top-285+"px"),CloseDetailsBinding(),!1}function GetDetailsView(e,t,a,i,n,o){$("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Please wait...</p>"),$("#detailsView").css("height",o);var s=getHostUrl();$.post(s+"/GetTICLogDetails.srv",{StartTime:e,EndTime:t,VisitorName:a,Action:i,RankBy:n},function(e){var t=$.parseJSON(e),a=t.length;if(1>a)return $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>There's no details data.</p>"),$("#detailsView").css("height",o),void CloseDetailsBinding();var i=1;i=a>=8?8:a,$("#detailsView").css("height",144+31*i);for(var n="",s=0;a>s;s++)n+="<tr><td width='6%'>"+(s+1)+"</td><td width='23%'>"+t[s].VisitorDomain+" \\ "+t[s].VisitorName+"</td><td width='10%'>"+t[s].Action+"</td><td width='13%'>"+t[s].Time+"</td><td width='38%' style='text-align:left;padding-left:10px;'>"+t[s].Path+"</td><td width='10%'>"+t[s].Result+"</td></tr>";$("#detailsView").html("<span class='org_box_cor cor1'></span><div class='nestedHeader'><a href='#CSTC' class='nestedFunctionFront' id='CopySR' onclick='copySR();'>&nbsp;</a><a style='display:none;'>CSTC</a><a href='#ETE' class='nestedFunction' id='DetailsExport' >&nbsp;</a><a style='display:none;'>ETE</a><div class='triangle-down' id='closeDetails'></div><table class='headertable' id='headertable'><thead><tr class='nestedtableHeader'><td width='6%'>Rank</td><td width='23%'>Domain \\ Name</td><td width='10%'>Action</td><td width='13%'>Time</td><td width='38%'>Page Path</td><td width='10%'>Result</td></tr></thead></table></div><div  class='nestedtableDiv' id='nestedtableDiv'><table class='nestedtable' id='nestedtable1'>"+n+"</table></div><div>"),CloseDetailsBinding(),8>=a&&$(".nestedtableDiv").css("width",538),8>i&&$(".nestedtableDiv").css("height",1+31*i),$("#nestedtable1").tableUI()})}function CloseDetailsBinding(){$("#closeDetails").click(function(){$("#detailsView").html(""),$("#closeDetails").attr("class","triangle-down-click"),$("#detailsView").fadeOut("slow")}),$("#closeDetails").mousedown(function(){$("#closeDetails").attr("class","triangle-down-click")}),$("#closeDetails").mouseup(function(){$("#closeDetails").attr("class","triangle-down")}),$("#closeDetails").mouseover(function(){$("#closeDetails").attr("class","triangle-down-click")}),$("#closeDetails").mouseout(function(){$("#closeDetails").attr("class","triangle-down")})}!function(e){e.fn.goTo=function(){return e("html, body").animate({scrollTop:e(this).offset().top+"px"},"slow"),this}}(jQuery),$(document).ready(function(){function e(){var e=$(window).scrollTop();e>340?$("#TICReportTable").is(":visible")&&$("#floatHeaderDiv").show():$("#floatHeaderDiv").hide()}DisableViewReportButton(),$("#loadImageDiv").hide(),$("#showData").hide(),$("#floatHeaderDiv").hide(),$("#report_image").hide(),$("#reportFrame").hide(),$("#TICReportTable").hide(),$("#quickTimeSelector").change(function(){var e,t=new Date,a=t.getDate(),i=t.getMonth()+1,n=t.getFullYear();10>a&&(a="0"+a),10>i&&(i="0"+i),t=i+"/"+a+"/"+n;var o=$(this).val();if("ytd"==o)$("#startDateInput").val("07/01/2012");else if("3"==o){var e=new Date(t);e.setMonth(e.getMonth()-2),$("#startDateInput").val(e.getMonth()+"/"+e.getDate()+"/"+e.getFullYear())}else if("6"==o){var e=new Date(t);e.setMonth(e.getMonth()-5),$("#startDateInput").val(e.getMonth()+"/"+e.getDate()+"/"+e.getFullYear())}}),e(),$(window).scroll(e),$(window).resize(e),$("#overlay").overlay({mask:{color:"#fff",loadSpeed:200,opacity:.5},closeOnClick:!1,onBeforeClose:function(){}}),$("#close").click(function(){$("#overlay").overlay().close()}),$("#close").mousedown(function(){$("#close").attr("class","buttonClick")}),$("#close").mouseup(function(){$("#close").attr("class","metroButton")}),$("#close").mouseover(function(){$("#close").attr("class","buttonOver")}),$("#close").mouseout(function(){$("#close").attr("class","metroButton")}),CloseDetailsBinding(),$("#export").click(function(){var e=$("#export"),t=getHostUrl(),a="seam";e.attr("disabled","disabled"),$.ajax({url:t+"/ExportExcel.srv",data:{type:a},cache:!1,success:function(t){'"-1"'==t?($("#warningText").html("No data need to be exported, please view report first."),$(".warning").overlay().load()):'"0"'==t?($("#warningText").html("Report columns is 0, please view report again."),$(".warning").overlay().load()):($("#iframe").attr("src","ExportExcel.srv?type=seam"),$("#iframe").load()),e.removeAttr("disabled")},error:function(t){alert("error"),e.removeAttr("disabled")}})}),$("#viewReportLink").click(function(){DisableViewReportButton(),$("#totalUserSpan").text(""),$("#showData").hide();var e=$("#startDateInput").val(),t=$("#endDateInput").val();$("#txtStartDate").val(e),$("#txtEndDate").val(t);var a=$('input[type="radio"][name="rank"]:checked').val();if(!e)return $("#warningText").html("Please select start date."),void $(".warning").overlay().load();if(!t)return $("#warningText").html("Please select end date."),void $(".warning").overlay().load();var i=$("#txtTimeHidden").val();$("#TICReportTable > tbody").empty(),$("#TICReportTable").hide("slow");var n=getHostUrl();$("#loadImageDiv").show(),TimerStart(),$.post(n+"/GetTICLog.srv",{StartTime:e,EndTime:t,ActionType:i,RankBy:a},function(e){TimerStop(),$("#loadImageDiv").hide(),$("#showData").hide(),$(".saveAction").show();var t=$.parseJSON(e),a=t.length;if(1>a)return $("#showData").show(),void EnableViewReportButton();var i,n="",o="";$("#totalUserSpan").text(a.toString());for(var s=0;a>s;s++)i=s%2==0?"#D3DFEE":"#fff",n="<tr style='background-color:"+i+"'><td>"+(s+1).toString()+"</td><td>"+t[s].VisitorDomain+"</td><td>"+t[s].VisitorName+"</td><td>"+t[s].LastAccessTime+"</td><td><a id='AB"+s+"' tag='"+t[s].VisitorName+"' onclick='enable(\"AB"+s+"\")' href='#AA"+s+"' >"+t[s].AccessCount+"</a><a style='display:none;'>AA"+s+"</a></td>",$("#TICReportTable>tbody").append(n),o="",n="";$("#TICReportTable").show("slow"),EnableViewReportButton()})}),$(".spexpandLink").live("click",function(e){$(this).hide();var t=$("#startDateInput").val(),a=$("#endDateInput").val(),i=$(this).attr("spl1"),n=$(this).attr("spl2"),o=$(this).attr("rank"),s=getHostUrl();$.post(s+"/GetContentInfo.srv",{startDate:t,endDate:a,spl1:i,spl2:n},function(e){$("#"+o+"_div").hide();for(var t=$.parseJSON(e),a=t.length,i="",n=0;a>n;n++)i=i+"<tr><td width='200px'>"+t[n].ResourceURL+"</td><td>"+t[n].LinkCount+"</td><td>"+t[n].ResourceType+"</td><td>"+t[n].OriginationMethod+"</td></tr>";var s="<table><thead><tr><td>Resource URL</td><td>Usage Count</td><td>Resouce Type</td><td>Origination Method</td></tr></thead><tbody>"+i+"</tbody></table>";$("#"+o+"_div").append(s),$("#"+o+"_div").show("slow"),$("#"+o+"_div").goTo()})});var t=new Date,a=t.getDate(),i=t.getMonth()+1,n=t.getFullYear();if(10>a&&(a="0"+a),10>i&&(i="0"+i),t=i+"/"+a+"/"+n,7>i){var o="07/01/"+(n-1);$("#startDateInput").val(o)}else{var o="07/01/"+n;$("#startDateInput").val(o)}$("#endDateInput").val(t),$("#startDateInput").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,showAnim:"slideDown",onSelect:function(e){clearRadioButton("radio","filterForm")}}),$("#endDateInput").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,showAnim:"slideDown",onSelect:function(e){clearRadioButton("radio","filterForm")}})}),$(window).resize(function(){var e=screen.width,t=screen.height,a=$(window).width();$(window).height();e>a?($("body").addClass("overflowHidden"),$("body").removeClass("overflowNull")):a>=e&&($("#width").addClass("widthauto"),$("body").addClass("overflowNull"),$("body").removeClass("overflowHidden")),$(".scorecardSec")&&$(".trigger").outerHeight()>t?$(".trigger").css("min-height",$(".scorecardSec").outerHeight()):$(".trigger").css("min-height",t)}),$(document).ready(function(){$(".trigger").click(function(){var e=-1;if(e=$("#txtTag").val(),-1!=e){var t=$("#"+e).position();null!=t&&("trigger active"==$(this).attr("class")?$("#detailsView").animate({"margin-left":t.left-290+"px"},{queue:!1,duration:2e3}).animate({borderRightWidth:"245px"},1e3):$("#detailsView").animate({"margin-left":t.left-40+"px"},{queue:!1,duration:2e3}).animate({borderRightWidth:"245px"},1e3))}return $(".panel").toggle("slow"),$(this).toggleClass("active"),!1});var e=1349,t=$(window).width();$(window).height();e>t?($("#width").addClass("widthfix"),$("body").addClass("overflowHidden")):t>=e&&($("#width").addClass("widthauto"),$("body").addClass("overflowNull")),$(".body").css("min-height",screen.height),$(".body").css("min-width",screen.width),$(".scorecardSec")&&$(".trigger").outerHeight()>screen.height?$(".trigger").css("min-height",$(".scorecardSec").outerHeight()):$(".trigger").css("min-height",screen.height)}),$(document).ready(function(){$(".scoreCard").click(function(){$("#scoreCardContent").is(":visible")?($("#scoreCardContent").slideUp(),$(this).removeClass("active").html("+ Scorecard ")):($("#scoreCardContent").slideDown(),$(this).addClass("active").html("-  Scorecard "))}),$(".business").click(function(){$("#businessContent").is(":visible")?($("#businessContent").slideUp(),$(this).removeClass("active").html("+ Business :")):($("#businessContent").slideDown(),$(this).addClass("active").html("-  Business :"))}),$(".region").click(function(){$("#regionContent").is(":visible")?($("#regionContent").slideUp(),$(this).removeClass("active").html("+ Region :")):($("#regionContent").slideDown(),$(this).addClass("active").html("-  Region :"))}),$(".organization").click(function(){$("#organizationContent").is(":visible")?($("#organizationContent").slideUp(),$(this).removeClass("active").html("+ Organization :")):($("#organizationContent").slideDown(),$(this).addClass("active").html("-  Organization :"))}),$("a.calLnk").click(function(){$("a.calLnk").removeClass("calSelected"),$(this).addClass("calSelected")}),$("a.lnkScore").click(function(){$("a.lnkScore").css("font-weight","normal"),$(this).css("font-weight","bold")})});var successLoadOrg=function(){$("#organizationContent").slideDown(),$(".organization").addClass("active").html("-  Organization :"),$(".organization").click(function(){$("#organizationContent").is(":visible")?($("#organizationContent").slideUp(),$(this).removeClass("active").html("+ Organization :")):($("#organizationContent").slideDown(),$(this).addClass("active").html("-  Organization :"))})},successLoadCat=function(){$(document).ready(function(){$(".brandAllCat .checkbox").dgStyle(),$(".checkbox input").is(":checked")?$(".brandAllCat").css("color","#ffffff"):$(".brandAllCat").css("color","#000000")})},successLoadBusiness=function(){$("#businessContent").slideDown(),$(".business").addClass("active").html("-  Business :"),$(".business").click(function(){$("#businessContent").is(":visible")?($("#businessContent").slideUp(),$(this).removeClass("active").html("+ Business :")):($("#businessContent").slideDown(),$(this).addClass("active").html("-  Business :"))})},successLoadRegion=function(){$("#regionContent").slideDown(),$(".region").addClass("active").html("-  Region :"),$(".region").click(function(){$("#regionContent").is(":visible")?($("#regionContent").slideUp(),$(this).removeClass("active").html("+ Region :")):($("#regionContent").slideDown(),$(this).addClass("active").html("-  Region :"))})},successLoadLob=function(){$(document).ready(function(){$(".brandAllLob .checkbox").dgStyle(),$(".checkbox input").is(":checked")?$(".brandAllLob").css("color","#ffffff"):$(".brandAllLob").css("color","#000000")})};$("#LobId").click(function(){$(this).is(":checked")&&alert("checked")}),$(document).ready(function(){var e="";e="False",(e="True")&&($("#scoreCardContent").text().length>0&&($("#scoreCardContent").slideDown(),$(".scoreCard").addClass("active").html("-  Scorecard ")),$("#businessContent").text().length>0&&($("#businessContent").slideDown(),$(".business").addClass("active").html("-  Business :")),$("#regionContent").text().length>0&&($("#regionContent").slideDown(),$(".region").addClass("active").html("-  Region :")),$("#organizationContent").text().length>0&&($("#organizationContent").slideDown(),$(".organization").addClass("active").html("-  Organization :")))});var TimeFlag,t=0;