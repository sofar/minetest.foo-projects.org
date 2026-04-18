String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

function seriesjsonget(url)
{
	var r = new XMLHttpRequest();
	r.open("GET", url, true);
	r.setRequestHeader("Content-type", "application/json")

	r.onreadystatechange = function()
	{
		if (r.readyState == 4 && r.status == 200)
		{
			var tbl = JSON.parse(r.responseText);
			var nav = "<div style=\"text-align:center; margin:1em 0;\">";
			var s = "";

			Object.keys(tbl).forEach(function(key, index) {
				var series = tbl[key];
				nav += "<button type=\"button\" style=\"margin:0.15em;\" onclick=\"location.hash='" + series.name + "'\">" + series.name.capitalize() + "</button>";
				s += "<a name=\"" + series.name + "\"></a>";
				s += "<h2>" + series.name.capitalize() + " series</h2>\n";
				s += "<table style=\"width: 80%;margin: 0 auto;\">\n";
				s += "<tr><th width=\"5%\"></th><th width=\"15%\">Number</th><th width=\"60%\">Name</th><th>Builder</th></tr>\n";
				var boxes = series.boxes;
				Object.keys(boxes).forEach(function(key2, index2) {
					s += "<tr>";
					s += "<td>" + (index2 + 1) + "</td>";
					s += "<td>" + boxes[key2].id + "</td>";
					s += "<td>" + getbox(boxes[key2].id, boxes[key2].name, boxes[key2].builder) + "</td>";
					s += "<td>" + boxes[key2].builder + "</td>";
					s += "</tr>\n";
				})

				s += "</table>\n\n";
			})

			nav += "</div>";
			document.getElementById("series").innerHTML = nav + s;
		}
	}
	r.send();
}

seriesjsonget("https://luanti.foo-projects.org/series.json");

