function SubmitIdeaComment(){var e=$("#txtIdeaComment").val(),t=$("#ideaDerivedId").val(),a=$("#ideaOwner"+t).text(),o={ideaDerivedId:t,comment:e,senderName:"comment",ideaOwner:a};$.ajax({url:"/SubmitIdeaComment.srv",data:o,type:"POST",Cache:!1,success:function(e){"error"==e?alert(e):LoadIdeaComment(t)},error:function(e){}}),$("#txtIdeaComment").val("")}function InitializeSuppTopicsDrp(e,t){$.ajax({url:"/IdeaStorage.srv",data:"",type:"GET",cache:!1,success:function(a){var o=$.parseJSON(a),n="",d=!1;$.each(o,function(a,o){1==e&&t==o.SupportTopicId?(n+='<option value="'+o.SupportTopicId+'" selected="selected" >'+o.SupportTopic+"</option>",d=!0):n+='<option value="'+o.SupportTopicId+'">'+o.SupportTopic+"</option>"}),$("#supportTopicDrp").empty(),$("#supportTopicDrp").append(n),e?d?ViewReport(!1):alert("There is no content idea for this support topic!"):$("#supportTopicDrp").attr("disabled","true")}})}function GetIdeaList(e,t,a,o,n){var d={StartTime:e,EndTime:t,Status:a,ViewType:o,ViewValue:n,IsDetails:!1,BehaviorType:"read"};$("#loadImageDiv").show(),$.ajax({url:"/IdeaStorage.srv",data:d,type:"POST",cache:!1,success:function(e){$("#loadImageDiv").hide(),$(".saveAction").show();var t=$.parseJSON(e),o=t._ContentIdeaList.length,n="";n="all"!=a?"<span>Total idea:<font style='font-weight:bold' id='totalSTSpan'>"+o+"</font></span>":"<span>Total idea:<font style='font-weight:bold' id='totalSTSpan'>"+o+"</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;<span>Total success:<font style=';font-weight:bold' id='totalCaseSpan'>"+t.SuccessCount+"</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;<span>Total failure :<font style=';font-weight:bold' id='totalCaseSpan'>"+t.FailureCount+"</font></span>&nbsp;&nbsp;<b>|</b>&nbsp;",$("#sumInfo").empty(),$("#sumInfo").append(n);var d=GenerateTBody(t._ContentIdeaList);$("#IdeaList").append(d)},error:function(e){}})}function ViewReport(e){$("#IdeaList tbody").empty(),$("#sumInfo").empty();var t="",a="";e&&(t=$("#startDateInput").val(),a=$("#endDateInput").val()),$(".viewById").hasClass("viewBtnSelected")&&(viewValue=$("#supportTopicDrp").val()),SavePageStatusWithoutParam("idealist","ViewReport"),GetIdeaList(t,a,status,viewType,viewValue)}function GenerateTBody(e){var t="<tbody>";return $.each(e,function(e,a){var o=a.CanVote,n="triangle-up ideaVote",d="ideaVoteVolume";"0"==o&&(n="triangle-up-dis ideaVote",d="ideaVoteVolumeDis"),t+="<tr>",t+="<td><a href='javascript:void(0)' onclick='showDetails(\""+a.ideaDerivedId+'","'+a.Status+"\")'>"+a.Title+"</td><td>"+a.SupportTopic+"</td><td><a href='https://microsoft.sharepoint.com/teams/ContentIdea/RequestsList/Forms/DispForm.aspx?ID="+a.ID.toString().substring(a.ID.toString().lastIndexOf("-")+1,a.ID.length)+"' target=_blank>"+a.ID+"</a></td><td>"+a.Status+"</td><td>"+a.CreatedTime+"</td><td>"+a.IdeaState+"</td><td id='ideaOwner"+a.ideaDerivedId+"'>"+a.UserName+"</td><td class='commentTd'><div id='"+a.ideaDerivedId+"' class='"+n+"' onclick='addIdeaVote(\""+a.ideaDerivedId+'","'+a.TotalVote+'","'+a.CanVote+"\")'></div><div class='"+d+"' id='voteCount"+a.ideaDerivedId+"'>"+a.TotalVote+"</div><div class='ideaDetails' id='comment"+a.ideaDerivedId+"' onclick='addIdeaComment(\""+a.ideaDerivedId+"\")'><a href='javascript:void(0)'>Comments(<span>"+a.TotalComment+"</span>)</a></div></td>",t+="</tr>"}),t}function showDetails(e,t){var a=new Object;a.IsDetails=!0,a.IdeaDerivedId=e,a.Status=t,window.showModelessDialog("ideaform.aspx",a,"dialogWidth=700px;dialogHeight=700px")}function ViewButton(e,t){$(".viewbtn").removeClass("viewBtnSelected"),$("#supportTopicDrp").attr("disabled","true"),"all"==e?$(".viewAll").addClass("viewBtnSelected"):"my"==e?($(".viewMy").addClass("viewBtnSelected"),t=$("#HeadLoginView_HeadLoginName").text()):($("#supportTopicDrp").removeAttr("disabled"),$(".viewById").addClass("viewBtnSelected"),$("#supportTopicDrp").val(t)),viewType=e,viewValue=t}function ChangeStatus(e,t){$(".statusbtn").removeClass("statusBtnSelected"),$("#"+e).addClass("statusBtnSelected"),status=t}function CreateIdea(){window.open("ideaform.aspx","_blank")}function contracts(){var e=$("#common_box"),t=e.width();350==t&&1==suspendedflag&&(e.animate({width:"30px"},500,function(){$("#content").hide()}),suspendedflag=0)}function expand(){var e=$("#common_box"),t=e.width();1==childFlag&&$("#FeedbackMask").fadeTo(500,.25),30==t&&0==suspendedflag&&($("#content").show(),e.animate({width:"350px"},500,function(){var e=$('input:radio[name="feedback"]:checked');1==currentFeedbackPageindex?LoadFeedback(currentFeedbackPageindex,5,!0,e.val()):LoadFeedback(currentFeedbackPageindex,5,!1,e.val())}),suspendedflag=1)}function checkFilter(e){var t=$('input:radio[name="feedback"]');$.each(t,function(){$(this).prop("checked",!1);var e=$(this).attr("tag");$("#"+e).css("background-color","#CD7011"),$("#"+e).css("color","#000000")}),$("#RA"+e).prop("checked",!0),$("#"+e).css("background-color","#000000"),$("#"+e).css("color","#ffffff");var a=$('input:radio[name="feedback"]:checked');$("#FeedbackMask").fadeTo(500,.25),currentFeedbackPageindex=1,LoadFeedback(1,5,!0,a.val())}function LoadFeedback(e,t,a,o){var n=getHostUrl();$.post(n+"/ViewFeedbackContent.srv",{PageIndex:e,PageSize:t,OrderType:o},function(e){var t=$.parseJSON(e);if(void 0==t.AllFeedbackContent&&65==e.length)return $(".feedbackTable").html(""),$(".feedbackTable").html("<tr><td>No feedbacks.</td></tr>"),$("#FeedbackMask").hide(),!1;var o=t.TotalFeedbackNum,n=t.TotalPageNum;a&&LoadFeedbackStructure(o,n),1==n&&($("#paging span").attr("style","margin-top:5px"),$("#paging div.short").attr("style","margin-top:15px")),2==n&&($("#paging ul li a").css("width",15),$("#paging div.short").css("margin-top",15)),n>2&&($("#paging ul li a").css("width",15),$("#paging div.short").css("margin-top",15));var d=t.AllFeedbackContent;OrganizeFeedbackCode(d)})}function LoadFeedbackStructure(e,t){$("#paging").smartpaginator({totalrecords:e,recordsperpage:5,controlsalways:!0,datacontainer:"feedbackTable",dataelement:"tr",initval:0,next:"Next",prev:"Prev",first:"First",last:"Last",theme:"mssolve",onchange:function(e){$("#FeedbackMask").fadeTo(500,.25),1==t&&($("#paging span").attr("style","margin-top:5px"),$("#paging div.short").attr("style","margin-top:15px")),2==t&&($("#paging ul li a").css("width",15),$("#paging div.short").css("margin-top",15)),t>2&&($("#paging ul li a").css("width",15),$("#paging div.short").css("margin-top",15));var a=$('input:radio[name="feedback"]:checked');currentFeedbackPageindex=e,LoadFeedback(e,5,!1,a.val())}})}function OrganizeFeedbackCode(e){for(var t="",a=0;a<e.length;a++){var o=e[a].CanVote,n="triangle-up",d="voteVolume";"0"==o&&(n="triangle-up-dis",d="voteVolumeDis");var i=e[a].FeedBackDetailsContent,s="",r="";i.length>95?(s=subString(i,95),s+="..."):s=i,r=i.replace(/'/g,""),r=r.replace(/"/g,""),r=encodeURIComponent(r),t+="<tr><td><table class='itemTable'><tr><td height='67px'  onclick='ViewCommentsByFeedbackID(\""+e[a].FeedbackID+'", 1, 3, true, "'+r+'","right", '+a+' ,"'+e[a].Alias+'", "'+e[a].CreatedTime+"\");'><div style='color:#b9a862;font-size:13px;margin-top:5px;'>"+e[a].Alias+" said:</div> <div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>"+e[a].CreatedTime+"</div><br /><span style='color:#ffffff;font-size:13px;'>"+s+"</span></td></tr><tr><td height='15px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(138,139,125);'><div class='CommentsCountDiv'  onclick='ViewCommentsByFeedbackID(\""+e[a].FeedbackID+'", 1, 3, true, "'+r+'","right", '+a+' ,"'+e[a].Alias+'", "'+e[a].CreatedTime+"\");'>Comments(<span>"+e[a].CommentsCount+"</span>)  > ></div><div class='Morefeed'><div id='voteDIV"+a+"' class='"+n+"' onclick='AddFeedbackRate(\""+e[a].FeedbackID+'", "'+e[a].Rate+'", "'+a+"\");'></div><div class='"+d+"' id='vote"+a+"'>"+e[a].Rate+"</div></div></td></tr></table></td></tr>"}$(".feedbackTable").html(""),$(".feedbackTable").html(t),$("#FeedbackMask").hide()}function ViewCommentsByFeedbackID(e,t,a,o,n,d,i,s,r){if(childFlag&&"right"==d){$("#child1").animate({marginLeft:"-320px"},500),$("#child2").animate({marginLeft:"0px"},500,function(){$("#CommentMask").fadeTo(500,.25),LoadFeedbackComments(e,t,a,!0)}),childFlag=!childFlag,$("#txtFeedbackID").val(e),$("#txtAlias").val(s);var c=$("#vote"+i).attr("class");"voteVolume"==c?($("#feedbacktriangleup").attr("class","triangle-up"),$("#feedbackvotevolume").attr("class","voteVolume")):($("#feedbacktriangleup").attr("class","triangle-up-dis"),$("#feedbackvotevolume").attr("class","voteVolumeDis")),$("#feedbackvotevolume").html(""),$("#feedbackvotevolume").html($("#vote"+i).html()),$("#feedbackusername").html(""),$("#feedbackusername").html(s),$("#feedbackdatetime").html(""),$("#feedbackdatetime").html(r),$("#feedbackcontent").html("");var l=decodeURIComponent(n);$("#feedbackcontent").html(l)}else childFlag||"left"!=d||($("#child1").animate({marginLeft:"0px"},500),$("#child2").animate({marginLeft:"330px"},500,function(){$("#FeedbackMask").fadeTo(500,.25);var e=$('input:radio[name="feedback"]:checked');LoadFeedback(currentFeedbackPageindex,5,!1,e.val())}),childFlag=!childFlag)}function LoadFeedbackComments(e,t,a,o){var n=getHostUrl();$.post(n+"/ViewFeedbackComments.srv",{FeedbackID:e,PageIndex:t,PageSize:a},function(t){var a=$.parseJSON(t);if(a.length<1)return!1;var n=a.TotalFeedbackNum,d=a.TotalPageNum;o&&LoadFeedbackCommentsStructure(e,n,d),1==d&&($("#pagingComment span").attr("style","margin-top:5px"),$("#pagingComment div.short").attr("style","margin-top:15px")),2==d&&($("#pagingComment ul li a").css("width",15),$("#pagingComment div.short").css("margin-top",15)),d>2&&($("#pagingComment ul li a").css("width",15),$("#pagingComment div.short").css("margin-top",15));var i=a.AllFeedbackComment;OrganizeFeedbackCommentsCode(i)})}function LoadFeedbackCommentsStructure(e,t,a){$("#pagingComment").smartpaginator({totalrecords:t,recordsperpage:3,controlsalways:!0,datacontainer:"commentTable",dataelement:"tr",initval:0,next:"Next",prev:"Prev",first:"First",last:"Last",theme:"mssolve",onchange:function(t){1==a&&($("#pagingComment span").attr("style","margin-top:5px"),$("#pagingComment div.short").attr("style","margin-top:15px")),2==a&&($("#pagingComment ul li a").css("width",15),$("#pagingComment div.short").css("margin-top",15)),a>2&&($("#pagingComment ul li a").css("width",15),$("#pagingComment div.short").css("margin-top",15)),currentFeedbackCommentPageIndex=t,$("#CommentMask").fadeTo(500,.25),LoadFeedbackComments(e,t,3,!1)}})}function OrganizeFeedbackCommentsCode(e){if(null==e)return $(".commentTable").html(""),$(".commentTable").html("<tr><td>No comments</td></tr>"),$("#CommentMask").hide(),!1;for(var t="",a=0;a<e.length;a++){var o=e[a].Comments;t+="<tr><td><table class='itemTable'><tr><td height='82px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(0,0,0);'><div style='color:#b9a862;font-size:13px;margin-top:2px;'>"+e[a].Alias+" said: </div><div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>("+e[a].CreatedTime+")</div><br /><textarea  readonly='readonly' class='otherCommentTextarea'>"+o+"</textarea></td></tr></table></td></tr>"}$(".commentTable").html(""),$(".commentTable").html(t),$("#CommentMask").hide()}function AddFeedback(e){var t=getHostUrl();$("#FeedbackSucMask").fadeTo(500,.25),$(".FeedbackSucMaskFont").html(""),$(".FeedbackSucMaskFont").html("Sending..."),$("#sendFeedback").prop("disabled","disabled"),$.post(t+"/AddFeedBackContent.srv",{FeedBackDetailsContent:e},function(e){if("error"==e)InvokeFeedbackReminder("FeedbackSucMask","FeedbackSucMaskFont","Send Faild. Please contactTIC Team.","sendFeedback");else{InvokeFeedbackReminder("FeedbackSucMask","FeedbackSucMaskFont","Send Success.","sendFeedback"),$("#FeedbackMask").fadeTo(500,.25);var t=$('input:radio[name="feedback"]:checked');LoadFeedback(1,5,!0,t.val())}})}function InvokeFeedbackReminder(e,t,a,o){$("#"+e).fadeTo(500,.25),$("."+t).html(""),$("."+t).html(a),$("#"+o).prop("disabled","disabled"),setTimeout(function(){$("#"+e).hide(),$("#"+o).removeAttr("disabled","disabled")},2e3)}function InvokeCommentReminder(e,t,a,o){$("#"+e).fadeTo(500,.25),$("."+t).html(""),$("."+t).html(a),$("#"+o).prop("disabled","disabled"),setTimeout(function(){$("#"+e).hide(),$("#"+o).removeAttr("disabled","disabled")},2e3)}function AddFeedbackRate(e,t,a){var o=getHostUrl();$.post(o+"/AddFeedBackRate.srv",{FeedbackId:e},function(e){"error"==e?($("#warningTitle").html("Rate Feedback"),$("#warningText").html("Rate Failed. Please contact TIC team."),$(".warning").overlay().load()):"0"==e&&($("#vote"+a).html(""),$("#vote"+a).html(parseInt(t)+1),$("#vote"+a).attr("class","voteVolumeDis"),$("#voteDIV"+a).attr("class","triangle-up-dis"))})}function AddFeedbackComments(e,t,a){var o=getHostUrl();$.post(o+"/AddFeedBackComment.srv",{Comment:e,FeedBackID:t,FAlias:a},function(e){"error"==e?InvokeCommentReminder("CommentSucMask","CommentSucMaskFont","Send Faild. Please contactTIC Team.","sendComment"):(InvokeCommentReminder("CommentSucMask","CommentSucMaskFont","Send Success.","sendComment"),$("#CommentMask").fadeTo(500,.25),LoadFeedbackComments(t,1,3,!0))})}function getHostUrl(){var e=window.location.protocol,t=window.location.host;return e+"//"+t+pathDir}function subString(e,t,a){for(var o=0,n="",d=/[^\x00-\xff]/g,i="",s=e.replace(d,"**").length,r=0;s>r&&(i=e.charAt(r).toString(),null!=i.match(d)?o+=2:o++,!(o>t));r++)n+=i;return a&&s>t&&(n+="..."),n}function DateSet(){var e,t=new Date,a=t.getDate(),o=t.getMonth()+1,n=t.getFullYear();10>a&&(a="0"+a),10>o&&(o="0"+o),t=o+"/"+a+"/"+n;var d=$('input[type="radio"][name="radio"]:checked').val();if("fytd"==d){if(7>o){var e="07/01/"+(n-1);$("#startDateInput").val(e)}else{var e="07/01/"+n;$("#startDateInput").val(e)}$("#endDateInput").val(t)}else{var e=new Date(t);e.setMonth(e.getMonth()+1-parseInt(d));var i,s=new Date,r=s.getMonth();0==s.getMonth()&&(r=12);var c=new Date(s.getFullYear(),s.getMonth(),0,23,59,59);i=c.getDate();var l=c.getFullYear();$("#endDateInput").val(r+"/"+i+"/"+l);var m=new Date(e.getFullYear(),e.getMonth(),0,23,59,59),u=m.getMonth()+1;0==u&&(u=12),$("#startDateInput").val(u+"/01/"+m.getFullYear())}}function addIdeaVote(e,t,a){var o=$("#"+e).attr("class");if(o.indexOf("triangle-up-dis")>=0)return!1;var n={ideaDerivedId:e,vote:"true",senderName:"vote"};$.ajax({url:"/SubmitIdeaComment.srv",data:n,type:"POST",cache:!1,success:function(a){"error"==a?alert("error occur."):"success"==a&&($("#"+e).removeClass("triangle-up").addClass("triangle-up-dis"),$("#voteCount"+e).html(),$("#voteCount"+e).html(parseInt(t)+1),$("#voteCount"+e).addClass("ideaVoteVolumeDis"))},error:function(e){alert("error occur.")}})}function addIdeaComment(e){var t=$("#comment"+e).position();$("#ideaComments").css("margin-left",t.left-300+"px"),$("#ideaComments").css("margin-top",t.top-200+"px"),$("#ideaComments").show(),$("#ideaDerivedId").val(e),LoadIdeaComment(e)}function LoadIdeaComment(e){var t=3,a=1;loadIdeaCommentData(e,t,a,!0)}function getTotalComment(e,t){var a={senderName:"commentView",pageSize:pageSize,pageIndex:t,ideaDerivedId:e};$.ajax({url:"/SubmitIdeaComment.srv",data:a,type:"POST",cache:!1,success:function(e){var t=$.parseJSON(e);createCommentHtml(t.IdeaCommentDetail)},error:function(e){alert("error occur")}})}function loadIdeaPaging(e,t,a,o){$("#ideaFooter").smartpaginator({totalrecords:t,recordsperpage:a,controlsalways:!0,datacontainer:"feedbackTable",dataelement:"tr",initval:0,next:"Next",prev:"Prev",first:"First",last:"Last",theme:"mssolve",onchange:function(o){$("#FeedbackMask").fadeTo(500,.25),1==t&&($("#ideaFooter span").attr("style","margin-top:5px"),$("#ideaFooter div.short").attr("style","margin-top:0px")),2==t&&($("#ideaFooter ul li a").css("width",15),$("#ideaFooter div.short").css("margin-top",0)),t>2&&($("#ideaFooter ul li a").css("width",15),$("#ideaFooter div.short").css("margin-top",0)),loadIdeaCommentData(e,a,o,!1)}}),loadIdeaCommentData(e,a,o,!1)}function loadIdeaCommentData(e,t,a,o){var n,d={senderName:"commentView",pageSize:t,pageIndex:a,ideaDerivedId:e};$.ajax({url:"/SubmitIdeaComment.srv",data:d,type:"POST",cache:!1,success:function(d){var i=$.parseJSON(d);o?(n=i.TotalComments,loadIdeaPaging(e,n,t,a)):createCommentHtml(i.IdeaCommentDetail)},error:function(e){alert("error occur")}})}function createCommentHtml(e){var t="";$("#ideaCommentTable").html("");for(var a=0;a<e.length;a++)t+="<tr><td><table class='ideaCommentTable'><tr><td height='67px'><div style='color:#b9a862;font-size:13px;margin-top:0px;'>"+e[a].Alias+" said:</div> <div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>"+e[a].CreatedTime+"</div><span style='color:#ffffff;font-size:13px;'>"+e[a].Comment+"</span></td></tr><tr><td height='3px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(138,139,125);'></td></tr></table></td></tr>";$("#ideaCommentTable").append(t)}$(document).ready(function(){var e=window.location.href,t="",a="",o="",n="";if(e.indexOf("?")>0)t=e.split("?"),a=t[1].split("&")[2],o=t[1].split("&")[0],n=t[1].split("&")[1],ViewButton("supportTopic",a.split("=")[1].toString()),$("#startDateInput").val(o.split("=")[1].toString()),$("#endDateInput").val(n.split("=")[1].toString()),ChangeStatus("successstatus","0"),InitializeSuppTopicsDrp(!0,a.split("=")[1].toString());else{ViewButton("all",""),InitializeSuppTopicsDrp(!1);var d=new Date,i=d.getDate(),s=d.getMonth()+1,r=d.getFullYear();if(10>i&&(i="0"+i),10>s&&(s="0"+s),d=s+"/"+i+"/"+r,7>s){var c="07/01/"+(r-1);$("#startDateInput").val(c)}else{var c="07/01/"+r;$("#startDateInput").val(c)}$("#endDateInput").val(d),ChangeStatus("allstatus","all")}$("#viewReportLink").click(function(){ViewReport(!0)}),$("#startDateInput").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,showAnim:"slideDown",onSelect:function(e){}}),$("#endDateInput").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,showAnim:"slideDown",onSelect:function(e){}}),$("#closeIdeaComment").click(function(){$("#ideaComments").hide()}),$("#submitIdeaComment").click(function(){SubmitIdeaComment()}),$("#txtIdeaComment").focus(function(){var e=$(this).val();e==this.defaultValue&&$(this).val("")}),$("#txtIdeaComment").blur(function(){""==$(this).val()&&$(this).val(this.defaultValue)})});var suspendedflag=0,childFlag=!0,currentFeedbackPageindex=1;$(document).ready(function(){$("#availableS");$("#feedByTime").css("background-color","#000000"),$("#feedByTime").css("color","#ffffff"),$("#availableS").click(function(){0==suspendedflag?expand():1==suspendedflag&&contracts()}),$("#availableS").mousedown(function(){$("#availableS").attr("class","availableS-Focus")}),$("#availableS").mouseup(function(){$("#availableS").attr("class","availableS")}),$("#availableS").mouseover(function(){$("#availableS").attr("class","availableS-Focus")}),$("#availableS").mouseout(function(){$("#availableS").attr("class","availableS")}),$("#txtFeedback").focus(function(){$("#txtFeedback").attr("class","txtFeedback"),"Hi, TIC team..."==$("#txtFeedback").val()&&$("#txtFeedback").val("")}),$("#txtFeedback").focusout(function(){""==$("#txtFeedback").val()&&($("#txtFeedback").attr("class","txtFeendbackNoFocus"),$("#txtFeedback").val("Hi, TIC team..."))}),$("#txtFeedbackComment").focus(function(){$("#txtFeedbackComment").attr("class","txtFeedbackComment"),"My Comments To This FeedBack..."==$("#txtFeedbackComment").val()&&$("#txtFeedbackComment").val("")}),$("#txtFeedbackComment").focusout(function(){""==$("#txtFeedbackComment").val()&&($("#txtFeedbackComment").attr("class","txtFeedbackCommentNoFocus"),$("#txtFeedbackComment").val("My Comments To This FeedBack..."))}),$("#sendFeedback").click(function(){var e=$.trim($("#txtFeedback").val());getLen(e);""==e||0==e.length||"Hi, TIC team..."==e?InvokeFeedbackReminder("FeedbackSucMask","FeedbackSucMaskFont","Please input your feedback first, thank you.","sendFeedback"):AddFeedback(e)}),$("#sendComment").click(function(){var e=$.trim($("#txtFeedbackComment").val());getLen(e);if(""==e||0==e.length||"My Comments To This FeedBack..."==e)InvokeCommentReminder("CommentSucMask","CommentSucMaskFont","Please input your comment first, thank you.","sendComment");else{var t=$("#txtFeedbackID").val(),a=$("#txtAlias").val();AddFeedbackComments(e,t,a)}}),$("#feedByTime").click(function(){checkFilter("feedByTime")}),$("#feedByTime").mousedown(function(){$("#feedByTime").css("background-color","#000000"),$("#feedByTime").css("color","#ffffff")}),$("#feedByTime").mouseup(function(){$("#feedByTime").css("background-color","#000000"),$("#feedByTime").css("color","#ffffff")}),$("#feedByTime").mouseover(function(){$("#feedByTime").css("background-color","#000000"),$("#feedByTime").css("color","#ffffff")}),$("#feedByTime").mouseout(function(){1!=$("#RAfeedByTime").prop("checked")&&($("#feedByTime").css("background-color","#CD7011"),$("#feedByTime").css("color","#000000"))}),$("#feedByRate").click(function(){checkFilter("feedByRate")}),$("#feedByRate").mousedown(function(){$("#feedByRate").css("background-color","#000000"),$("#feedByRate").css("color","#ffffff")}),$("#feedByRate").mouseup(function(){$("#feedByRate").css("background-color","#000000"),$("#feedByRate").css("color","#ffffff")}),$("#feedByRate").mouseover(function(){$("#feedByRate").css("background-color","#000000"),$("#feedByRate").css("color","#ffffff")}),$("#feedByRate").mouseout(function(){1!=$("#RAfeedByRate").prop("checked")&&($("#feedByRate").css("background-color","#CD7011"),$("#feedByRate").css("color","#000000"))}),$("#backContent").click(function(){ViewCommentsByFeedbackID("","","","","","left")}),$("#backContent").mousedown(function(){$("#triangle-left").attr("class","triangle-left-onfocus"),$("#triangle-left-core").attr("class","triangle-left-core-onfocus")}),$("#backContent").mouseup(function(){$("#triangle-left").attr("class","triangle-left"),$("#triangle-left-core").attr("class","triangle-left-core")}),$("#backContent").mouseover(function(){$("#triangle-left").attr("class","triangle-left-onfocus"),$("#triangle-left-core").attr("class","triangle-left-core-onfocus")}),$("#backContent").mouseout(function(){$("#triangle-left").attr("class","triangle-left"),$("#triangle-left-core").attr("class","triangle-left-core")}),$("#feedbacktriangleup").click(function(){if("voteVolume"==$("#feedbackvotevolume").attr("class")){var e=$("#txtFeedbackID").val(),t=$("#feedbackvotevolume").html();AddFeedbackRate(e,t,"test"),$("#feedbackvotevolume").html(""),$("#feedbackvotevolume").html(parseInt(t)+1),$("#feedbackvotevolume").attr("class","voteVolumeDis"),$("#feedbacktriangleup").attr("class","triangle-up-dis")}})});