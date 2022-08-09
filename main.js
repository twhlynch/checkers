
function getPieceLocation(tile) {
    var loc = [tile.getAttribute('data-col'), tile.getAttribute('data-row')];
    return loc;
}
function getPiece([col, row]) {
    var piece = $('[data-col="' + col + '"][data-row="' + row + '"]');
    return piece;
}
function getPieceRelative(piece, [col, row]) {
    var loc = getPieceLocation(piece);
    var newLoc = [(parseInt(loc[0]) + col).toString(), (parseInt(loc[1]) + row).toString()];
    return getPiece(newLoc);
}

$('.tile-d[data-row=7], .tile-d[data-row=6], .tile-d[data-row=5]').addClass('checker');
$('.tile-d[data-row=2], .tile-d[data-row=1], .tile-d[data-row=0]').addClass('checker-o');

$('.checker[data-row=6]').addClass('king');

$(document).ready(function() {
    $('.checker').click(function() {
        var piece = $(this);
        var loc = getPieceLocation(this);
        var upright = getPieceRelative(this, [1, -1]);
        var upleft = getPieceRelative(this, [-1, -1]);
        var downright = getPieceRelative(this, [1, 1]);
        var downleft = getPieceRelative(this, [-1, 1]);
        var up2right = getPieceRelative(this, [2, -2]);
        var up2left = getPieceRelative(this, [-2, -2]);
        var down2right = getPieceRelative(this, [2, 2]);
        var down2left = getPieceRelative(this, [-2, 2]);
        
        $('.selected').removeClass('selected'); 

        piece.addClass('selected');
        
        upright.addClass('selected');
        upleft.addClass('selected');
        downright.addClass('selected');
        downleft.addClass('selected');
        up2right.addClass('selected');
        up2left.addClass('selected');
        down2right.addClass('selected');
        down2left.addClass('selected');

        upright.addClass('upright');
        upleft.addClass('upleft');
        downright.addClass('downright');
        downleft.addClass('downleft');
        up2right.addClass('up2right');
        up2left.addClass('up2left');
        down2right.addClass('down2right');
        down2left.addClass('down2left');
        
        if (piece.hasClass('king')) {
            // up right
            if (upright.hasClass('checker')) {
                upright.removeClass('selected');
                up2right.removeClass('selected');
            }
            if (upright.hasClass('checker-o')) {
                upright.removeClass('selected');
                if (up2right.hasClass('checker') || up2right.hasClass('checker-o')) {
                    up2right.removeClass('selected');
                }
            }
            if (!upright.hasClass('checker') && !upright.hasClass('checker-o')) {
                up2right.removeClass('selected');
            }
            // up left
            if (upleft.hasClass('checker')) {
                upleft.removeClass('selected');
                up2left.removeClass('selected');
            }
            if (upleft.hasClass('checker-o')) {
                upleft.removeClass('selected');
                if (up2left.hasClass('checker') || up2left.hasClass('checker-o')) {
                    up2left.removeClass('selected');
                }
            }
            if (!upleft.hasClass('checker') && !upleft.hasClass('checker-o')) {
                up2left.removeClass('selected');
            }
            // down right
            if (downright.hasClass('checker')) {
                downright.removeClass('selected');
                down2right.removeClass('selected');
            }
            if (downright.hasClass('checker-o')) {
                downright.removeClass('selected');
                if (down2right.hasClass('checker') || down2right.hasClass('checker-o')) {
                    down2right.removeClass('selected');
                }
            }
            if (!downright.hasClass('checker') && !downright.hasClass('checker-o')) {
                down2right.removeClass('selected');
            }
            // down left
            if (downleft.hasClass('checker')) {
                downleft.removeClass('selected');
                down2left.removeClass('selected');
            }
            if (downleft.hasClass('checker-o')) {
                downleft.removeClass('selected');
                if (down2left.hasClass('checker') || down2left.hasClass('checker-o')) {
                    down2left.removeClass('selected');
                }
            }
            if (!downleft.hasClass('checker') && !downleft.hasClass('checker-o')) {
                down2left.removeClass('selected');
            }
        } else {
            downright.removeClass('selected');
            downleft.removeClass('selected');
            down2right.removeClass('selected');
            down2left.removeClass('selected');

            // up right
            if (upright.hasClass('checker')) {
                upright.removeClass('selected');
                up2right.removeClass('selected');
            }
            if (upright.hasClass('checker-o')) {
                upright.removeClass('selected');
                if (up2right.hasClass('checker') || up2right.hasClass('checker-o')) {
                    up2right.removeClass('selected');
                }
            }
            if (!upright.hasClass('checker') && !upright.hasClass('checker-o')) {
                up2right.removeClass('selected');
            }
            // up left
            if (upleft.hasClass('checker')) {
                upleft.removeClass('selected');
                up2left.removeClass('selected');
            }
            if (upleft.hasClass('checker-o')) {
                upleft.removeClass('selected');
                if (up2left.hasClass('checker') || up2left.hasClass('checker-o')) {
                    up2left.removeClass('selected');
                }
            }
            if (!upleft.hasClass('checker') && !upleft.hasClass('checker-o')) {
                up2left.removeClass('selected');
            }
        }
    });
    $('.selected').click(function() {
        var piecethis = this;
        var piece = $(this);
        var origin = $('.selected.checker');
        if (!piece.hasClass('checker')) {
            piece.addClass('checker');
            origin.removeClass('checker');
            if (origin.hasClass('king')) {
                piece.addClass('king');
                origin.removeClass('king');
            }
            //if jumped over a piece, remove it
            // get piece class list
            var classList = origin.getAttribute('class').split(/\s+/);
            // remove all other than movement classes
            for (var i = 0; i < classList.length; i++) {
                if (classList[i] != 'checker' && classList[i] != 'king' && classList[i] != 'selected' && classList[i] != 'tile' && classList[i] != 'tile-d') {
                    var movement = classList[i];
                }
            }
            // if has a '2' string in it
            if (movement.indexOf('2') > -1) {
                // get the piece that was jumped over
                if (movement == 'upright') {
                    if (getPieceRelative(piecethis, [-1, 1]).hasClass('checker-o')) {
                        getPieceRelative(piecethis, [-1, 1]).removeClass('checker-o');
                    }
                }
                if (movement == 'upleft') {
                    if (getPieceRelative(piecethis, [1, 1]).hasClass('checker-o')) {
                        getPieceRelative(piecethis, [1, 1]).removeClass('checker-o');
                    }
                }
                if (movement == 'downright') {
                    if (getPieceRelative(piecethis, [-1, -1]).hasClass('checker-o')) {
                        getPieceRelative(piecethis, [-1, -1]).removeClass('checker-o');
                    }
                }
                if (movement == 'downleft') {
                    if (getPieceRelative(piecethis, [1, -1]).hasClass('checker-o')) {
                        getPieceRelative(piecethis, [1, -1]).removeClass('checker-o');
                    }
                }
            }
        }
        $('.selected').removeClass('selected');
        // remove all movement classes
        $('.upright').removeClass('upright');
        $('.upleft').removeClass('upleft');
        $('.downright').removeClass('downright');            
        $('.downleft').removeClass('downleft');
        $('.up2right').removeClass('up2right');
        $('.up2left').removeClass('up2left');
        $('.down2right').removeClass('down2right');
        $('.down2left').removeClass('down2left');
    });
    // use .selected-o for opponent and .checker-o
});


$(document).ready(function() {
    $('.selected').click(function() {
        console.log('selected');
    });
});