function loadversion(urlprefix, name)
{
	load(urlprefix + "v" + name + ".html", function(variable) { document.getElementById("v" + name).innerHTML = variable; });
}