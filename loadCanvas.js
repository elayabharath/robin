var canvasElem = document.getElementById('canvas');
var viewerDiv = document.getElementById('viewer');
canvasElem.width = viewerDiv.offsetWidth;
canvasElem.height = viewerDiv.offsetHeight;
var canvas = canvasElem.getContext("2d");
