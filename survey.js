jQuery('.mm-prev-btn').hide();

	var page_;
	var count;
	var current;
	var percent;
	var z = [];

	init();
	getCurrentSlide();
	goToNext();
	goToPrev();
	getCount();
	// checkStatus();
	// buttonConfig();
	buildStatus();
	deliverStatus();
	submitData();
	goBack();

	function init() {
		
		jQuery('.mm-survey-container .mm-survey-page').each(function() {

			var item;
			var page;

			item = jQuery(this);
			page = item.data('page');
			item.addClass('mm-page-'+page);
			//item.html(page);

		});

	}

	function getCount() {
		count = jQuery('.mm-survey-page').length;
		return count;
	}

	function goToNext() {
		jQuery('.mm-next-btn').on('click', function() {
	
			goToPage(page_);
			getCount();
			current = page_ + 1;
			var g = current / count;
	
			buildProgress(g);
			var y = (count + 1);
	
			getButtons();
			jQuery('.mm-survey-page').removeClass('active');
			jQuery('.mm-page-' + current).addClass('active');
	
			getCurrentSlide();
	
			checkStatus();
			if (jQuery('.mm-page-' + count).hasClass('active')) {

	
				if (jQuery('.mm-page-' + count).hasClass('pass')) {
					jQuery('.mm-finish-btn').addClass('active');
	
				} else {
					jQuery('.mm-page-' + count + ' .mm-survey-content .mm-survey-item').on('click', function() {
						jQuery('.mm-finish-btn').addClass('active');
		
					});
				}
			} else {
				jQuery('.mm-finish-btn').removeClass('active');
				if (jQuery('.mm-page-' + current).hasClass('pass')) {
					jQuery('.mm-survey-container').addClass('good');
					jQuery('.mm-survey').addClass('okay');
				} else {
					jQuery('.mm-survey-container').removeClass('good');
					jQuery('.mm-survey').removeClass('okay');
				}
			}
	
			buttonConfig();
			console.log("Button configuration updated");
		});
	}
	

	function goToPrev() {

		jQuery('.mm-prev-btn').on('click', function() {
			goToPage(page_);
			getCount();			
			current = (page_ - 1);
			var g = current/count;
			buildProgress(g);
			var y = count;
			getButtons();
			jQuery('.mm-survey-page').removeClass('active');
			jQuery('.mm-page-'+current).addClass('active');
			getCurrentSlide();
			checkStatus();
			jQuery('.mm-finish-btn').removeClass('active');
			if( jQuery('.mm-page-'+current).hasClass('pass') ) {
				jQuery('.mm-survey-container').addClass('good');
				jQuery('.mm-survey').addClass('okay');
			}
			else {
				jQuery('.mm-survey-container').removeClass('good');
				jQuery('.mm-survey').removeClass('okay');
			}
			buttonConfig();
		});

	}

	function buildProgress(g) {

		if(g > 1){
			g = g - 1;
		}
		else if (g === 0) {
			g = 1;
		}
		g = g * 100;
		jQuery('.mm-survey-progress-bar').css({ 'width' : g+'%' });

	}

	function goToPage(x) {
		return x;
	}

	function getCurrentSlide() {
		jQuery('.mm-survey-page').each(function() {
			var item = jQuery(this);
			if (item.hasClass('active')) {
				page_ = parseInt(item.data('page'));
			}
		});
	}

	function getButtons() {

		if(current === 0) {
			current = y;
		}
		if(current === count) {
			jQuery('.mm-next-btn').hide();
		}
		else if(current === 1) {
			jQuery('.mm-prev-btn').hide();
		}
		else {
			jQuery('.mm-next-btn').show();
			jQuery('.mm-prev-btn').show();
		}

	}

	jQuery('.mm-survey-q li input').each(function() {

		var item;
		item = jQuery(this);

		jQuery(item).on('click', function() {
			if( jQuery('input:checked').length > 0 ) {
		    	// console.log(item.val());
		    	jQuery('label').parent().removeClass('active');
		    	item.closest( 'li' ).addClass('active');
			}
			else {
				//
			}
		});

	});

	percent = (page_/count) * 100;
	jQuery('.mm-survey-progress-bar').css({ 'width' : percent+'%' });

	function checkStatus() {
		jQuery('.mm-survey-content .mm-survey-item').on('click', function() {
			var item;
			item = jQuery(this);
			item.closest('.mm-survey-page').addClass('pass');
		});
	}

	function buildStatus() {
		jQuery('.mm-survey-content .mm-survey-item').on('click', function() {
			var item;
			item = jQuery(this);
			item.addClass('bingo');
			item.closest('.mm-survey-page').addClass('pass');
			jQuery('.mm-survey-container').addClass('good');
		});
	}

	function deliverStatus() {
		jQuery('.mm-survey-item').on('click', function() {
			if( jQuery('.mm-survey-container').hasClass('good') ){
				jQuery('.mm-survey').addClass('okay');
			}
			else {
				jQuery('.mm-survey').removeClass('okay');	
			}
			buttonConfig();
		});
	}

	function lastPage() {
		if( jQuery('.mm-next-btn').hasClass('cool') ) {
			alert('cool');
		}
	}

	function buttonConfig() {
		if( jQuery('.mm-survey').hasClass('okay') ) {
			jQuery('.mm-next-btn button').prop('disabled', false);
		}
		else {
			jQuery('.mm-next-btn button').prop('disabled', true);
		}
	}

	function submitData() {
		jQuery('.mm-finish-btn').on('click', function() {
			// collectData();
			collectAndSendData();
			jQuery('.mm-survey-bottom').slideUp();
			jQuery('.mm-survey-results').slideDown();
		});
	}

	function collectAndSendData() {
		let responses = [];
	
		jQuery('.mm-survey-item input:checked').each(function(index, val) {
			let item = jQuery(this);
			let question = item.closest('.mm-survey-page').find('.mm-survey-question').text().trim();
			let answer = item.val();
	
			responses.push({ question, answer });
		});
	
		let emailBody = responses.map(entry => `Q: ${entry.question}\nA: ${entry.answer}`).join("\n\n");
		document.getElementById("name").value = fullName.value; 
		document.getElementById("message").value = emailBody;
		console.log(document.getElementById("name").value);
		console.log(document.getElementById("message").value);
		document.getElementById("surveyForm").submit();
	}

	function collectData() {
		
		var map = {};
		var ax = ['0','red','mercedes','3.14','3'];
		var answer = '';
		var total = 0;
		var ttl = 0;
		var g;
		var c = 0;

		jQuery('.mm-survey-item input:checked').each(function(index, val) {
			var item;
			var data;
			var name;
			var n;

			item = jQuery(this);
			data = item.val();
			name = item.data('item');
			n = parseInt(data);
			total += n;

			map[name] = data;

		});

		jQuery('.mm-survey-results-container .mm-survey-results-list').html('');

		for (i = 1; i <= count; i++) {

			var t = {};
			var m = {};
			answer += map[i] + '<br>';
			
			if( map[i] === ax[i]) {
				g = map[i];
				p = 'correct';
				c = 1;
			}
			else {
				g = map[i];
				p = 'incorrect';
				c = 0;
			}

			jQuery('.mm-survey-results-list').append('<li class="mm-survey-results-item '+p+'"><span class="mm-item-number">'+i+'</span><span class="mm-item-info">'+g+' - '+p+'</span></li>');

			m[i] = c;
			ttl += m[i];

		}

		var results;
		results = ( ( ttl / count ) * 100 ).toFixed(0);

		jQuery('.mm-survey-results-score').html( results + '%' );

	}

	function goBack() {
		jQuery('.mm-back-btn').on('click', function() {
			jQuery('.mm-survey-bottom').slideDown();
			jQuery('.mm-survey-results').slideUp();
		});
	}

	document.getElementById("surveyForm").addEventListener("submit", function(event) {
		event.preventDefault(); // Prevent page reload
	  
		const formData = new FormData(this);
	  
		// Perform AJAX form submission
		fetch("https://formsubmit.co/ajax/78deab8e801995a6c1c596003500066b", {
		  method: "POST",
		  body: formData
		})
		.then(response => {
		  if (!response.ok) {
			// Check if the response was successful (status code 200)
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
		  console.log("Success:", data);
		  // Show a success message or redirect (without reloading the page)
		  document.getElementById("responseMessage").style.display = "block";
		  document.getElementById("surveyForm").reset(); // Optionally reset the form fields
		})
		.catch(error => {
		  console.error("Error:", error);
		  // Optionally show an error message to the user
		  document.getElementById("responseMessage").innerHTML = "An error occurred. Please try again.";
		  document.getElementById("responseMessage").style.display = "block";
		});
	  });
