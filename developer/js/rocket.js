// JavaScript Document
   
	  
function changes(id){
	  document.getElementById('imgbig').src ="images/img"+ id +"big.jpg";
	  correctPNG()
	  }

function detailTig(id){
   
    
	document.getElementById("tig1").style.display = "none";
	document.getElementById("tig2").style.display = "none";
	document.getElementById("tig3").style.display = "none";
   document.getElementById(id).style.display = "block";
   //Heght();
}

function display(id,num){
	
	for(var i=1;i<=5;i++){
	 document.getElementById(id+i).style.display = 'none'
	}
    document.getElementById(id+num).style.display = 'block';
    //Heght();
    
	
}

function displayAPP(id,num){
	
	for(var i=1;i<=5;i++){
	 document.getElementById(id+i).style.display = 'none'
	}
   document.getElementById(id+num).style.display = 'block';
    //Heght();
}


function displayTest(id,num){
	
	for(var i=1;i<=4;i++){
	 document.getElementById(id+i).style.display = 'none'
	}
   document.getElementById(id+num).style.display = 'block';
     //Heght();

}
function displayTest6(id,num){
	
	for(var i=1;i<=6;i++){
	 document.getElementById(id+i).style.display = 'none'
	}
   document.getElementById(id+num).style.display = 'block';
   
     //Heght();

}
function displaybbs(id,num){
	
	for(var i=1;i<=2;i++){
	 document.getElementById(id+i).style.display = 'none'
	}
   document.getElementById(id+num).style.display = 'block';
     //Heght();

}


$(document).ready(function(){
    $("#trnone").mouseover(function(){
	   $(this).addClass("out");}).mouseout(function(){
	   $(this).removeClass("out");})
    $(".userManinfor tr").mouseover(function(){
	   $(this).addClass("over");}).mouseout(function(){
	   $(this).removeClass("over");})
	
	 //$(".stripe tr:even").addClass("alt");
	 //$(".stripe tr:odd").addClass("odd");
});

/*
function windowHeight(){
	//alert(document.getElementById('mainleft'));
	if(document.getElementById('mainleft'))
		document.getElementById('mainleft').style.height = "auto";
	if(document.getElementById('mainright')!=null)
	   document.getElementById('mainright').style.height = "auto";
	if(document.getElementById('maincontant')!=null)
	   document.getElementById('maincontant').style.height = "auto";
	if(document.getElementById('navleft')!=null)
	   document.getElementById('navleft').style.height = "auto";
	if(document.getElementById('navright')!=null)
	   document.getElementById('navright').style.height = "auto";
	if(document.getElementById('maincontant')!=null){
		var sh=document.getElementById('maincontant').offsetHeight;
		document.getElementById('mainleft').style.height = sh+"px";
		document.getElementById('mainright').style.height = sh+"px";
	}
	
		
	   
	if(document.getElementById('navleft')) {  

      var ejnavleft = document.getElementById('navleft').offsetHeight;
      var ejnavright = document.getElementById('navright').offsetHeight;
      	
	   if(ejnavright>ejnavleft){
		   
		   //if(navigator.appName.indexOf("Microsoft")!=-1){
			   document.getElementById('navleft').style.height = ejnavright+"px";
		   //}else{         
			 //document.getElementById('navleft').style.height = ejnavright-23+"px";  
		   //}
	   }
	   if(ejnavleft>ejnavright){
		   document.getElementById('navright').style.height = ejnavleft+"px";
	   }
	   if(ejnavright = ejnavleft) return;
	   
	}
}
*/



function changepic(id,num){
var picOver = new Image();picOver.src = 'images/' + id + 'on.jpg';
var picOut = new Image();picOut.src = 'images/' + id + '.jpg';
var picOverG = new Image();picOverG.src = 'images/' + id + 'on.gif';
var picOutG = new Image();picOutG.src = 'images/' + id + '.gif';
var photo = document.getElementById(id);
var ov = 'overG';ou = 'outG';ovG = 'over';ouG = 'out';
if (num == ov) {photo.src = picOver.src;}
if (num == ou) {photo.src = picOut.src; }
if (num == ovG) {photo.src = picOverG.src;}
if (num == ouG) {photo.src = picOutG.src; }
}


function vote(id,Close){
	
	document.getElementById(id).style.display = 'block';
	document.getElementById(Close).style.display = 'none'
   	}
	
	
function votesover(id){
	  
	if(id == 1){
		document.getElementById('detailstar01').src ='images/detailstar01.gif';
		document.getElementById('starH').innerHTML ='很一般'
	}
	if(id == 2){
		document.getElementById('detailstar01').src ='images/detailstar01.gif';
		document.getElementById('detailstar02').src ='images/detailstar01.gif';
		document.getElementById('starH').innerHTML ='一般'
	}
	if(id == 3){
		document.getElementById('detailstar01').src ='images/detailstar01.gif';
		document.getElementById('detailstar02').src ='images/detailstar01.gif';
		document.getElementById('detailstar03').src ='images/detailstar01.gif';
		document.getElementById('starH').innerHTML ='不错'
		
	}
	if(id == 4){
		document.getElementById('detailstar01').src ='images/detailstar01.gif';
		document.getElementById('detailstar02').src ='images/detailstar01.gif';
		document.getElementById('detailstar03').src ='images/detailstar01.gif';
		document.getElementById('detailstar04').src ='images/detailstar01.gif';
		document.getElementById('starH').innerHTML ='很不错'
	}
	if(id == 5){
		document.getElementById('detailstar01').src ='images/detailstar01.gif';
		document.getElementById('detailstar02').src ='images/detailstar01.gif';
		document.getElementById('detailstar03').src ='images/detailstar01.gif';
		document.getElementById('detailstar04').src ='images/detailstar01.gif';
		document.getElementById('detailstar05').src ='images/detailstar01.gif';
		document.getElementById('starH').innerHTML ='相当不错'
	}
   	}
	
function votesout(id){

	    document.getElementById('detailstar01').src ='images/detailstar01on.gif';
		document.getElementById('detailstar02').src ='images/detailstar01on.gif';
		document.getElementById('detailstar03').src ='images/detailstar01on.gif';
		document.getElementById('detailstar04').src ='images/detailstar01on.gif';
		document.getElementById('detailstar05').src ='images/detailstar01on.gif';
		document.getElementById('starH').innerHTML = ''
	
}

function changesame(id,num){

var picOverG = new Image();picOverG.src = 'images/down02on.gif';
var picOutG = new Image();picOutG.src = 'images/down02.gif';
var photo = document.getElementById(id);
var ovG = 'over';ouG = 'out';
if (num == ovG) {photo.src = picOverG.src;}
if (num == ouG) {photo.src = picOutG.src; }
}
