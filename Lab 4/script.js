$(document).ready(function () {
  let request = $.ajax({
    url: SUDOKU_BOARD_URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      sudoku = new Sudoku(data.width, data.height, data.board);

      $("#board").css({
        "grid-template-columns": `repeat(${sudoku.width}, 45px)`,
        "grid-template-rows": `repeat(${sudoku.height}, 45px)`,
      });

      for (let i = 0; i < sudoku.width * sudoku.height; ++i) {
        var value = sudoku.board[i];
        var element =
          value == null
            ? `<input id="${i}" class="input cell" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');">`
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
        console.log(sudoku.board);
        if (sudoku.board.some((x) => x == null)) {
          alert("Please fill in all the cells.");
        } else {
          let request = $.ajax({
            url: SUDOKU_SOLVE_URL,
            method: "GET",
            dataType: "json",
            success: function (data) {
              if (data.solution == sudoku.board.join("")) {
                alert("Correct!");
              } else {
                alert("Incorrect!");
              }
            },
            error: function (_, status, error) {
              console.error("API error:", status, error);
            },
          });
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

function resetCells(sudoku) {
  for (let i = 0; i < sudoku.width * sudoku.height; ++i) {
    $(`#${i}`).val(sudoku.board[i] == null ? "" : sudoku.board[i]);
    $(`#${i}`).attr("disabled", sudoku.board[i] != null);
  }
}

function solve() {
  let request = $.ajax({
    url: SUDOKU_SOLVE_URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      sudoku.setBoard(data.solution);
      resetCells(sudoku);
    },
    error: function (_, status, error) {
      console.error("API error:", status, error);
    },
  });
}
