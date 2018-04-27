// var word = {
// 	"a": "M86.035,167.578l-2.637-12.012c24.805-0.259,43.929-4.053,57.373-11.377c13.443-7.324,20.198-17.984,20.264-31.982c0-8.724-3.271-16.211-9.814-22.461s-15.479-10.84-26.807-13.77c-8.594,22.07-22.104,41.586-40.527,58.545c-18.425,16.96-37.143,25.439-56.152,25.439c-8.854,0-15.69-2.49-20.508-7.471C2.408,147.51,0,140.495,0,131.445c0-12.759,4.932-24.69,14.795-35.791c9.863-11.099,22.574-19.742,38.135-25.928c-0.195-5.078-0.293-10.123-0.293-15.137c0-5.078,0.098-10.025,0.293-14.844H4.59V26.953h49.023C54.263,17.188,54.98,8.203,55.762,0l15.234,0.195c-0.847,6.967-1.66,15.69-2.441,26.172h90.234V39.16H67.676c-0.456,7.487-0.684,14.323-0.684,20.508l0.098,5.469c10.22-2.669,20.669-4.004,31.348-4.004c22.33,0.065,40.901,4.59,55.713,13.574c14.811,8.984,22.217,21.68,22.217,38.086c0,17.644-8.285,31.186-24.854,40.625c-16.569,9.439-37.549,14.16-62.939,14.16H86.035z M53.711,83.496c-10.417,5.078-19.614,11.948-27.588,20.605c-7.976,8.659-11.963,17.026-11.963,25.098c0,11.85,4.883,17.773,14.648,17.773c10.22,0,21.353-3.906,33.398-11.719C58.04,121.062,55.208,103.809,53.711,83.496z M109.766,73.438c-3.386-0.325-6.772-0.488-10.156-0.488c-10.808,0-21.518,1.694-32.129,5.078c0.845,17.514,2.962,33.594,6.348,48.242C88.802,112.858,100.781,95.249,109.766,73.438z"
// }


$(function(){
	var canvas = this.__canvas = new fabric.Canvas('canvas');
	fabric.Object.prototype.transparentCorners = false;

	fabric.loadSVGFromURL('svg/a.svg', function(objects, options) {
    	var shape = fabric.util.groupSVGElements(objects, options);
		    canvas.add(shape.scale(0.6));
		    shape.set({ left: 200, top: 100 }).setCoords();
		    canvas.renderAll();

	    canvas.forEachObject(function(obj) {
	      var setCoords = obj.setCoords.bind(obj);
	      obj.on({
	        moving: setCoords,
	        scaling: setCoords,
	        rotating: setCoords
	      });
	    })
 	}); // end fabric

 	fabric.loadSVGFromURL('svg/i.svg', function(objects, options) {
    	var shape = fabric.util.groupSVGElements(objects, options);
		    canvas.add(shape.scale(0.6));
		    shape.set({ left: 0, top: 100 }).setCoords();
		    canvas.renderAll();
 	}); // end fabric

 	fabric.loadSVGFromURL('svg/u.svg', function(objects, options) {
    	var shape = fabric.util.groupSVGElements(objects, options);
		    canvas.add(shape.scale(0.6));
		    shape.set({ left: 0, top: 300 }).setCoords();
		    canvas.renderAll();
 	}); // end fabric



 	$("#save").click(function () {
    	html2canvas($("#content"), {
    		allowTaint: true,
    		taintTest: false,
			onrendered: function(canvas) {
		    	var img = canvas.toDataURL("image/jpg");
        		var output = encodeURIComponent(img);
        		 // document.body.appendChild(canvas);
			    $.post("save.php",{
					img: img,
					name: "1"
				}, function(txt){
					$("#canvasIMG").attr("src",img);
				});
		  	},
		  	width: 1200,
			height: 600
		});

		return false;
    });
})