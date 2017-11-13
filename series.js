String.prototype.capitolize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
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
			var s = "";

			Object.keys(tbl).forEach(function(key, index) {
				var series = tbl[key];
				s += "<h2>" + series.name.capitolize() + " series</h2>\n";
				s += "<table style=\"width: 80%;margin: 0 auto;\">\n";
				s += "<th width=\"5%\"></th><th width=\"15%\">Number</th><th width=\"60%\">Name</th><th>Builder</th>\n";
				var boxes = series.boxes;
				Object.keys(boxes).forEach(function(key2, index2) {
					s += "<tr>";
					s += "<td>" + index2 + "</td>";
					s += "<td>" + boxes[key2].id + "</td>";
					s += "<td>" + getbox(boxes[key2].id, boxes[key2].name) + "</td>";
					s += "<td>" + boxes[key2].builder + "</td>";
					s += "</tr>\n";
				})

				s += "</table>\n\n";
			})

			document.getElementById("series").innerHTML = s;
		}
	}
	r.send();
}

jsonget("http://minetest.foo-projects.org/series.json");

