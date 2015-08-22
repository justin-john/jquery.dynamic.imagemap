/**
 * jQuery Dynamic ImageMap v0.0.1
 *
 * A jQuery plugin to create dynamic elements to be placed over area tags coordinates in image map
 *
 * @author      Justin John Mathews <justin.johnmathews@gmail.com>
 * @copyright   (c) 2015 Justin John Mathews
 * @license     MIT
 */
(function ( $ ) {
    /**
     * The method for creating custom elements dynamically for all area tags in image map
     * that will be placed on top of image where area coordinates defines.
     *
     * @param {Object} options
     * @return {Object|this}
     */
    $.fn.dynamicImageMap = function(options) {
        options || (options = {});
        
        var mapElement
		, coords
		, parent
		, areas = options.areas
		, image = this;

        /* If area is not found in options, check corresponding image usemap attribute to find map element */
        if (!options.areas) {
            areas = $('map[name=' + image.attr("usemap").replace(/^#/, '') + '] area');
        }

		/* Wrap image with div tag for creating dynamically created anchor elements positioned in it. */
		image.wrap($("<div>", {class: $(image).data('class') || '', style: $(image).data('style') || ''}));

		parent = image.parent();

		parent.css({
            position: 'relative',
            display: 'inline-block'
        });

		/* Iterate through all area tags in map tag to create corresponding dynamic element in the image */
		areas.map(function(i, n) {
			mapElement = $("<a>", {
                class: $(n).data('class') || '',
                style: $(n).data('style') || '',
                html: $(n).data('content') || '',
                href: $(n).attr('href') || '#'
            });
			mapElement.css('position', 'absolute');
			
			/* Split coordinates to array for anchor elements styling */
			coords = $(n).attr('coords').split(',');
			
			switch ($(n).attr('shape').toLowerCase()) {
				case 'circle':
				mapElement.css({
					borderRadius: coords[2] * 1,
					top: coords[1] - coords[2],
					left: coords[0] - coords[2],
					width: coords[2] * 2,
					height: coords[2] * 2
				});	
				break;		
				case 'rect':
				mapElement.css({
					top: coords[1] * 1,
					left: coords[0] * 1,
					width: coords[2] - coords[0],
					height: coords[3] - coords[1]
				});
				break;
			}
			parent.append(mapElement);
			
		});
        return this;
    };
	
}( jQuery ));
