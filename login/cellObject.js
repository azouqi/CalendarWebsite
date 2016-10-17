var timeObject=function(hour, minute){
	this.hour=hour;
	this.minute=minute;
}

var cellObject=function(startDate, endDate, renderObject){
	this.startDate=new timeObject(startDate, 0);
	this.endDate=new timeObject(endDate, 0);
	//render prop
	this.renderTop=0;
	this.renderBottom=0;
	this.renderObject=renderObject;
}

cellObject.prototype.setStartDate=function(startDate){
	this.startDate=new timeObject(startDate, 0);
}

cellObject.prototype.setEndDate=function(EndDate){
	this.endDate=new timeObject(endDate, 0);
}


var cellsCollection=function(){
	this.cellArray=[];
}
cellsCollection.prototype.addCell=function(cell){
	var temp=true;
	for(var i=0; i<this.cellArray.length; i++){
		if(this.cellArray[i].renderObject.is(cell.renderObject)){
			temp=false;
		}
	}
	temp ? this.cellArray.push(cell): null;
}
cellsCollection.prototype.removeTop=function(){
	this.cellArray.shift();
}
cellsCollection.prototype.removeBottom=function(){
	this.cellArray.pop();
}
cellsCollection.prototype.setDuration=function(startDate, endDate){
	this.cellArray[0].setStartDate=startDate;
	this.cellArray[(this.cellArray.length)-1].setEndDate=endDate;
}
cellsCollection.prototype.render=function(){
	//set the top distance in cell to show the period of time
		this.cellArray[0].renderTop=100*((this.cellArray[0].startDate.minute)/60);
	//set the bottom distance in cell to show the period of time
		this.cellArray[(this.cellArray.length)-1].renderBottom=100*((this.cellArray[(this.cellArray.length)-1].endDate.minute)/60);
		for(var i=0; i<this.cellArray.length; i++){
			var divElm=document.createElement("div");
			var $elm=$(divElm);
			$elm.addClass('period');
			$elm.css("top", this.cellArray[i].renderTop+'%');
			$elm.css("bottom", this.cellArray[i].renderBottom+'%');
			this.cellArray[i].renderObject.append($elm);
		}
}
