  

var colorType="hsv";
var cylindricalBol=true
 var imgNames = [];

// function variable(){
    ///////////////////////////////////基础场景///////////////////////////////
  var vector;
  var projector;
  var distance = 1000;
  var distanceTarget = 3964;
  var distanceMax = 5800 //1500;
  var distanceMin = 3800;
  var distanceMinmin = 200;
  var camera, scene, scene, sceneAtmosphere, renderer, renderer, w, h;

  var cameraHeight = 200;
  var cameraHeightTarget = 200;
  var cameraPositionX = distance,
    cameraPositionY = 0,
    cameraPositionZ = 0;
  var dCameraX = 10,
    dCameraY = 0,
    dCameraZ = 0;
  var dCameraXTarget = 0,
    dCameraYTarget = 0,
    dCameraZTarget = 0;


  var viewX = 50;
  viewY =  50;
  viewZ = 50;
  var viewXTarget = 50;
  viewYTarget =  50;
  viewZTarget = 50;


  ////////////////////////////////////////////////参数/////////////////////////////////////////////////////
  var overRenderer;

  var siteCase = 0; //camera的状态

  var lightR = 2000;
  var pointLight;

   var w = container.offsetWidth || window.innerWidth;
   var  h = container.offsetHeight || window.innerHeight;
  ///////////////////////////////////基础模型+材质//////////////////////////////////
  //背景
  var colorBackground = 0x001111
  //地球模型
  var REarth = 200; //地球的半径
  var kREarth = 1.003
  // 地球材质
  var imgDir = '' // '/globe/';
  var globalTexture, globalImg;

  var boundaryList = new Array();
  ////////////////////////////////////交互//////////////////////////////////

 var visualSphere;//可视化像素点的小球

  var colorLight = "rgba(250,200,90,1)"
  var colorDark = "rgba(0,30,30,1)"
  var viewMode = 0 //1：鸟瞰，0，平面视图
  //缩放、旋转
  var curZoomSpeed = 0;
  var zoomSpeed = 10;
  var mouse = {
    x: 0,
    y: 0
  }, mouseOnDown = {
      x: 0,
      y: 0
    };
  var target = {
    x: -0.16730298508910912,
    y: 0.6100627714935363
  },
    rotation = {
      x: 2.9,
      y: 0.2
    }, //兰州的位置
    targetOnDown = {
      x: 0,
      y: 0
    };

  ////////////////////////////////////其他//////////////////////////////////       
  var padding = 40;
  var PI_HALF = Math.PI / 2;
  var test = []



// }