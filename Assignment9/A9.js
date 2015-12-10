/* 
 Andrew Pel
            andrew_pel@student.uml.edu
            Student @ UMass Lowell in 91.461 GUI Programming I
            12/04/2015
            This webpage is the javascript for assignment 9
            Contains code that generates random tiles,
            keeps track of score,
            creation of draggable or droppable objects
            and functions to control what happens when an object is dropped
 */


/* GLOBAL VARIABLES */
var totalTiles = 100;
var boardArray = new Array(11);
var totalScore = 0;
var currentScore = 0;
var tileLetter;


/* GENERATING THE RANDOM TILES */
function genTiles(tilesNeeded)
{
    // Generaetes the amount of tiles needed
    for(i = 0; i < tilesNeeded; i++)
    {
        //randomly choose a tile from the remaining tiles (tiles left)
        var numTile = Math.floor((Math.random() * totalTiles) + 1);
        var tile;

        for (x = 0; x < scrabbleTiles.length; x++)
        {
            //When the tileNumber becomes less then zero scrabbleTiles[x].letter is the character chosen
            numTile = numTile - scrabbleTiles[x].amount;

            if (numTile < 0)
            {
                // decrement the amount of that tile
                scrabbleTiles[x].amount--;
                // decrement total amount of tiles
                totalTiles--;
                // find the image for that tile
                tile = scrabbleTiles[x].letter + ".png";
                // the tile letter itself
                tileLetter = scrabbleTiles[x].letter;
                break;
            }
        }
        
        // the newly generated tile
        var new_tile = "<img src=Letters/" + tile + " class='tile' id= " + tileLetter + " />";
        // appeneding the newly generated tile to the rack
        $("#rack").append(new_tile);
    }
}

/* CREATING THE SCORES */
function modScore()
{
    var bonus;
    var doubleWord = false;

    // traverse the board
    for (i = 0; i < boardArray.length; i++)
    {   
        // only look for a spot on the board that has a piece on it
        if (boardArray[i] !== undefined && boardArray[i].length > 0)
            // gets the value of spots that has a tile onit
            for (x = 0; x < scrabbleTiles.length; x++)
            {
                // find the spot on the board that has a multiplier
                bonus = "#" + boardArray[i].id;  
                if (scrabbleTiles[x].letter === boardArray[i])
                    // If the spot has a 'DL' aka double letter 
                    // double the value of the tile piece
                    if ($(bonus).hasClass('DL') === true)
                        currentScore += scrabbleTiles[x].value*2;
                    // If the spot has a 'DW' aka double word 
                    // double the value of the word
                    else if($(bonus).hasClass('DW') === true)
                    {
                        currentScore += scrabbleTiles[x].value;
                        doubleWord = true;
                    }
                    else
                    // if none of the above just add the value of the tile regularly 
                        currentScore += scrabbleTiles[x].value;
            }
    }
    
    if(doubleWord === true)
        currentScore *= 2; 
    
    //update the score
    $('#currentScore').text(currentScore);
}

/* UPDATING SCORES AFTER SUBMIT WORD IS CLICKED */
function updateScore(){
    totalScore = totalScore + currentScore;
    $("#totalScore").text(totalScore);
    // reset currrent score to 0
    currentScore = 0;
    $('#currentScore').text(currentScore);
}

// Had to make this because creating new tiles to replace the used ones would make them undragable
function MakeDraggable(ClassName) {
	// Make draggable objects
	$('.' + ClassName).draggable({ 
		revert: 'invalid'
	});
}

// function handles what happens whenever an object is dropped on something
// return tile to original position if its placed in an invalid spot
/*http://stackoverflow.com/questions/15343385/change-position-of-divs-with-jquery-drag-an-drop*/
function handleDropEvent (event, ui) {
    
            var dropped = ui.draggable;
            var droppedOn = $(this);
			
            // detaches tile from the rack and appends it to the game board
            $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
            
            // code to stop you from dropping an tile ontop another tile
            if (ui.draggable.element !== undefined) {
                ui.draggable.element.droppable('enable');
            }
            $(this).droppable('disable');
            
            // Took the code to snap the pieces to the center of each board spaces from here
            /* http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center */
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 200, "linear");
                }});
            
            // stop tile from reverting unless the location is invalid
            ui.draggable.draggable('option', 'revert', "invalid");
            ui.draggable.element = $(this);
            
            // make it so that the space on the game board has the value of tile
            boardArray[$(this).attr("id")] = ui.draggable.attr("id");
            
            // call modScore() to calculate the score
            modScore();
}


        

$(document).ready(function ()
{
    (function(){
        
        // Puts the tiles into the players hand 
        // starting amount of 7
        genTiles(7);
    
    $(".GBdrop").droppable({
        drop: handleDropEvent
    });
        
    $(".tile" ).draggable({              
        // Revert tile back to original postion if it isn't dragged onto a droppable area.
        revert: "invalid"
    }); 
                    
    $("#rack" ).droppable({
    drop: function (event, ui) {
	var dropped = ui.draggable;
	var droppedOn = $(this);
			
	// detaches tile from the game board and appends it to the rack
	$(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn); 
                        
        // code to stop you from dropping an tile ontop another tile
        if (ui.draggable.element !== undefined) {
            ui.draggable.element.droppable('enable');
        }
                        
        // stop tile from reverting unless the location is invalid
        ui.draggable.draggable('option', 'revert', "invalid");
        ui.draggable.element = $(this);
                        
        }
});
        
    $('#submit_word').click(function() {
        // remove tiles from game board
        $('.GBdrop .tile').remove();  
        // reenable droppable game board slots
        $('.GBdrop').droppable('enable');
        // call updateScore()
        updateScore();
        // clears the board so that there are no lingering values
        for(i = 0; i <= boardArray.length; i++){
            boardArray[$(this).attr("id")] = "";
        }
        // Stops generating tiles once all tiles are used up
        if(totalTiles <= 6) {
	// disables button once we run out of tiles
            document.getElementById("submit_word").disabled = true;
                
            $('#error').text('There are no more tiles left!');
        }
        // variable for the number of tiles that have been used
        // use that number to create more tiles
        var numTiles = 7 - $('#rack').children().length; 
        // get new tiles
        genTiles(numTiles);
        // make the new tiles draggable
        MakeDraggable('tile');
    });
        
    })();
});


// Credits to "Ramon Meza" for creating this.
var scrabbleTiles = [
        {"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":5},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1}] ;
