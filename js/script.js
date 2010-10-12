/* 
** Author: Gercek Karakus
**
*/
function mtSetCookie(name, value, expires, path, domain, secure) {
    if (domain && domain.match(/^\.?localhost$/))
        domain = null;
    var curCookie = name + "=" + escape(value) +
        (expires ? "; expires=" + expires.toGMTString() : "") +
        (path ? "; path=" + path : "") +
        (domain ? "; domain=" + domain : "") +
        (secure ? "; secure" : "");
    document.cookie = curCookie;
}


function mtGetCookie(name) {
    var prefix = name + '=';
    var c = document.cookie;
    var cookieStartIndex = c.indexOf(prefix);
    if (cookieStartIndex == -1)
        return '';
    var cookieEndIndex = c.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1)
        cookieEndIndex = c.length;
    return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}


function mtDeleteCookie(name, path, domain, secure) {
    if (mtGetCookie(name)) {
        if (domain && domain.match(/^\.?localhost$/))
            domain = null;
        document.cookie = name + "=" +
            (path ? "; path=" + path : "") +
            (domain ? "; domain=" + domain : "") +
            (secure ? "; secure" : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function changeLanguage(lang) {
  mtSetCookie('siteLanguage', lang, new Date(new Date().getTime()+(86400000*30)), "/");
  window.location.reload();
}


var oTranslations ={};

function translate(oStrings,targetEl){ 
  
	/* translate strings */
	$.each(oStrings, function(k,v){
							  
		if(targetEl){  
		  if(targetEl == "tr-"+k){
  		  $("#" + targetEl).html(v);
		  } 
		}
		else{
			// translate text
			$("#tr-" + k + ", span#tr-" + k).html(v); 
			
			// translate link attributes href and title
			$("a#tr-href-" + k).attr('href', v);		
			$("a#tr-title-" + k).attr('title', v); 
			
			// translate form elements
			$("input#tr-value-" + k).val(v);
			$("button#tr-value-" + k).val(v);  
			
			// translate image replacements
			$("img.s-tr-" + k).attr('src', v);
			$("div#bg-tr-" + k + ",span.bg-tr-" + k).css('background-image', v);	
			
			
			/*
			if (k == 'page_title'){ 
			   
        var words = new Array(); 
        words = $('title').html().split(' - '); 
        
        var newTitle = "";
        for( var i=0; i< words.length-1; i++){
          newTitle += words[i] + " - ";
        }
			  newTitle +=  v;
				document.title = newTitle; 
			} 
			if (k == 'meta_description')
				$('meta[name=description]').attr('content',v);
			if (k == 'meta_keywords')
				$('meta[name=keywords]').attr('content', v);  
				
			*/
		}
	});
	 
	 
	/* replace the existing font with Helvetica Neue Condensed with Cufon  
	Cufon.replace('.condensed');
	*/
	
	/* setup search default text 
	var searchDefaultText = $("#tr-search_desc").attr("value");
  
  $("#tr-search_desc").focus(function(){  
    if($(this).attr("value") == searchDefaultText) $(this).attr("value", "");  
  });  
  $("#tr-search_desc").blur(function(){  
     if($(this).attr("value") == "") $(this).attr("value", searchDefaultText);  
  });  
  */
  
	/* fade in new language */
	$('.tr').fadeIn(); 
	
	
}

 
$(function(){ 
  

	$('.tr').translationEngine({
		supportedLanguages: "tr_TR, en_US",
		stringsDirectory: "http://www.gercekdesign.com/jquery/jquery-translation/translations/"
	});
  
  var lang;
  var supportedLanguages = "tr_TR,en_US";

  lang=mtGetCookie('siteLanguage');
  if (!(supportedLanguages.indexOf(lang) > -1))
  	lang = null;

  if (!lang){
  	lang='en_US';
  	mtSetCookie('siteLanguage', lang, new Date(new Date().getTime()+(86400000*30)), "/");
  }
  
  $.ajax({
  	url:"http://www.gercekdesign.com/jquery/jquery-translation/translations/"+lang+".js",
  	complete: function(req) {
  		oTranslations = eval("(" + req.responseText + ")");
  		translate(oTranslations);
  	}
  }); 

 


});















