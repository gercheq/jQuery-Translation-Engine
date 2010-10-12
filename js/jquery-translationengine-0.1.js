/*
 * jQuery Translation Engine Plugin 
 * Examples and documentation at: http://jquery.gercekkarakus.com/translation-engine/
 * Copyright (c) 2010 Gercek Karakus
 * Version: 0.1 (10-10-2010)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.gercekkarakus.com/license.html
 * Requires: jQuery v1.4.2 or later
 */
 
 
(function($) {
					
	var ver = '0.1';
	var lang = '';
	var oTranslations = {}; 

					
  //
  // plugin definition
  //
  $.fn.translationEngine = function(options) {
		debug(this);
 		
		// build main options before element iteration
		var opts = $.extend({}, $.fn.translationEngine.defaults, options);
		
		lang = $.fn.translationEngine.getCookie('siteLanguage');
  	// if (!($.fn.translationEngine.supportedLanguages.indexOf(lang) > -1))
  	// 	lang = null;

  	if (!lang){
  		lang='en_US';
  		$.fn.translationEngine.setCookie('siteLanguage', lang, new Date(new Date().getTime()+(86400000*30)), "/");
  	}
  
    // Add language as class name to the body
    // in order to change styles in different languages
    // such as background images  
	  document.getElementsByTagName('body')[0].className += lang;
	  
	  
	  // Keep original pointer to this
	  // in order to reference it in ajax call
	  var originalThis = this;
		 
  	$.ajax({
  		url: opts.stringsDirectory + lang + ".js",
  		complete: function(req) {
  			oTranslations = eval("(" + req.responseText + ")"); 
				
				// String Translations should be made at this point 
				// after ajax call is completed.
    		// Iterate and reformat each matched element
    		return originalThis.each( function(){
    			$this = $(this);

    			// build element specific options
    			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;



          // gather information from element id
          // possible id alternatives are:
          // tr-your_element_id
          // tr-src-your_element_id
          // tr-value-your_element_id
          // tr-href-your_element_id
          //
          // DO NOT USE "-" in your_element_ids
          // DO NOT USE "src" "value" & "href" in your_element_ids
    			var substrings = this.id.split('-');

    			if(substrings[1] == "value"){
    				// translate form elements
    				$this.val(oTranslations[substrings[2]]); 
    			}
    			else if( (substrings[1] == "href") || (substrings[1] == "title") || (substrings[1] == "src")  ){
    				// translate link attributes href and title
    				// translate image attribute src
    				$this.attr(substrings[1], oTranslations[substrings[2]]);  
    			}
    			else{
    				// translate inline text
    				$this.html(oTranslations[substrings[1]]);
    			} 
 
    		});	
    		
    		
    		
				
  		} // end of ajax complete
  	});  // end of $.ajax
		
	

	
  };
	
	
  //
  // private function for debugging
  //
  function debug($obj) {
		if (window.console && window.console.log)
			window.console.log('translationEngine selection count: ' + $obj.size());
	}; 
	
	//
	//  Function - Set Cookie
	//	
	$.fn.translationEngine.setCookie = function(name, value, expires, path, domain, secure) { 
    if (domain && domain.match(/^\.?localhost$/))
        domain = null;
    var curCookie = name + "=" + escape(value) +
        (expires ? "; expires=" + expires.toGMTString() : "") +
        (path ? "; path=" + path : "") +
        (domain ? "; domain=" + domain : "") +
        (secure ? "; secure" : "");
    document.cookie = curCookie;
	}

	//
	//  Function - Get Cookie
	//
	$.fn.translationEngine.getCookie = function(name){ 
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
	

	//
	//  Function - Delete Cookie
	//
	$.fn.translationEngine.deleteCookie = function(name, path, domain, secure) {
    if (getCookie(name)) {
        if (domain && domain.match(/^\.?localhost$/))
            domain = null;
        document.cookie = name + "=" +
            (path ? "; path=" + path : "") +
            (domain ? "; domain=" + domain : "") +
            (secure ? "; secure" : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
	}
	
	
	//
	//  Function - Change Language
	//
	$.fn.translationEngine.changeLanguage = function(lang){
  	$.fn.translationEngine.setCookie('siteLanguage', lang, new Date(new Date().getTime()+(86400000*30)), "/");
  	window.location.reload();
	}

	
  //
  // Default Variables
	//
  $.fn.translationEngine.defaults = {
		stringsDirectory: '/translations/',
		supportedLanguages: 'en_US'
  };
	
//
// end of closure
//
})(jQuery);