var ToolDataToStructure = ToolDataToStructure || {
    
    name: 'CSV Data to Data Object',
    category: 'Code',
    description: 'Convert CSV, TSV, etc to a JavaScript Array. (Uses PapaParse version 4)',
    header: 'CSV Data to Data Object', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        var hr = {tagName: 'hr'};
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolDataToStructure.description};
        
        var contentString = '<div id="divStatus" style="display:none;position:absolute;left:0px;top:45px;width:100%;background-color:darkred;color:white;text-align:center;"></div>' + 
            '<label for="txtArrayName">Array Name:</label>' +
            '<input type="text" id="txtArrayName" /><br />' +
            '<label for="txtaData">Data:</label>' + 
            '<textarea  style="overflow:auto;" rows="6" data-autogrow="false" id="txtaData" placeholder="Enter List or CSV data here"></textarea><br />' + 
            '<button id="btnParse">Parse!</button><br />' + 
            '<h2>Results:</h2>' +
            '<div id="divResults">Click "Parse!" to see results here!</div>';
        
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
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     contentString,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        $('#btnParse').on('click', function() { 
            
            // SETUP
            //console.log('Setup');
            
            var showStatus = function(msg){
                $('#divStatus').text(msg);
                $('#divStatus').slideDown(1000, function() { 
                    setTimeout( function(){ $('#divStatus').slideUp(1100); }, 500); 
                });
            };
            
            var txtArrayName = $('#txtArrayName').val().trim();
            if ( txtArrayName == "" || txtArrayName.length == 0 || txtArrayName == undefined ) {
                showStatus("'Array Name' field is invalid or empty. Using 'ArrayName'");
                txtArrayName = 'ArrayName';
                //return;
            }
            
            var txtaData = $('#txtaData').val().trim();
            if ( txtaData == "" || txtaData.length == 0 || txtaData == undefined ) {
                showStatus('CSV or List data not defined.');
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
            
            //console.log('Parsing CSV');
            
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
            
            //console.log('Building Display');
            
            // Display Results
            var br = "<br />";
            var lines = results.data.length;
            var strResults = txtArrayName + ' = [';
            // ArrayName = [1,2,3,4,5];
            // ArrayName = [[1,2,3,4,5],[],[]]
            
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
            
            //console.log('Displaying Results');
            $('#divResults').html(strResults);            
            
        });
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolDataToStructure);
//console.log(WorkTool.Tools);
//console.log('ToolDataToStructure.js: ' + HtmlBuilder.buildHtmlString( ToolDataToStructure.content() ) );