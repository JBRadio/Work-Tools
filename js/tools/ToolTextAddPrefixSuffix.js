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
        
        var Controls  = '<label for="txtPrefix">Prefix:</label>'
		              + '<input id="txtPrefix" type="text" placeholder="Enter Prefix Here" />'
                      + '<br />'
			          + '<label for="txtSuffix">Suffix:</label>'
			          + '<input id="txtSuffix" type="text" placeholder="Enter Suffix Here" />'
                      + '<br />'
		              + '<label for="data">Data:</label>'
			          + '<textarea id="txtaData" cols=75 rows=10 placeholder="Place data to convert here" >'
                      + '</textarea>'
                      + '<br />'
			          + '<button id="btnAdd" data-inline="true" style="display:inline;" >Add</button>'
			          + '<button id="btnRemove" data-inline="true" style="display:inline;" >Remove</button>'
                      + '<br />';
        
        // LIST (ul): See Also
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, // Description
                                     dirheader, Directions, // Directions
                                     Controls,
                                     seeAlsoHeader] // See Also
                      };
        return content;
    }, // End of content
    
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


	
		