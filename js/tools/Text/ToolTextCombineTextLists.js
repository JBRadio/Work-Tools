/*
 * Combine Text Lists into One
 *
 * List 1   List 2
   A        1
   B        2
   C        3
   
   Could turn into:
   A1   A,1  A=1  A(ANY CHARS)1
   B2   B,2  B=2  ...
   C3   B,3  C=3
   
   Top <textarea> = List 1 (will be modified by list 2)
   Bottom <textarea> = List 2 (will modify list 1)
   Process <button = trigger for merge/combine
   //Undo <button> = Remove List 2 items from List 1 (also see add prefix/suffix text tool)
 */

var ToolTextCombineTextLists = ToolTextCombineTextLists || {
    
    name: 'Combine Text Lists into One',
    category: 'Text',
    description: 'Combine Text Lists into One (bottom to top)',
    header: 'Combine Text Lists into One', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var btnProcess = {tagName: 'input',
                          attributes: {id:'btnProcess', type:'button', value:'Process!'}};
        
        //var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolTextCombineTextLists.description};
        
        var radioParams = '<fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain" >' + 
            '<legend>Combine Character?</legend>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-1" value="None" checked="checked" />' +
         	'<label for="radio-choice-1">None</label>' +
         	'<input type="radio" name="radio-choice-1" id="radio-choice-2" value="Yes"  />' + 
         	'<label for="radio-choice-2">Yes</label>' +
            '</fieldset>';
        
        var txtCombineChar = '<label for="txtCombineChar">Character: </label>' +
            '<input id="txtCombineChar" type="text" data-clear-btn="true" placeholder="" >';
        
        var txtaList1 = {tagName: 'textarea',
                         attributes: {id:'txtaList1', placeholder:'Enter text list here.', 'rows':5, 'data-autogrow':false}};
        
        var txtaList2 = {tagName: 'textarea',
                         attributes: {id:'txtaList2', placeholder:'Enter text list here.', 'rows':5, 'data-autogrow':false}};
        
        var fieldcontain = {tagName: 'div',
                            attributes: {'data-role':"fieldcontain"},
                            childObjects: [
                                            radioParams, br,
                                            txtCombineChar, br,
                                            txtaList1, br,
                                            txtaList2, br,
                                            btnProcess
                                          ]
                           };
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also'};
        var seeAlso = HtmlBuilder.buildHtmlLinkList([
            //['', '']
            //['name','href'],
            ]);
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [//descHeader, 
                                     descInfo, br,
                                     fieldcontain,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtaList1').focus();
    },
    
    events: function() { 
        
        // Event Listeners
        $('#btnProcess').on('click', function(){
            
            // 1. Get checked value from RadioParams (name="radio-choice-1")
            console.log("Choice: " + $('input[name="radio-choice-1"]:checked').val());
            var combineMethod = $('input[name="radio-choice-1"]:checked').val();
            
            // 2. Get textlists
            
            if ( $('#txtaList1').val().length == 0 || $('#txtaList2').val().length == 0 ) {
                console.log('Either textlist is blank.');
                return;
            }
                
            var textList1 = $('#txtaList1').val().split('\n'); // Array of text lines
            var textList2 = $('#txtaList2').val().split('\n'); // Array of text lines
            
            // 3. Combine lists
            var rTextList = "";
            for ( var i = 0; i < textList1.length; i++) {
                if ( combineMethod == "None" && (textList2[i] !== undefined && textList2[i] !== null ) )
                    rTextList += textList1[i] + textList2[i] + "\n";
                else if ( combineMethod == "Yes" && (textList2[i] !== undefined && textList2[i] !== null ) )
                    rTextList += textList1[i] + $('#txtCombineChar').val() + textList2[i] + "\n";
                else
                    rTextList += textList1[i] + "\n"; // default
            }
            
            // 4. Replace First list
            $('#txtaList1').val(rTextList);
            
        });
        
    } // End of events (event listeners)
};

WorkTool.addToolToTools(ToolTextCombineTextLists);
//console.log(WorkTool.Tools);
//console.log('ToolTextCombineTextLists.js: ' + HtmlBuilder.buildHtmlString( ToolTextCombineTextLists.content() ) );