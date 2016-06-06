var ToolTextUppercase = ToolTextUppercase || {
    
    name: 'Uppercase',
    description: 'Converts all alphabetical characters to uppercase while preserving all special characters, including white space, punctuation, and invisible characters.',
    header: 'Uppercase', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var btnProcess = {tagName: 'input',
                          attributes: {id:'btnProcess', type:'button', value:'Process!'}};
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolTextUppercase.description};
            
        var txtaInput = {tagName: 'textarea',
                         attributes: {id:'txtaInput', placeholder:'Enter input here...'}};
        
        var txtaResults = {tagName: 'textarea',
                           attributes: {id:'txtaResults', placeholder:'Results appear here...'}};
                         
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br, txtaInput, br, btnProcess, br, txtaResults]};
        return content;
    }, // End of content
    
    events: function() {
        $('#btnProcess').on('click', function() { 
            var usrInput = $('#txtaInput').val().trim();
            if ( usrInput == "" || usrInput.length == 0 || usrInput == undefined ) return;    
            $('#txtaResults').text( usrInput.toUpperCase() );
        });
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolTextUppercase);
//console.log(WorkTool.Tools);
//console.log('ToolTextUppercase.js: ' + HtmlBuilder.buildHtmlString( ToolTextUppercase.content() ) );