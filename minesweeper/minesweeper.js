Minesweeper = {

  renderHeading: function(){
    $('<h1></h1>').text('Minesweeper').appendTo('body');
  },

  // render size selection form
  renderForm: function(){
    
    var sizes = ["S", "M", "L"];

    $('<form>').addClass('game-dimensions-form').appendTo('body');

    for (var i = 0; i < sizes.length; i++) {
      var size = sizes[i];
      $('<label>').text(size).appendTo('.game-dimensions-form');
      $('<input>').attr('type', 'radio').attr('name', 'size').attr('value', size).appendTo('.game-dimensions-form');
    };

    $('<submit>').addClass('size-subimt').appendTo('.game-dimensions-form').text('Submit');

  },

  // determine size of board
  sizeOfBoard: function(){

    var sizeChoice = $('input:checked').val();
    var boardSize;

    if (sizeChoice === "S"){
      boardSize = 9;
    }else if (sizeChoice === "M"){
      boardSize = 12;
    }else if (sizeChoice === "L") {
      boardSize = 15;
    }
   
    Minesweeper.initialize(boardSize);

  },

  initialize: function(boardSize) {
    // creates an empty array with the num of elements equivalent to boardSize
    Minesweeper.world = new Array(boardSize);

    // for each of those elements, initiate a row  
    for(var i = 0; i < boardSize; i ++) {
      var count = i
      Minesweeper.world[i] = Minesweeper.initRow(boardSize, count);
    }
    console.log(Minesweeper.world);
    Minesweeper.renderBoard();
  },

  initRow: function(rowSize, count) {
    // creates an empty array with the num of elements equivalent to rowSize
    var row = new Array(rowSize);
    // for each of the row elements, create a cell
    for(var i = 0; i < rowSize; i++) {
      // Create our cell and put some attributes into the object.
      
      row[i] = {
        id: count + '-' + i,
        selected: false,
        mine: false,
        flagged: false
      }
    }
    return row;
  },

  // draw the board
  renderBoard: function(){

    $('.game-dimensions-form').remove();
    $('<div></div>').addClass('board').appendTo('body');

    for (var i = 0; i < Minesweeper.world.length; i++) {
      var row = $('<div>').addClass('row').appendTo('.board');

      for (var x = 0; x < Minesweeper.world.length; x++) {
        var cell = Minesweeper.world[i][x];
        $('<div>').addClass('cell').addClass(cell.id).appendTo(row);
      };

    };

    Minesweeper.placeMines();

  },

  // randomly place the mines
  placeMines: function(){

    var min = 0;
    var max = Minesweeper.world.length - 1;

    getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _(10).times(function(){
      var randCol = getRandomInt(min, max);
      var randRow = getRandomInt(min, max);

      Minesweeper.world[randCol][randRow].mine = true
      console.log(Minesweeper.world[randCol][randRow]);

      var id = Minesweeper.world[randCol][randRow].id;

      $('.'+id).addClass('mine').addClass('hidden').html('<i class="fa fa-bolt"></i>');

    });

    // UP TO HERE !!!!

  },

  // checks if player clicked on normal square, a mine, or placed a flag
  checkGuess: function(guess){

    if ($(guess).hasClass('mine')){
       Minesweeper.gameOver();  
    }else {
      Minesweeper.calcNumber(guess);
    }

  },

  // calculates the number of mines around the selected square
  calcNumber: function(guess, width){

    var indexSelectedDiv = _.indexOf($('.square'), guess);
    var algorithm = [1, Minesweeper.width - 1, Minesweeper.width, Minesweeper.width + 1];
    var indexSurroundingDivs = [];

    for (var i = 0; i < algorithm.length; i++) {
      var index = algorithm[i];
      indexSurroundingDivs.push(indexSelectedDiv + index);
      indexSurroundingDivs.push(indexSelectedDiv - index);
    };

    var mineCount = 0;

    for (var i = 0; i < indexSurroundingDivs.length; i++) {
      var index = indexSurroundingDivs[i];
      var div = $('.square')[index];
      if ($(div).hasClass('mine')){
        mineCount += 1;
      }
    };

    mineCount;
    Minesweeper.showNumber(guess, mineCount);

  },

  // displays the number of mines on click
  showNumber: function(guess, mineCount){
    $(guess).addClass('num').html(mineCount);
  },

  placeFlag: function(){

  },

  // shows all mines and squares, the game is over
  gameOver: function(){
    $('.mine').removeClass('hidden');
    $('<p></p>').text('Game Over').appendTo('body');
    $('<a></a>').addClass('new-game').attr('href', '').text('New game').appendTo('body');
  },

  gameWon: function(){

  },

  newGame: function(){
    $('body').empty();
    Minesweeper.renderHeading();
    Minesweeper.renderForm();
  }

}

$(document).ready(function(){

  Minesweeper.renderHeading();
  Minesweeper.renderForm();

  $('body').on('click', 'submit', Minesweeper.sizeOfBoard);

  $('body').on('click', '.square', function(event){
    var guess = event.currentTarget;
    Minesweeper.checkGuess(guess);
  });

  $('body').on('click', '.new-game', function(event){
    event.preventDefault();
    Minesweeper.newGame();
  });

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

// =======

// One key thing with programming (particularly for games or similar things)
// is to think about the "data structure" and have this data model separate
// from the logic.
 
// MS = {
//   initialize: function(boardSize) {
//     MS.world = new Array(boardSize);
 
//     for(var i=0;i<boardSize;i++) {
//       MS.world[i] = MS.initRow(boardSize);
//     }
//   },
//   initRow: function(rowSize) {
//     var row = new Array(rowSize);
//     for(var i=0;i<rowSize;i++) {
      
//       // Create our cell and put some attributes into the object.
//       // It's expected that these attributes would expand based on the requirements
//       // of the project.
//       row[i] = {
//         visible: false,
//         bomb: false,
//         flagged: false
//       }
//     }
//     return row;
//   }
// }
 
// MS.initialize(3);
 
// console.log(MS.world);

// need an id in my cell
// which you include as a data-cell-id in your div
// so you can relate them together

// also create a function that returns a cell when you have an id

// One of the things you're doing is creating a long chain of calls: initialize 
// -> renderBoard -> placemines
// Instead try to setup your data structure separately, so place the mines into
//  the data structure, then render the data structure itself.
// that way when you need to update a cell you change the cell and just rerender
//  the data structure..





