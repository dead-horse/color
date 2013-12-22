  /////色彩坐标系
 var iN = 5000;
 var particleR = 100;

 
 var axiNames=[]
 var axisType="rec"
 //var axisType="rad"
 var vx,vy;
 var vecs;
 var textList=[];
  function initAxi() {
     var d = 0.25//坐标轴的粗细
    colorType=colorType.toUpperCase();
    if( colorType==="HSB"){
      colorType="HSV"
    }
    if(colorType==="HSV"){
    axisType="rad";
    axiNames=["H(色相)","B(明度(=v))","S(饱和度)"];
    }

    if(colorType==="HSL"){
      axisType="rad";
      axiNames=["H(色相)","L(明度)","S(饱和度)"];
    }
    if(colorType==="RGB"){
      axisType="rec"
      axiNames=["R(红)","B(蓝)","G(绿)"];
    }
    if(colorType==="LAB"){
    axisType="rec";
    axiNames=["A()","L(明度)","B()"];
    }
    if((colorType==="XYLAB")||(colorType==="XYHSB")||(colorType==="XYHSL")||(colorType==="XYHSV")||(colorType==="XYRGB")){
    axisType="rec";
    var string = "Value(红-"+colorType[2]+", 蓝-"+colorType[3]+",  绿-"+colorType[4]+")"
    axiNames=["x",string,"y"];
    }

    for (var k in axiNames){
      var name=axiNames[k];
      id="#"+"axis"+k;
      $(id)[0].innerHTML=name
    }

    vecs=[];
    vecs.push(new THREE.Vector3(260,0.001,0.001))
    vecs.push(new THREE.Vector3(0.001,260,0.001))
    vecs.push(new THREE.Vector3(0.001,0.001,260))

    
    var dk=5/255;
    var drL=dk*6.283*255;//环形坐标系分段
    for (var k = 0; k < 1.0001; k += dk) {
      ////////////////x轴或round轴/////////////////////
      var color = new THREE.Color();
      if(colorType==="HSV"){
        color.setHSL(k, 0.8, 0.5);
      }
      if(colorType==="HSL"){
        color.setHSL(k, 0.8, 0.5);
      }
       if(colorType==="RGB"){
        color.setRGB(k, 0, 0);
      }
      if(colorType==="LAB"){
        color.setRGB(255, 255, 255);
      }
      if(colorType==="XYHSV"){
        color.setRGB(255, 255, 255);
        cylindricalBol=false;
      }
      if(colorType==="XYRGB"){
        color.setRGB(255, 255, 255);
        cylindricalBol=false;
      }
      if(colorType==="XYHSL"){
        color.setRGB(255, 255, 255);
        cylindricalBol=false;
      }
      if(colorType==="XYLAB"){
        color.setRGB(255, 255, 255);
        cylindricalBol=false;
      }

       mat = new THREE.MeshBasicMaterial({ color: color });
 

      if((colorType==="HSV"||colorType==="HSL")&&cylindricalBol){
        //环形
        geo = new THREE.CubeGeometry(d*10, d*10, drL, 1, 1, 1, null, false, {
        px: true,
        nx: true,
        py: true,
        ny: true,
        pz: false,
        nz: true
      });
        mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(255*Math.cos(k*6.283),0, 255*Math.sin(k* 6.283));
        mesh.lookAt(new THREE.Vector3(255*Math.cos(k*6.283)-255*Math.sin(k* 6.283),0,255*Math.sin(k* 6.283)+255*Math.cos(k*6.283)));
      }

       else{ 
        geo = new THREE.CubeGeometry(5,d, d,  1, 1, 1, null, false, {
        px: true,
        nx: true,
        py: true,
        ny: true,
        pz: false,
        nz: true
      });
        mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(k * 255 + 2.5,0, 0);
      }

      mesh.id="axis"
      scene.add(mesh)
    ////////////////y轴/////////////////////

      if(colorType==="HSV"){
        color.setHSL(0.3, k, 0.5);
      }
      if(colorType==="HSL"){
        color.setHSL(0.3, k, 0.5);
      }
       if(colorType==="RGB"){
        color.setRGB( 0, k, 0);
      }
      if(colorType==="LAB"){
        color.setRGB(255, 255, 255);
      }
     
     
      var mat = new THREE.MeshBasicMaterial({color: color });
      var geo = new THREE.CubeGeometry( d, d,5, 1, 1, 1, null, false, {
        px: true,
        nx: true,
        py: true,
        ny: true,
        pz: false,
        nz: true
      });

      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set( 0, 0,k * 255 + 2.5);
      mesh.id="axis"
      scene.add(mesh)

      ////////////////z轴/////////////////////

       if(colorType==="HSV"){
        color.setHSL(0, 0.0, k);
      }
      if(colorType==="HSL"){
        color.setHSL(0, 0.0, k);
      }
       if(colorType==="RGB"){
        color.setRGB( 0, 0, k);
      }
      if(colorType==="LAB"){
        color.setRGB(255, 255, 255);
      }

      mat = new THREE.MeshBasicMaterial({color: color});
      geo = new THREE.CubeGeometry(d, 5,d, 1, 1, 1, null, false, {
        px: true,
        nx: true,
        py: true,
        ny: true,
        pz: false,
        nz: true
      });
      mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, k * 255 + 2.5, 0);
      mesh.id="axis"
      scene.add(mesh)

    }
  }


var ddd=true;
  function loopAxi(){
    var vector;
    for(var k in vecs){
      var vec=vecs[k].clone();
   // var vec1=new THREE.Vector3(vec.x,vec.y,vec.z)
    vector = projector.projectVector(vec, camera);
    vy = (vector.x / 2 + 0.5) * renderer.domElement.width //+ window.offsetLeft;
    vx = (-vector.y / 2 + 0.5) * renderer.domElement.height //+ window.offsetTop;
    textList[k].style.top = Math.floor(vx) + 'px';
    textList[k].style.left = Math.floor(vy) + 'px';
    }
  }

     function clearAxi() {
       var sceneN = scene.children.length
      for (var k =sceneN-1;k>0;k--) {
          bol = false

           if (scene.children[k] instanceof THREE.Mesh) {
            if(scene.children[k].geometry instanceof THREE.CubeGeometry){
                bol = true
            }
                 
          }
          if (bol) {
              scene.remove(scene.children[k])
          }
       }
  }


 function resetAxis(axisType){
  if(axisType==="极坐标"){
    if(!cylindricalBol){
      cylindricalBol=true;
     reset();
    }
  }

    if(axisType==="直角坐标"){
    if(cylindricalBol){
      cylindricalBol=false;
     reset();
    }
  }
            
        }

