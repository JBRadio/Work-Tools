var ToolTextAddPrefixSuffix = ToolTextAddPrefixSuffix || {
    
    name: 'Add Prefix/Suffix to Text Lines',
    category: 'Text',
    description: 'Modify each line of text with prefix or suffix text',
    header: 'Add Prefix/Suffix to Text Lines', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        var hr = {tagName: 'hr' };
        
        // DESCRIPTION
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolTextAddPrefixSuffix.description};
        
        // DIRECTIONS
        var dirheader   = {tagName: 'h2', innerHTML: 'Directions:'};
        var Directions  = '<ol>'
                        + '<li>Enter prefix in "Prefix" field</li>'
			            + '<li>Enter suffix in "Suffix" field</li>'
			            + '<li>Press "Add" or "Remove" button to apply to each text line</li>'
			            + '</ol>';
        
        var txtPrefix = '<label for="txtPrefix">Prefix:</label>'
		              + '<input id="txtPrefix" type="text" data-clear-btn="true" placeholder="Enter Prefix Here" />';
        
        var txtSuffix = '<label for="txtSuffix">Suffix:</label>'
			          + '<input id="txtSuffix" type="text" data-clear-btn="true" placeholder="Enter Suffix Here" />';
        
        var txtaData = '<label for="data">Data:</label>'
			          + '<textarea id="txtaData" data-autogrow="false" rows=5 placeholder="Place data to convert here" >'
                      + '</textarea>';
        
        var buttons = '<button id="btnAdd" data-inline="true" style="display:inline;" >Add</button>'
			          + '<button id="btnRemove" data-inline="true" style="display:inline;" >Remove</button>';
        
        // LIST (ul): See Also
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        
        var fieldcontain = {tagName: 'div',
                            attributes: {'data-role':"fieldcontain"},
                            childObjects: [txtPrefix, br,
                                           txtSuffix, br,
                                           txtaData, br
                                          ]
                           };
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, // Description
                                     dirheader, Directions, // Directions
                                     //txtPrefix, br,
                                     //txtSuffix, br,
                                     //txtaData, br,
                                     fieldcontain, br,
                                     buttons, br,
                                     seeAlsoHeader] // See Also
                      };
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtPrefix').focus();
    },
    
    events: function() {
        
        $('#btnAdd').on('click', ToolTextAddPrefixSuffix.onAdd);
        $('#btnRemove').on('click', ToolTextAddPrefixSuffix.onRemove);
        
        
    }, // End of events (event listeners)
    
    onAdd: function () {
		
		var txtPrefix = $('#txtPrefix').val();
		var txtSuffix = $('#txtSuffix').val();
		var txtaData = $('#txtaData').val();
        
        /*console.log('Prefix: ' + txtPrefix);
        console.log('Suffix: ' + txtSuffix);
        console.log('Data: ' + txtaData);*/
        
		var txtArray = txtaData.split("\n"); // Split textarea data into array items
				
		for ( var i = 0; i < txtArray.length; i++) 
		{
			/*console.log('Split line (' + i + '): ' + txtArray[i]);
            console.log('Split Line (' + i + ') w/Fixes: ' + txtPrefix + txtArray[i] + txtSuffix);*/
            txtArray[i] = txtPrefix + txtArray[i] + txtSuffix;
		}
		
        $('#txtaData').val( txtArray.join("\n") );
	},
	
    onRemove: function () {
        
        var txtPrefix = $('#txtPrefix').val();
		var txtSuffix = $('#txtSuffix').val();
		var txtaData = $('#txtaData').val();
		
		var txtArray = txtaData.split("\n"); // Split textarea data into array items
				
		for ( var i = 0; i < txtArray.length; i++) 
		{
			var p = false;
			var s = "";
			
			if ( txtArray[i].substr(0,1) == txtPrefix)
				p = true;
			
			if ( txtArray[i].substr( (txtArray[i].length-1), (txtArray[i].length-1) ) == txtSuffix )
				s = true;
		
		    //console.log( "Last char: " + txtArray[i].substr( (txtArray[i].length-1), (txtArray[i].length-1) ) );
			
			// Remove both Prefix and Suffix
			if ( p && s) {
				txtArray[i] = txtArray[i].substr(1, txtArray[i].length-2);
			
			// Else: Remove Prefix
			} else if ( p ) {
				txtArray[i] = txtArray[i].substr(1, txtArray[i].length);
				
			// Else: Remove Suffix
			} else if ( s ) {
				txtArray[i] = txtArray[i].substr(0, txtArray[i].length-2);
			
			// Else: Don't remove anything - No code needed.
			}
		}
		
        $('#txtaData').val(txtArray.join("\n"));
        
	}
};

WorkTool.addToolToTools(ToolTextAddPrefixSuffix);
//console.log(WorkTool.Tools);
//console.log('ToolTextAddPrefixSuffix.js: ' + HtmlBuilder.buildHtmlString( ToolTextAddPrefixSuffix.content() ) );


	
		