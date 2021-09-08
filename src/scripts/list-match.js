$(function () {
    let area = $('.workArea');
    let canvas = $('#arrowsCanvas');
		let width = `${area.width() - ($('.left_ul').width() + $('.right_ul').width())}`;
    canvas.attr('width', `${area.width() - ($('.left_ul').width() + $('.right_ul').width()) + 'px'}`);
    canvas.attr('height', `${area.height() + 'px'}`);
    let ctx = canvas.get(0).getContext('2d');
    ctx.translate(0.5, 0.5);
    

    $('.left_ul li').click(function () {
        start = ($(this).offset().top - area.offset().top) + ($(this).outerHeight() / 2);
			$(this).addClass('active');
			$('.right_ul li').click(function () {
            finish = ($(this).offset().top - area.offset().top) + ($(this).outerHeight() / 2);
						$(this).addClass('active');
            ctx.beginPath();
            canvas_arrow(ctx, 0, start, width - 15, finish);
            ctx.strokeStyle = $(this).css('border-color');
            ctx.stroke();
        });
    });
});


function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}