////////////////////////////////read txt///////////////////////////////

var w = window.innerWidth;
var h = window.innerHeight;


var loaderWidth = 150;
var loaderHeight = 160;
var picWidth = loaderWidth;
var picHeight = loaderWidth;

var chineseBol = true;


function initHelp() {
  var textDiv = document.getElementById("helpHelp");
  textDiv.innerHTML = "↑";

  var textDiv = document.getElementById("helpText");
  textDiv.style.width = w/3 +"px";
  textDiv.style.left = w/2-w/6 +"px";
  if(chineseBol){
  textDiv.innerHTML = '<p style="text-align: center;">---GIVE U SOME COLOR SEE SEE--- </p>上传图片，查看像素在LAB、RGB、HSL、HSV(HSB)色彩空间中的分布，每个点一个像素。支持单图色彩分析+双图色彩对比+单图色彩分布。 ------------野兽&&死马@阿里巴巴数据平台';
  }
  else{
    textDiv.innerHTML = '<p style="text-align: center;">---3D COLOR VISUALIZER---</p> Visualize pixel colors in LAB 、RGB 、HSB(HSV)、HSL color space .You can upload single pictrue or two.----------- yeshou&&dead_horse@TAOBAO,Hangzhou,China.';
  }
}

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
  if(chineseBol){
      data = ["鸟瞰", "xy顶视", "yz侧视", "xz侧视"];
  }
  else{
    data =["perspective", "top-view", "yz-view", "xz-view"];
  }

  addSelector(div, data, rotate)

  var div = $("#selector2")[0];
  if(chineseBol){
    data = ["极坐标", "直角坐标"];
  }
  else{
    data = ["polar","retangular"];
  }
  
  addSelector(div, data, resetAxis)


  loader1.addEventListener("mousemove", ctxHover, false);
  loader2.addEventListener("mousemove", ctxHover, false);
}

var imgIndex = 1;

function fileSelected(e, url) {

  groupIndex = parseInt(e.target.id[5])
  var name = url;

  clearVisual(groupIndex);
  loadImagePt(name, groupIndex);
}

function init() {
    if(navigator.language ==="zh-CN" ||navigator.browserLanguage==="zh-CN"){
    chineseBol = true;
  }
  else{
    chineseBol = false;
  }

  initThree();
  initCamera();
  initAxis();
  initAxi();

  initHelp();

  initVisual();


  ///默认图片
  var img = new Image();
  var imgName1 = '/public/image/demo/1.jpg';
  loadImagePt(imgName1, groupIndex);

  initRender();
  initInteraction();
  // $("#input1")[0].addEventListener('change', fileSelected, false);
  // $("#input2")[0].addEventListener('change', fileSelected, false);

  $('#input1').fileupload({
    dataType: 'json',
    done: function(e, data) {
      if (data.result.ok) {
        var url = data.result.url;
        fileSelected(e, url);
      }
    },
    submit: function () {
      $('#loader1 .spinner').show();
      ctx1.clearRect(0, 0, loaderWidth, loaderHeight);
    }
  }).on('fileuploadfail', function(e, data) {
    console.log(e, data);
    $('#loader1 .spinner').hide();
  });

  $('#input2').fileupload({
    dataType: 'json',
    done: function(e, data) {
      if (data.result.ok) {
        var url = data.result.url;
        fileSelected(e, url);
      }
    },
    submit: function () {
      $('#loader2 .spinner').show();
      ctx2.clearRect(0, 0, loaderWidth, loaderHeight);
    }
  }).on('fileuploadfail', function(e, data) {
    console.log(e, data);
    $('#loader2 .spinner').hide();
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
function initAxis() { //坐标轴的标注
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
