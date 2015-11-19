/* 
 Andrew Pel
            andrew_pel@student.uml.edu
            Student @ UMass Lowell in 91.461 GUI Programming I
            11/04/2015
            This webpage is the javascript for assignment 7 
            It holds the makeTable function which creates the table
            with the formdata from A7.html
            Also contains the validation code
 */

        
      /*  javascript function to to create the multiplication table
          it gets the values from the form and stores it into variables 
          Then uses that data to make the table */
            function makeTable(){
                
                
                // code to store formdata into variables
                rS = document.getElementById("user_input").elements[0].value;
                rE = document.getElementById("user_input").elements[1].value;
                cS = document.getElementById("user_input").elements[2].value;
                cE = document.getElementById("user_input").elements[3].value;
                   
                   
                // Clears pre-existing table
                document.getElementById("tbl1").innerHTML = "";
                                     
                // variable for number of rows and number of coloums  
                var numRow = ++rE;
                var numCol = ++cE;
                
                // declaration for table make
                tMake = "";
                
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
                document.getElementById("tbl1").innerHTML = tMake;
            }
        
// Readys body before using jquery        
$(document).ready(function() {
             
             
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
                    max: 200,
                    greaterThan: "#eRow"
                },
                eRow : {
                    required: true,
                    digits: true,
                    max: 200
                },
                sCol : {
                    required: true,
                    digits: true,
                    max: 200,
                    greaterThan: "#eCol"
                },
                eCol : {
                    required: true,
                    digits: true,
                    max: 200
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
