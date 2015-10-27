
$(document).ready(function() {

	$('input').on('keyup', function (evt) 
	{
				if(evt.keyCode === 13)
				{
					getResults($(this).val());
				}
	});


 function getResults(query) {

	var pageLimit = 30;
	
	// Base URL
	// http://api.bing.net/qson.aspx?Query=INSERT_QUERY_HERE&JsonType=callback&JsonCallback=?

	var url = 'http://api.bing.net/qson.aspx?Query='

	// Now, we need to append the actual query string to it

	var query = $('input').val();

	url = url + query + '&JsonType=callback&JsonCallback=?';

	// Now that the URL has been constructed, we need to encode it for a URI.

	url = encodeURI(url);

	$.ajax({
		type:'GET',
		url: url,
		dataType: 'jsonp',
	}).done(function(response, responseString, jqXHR){
		console.log(response);
  		render(response.results);
	});
}


function render(sites) {

  // This argument 'sites' is the array of matched sites that I passed in from the ajax response!
  	var results = $('#results');
	results.empty();
    $.each(sites, function(index,site){

    $('#results').append(createSitesHtml(site));

  });
}


function createSitesHTML(site) {
	var siteString = '<div class="link">' + site.Text + '</div>';
	}


});