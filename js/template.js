var template = [
	{
		"query" : "SELECT description FROM neighborhoods",
		"header" : "",
		"style" : [
			{
				"data" : "description",
				"format" : "<p><i>||data||</i></p>"
			}
		],
		"footer" : ""
	},
	{
		"query" : "SELECT regexp_replace( text, E'[\\n\\r]+', '<br /><br />', 'g' ) AS text FROM process INNER JOIN neighborhoods ON neighborhoods.id = neighborhood",
		"header" : "<div><h3><i class='fa fa-puzzle-piece'></i> About this boundary</h3></div>",
		"style" : [
			{
				"data" : "text",
				"format" : "<p>||data||</p>"
			}
		],
		"footer" : "</div>"
	}
];
