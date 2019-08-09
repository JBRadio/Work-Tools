/*
 * Pad to Align Text (Work in Progress)
    (May split into two tools: Pad list items, Pad line lists (CSV/TSV/etc)
 *
 * 
 * Format: Table
   List:            Formatted List:
   asdf,asdf,asdf   asdf asdf asdf
   def,def,def      def  def  def
   
   Format: List
   List:            Formatted List:
   item:bob           item:bob
   carrot:horse     carrot:horse
   box:fries           box:fries
   
    * Padding character: Spaces or custom, like dots.
   
   Top <textarea> = List 1 (will be modified by list 2)
   Bottom <textarea> = List 2 (will modify list 1)
   Process <button = trigger for merge/combine
   //Undo <button> = Remove List 2 items from List 1 (also see add prefix/suffix text tool)
   
   
   Remove AHK Script
   
   ; Line up text for Character
; Example:
; From             to
; item1:value      item1:value
; key1:value        key1:value
LineUpToCharacterInSelectedText() {
	; Maybe allow user to enter a special character or have default (":", "-", ...)
	; Loop to determine the line with the most amount of characters before special character (Item1: Fun = 5 characters before ":")
	; Loop again to precede line with spaces until all lines match (line 1 has 5 characters/spaces before ":" and so done line 2, 3, 4, etc.)
	; Replace clipboard
	stateShiftKey := GetKeyState("Shift", "P") ; Returns 0 if up, 1 if down
	stateAltKey := GetKeyState("Alt", "P")
	
	if GetKeyState("Shift", "P")
		FindChar := "-"
	else if stateAltKey = 1
		FindChar := "_"
	else
		FindChar := ":"
	
	If ("" <> Text := Clip()) 
	{
		
		NewLine := "`r`n"
		MaxChar := 0
		
		; Loop to determine the line with the most amount of characters before special character (Item1: Fun = 5 characters before ":")
		Loop, Parse, Text, `n, `r
		{
			;If ( InStr(A_LoopField, ":") <> 0)
			If ( InStr(A_LoopField, FindChar) <> 0)
				MaxChar := InStr(A_LoopField, FindChar)
		}
		
		If ( MaxChar > 0 )
		{
			; Loop again to precede line with spaces until all lines match (line 1 has 5 characters/spaces before ":" and so done line 2, 3, 4, etc.)
			@ := ""
			Loop, Parse, Text, `n, `r
			{
				; If less than desired length, pad with spaces
				PaddedSpace :=
				if ( InStr(A_LoopField, ":") < MaxChar )
				{
					PlaceDiff := MaxChar - InStr(A_LoopField, FindChar)
					Loop, %PlaceDiff%
					{
						PaddedSpace .= A_Space
					}
					;stdout.WriteLine(PaddedSpace . A_LoopField)
					@ .= NewLine Text := PaddedSpace . A_LoopField
				}
				else
				{
					;stdout.WriteLine(A_LoopField)
					@ .= NewLine Text := A_LoopField
				}
			}
			Clip(SubStr(@, StrLen(NewLine) + 1), 2)
		}
	}
}
 */

var ToolTextPadToAlignText = ToolTextPadToAlignText || {
    
    name: 'Pad text to align it',
    category: 'Text',
    description: 'Pad text to align CSV/TSV/etc or lists by a character, say by :',
    header: 'Pad text to align it', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var btnProcess = {tagName: 'input',
                          attributes: {id:'btnProcess', type:'button', value:'Process!'}};
        
        //var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolTextPadToAlignText.description};
        
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

WorkTool.addToolToTools(ToolTextPadToAlignText);
//console.log(WorkTool.Tools);
//console.log('ToolTextPadToAlignText.js: ' + HtmlBuilder.buildHtmlString( ToolTextPadToAlignText.content() ) );