var canvas;
$(function(){
	svgimg();
	
	canvas = this.__canvas = new fabric.Canvas('canvas', { width: $(window).width(), height: ($(window).height() - 100) });
	fabric.Object.prototype.transparentCorners = false;

	/*fabric.loadSVGFromURL('txt/txt1.svg', function(objects, options) {
    	var shape = fabric.util.groupSVGElements(objects, options);
		    canvas.add(shape.scale(1.7));
		    shape.set({ left: 200, top: 400 }).setCoords();
		    canvas.renderAll();

	    canvas.forEachObject(function(obj) {
	      var setCoords = obj.setCoords.bind(obj);
	      obj.on({
	        moving: setCoords,
	        scaling: setCoords,
	        rotating: setCoords
	      });
	    })
 	});*/ // end fabric

 	var sizeW = sizeH = 500;
 	var posX = ($(window).width() - sizeW) / 2;
 	var posY = ($(window).height() - 100 - sizeH) / 2;

 	$("#save").click(function () {
    	screenshot($("#canvas"), {
		  x: posX,
		  y: posY,
		  width: sizeW,
		  height: sizeH,
		  useCORS: true
		}).then(c => {
			//document.body.appendChild(c);
			$("#showimg").removeClass('hide');
			var img = c.toDataURL("image/jpg");
        	var output = encodeURIComponent(img);
        	$("#canvasIMG").attr("src",img);

			setTimeout(function(){
				$(".saving").addClass('hide');
				$(".resultImg").removeClass('hide');
			},3000);
		})

    	$(this).addClass('hide');
		return false;
    });

 	$("#select").click(function(event) {
 		add();
 		return false;
 	});

 	$("#selectWrap").on('click', 'a', function(event) {
 		event.preventDefault();

 		var txt = $(this).attr("href");
 		add(txt);
 	});

    $("#reset").click(function(event) {
    	$("#save").removeClass('hide');
		$(".resultImg, #showimg").addClass('hide');

    	return false;
    });
});

function add(txt) {
	fabric.loadSVGFromURL(txt, function(objects, options) {
    	var shape = fabric.util.groupSVGElements(objects, options);
		    canvas.add(shape.scale(4.5));
		    shape.set({ left: 100, top: 400 }).setCoords();
		    canvas.renderAll();
 	}); // end fabric

	canvas.add(red, blue, green);
}

function screenshot(element, options = {}) {
  // our cropping context
  let cropper = document.createElement('canvas').getContext('2d');
  // save the passed width and height
  let finalWidth = options.width || window.innerWidth;
  let finalHeight = options.height || window.innerHeight;
  // update the options value so we can pass it to h2c
  if (options.x) {
    options.width = finalWidth + options.x;
  }
  if (options.y) {
    options.height = finalHeight + options.y;
  }
  // chain h2c Promise
  return html2canvas(element, options).then(c => {
    // do our cropping
    cropper.canvas.width = finalWidth;
    cropper.canvas.height = finalHeight;
    cropper.drawImage(c, -(+options.x||0), -(+options.y||0));
    // return our canvas
    return cropper.canvas;
  });
}

function svgimg(){
	$('img.svgimg').each(function(){
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
    
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
    
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            
            // Check if the viewport is set, else we gonna set it if we can.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
    
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    
    });	
}