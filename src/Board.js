class Board extends EventEmitter {
  constructor(board) {
    super();

    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    // this.indexes=this.yassine(this.board)
  }
  //  yassine(arr){
  //   var res=[]
  //   for(var i=0; i<arr.length;i++){
  //       var array=[]
  //       for(var j=0;j<arr[i].length;j++){
  //           if(arr[i][j]!==""){
  //               array.push(j)
  //           }
  //       }
  //       res.push(array)
  //   }
    
  //    return res   
  //   }

  getRow(index) {
    return this.board[index];
  }

  updateBoard(newBoard) {
    this.board = newBoard;
  }


  getCol(index) {
    const result = [];
    for (let i = 0; i < this.board.length; i++) {
      result.push(this.board[i][index]);
    }
    return result;
  }


  generateBoard() {
    const hardPuzzle = [
      ["", "", 2, "", "", "", "", "", ""],
      ["", "", 9, "", "", "", "", "", ""],
      ["", 4, "", "", "", "", "", 6, ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", 5, 9, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", "", "", "", 4, "", 2],
      ["", 8, "", "", "", "", "", "", ""],
    ]

    this.board = hardPuzzle;
    this.emit("boardGenerated", hardPuzzle);
  }

  clearBoard() {
    const emptyPuzzle = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
    this.board = emptyPuzzle;
    this.emit("boardcleared", emptyPuzzle);
  }

  getBox(rowIndex, colIndex) {
    const result = [];
    const boxRowStart = rowIndex - (rowIndex % 3);
    const boxColStart = colIndex - (colIndex % 3);

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let d = boxColStart; d < boxColStart + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  getBoxByIndex(index) {
    const result = []
    const startingRow = Math.floor(index / 3) * 3;
    const startingCol = Math.floor(index % 3) * 3;
    for (let r = startingRow; r < startingRow + 3; r++) {
      for (let d = startingCol; d < startingCol + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;

  }
  /*
           _             _     _
       ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
      / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
      \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
      |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
  
   */

  /*=========================================================================
  =                 TODO: fill in these Checker Functions                    =
  =========================================================================*/

  rowSafe(row, num) {
    if (this.getRow(row).includes(num)) {
      return false
    }
    return true
  }

  colSafe(col, num) {
    if (this.getCol(col).includes(num)) {
      return false
    }
    return true
  }

  boxSafe(row, col, num) {
    if (this.getBox(row, col).includes(num)) {
      return false
    }
    return true
  }

  rowValidAt(rowIndex) {
    let arr = this.getRow(rowIndex)
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        obj[arr[i]] = 0
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        obj[arr[i]]++
      }
    }
    delete obj[""]
    for (let key in obj) {
      if (obj[key] > 1) {
        return false
      }
    }
    return true

  }

  colValidAt(colIndex) {
    let arr = this.getCol(colIndex)
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        obj[arr[i]] = 0
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        obj[arr[i]]++
      }
    }
    delete obj[""]
    for (let key in obj) {
      if (obj[key] > 1) {
        return false
      }
    }
    return true

  }

  boxValidAt(boxIndex) {
    let arr = this.getBoxByIndex(boxIndex)
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0 && arr[i]!=="") {
        obj[arr[i]] = 0
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0 && arr[i]!=="") {
        obj[arr[i]]++
      }
    }
    // delete obj[""]
    for (let key in obj) {
      if (obj[key] > 1) {
        return false
      }
    }
    return true
  }

  allRowsValid() {
    for (let i = 0; i < this.board.length; i++) {
      if (!this.rowValidAt(i)) {
        return false
      }
    }
    return true
  }
  allColsValid() {
    for (let i = 0; i < this.board.length; i++) {
      if (!this.colValidAt(i)) {
        return false
      }
    }
    return true
  }
  allBoxesValid() {
    for (let i = 0; i < this.board.length; i++) {
      if (!this.boxValidAt(i)) {
        return false
      }
    }
    return true
  }

  validBoard() {
    return this.allBoxesValid() && this.allColsValid() && this.allRowsValid();
  }

  isSafe(row, col, num) {
    return this.rowSafe(row, num) && this.colSafe(col, num) && this.boxSafe(row, col, num);
   // // this.board[row][col]=num
    // if(this.isSafe(row,col,num) && col<9 && num<=9){
    //   this.board[row][col]=num
    //     this.solve(row,col+1,num)
    // }else if(this.isSafe(row,col,num) && col===9 ){  
    //   this.board[row][col]=num       
    //     this.solve(row+1,col=0,num=1)
    // }else if(!(this.isSafe(row,col,num)) && col<9 && num<=9){
    //   this.solve(row,col,num+1)
    // }else if(!(this.isSafe(row,col,num)) && col<9 && num===9){
    //   this.solve(row,col-1,this.board[row][col-1])
    // }else if(!(this.isSafe(row,col,num)) && col===0 && num===9){
    //     this.solve(row-1,col=8,this.board[row-1][col=8])
    // }

    // for (var i=0;i<this.board.length;i++){
    //   for(var j=0;j<this.board.length;j++){
    //     if(this.board[j]!==0 && this.board[j]!=="" )
    //   }

    // }
  }

  /*=========================================================================
  =                 TODO: fill in these Solver Functions                    =
  =========================================================================*/

  solve(row = 0, col = 0) {
    debugger
     if(row===8 && col===9){
      return true 
     }        
     if(col ===9){
       col=0 
       row++
     }
     if (this.board[row][col]!==0 && this.board[row][col]!=="") {
      return this.solve(row,col+1)
     }        
     for (let i=1;i<10;i++){
      if(this.isSafe(row,col,i)){
        this.board[row][col]=i
        if(this.solve(row,col+1))return true 
      }
      this.board[row][col]=0
     }

      return false 

    // debugger
    // if (row === 9 ) {
    //   return true
    // }
    // if (this.board[row][col]!==0 && this.board[row][col]!=="") {
    //   this.solve(row,col+1,num)
    // }
    // if (this.isSafe(row, col, num)) {
    //   this.board[row][col] = num
    //   if (col === 8) {
    //     this.solve(row + 1, col = 0, num = 1)
    //   }
    //   else if (col < 8) {
    //     this.solve(row, col + 1, num = 1)
    //   }
    //   else if (col === 8) {
    //     this.solve(row + 1, col = 0, num = 1)
    //   }
    // }
    // else {
    //   if (num < 9) {
    //     this.solve(row, col, num + 1)
    //   }
    //   else if (num === 9 && col < 9) {
    //     this.board[row][col]=0
    //     while ( this.indexes[row].includes(col)) {
    //       col=col-1
    //     }
    //    if (!this.board[row][col]!==0 && this.board[row][col]!=="")  {
    //       this.solve(row,col-1,num)
    //     }
    //     this.solve(row, col-1 , num=1)      
    //   }
    //   else if (num === 9 && col === 0) {
    //     this.board[row][col]=0
    //     this.solve(row - 1, col = 8, this.board[row - 1][8])
    //   }
    // }
}

solveBoard() {
  while (this.validBoard()) {
    if (this.solve()) {
      this.emit("validBoard", this.board);
      return true
    }
  }
  this.emit("invalidBoard");
  return false
  // dont forget to add a small change here ;) 
}
}
