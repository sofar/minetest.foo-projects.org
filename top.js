function jsonget(url, id)
{
	var r = new XMLHttpRequest();
	r.open("GET", url, true);
	r.setRequestHeader("Content-type", "application/json")

	r.onreadystatechange = function()
	{
		if (r.readyState == 4 && r.status == 200)
		{
			var tbl = JSON.parse(r.responseText);

			if (id == "box") {
				var s = "<table style=\"width: 80%;margin: 0 auto;\">";
				s += "<tr><th width=\"5%\">Rank</th><th width=\"15%\">Number</th><th>Name</th><th>Builder</th></tr>\n";

				for (i = 1; i <= 10; i++)
				{
					s += "<tr>";
					s += "<td>" + i.toString() + "</td>";
					s += "<td>" + tbl[i].split(/: /, 1)[0] + "</td>";
					var ss = tbl[i].split(/: /, 2);
					s += "<td>" + getbox(tbl[i].split(/: /, 1)[0], ss[1].split(/ by /, 1)[0].replace(/"/g, '')) + "</td>";
					s += "<td>" + ss[1].split(/ by /, 2)[1] + "</td>";
					s += "</tr>\n";	
				}
				s += "</table>\n";
			} else {
				var s = "<table style=\"width: 80%;margin: 0 auto;\"><tr><th width=\"15%\">Rank</th><th>Name</th></tr>\n";

				for (i = 1; i <= 10; i++)
				{
					s += "<tr><td>" + i.toString() + "</td><td>" + tbl[i] + "</td></tr>\n";	
				}
				s += "</table>\n";
			}

			document.getElementById(id).innerHTML = s;
		}
	}
	r.send();
}

jsonget("http://minetest.foo-projects.org/top_players.json", "player");
jsonget("http://minetest.foo-projects.org/top_boxes.json", "box");
jsonget("http://minetest.foo-projects.org/top_builders.json", "builder");

