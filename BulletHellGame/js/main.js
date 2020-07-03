$(function(){
    screenWidth = $(document).width();
    screenHeight = $(document).height();

    canvas = $("#canvas")[0];
    c2d = canvas.getContext("2d");
    canvas.width = screenWidth;
    canvas.height = screenHeight;

});

player = null;
enemy = [];

score = 0;

intervals = [];
timeouts = [];

backgroundMusic = new Audio('sound/background.mp3');