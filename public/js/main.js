////////////////////////////////read txt///////////////////////////////

 var w = window.innerWidth;
 var h = window.innerHeight;

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/public/image/data.txt",
    dataType: "text",
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    success: function(data) {
      start(data);
    }
  });
});

colorList = [];
var colorIndex = -1

  function start(allText) {
    var record_num = 8; // or however many elements there are in each row
    var allTextLines = allText.split(/\r\n|\n/);

    var results = {}
    for (var k = 0; k < allTextLines.length; k++) {
      var entries = allTextLines[k].split(',');
      if (entries.length < 2) {
        colorIndex = parseInt(entries);
        colorList[colorIndex] = []
      }
      if (entries.length > 2) {
        colorList[colorIndex].push([parseFloat(entries[0]), [parseInt(entries[1]), parseInt(entries[2]), parseInt(entries[3])]])
      }
    }
    init();
  }




  function initVisual() {
    addVisualSphere(); //颜色指示球
    var loaders = $("#loaders")[0];
    var loader1 = $("#loader1")[0];
    $("#loader1").bind("mousemove", ctxHover, false);
    $("#loader2").bind("mousemove", ctxHover, false);

    loader1.style.width = loaderWidth + "px";
    loader1.style.height = loaderHeight + "px";
    ctx1 = $("#loader1Canvas")[0].getContext("2d");

    var loader2 = $("#loader2")[0];
    loader2.style.width = loaderWidth + "px";
    loader2.style.height = loaderHeight + "px";
    ctx2 = $("#loader2Canvas")[0].getContext("2d");

    ctxs = [null, ctx1, ctx2];

    var div = $("#selector")[0];
    data = ["LAB", "RGB", "HSB", "HSL", "XYLAB", "XYRGB", "XYHSB", "XYHSL"]
    addSelector(div, data, resetColorType)

    var div = $("#selector1")[0];
    data = ["鸟瞰", "xy顶视", "yz侧视", "xz侧视"]
    addSelector(div, data, rotate)

    var div = $("#selector2")[0];
    data = ["极坐标", "直角坐标"]
    addSelector(div, data, resetAxis)

  }

var imgIndex = 1;

function fileSelected(e) {

  groupIndex = parseInt(e.target.id[5])
  var name = "/public/image/" + e.target.files[0].name;

  clearVisual(groupIndex);
  loadImagePt(name, groupIndex);
}

function init() {
  initThree();
  initCamera();
  initAxis();
  initAxi();

  initVisual();

  ///默认图片
  var img = new Image();
  var name = "/public/image/gradient/"
  var imgName1 = name + "image" + ".jpg";
  loadImagePt(imgName1, groupIndex)

  initRender();
  initInteraction();
  document.addEventListener('keydown', onDocumentKeyDown, false);
  $("#input1")[0].addEventListener('change', fileSelected, false);
  $("#input2")[0].addEventListener('change', fileSelected, false);
  loop();
}


function loop() {
  loopAxi();
  loopInteraction();
  loopThree()
}


function onDocumentKeyDown(event) {
  switch (event.keyCode) {

    case 32:
      imgIndex += 1;
      clearVisual(groupIndex);
      loadImagePt(imgIndex);
      event.preventDefault();
      break;

    case 13:
      resetColorType("RGB")
      event.preventDefault();
      break;
  }
}


function resetColorType(colorType1) {
  colorType = colorType1;
  reset();
}

function reset() {
  clearAxi();
  initAxi();
  if (imgNames[1]) {
    clearVisual(1);
    clearVisual(2);
    loadImagePt(imgNames[1], 1);
  }
  if (imgNames[2]) {
    loadImagePt(imgNames[2], 2);
  }
}


////////////////////////////////////////3d可视化相关////////////////////////////////////////
var ctxs = []
  function initAxis() {//坐标轴的标注
    for (var k = 0; k < 3; k++) { 
      var div = document.createElement("div");
      div.id = "axis" + k;
      div.innerHTML = axiNames[k];
      div.style.position = "absolute"
      div.style.fontSize = 8;
      div.style.color = "rgba(255,255,255,0.5)";
      textList.push(div)
      var container2 = $("#container2")[0]
      container2.appendChild(div);
    }
  }


////////////////////////////////////////色彩相关////////////////////////////////////////