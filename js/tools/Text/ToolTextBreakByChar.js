var ToolTextBreakByChar = ToolTextBreakByChar || {
    
    name: 'Break Text by Character',
    category: 'Text',
    description: 'Break CSV or plain text by text/character.',
    header: 'Break Text by Character', // Title to appear in Tool Page
	
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
            
        var descInfo = {tagName: 'p', innerHTML: ToolTextBreakByChar.description};
        
		var txtDelimiter = {tagName: 'input',
							attributes:{},
							placeholder:'character or text'};
		
        var txtaInput = {tagName: 'textarea',
                         attributes: {id:'txtaInput', 
                                      'data-autogrow':false, 
                                      placeholder:'Enter input here...',
                                      rows:5
                                     }};
        
        var resultsHeader = {tagName: 'h3', innerHTML: 'Results:'};
		var divResults = {tagName: 'div',
						  attributes: {id:'txtResults'}, 
                          childObjects: [ToolTextBreakByChar.toolBuildResultsData()]};
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlso = HtmlBuilder.buildHtmlLinkList([
            //['name','href'],
            ]);
                         
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [//descHeader, 
                                     descInfo, br, 
                                     txtaInput, br, 
                                     //btnProcess, br, 
                                     resultsHeader, divResults, br,
                                     seeAlsoHeader, seeAlso]};
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtaInput').focus();
    },
    
    events: function() { // Event Listeners
        
        $('#txtaInput').on('keyup', function() {
            // When user presses a key, including pasting content into <textarea>
            //  this event will trigger.   
            
            var tbl = ToolTextBreakByChar.toolBuildResultsData();
            $('#txtResults').html( tbl );
            $('#txtResults').enhanceWithin();
        });
        
    }, // End of events (event listeners)
    
    // Tool Class Methods -- Cannot rely on document elements to be present.
    toolBuildResultsData: function () {
        // Returns: <Table> to display in results <div>
        var usrInput = document.getElementById('txtaInput'); // <textarea>
        
        var characterCount = 0; // How many characters in a string of text - String.length
        var lineCount = 0;      // How many carriage returns - String.split(\n)
        var wordCount = 0;      // How many words separated by spaces and punctuation - Regular expression
        var characterFrequency; // How many times a character is entered.
        var wordFrequency;      // How many times a word is entered.
        
        if ( usrInput == null )
            characterCount = 0;
        
        else {
        // #.) Build data: Character Count (string.length)
            characterCount = $('#txtaInput').val().length;
        }
            
        if ( characterCount == 0 ) { // Default values
            lineCount = 0;
            wordCount = 0;
            characterFrequency = {};
            wordFrequency = {};
            /*
            console.log('Counts: ' + characterCount + 
                        ', ' + lineCount + 
                        ', ' + wordCount);
            */
            
        } else {
        
            // #.) Build data: Count Lines
            lineCount = $('#txtaInput').val()
                .replace(/\r\n/, "\n")
                .split('\n')
                .length;

            // #.) Build data: Count Words
            wordCount = $('#txtaInput').val()
                .replace(/(^\s*)|(\s*$)/gi,"")
                .replace(/[ ]{2,}/gi," ")
                .replace(/\n /,"\n")
                .split(' ').length;
            
            // #.) Build data: Character Frequency
            characterFrequency = {};
            $('#txtaInput').val()
                .toLowerCase()
                .split('')
                .forEach(function(s) {
                    characterFrequency[s] ? characterFrequency[s]++ : characterFrequency[s] = 1;
                });
            
            // #.) Build data: Word Frequency
            wordFrequency = {};
            $('#txtaInput').val()
                .replace(/(^\s*)|(\s*$)/gi,"")
                .replace(/[ ]{2,}/gi," ")
                .replace(/\n /,"\n")
                // Replace punctuation
                //.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '')
                // Make everything lowercase so we don't get counts for upper and lower versions
                .toLowerCase()
                // Get words - separated by spaces
                .split(' ')
                .forEach(function(s) {
                    wordFrequency[s] ? wordFrequency[s]++ : wordFrequency[s] = 1;
            });
            
        }
        
        // #.) Build return data: <table>
        var sortObjectByKey = function(obj){
            // http://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
            var keys = [];
            var sorted_obj = {};

            for(var key in obj){ if(obj.hasOwnProperty(key)){ keys.push(key); } }

            keys.sort();
            
            jQuery.each(keys, function(i, key){ sorted_obj[key] = obj[key]; }); // create new array based on Sorted Keys

            return sorted_obj;
        };
        
        var retCollapsibleWidget = function(obj, header) {
            // obj = object with key/value pairs that we need to list in Collapsible Widget
            
            var br = '<br />';
            var rText = '<div data-role="collapsible">' +
                        '<h3>' + header + '</h3>';
            var line = "";
            
            var ordered = sortObjectByKey(obj);
            
            for (var key in ordered) {
                if ( ordered.hasOwnProperty(key) ) {
                    line = key == " " ? "' ': " + obj[key] : key + ": " + obj[key];
                    line = HtmlBuilder.htmlEscape(line) + br;
                    rText += line;
                }
            }
            
            rText += '</div>';
            //console.log(rText);
            return rText;
        };
        
        var collapsibleCF = "", 
            collapsibleWF = "";
        
        if ( characterCount !== 0) {
            collapsibleCF = retCollapsibleWidget(characterFrequency, 'Character frequency');
            console.log( collapsibleCF );

            collapsibleWF = retCollapsibleWidget(wordFrequency, 'Word frequency');
            console.log( collapsibleWF );
        }
        
        var tblRowData = [['Character count:', characterCount ],
                          ['Word count:', wordCount],
                          ['Line count:', lineCount],
                          [collapsibleCF, ''],
                          [collapsibleWF, '']
                         ];
        
        

        var parentTag = {tagName:'tr', IdPrefix:'TableRow'};
        var childTag = {tagName:'td', IdPrefix:'Cell'}
        var tblRowObjData = HtmlBuilder.buildHtmlObjectsFromArray2( tblRowData, [parentTag,childTag]);
        var tbl = HtmlBuilder.buildHtmlString({tagName:'table',
                                               childObjects:tblRowObjData});
        
        //console.log( tbl );
        return tbl;
    }
};

WorkTool.addToolToTools(ToolTextBreakByChar);
console.log(WorkTool.Tools);
//console.log('ToolTextBreakByChar.js: ' + HtmlBuilder.buildHtmlString( ToolTextBreakByChar.content() ) );