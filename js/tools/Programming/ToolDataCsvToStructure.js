/*
 * Convert CSV data to another Format
 *
 * NOTEs:
 *  - We'll be using PapaParse to parse CSV data.
       http://papaparse.com/
 *  - PapaParse can auto-detect delimiters after scanning the first few rows.
       var results = Papa.parse(csvString);
       console.log(results.meta.delimiter);
 *
 *  Features
 *   - Process user inputted text in <textarea>
       CSV, TSV, other delimiter (PapaParse will auto-detect)
       Plain Text
 *   - Read local file content and copy it into <textarea> (do not store)
 *   - CSV to <table> or other kinds of tables will not happen in this tool but likely a <table> or table generator.
       
 */
var ToolDataToStructure = ToolDataToStructure || {
    
    name: 'CSV Data to JS, ...',
    category: 'Data',
    description: 'Using PapaParse (Version 4), to auto-detect delimiters and convert data such as CSV, TSV, etc to another format. ',
    header: 'CSV Data to JS, ...', // Title to appear in Tool Page
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
         	'<label for="radio-choice-1">JS Array</label>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-2" value="JSON"  />' + 
         	'<label for="radio-choice-2">JSON</label>' +
            '<label for="radio-choice-3">&lt;table&gt;</label>' +
            '<input type="radio" name="radio-choice-1" id="radio-choice-3" value="table" />' +
            '<label for="radio-choice-4">.md</label>' +
            '<input type="radio" name="radio-choice-1" id="radio-choice-4" value="markdown" />' +
            '</fieldset>';
        
        var txtaData = '<label for="txtaData">Data:</label>' + 
            '<textarea  style="overflow:auto;" rows="6" data-autogrow="false" id="txtaData" placeholder="Enter List or CSV data here">' +
            '</textarea>';
        
        var buttons = '<button id="btnParse">Parse!</button>';
        
        // Accept formats:
        // http://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
        var btnUploadFile = '<input id="btnUploadFile" type="file" accept=".csv, .tsv, text/plain" >';      
        var btnReReadFile = '<button id="btnReReadFile" data-inline="true">Re-read File</button>';
        var btnClearFile = '<button id="btnClearFile" data-inline="true">Clear File Chosen</button>';
        
        var btnUrlRequest = '<button id="btnUrlRequest" data-inline="true">Request URL Data</button>';
        
        //var cboxUploadFile = '<label>' + 
        //    '<input id="cboxUploadFile" type="checkbox" value="uploading_file" >' + 'Upload a file to process?</label>';
        
        var collapseUploadFile = '<div data-role="collapsible">' + 
            '<h3>Upload a file to process?</h3>' +
            btnUploadFile + 
            btnReReadFile + btnClearFile + 
            '</div>';
        
        var collapseLoadByUrl = '<div data-role="collapsible">' +
            '<h3>Upload CSV data by URL?</h3>' + 
            '<input type="text" id="txtCsvUrl" data-inline="true" placeholder="Enter URL to get CSV file here." />' + 
            btnUrlRequest +
            '</div>';
        
        var divResults = '<h2>Results:</h2>' + 
                         '<div id="divResults" style="white-space:pre; height:145px; overflow: auto;">' + 
                         'Click "Parse!" to see results here!</div>';
                         //'<textarea id="txtaResults" placeholder="Click \'Parse!\' to see results here!" readonly="readonly"' +
                         //'style="white-space:pre; height:145px; overflow: auto;" >' + 
                         //'</textarea>';
        
        // Convert to CSV
        var convertToCsvHeader = '<h2>Convert to CSV</h2>';
        var convertToCsv = HtmlBuilder.buildHtmlLinkList([
            ['Flat File to CSV', 'http://www.convertcsv.com/fixed-width-to-csv.htm'],
            ['GeoJSON to CSV', 'http://www.convertcsv.com/geojson-to-csv.htm'],
            ['HTML Links to CSV', 'http://www.convertcsv.com/html-links-to-csv.htm'],
            ['HTML Table to CSV', 'http://www.convertcsv.com/html-table-to-csv.htm'],
            ['JSON to CSV', 'http://www.convertcsv.com/json-to-csv.htm'],
            ['KML to CSV', 'http://www.convertcsv.com/kml-to-csv.htm'],
            ['SQL to CSV', 'http://www.convertcsv.com/sql-to-csv.htm'],
            ['XML to CSV', 'http://www.convertcsv.com/xml-to-csv.htm'],
            ['Convert XML to CSV', 'https://json-csv.com/xml'],
            ['YAML to CSV', 'http://www.convertcsv.com/yaml-to-csv.htm']
        ]);
            
        
        // Convert from CSV
        var convertFromCsvHeader = '<h2>Convert from CSV</h2>';
        var convertFromCsv = HtmlBuilder.buildHtmlLinkList([
            ['CreativystSM CSV to JavaScript Converter', 'http://creativyst.com/Prod/17/'],
            ['CSV to HTML/Wiki Table', 'http://www.convertcsv.com/csv-to-html.htm'],
            ['CSV to JSON', 'http://www.convertcsv.com/csv-to-json.htm'],
            ['CSV to KML', 'http://www.convertcsv.com/csv-to-kml.htm'],
            ['CSV to Markdown Table Generator', 'https://donatstudios.com/CsvToMarkdownTable'],
            ['CSV to Multi-line Data', 'http://www.convertcsv.com/csv-to-multiline-data.htm'],
            ['CSV to SQL', 'http://www.convertcsv.com/csv-to-sql.htm'],
            ['CSV to XML', 'http://www.convertcsv.com/csv-to-xml.htm'],
            ['CSV to YAML', 'http://www.convertcsv.com/csv-to-yaml.htm'],
            ['CSV Template Engine', 'http://www.convertcsv.com/csv-to-template-output.htm'],
            ['Mr. Data Converter', 'https://shancarter.github.io/mr-data-converter/']
        ]);
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlso = HtmlBuilder.buildHtmlLinkList([
            ['PapaParse (JS Class)', 'http://papaparse.com/']
            //['name','href'],
            ]);
        
        var fieldcontain = {tagName: 'div',
                            attributes: {'data-role':"fieldcontain"},
                            childObjects: [//radioParams, br,
                                           //cboxUploadFile, br,
                                           //btnUploadFile, br,
                                           collapseUploadFile, //br,
                                           collapseLoadByUrl, br,
                                           radioParams, br,
                                           txtaData
                                          ]
                           };
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [//descHeader, 
                                     descInfo, br,
                                     //contentString,
                                     divStatus,
                                     fieldcontain,
                                     buttons, br,
                                     divResults,
                                     convertFromCsvHeader, convertFromCsv,
                                     convertToCsvHeader, convertToCsv,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtArrayName').focus();
    },
    
    readFile: function(file) {
        // Reads a file uploaded via <input text="file" ...>
        var reader = new FileReader();
        reader.onload = function(event)
        {
            // NOTE: event.target point to FileReader
            var contents = event.target.result;
            //var lines = contents.split('\n');
            
            console.log('Read contents: ' + contents);
            $('#txtaData').val(contents);
        };

        reader.readAsText(file);
    },
    
    events: function() {
        
        $('#btnClearFile').on('click', function() {
            $('#btnUploadFile').val('');
        });
        
        $('#btnReReadFile').on('click', function() {
            if ( $('#btnUploadFile').val() !== '' ) {
                var selectedFile = document.getElementById('btnUploadFile').files[0];
                ToolDataToStructure.readFile(selectedFile);
            }
                
        });
        
        $('#btnUrlRequest').on('click',function(){
            var txtCsvUrl = $('#txtCsvUrl').val();
            
            if ( txtCsvUrl == undefined ) { console.log('Unable to find URL textbox.'); return; }
            if ( txtCsvUrl.trim().length == 0 ) { console.log('No URL to process'); return; }
            
            if ( txtCsvUrl.indexOf('http') == -1 && txtCsvUrl.indexOf('file:') == -1 ) {
                console.log('URL text is not valid.');
                return;
            }
            
            var xhr = CORS.createCORSRequest('GET', txtCsvUrl);

            if (!xhr) {
                //throw new Error('CORS not supported');
                alert ("CORS not supported.");
            }

            CORS.sendCORSRequest(xhr, {
                onload: function(){
                    var allRows = xhr.responseText.split(/\r?\n|\r/);
                    $('#txtaData').val(allRows.join('<br />'));
                }
            });
                
        });
        
        $('#btnUploadFile').on('change', function() {
            
            if ( $('#btnUploadFile').val() !== "" ) {
                var selectedFile = this.files[0];
                console.log("File uploaded (Name: " + selectedFile.name + ", Type: " + selectedFile.type + ", Size: " + selectedFile.size + ")");
                //console.log(this.files);

                // Validate uploaded file (user can change predefined files)
                var validExts = new Array(".csv", ".txt", ".tsv");
                var fileExt = selectedFile.name;
                    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));

                if (validExts.indexOf(fileExt) < 0) {
                    console.log("Invalid file selected, valid files are of " + validExts.toString() + " types.");

                    // Remove file from element
                    $('#btnUploadFile').val('');
                    return false; // Exit otherwise process the file contents
                }

                ToolDataToStructure.readFile(selectedFile);
            }
        });
        
        $('#btnParse').on('click', function() { 
            // 1.) User selects output type for CSV (Array, JSON, etc.)
            // 2.) User enters CSV or similar delimiter data in textarea
            //  - OR -
            // 2.) User uses upload file button to get data in textarea
            // 3.) User clicks processing button ("Parse") for output to display
            // 4.) User reviews/copies results
            
            //console.log('Setup: Functions, etc'); // -----------------------------------------
            
            var showStatus = function(msg){
                $('#divStatus').text(msg);
                $('#divStatus').slideDown(1000, function() { 
                    setTimeout( function(){ $('#divStatus').slideUp(1100); }, 500); 
                });
            };
            
            var Markdown = [];
                Markdown['row'] = function(cellValue) { return cellValue + "|"; };
                Markdown['separator'] = function(headerCount) {
                    var rText = "|";
                    for ( var i = 0; i < headerCount; i++ ) { rText += "---|"; }
                    return rText;
                };
            
            
            var Process = [];
            
                Process['Array'] = function(results){ // Process out to JavaScript Array
                    return JSON.stringify(results.data);
                };
            
                Process['JSON'] = function(results){
                    return JSON.stringify(results, null, 2);
                };
            
                Process['markdown'] = function(results) { return Process['table'](results, true); };
             
            
                Process['table'] = function(/* PapaParse */ results, /* Markdown flag */ md) {
                    var br = "<br />"; // use <br /> for div and \n for <textarea>
                    var lt = '&lt;', gt = '&gt;';
                    var rows = results.data;
                    var columns;
                    var cell;
                    
                    // MD: |
                    var rTable = md ? "|" :
                                 lt + 'table' + gt + br + 
                                 lt + 'thead' + gt + br;
                    
                    for (var row = 0; row < rows.length; row++) {
                        columns = rows[row];
                        
                        // MD: |
                        rTable += md ? "" : lt + 'tr' + gt + br;
                        
                        for ( var column = 0; column < columns.length; column++ ) {
                            cell = rows[row][column];
                            
                            if ( row == 0 ) {
                                // MD: |HEADER|HEADER|..|
                                rTable += md ? Markdown["row"](cell) :
                                          lt + 'th' + gt + cell + lt + '/th' + gt;
                            } else
                                // MD: |HEADER|HEADER|..|
                                //     |---|---|
                                //     |CELL|CELL|..|
                                rTable += md ? Markdown["row"](cell) :
                                          lt + 'td' + gt + cell + lt + '/td' + gt;
                        }
                        
                        if ( row == 0 ) {
                            // MD: |HEADER|HEADER|..|
                            //     |---|---|..|
                            rTable += md ? br + Markdown['separator'](rows[0].length) + br + "|": 
                                      br + lt + '/tr' + gt + br + lt + '/thead' + gt + br;
                            rTable += md ? "" : lt + 'tbody' + gt + br;
                        } else
                            rTable += (md && row != rows.length-1) ? br + "|" : 
                                      md ? "" :
                                      br + lt + '/tr' + gt + br;
                    }
                    
                    rTable += md ? "" : lt + '/tbody' + gt + br;
                    rTable += md ? "" : lt + '/table' + gt;
                    return rTable;
                    
                };
            
            // console.log('UI Control Validation'); // -----------------------------------------
            
            var radioOutput = $('input[name="radio-choice-1"]:checked').val();
            if ( radioOutput == undefined ) { console.log('Radio selection not found for Output.'); return; }
            
            var txtArrayName = 'ArrayName';
            
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
            
            if ( results.data == undefined || results.data.length == 0 ) {
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