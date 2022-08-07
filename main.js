$('.tile-d[data-row=7], .tile-d[data-row=6], .tile-d[data-row=5]').addClass('checker');
$('.tile[data-row=2], .tile[data-row=1], .tile[data-row=0]').addClass('checker-o');
$(document).ready(function() {
    $('.checker').click(function() {
        $(this).toggleClass('selected');
        // make possible moves highlighted
        var tile = [this.getAttribute('data-col'), this.getAttribute('data-row')];
        tile = [(parseInt(tile[0])-1).toString(), (parseInt(tile[1])-1).toString()];
        var upright = '[data-col="' + tile[0] + '"][data-row="' + tile[1] + '"]';
        if (!$(upright).hasClass('checker')) {
            $(upright).toggleClass('selected');
            $(upright).toggleClass('selectable');
        }
        tile = [(parseInt(tile[0])+2).toString(), (parseInt(tile[1])).toString()];
        var upleft = '[data-col="' + tile[0] + '"][data-row="' + tile[1] + '"]';
        if (!$(upleft).hasClass('checker')) {
            $(upleft).toggleClass('selected');
            $(upleft).toggleClass('selectable');
        }

        // selecting other peices will alter highlights
        var original = this;
        $('.selectable').click(function() {
            $(original).toggleClass('selected');
            if (!$(upright).hasClass('checker')) {
                $(upright).toggleClass('selected');
                $(upright).toggleClass('selectable');
            }
            if (!$(upleft).hasClass('checker')) {
                $(upleft).toggleClass('selected');
                $(upleft).toggleClass('selectable');
            }
            $(this).addClass('checker');
            $(original).removeClass('checker');
        });
    });



    $('.checker-o').click(function() {
        $(this).toggleClass('selected');
        // make possible moves highlighted
        var tile = [this.getAttribute('data-col'), this.getAttribute('data-row')];
        tile = [(parseInt(tile[0])-1).toString(), (parseInt(tile[1])+1).toString()];
        var downright = '[data-col="' + tile[0] + '"][data-row="' + tile[1] + '"]';
        if (!$(downright).hasClass('checker-o')) {
            $(downright).toggleClass('selected');
            $(downright).toggleClass('selectable');
        }
        tile = [(parseInt(tile[0])+2).toString(), (parseInt(tile[1])).toString()];
        var downleft = '[data-col="' + tile[0] + '"][data-row="' + tile[1] + '"]';
        if (!$(downleft).hasClass('checker-o')) {
            $(downleft).toggleClass('selected');
            $(downleft).toggleClass('selectable');
        }

        // selecting other peices will alter highlights
        var original = this;
        $('.selectable').click(function() {
            $(original).toggleClass('selected');
            if (!$(downright).hasClass('checker-o')) {
                $(downright).toggleClass('selected');
                $(downright).toggleClass('selectable');
            }
            if (!$(downleft).hasClass('checker-o')) {
                $(downleft).toggleClass('selected');
                $(downleft).toggleClass('selectable');
            }
            $(this).addClass('checker-o');
            $(original).removeClass('checker-o');
        });
    });
});
