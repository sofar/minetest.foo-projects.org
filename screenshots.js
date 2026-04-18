
var modal = document.getElementById('modal');
var span = document.getElementsByClassName("close")[0];
var screenshots = {};
var modalImages = [];
var modalIndex = 0;
var modalTitle = "";

function updateModal()
{
	var e = document.getElementById('screenshot');
	var header = "";
	if (modalTitle) {
		header = "<h3 style=\"margin-top:0;text-align:center;\">" + modalTitle + "</h3>";
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

function showscreenshot(s, title)
{
	if (typeof s === "string") {
		modalImages = [s];
	} else {
		modalImages = s;
	}
	modalTitle = title || "";
	modalIndex = 0;
	updateModal();
	modal.style.display = "block";
}

function getbox(n, name, author)
{
	if (screenshots[n]) {
		var arg = JSON.stringify(screenshots[n]).replace(/"/g, "&quot;");
		var title = "Box " + n + " - " + name + " - By " + author;
		var titleAttr = title.replace(/"/g, "&quot;");
		return("<a href=\"#\" data-imgs=\"" + arg + "\" data-title=\"" + titleAttr + "\" onclick=\"showscreenshot(JSON.parse(this.dataset.imgs), this.dataset.title);return false\">" + name + "</a>");
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
