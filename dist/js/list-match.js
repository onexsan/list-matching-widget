"use strict";

$(function () {
  var area = $('.workArea');
  var canvas = $('#arrowsCanvas');
  var width = "".concat(area.width() - ($('.left_ul').width() + $('.right_ul').width()));
  canvas.attr('width', "".concat(area.width() - ($('.left_ul').width() + $('.right_ul').width()) + 'px'));
  canvas.attr('height', "".concat(area.height() + 'px'));
  var ctx = canvas.get(0).getContext('2d');
  ctx.translate(0.5, 0.5);
  var left = '';
  var right = '';
  $('.left_ul li').click(function () {
    if (right === '') {
      left = $(this).offset().top - area.offset().top + $(this).outerHeight() / 2;
      $(this).addClass('active');
      console.log('left start', left);
    } else {
      left = $(this).offset().top - area.offset().top + $(this).outerHeight() / 2;
      console.log('left finish', left);
      $(this).addClass('active');
      ctx.beginPath();
      canvas_arrow(ctx, width, right, 0, left);
      ctx.strokeStyle = $(this).css('border-color');
      ctx.stroke();
      right = '';
      left = '';
      console.log(right, left);
    }
  });
  $('.right_ul li').click(function () {
    if (left !== '') {
      right = $(this).offset().top - area.offset().top + $(this).outerHeight() / 2;
      console.log('right finish', right);
      $(this).addClass('active');
      ctx.beginPath();
      canvas_arrow(ctx, 0, left, width - 15, right);
      ctx.strokeStyle = $(this).css('border-color');
      ctx.stroke();
      left = '';
      right = '';
      console.log(left, right);
    } else {
      right = $(this).offset().top - area.offset().top + $(this).outerHeight() / 2;
      console.log('right start', right);
      $(this).addClass('active');
    }
  });
});

function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels

  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy); // context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  // context.moveTo(tox, toy);
  // context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}