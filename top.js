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

			var s = "<table style=\"width: 80%;margin: 0 auto;\"><tr><th width=\"15%\">Rank</th><th>Name</th></tr>\n";

			for (i = 1; i <= 10; i++)
			{
				s += "<tr><td>" + i.toString() + "</td><td>" + tbl[i] + "</td></tr>\n";	
			}
			s += "</table>\n";

			document.getElementById(id).innerHTML = s;
		}
	}
	r.send();
}

jsonget("http://minetest.foo-projects.org/top_players.json", "player");
jsonget("http://minetest.foo-projects.org/top_boxes.json", "box");
jsonget("http://minetest.foo-projects.org/top_builders.json", "builder");

