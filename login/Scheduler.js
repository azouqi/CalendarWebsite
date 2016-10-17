$(function () {
      var isMouseDown = false;
	  var $startDate;
	  var $endDate;
	  var $id;
	  var cc;
      $("#scheduler td")
        .mousedown(function () {
		$id=$(this).attr("id");
		console.log($id);
          isMouseDown = true;
			$startDate=($(this).html());
		  //array to save cell objects
		  cc=new cellsCollection();
		  cc.addCell(new cellObject(parseInt($(this).html()),parseInt($(this).html())+1, $(this)));
          $(this).addClass("highlighted");
          return false; // prevent text selection
        })
        .mouseover(function () {
          if (isMouseDown && $(this).attr("id")==$id) {
			$startDate=($(this).html());
			//cell object with one hour
			cc.addCell(new cellObject(parseInt($(this).html()),parseInt($(this).html())+1,$(this)));
            $(this).addClass("highlighted");
          }
        })
		.mouseup(function(){
				bootbox.confirm(("You want to select from "+cc.cellArray[0].startDate.hour+":<select id='startDateMin'><option>00</option><option>15</option><option>30</option><option>45</option></select> to "+ 
				cc.cellArray[cc.cellArray.length-1].startDate.hour+":<select id='endDateMin'><option>00</option><option>15</option><option>30</option><option>45</option></select>"), function(result){ 
					if(!result){
						$(cc.cellArray).each(function(){
						(this.renderObject.removeClass("highlighted"));
						});
						cc=null;
					}else{
						cc.cellArray[0].startDate.minute=parseInt($('#startDateMin option:selected').text());
						var temp=$('#endDateMin option:selected').text();
						if(temp!="00"){
							cc.cellArray[cc.cellArray.length-1].endDate.hour=parseInt(cc.cellArray[cc.cellArray.length-1].endDate.hour)-1;
							cc.cellArray[cc.cellArray.length-1].endDate.minute=parseInt(temp);
						}
						console.log(cc);
						cc.render();
					}
				});
		})
        .bind("selectstart", function () {
          return false; // prevent text selection in IE
        });

      $(document)
        .mouseup(function () {
          isMouseDown = false;
        });
    });