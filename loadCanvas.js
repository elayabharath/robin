var canvas = document.getElementById('canvas');
var viewerDiv = document.getElementById('viewer');
canvas.width = viewerDiv.offsetWidth;
canvas.height = viewerDiv.offsetHeight;
var ctx = canvas.getContext("2d");
