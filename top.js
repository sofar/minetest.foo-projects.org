function topjsonget(url, id)
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

				var count = 0;
				for (var i = 1; i <= 25; i++)
				{
					if (!tbl[i]) break;
					s += "<tr>";
					s += "<td>" + i.toString() + "</td>";
					s += "<td>" + tbl[i].split(/: /, 1)[0] + "</td>";
					var ss = tbl[i].split(/: /, 2);
					var builder = ss[1].split(/ by /, 2)[1];
					s += "<td>" + getbox(tbl[i].split(/: /, 1)[0], ss[1].split(/ by /, 1)[0].replace(/"/g, ''), builder) + "</td>";
					s += "<td>" + builder + "</td>";
					s += "</tr>\n";
					count++;
				}
				s += "</table>\n";
				if (count == 0) {
					s = "<p style=\"text-align:center;\">Not enough data for this time period yet.</p>";
				}
			} else {
				var s = "<table style=\"width: 80%;margin: 0 auto;\"><tr><th width=\"15%\">Rank</th><th>Name</th></tr>\n";

				var count = 0;
				for (var i = 1; i <= 25; i++)
				{
					if (!tbl[i]) break;
					s += "<tr><td>" + i.toString() + "</td><td>" + tbl[i] + "</td></tr>\n";
					count++;
				}
				s += "</table>\n";
				if (count == 0) {
					s = "<p style=\"text-align:center;\">Not enough data for this time period yet.</p>";
				}
			}

			document.getElementById(id).innerHTML = s;
		}
	}
	r.send();
}

var BASE = "https://luanti.foo-projects.org/";

function loadRankings(suffix) {
	// Update active tab
	["alltime", "yearly", "monthly"].forEach(function(w) {
		var el = document.getElementById("tab-" + w);
		var active = (suffix === "" && w === "alltime") ||
			(suffix === "_" + w);
		el.innerHTML = active ? "<b>" + el.textContent + "</b>" : el.textContent;
	});

	topjsonget(BASE + "top_players" + suffix + ".json", "player");
	topjsonget(BASE + "top_boxes" + suffix + ".json", "box");
	topjsonget(BASE + "top_builders" + suffix + ".json", "builder");
}

loadRankings("");
