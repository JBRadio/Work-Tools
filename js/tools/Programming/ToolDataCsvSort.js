var ToolDataCsvSort = ToolDataCsvSort || {
    
    name: 'CSV Data Sorting',
    
    category: 'Data',
    
    description: 'Display information on how to sort CSV data. This can include solutions in other applications and online services.',
    
    header: 'CSV Data Sorting', // Title to appear in Tool Page
    
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolDataCsvSort.description};
        
        
        // Google Sheet
        var GoogleSheet = '<h3>Google Sheets Range Sort</h3>' +
            '<p>' +
            '<ol>' +
            '<li>Go to <a href="https://docs.google.com/spreadsheets/?usp=mkt_sheets" target="_blank">Google Sheets</a></li>' +
            '<li>Import CSV data into a Google Sheets sheet</li>' +
            '<li>Select CSV data to sort</li>' +
            '<li> Data > Sort Range --OR-- Right-click > Sort Range</li>' +
            '</ol>' + 
            '</p>';
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlso = HtmlBuilder.buildHtmlLinkList([
            ['Google Sheets', 'https://docs.google.com/spreadsheets/?usp=mkt_sheets']
            //['name','href'],
            ]);
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     //filterList
                                     GoogleSheet,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolDataCsvSort);
//console.log(WorkTool.Tools);
//console.log('ToolDataCsvSort.js: ' + HtmlBuilder.buildHtmlString( ToolDataCsvSort.content() ) );