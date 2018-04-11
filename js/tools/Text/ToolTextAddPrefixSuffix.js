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
        
        var radioDataType = '<fieldset data-role="controlgroup" data-mini="true" data-type="horizontal" data-role="fieldcontain" >' + 
            '<legend>Input:</legend>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-1A" value="Plain" checked="checked" />' +
         	'<label for="radio-choice-1A">Plain Text</label>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-1B" value="CSV"  />' + 
         	'<label for="radio-choice-1B">CSV/TSV</label>' +
            '</fieldset>';
        
        var txtPrefix = '<label for="txtPrefix">Prefix:</label>'
		              + '<input id="txtPrefix" type="text" data-clear-btn="true" placeholder="Enter Prefix Here" />';
        
        var txtSuffix = '<label for="txtSuffix">Suffix:</label>'
			          + '<input id="txtSuffix" type="text" data-clear-btn="true" placeholder="Enter Suffix Here" />';
        
        var txtaData = '<label for="data">Data:</label>'
			          + '<textarea id="txtaData" data-autogrow="false" rows=5 placeholder="Place plain text or CSVdata to convert here" >'
                      + '</textarea>';
        
        var buttons = '<button id="btnAdd" data-inline="true" style="display:inline;" >Add</button>'
			          + '<button id="btnRemove" data-inline="true" style="display:inline;" >Remove</button>';
        
        // LIST (ul): See Also
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        
        var fieldcontain = {tagName: 'div',
                            attributes: {'data-role':"fieldcontain"},
                            childObjects: [radioDataType, br,
                                           txtPrefix, br,
                                           txtSuffix, br,
                                           txtaData, br
                                          ]
                           };
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [//descHeader, 
                                     descInfo, // Description
                                     //dirheader, 
                                     Directions, // Directions
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
        
        $('#btnAdd').click({arg:'Add'}, ToolTextAddPrefixSuffix.onAddOrRemove);
        $('#btnRemove').click({arg:'Remove'}, ToolTextAddPrefixSuffix.onAddOrRemove);
        
    }, // End of events (event listeners)
    
    onAddOrRemove: function(event) {
        // This function is the main function--It sets up for processing for the adding and removing of 
        // prefixes and suffixes.
        
        // ARGUMENTS
        var choice = event.data.arg; // See JQuery event listener documentation
        //console.log('Choice: ' + choice);
        
        // SETUP
        var txtaData = $('#txtaData').val();
        var radioInput = $('input[name="radio-choice-1"]:checked').val();
        
        // VALIDATION
        if ( txtaData.length == 0 ) { console.log('No data found to process.'); return; }
        if ( radioInput.length == 0 ) { console.log('No input radio button value found.'); return; }
        
        // PROCESSING
        if ( radioInput == 'Plain' ) { // Process data as Plain Text
            
            var textlines = txtaData.split("\n"); // Works for 1 or multiple lines of text in <textarea>
				
            for ( var i = 0; i < textlines.length; i++) 
            {
                switch ( choice ) {
                    case 'Add':
                        textlines[i] = ToolTextAddPrefixSuffix.onAdd(textlines[i]);
                        break;
                        
                    case 'Remove':
                        textlines[i] = ToolTextAddPrefixSuffix.onRemove(textlines[i]);
                        break;
                }
            }
            
            // DISPLAY OUTPUT
            $('#txtaData').val( textlines.join("\n") );
            
        } else if ( radioInput == 'CSV') { // Process data as CSV/TSV/etc.
            
            // #.) Use Papa Parse to auto-detect and parse CSV data
            var config = {
                delimiter: "",	// auto-detect
                newline: "",	// auto-detect
                header: false,
                dynamicTyping: false,
                preview: 0,
                encoding: "",
                worker: false,
                comments: false,
                step: undefined,
                complete: undefined,
                error: undefined,
                download: false,
                //skipEmptyLines: false,
                skipEmptyLines: true,
                chunk: undefined,
                fastMode: undefined,
                beforeFirstChunk: undefined,
                withCredentials: undefined
            };

            var results = Papa.parse(/*CSV String*/ txtaData, /*PapaParse Configuration*/ config );
            var delimiter = results.meta.delimiter;
            /*
            results = {
                data: [ ... ],    // parsed data
                errors: [ ... ],  // errors encountered
                meta: {	... }     // extra parse info 
            } */

            // #.) CSV VALIDATION: Allow valid errors
            var validErrors = [];
                validErrors["Unable to auto-detect delimiting character; defaulted to ','"] = 1; // May need more..

            if ( results.errors !== undefined && results.errors.length > 0 ) { // If we have errors
                if ( results.errors.length == 1 && validErrors[results.errors[0].message] ) {
                    "Do nothing it's valid";

                } else {
                    console.log('Non-allowed errors found. See object');
                    console.log(results);
                    return;
                }
            }

            // #.) CSV VALIDATION: Check for Data to Process
            if ( results.data == undefined || results.data.length == 0 ) {
                console.log('PapaParse returned no data to process from input.');
                console.log(results);
                return;
            }

            // PROCESSING
            var processedLines = [];

            // data: [row][column1, column2, column3 ...]

            for (var i = 0; i < results.data.length; i++) { // for each row
                //console.log('Processing row: ' + i + ', delimiter: ' + delimiter);
                var processedLine = "";

                for (var x = 0; x < results.data[i].length; x++) { // For each column/cell
                    switch ( choice ) {
                        case 'Add':
                            processedLine += ToolTextAddPrefixSuffix.onAdd(results.data[i][x]) + delimiter;
                            break;

                        case 'Remove':
                            processedLine += ToolTextAddPrefixSuffix.onRemove(results.data[i][x]) + delimiter;
                            break;
                    }
                }

                var lastDel = processedLine.lastIndexOf(delimiter);
                processedLine = processedLine.substring(0,lastDel); // Removes last delimiter added.

                // If we end line on a delimiter show it in red to show mistakes in CSV data format
                if ( processedLine.lastIndexOf(delimiter) == processedLine.length-1 ) {
                    processedLine = processedLine.substring(0,processedLine.lastIndexOf(delimiter)) + 
                        '<span style="color:red;font-weight:bold;">' + delimiter + '</span>';
                }

                processedLines[i] = processedLine;
            }
            
            // DISPLAY OUTPUT
            $('#txtaData').val( processedLines.join('\n') );
            
        } else { // No radio value
            console.log('Radio button value is neither Plain nor CSV');
        }
        
    },
    
    onAdd: function (textToChange) {
		// This function adds the 'Prefix' and 'Suffix' as configured by the end-user.
        
        // SETUP
		var txtPrefix = $('#txtPrefix').val();
		var txtSuffix = $('#txtSuffix').val();
        
        // VALIDATION
        if ( txtPrefix.length == 0 && txtSuffix.length == 0 )
            return textToChange; // No changes since nothing was entered for prefix and suffix.
        
        // PROCESSING
        return txtPrefix + textToChange + txtSuffix;
	},
	
    onRemove: function (textToChange) {
        // This function removes the 'Prefix' and 'Suffix' as configured by the end-user if it has been applied to 
        // the textlines currently.
        
        // SETUP
        var txtPrefix = $('#txtPrefix').val();
		var txtSuffix = $('#txtSuffix').val();
        
        var p = textToChange.substring(0,txtPrefix.length) == txtPrefix ? true : false; // Prefix present in text?
        var s = textToChange.substr((-1 * txtSuffix.length)) == txtSuffix ? true : false; // Suffix present in text?
        
        var updatedText = "";
        
        // VALIDATION
        // #.) If text does not contain the 'Prefix' and 'Suffix' text (nothing to remove)
        if ( !p && !s )
            return textToChange;
        
        // #.) Do not remove anything if the text just equals either the prefix or suffix text (do not fully remove text)
        if ( textToChange == txtPrefix || textToChange == txtSuffix )
            return textToChange;
        
        // #.) Do not remove if the text is 'Prefix' + 'Suffix' (do not fully remove text)
        if ( textToChange == (txtPrefix + txtSuffix) )
            return textToChange;
				
        // PROCESSING
        // #.) If present, remove prefix and suffix text
        if ( p && s ) {
            updatedText = textToChange.substring(txtPrefix.length, textToChange.length); // Remove prefix; Leaves middle and suffix
            updatedText = updatedText.substring(0, (updatedText.length - txtSuffix.length) ); // Remove suffix
            return updatedText;
            
        } else if ( p && !s ) {
            return textToChange.substring(txtPrefix.length, textToChange.length);
        
        } else if ( !p && s ) {
            return textToChange.substring(0, (updatedText.length - txtSuffix.length) );
        
        } else {
            console.log('p and s is not defined. Return original value.');
            return textToChange;
        }
        
	},
    
    // Tool Class Methods -- Cannot rely on document elements to be present.
};

WorkTool.addToolToTools(ToolTextAddPrefixSuffix);
//console.log(WorkTool.Tools);
//console.log('ToolTextAddPrefixSuffix.js: ' + HtmlBuilder.buildHtmlString( ToolTextAddPrefixSuffix.content() ) );


	
		