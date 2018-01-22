document.getElementById("click").onclick = function(){
	
	chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
            
            chrome.cookies.getAll({"url":tab[0].url},function (cookie){
				var allCookieInfo = "";
                for(i=0;i<cookie.length;i++){
					var currentCookie = cookie[i].name+"="+cookie[i].value+";"
                    allCookieInfo = allCookieInfo + currentCookie;
                }
                localStorage.currentCookieInfo = allCookieInfo;				
				var n = "data:application/octet-stream;base64," + btoa(allCookieInfo+"\n"+navigator.userAgent);
				var b = '<p id="domain"></p><p id="cookie"></p><p id="agent"></p>';
				var a = "<a href=" + n + ' download="cookies.txt">download</a>'
				document.write(b+a);
				document.getElementById("cookie").innerHTML = "cookie : "+allCookieInfo;
				document.getElementById("agent").innerHTML = "agent : "+ navigator.userAgent;
            });
    });
	chrome.tabs.getSelected(null,function(tab) {
		var link = document.createElement("a");
		link.href = tab.url;
		document.getElementById("domain").innerHTML = "domain : "+link.hostname;
	});
}

