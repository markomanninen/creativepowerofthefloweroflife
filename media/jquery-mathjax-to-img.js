"use strict";

/* 

jQuery plugin to convert mathjax (https://www.mathjax.org/) svg canvas to inline svg image 
or inline png image. Requires jQuery to be preloaded.

You can parametrize plugin via script url parameters:

<script src="jquery-mathjax-to-img.js?png=1&dlpng=0&dlsvg=0&scale=4&output=0"></script>

where:

png = 1|0 or true|false
dlpng = 1|0 or true|false, requires png=1 to work
dlsvg = 1|0 or true|false
scale = optional pre-scaling, default is 4

Plugin/script is an enhanged version of these previous work:

- https://gist.github.com/gustavohenke/9073132
- https://github.com/jmorais/mathjax-to-png/blob/master/jquery-mathjax-to-png.js

See also: http://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser

*/

$( document ).ready(function() {

  /* SCRIPT FILE NAME */

  var file_name = 'jquery-mathjax-to-img.js';

  /* HELPER FUNCTIONS */

  // global unique identifier: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function guid() {
  	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  }
  // automatic download image. some browsers may ask permission to downloads multiple files
  function dlimg(id, data, size) {
    var a = document.createElement("a");
    a.download = id;
    a.href = data;
    a.click();
    if (output) {
    	var img = '<img width="' + size.width + '" height="' + size.height + '" src="' + id + '" />';
    	console.log(img);
    }
  }

  // url query parameter parser: http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
  function queryParams(name, url) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
  }

  // get script location from DOM or
  function getLocation(file_name, tag) {
  	var loc = null;
  	var tag = tag || 'script';
  	if (file_name) {
	  var scripts = document.getElementsByTagName(tag);
	  for (var i=0; i<scripts.length; i++) {
	    if (scripts[i].src.indexOf(file_name) > -1) {
	      loc = scripts[i].src;
	      break;
	    }
	  }
	}
	return loc || location.href || document.location || document.location.href;
  }

  /* PARAMETERS */

  // location to extract script parameters
  var loc = getLocation(file_name, 'script');
  // convert processed svg image yet to png
  var png = queryParams('png', loc) == 1 || queryParams('png') == 'true';
  // download converted image automatic, separate png and svg flags
  var dlpng = queryParams('dlpng', loc) == 1 || queryParams('dlpng') == 'true';
  var dlsvg = queryParams('dlsvg', loc) == 1 || queryParams('dlsvg') == 'true';
  // image scaling factor, for temporarily increasing image size and then scaling back
  // this gives better image quality and compression results for png images
  var scale = queryParams('scale', loc) || 4.0;
  scale = parseFloat(scale);
  // should you output image tags to console
  var output = queryParams('output', loc) == 1 || queryParams('output') == 'true';

  /* PLUGIN */

  // main image to svg & png converter jquery extension
  $.fn.toImage = function() {
    // this image substitute
    var that = $(this);
    // MathJax text content. maybe: .replace(/"/g, '\\"') ?
    var mjtxt = $(this).parent()[0].textContent;
    // new indentifier
    var id = guid();
    // create new ids for svg elements: id, path, use
    // without cloning and new ids svg conversion doesn't work
    var $glyphs = $("#MathJax_SVG_glyphs").clone();
    $glyphs.attr("id", "MathJax_SVG_glyphs-" + id).find("path").each(function(j, path) {
      $(path).attr("id", $(path).attr("id") + "-" + id);
    });
    // why couldn't svg be hidden in deeper structure?!
    var svg = $(this)[0].children[0];
    $(svg).prepend($glyphs);
    that.attr("id", "svg-"+id);
    that.find("use").each(function (j, use) {
      $(use).attr("href", $(use).attr("href") + "-" + id);
    });
    // get new image size factors from svg
    var size = $(svg)[0].getBoundingClientRect();
    var w = size.width*scale;
    var h = size.height*scale;
    // create new temporary image
    var img = new Image;
    img.setAttribute('class', 'svg');
    img.id = id;
    img.alt = mjtxt;
    img.title = mjtxt;
    // temporarily scale image to prevent font clipping the bottom of the glyph
    if (png) {
	  img.width = w;
	  img.height = h;
	}
    // after loading inline svg, change it to png
    img.onload = function() {
      // scale image back to original size / adjust height for svg bottom clipping
      img.width = w/scale;
      img.height = (h/scale)+(png ? 0 : 2);
      // prevent infinite loop if png image already exists
      if (png && img.src.indexOf('data:image/png;') == -1) {
      	// change class accordingly
        img.setAttribute('class', 'png');
        // temporary canvas for image: http://www.w3schools.com/tags/canvas_drawimage.asp
        var canvas = document.createElement("canvas");
        // set canvas size to real width and height
        // this prevents final png image to be shown on overly big background canvas
        canvas.width = w;
        canvas.height = h;
        // draw new image with context object
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // change image to png
        var imgsrc = canvas.toDataURL("image/png");
        // set png inline image -> reloads image
        img.src = imgsrc;
        // automatic download png image
        if (dlpng) dlimg(img.id + ".png", imgsrc, size);
      }
    };
    // generate svg xml from image
    var svg_xml = (new XMLSerializer).serializeToString($(svg)[0]);
    // make inline svg image
    var data = window.btoa(unescape(encodeURIComponent(svg_xml)));
    // automatic download svg image
    if (dlsvg) dlimg(img.id + ".svg", "data:image/svg+xml;base64," + data, size);
    // set svg inline image
    img.src = "data:image/svg+xml;base64," + data;
    // add new image after old image and remove old image on the DOM
    that.after(img).remove();
  };
  // loop over all svg containers after matjax hub has finished its job
  MathJax.Hub.Register.StartupHook("End", function() {
    $(".MathJax_SVG").each(function(){$(this).toImage()});
  });
});
