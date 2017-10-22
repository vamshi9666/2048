((() => {
  window.app.mixins.control = {
    methods: {
      moveRight() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = self.board.length - 2
          let j = self.board.length - 1

          // updated all the possible merge values
          // think of i, j  pointers in the board
          // if they become separate, the pointers will try to catch up
          while (i >= 0) {
            if (board[a][i].value === 0 && board[a][j].value === 0) { // if both elements are zero
              j --
              i --
            } else if (board[a][i].value === board[a][j].value) { // if two elements have same value
              board[a][i].animations.merge.push({m: false, x: j, y: a, value: 0})
              board[a][j].animations.merge.push({m: true, x: i, y: a, value: board[a][i].value + board[a][j].value})

              board[a][j].value = board[a][i].value + board[a][j].value
              board[a][i].value = 0
              self.boardDidChange()
              j--
              i--
            } else if (board[a][j].value === 0) { // if the right most has 0
              j--
              i--
            } else if (board[a][i].value != 0 && board[a][j].value != 0 && (i + 1 == j)) { // if both are non zero and next to each other
              j--
              i--
            } else if (board[a][i].value != 0 && board[a][j].value != 0) { // if both are non zero and not next to each other
              j--
            } else if (board[a][i].value === 0) { // if the left most element is zero
              i--
            }
          }

          let k = self.board.length - 2
          let l = self.board.length - 1
          while (k >= 0) {
            if (board[a][l].value !== 0) { // if right most element is 0
              l --
              k --
            } else if (board[a][l].value !== 0 && board[a][k].value !== 0) { // if right most and left most elements are not 0
              l --
              k --
            } else if (board[a][l].value === 0 && board[a][k].value === 0) { // if right most and left most elements are 0
              k --
            } else if (board[a][l].value === 0 && board[a][k].value !== 0) { // if right most element is 0 and left most element is not 0
              board[a][k].animations.slide.push({m: false, x: l, y: a, value: 0})
              board[a][l].animations.slide.push({m: true, x: k, y: a, value: board[a][k].value + board[a][l].value})

              board[a][l].value = board[a][k].value + board[a][l].value
              board[a][k].value = 0
              self.boardDidChange()
              l --
              k --
            }
          }

        }
        this.animate()
      },

      moveLeft() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = 1
          let j = 0

          while (i < board.length) {
            if (board[a][i].value === 0 && board[a][j].value === 0) {
              j++
              i++
            } else if (board[a][i].value === board[a][j].value) { // if two elements have same value
              board[a][i].animations.merge.push({m: false, x: j, y: a, value: 0})
              board[a][j].animations.merge.push({m: true, x: i, y: a, value: board[a][i].value + board[a][j].value})

              board[a][j].value = board[a][i].value + board[a][j].value
              board[a][i].value = 0
              self.boardDidChange()
              j++
              i++
            } else if (board[a][j].value === 0) { // if the left most ele has 0
              j++
              i++
            } else if (board[a][i].value != 0 && board[a][j].value != 0 && (i - 1 == j)) { // if both are non zero and next to each other
              j++
              i++
            } else if (board[a][i].value != 0 && board[a][j].value != 0) { // if both are non zero and not next to each other
              j++
            } else if (board[a][i].value === 0) { // if the right most ele has 0
              i++
            }
          }


          let k = 1
          let l = 0
          while (k < board.length) {
            if (board[a][l].value !== 0) { // if left most element is 0
              l ++
              k ++
            } else if (board[a][l].value !== 0 && board[a][k].value !== 0) { // if left most and right most elements are not 0
              l ++
              k ++
            } else if (board[a][l].value === 0 && board[a][k].value === 0) { // if left most and right most elements are 0
              k ++
            } else if (board[a][l].value === 0 && board[a][k].value !== 0) { // if left most element is 0 and right most element is not 0
              board[a][k].animations.slide.push({m: false, x: l, y: a, value: 0})
              board[a][l].animations.slide.push({m: true, x: k, y: a, value: board[a][k].value + board[a][l].value})

              board[a][l].value = board[a][k].value + board[a][l].value
              board[a][k].value = 0
              self.boardDidChange()
              l ++
              k ++
            }
          }
        }
        this.animate()
      },

      moveDown() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = self.board.length - 2
          let j = self.board.length - 1

          while (i >= 0) {
            if (board[i][a].value === 0 && board[j][a].value === 0) {
              j--
              i--
            } else if (board[i][a].value === board[j][a].value) {
              board[j][a].value = board[i][a].value + board[j][a].value
              board[i][a].value = 0
              self.boardDidChange()
              j--
              i--
            } else if (board[j][a].value === 0) {
              j--
              i--
            } else if (board[i][a].value != 0 && board[j][a].value != 0 && (i + 1 == j)) {
              j--
              i--
            } else if (board[i][a].value != 0 && board[j][a].value != 0) {
              j--
            } else if (board[i][a].value === 0) {
              i--
            }
          }
          for (var x = 0; x < board.length; x++) {
            for (var y = board.length - 1; y > 0; y--) {
              if (board[y][a].value === 0) {
                let temp = board[y - 1][a].value
                board[y - 1][a].value = 0
                board[y][a].value = temp

                if (temp != 0) {
                  self.boardDidChange()
                }
              }
            }
          }
        }
      },

      moveUp() {
        const self = this
        let board = self.board
        for (var a = 0; a < board.length; a++) {
          let i = 1
          let j = 0

          while (i < board.length) {
            if (board[i][a].value === 0 && board[j][a].value === 0) {
              j++
              i++
            } else if (board[i][a].value === board[j][a].value) {
              board[j][a].value = board[i][a].value + board[j][a].value
              board[i][a].value = 0
              self.boardDidChange()
              j++
              i++
            } else if (board[j][a].value === 0) {
              j++
              i++
            } else if (board[i][a].value != 0 && board[j][a].value != 0 && (i - 1 == j)) {
              j++
              i++
            } else if (board[i][a].value != 0 && board[j][a].value != 0) {
              j++
            } else if (board[i][a].value === 0) {
              i++
            }
          }
          for (var x = 0; x < board.length; x++) {
            for (var y = 0; y < board.length - 1; y++) {
              if (board[y][a].value === 0) {
                let temp = board[y + 1][a].value
                board[y + 1][a].value = 0
                board[y][a].value = temp
                if (temp != 0) {
                  self.boardDidChange()
                }
              }
            }
          }
        }
      },

      boardDidChange() {
        this.$store.dispatch("toggleBoardChanged", true)
      },

      animate() {
        if (this.boardChanged) {
          this.$store.dispatch("toggleAnimation", true)
        }
      },

      registerControl() {
        const self = this
        document.addEventListener("keydown", function(event) {
          if (event.which === 39) {
            // right
            self.moveRight()
          } else if (event.which === 37) {
            // left
            self.moveLeft()
          } else if (event.which === 38) {
            // up
            self.moveUp()
          } else if (event.which === 40) {
            // down
            self.moveDown()
          } else {
            return // do nothing
          }
        })
      }
    }
  }
}))()
