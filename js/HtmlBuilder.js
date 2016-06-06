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
    },
	
	// ----------------- HTML Tables <table> -------------------

	// Javascript function to build <table> string.
	//  - Consider using Emmet to quickly build HTML text if static.
	buildTableHTML: function (tblAttributes, dataArray) {
    
		if ( Array.isArray(tblAttributes) == false ) return ""; // Invalid: Should be an empty [] if empty
		if ( Array.isArray(dataArray) == false ) return ""; // Invalid: table data should be in an array
    
		var retText = "<table "; // Open Tag
    
		for ( var i = 0; i < tblAttributes.length; i++) retText = " " + tblAttributes[i]; // <table attributes
		
		retText += ">"; // Close of open tag
		
		for ( var y = 0; y < dataArray.length; y++) {
			retText += "<tr>";
			
			if ( Array.isArray(dataArray[y]) )
				for (var x = 0; x < dataArray[y].length; x++) retText += "<td>" + dataArray[y][x] + "</td>";
			else
				retText += "<td>" + dataArray[y] + "</td>";
				
			retText += "</tr>";
		}
		 
		retText += "</table>";
		return retText;
	},

	// Javascript function to build <table> string. Uses an {}
	buildHTMLStringTable: function (data) {
		var ret = "<";
			ret += data.tag;
		
		if ( data.attributes && data.attributes.length > 0 )
			for (var i = 0; i < data.attributes.length; i++) ret += " " + data.attributes[i]; // #.) Opening Tag - Attributes
		
		ret += ">"; // End of <table>
		
		for (var y = 0; y < data.rowData.length; y++) { // #.) Build <tr>
			ret += '<tr>';
			
			for (var x = 0; x < data.rowData[y].length; x++) ret += buildHTMLString( {tag: 'td', innerHTML:data.rowData[y][x]} ); // #.) Build <th>, <td>
			
			ret += '</tr>';
		}

		ret += '</' + data.tag + '>'; // #.) Close </table>
		return ret;
	},

	// ----------------- HTML Lists <ol>, <ul> -----------------

	// Build multi-demensional or nested lists
	// Need a recursive loop
	// - Go through each item of the array
	// - Either make a <li> or confirm it is another array
	// - If another array call itself with the found array as an argument.
	buildListHTML: function (tagName, dataArray) {
		
		if ( tagName != "ul" && tagName != "ol") return ""; // Invalid: List should be <ol> or <ul>
		
		if ( Array.isArray(dataArray) == false) return ""; // Invalid: List should be from an Array
		
		var retText = "<" + tagName + ">"; // Open list element
		
		for ( var i = 0; i < dataArray.length; i++) {
			if (Array.isArray(dataArray[i]) == false )
				retText += "<li>" + dataArray[i] + "</li>"; // Add <li>
			else
				retText += buildListHTML(tagName, dataArray[i]) // Add new list
		}
		
		retText += "</" + tagName + ">"; // #.) Close first tag
		return retText;
	},


	// *** Use function buildListHTML instead ***
	// Build one dimensional lists (set of <ol>, <ul> with <li> elements)
	buildSingleListHTML: function (tagName, dataArray) {
		if ( tagName != "ul" && tagName != "ol")
			return ""; // Invalid HTML list
		
		if ( Array.isArray(dataArray) == false)
			return ""; // Invalid
		
		var retText = "<" + tagName + ">"; // Open list
		
			for ( var i = 0; i < dataArray.length; i++)
				retText += "<li>" + dataArray[i] + "</li>"; // Add to list
		
		retText += "</" + tagName + ">"; // Close list
		return retText;
	}
	
};