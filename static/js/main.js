/*
* Main.js
*
* TODO
* Translate à la place de css ?
*/

// Constants
var MAP_WIDTH = 4000;
var MAP_SIZE = 4000;
var UI_MARGIN = 20;
var RADAR_SIZE = 200;

// Selectors
var $win = $(window);
var $map = $("#map");
var $infoPlayer = $("#info-player");
var $radar = $("#radar");
var $witness = $("#witness");
var $screen = $("ui");

// UI
var UI = function(div, width, height) {
    this.div = div;
    this.width = width;
    this.height = height;

    this.div.css("width", this.width);
    this.div.css("height", this.height);
}
var ui = new UI($screen, $win.width(), $win.height());

// MAP
var Map = function(div) {
    this.div = div;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
}
Map.prototype.setUI = function(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.div.css({
        "transform": "translate("+this.x+"px, "+this.y+"px)",
        "width": this.width,
        "height": this.height
    });
}
Map.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
    this.div.css({
        "transform": "translate("+this.x+"px, "+this.y+"px)"
    });
}
var map = new Map($map);
// Initialize the center of the map in the center of the ui
var x = -(MAP_SIZE/2) + (ui.width/2);
var y = -(MAP_SIZE/2) + (ui.height/2);
map.setUI(x, y, MAP_SIZE, MAP_SIZE);

// WITNESS
var Witness = function(div){
    this.div = div;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
}
Witness.prototype.setUI = function(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.div.css({
        "transform": "translate("+this.x+"px, "+this.y+"px)",
        "width": this.width,
        "height": this.height
    });
}
Witness.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
    this.div.css({
        "transform": "translate("+this.x+"px, "+this.y+"px)"
    });
}
var witness = new Witness($witness);

// **********
function setUI() {
    // UI Info Player
    var infoPlayerX = ui.width - ($infoPlayer.width() + UI_MARGIN);
    var infoPlayerY = UI_MARGIN;
    $infoPlayer.css({
        "transform": "translate("+ infoPlayerX +"px, "+ infoPlayerY +"px)"
    });

    // UI Info Radar
    var radarX = ui.width - ($radar.width() + UI_MARGIN);
    var radarY = ui.height - ($radar.height() + UI_MARGIN);
    $radar.css({
        "transform": "translate("+ radarX +"px, "+ radarY +"px)"
    });

    // UI Witness
    var witWidth = ui.width/MAP_WIDTH*RADAR_SIZE;
    var witHeight = ui.height/MAP_WIDTH*RADAR_SIZE;
    var witX = RADAR_SIZE*Math.abs(map.x)/MAP_WIDTH;
    var witY = RADAR_SIZE*Math.abs(map.y)/MAP_WIDTH;
    witness.setUI(witX, witY, witWidth, witHeight);
}

$win.on("resize", function() {
    ui.width = $win.width();
    ui.height = $win.height();
    setUI();
});

setUI();

function stopDragMap() {
    isDragging = false;
    console.log("Dragging "+ isDragging +" stopDragMap");
}

var isDragging = false;
var xDown = 0;
var yDown = 0;
map.div.mousedown(function(e) {
    isDragging = true;
    xDown = e.pageX + Math.abs(map.x);
    yDown = e.pageY + Math.abs(map.y);
}).mousemove(function(e){
    if (isDragging) {
        var newX = e.pageX-xDown;
        var newY = e.pageY-yDown;
        var borderRight = Math.abs(map.x) + ui.width;
        var borderBottom = Math.abs(map.y) + ui.height

        console.log(borderRight +" | "+ borderBottom);

        if ((newX <= 0) && (borderRight <= MAP_SIZE) && (newY <= 0) && (borderBottom <= MAP_SIZE)) {
            map.setPosition(newX, newY);
            var witX = RADAR_SIZE*Math.abs(map.x)/MAP_WIDTH;
            var witY = RADAR_SIZE*Math.abs(map.y)/MAP_WIDTH;
            witness.setUI(witX, witY);
        }
        if (borderRight > MAP_SIZE) {
            map.setPosition(-(MAP_SIZE - ui.width), newY);
            //map.setPosition(100, 100);
        }
        if (borderBottom > MAP_SIZE) {
            map.setPosition(newX, -(MAP_SIZE - ui.height));
            //map.setPosition(100, 100);
        }
    }
}).mouseup(function(){
    stopDragMap();
});

$(".ui-element").mouseup(function(){
    console.log("ui-element");
    stopDragMap();
});
