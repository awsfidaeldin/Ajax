
$(document).ready(function() {

	$('input').on('keyup', function (evt) 
	{
				if(evt.keyCode === 13)
				{
					getResults($(this).val());
				}
	});


 function getResults(query) {

	// Base URL
	// http://api.bing.net/qson.aspx?Query=INSERT_QUERY_HERE&JsonType=callback&JsonCallback=?

	var url = 'http://api.bing.net/qson.aspx?Query='

	// Need to append the actual query string to it

	var query = $('input').val();

	url = url + query + '&JsonType=callback&JsonCallback=?';

	// URL has been constructed, we need to encode it for a URI.

	url = encodeURI(url);

	$.ajax({
		type:'GET',
		url: url,
		dataType: 'jsonp'
		// response, responseString, jqXHR
	}).done(function(response, responseString, jqXHR){
		console.log(response);
  		render(response.SearchSuggestion.Section);
	});
}


function render(sites) {

  // This argument 'sites' is the array of matched sites that I passed in from the ajax response!
  	var results = $('#results');
	results.empty();
    $.each(sites, function(index,site){

    results.append(createSitesHTML(site));

  });
}

	// Creating the string of the target links in siteString.
function createSitesHTML(site) {
	var siteString = '<a class="link" href="http://www.bing.com/search?q=' + site.Text + '"target = "_blank">' + site.Text + '</a>';
	return $(siteString);
	}
});