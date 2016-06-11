var ToolAsciiAsciiTable = ToolAsciiAsciiTable || {
    
    name: 'ASCII Table',
    description: 'Display ASCII Table and provide a lookup and some information.',
    header: 'ASCII Table', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolAsciiAsciiTable.description};
        
        // LIST (ul) ASCII Tips
        var asciiTipsHeader = {tagName: 'h2', innerHTML: 'Ascii Tips:'};
        var asciiTipsItems = [
            ['Character code 0-31   : The first 32 characters in the ASCII-table are unprintable control codes and are used to control peripherals such as printers.'],
            ['Character code 32-127 : Codes 32-127 are common for all the different variations of the ASCII table, they are called printable characters, represent letters, digits, punctuation marks, and a few miscellaneous symbols. You will find almost every character on your keyboard. Character 127 represents the command DEL.'],
            ['Character code 128-255: There are several different variations of the 8-bit ASCII table. The table below is according to ISO 8859-1, also called ISO Latin-1. Codes 128-159 contain the Microsoft® Windows Latin-1 extended characters.']
        ];
        var asciiTipsList = {tagName: 'ul',
                             childObjects: HtmlBuilder.buildHtmlObjectsFromArray( asciiTipsItems, 
                                                                                 {tagName: 'li'} )
                            };
        
        // LIST (ul): ASCII Links
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlsoLinks = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Wikipedia (en): ASCII', 'https://en.wikipedia.org/wiki/ASCII'],
            ['Ascii-code.com: ASCII Code - The extended ASCII table', 'http://www.ascii-code.com/']
                                                                     ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var seeAlsoLinkList = {tagName: 'ul',
                               childObjects: HtmlBuilder.buildHtmlObjectsFromArray( seeAlsoLinks, {tagName: 'li'} )};
        
        /* See tables from 
        ASCII Table (Different versions?)
        - https://en.wikipedia.org/wiki/ASCII
        - http://www.ascii-code.com/
        Table headers: Decimal, Hex, Oct, Char/Glyph/Symbol, HTML Number, HTML Name, Bin, Description
        - Also see: 
        IBM Scan Codes, EBCDIC - http://www.lookuptables.com/ebcdic_scancodes.php
       
        var tableAsciiHeader = [Decimal, Hex, Oct, Char/Glyph/Symbol, HTML Number, HTML Name, Bin, Description];
        
        var tableAsciiData = [[],
                              [],
                              [],
                              [],
                              ];
                              
        var tableAsciiBody = {tagName: 'tbody',
                              childObjects: [tableAsciiData]};
                              
        var tableAscii = {tagName: 'table', 
                          attributes: {'data-filter':'true'},
                          childObjects: [tableAsciiCaption, tableAsciiHeader, tableAsciiFooter, tableAsciiBody]};
        */
                         
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     asciiTipsHeader, asciiTipsList,
                                     seeAlsoHeader, seeAlsoLinkList]};
        return content;
    }, // End of content
    
    events: function() {
        $('#btnProcess').on('click', function() { 
            var usrInput = $('#txtaInput').val().trim();
            if ( usrInput == "" || usrInput.length == 0 || usrInput == undefined ) return;    
        
        var tblRowData = [['Text:', $('#txtaInput').val().length > 0 ? $('#txtaInput').val() : '<span class="colorRed">(No text entered)</span>' ],
                          ['Character count:', $('#txtaInput').val().length ],
                          ['Word count:', wordCount],
                          ['Line count:', lineCount]];
            
        var parentTag = {tagName:'tr', IdPrefix:'TableRow'};
        var childTag = {tagName:'td', IdPrefix:'Cell'}
        var tblRowObjData = HtmlBuilder.buildHtmlObjectsFromArray2( tblRowData, [parentTag,childTag]);
            //console.log(tblRowObjData);
        var tbl = HtmlBuilder.buildHtmlString({tagName:'table',
                                               childObjects:tblRowObjData});
            //console.log(tbl);
        });
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolAsciiAsciiTable);
//console.log(WorkTool.Tools);
//console.log('ToolAsciiAsciiTable.js: ' + HtmlBuilder.buildHtmlString( ToolAsciiAsciiTable.content() ) );