/**
 * jQuery Dynamic ImageMap v0.1.0
 *
 * A jQuery plugin to create dynamic elements to be placed over area tags coordinates in image map
 *
 * @author      Justin John Mathews <justinjohnmathews@gmail.com>
 * @copyright   (c) 2016 Justin John Mathews
 * @license     MIT
 */
(function($) {
    /**
     * The method for creating custom elements dynamically for all area tags in image map
     * that will be placed on top of image where area coordinates defines.
     *
     * @param {Object} options
     * @return {Object|this}
     */
    $.fn.dynamicImageMap = function(options) {
        options || (options = {});

        var mapElement, coords, parent,
            areas = options.areas,
            image = this;

        /* If area and maps objects are not found in options, check corresponding image usemap attribute to find map element */
        if (!options.areas && !options.maps) {
			try {
				areas = $('map[name=' + image.attr("usemap").replace(/^#/, '') + '] area');
			} catch(e) {
				throw new Error('The image tag("' + image.selector + '") is missing the usemap attribute');
			}
        }

        /* Wrap image with div tag for creating dynamically created anchor elements positioned in it. */
        image.wrap($("<div>", {
            class: $(image).data('class') || '',
            style: $(image).data('style') || ''
        }));

        parent = image.parent();

        parent.css({
            position: 'relative',
            display: 'inline-block'
        });
		
		var setMapElemStyle = function(mapElement, coords) {
			mapElement.css('position', 'absolute');

			/* Split coordinates to array for anchor elements styling */
			coords = coords.split(',');

			switch (coords.length) {
				/* CIRCLE */
				case 3:
					mapElement.css({
						borderRadius: coords[2] * 1,
						top: coords[1] - coords[2],
						left: coords[0] - coords[2],
						width: coords[2] * 2,
						height: coords[2] * 2
					});
					break;
					
				/* RECT */					
				case 4:
					mapElement.css({
						top: coords[1] * 1,
						left: coords[0] * 1,
						width: coords[2] - coords[0],
						height: coords[3] - coords[1]
					});
					break;
				default:
					mapElement = null;
					break;
			}
			
			return mapElement;
		}
		
		if (areas) {
			/* Iterate through all area tags in map tag to create corresponding dynamic element in the image */
			areas.map(function(i, n) {
				mapElement = $("<a>", {
					class: $(n).data('class') || '',
					style: $(n).data('style') || '',
					html: $(n).data('content') || '',
					href: $(n).attr('href') || '#'
				});
				mapElement = setMapElemStyle(mapElement, n.coords);
				parent.append(mapElement);
			});					
		} else {
			/* Iterate through maps array in options object.
			 * This will create dynamic elements which resembles to map elements for image tag 
			 * and corresponding image tag doesn't have associated map element
			 */		
			options.maps.forEach(function (n, i) {
				mapElement = $("<a>", {
					class: n.classes || '',
					style: n.style || '',
					html: n.content || '',
					href: n.href || '#'
				});
				mapElement = setMapElemStyle(mapElement, n.coords);
				parent.append(mapElement);		
			});			
		}
        return this;
    };

}(window.jQuery));