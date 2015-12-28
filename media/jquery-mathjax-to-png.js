$( document ).ready(function() {
  $.fn.toImage = function() {
    var i = (new Date()).getTime();
    var $glyphs = $("#MathJax_SVG_glyphs").clone();
    $glyphs.attr("id", "MathJax_SVG_glyphs-" + i).find("path").each(function(j, path) {
      $(path).attr("id", $(path).attr("id") + "-" + i);
    });
    var svg = $(this)[0].children[0];
    $(svg).prepend($glyphs);
    $(this).attr("id", "svg-"+i);
    $(this).find("use").each(function (j, use) {
      $(use).attr("href", $(use).attr("href") + "-" + i);
    });
    var svg_xml = (new XMLSerializer).serializeToString($(svg)[0]);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.setAttribute('class', 'svg');
    img.id = 'svg-'+i;
    img.onload = function(){ctx.drawImage(img,0,0);};
    img.src = "data:image/svg+xml;base64,"+window.btoa(unescape(encodeURIComponent(svg_xml)));
    $(this).after(img).remove();
  };
  MathJax.Hub.Register.StartupHook("End", function () {
    $(".MathJax_SVG").each(function(svg){$(this).toImage()});
  });
});