// JavaScript Document

//Author: Felix M.

  
  $(document).ready(function() {
   // put all your jQuery goodness in here.
/////////////////////////////
// Timmer

time = 1;

setInterval(function() {
       // Do something every 2 seconds
	   $('#numSec').html(time++);
}, 1000);

$('#notice').show(400);

$('#bt').click(function() {

history.go(0);//mange cache well.
  //window.location.reload(); //doesn't deal well with cache...
  
  
});




/////////////////////////////
// GrabPhoto...


 yourKey = "XXXXXXXXXX"; 
 flickrURL = "http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key="+yourKey+"&extras=url_m%2C+url_l%2C+url_o&per_page=1&page=1&format=json" + "&jsoncallback=?"; 
 

 
  $.getJSON(flickrURL, function(data){
// alert(data.photos.photo[0].title); 
photo = data.photos.photo[0];
 title = data.photos.photo[0].title;
 owner = data.photos.photo[0].owner;
 url_m = data.photos.photo[0].url_m;
 url_l = data.photos.photo[0].url_l;
 url_o = data.photos.photo[0].url_o;
 
 if(url_l != undefined){
	 theUrl = url_l;
	 ratioImg = photo.width_l / photo.height_l ;  //w sur h
	}else if(url_o != undefined){
		theUrl = url_o; 
		ratioImg = photo.width_o / photo.height_o ;  //w sur h
	}else{
		theUrl = url_m; 
		ratioImg = photo.width_m / photo.height_m ;  //w sur h
	}
	



ratioScreen = (screen.width / screen.height );
ratioWindow = window.innerWidth / window.innerHeight;
//alert(ratioWindow);
// alert(title +" + "+ theUrl);

flickrPhotoPage = "http://www.flickr.com/photos/"+ owner +"/" + photo.id + "/";

$('#photoPageLink').attr('href', flickrPhotoPage);


if(ratioImg > ratioWindow){
	
	classRatio = "tall";
	
		activeW = window.innerHeight;
		ativeH = activeW / ratioImg;
		exess = window.innerHeight - ativeH; //le 50 est pour que l'image sois un peu plus haut que le centre reel.
		//left padding = 
		centeringMargin = Math.floor(exess/2); //should be added as a left margin...
	
	}else{
		
		classRatio = "wide";
		activeH = window.innerHeight;
		ativeW = activeH * ratioImg;
		exess = window.innerWidth - ativeW;
		//left padding = 
		centeringMargin = Math.floor(exess/2); //should be added as a left margin...
		}

 $("<img/>").attr("src", theUrl).attr("class", classRatio).attr("alt", title).appendTo("#images");
      //.wrap("<a href='" + theUrl + "'></a>");
	  
 $(".wide").css('left', centeringMargin);
 $(".tall").css('top', centeringMargin);
	  
//on calcule la marge restante une fois l'image agrandie afin d'avoir une une image centree. 
	  
 /*
  $.each(data.items, function(i,item){
    $("<img/>").attr("src", item.media.m).appendTo("#images")
      .wrap("<a href='" + item.link + "'></a>");
  });
  
  */
});

  
 
   });
  
  