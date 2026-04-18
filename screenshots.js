
var modal = document.getElementById('modal');
var span = document.getElementsByClassName("close")[0];
var screenshots = {};
var boxInfo = {};
var modalImages = [];
var modalIndex = 0;
var modalTitle = "";
var modalBox = null;

function sortedBoxKeys()
{
	var keys = Object.keys(boxInfo).filter(function(k) { return screenshots[k]; });
	keys.sort(function(a, b) { return parseInt(a) - parseInt(b); });
	return keys;
}

function updateModal()
{
	var e = document.getElementById('screenshot');
	var header = "";
	if (modalTitle) {
		var keys = sortedBoxKeys();
		var idx = keys.indexOf(String(modalBox));
		var prev = (idx > 0)
			? "<a href=\"#\" onclick=\"modalBoxPrev();return false\" style=\"margin-right:16px;\">&lt;</a>"
			: "<span style=\"margin-right:16px;color:#ccc;\">&lt;</span>";
		var next = (idx >= 0 && idx < keys.length - 1)
			? "<a href=\"#\" onclick=\"modalBoxNext();return false\" style=\"margin-left:16px;\">&gt;</a>"
			: "<span style=\"margin-left:16px;color:#ccc;\">&gt;</span>";
		header = "<h3 style=\"margin-top:0;text-align:center;\">" + prev + modalTitle + next + "</h3>";
	}
	var img = "<img width=\"100%\" src=\"" + modalImages[modalIndex] + "\"/>";
	var nav = "";
	if (modalImages.length > 1) {
		nav = "<div style=\"text-align:center;margin-top:8px;\">";
		if (modalIndex > 0) {
			nav += "<a href=\"#\" onclick=\"modalPrev();return false\" style=\"margin-right:16px;\">&lt; prev</a>";
		}
		nav += (modalIndex + 1) + " of " + modalImages.length;
		if (modalIndex < modalImages.length - 1) {
			nav += "<a href=\"#\" onclick=\"modalNext();return false\" style=\"margin-left:16px;\">next &gt;</a>";
		}
		nav += "</div>";
	}
	e.innerHTML = header + img + nav;
}

function modalPrev()
{
	if (modalIndex > 0) {
		modalIndex--;
		updateModal();
	}
}

function modalNext()
{
	if (modalIndex < modalImages.length - 1) {
		modalIndex++;
		updateModal();
	}
}

function modalBoxPrev()
{
	var keys = sortedBoxKeys();
	var idx = keys.indexOf(String(modalBox));
	if (idx > 0) {
		showscreenshot(keys[idx - 1]);
	}
}

function modalBoxNext()
{
	var keys = sortedBoxKeys();
	var idx = keys.indexOf(String(modalBox));
	if (idx >= 0 && idx < keys.length - 1) {
		showscreenshot(keys[idx + 1]);
	}
}

function showscreenshot(n)
{
	modalBox = n;
	modalImages = screenshots[n];
	modalIndex = 0;
	var info = boxInfo[n];
	modalTitle = info
		? "Box " + n + " - " + info.name + " - By " + info.author
		: "Box " + n;
	updateModal();
	modal.style.display = "block";
}

function getbox(n, name, author)
{
	if (screenshots[n]) {
		boxInfo[n] = { name: name, author: author };
		return("<a href=\"#\" onclick=\"showscreenshot('" + n + "');return false\">" + name + "</a>");
	}
	return name;
}

function screenshotjsonget(url)
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

screenshotjsonget("https://luanti.foo-projects.org/screenshots.json");

span.onclick = function() {
	modal.style.display = "none";
}
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
