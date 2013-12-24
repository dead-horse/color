////////////////////////////////read txt///////////////////////////////

 var w = window.innerWidth;
 var h = window.innerHeight;


 var loaderWidth = parseInt(w*0.1);
 var loaderHeight = parseInt(loaderWidth*1.1);
 var picWidth = loaderWidth;
 var picHeight = loaderWidth;


init();

  function initVisual() {
    addVisualSphere(); //颜色指示球

    var loader1 = document.getElementById("loader1");
    var loader2 = document.getElementById("loader2");

    loader1.style.width = loaderWidth + "px";
    loader1.style.height = loaderHeight + "px";
    ctx1 = $("#loader1Canvas")[0].getContext("2d");
    
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

    loader1.addEventListener("mousemove",ctxHover,false);
    loader2.addEventListener("mousemove",ctxHover,false);
  }

var imgIndex = 1;

function fileSelected(e,url) {

  groupIndex = parseInt(e.target.id[5])
  var name = url;

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
  // $("#input1")[0].addEventListener('change', fileSelected, false);
  // $("#input2")[0].addEventListener('change', fileSelected, false);

  $('#input1').fileupload({
    dataType: 'json',
    done: function (e, data) {
      if (data.result.ok) {
        var url = data.result.url;
        fileSelected(e, url);
      }
    }
}).on('fileuploadfail', function (e, data) {
  console.log(e, data);
});

  $('#input2').fileupload({
    dataType: 'json',
    done: function (e, data) {
      if (data.result.ok) {
        var url = data.result.url;
        fileSelected(e, url);
      }
    }
}).on('fileuploadfail', function (e, data) {
  console.log(e, data);
});

  loop();
}


function loop() {
  loopAxi();
  loopInteraction();
  loopThree()
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
// var ctxs = []
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

  function ctxHover(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var id = parseInt(this.id[6])

    var data = ctxs[id].getImageData(x, y, 1, 1).data;
    var colorType1 = colorType.toUpperCase()
    if (colorType1 === "HSB" || colorType1 === "RGB" || colorType1 === "LAB" || colorType1 === "HSL" || colorType1 === "HSV") {
      visualSphereMat.color.setRGB(data[0] / 255, data[1] / 255, data[2] / 255);
      visualSphere.position = colorSpace(data[0], data[1], data[2]);
    }
  }