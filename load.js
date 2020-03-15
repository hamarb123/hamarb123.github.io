function load(url, callback)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   // Typical action to be performed when the document is ready:
		   callback(xhttp.responseText);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}