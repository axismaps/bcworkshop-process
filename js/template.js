var template = [
	{
		"query" : "SELECT * FROM ACS",
		"header" : "<div><h3><span class='glyphicon glyphicon-th-list'></span> Summary Stats</h3><table>",
		"style" : [
			{
				"data" : "pop2013",
				"format" : "<tr><td>Population</td><td>||data||</td></tr>"
			},
			{
				"data" : "popdens2013",
				"format" : "<tr><td>Population Density</td><td>||data||</td></tr>"
			},
			{
				"data" : "units2013",
				"format" : "<tr><td>Housing Units</td><td>||data||</td></tr>"
			},
			{
				"data" : "unitdens2013",
				"format" : "<tr><td>Housing Density</td><td>||data||</td></tr>"
			},
			{
				"data" : "singlefamily2013",
				"format" : "<tr><td>Single Family Homes</td><td>||data||</td></tr>"
			},
			{
				"data" : "multifamily2013",
				"format" : "<tr><td>Multi-Family Dwellings</td><td>||data||</td></tr>"
			},
			{
				"data" : "owner2013",
				"format" : "<tr><td>Owner Occupied</td><td>||data||</td></tr>"
			},
			{
				"data" : "renter2013",
				"format" : "<tr><td>Render Occupied</td><td>||data||</td></tr>"
			},
			{
				"data" : "vacant2013",
				"format" : "<tr><td>Vacant Units</td><td>||data||</td></tr>"
			}
		],
		"footer" : "</table></div>"
	},
	{
		"query" : "SELECT council, councilper FROM neighborhoods INNER JOIN city_council ON ST_WITHIN( ST_CENTROID( neighborhoods.geom ), city_council.geom )",
		"header" : "<div><h3><span class='glyphicon glyphicon-info-sign'></span> Key Facts</h3>",
		"style" : [
			{
				"data" : "council",
				"format" : "<p><b>City Council District ||data||</b></p>"
			},
			{
				"data" : "councilper",
				"format" : "<h5>Councilperson:</h5><p>||data||</p>"
			}
		],
		"footer" : "</div>"
	},
	{
		"query" : "SELECT neighborhoods.id, type, CASE WHEN type='video' THEN SUBSTRING(link FROM 19) ELSE link END AS link FROM resources INNER JOIN neighborhoods ON neighborhoods.id = neighborhood",
		"header" : "<div><h3>Resources</h3>",
		"style" : [
			{
				"data" : "link",
				"format" : '<iframe src="//player.vimeo.com/video/||data||" width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
			}
		],
		"footer" : "</div>"
	}
];
