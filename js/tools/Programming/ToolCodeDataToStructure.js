var ToolDataToStructure = ToolDataToStructure || {
    
    name: 'CSV Data to JavaScript',
    category: 'Code',
    description: 'Convert CSV, TSV, etc to a JavaScript Array. (Uses PapaParse version 4)',
    header: 'CSV Data to JavaScript', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        var hr = {tagName: 'hr'};
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolDataToStructure.description};
        
        var divStatus = '<div id="divStatus" ' + 
            'style="display:none;position:absolute;left:0px;top:45px;width:100%;background-color:darkred;color:white;text-align:center;">' + 
            '</div>';
        
        var radioParams = '<fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" >' + 
            '<legend>Output:</legend>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-1" value="Array" checked="checked" />' +
         	'<label for="radio-choice-1">CSV -> Array</label>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-2" value="JSON"  />' + 
         	'<label for="radio-choice-2">CSV -> JSON</label>' +
            '</fieldset>';
        
        var txtArrayName = '<label for="txtArrayName">Name:</label>' +
            '<input type="text" id="txtArrayName" data-clear-btn="true" />';
        
        var txtaData = '<label for="txtaData">Data:</label>' + 
            '<textarea  style="overflow:auto;" rows="6" data-autogrow="false" id="txtaData" placeholder="Enter List or CSV data here">' +
            '</textarea>';
        
        var buttons = '<button id="btnParse">Parse!</button>';
        
        var divResults = '<h2>Results:</h2><div id="divResults" style="white-space:pre;">Click "Parse!" to see results here!</div>';
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlsoItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['CreativystSM CSV to JavaScript Converter', 'http://creativyst.com/Prod/17/'],
            ['Papa Parse', 'http://papaparse.com/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
    
        var seeAlso = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( seeAlsoItems, {tagName: 'li'} )};
        
        var fieldcontain = {tagName: 'div',
                            attributes: {'data-role':"fieldcontain"},
                            childObjects: [radioParams, br,
                                           txtArrayName, br,
                                           txtaData
                                          ]
                           };
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     //contentString,
                                     divStatus,
                                     fieldcontain,
                                     buttons, br,
                                     divResults,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtArrayName').focus();
    },
    
    events: function() {
        $('#btnParse').on('click', function() { 
                        
            //console.log('Setup: Functions, etc'); // -----------------------------------------
            
            var showStatus = function(msg){
                $('#divStatus').text(msg);
                $('#divStatus').slideDown(1000, function() { 
                    setTimeout( function(){ $('#divStatus').slideUp(1100); }, 500); 
                });
            };
            
            var Process = [];
            
                Process['Array'] = function(results){ // Process out to JavaScript Array
                    
                    var br = "<br />";
                    var lines = results.data.length;
                    var strResults = txtArrayName + ' = [';
                    
                    var processArrayContents = function(arr) {
                        var rText = "";

                        for (var i = 0; i < arr.length; i++) { rText += isNaN(arr[i]) ? '"' + arr[i] + '",' : arr[i] + ','; }

                        if ( rText.substr(-1) == "," ) { rText = rText.substring(0, rText.length-1); }

                        return rText;
                    };

                    // Perform write once or multiple times. [,,,] or [[,,,],[,,,,],...]
                    if ( lines == 1 ) { // Simple horizontal list
                        strResults += processArrayContents(results.data[0]);

                    } else if ( lines > 1 ) {

                        for ( l = 0; l < lines; l++) { strResults += '[' + processArrayContents(results.data[l]) + '],' + br; }

                        strResults = strResults.substring(0,strResults.length-7); // ',<br />'
                    }

                    strResults += '];';
                    return strResults;
                };
            
                Process['JSON'] = function(results){
                    return JSON.stringify(results, null, 2);
                };
            
            // console.log('UI Control Validation'); // -----------------------------------------
            
            var radioOutput = $('input[name="radio-choice-1"]:checked').val();
            if ( radioOutput == undefined ) { console.log('Radio selection not found for Output.'); return; }
            
            var txtArrayName = $('#txtArrayName').val().trim();
            
            if ( txtArrayName == "" || txtArrayName.length == 0 || txtArrayName == undefined ) {
                
                if ( radioOutput == "Array" )
                    showStatus("'Array Name' field is invalid or empty. Using 'ArrayName'");
                
                txtArrayName = 'ArrayName';
                //return;
            }
            
            var txtaData = $('#txtaData').val().trim();
            if ( txtaData == "" || txtaData.length == 0 || txtaData == undefined ) {
                showStatus('CSV or List data not defined.');
                return;
            }
		
            // console.log('Papa Parse'); // -----------------------------------------
            
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
            
            var results = Papa.parse(/*CSV String*/ txtaData, /*PapaParse Configuration*/ config );
            /*
	        results = {
            data: [ ... ],    // parsed data
            errors: [ ... ],  // errors encountered
            meta: {	... }     // extra parse info
            }
            */
            
            //console.log("Results:");
            //console.log(results);
            
            if ( results.errors !== undefined && results.errors.length > 0) {
                showStatus('Errors found. Please review console.');
                console.log('Errors found. Please review console.');
                console.log(results);
            }
            
            if ( results.data !== undefined || results.data.length == 0 ) {
                console.log('No data to work with.');
                console.log(results);
            }
            
            //console.log('Building Display'); // -----------------------------------------
            
            var output = Process[radioOutput](results);
            
            //console.log('Displaying Results'); // -----------------------------------------
            
            $('#divResults').html(output);            
            
        });
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolDataToStructure);
//console.log(WorkTool.Tools);
//console.log('ToolDataToStructure.js: ' + HtmlBuilder.buildHtmlString( ToolDataToStructure.content() ) );