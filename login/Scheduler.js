$(function () {
      var isMouseDown = false;
	  var $startDate;
	  var $endDate;
	  var $id;
      $("#scheduler td")
        .mousedown(function () {
		$id=$(this).attr("id");
		console.log($id);
          isMouseDown = true;
		  if($(this).attr("select")=="T"){
			  $(this).attr("select", "F");
			  $startDate=null;
		  }else{
			  $(this).attr("select", "T");
			  $startDate=($(this).html());
		  }
		  console.log($(this).attr("select"));
          $(this).toggleClass("highlighted");
          return false; // prevent text selection
        })
        .mouseover(function () {
          if (isMouseDown && $(this).attr("id")==$id) {
			if($(this).attr("select")=="T"){
			  $(this).attr("select", "F");
			}else{
			  $(this).attr("select", "T");
			  if($startDate==null){
				  $startDate=($(this).html());
			  }
			}
            $(this).toggleClass("highlighted");
          }
        })
		.mouseup(function(){
			if($(this).attr("select")=="T"){
				$endDate=($(this).html());
				console.log($startDate);
				console.log($endDate);
				if((parseInt($startDate))>(parseInt($endDate))){
					var temp=$startDate;
					$startDate=$endDate;
					$endDate=temp;
				}else if((parseInt($startDate))==(parseInt($endDate))){
					bootbox.confirm(("You want to select "+$startDate+" o'clock?"), function(result){ console.log('This was logged in the callback: ' + result); });
				}else{
					bootbox.confirm(("You want to select from "+$startDate+ " o'clock to "+ $endDate+" o'clock?"), function(result){ console.log('You should write the save to DB stuff ' + result); });
				}
			}
		})
        .bind("selectstart", function () {
          return false; // prevent text selection in IE
        });

      $(document)
        .mouseup(function () {
          isMouseDown = false;
        });
    });