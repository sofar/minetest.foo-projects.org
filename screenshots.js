
var modal = document.getElementById('modal');
var span = document.getElementsByClassName("close")[0];
var screenshots = {};

function showscreenshot(s)
{
	var e = document.getElementById('screenshot');
	e.innerHTML = "<img width=\"100%\" src=\"https://i.imgur.com/" + s + ".jpg\"/>";
	modal.style.display = "block";
}

function getbox(n, content)
{
	if (screenshots[n]) {
		return("<a href=\"javascript:showscreenshot('" + screenshots[n] + "')\">" + content + "</a>");
	}
	return content;
}

function jsonget(url)
{
	var r = new XMLHttpRequest();
	r.open("GET", url, true);
	r.setRequestHeader("Content-type", "application/json")

	r.onreadystatechange = function()
	{
		if (r.readyState == 4 && r.status == 200)
		{
			var tbl = JSON.parse(r.responseText);

			Object.keys(tbl).forEach(function(key, index) {
				screenshots[key] = tbl[key];
			})
		}
	}
	r.send();
}

jsonget("http://minetest.foo-projects.org/screenshots.json");

span.onclick = function() {
	modal.style.display = "none";
}
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
