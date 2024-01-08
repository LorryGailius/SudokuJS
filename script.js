$(document).ready(function () {
  let request = $.ajax({
    url: SUDOKU_BOARD_URL,
    method: "GET",
    success: function (data) {
      const newBoard = data.newboard.grids[0].value;
      const solution = data.newboard.grids[0].solution;
      sudoku = new Sudoku(9, 9, newBoard, solution);

      $("#board").css({
        "grid-template-columns": `repeat(${sudoku.width}, var(--cell-size))`,
        "grid-template-rows": `repeat(${sudoku.height}, var(--cell-size))`,
      });

      for (let i = 0; i < sudoku.width * sudoku.height; ++i) {
        var value = sudoku.board[i];
        var element =
          value == null
            ? `<input id="${i}" class="input cell" type="number" maxlength="1" onfocus="setCursorEnd(this);" oninput="this.value=this.value.replace(/[^0-9]/g,'');" autocomplete="off">`
            : `<div id="${i}" class="locked cell no-select">${value}</div>`;

        $("#board").append(element);

        $(`#${i}`).on("blur", function () {
          const value = $(this).val();
          sudoku.board[i] = value == "" ? null : parseInt(value);
        });
      }

      $("#reset").click(function () {
        sudoku.reset();
        resetCells(sudoku);
      });

      $("#check").click(function () {
        if (sudoku.board.some((x) => x == null)) {
          showToast("Please fill in all the cells");
        } else {
          if (sudoku.validSudoku()) {
            showToast("Correct ✔️");
          } else {
            showToast("Incorrect ❌");
          }
        }
      });

      $("#solve").click(function () {
        solve();
      });
    },
    error: function (_, status, error) {
      console.error("API error:", status, error);
    },
  });
});

function resetCells(sudoku, gaveUp = false) {
  for (let i = 0; i < sudoku.width * sudoku.height; ++i) {
    $(`#${i}`).val(sudoku.board[i] == null ? "" : sudoku.board[i]);
  }
}

function solve() {
  sudoku.setBoard(sudoku.solution);
  resetCells(sudoku, true);
}

function showToast(message) {
  $("#toast").text(message);

  container = $(".toast-container");
  container.fadeIn();
  setTimeout(() => {
    container.fadeOut();
  }, 4000);
}

function setCursorEnd(input) {
  // Does not work on Brave(Chromium)
  var length = input.value.length;
  input.setSelectionRange(length, length);
}
