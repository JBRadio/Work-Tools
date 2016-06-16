var ToolTextLowercase = ToolTextLowercase || {
    
    name: 'Lowercase',
    category: 'Text',
    description: 'Converts all alphabetical characters to lowercase while preserving all special characters, including white space, punctuation, and invisible characters.',
    header: 'Lowercase', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        //var btnProcess = {tagName: 'input',
        //                  attributes: {id:'btnProcess', type:'button', value:'Process!'}};
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolTextLowercase.description};
            
        var txtaInput = {tagName: 'textarea',
                         attributes: {id:'txtaInput', placeholder:'Enter input here...'}};
        
        var resultsHeader = {tagName: 'h4', innerHTML: 'Results: '};
        //var txtaResults = {tagName: 'textarea',
        //                   attributes: {id:'txtaResults', placeholder:'Results appear here...'}};
        var divResults = {tagName: 'div',
                          attributes: {id:'divResults', placeholder:'Results show here...'}};
                         
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br, txtaInput, br, 
                                     //btnProcess, br, 
                                     //txtaResults
                                     resultsHeader, divResults
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtaInput').focus();
    },
    
    events: function() {
        //$('#btnProcess').on('click', function() { 
        $('#txtaInput').on('keyup', function() {
            var usrInput = $('#txtaInput').val().trim();
            if ( usrInput == "" || usrInput.length == 0 || usrInput == undefined ) return;    
            //$('#txtaResults').text( usrInput.toLowerCase() );
            $('#divResults').text( usrInput.toLowerCase() );
        });
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolTextLowercase);
//console.log(WorkTool.Tools);
//console.log('ToolTextLowercase.js: ' + HtmlBuilder.buildHtmlString( ToolTextLowercase.content() ) );