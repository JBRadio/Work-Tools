// Class: HTML Builder
// Features of Class:
//  - Converts data into processed data
//    - You can apply default values to return objects (attributes, classes, and inlineStyle, ..)
//      A. [,,...] to [HTML{},HTML{},...] for further processing with buildHtmlString
//          Example case: 
//           - You have a simple array or list of items you want to make into HTML objects
//             [0,1,...] to <li>0</li><li>1</li>... or <td>1</td><td>2</td>... or anything else
//             [,,...] to [{tagName:li ...}, {tagName:li, ...}] to put under one <ol>
//              Return as String or Array of strings
//      B. [[,,],[,,],...] to [[HTML{},[HTML{}]],[...]] for further processing with buildHtmlString
//          Example case:
//           - You have rows of lists (table data in rows and columns, list of lists: ol, ol, ..., etc.)
//          [["A","Bicycle","$23.00"], == [[{tagName:td,innerHTML:"A"}, {tagName:"Bicycle,...}, ...],
//           ["B","Car","$10,000.00"]]     [{tagName:td,innerHTML:"B"}, {tagName:"Car",...}, ...]]
//
//      C. [[{},{},...],[{}],...] to Html { childObjects:[Html{}, Html{}]} }
//          - You have arrays or lists of objects that you want to put as childObjects
//          For example, I have a lists of <td> that I want to put in <tr>
//
// Functions of Class:
//  - buildHtmlString: Turns simple and complicated {} into HTML Strings for HTML DOM Updates

var HtmlBuilder = HtmlBuilder || {
    
    // Build a simple link list
    buildHtmlLinkList: function(arrLinkData, custom) {
        custom = custom || {attributes: {target:'blank'}}; // default make links just open in new tab
        
        var listItems = HtmlBuilder.buildHtmlLinkObjectsFromArray(/* [['name','href'], ...] */ arrLinkData,
            /* {attributes: {target:'blank'}} */ custom            
        ); // building <a> string text for <li> innerHTML
    
        return {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listItems, {tagName: 'li'} )};
    },
    
    buildHtmlLinkObjectsFromArray: function (/* [[],[]] */ arrData, custom ) {
        // Turn a 2 dimensional array into a one dimensional array building links - HTML{}
        //  arrData = [[innerHTML, href], ...]
        //  custom = {attributes, styles, classes}
        
        // Returns: A simple one dimensional array
        //  [{}, {}, ... ]
        
        custom = custom || {};
        
        if ( Array.isArray(arrData) === false ) {
            console.log("buildHtmlLinkObjectsFromArray: Cannot process non-array: " + arrData);
            return [];
        }
        
        var retLinksArray = [];
        
        for ( var i = 0; i < arrData.length; i++ ) 
        {   
            var innerHTML   = arrData[i][0];
            var href        = arrData[i][1];
            
            var cloneCopy = Object.assign({}, custom); // Clone objects to lose reference to original
            
            var retObj = {tagName: 'a',
                          attributes: {},
                          childObjects: cloneCopy.childObjects || [],
                          classes: cloneCopy.classes || [],
                          innerHTML: innerHTML,
                          inlineStyle: cloneCopy.inlineStyle || {}
                         };
            
            for (var key in cloneCopy.attributes) {
                if ( cloneCopy.hasOwnProperty )
                    retObj.attributes[key] = cloneCopy.attributes[key];
            }
            
            retObj.attributes['href'] = href;
            retObj.IdPrefix != undefined ? retObj.IdPrefix += '_'+i : "";
            
            //retLinksArray.push(retObj);
            retLinksArray.push( HtmlBuilder.buildHtmlString(retObj) );
        }
        
        return retLinksArray;
    },
    
    buildHtmlObjectsFromArray2: function (/* [[],[],...] */ arrData, /* [{},{}] */ custom ) {
        // Turn an array of data into an array of HTML {} to be used with other functions.
        // Examples:
        //   [[2,3,4], [], ...] >> [[{tagName: li, innerHTML: 2}, ...], [], ...]
        // Use Cases
        //   1. Simple elements where the value is the innerHTML of a <td> or <li> and you are 
        //      defining the parent (lets say TR) and child (TD/TH) at the same time.
        //      - custom {parent, child} >> Defining the ol/ul for li or tr for td
        
        // arrHTML = [[],[],[],...] -- basically td or li separated by arrays/rows
        // custom = [{tag for top like tr or ol}, {tag for content like td or li}]
        //  - childObjects will be overwritten
        
        if ( Array.isArray(arrData) === false ) {
            console.log("buildHtmbuildHtmlObjectsFromArray2: Cannot process non-array: " + arrData);
            return [];
        }
        
        var retObjDataRows = [];
        
        for ( var i = 0; i < arrData.length; i++ ) 
        {   
            var topCustom = Object.assign({}, custom[0]); // Clone objects to lose reference to original
            var dataCustom = Object.assign({},custom[1]); // Clone objects to lose reference to original
            
            // Create unique identifiers if necessary; buildHtmlObjectsFromArray will do the same
            dataCustom.IdPrefix != undefined ? dataCustom.IdPrefix += '_'+i : "";
            topCustom.IdPrefix !== undefined ? topCustom.IdPrefix += '_'+i : "";
            
            // Place child (rows, list items, etc.) into parent (topCustom) object
            topCustom.childObjects = HtmlBuilder.buildHtmlObjectsFromArray( arrData[i], dataCustom )
            
            retObjDataRows.push(topCustom);
        }
        
        return retObjDataRows; // Return [{... childObjects:{}}, {... childObjects:{}}, ...]
    },
    
    buildHtmlObjectsFromArray: function ( /* [] */ arrHtml , /* {} */ custom ) {
        // Arguments: [,,,], {tagName:, ...}
        // Returns: [{},{},{}] or "<tag>...</tag>"
        // Features:
        //  - Turns data [,,,] into objects [{},{},{}] to create similar objects
        
        // VALIDATION / CODE PROCESS PROTECTION
        custom = custom || {};
        
        if ( Array.isArray(arrHtml) === false ) {
            console.log("buildHtmlObjects: Cannot process non-array: " + arrHtml);
            return [];
        }
        
        if ( arrHtml.length === 0 ) {
            console.log("buildHtmlObjects: Cannot process empty array: " + arrHtml);
            return [];
        }
        
        // PROCESSING
        var retArray = arrHtml.map(function(item, index, originalArray){
            var retObj = {attributes: custom.attributes || {},
                          childObjects: custom.childObjects || [],
                          classes: custom.classes || [],
                          innerHTML: item || "",
                          inlineStyle: custom.inlineStyle || {},
                          tagName: custom.tagName.trim() || ""};
            
            if ( custom.IdPrefix !== undefined )
                retObj.attributes.id = custom.IdPrefix + '_' + index;
            
            return retObj;
        });
        
        // RETURN
        return retArray;
    },
    
    buildHtmlString: function( /* {} */ objHtml) {
        // Arguments: {}
        // Returns: String
        // Features:
        //  - Works on a single or nested element (one or many children)
        //  - Function is recursive as elements can be nested - child elements/objects.
        //  - Should work with all html DOM elements
        
        objHtml = objHtml || {};
        
        var attributes  = objHtml.attributes || {};     // attributes: {'data-role':'page', ... }
        var childObjects = objHtml.childObjects || [];  // childObjects: [{child1}, {child2}]
        var classes     = objHtml.classes || [];        // classes: ['colorRed', 'big', ...]
        var innerHTML   = objHtml.innerHTML || "";      // innerHtml: 'Inside HTML or text'
        var style       = objHtml.inlineStyle || {};    // inlineStyle: {'color':'red', ...}
        var tagName     = objHtml.tagName;              // tagName: div
        // childStrings: ['<div>...</div>', '<span>...</span>]
        //  - Cannot have childObjects and childStrings
        
        //console.log(objHtml);
        
        // INPUT ARGUMENTS
        // Simple Examples:
        // ---------------
        // {tagName: br}
        // {tagName: button, attributes: {id:'btnHelloWorld'}, innerHTML:'Hello World'}
        
        // Nested Examples:
        // ---------------
        // ul, ol
        // {tagName: ol, attributes: {...}, classes: [,,,], inlineStyle: {...},
        //  childObjects: [{tagName: li, ... childObjects: [{tagName: ol, ... }]},
        //                 {tagName: li, ... },
        //                 ...]}
        
        // table
        // See Mozilla for table flow content:
        //     https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
        // {tagName: table, ... 
        //  childObjects: [{tagName: caption, innerHTML:'A caption!'},
        //                 {tagName: colgroup ... },
        //                 {tagName: thead ...
        //                 childObjects: [{tagName: tr ...
        //                                 childObjects:[{tagName:th, ...}, {tagName:th, ...}]}]},
        //                 {tagName: tfoot ...
        //                 childObjects: [{tagName: tr ...
        //                                 childObjects:[{tagName:th, ...}, {tagName:th, ...}]}]},
        //                 {tagName: tbody ...
        //                 childObjects: [{tagName: tr ...
        //                                 childObjects:[{tagName:td, ...}, {tagName:td, ...}]},
        // ...........
        //                                {tagName: tr ...
        //                                 childObjects:[{tagName:td, ...}, {tagName:td, ...}]}]}]},
        
        
        // VALIDATION
        // - If string, return it as it is, likely it's been built already
        // - Otherwise, check to see if a tagName is present for processing.
        
        if ( typeof objHtml === "string" )
            return objHtml; // likely it's been built already
        
        if (!tagName) {
            console.log('buildHtmlString: No tagName found for ' + JSON.stringify(objHtml) )
            return "";
        }
        
        // RETURN SHORT TAGS: They do not need additional processing.
        var shortTags = {br:1, hr:2};
        
        if (shortTags[tagName])
            return "<" + tagName + "/>";
        
        // PROCESS: Open tag, attributes, classes, styles, innerHTML / children, Close Tag
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

        // For self closing tags with no innerHTML (different than <br /> like <input ... />)
        var shortTags2 = {input:1};
        if (shortTags2[tagName]) {
            ret += '/>';
            return ret;
        }
        
        ret += '>'; // Close head/opening tag
        
        // Return strings for elements that have no child or closing tags: col (within colgroup)
        // - These tags may have a style or attribute
        if ( tagName == 'col' )
            return ret;

        // Process Child HTML Objects
        if ( childObjects != undefined && childObjects.length != undefined && Array.isArray(childObjects) ) {
            for (var i = 0; i < childObjects.length; i++) {
                var childObject = childObjects[i] || {};
                ret += HtmlBuilder.buildHtmlString(childObjects[i]);
            }
        }
        
        // Process innerHTML
        //if ( innerHTML != undefined && typeof innerHTML == "string" ) // Was restricting numbers
        if ( innerHTML != undefined ) ret += innerHTML;

        ret += '</' + objHtml.tagName + '>'; // Closing tag
        
        //console.log(ret);
        
        return ret;   
    },
	
	// ----------------- HTML Tables <table> -------------------

	// Javascript function to build <table> string.
	//  - Consider using Emmet (Zen coding) to quickly build HTML text if static.
    // IMPROVEMENTS:
    //  - Allow inline style or use buildHtmlString instead
	buildTableHTML: function (/* [] */ tblAttributes, /* [] */ dataArray) {
    
		if ( Array.isArray(tblAttributes) == false ) return ""; // Invalid: Should be an empty [] if empty
		if ( Array.isArray(dataArray) == false ) return ""; // Invalid: table data should be in an array
    
		var retText = "<table "; // Create open <table tag
    
        // Process <table attributes
		for ( var i = 0; i < tblAttributes.length; i++) retText = " " + tblAttributes[i]; 
		
		retText += ">"; // Close <table ...> open tag
		
        // Process <tr> table rows
		for ( var y = 0; y < dataArray.length; y++) {
			retText += "<tr>"; // Create <tr> open tag
			
            // Create <td> tags
			if ( Array.isArray(dataArray[y]) )
				for (var x = 0; x < dataArray[y].length; x++) retText += "<td>" + dataArray[y][x] + "</td>";
			else
				retText += "<td>" + dataArray[y] + "</td>";
				
			retText += "</tr>"; // Close </tr> tag
		}
		 
		retText += "</table>"; // Close </table> tag
		return retText;
	},

	// Javascript function to build <table> string. Uses an {}
	buildHTMLStringTable: function (table) {
        // table = {attributes:{}, classes:[], inlineStyle:{}, thead:[], tfoot:[], tbody:[][]}
        
		var ret = "<table ";
        
		if ( table.attributes !== undefined ) ret += HtmlBuilder.buildStringAttributes(table.attributes);
        
        if ( table.classes !== undefined ) ret += HtmlBuilder.buildStringClasses(table.classes);
        
        if ( table.inlineStyle !== undefined ) ret += HtmlBuilder.buildStringStyles(table.inlineStyle);
		
		ret += ">"; // End of <table>
        
        if ( table.caption !== undefined && table.caption.length > 0 )
            ret += '<caption>' + table.caption + '</caption>';
        
        // Process <thead>
        if ( table.thead !== undefined ) {
            ret += '<thead>';
            ret += '<tr>';
            
            for (var i = 0; i < table.thead.length; i++) ret += '<th>' + table.thead[i] + '</th>';
            
            ret += '</tr>';
            ret += '</thead>';
        }
            
		// Process <tfoot>
        if ( table.tfoot !== undefined ) {
            ret += '<tfoot>';
            ret += '<tr>';
            
            for (var i = 0; i < table.tfoot.length; i++) ret += '<th>' + table.tfoot[i] + '</th>';
            
            ret += '</tr>';
            ret += '</tfoot>';
        }
        
        // Process <tbody>
        if ( table.tbody !== undefined && table.tbody.length > 0 ) {
            
            ret += '<tbody>';
            
            for (var y = 0; y < table.tbody.length; y++) {
                ret += '<tr>';

                for (var x = 0; x < table.tbody[y].length; x++) ret += '<td>' + table.tbody[y][x] + '</td>';

                ret += '</tr>';
            }
            
            ret += '</tbody>';
        }

		ret += '</table>'; // #.) Close </table>
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
	},
    
    // Process attributes
    buildStringAttributes: function (attributes) {
        console.log('Function called: buildStringAttributes');
        
        var rText = "";
        
        if ( attributes != undefined ) {
            for ( var key in attributes ) {
                if ( attributes.hasOwnProperty(key) ) {
                    rText += ' ' + key + '="' + attributes[key] + '"'; // Remember to quote values
                    console.log('key: ' + key + ', value: ' + attributes[key]);
                }
            }
        }
        
        return rText;
    },
    
    // Process classes
    buildStringClasses: function (classes) {
        
        var rText = ' class="';
        
        if ( classes != undefined && Array.isArray(classes) == true && classes.length > 0 ) {
            for ( var i = 0; i < classes.length; i++ )
                rText += ' ' + classes[i];
        }
        rText += '"'; // close class=""
        return rText;
    },
    
    // Process style
    buildStringStyles: function (style) {
        
        var rText = ' style="';
        if ( style != undefined ) {
            for ( var key in style ) {
                if ( style.hasOwnProperty(key) )
                    rText += ' ' + key + ":" + style[key] + ";";
            }
        }
        rText += '"'; // Close quotation for style
        return rText;
    }
};


// DEBUG: buildHtmlObjectsFromArray( /* [] */ arrHtml , /* {} */ custom )
// console.log( HtmlBuilder.buildHtmlObjectsFromArray([1,2,3], {tagName:'td', IdPrefix:'cell'}) );

// DEBUG: buildHtmlObjectsFromArray2 (/* [[],[],...] */ arrHtml, /* [{parent},{child}] */ custom )
/*
var tblRowData = [['Text:', 'Nice Text Here' ],
                  ['Character count:', 'Numbered result' ],
                  ['Word count:', 'Numbered result' ],
                  ['Line count:', 'Numbered result' ]];

var parentTag = {tagName:'tr', IdPrefix:'TableRow'};
var childTag = {tagName:'td', IdPrefix:'Cell'}
var tblRowObjData = HtmlBuilder.buildHtmlObjectsFromArray2( tblRowData, [parentTag,childTag]);

console.log(tblRowObjData);
*/


// DEBUG: buildHtmlLinkObjectsFromArray: function (/* [[innerHTML, href],[]] */ arrData, custom )
/*
var data = [['Wikipedia (en): ASCII', 'https://en.wikipedia.org/wiki/ASCII'],
               ['Ascii-code.com: ASCII Code - The extended ASCII table', 'http://www.ascii-code.com/']];

var customTag = {attributes: {target:'blank'}, classes:['ui-content'], inlineStyle:{color:'red'}}; 

console.log( HtmlBuilder.buildHtmlLinkObjectsFromArray(data, customTag) );
*/