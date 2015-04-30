$(document).ready(function(){

  Minesweeper = {

    renderHeading: function(){
      $('<h1></h1>').text('Minesweeper').appendTo('body');
    },

    renderForm: function(){
      
      var sizes = ["S", "M", "L"]

      $('<form>').addClass('game-dimensions-form').appendTo('body');

      for (var i = 0; i < sizes.length; i++) {
        var size = sizes[i];
        $('<label>').text(size).appendTo('.game-dimensions-form');
        $('<input>').attr('type', 'radio').attr('name', 'size').attr('value', size).appendTo('.game-dimensions-form');
      };

      $('<submit>').addClass('size-subimt').appendTo('.game-dimensions-form').text('Submit');

    },

    sizeOfBoard: function(){

      var sizeChoice = $('input:checked').val();
      var width;
      var length;

      if (sizeChoice === "S"){
        width = 9;
        length = 9;
      }else if (sizeChoice === "M"){
        width = 12;
        length = 12;
      }else if (sizeChoice === "L") {
        width = 15;
        length = 15;
      }
     
      Minesweeper.renderGame(width, length);

    },

    // draws the board
    renderGame: function(width, length){

      $('.game-dimensions-form').remove();
      $('<div></div>').addClass('board').appendTo('body');

      _(length).times(function(){
        $('<div>').addClass('row').appendTo('.board');
      });

      _.each($('.row'), function(row){
        _(width).times(function(){
          $('<div>').addClass('square').appendTo(row);
        });
      });
    
    },

    // randomly places the mines
    placeMines: function(){

    },

    // updates squares to reflect number of mines they are touching
    updateSquareNumbers: function(){

    },

    // checks is player clicked on normal square, a mine, or placed a flag
    checkPlayerGuess: function(){


    },

    showNumber: function(){


    },

    placeFlag: function(){


    },

    // shows all mines and squares, the game is over
    gameOver: function(){


    },

    gameWon: function(){


    },

    newGame: function(){


    }

  }

  Minesweeper.renderHeading();
  Minesweeper.renderForm();

  $('submit').on('click', Minesweeper.sizeOfBoard);


});


// Build your board object and the render() function which displays and updates it.
// To start the game, randomly place the mines within the board and update your board 
// squares to each show the appropriate number of mines it is touching.
// Create the logic necessary to update the board whenever a user clicks in a square. 
// You will want to differentiate between when the user places a flag and when they 
// would like to reveal the square, so see this Stack Overflow post on listening for 
// Right Clicks with jQuery.
// Now create the main game logic which checks for failure or victory and then re-renders
//  the board. You'll need to reveal the clicked square and, if that square doesn't 
//  directly touch a mine, also appropriately reveal nearby squares until you get to 
//  those that do touch mines directly (play the sample game above to see this behavior in action).
// Now add a user input for a new game which asks which board size to use.
// Create a timer which counts how long it takes for the user to win the game.

// Have a try and see what you think, don't worry about backbone or anything. 
// But try to keep your functions small.
// Also consider namespacing your app functions so:
// App = {
//  foo: function() {
//  },
//  bar: function() {
//  }
// }
// Then you can call those functions like App.foo()
// But try to keep each function no more than 10 lines long.
