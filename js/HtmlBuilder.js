var HtmlBuilder = HtmlBuilder || {
    
    buildHtmlString: function(objHtml) {
        // Function is recursive as elements can be nested.
        objHtml = objHtml || {};    
    
        // tagName: div
        // attributes: {'data-role':'page', 'data-position':'fixed', ... }
        // classes: ['colorRed', 'big', ...]
        // inlineStyle: {'color':'red', ...}
        // childObjects: [{child1}, {child2}]
        // childStrings: ['<div>...</div>', '<span>...</span>]
        //  - Cannot have childObjects and childStrings
        // innerHtml: 'Inside HTML or text'
        var attributes  = objHtml.attributes || {};
        var childObjects = objHtml.childObjects || [];
        var classes     = objHtml.classes || [];
        var innerHTML   = objHtml.innerHTML || "";
        var style       = objHtml.inlineStyle || {};
        var tagName     = objHtml.tagName;
        
        
        if (!tagName)
            return console.log('buildHtmlString: No tagName found for ' + JSON.stringify(objHtml) );
        
        if (tagName == "br")
            return "<br />";
        
        var ret  = "";
            ret += '<' + objHtml.tagName;
    
        // Process attributes
        if ( attributes != undefined ) {
            for ( var key in attributes ) {
                if ( attributes.hasOwnProperty(key) ) 
                    ret += ' ' + key + '="' + attributes[key] + '"'; // Remember to quote values
            }
        }
        
        // Process classes
        ret += ' class="';
        if ( classes != undefined && Array.isArray(classes) == true && classes.length > 0 ) {
            for ( var i = 0; i < classes.length; i++ )
                ret += ' ' + classes[i];
        }
        ret += '"'; // close class=""
        
        // Process style
        ret += ' style="';
        if ( style != undefined ) {
            for ( var key in style ) {
                if ( style.hasOwnProperty(key) )
                    ret += ' ' + key + ":" + style[key] + ";";
            }
        }
        ret += '"'; // Close quotation for style

        ret += '>'; // Close head/opening tag

        // Process Child HTML Objects
        if ( childObjects != undefined && childObjects.length != undefined && Array.isArray(childObjects) ) {
            for (var i = 0; i < childObjects.length; i++) {
                var childObject = childObjects[i] || {};
                ret += HtmlBuilder.buildHtmlString(childObjects[i]);
            }
        }
        
        // Process innerHTML
        if ( innerHTML != undefined && typeof innerHTML == "string" )
            ret += innerHTML;

        ret += '</' + objHtml.tagName + '>'; // Closing tag
        
        return ret;
        
    }
};