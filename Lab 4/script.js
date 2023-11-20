$(document).ready(function () {
  let request = $.ajax({
    url: SUDOKU_BOARD_URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      sudoku = new Sudoku(data.width, data.height, data.board);

      $("#board").css({
        "grid-template-columns": `repeat(${sudoku.width}, var(--cell-size))`,
        "grid-template-rows": `repeat(${sudoku.height}, var(--cell-size))`,
      });

      for (let i = 0; i < sudoku.width * sudoku.height; ++i) {
        var value = sudoku.board[i];
        var element =
          value == null
            ? `<input id="${i}" class="input cell" type="text" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,''); " autocomplete="off">`
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
          showToast("Please fill in all the cells.");
        } else {
          let request = $.ajax({
            url: SUDOKU_SOLVE_URL,
            method: "GET",
            dataType: "json",
            success: function (data) {
              if (data.solution == sudoku.board.join("")) {
                showToast("Correct ✔️");
              } else {
                showToast("Incorrect ❌");
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

function resetCells(sudoku, gaveUp = false) {
  for (let i = 0; i < sudoku.width * sudoku.height; ++i) {
    $(`#${i}`).val(sudoku.board[i] == null ? "" : sudoku.board[i]);
    $(`#${i}`).attr("disabled", gaveUp);
  }
}

function solve() {
  let request = $.ajax({
    url: SUDOKU_SOLVE_URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      sudoku.setBoard(data.solution);
      resetCells(sudoku, true);
    },
    error: function (_, status, error) {
      console.error("API error:", status, error);
    },
  });
}

function showToast(message) {
  $("#toast").text(message);
  container = $(".toast-container");
  container.fadeIn();
  setTimeout(() => {
    container.fadeOut();
  }, 4000);
}
