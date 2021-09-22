$(function () {
  let area = $(".workArea");
  let canvas = $("#arrowsCanvas");
  canvas.attr(
    "width",
    `${area.width() - ($(".left_ul").width() + $(".right_ul").width()) + "px"}`
  );
  canvas.attr("height", `${area.height() + "px"}`);
  let ctx = canvas.get(0).getContext("2d");

  let actives = [];
  let from = null;
  let to = null;

  $(".lesson-block__connect-item").click(function () {
    let pos = {
      x: $(this).parent().hasClass("left_ul")
        ? $(this).offset().left
        : $(this).offset().left - $(this).outerWidth(),
      y: $(this).offset().top + $(this).outerHeight() / 2,
    };
    if (from && pos.x != from.x) {
      to = {
        x: $(this).parent().hasClass("left_ul")
          ? $(this).offset().left
          : $(this).offset().left - $(this).outerWidth(),
        y: $(this).offset().top + $(this).outerHeight() / 2,
      };
    } else {
      $(".lesson-block__connect-item").each(function () {
        if (
          !isActive(actives, {
            x: $(this).parent().hasClass("left_ul")
              ? $(this).offset().left
              : $(this).offset().left - $(this).outerWidth(),
            y: $(this).offset().top + $(this).outerHeight() / 2,
          })
        ) {
          $(this).removeClass("active");
        }
      });
      from = {
        x: $(this).parent().hasClass("left_ul")
          ? $(this).offset().left
          : $(this).offset().left - $(this).outerWidth(),
        y: $(this).offset().top + $(this).outerHeight() / 2,
      };
    }

    $(this).addClass("active");

    if (
      from &&
      to &&
      from.x !== to.x &&
      !isActive(actives, from) &&
      !isActive(actives, to)
    ) {
      actives.push(from);
      actives.push(to);
      ctx.beginPath();
      canvas_arrow(ctx, from.x, from.y, to.x, to.y);
      ctx.strokeStyle = $(this).css("border-color");
      ctx.stroke();
      from = "";
      to = "";
    }
  })

  $(".lesson-block__clear-button").click(function () {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    $(".lesson-block__connect-item").each(function () {
      $(this).removeClass("active");
    });
    let actives = [];
    let from = null;
    let to = null;
  });
});


function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
}

function isActive(activesArr, plate) {
  return activesArr.some(function(el) {
    return el.x === plate.x && el.y === plate.y;
  }); 
}