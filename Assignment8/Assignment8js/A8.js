/* 
 Andrew Pel
            andrew_pel@student.uml.edu
            Student @ UMass Lowell in 91.461 GUI Programming I
            11/04/2015
            This webpage is the javascript for assignment 8
            It holds the makeTable function which creates the table
            with the formdata from A8.html
            Also contains the validation code
            It also contains tab creation, tab deletion. and sliders
 */
            

            // Global variable tCounter the counter for the number of tabs
            var tCounter = 1; // counter = 1 because of the home tab
        
      /*  javascript function to to create the multiplication table
          it gets the values from the form and stores it into variables 
          Then uses that data to make the table */
            function makeTable(){ 
                
                // code to store formdata into variables
                rS = document.getElementById("user_input").elements[0].value;
                rE = document.getElementById("user_input").elements[1].value;
                cS = document.getElementById("user_input").elements[2].value;
                cE = document.getElementById("user_input").elements[3].value;
                                     
                // variable for number of rows and number of coloums  
                var numRow = ++rE;
                var numCol = ++cE;
                
                // declaration for table make
                var tMake = "<table>";
                
                // Header for the first row
                tMake += "<tr><th></th>";
                for (x = cS; x < numCol; x++) {
                tMake += "<th>" + x + "</th>";
                }
                tMake += "</tr>";
               
               
                // double for loop for the creation of the tables inner elements
                // first for loop to create the rows
                for (i = rS; i < numRow; i++) {
                    // Header for the first coloumn
                    tMake += "<tr><th>" + i + "</th>";
                    // creation of each individual node
                    for (j = cS; j < numCol; j++) {
                        tMake += "<td>" + (i * j) + "</td>";
                    }
                    tMake += "</tr>";
                }
                
                // stores tMake into the table
                tMake += "</table>";
                
            // increments the counter to make space for the next tab    
            tCounter++; 
            
            // variable for the tab name
            var newTabName = rS + " to " + --rE + " X " + cS + " to " + --cE;
            // variable for tabs
            var tabs = $("#tabs");
            // variable for the ul
            var ul = $("#ulTabs");
            // variable for number of tabs
            var tabNum = "tabs" + tCounter; 

            // The creation of new tabs
            var newTabs = "<li><a href='#" + tabNum + "'>" + newTabName +
                           "<span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span>" 
                           + "</a></li>"; 
            $("ul").append(newTabs);

            // Adding content(table) to the new tabs 
            var newData = "<div id='" + tabNum + "'>" + tMake + "</div>"; 
            $("#tabs").append(newData);
            
            // reinitallize tabs
            tabs.tabs( "refresh" );
            // make the newly created tab the one that is in focus
            tabs.tabs({ active: (tCounter - 1) });
            // Got the code from here to close indiviual tabs
            // http://jqueryui.com/tabs/#manipulation
            tabs.delegate( "span.ui-icon-close", "click", function() {
            var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
            tabs.tabs( "refresh" );
            });
            
            // in case the values of the table goes out of bounds
            $('#tabs' + tCounter).css("overflow", "auto");
         }  
        
// Readys body before using jquery        
$(document).ready(function() {
     
     // tab declaration
     var tabs = $("#tabs").tabs(); 
    
    // Jquery function that us used to create a slider
    // has a min of 0 and max of 40
    // the slide function changes the value inside th form everytime the slider moves
    // the keyupm function changes the value and position of the slider everytime the form input is updated
    // this goes on for the next for sliders
    $( "#slider_sRow" ).slider({
      min: 0,
      max: 40,
      slide: function( event, ui ) {
        $( "#sRow" ).val( ui.value );
      }
    });
    
    $("#sRow").keyup(function() {
        $("#slider_sRow").slider("value" , $(this).val());
    });
    
    $( "#slider_eRow" ).slider({
      min: 0,
      max: 40,
      slide: function( event, ui ) {
        $( "#eRow" ).val( ui.value );
      }
    });
    
    $("#eRow").keyup(function() {
        $("#slider_eRow").slider("value" , $(this).val());
    });
    
    $( "#slider_sCol" ).slider({
      min: 0,
      max: 40,
      slide: function( event, ui ) {
        $( "#sCol" ).val( ui.value );
      }
    });
    
    $("#sCol").keyup(function() {
        $("#slider_sCol").slider("value" , $(this).val());
    }); 
    
    $( "#slider_eCol" ).slider({
      min: 0,
      max: 40,
      slide: function( event, ui ) {
        $( "#eCol" ).val( ui.value );
      }
    });
    
    $("#eCol").keyup(function() {
        $("#slider_eCol").slider("value" , $(this).val());
    }); 
    
    // passes the value of the slider to the value inside the form
    $( '#slider_sRow' ).slider( "value", parseInt( $( '#sRow' ).val() ) ) ;
    $( '#slider_eRow' ).slider( "value", parseInt( $( '#eRow' ).val() ) ) ;
    $( '#slider_sCol' ).slider( "value", parseInt( $( '#sCol' ).val() ) ) ;
    $( '#slider_eCol' ).slider( "value", parseInt( $( '#eCol' ).val() ) ) ;
             
    // Greater than rule to check if the starting value is greater than the ending value         
    $.validator.addMethod("greaterThan", function(value, element, param) {
                return this.optional(element) || parseInt(value) <= parseInt($(param).val());
             }, jQuery.validator.format("This value has to be <= the ending value."));
        
        // validation rules for the form
        // makes sure each form is required, contains only digits, has a max value of 200, 
        // and statisfy the greaterThan.
        $("#user_input").validate({
            rules : {
                sRow : {
                    required: true,
                    digits: true,
                    max: 40,
                    greaterThan: "#eRow"
                },
                eRow : {
                    required: true,
                    digits: true,
                    max: 40
                },
                sCol : {
                    required: true,
                    digits: true,
                    max: 40,
                    greaterThan: "#eCol"
                },
                eCol : {
                    required: true,
                    digits: true,
                    max: 40
                }
        }, 
        // message for rules
                messages : {
          sRow : {
            required : "Please fill in this part of the form completely.",
            digits : "Please enter a positive non decimal number."
          } ,
          eRow : {
            required : "Please fill in this part of the form completely.",
            digits : "Please enter a positive non decimal number."
          } ,
          sCol : {
            required : "Please fill in this part of the form completely.",
            digits : "Please enter a positive non decimal number."
          } ,
          eCol : {
            required : "Please fill in this part of the form completely.",
            digits : "Please enter a positive non decimal number."
          } 
          }
    });
});  
