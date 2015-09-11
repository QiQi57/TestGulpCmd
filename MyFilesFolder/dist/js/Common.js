function getHostUrl(){var e=window.location.protocol,t=window.location.host;return e+"//"+t+pathDir}function htmlEncode(e){return e?$("<div />").text(e).html():""}function htmlDecode(e){return e?$("<div />").html(e).text():""}function copyToClipboard(e,t){clipboardData.setData("Text",e),0!=t?($("#warningText").html("Copy "+t+" items Successfully."),$(".warningTitle").html("<span>Copy to clipboard:</span>"),$(".warning").overlay().load()):($("#warningText").html("Copy 0 item."),$(".warningTitle").html("<span>Copy to clipboard:</span>"),$(".warning").overlay().load())}function copySR(){var e=$("[name='ServiceRequestNumber']"),t="",r=0;e.each(function(){t+=$(this).text()+"\r\n",r+=1}),copyToClipboard(t,r)}function DisableViewReportButton(){$("#viewReportLink").prop("disabled","disabled")}function EnableViewReportButton(){$("#viewReportLink").removeAttr("disabled")}function TimerStart(){parseInt($("#searchTimeCost").text());t+=1,$("#searchTimeCost").text(t),flag=setTimeout("TimerStart()",1e3)}function TimerStop(){clearTimeout(flag),t=0}function getLen(e){for(var t=0,r=0;r<e.length;r++){var a=e.charCodeAt(r);t+=a>=0&&128>=a?1:2}return t}function subString(e,t,r){for(var a=0,o="",n=/[^\x00-\xff]/g,l="",i=e.replace(n,"**").length,u=0;i>u&&(l=e.charAt(u).toString(),null!=l.match(n)?a+=2:a++,!(a>t));u++)o+=l;return r&&i>t&&(o+="..."),o}function SavePageStatus(e,t,r,a,o,n,l,i,u,c,s,f,d,v,p,h,g,T,L,m,O,y,P,S,D,H,I,x,k,w,C,M,R){$.ajax({url:getHostUrl()+"/GetUniqueUrlHandler.srv",data:{type:m,startDate:e,endDate:t,quickSelect:r,treeHTML:a,treeID:o,treeNodes:n,treeHeight:l,treeWidth:i,treeItems:u,taxonomy:c,taxonomySelected:s,supportLevel1:f,supportLevel1Selected:d,GeographyLevel3:v,originationMethod:p,ranktypeID:h,rankBy:g,rankValueID:T,generalType:L,ProductLevel1:O,ProductLevel2:y,ProductLevel3:P,supportFullPath:S,OffTreeHTML:D,OffTreeID:H,OffTreeNodes:I,OffTreeHeight:x,OffTreeWidth:k,OffTreeItems:w,OffLevel1:C,OffLevel2:M,OffLevel3:R},type:"POST",cache:!1,success:function(e){var t=$.parseJSON(e);"Viewreport"==L&&(document.location.hash="?guid="+t,$("#txtGuid").val(t))},error:function(e){alert("error")}})}function SavePageStatusRootCause(e,t,r,a,o,n,l,i,u,c,s,f,d,v,p,h,g,T,L,m,O,y,P,S,D,H,I,x,k,w,C,M,R,U,N){$.ajax({url:getHostUrl()+"/GetUniqueUrlHandler.srv",data:{source:e,type:y,startDate:t,endDate:r,quickSelect:a,treeHTML:o,treeID:n,treeNodes:l,treeHeight:i,treeWidth:u,treeItems:c,taxonomy:s,taxonomySelected:f,supportLevel1:d,supportLevel1Selected:v,GeographyLevel3:p,originationMethod:h,ranktypeID:g,rankBy:T,rankValueID:L,topValue:m,generalType:O,ProductLevel1:P,ProductLevel2:S,ProductLevel3:D,supportFullPath:H,OffTreeHTML:I,OffTreeID:x,OffTreeNodes:k,OffTreeHeight:w,OffTreeWidth:C,OffTreeItems:M,OffLevel1:R,OffLevel2:U,OffLevel3:N},type:"POST",cache:!1,success:function(e){var t=$.parseJSON(e);"Viewreport"==O&&(document.location.hash="?guid="+t,$("#txtGuid").val(t))},error:function(e){alert("error")}})}function SavePageStatusSeam(e,t,r,a,o,n,l,i,u,c,s,f,d,v,p,h,g,T,L,m,O,y,P,S,D,H,I,x,k,w,C,M,R,U){$.ajax({url:getHostUrl()+"/GetUniqueUrlHandler.srv",data:{source:e,type:O,startDate:t,endDate:r,quickSelect:a,treeHTML:o,treeID:n,treeNodes:l,treeHeight:i,treeWidth:u,treeItems:c,taxonomy:s,taxonomySelected:f,supportLevel1:d,supportLevel1Selected:v,GeographyLevel3:p,originationMethod:h,ranktypeID:g,rankBy:T,rankValueID:L,generalType:m,ProductLevel1:y,ProductLevel2:P,ProductLevel3:S,supportFullPath:D,OffTreeHTML:H,OffTreeID:I,OffTreeNodes:x,OffTreeHeight:k,OffTreeWidth:w,OffTreeItems:C,OffLevel1:M,OffLevel2:R,OffLevel3:U},type:"POST",cache:!1,success:function(e){var t=$.parseJSON(e);"Viewreport"==m&&(document.location.hash="?guid="+t,$("#txtGuid").val(t))},error:function(e){alert("error")}})}function SavePageStatusTopissue(e,t,r,a,o,n,l,i,u,c,s,f,d,v,p,h,g,T,L,m,O,y,P,S,D,H,I,x,k,w,C,M,R,U,N,V,b,G,W,q){$.ajax({url:getHostUrl()+"/GetUniqueUrlHandler.srv",data:{type:g,CommercialProductLevel2ID:e,Quaters:t,Taxonomy:r,Region:a,RankType:o,RankValue:n,critsitID:l,AudienceView:i,treeHTML:u,treeID:c,treeNodes:s,treeHeight:f,treeWidth:d,treeItems:v,generalType:h,rankBy:p,ProductLevel1:L,ProductLevel2:m,ProductLevel3:O,supportFullPath:y,isTreeOrProView:T,OffTreeHTML:P,OffTreeID:S,OffTreeNodes:D,OffTreeHeight:H,OffTreeWidth:I,OffTreeItems:x,OffLevel1:k,OffLevel2:w,OffLevel3:C,CusRegHTML:M,CusRegTreeID:R,CusRegTreeNodes:U,CusRegTreeHeight:N,CusRegTreeWidth:V,CusRegTreeItems:b,CusRegLevel1:G,CusRegLevel2:W,CusRegLevel3:q},type:"POST",cache:!1,success:function(e){var t=$.parseJSON(e);if("Viewreport"==h){var r=t.GUID;document.location.hash="?guid="+r,$("#txtGuid").val(r)}""!=t.ProductLevel1&&($("#ProLevel1HiddenP").val(t.ProductLevel1),$("#ProLevel2HiddenP").val(t.ProductLevel2),$("#ProLevel3HiddenP").val(t.ProductLevel3))},error:function(e){alert("error")}})}function SavePageStatusWithoutParam(e,t){var r={type:e,generaltype:t};$.ajax({url:getHostUrl()+"/GetUniqueUrlHandler.srv",data:r,type:"POST",cache:!1,success:function(e){var r=$.parseJSON(e);"ViewReport"==t&&(document.location.hash="&guid="+r)},error:function(e){alert("error")}})}function getTrendStartDate(e,t){var r=new Date(e),a=new Date(t);if(r>a){var o=r;r=a,a=o}return a.getMonth()-r.getMonth()<6?(a.getMonth()-6<0?(r.setYear(a.getFullYear()-1),r.setMonth(a.getMonth()+6)):r.setMonth(a.getMonth()-6),r.getMonth()+1+"/"+r.getDate()+"/"+r.getFullYear()):e}function escapeText(e){return e=e?e.replace(/&/gi,"&#38;"):""}function bindCrisitEvent(e,t){var r;$(e).mouseover(function(e){r=$(t)[0].id;var a=e.target;$("#"+a.id).attr("class",cluster_checked)}),$(e).mouseout(function(e){var t=e.target;t.id!=r&&$("#"+t.id).attr("class",cluster_unchecked)}),$(e).click(function(t){var a=t.target;$(e).each(function(){$(this).hasClass(cluster_checked)&&$(this).attr("class",cluster_unchecked)}),$("#"+a.id).attr("class",cluster_checked),r=a.id})}var pathDir="/TIC";