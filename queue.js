
function queuejsonget(url)
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

			s += "<table style=\"width: 80%;margin: 0 auto;\">\n";
			s += "<th width=\"5%\"></th><th width=\"15%\">Number</th><th width=\"60%\">Name</th><th>Builder</th>\n";
			Object.keys(tbl).forEach(function(key, index) {
				var item = tbl[key];
				s += "<tr><td>" + key + "</td><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.builder + "</td></tr>\n"
			})

			s += "</table>\n\n";

			document.getElementById("queue").innerHTML = s;
		}
	}
	r.send();
}

queuejsonget("https://minetest.foo-projects.org/queue.json");

