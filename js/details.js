var selected;

function show_probe( e, text ) {
	$( "#probe" )
		.show()
		.text( text )
		.css({
			left : e.originalEvent.clientX,
			top : e.originalEvent.clientY
		})
}

function show_details( properties ) {
	var pan_offset = !$( "body" ).hasClass( "details" );
	$( "body" ).addClass( "details" );
	resize();
	if ( pan_offset ) map.panBy([ $( "aside" ).outerWidth()/2, 0 ],{animate:false});
	$( "aside" ).empty();
	$( "#selected" ).text( properties.name );
	
	$.ajax( endpoint + '/names/description/' + properties.id, {
		success : function( data ) {
			$( "aside" ).append( '<p><i>' + data[ 0 ].description + '</i></p>' );
			
			$.ajax( endpoint + '/services/' + properties.id, {
				success : function( data ) {
					_.each( data, function( item ) {
						$div = $( '<div class="service"><h3><i class="fa fa-tree"></i> Organization</h3></div>' ).appendTo( $( "aside" ) );
						$div.append( '<h4>' + item.name + '</h4>' );
						if( item.contact ) $div.append( '<h5>Contact person:</h5><p>' + item.contact + '</p>' );
						if( item.email ) $div.append( '<h5>Email:</h5><p><a href="mailto:' + item.email + '">' + item.email + '</a></p>' );
						if( item.phone ) $div.append( '<h5>Phone:</h5><p>' + item.phone + '</p>' );
						if( item.url ) $div.append( '<p><a href="' + item.url + '" target="_blank">Website</a></p>' );
					});
					
					$.ajax( endpoint + '/template', {
						data : { json : JSON.stringify( template ), id : properties.id },
						dataType : 'html',
						type : "POST",
						success : function( html ) {
							$( "aside" ).append( html );
						}
					})
				}
			})
		}
	})
}
