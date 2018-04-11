var ToolTextTrimText = ToolTextTrimText || {
    
    name: 'Trim Text Lines',
    category: 'Text',
    description: 'Remove preceding and trailing spaces. (Uses PapaParse version 4)',
    header: 'Trim Text Lines', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        //var btnProcess = {tagName: 'input',
        //                  attributes: {id:'btnProcess', type:'button', value:'Process!'}};
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolTextTrimText.description};
        
        var radioDataType = '<fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" >' + 
            '<legend>Data:</legend>' +
         	'<input type="radio" name="radio-choice-2" id="radio-choice-2A" value="Plain" checked="checked" />' +
         	'<label for="radio-choice-2A">Plain Text</label>' +
         	'<input type="radio" name="radio-choice-2" id="radio-choice-2B" value="CSV"  />' + 
         	'<label for="radio-choice-2B">CSV/TSV</label>' +
            '</fieldset>';
        
        var radioParams = '<fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" >' + 
            '<legend>Trim:</legend>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-1" value="Left" />' +
         	'<label for="radio-choice-1">Left</label>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-2" value="Right"  />' + 
         	'<label for="radio-choice-2">Right</label>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-3" value="Both" checked="checked" />' +
         	'<label for="radio-choice-3">Both</label>' +
            '</fieldset>';
            
        var txtaInput = {tagName: 'textarea',
                         attributes: {id:'txtaInput', placeholder:'Enter input here and see results below.', 'rows':5, 'data-autogrow':false}};
        
        var resultsHeader = {tagName: 'h4', innerHTML: 'Results: '};
        //var txtaResults = {tagName: 'textarea',
        //                   attributes: {id:'txtaResults', placeholder:'Results appear here...'}};
        var divResults = {tagName: 'div',
                          attributes: {id:'divResults', placeholder:'Results show here...'},
                          inlineStyle: {'white-space':'pre;'}
                         };
        
        var fieldcontain = {tagName: 'div',
                            attributes: {'data-role':"fieldcontain"},
                            childObjects: [radioDataType, br,
                                           radioParams, br,
                                           txtaInput]
                           };
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     //radioDataType, br,
                                     //radioParams, br,
                                     //txtaInput, br, 
                                     //btnProcess, br, 
                                     //txtaResults
                                     fieldcontain,
                                     resultsHeader, divResults
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtaInput').focus();
    },
    
    events: function() { 
        
        var Process = [];
            Process['Left'] = function(text) { return text.trimLeft(); };
            Process['Right'] = function(text) { return text.trimRight(); };
            Process['Both'] = function(text) { return text.trim(); };
        
        // Main process: Process text based on keyUp event.
        var keyUpEvent = function() {
            
            // #.) SETUP: Get radio button checked value ( Determinate in processing text )
            var radioData = $('input[name="radio-choice-2"]:checked').val();
            if ( radioData == undefined ) { console.log('Radio selection not found.'); return; }
            //console.log('Radio Data Type: ' + radioData);
            
            var radioTrim = $('input[name="radio-choice-1"]:checked').val();
            if ( radioTrim == undefined ) { console.log('Radio selection not found.'); return; }
            //console.log('Trim type: ' + radioTrim);
            
            
            // #.) SETUP: Get user input
            var usrInput = $('#txtaInput').val();
            if ( usrInput == "" || usrInput.length == 0 || usrInput == undefined ) return;
            
            // #.) Process input based on Trim selection and Data selection
            var processedLines = [];
            
            if ( radioData == "CSV" ) { // Process CSV with PapaParse
                
                // #.) Maybe we shouldn't process CSV input if not enough characters have been typed. (PART!)
                //      - "a" can't be processed
                //      - "a," doesn't mean anything...
                //      - "a,b" This is valid
                //      - These steps prevent additional processing if the data is being typed by hand.
                var lines = usrInput.split('\n');
                var lastLine = lines[lines.length-1];
                
                if ( usrInput.length < 3 ) { 
                    //console.log('Total data is less than 3 characters');
                    return; 
                } else if ( lastLine.length < 3 ) { 
                    //console.log('Last line less than 3: ' + lastLine);
                    return; 
                }
                
                // Papa Parse
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
                    skipEmptyLines: false,
                    chunk: undefined,
                    fastMode: undefined,
                    beforeFirstChunk: undefined,
                    withCredentials: undefined
                };
                
                var results = Papa.parse(/*CSV String*/ usrInput, /*PapaParse Configuration*/ config );
                /*
                results = {
                data: [ ... ],    // parsed data
                errors: [ ... ],  // errors encountered
                meta: {	... }     // extra parse info }
                */
                //console.log(results);
                var delimiter = results.meta.delimiter;
                
                // #.) Maybe we shouldn't process CSV input if not enough characters have been typed. (PART2)
                var pplines = results.data;
                //if ( pplines[0].length == 1 ) { console.log('Could contain delimiter'); return; }
                //else if ( pplines[lines.length-1].length == 1 ) { console.log('Last line could contain delimiter'); return; }
                if ( pplines[lines.length-1].length == 1 ) { 
                    //console.log('Last line could contain delimiter'); 
                    return; 
                }
                
                if ( delimiter !== "" ) {
                    
                    //if ( lines[0].lastIndexOf(delimiter) == lines[0].length-1 ) {
                    //    console.log('First line ends on delimiter'); return;
                    //} else if ( lastLine.lastIndexOf(delimiter) == lastLine.length-1 ) {
                    if ( lastLine.lastIndexOf(delimiter) == lastLine.length-1 ) {
                        //console.log('Last line ends on delimiter'); 
                        return;
                    }
                }
                
                // #.) Check for Errors
                var validErrors = [];
                    validErrors["Unable to auto-detect delimiting character; defaulted to ','"] = 1;
                
                if ( results.errors !== undefined && results.errors.length > 0 ) {
                    
                    if ( results.errors.length == 1 && validErrors[results.errors[0].message] ) {
                        "Do nothing it's valid";
                        
                    } else {
                        $('#divResults').text('Errors found. Please review console.');
                        console.log('Errors found.');
                        console.log(results);
                        return;
                    }
                }
                
                // #.) Check for Data to Process
                if ( results.data == undefined || results.data.length == 0 ) {
                    $('#divResults').text('No data returned from CSV.');
                    console.log('PapaParse returned no data to process from input.');
                    console.log(results);
                    return;
                }
                
                // data: [row][column1, column2, column3 ...]
                
                for (var i = 0; i < results.data.length; i++) {
                    //console.log('Processing row: ' + i + ', delimiter: ' + delimiter);
                    var processedLine = "";
                    
                    for (var x = 0; x < results.data[i].length; x++) {
                        
                        // Likely not needed to add text to the original input
                        //if ( isNaN(Process[radioTrim](results.data[i][x])) )
                        //    processedLine += '"' + Process[radioTrim](results.data[i][x]) + '"' + delimiter;
                        //else
                            processedLine += Process[radioTrim](results.data[i][x]) + delimiter;
                    }
                    
                    var lastDel = processedLine.lastIndexOf(delimiter);
                    processedLine = processedLine.substring(0,lastDel);
                    
                    // If we end line on a delimiter show it in red to show mistakes
                    if ( processedLine.lastIndexOf(delimiter) == processedLine.length-1 ) {
                        processedLine = processedLine.substring(0,processedLine.lastIndexOf(delimiter)) + 
                            '<span style="color:red;font-weight:bold;">' + delimiter + '</span>';
                    }
                        
                    processedLines[i] = processedLine;
                }
                
            } else {
                // Plain Text
                var lines = usrInput.split('\n');
                processedLines = lines.map(function(value, index, array) {
                   return Process[radioTrim](value);
                });
            }
            
            // #.) Display results: Format processedLines
            //      CSV
            //      We stop displaying data to the display if: (So we only show what we need to)
            //          - the current working line/last line ends on a delimiter
            //          - the current working line doesn't have 2 items (not separated by a delimiter)
            //          - if the last delimiter shows, we highlight in red and bold
            $('#divResults').html( processedLines.join('<br />') );
                  
        };
        
        // Event Listeners
        $('#txtaInput').on('keyup', keyUpEvent);
        $('input[name="radio-choice-1"]:radio').change(keyUpEvent); // PARAMS
        $('input[name="radio-choice-2"]:radio').change(keyUpEvent); // DATA
        
    } // End of events (event listeners)
};

WorkTool.addToolToTools(ToolTextTrimText);
//console.log(WorkTool.Tools);
//console.log('ToolTextTrimText.js: ' + HtmlBuilder.buildHtmlString( ToolTextTrimText.content() ) );