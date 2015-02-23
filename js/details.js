function show_probe( e, text ) {
	$( "#probe" )
		.text( text )
		.css({
			left : e.originalEvent.clientX,
			top : e.originalEvent.clientY
		})
}