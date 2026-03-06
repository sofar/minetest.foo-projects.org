
var modal = document.getElementById('modal');
var span = document.getElementsByClassName("close")[0];
var screenshots = {};
var modalImages = [];
var modalIndex = 0;

function updateModal()
{
	var e = document.getElementById('screenshot');
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
	e.innerHTML = img + nav;
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

function showscreenshot(s)
{
	if (typeof s === "string") {
		modalImages = [s];
	} else {
		modalImages = s;
	}
	modalIndex = 0;
	updateModal();
	modal.style.display = "block";
}

function getbox(n, content)
{
	if (screenshots[n]) {
		var arg = JSON.stringify(screenshots[n]).replace(/"/g, "&quot;");
		return("<a href=\"#\" data-imgs=\"" + arg + "\" onclick=\"showscreenshot(JSON.parse(this.dataset.imgs));return false\">" + content + "</a>");
	}
	return content;
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
