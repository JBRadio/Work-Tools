var ToolEquivalentsDegrees = ToolEquivalentsDegrees || {
    
    name: 'Find the equivalent in degrees',
    description: 'Assign a value to one temperature to get the equivalent in others.',
    header: 'Find the equivalent in degrees', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        var hr = {tagName: 'hr' };
        
        // DESCRIPTION
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolEquivalentsDegrees.description};
        
        // DIRECTIONS
        var dirheader   = {tagName: 'h2', innerHTML: 'Directions:'};
        var Directions  = '<ol>'
                        + '<li>Type a number in one of the text fields to update the others.</li>'
			            + '</ol>';
        
        var txtCelsius = '<label for="txtCelsius">Celsius:</label>'
                      + '<input id="txtCelsius" type="number" placeholder="Type to update value" />';
        var txtKelvin = '<label for="txtKelvin">Kelvin:</label>'
			          + '<input id="txtKelvin" type="number" placeholder="Type to update value" />';
        var txtFahrenheit = '<label for="txtFahrenheit">Fahrenheit:</label>'
			          + '<input id="txtFahrenheit" type="number" placeholder="Type to update value" />';
        
        var fieldcontain = {tagName: 'div',
                            attributes: {'data-role':"fieldcontain"},
                            childObjects: [txtCelsius, br,
                                           txtKelvin, br,
                                           txtFahrenheit
                                          ]
                           };
        
        var tableTempHeaderData = ["Kelvin (K)", "Fahrenheit (°F)", "Celsius (°C)", "Temperature"];
        
        var tableTempHeaderRow = {tagName:'tr',
                                   childObjects: HtmlBuilder.buildHtmlObjectsFromArray ( tableTempHeaderData, 
                                                                                        {tagName:'th',
                                                                                         inlineStyle:{'border-bottom':'1px solid #d6d6d6',
                                                                                                      'border-bottom':'1px solid rgba(0,0,0,.1)',
                                                                                                      'font-size':'.7em',
                                                                                                      'font-weight':'bold'}
                                                                                        }
                                                                                       )
                                  };
        
        var tableTempHeader = {tagName:'thead', childObjects: [tableTempHeaderRow]};
        var tableTempFooter = {tagName:'tfoot', childObjects: [tableTempHeaderRow]};
        
        var tableTempData = [
        ["0 K", "-459.67 °F", "-273.15 °C", "absolute zero temperature"],
        ["273.15 K", "32.0 °F", "0 °C", "freezing/melting point of water"],
        ["294.15 K", "69.8 °F", "21 °C", "room temperature"],
        ["310.15 K", "98.6 °F", "37 °C", "average body temperature"],
        ["373.15 K", "212.0 °F", "100 °C", "boiling point of water"]
        ];
        
        var tableTempDataRow = HtmlBuilder.buildHtmlObjectsFromArray2( tableTempData, [{tagName: 'tr'}, 
                                                                             {tagName: 'td',
                                                                             inlineStyle:{'border-bottom':'1px solid #b2abab',
                                                                                         'font-size':'.7em',
                                                                                         'font-weight':'normal'}
                                                                             }
                                                                                        ]
                                                                      );
        
        var tableTempBody = {tagName: 'tbody',
                              childObjects: tableTempDataRow};
                              
        var tableTemp = {tagName: 'table', 
                          //attributes: {'data-role':'table', 'data-mode':'columntoggle', 'id':'tblAscii', 'data-filter':'true'},
                          // If you add column toggle and filter, you need to change the width of the filter search box to 300px.
                          // Also, you need to set data-priority on the table head cells.
                          attributes: {'id':'tblAscii'},
                          childObjects: [{tagName:'caption', innerHTML:'Common Temperature References'},
                                         tableTempHeader, 
                                         //tableAsciiFooter, 
                                         tableTempBody]};
        
        // LIST (ul): See Also
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlsoItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Temperature Conversion (rapidtables.com)', 'http://www.rapidtables.com/convert/temperature/index.htm'],
            ['Celsius to Fahrenheit Chart', 'http://www.rapidtables.com/convert/temperature/celsius-to-fahrenheit-chart.htm'],
            ['Digital Dutch Unit Converter', 'http://www.digitaldutch.com/unitconverter/length.htm'],
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
    
        var seeAlso = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( seeAlsoItems, {tagName: 'li'} )};
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, // Description
                                     //dirheader, Directions, // Directions
                                     //Controls,
                                     fieldcontain,
                                     tableTemp, br,
                                     seeAlsoHeader, seeAlso] // See Also
                      };
        return content;
    }, // End of content
    
    pageshow: function() {
        $('#txtCelsius').focus();
    },
    
    events: function() {
        
        $('#txtCelsius').on('keyup', function() { 
            
            if ( $(this).val().length == 0 ) {
                $('txtCelsius').val(""),  $('#txtFahrenheit').val(""), $('#txtKelvin').val("");
                $(this).focus();
            } else
            ToolEquivalentsDegrees.onKeyupUpdateDegrees('C'); 
        });
        
        $('#txtFahrenheit').on('keyup', function() { ToolEquivalentsDegrees.onKeyupUpdateDegrees('F'); });
        
        $('#txtKelvin').on('keyup', function() { ToolEquivalentsDegrees.onKeyupUpdateDegrees('K'); });
        
        
    }, // End of events (event listeners)
    
    onKeyupUpdateDegrees: function(degree) {
    
        var degValue;
    
        if ( degree === 'C' )
            degValue = $('#txtCelsius').val();
        else if ( degree === 'F' )
            degValue = $('#txtFahrenheit').val();
        else if ( degree === 'K' )
            degValue = $('#txtKelvin').val();
        else {
            console.log("Degree value not valid: " + degree);
            return;
        }

        // Do not check degValue against false as 0 is also false.
        if ( degValue == undefined || degValue == "" || degValue.length == 0 || degValue == null)
            return; // Nothing to process

        if ( Number.isNaN(degValue) == true )
            return; // Value is Not-a-Number

        degValue = parseFloat(degValue);
        
        switch ( degree )
        {
            case 'C':
                // T(F) = T(C) * (9/5) + 32
                $('#txtFahrenheit').val( (degValue * (9/5) + 32).toFixed(2) );
                
                // T(K) = T(°C) + 273.15
                $('#txtKelvin').val( (degValue + 273.15).toFixed(2) );
                break;
                
            case 'F':
                // T(°C) = (T(°F) - 32) × 5/9
                $('#txtCelsius').val( (degValue - 32) * (5/9) );
                
                // T(K) = (T(°F) + 459.67)× 5/9
                $('#txtKelvin').val( (degValue + 459.67) * (5/9) );
                break;
                
            case 'K':
                // T(°C) = T(K) - 273.15
                $('#txtCelsius').val( (degValue - 273.15).toFixed(2) );
                
                // T(°F) = T(K) × 9/5 - 459.67
                $('#txtFahrenheit').val( (degValue * (9/5) - 459.67).toFixed(2) );
                break;
        }
            
    }
};

WorkTool.addToolToTools(ToolEquivalentsDegrees);
//console.log(WorkTool.Tools);
//console.log('ToolEquivalentsDegrees.js: ' + HtmlBuilder.buildHtmlString( ToolEquivalentsDegrees.content() ) );


	
		