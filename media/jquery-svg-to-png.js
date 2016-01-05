$( document ).ready(function() {

  var heightComponents = ['height', 'paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'],
       widthComponents = ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'];

  var svgCalculateSize = function (el) {
      var gCS = window.getComputedStyle(el), // using gCS because IE8- has no support for svg anyway
          bounds = {
              width: 0,
              height: 0
          };
      heightComponents.forEach(function (css) { 
          bounds.height += parseFloat(gCS[css]);
      });
      widthComponents.forEach(function (css) {
          bounds.width += parseFloat(gCS[css]);
      });
      return bounds;
  };

  var autodl = false;
  var scale = 1.0;
  var change = false;

  $.fn.SVG2PNG = function() {
    // this image substitute
    var that = $(this)[0];
    // get original file name and change extension to png
    var fname = that.src.split('/').slice(-1).pop().replace('.svg', '.png');
    // crate temporary canvas and context for image
    var canvas = document.createElement("canvas");
    // get image width and height of the old image
    var size = svgCalculateSize(that);
    // set image canvas size for the new image
    canvas.width = 1+(size.width*scale);
    canvas.height = 1+(size.height*scale);
    var ctx = canvas.getContext('2d');
    // attach image to canvas
    ctx.drawImage(that, 0, 0);
    // generate png version of the image on the canvas
    var imgsrc = canvas.toDataURL("image/png");
    that.onload = function() {
      // automatic download image
      if (autodl) {
        var a = document.createElement("a");
        a.download = fname;
        a.href = imgsrc;
        a.click();
      }
    }
    // change old image to new one
    if (change) {
      that.src = imgsrc;
    }
  };
  // loop over all images
  $("img").
    // filter only svg images
    filter(function() {
      return this.src && this.src.indexOf('.svg') > -1;
    }).
    // apply svg to png function
    each(function() {$(this).SVG2PNG();});

});