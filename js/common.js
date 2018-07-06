$(function() {

	$(document).ready(function() {
		var $charsSlick = $('.chars-slider').slick({
				fade: true,
				autoplay: true,
				arrows: false
		});

		$('.chars-nav__item').click(function() {
				$charsSlick.slick('slickGoTo', $(this).index());
		});

		$(".toggle-mnu").click(function() {
			$(this).toggleClass("on");
			$("header nav").stop(true, true).slideToggle();
			return false;
		});

	});

	// up
		var $up = $('.up-button');
		$up.click(function(e){
				
				$('html, body').animate({scrollTop: 0}, 800);
			});

		$(document).scroll(function() {
			// var screenHeight = screen.height;
			if($(this).scrollTop() > screen.height){
				$up.addClass('active');
			}else{
				$up.removeClass('active');

			}
		});
	// end of up

	// scroll

	var menuLinks = $('header nav a');
			menuLinks.click(function(e){
				e.preventDefault();
				var location = $(this).attr('href'), //секция с id, равным href текущей ссылки
					sectionCoord = $(location).offset().top;
				$('html, body').animate({scrollTop: sectionCoord}, 800);
			});

	//end scroll

	// timer
			var myDate = new Date();
				// dateEnd = new Date();

			function correctDate(d, h, m) {
				myDate.setDate(myDate.getDate() + d);
				myDate.setHours(myDate.getHours() + h);
				myDate.setMinutes(myDate.getMinutes() + m);

				return myDate;
			}

			if($.cookie("timer")){
				
				var dateEnd = $.cookie('timer');

			  	// console.log('dateEnd ' + date2.getTime());
			}else{
				
				var dateEnd = correctDate(3, 8, 35);
				$.cookie('timer', dateEnd, {expires: 365});
			}
			// console.log('Timer ' + $.cookie('timer'));
			function getTime(){
				
			  var date1 = new Date(); //текущая дата
			  var date2 = new Date(dateEnd);

			// var date2 = new Date(2018, 7, 6, 15, 0, 0, 0); //дата окончания
			var timeDiff = date2.getTime() - date1.getTime();//разница м/у датами в ms
			var seconds = Math.floor((timeDiff / 1000 ) % 60);
			var minutes = Math.floor( (timeDiff /1000/60) % 60 );
			var hours = Math.floor( (timeDiff/(1000*60*60)) % 24);
			var days = Math.floor( timeDiff/(1000*60*60*24) );

			return {
				remaining: timeDiff,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds

			}
		}
		// render();
		var interval = setInterval(render, 1000);
		function render(){
			var hourField = document.querySelector('.hour-field .field-value'),
			minField = document.querySelector('.min-field .field-value'),
			secField = document.querySelector('.sec-field .field-value'),
			daysField = document.querySelector('.days-field .field-value'),

			day = getTime().days,
			hour = getTime().hours,
			minutes = getTime().minutes,
			seconds = getTime().seconds;



			// добавление нулей, если одгозначная цифра в поле
			if(hour < 10) hour = '0' + hour;
			if(minutes < 10) minutes= '0' + minutes; 
			if(seconds < 10) seconds= '0' + seconds;

			daysField.innerHTML = day;
			hourField.innerHTML = hour;
			minField.innerHTML= minutes;
			secField.innerHTML= seconds;

			if(getTime().remaining < 0 ){
				clearInterval(interval);

				daysField.innerHTML = '00';
				hourField.innerHTML = '00';
				minField.innerHTML= '00';
				secField.innerHTML= '00';
			} 
		}
	// end of timer

		// form valid
		function Validate(){

		  this.init = function(){

		    valid.regListeners();
		  };
		  this.regListeners = function(){
		    
		    $('form').on('submit', valid.formSubmit);
		    $('form input[type="text"]').on('keydown', valid.inputKeyDown);
		    $('form input[type="text"]').on('focusout', valid.inputFocusOut);
		    
		  };
		  this.formSubmit = function(e){
		   
		    
		    if(valid.formValidate($(this)) == false){
		     return false;
		    }
		    var th = $(this);
		  		
		  		$.ajax({
		  			type: "POST",
					url: "mail.php", //Change
					data: th.serialize()
				}).done(function() {
					alert("Thank you!");
					setTimeout(function() {
						// Done Functions
						th.trigger("reset");
					}, 1000);
				});
				return false;
		   
		   
		  };

		  this.formSend = function(form) {
		  	
		  		
			
		  };

		  this.formValidate = function($form){
		    var validation = true;
		    var $inputs = $form.find('input');
		    
		    		    
		    $inputs.each(function(index, elem){
		      var $input = $(elem);
		      
		      if($input.val() == ''){
		        validation = false;
		        valid.createTooltip($input);
		      }
		      
		    });
		    return validation;
		  
		  };
		  
		  this.createTooltip = function($toolParent){
		    
		  	$toolParent.addClass('invalid');
		  	$toolParent.closest('label').addClass('invalid');
		  };
		  
		  this.inputKeyDown = function(){
		    $(this).removeClass('invalid');
		    $(this).closest('label').removeClass('invalid');

		  };

		  this.inputFocusOut = function(){
		  	if($(this).val() == "") valid.createTooltip($(this));
		  };
		  
		}
		var valid = new Validate();
		valid.init();
	// end of form valid

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});