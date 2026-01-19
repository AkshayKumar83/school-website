$(document).ready(function(){

// banner js start here		
	var startSlide = 1;
	// Get slide number if it exists
	if (window.location.hash) {
		startSlide = window.location.hash.replace('#','');
	}
	// Initialize Slides
	$('#slideshome').slides({
		preload: true,
		preloadImage: 'img/loading.gif',
		generatePagination: true,
		play: 4000,
		pause: 3500,
		hoverPause: true,
		start: startSlide
	});
	
	$('#slides2').slides({
			preload: true,	
			generateNextPrev: true,
			generatePagination: false,
			play: 3000
		});

// tab js start here
	var tabContainers = $('div.tabs > div');
            $('div.tabs ul.tabNavigation a').click(function() {
                tabContainers.hide();
                tabContainers.filter(this.hash).show();
                $('div.tabs ul.tabNavigation a').removeClass('selected');
                $(this).addClass('selected');
                return false;
      }).filter(':first').click();

// drop down js start here
	$("ul.mainNav li").hover(function(){    
        $(this).addClass("active");
        $('div.sub_menu',this).css('visibility', 'visible');
    }, function(){  
        $(this).removeClass("active");
        $('div.sub_menu',this).css('visibility', 'hidden');
    });

// Top Buttonj js start here
	var duration = 500;
	var offset = 300;
	$('<div class="topButton">Top</div>').appendTo('body');
	$(window).scroll(function() {
	if($(this).scrollTop()>offset){$('.topButton').fadeIn(duration);}
	else{$('.topButton').fadeOut(duration);}
	});
	$('.topButton').click(function() {
	$('html, body').animate({scrollTop:'0'}, duration);
	return false;
	});
	
// photo gallery js start here

	var $descriptions = $('#carousel-descriptions').children('li'),
	$controls = $('#carousel-controls').find('span'),
	$carousel = $('#carousel')
		.roundabout({childSelector:"img", minOpacity:1, autoplay:true, autoplayDuration:2000, autoplayPauseOnHover:true })
		.on('focus', 'img', function() {
			var slideNum = $carousel.roundabout("getChildInFocus");
			
			$descriptions.add($controls).removeClass('current');
			$($descriptions.get(slideNum)).addClass('current');
			$($controls.get(slideNum)).addClass('current');
		});

	$controls.on('click dblclick', function() {
		var slideNum = -1,
			i = 0, len = $controls.length;
	
		for (; i<len; i++) {
			if (this === $controls.get(i)) {
				slideNum = i;
				break;
			}
		}
		
		if (slideNum >= 0) {
			$controls.removeClass('current');
			$(this).addClass('current');
			$carousel.roundabout('animateToChild', slideNum);
		}
	});

});