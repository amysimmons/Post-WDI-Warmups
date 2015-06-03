Minesweeper = {

  renderHeading: function(){
    $('<h1></h1>').text('Minesweeper').appendTo('body');
  },

  renderForm: function(){
    $('<form>').addClass('game-dimensions-form').appendTo('body');

    var sizes = ["S", "M", "L"];

    for (var i = 0; i < sizes.length; i++) {
      var size = sizes[i];
      $('<label>').text(size).appendTo('.game-dimensions-form');
      $('<input>').attr('type', 'radio').attr('name', 'size').attr('value', size).appendTo('.game-dimensions-form');
    };

    $('<submit>').addClass('size-subimt').appendTo('.game-dimensions-form').text('Submit');
  },

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
    Minesweeper.world = new Array(boardSize);

    for(var i = 0; i < boardSize; i ++) {
      var count = i
      Minesweeper.world[i] = Minesweeper.initRow(boardSize, count);
    }

    Minesweeper.renderBoard(boardSize);
  },

  initRow: function(rowSize, count) {
    var row = new Array(rowSize);

    for(var i = 0; i < rowSize; i++) {
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

  renderBoard: function(boardSize){
    $('.game-dimensions-form').remove();
    $('<div></div>').addClass('board').appendTo('body');

    for (var i = 0; i < Minesweeper.world.length; i++) {
      var row = $('<div>').addClass('row').appendTo('.board');
      for (var x = 0; x < Minesweeper.world.length; x++) {
        var cell = Minesweeper.world[i][x];
        $('<div>').addClass('cell').attr('id', cell.id).attr('row', cell.row).attr('col', cell.col).appendTo(row);
      };
    };

    Minesweeper.placeMines(boardSize);
  },

  placeMines: function(boardSize){

    Minesweeper.numMines = boardSize + 1;
    var numMines = Minesweeper.numMines;
    var min = 0;
    var max = Minesweeper.world.length - 1;

    getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var mineCount = 0;

    while (mineCount < numMines) {
      var randCol = getRandomInt(min, max);
      var randRow = getRandomInt(min, max);
      var cell = Minesweeper.world[randCol][randRow]
      if (!cell.mine){
        cell.mine = true;
        mineCount += 1;
      }
    }

    Minesweeper.calculateSurroundingMines();
  },

  calculateSurroundingMines: function(){
    _.each(Minesweeper.world, function(row) {
      _.each(row, function(cell){
        // above cells
        if (cell.row > 0) {
          var cellsAbove = [
            Minesweeper.world[cell.row - 1][cell.col - 1],
            Minesweeper.world[cell.row - 1][cell.col],
            Minesweeper.world[cell.row - 1][cell.col + 1]
          ]
        } else {
          cellsAbove = [];
        }
        // side cells
        var cellsAside = [];
        if (cell.col > 0){
          cellsAside.push(Minesweeper.world[cell.row][cell.col - 1]);
        }
        if (cell.col < Minesweeper.world.length - 1) {
          cellsAside.push(Minesweeper.world[cell.row][cell.col + 1]);
        }
        // cells below
        if (cell.row < Minesweeper.world.length - 1){
          var cellsBelow = [
            Minesweeper.world[cell.row + 1][cell.col - 1],
            Minesweeper.world[cell.row + 1][cell.col],
            Minesweeper.world[cell.row + 1][cell.col + 1]
          ]
        } else {
          cellsBelow = [];
        }
        // calc cells
        var surroundingCells = _.union(cellsAbove, cellsAside, cellsBelow);
        surroundingCells = _.compact(surroundingCells);
        _.each(surroundingCells, function(surroundingCell){
          if (surroundingCell.mine){ cell.surroundingMines += 1 }
        });
      })
    });
  },

  checkGuess: function(guess){
    var clicked = Minesweeper.world[guess.attributes.row.value][guess.attributes.col.value];

    if (clicked.mine){
        var result = "You lose!"
       Minesweeper.gameOver(result);
    }else if (!clicked.selected) {
      Minesweeper.showNumber(clicked);
      clicked.selected = true;
    }
  },

  showNumber: function(clicked){
    $('[id='+clicked.id+']').addClass('num').html(clicked.surroundingMines);
  },

  placeFlag: function(guess){
    $(guess).removeClass('hidden');

    var clicked = Minesweeper.world[guess.attributes.row.value][guess.attributes.col.value];
    clicked.flagged = true;
    $('[id='+clicked.id+']').addClass('flag').html('<i class="fa fa-flag"></i>');

    var flagCount = 0;

    _.each(Minesweeper.world, function(row) {
      _.each(row, function(cell){
        if(cell.flagged){flagCount += 1}
      })
    });

    flagCount;

    if (flagCount === Minesweeper.numMines){
      var result = 'You win!'
      Minesweeper.gameOver(result);
    }
  },

  gameOver: function(result){
    // reveal all nums and mines
    revealNumsAndMines = function(){
      _.each(Minesweeper.world, function(row) {
        _.each(row, function(cell){
          if (!cell.selected && !cell.mine) {
            $('[id='+cell.id+']').addClass('num').html(cell.surroundingMines);
          }
          if (cell.mine){
            $('[id='+cell.id+']').addClass('mine').html('<i class="fa fa-bolt"></i>');
          }
        });
      });
    }
    revealNumsAndMines();

    // prevent clicks on board until new game begins

    // show result and new game link
    $('.result').empty();
    $('.new-game').empty();
    $('<p></p>').addClass('result').text(result).appendTo('body');
    $('<a></a>').addClass('new-game').attr('href', '').text('New game').appendTo('body');
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

// 1. make the zeros expand
// 2. dont allow click on flag once flagged - so disable left click but right click to remove the flag
// 3. dont flag things already been revealed
// 4. append at bottom
// 5. once the game is over, dont allow any more clicks on the board



