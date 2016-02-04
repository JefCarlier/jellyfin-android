!function(e){function t(t){return ApiClient.getUserViews({},t).then(function(t){for(var a=t.Items,r=[],i=0,n=a.length;n>i;i++){var s=a[i];if(!(AppInfo.isNativeApp&&browserInfo.safari&&"livetv"==s.CollectionType||(r.push(s),"livetv"!=s.CollectionType))){s.ImageTags={},s.icon="live-tv",s.onclick="LibraryBrowser.showTab('livetv.html', 0);event.preventDefault();event.stopPropagation();return false;";var l=e.extend({},s);l.Name=Globalize.translate("ButtonGuide"),l.ImageTags={},l.icon="dvr",l.url="livetv.html?tab=1",l.onclick="LibraryBrowser.showTab('livetv.html', 1);event.preventDefault();event.stopPropagation();return false;",r.push(l);var o=e.extend({},s);o.Name=Globalize.translate("ButtonRecordedTv"),o.ImageTags={},o.icon="video-library",o.url="livetv.html?tab=3",o.onclick="LibraryBrowser.showTab('livetv.html', 3);event.preventDefault();event.stopPropagation();return false;",r.push(o)}}return r})}function a(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function r(){return a()?"overflowBackdrop":"backdrop"}function i(){return a()?"overflowPortrait":"portrait"}function n(){return a()?"overflowSquare":"square"}function s(e){for(var t="",a=0,r=e.length;r>a;a++){var i,n=e[a],s="rgba(82, 181, 75, 0.9)";switch(n.CollectionType){case"movies":i="local-movies",s="rgba(176, 94, 81, 0.9)";break;case"music":i="library-music",s="rgba(217, 145, 67, 0.9)";break;case"photos":i="photo",s="rgba(127, 0, 0, 0.9)";break;case"livetv":i="live-tv",s="rgba(217, 145, 67, 0.9)";break;case"tvshows":i="live-tv",s="rgba(77, 88, 164, 0.9)";break;case"games":i="folder",s="rgba(183, 202, 72, 0.9)";break;case"trailers":i="local-movies",s="rgba(176, 94, 81, 0.9)";break;case"homevideos":i="video-library",s="rgba(110, 52, 32, 0.9)";break;case"musicvideos":i="video-library",s="rgba(143, 54, 168, 0.9)";break;case"books":i="folder";break;case"channels":i="folder",s="rgba(51, 136, 204, 0.9)";break;case"playlists":i="folder";break;default:i="folder"}var l="card smallBackdropCard buttonCard";n.CollectionType&&(l+=" "+n.CollectionType+"buttonCard");var o=n.url||LibraryBrowser.getHref(n),d=n.onclick?' onclick="'+n.onclick+'"':"";i=n.icon||i,t+="<a"+d+' data-itemid="'+n.Id+'" class="'+l+'" href="'+o+'">',t+='<div class="cardBox" style="background-color:'+s+';margin:4px;border-radius:4px;">',t+="<div class='cardText' style='padding:8px 10px;color:#fff;font-size:14px;'>",t+='<iron-icon icon="'+i+'"></iron-icon>',t+='<span style="margin-left:.7em;">'+n.Name+"</span>",t+="</div>",t+="</div>",t+="</a>"}return t}function l(e,a,r){return t(a).then(function(t){var a="<br/>";r&&(a+='<h1 class="listHeader">'+Globalize.translate("HeaderMyMedia")+"</h1>"),a+="<div>",a+=s(t),a+="</div>",e.innerHTML=a,p(e)})}function o(t,a){var r=AppInfo.hasLowImageBandwidth?16:20,i={Limit:r,Fields:"PrimaryImageAspectRatio,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+a.Id+"/Items/Latest",i)).then(function(a){var r="",i=!1;a.length&&(r+="<div>",r+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestMedia")+"</h1>",r+="</div>",r+='<div class="itemsContainer">',r+=LibraryBrowser.getPosterViewHtml({items:a,preferThumb:!0,shape:"backdrop",showUnplayedIndicator:!1,showChildCountIndicator:!0,lazy:!0,cardLayout:i,showTitle:i,showYear:i,showDetailsMenu:!0,context:"home"}),r+="</div>"),t.innerHTML=r,ImageLoader.lazyChildren(t),e(t).createCardMenus()})}function d(t,r){var n={Limit:12,Fields:"PrimaryImageAspectRatio,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb",IncludeItemTypes:"Movie"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+r.Id+"/Items/Latest",n)).then(function(r){var n="",s=a();r.length&&(n+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestMovies")+"</h1>",n+=s?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=LibraryBrowser.getPosterViewHtml({items:r,shape:i(),showUnplayedIndicator:!1,showChildCountIndicator:!0,lazy:!0,context:"home",centerText:!0,overlayPlayButton:!0}),n+="</div>"),t.innerHTML=n,ImageLoader.lazyChildren(t),e(t).createCardMenus()})}function c(t,i){var n={Limit:12,Fields:"PrimaryImageAspectRatio,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb",IncludeItemTypes:"Episode"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+i.Id+"/Items/Latest",n)).then(function(i){var n="",s=a();i.length&&(n+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestEpisodes")+"</h1>",n+=s?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=LibraryBrowser.getPosterViewHtml({items:i,preferThumb:!0,shape:r(),showUnplayedIndicator:!1,showChildCountIndicator:!0,lazy:!0,context:"home",overlayPlayButton:!0}),n+="</div>"),t.innerHTML=n,ImageLoader.lazyChildren(t),e(t).createCardMenus()})}function m(t,a){var r=e(window).width(),i={Limit:r>=2400?10:r>=1600?10:r>=1440?8:r>=800?7:6,Fields:"PrimaryImageAspectRatio,SyncInfo",Filters:"IsUnplayed",UserId:a};return ApiClient.getJSON(ApiClient.getUrl("Channels/Items/Latest",i)).then(function(a){var r="";a.Items.length&&(r+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestChannelMedia")+"</h1>",r+='<div class="itemsContainer">',r+=LibraryBrowser.getPosterViewHtml({items:a.Items,shape:"auto",showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}),r+="</div>"),t.innerHTML=r,ImageLoader.lazyChildren(t),e(t).createCardMenus()})}function h(r,i,n,l,o,d){return t(i.Id).then(function(t){var i="";if(i+=o?'<div class="hiddenSectionOnMobile">':"<div>",t.length){var l=e(window).width();i+="<div>",i+='<h1 class="listHeader">'+Globalize.translate("HeaderMyMedia")+"</h1>",i+="</div>";var c=a()&&browserInfo.safari&&l>800;i+=c?'<div class="hiddenScrollX itemsContainer homeTopViews">':'<div class="itemsContainer homeTopViews">',i+=LibraryBrowser.getPosterViewHtml({items:t,shape:c?"overflowBackdrop":n,showTitle:d,centerText:!0,lazy:!0,autoThumb:!0,transition:!1}),i+="</div>"}i+="</div>",o&&(i+='<div class="hiddenSectionOnNonMobile" style="margin-top:1em;">',i+=s(t),i+="</div>"),r.innerHTML=i,ImageLoader.lazyChildren(r),e(r).createCardMenus({showDetailsMenu:!1}),p(r)})}function v(t,i){var n=e(window).width(),s={SortBy:"DatePlayed",SortOrder:"Descending",MediaTypes:"Video",Filters:"IsResumable",Limit:n>=1920?10:n>=1600?8:n>=1200?9:6,Recursive:!0,Fields:"PrimaryImageAspectRatio,SyncInfo",CollapseBoxSetItems:!1,ExcludeLocationTypes:"Virtual",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};return ApiClient.getItems(i,s).then(function(i){var n="";i.Items.length&&(n+='<h1 class="listHeader">'+Globalize.translate("HeaderResume")+"</h1>",n+=a()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=LibraryBrowser.getPosterViewHtml({items:i.Items,preferThumb:!0,shape:r(),overlayText:!1,showTitle:!0,showParentTitle:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0,context:"home",centerText:!0}),n+="</div>"),t.innerHTML=n,ImageLoader.lazyChildren(t),e(t).createCardMenus()})}function u(t,i){var n={Limit:20,Fields:"PrimaryImageAspectRatio,SeriesInfo,DateCreated,SyncInfo",UserId:i,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};ApiClient.getNextUpEpisodes(n).then(function(i){var n="";i.Items.length&&(n+='<h1 class="listHeader">'+Globalize.translate("HeaderNextUp")+"</h1>",n+=a()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=LibraryBrowser.getPosterViewHtml({items:i.Items,preferThumb:!0,shape:r(),overlayText:!1,showTitle:!0,showParentTitle:!0,lazy:!0,overlayPlayButton:!0,context:"home",centerText:!0}),n+="</div>"),t.innerHTML=n,ImageLoader.lazyChildren(t),e(t).createCardMenus()})}function p(t){e("a",t).on("click",function(){var t=this;this.classList.contains("card")||(t=e(this).parents(".card")[0]);var a=e(".cardText",t),r=a.text();LibraryMenu.setTitle(r)})}function y(t,a,r){return r=e.extend(r||{},{UserId:a,SupportsLatestItems:!0}),ApiClient.getJSON(ApiClient.getUrl("Channels",r)).then(function(e){var a=e.Items,r=a.map(function(e){return'<div id="channel'+e.Id+'"></div>'}).join("");t.innerHTML=r;for(var i=0,n=a.length;n>i;i++){var s=a[i];b(t,s,i)}})}function b(t,a){var r=e(window).width(),i={Limit:r>=1600?10:r>=1440?5:r>=800?6:6,Fields:"PrimaryImageAspectRatio,SyncInfo",Filters:"IsUnplayed",UserId:Dashboard.getCurrentUserId(),ChannelIds:a.Id};ApiClient.getJSON(ApiClient.getUrl("Channels/Items/Latest",i)).then(function(r){var i="";if(r.Items.length){i+='<div class="homePageSection">',i+="<div>";var n=Globalize.translate("HeaderLatestFromChannel").replace("{0}",a.Name);i+='<h1 style="display:inline-block; vertical-align:middle;" class="listHeader">'+n+"</h1>",i+='<a href="channelitems.html?id='+a.Id+'" class="clearLink" style="margin-left:2em;"><paper-button raised class="more mini"><span>'+Globalize.translate("ButtonMore")+"</span></paper-button></a>",i+="</div>",i+='<div class="itemsContainer">',i+=LibraryBrowser.getPosterViewHtml({items:r.Items,shape:"autohome",defaultShape:"square",showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}),i+="</div>",i+="</div>"}var s=t.querySelector("#channel"+a.Id);s.innerHTML=i,ImageLoader.lazyChildren(s),e(s).createCardMenus()})}function g(t,r,i){return ApiClient.getLiveTvRecordings({userId:r,limit:5,IsInProgress:!1}).then(function(r){var s="";if(r.Items.length){var l=0!==i?"listHeader":"listHeader";s+="<div>",s+='<h1 style="display:inline-block; vertical-align:middle;" class="'+l+'">'+Globalize.translate("HeaderLatestTvRecordings")+"</h1>",s+='<a href="livetv.html?tab=3" onclick="LibraryBrowser.showTab(\'livetv.html\',3);" class="clearLink" style="margin-left:2em;"><paper-button raised class="more mini"><span>'+Globalize.translate("ButtonMore")+"</span></paper-button></a>",s+="</div>"}s+=a()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',s+=LibraryBrowser.getPosterViewHtml({items:r.Items,shape:n(),showTitle:!0,showParentTitle:!0,coverImage:!0,lazy:!0,showDetailsMenu:!0,centerText:!0}),s+="</div>",t.innerHTML=s,ImageLoader.lazyChildren(t),e(t).createCardMenus()})}window.Sections={loadRecentlyAdded:o,loadLatestChannelMedia:m,loadLibraryTiles:h,loadResume:v,loadNextUp:u,loadLatestChannelItems:y,loadLatestLiveTvRecordings:g,loadlibraryButtons:l,loadLatestMovies:d,loadLatestEpisodes:c}}(jQuery,document);