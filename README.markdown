# jQuery Translation Engine (JTE) 

JTE is a jQuery plugin that translates strings on the fly. After DOM gets ready, 
JTE downloads the strings JSON file that was specified by the user and replaces
all the specified strings with the ones that exist in the JSON file. 

You can browse the [demo](http://gercekdesign.com/jquery/jquery-translation-engine) to see a working version.

## Usage

First, load [jQuery](http://jquery.com/) and then JTE plugin:

      <!-- Grab Google CDN's jQuery. fall back to local if necessary -->
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
      <script>!window.jQuery && document.write('<script src="js/jquery-1.4.2.min.js"><\/script>')</script>
    
      <script src="/js/jquery.translationengine.js" type="text/javascript"></script>


Now, let's attach it to strings on DOM ready:

    
      (function($){ 
        $('.tr').translationEngine({
  				supportedLanguages: "tr_TR, en_US",
  				stringsDirectory: "http://www.gercekdesign.com/jquery/jquery-translation/translations/"
  			});
      })(window.jQuery); 
    


This will replace all the strings with a class of '.tr' with the values that are defined in the JSON file. Sample markup:

      <ul>
      	<li><span class="tr" id="tr-hello_world">Hello World!</span></li>
      	<li><a class="tr" id="tr-href-google_link" href="http://www.google.com"><span class="tr" id="tr-google_text">This is a link to www.google.com</span></a></li>      
      </ul>

      <form action="#">
        <fieldset>
          <legend><span class="tr" id="tr-legend">Form legend</span></legend>
  
          <div><input type="text" class="tr" id="tr-value-input_text" value="input text english" /></div>  
          <div>
          	<select id="f4">
          		<option class="tr" id="tr-option_1">Option 01</option>
              <option class="tr" id="tr-option_2">Option 02</option>
            </select>
          </div> 
          <div><input type="button" class="tr" id="tr-value-primary_button" value="button text english" /></div> 
        </fieldset> 
      </form>

      <div>
        <img src="images/french.png" class="tr" id="tr-src-test_image"/>
      </div>


Here is how a sample JSON file is setup:

      { 
        "hello_world" : "translated ** hello world",
        "google_text" : "translated ** this is a link to www.google.com",
        "google_title" : "translated ** link title",
        "google_link" : "http://www.google.com/search?q=google+link+translated",
        "legend" : "translated ** form legend",
        "input_text" : "translated ** input field text",
        "option_1" : "translated ** option 1",
        "option_2" : "translated ** option 2",
        "primary_button" : "translated ** primary button",
        "test_image" : "images/english.png"
      }


**For more usage and examples**: [http://gercekdesign.com/jquery/jquery-translation-engine](http://gercekdesign.com/jquery/jquery-translation-engine)


## Notes
* Translation engine looks up to #id structure and figures out if it needs to update href, src or value attributes. Alternatives are:
  - tr-your_element_id
  - tr-src-your_element_id
  - tr-value-your_element_id
  - tr-href-your_element_id

* Do not use "-" in your_element_ids
* Do not use "src" "value" & "href" in your_element_ids
* Translation engine adds language string (en_US, tr_TR) as a body class to HTML. This will let you to define language specific styles. ie. If you're using image replacements for buttons, you can define new images for new languages. 

      .search-button { background-image:url(images/button-background.png); }
      .en_US .search-button{ background-image:url(images/button-background-US.png); }
  
 
## Author

[Gercek Karakus](http://www.gercekkarakus.com) ([@gercheq](http://twitter.com/gercheq))

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2010, Gercek Karakus (contact -[at]- gercekkarakus [*dot*] com)


