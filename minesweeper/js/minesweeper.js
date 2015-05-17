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
   
    Minesweeper.initializeBoard(boardSize);

  },

  initializeBoard: function(boardSize) {
    // creates an empty array with the num of elements equivalent to boardSize
    Minesweeper.world = new Array(boardSize);

    // for each of those elements, initiate a row  
    for(var i = 0; i < boardSize; i ++) {
      var count = i
      Minesweeper.world[i] = Minesweeper.initRow(boardSize, count);
    }
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
        row: count,
        col: i,
        selected: false,
        mine: false,
        flagged: false,
        surroundingMines: 0
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
        $('<div>').addClass('cell').attr('id', cell.id).attr('row', cell.row).attr('col', cell.col).appendTo(row);
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

    });
    Minesweeper.addMineClasses();
  },

  addMineClasses: function(){
    _.each(Minesweeper.world, function(row) { 

      _.each(row, function(cell){

        if (cell.mine){ 
          $('[id='+cell.id+']').addClass('mine').addClass('hidden').html('<i class="fa fa-bolt"></i>');
        }
      }) 

    });
    // _.map(Minesweeper.world, function(i){ if (i.mine === true) {console.log(i);} });
    Minesweeper.calculateSurroundingMines();
  },

  calculateSurroundingMines: function(){
    _.each(Minesweeper.world, function(row) { 
      _.each(row, function(cell){

  
      if (cell.row > 0) {
        var cellsAbove = [
          Minesweeper.world[cell.row - 1][cell.col - 1], 
          Minesweeper.world[cell.row - 1][cell.col],
          Minesweeper.world[cell.row - 1][cell.col + 1]
        ]
      } else {
        cellsAbove = []
      }

      var cellsAside = [];

      if (cell.col > 0){
        cellsAside.push(Minesweeper.world[cell.row][cell.col - 1]); 
      } else if (cell.col < Minesweeper.world.length - 1) {
        cellsAside.push(Minesweeper.world[cell.row][cell.col + 1]);
      } else {
        cellsAside = [];
      }

      if (cell.row < Minesweeper.world.length - 1){

        var cellsBelow = [
          Minesweeper.world[cell.row + 1][cell.col - 1], 
          Minesweeper.world[cell.row + 1][cell.col],
          Minesweeper.world[cell.row + 1][cell.col + 1]
        ]
      } else {
        cellsBelow = []
      }

      var surroundingCells = _.union(cellsAbove, cellsAside, cellsBelow);
      surroundingCells = _.compact(surroundingCells);

      _.each(surroundingCells, function(surroundingCell){
        if (surroundingCell.mine === true){ cell.surroundingMines += 1 }
      });

      cell.surroundingMines;
      console.log(cell.surroundingMines);

      }) 
    });

  }, 

  // checks if player clicked on normal square, a mine, or placed a flag
  checkGuess: function(guess){

    var clicked = Minesweeper.world[guess.attributes.row.value][guess.attributes.col.value];

    if (clicked.mine){
       Minesweeper.gameOver();  
    }else if (clicked.selected === false) {
      Minesweeper.showNumber(clicked);
      clicked.selected = true;
    }

  },

  showNumber: function(clicked){
    $('[id='+clicked.id+']').addClass('num').html(clicked.surroundingMines);
  },

  placeFlag: function(guess){
    var clicked = Minesweeper.world[guess.attributes.row.value][guess.attributes.col.value];
    clicked.flagged = true;
    $('[id='+clicked.id+']').addClass('flag').html('<i class="fa fa-flag"></i>');
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
  },

  initEvents: function(){
  $('body').on('click', 'submit', Minesweeper.sizeOfBoard);

    $('body').on('mousedown', '.cell', function(event) {
      switch (event.which) {
          case 1:
              console.log('Left Mouse button pressed.');
              var guess = event.currentTarget;
              Minesweeper.checkGuess(guess);
              break;
          case 2:
              console.log('Middle Mouse button pressed.');
              break;
          case 3:
              console.log('Right Mouse button pressed.');
              var guess = event.currentTarget;
              Minesweeper.placeFlag(guess);
              break;
          default:
              console.log('You have a strange Mouse!');
      }
    });

    $('body').on('click', '.new-game', function(event){
      event.preventDefault();
      Minesweeper.newGame();
    });

  }

}

$(document).ready(function(){

  Minesweeper.renderHeading();
  Minesweeper.renderForm();
  Minesweeper.initEvents();

});



// init process
 
// Minesweeper.initEvents();                 // initialize events. Remember to listen on $(document).on('click', '.cell')
//                                           // etc...
 
// Minesweeper.initializeBoard('M');         // create the board of the right size.
// Minesweeper.placeMines();                 // update Minesweeper.world to update the random cells with mine = true;
// Minesweeper.calculateSurroundingMines();  // updates each cell to figure out the number of mines surrounding it.
// Minesweeper.render();                     // renders the game board.
 


// the structure of the board in the dom should allow you to figure out which cell is clicked on.
// something like:
// <div class="cell" data-id="1"></div>
//
// every time someone clicks on a cell it updates the cell in MS.world and calls Minesweeper.render();
// which would replace the entire board with new divs for every cell.


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





