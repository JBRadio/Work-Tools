var ToolTextCountCharacters = ToolTextCountCharacters || {
    
    name: 'Count Characters',
    description: 'Process inputted text to receive character, word, and line counts.',
    header: 'Count Characters', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var btnProcess = {tagName: 'input',
                          attributes: {id:'btnProcess', type:'button', value:'Process!'}};
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolTextCountCharacters.description};
            
        var txtaInput = {tagName: 'textarea',
                         attributes: {id:'txtaInput', placeholder:'Enter input here...'}};
        
        //var txtaResults = {tagName: 'textarea',
         //                  attributes: {id:'txtaResults', placeholder:'Results appear here...'}};
		 
		var divResults = {tagName: 'div',
						  attributes: {id:'txtResults', 'innerHTML':'Results appear here...'}};
                         
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br, txtaInput, br, btnProcess, br, divResults]};
        return content;
    }, // End of content
    
    events: function() {
        $('#btnProcess').on('click', function() { 
            var usrInput = $('#txtaInput').val().trim();
            if ( usrInput == "" || usrInput.length == 0 || usrInput == undefined ) return;    
            
		// Count Lines
        var lineCount = $('#txtaInput').val().replace(/\r\n/, "\n").split('\n').length;
          
        // Count Words
        var wordCount = $('#txtaInput').val();
            wordCount = wordCount.replace(/(^\s*)|(\s*$)/gi,"");
	        wordCount = wordCount.replace(/[ ]{2,}/gi," ");
	        wordCount = wordCount.replace(/\n /,"\n");
	        wordCount = wordCount.split(' ').length;
        
          // alert("Text: " + $("#txtaInput").val()); // DEBUG
        var tblRowData = [['Text:', $('#txtaInput').val().length > 0 ? $('#txtaInput').val() : '<span class="colorRed">(No text entered)</span>' ],
                          ['Character count:', $('#txtaInput').val().length ],
                          ['Word count:', wordCount],
                          ['Line count:', lineCount]];
        
        //var tbl = HtmlBuilder.buildTableHTML([], tblRowData);
            
        var parentTag = {tagName:'tr', IdPrefix:'TableRow'};
        var childTag = {tagName:'td', IdPrefix:'Cell'}
        var tblRowObjData = HtmlBuilder.buildHtmlObjectsFromArray2( tblRowData, [parentTag,childTag]);
            //console.log(tblRowObjData);
        var tbl = HtmlBuilder.buildHtmlString({tagName:'table',
                                               childObjects:tblRowObjData});
            //console.log(tbl);
          
        $('#txtResults').html( tbl );
        $('#txtaInput').focus();
        });
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolTextCountCharacters);
//console.log(WorkTool.Tools);
//console.log('ToolTextCountCharacters.js: ' + HtmlBuilder.buildHtmlString( ToolTextCountCharacters.content() ) );