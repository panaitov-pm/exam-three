;(function($) {

	var scrollWidth = scrollbarWidth();
	var $navList = $('.navigation__list');
	var $navMenu = $('.navigation');

	$(function() {

		//Init WOW
		new WOW().init({   
            mobile: false 
		});

		//Init smoothscroll
		SmoothScroll({
			touchpadSupport: true
		});

		// Sliders
		$('.works-slider').slick({
			arrows: true,
			dots: true,
			slide: '.works-slider__item',
			speed: 1200,
			slidesToShow: 1,
			prevArrow: '.works-slider__prev',
			nextArrow: '.works-slider__next',
			responsive: [
				{
				    breakpoint: 768,
				    settings: {
				        arrows: false
				    }
				},
			]
			//'autoplay': true,
			//'autoplaySpeed': 2000,
		}); // end works-slider

		$('.team-slider').slick({
				arrow: true,
	  			slidesToShow: 3,
	  			slidesToScroll: 2,
	  			slide: '.team-slider__item',
	  			speed: 1200,
				infinite: true,
				//autoplay: true,
				//autoplaySpeed: 2500,
				prevArrow: '.team-slider__prev',
				nextArrow: '.team-slider__next',
				responsive: [
					{
					    breakpoint: 992,
					    settings: {
					        slidesToShow: 2,
					        slidesToScroll: 1
					    }
					},
					{
					    breakpoint: 725,
					    settings: {
					        slidesToShow: 1,
					        slidesToScroll: 1
					    }
					}
				]
		}); // end team-slider

		//Scroll page to need section
		$(document).on('click', '.navigation__link, .scroll-top__link', function(event) {
			event.preventDefault();

			var windowWidth = $(window).width() + scrollWidth;

			var currentElem = $(this).attr('class');
			var elementId = $(this).attr('href');
			var top = $(elementId).offset().top;

			if (currentElem == 'navigation__link'  && windowWidth <= 768) {
				$navList.slideUp();

				setTimeout(function() {
					$('body').animate({
						scrollTop: top
					}, 1200);
				}, 400);

			} else {
				$('body').animate({
					scrollTop: top
				}, 1200);
			}
		});// end click

		$(document).on('click', '.menu-toggle', function(event) {
			event.preventDefault();

			$navMenu.toggleClass('js-nav-open');
			$navList.slideToggle();
		}); // end click
	}); // end ready
	    
	var $map;
	var $coordinates;

	$(window).load(function() {

		$coordinates = {lat: -7.9307175, lng: 112.6376207};
		$centerMap = {lat: -7.937138, lng: 112.630148};

		var $map_options = {
	        center: $centerMap,  //new google.maps.LatLng(45.455626, 31.741017)
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP, //ROADMAP, HYBRID etc
			disableDefaultUI: true, //disable controls zooms icon
			scrollwheel: true, // disable map scroll
			draggable: true, // disable drag map with mouse
	    };

		var $map_div = $('#map')[0]; // [0] is important, if we use jQuery for a map
			$map = new google.maps.Map($map_div, $map_options);

		// Markers
		var $marker = new google.maps.Marker({
		    position: $coordinates,
		    map: $map, // variable of our map
		    title: 'Creative digital', // tooltip on hover
		    icon: 'assets/img/map-marker.png', // path relative index.html
		});
	}); // end load

	$(window).resize(function(event) {

		$map.setCenter($centerMap);

		var windowWidth = $(window).width() + scrollWidth;
		
		if(windowWidth <= 768 ) {
			$navList.slideUp();
			$navMenu.removeClass('js-nav-open');
		} else {
			$navList.show();

		}
	}); // end resize

	$(window).scroll(function(event) {

		var windowWidth = $(window).width() + scrollWidth;

		//Show scroll to top arrow 
		var headerHeight = $('#scroll-top').outerHeight();
		var scroll = $(window).scrollTop();
		var $scrollTop = $('.scroll-top');

		$scrollTop.addClass('js-scroll');

		setTimeout(function() {
			$scrollTop.removeClass('js-scroll');
		}, 300);

		if(scroll > headerHeight) {
			$scrollTop.addClass('js-scroll-top-show');
		} else {
			$scrollTop.removeClass('js-scroll-top-show');
		}

		//Hide mobile menu
		if(windowWidth <= 768) {
			$navList.slideUp();
			$navMenu.removeClass('js-nav-open');
		}
	}); // end scroll

	function scrollbarWidth() {
  		var documentWidth = parseInt(document.documentElement.clientWidth);
  		var windowsWidth = parseInt(window.innerWidth);
  		var scrollbarWidth = windowsWidth - documentWidth;
  		return scrollbarWidth;
	}

})(jQuery);