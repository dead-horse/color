
  function onMouseDown(event) { //鼠标落下的瞬间
    event.preventDefault();

    mouseOnDown.x = -event.clientX;
    mouseOnDown.y = event.clientY;

    targetOnDown.x = target.x;
    targetOnDown.y = target.y;

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mouseout', onMouseOut, false);

  }


  function onMouseMove(event) { //鼠标落下并且移动 并非仅仅移动

    mouse.x = -event.clientX;
    mouse.y = event.clientY;

    var zoomDamp = distance / 1000;

    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
    // console.log(target.x + " " + target.y + " " + distanceTarget);
  }

  function onMouseUp(event) {
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    document.removeEventListener('mouseout', onMouseOut, false);
  }

  function onMouseOut(event) {
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    document.removeEventListener('mouseout', onMouseOut, false);
  }

  function onMouseWheel(event) {
    event.preventDefault();
    if (overRenderer) {
      zoom(event.wheelDeltaY * 1.6);
    }
    return false;
  }




  function onWindowResize(event) {
    //  console.log('resize');
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.VIEW_ANGLE = 260;

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function zoom(delta) {
    distanceTarget -= delta;
    distanceTarget = distanceTarget > distanceMax ? distanceMax : distanceTarget;
    distanceTarget = distanceTarget < distanceMinmin ? distanceMinmin : distanceTarget;
  }

  function initInteraction() {
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousewheel', onMouseWheel, false);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mouseover', function() {
      overRenderer = true;
    }, false);
    document.addEventListener('mouseout', function() {
      overRenderer = false;
    }, false);
  }

  function loopInteraction(){
     zoom(curZoomSpeed);

        rotation.x += (target.x - rotation.x) * 0.1;
        rotation.y += (target.y - rotation.y) * 0.1;
        distance += (distanceTarget - distance) * 0.1;


        dCameraX += (dCameraXTarget - dCameraX) * 0.1;
        dCameraY += (dCameraYTarget - dCameraY) * 0.1;
        dCameraZ += (dCameraZTarget - dCameraZ) * 0.1;

        cameraPositionX = distance * Math.sin(rotation.x) * Math.cos(rotation.y) + dCameraX;
        cameraPositionY = distance * Math.sin(rotation.y) + dCameraY;
        cameraPositionZ = distance * Math.cos(rotation.x) * Math.cos(rotation.y) + dCameraZ;


        viewX = REarth * Math.sin(rotation.x) * Math.cos(rotation.y);
        viewY = REarth * Math.sin(rotation.y);
        viewZ = REarth * Math.cos(rotation.x) * Math.cos(rotation.y);


        camera.position.x = cameraPositionX;
        camera.position.y = cameraPositionY;
        camera.position.z = cameraPositionZ;

        camera.lookAt(new THREE.Vector3(viewX * kREarth, viewY * kREarth, viewZ * kREarth));
  }



  function rotate(state){
    if(state==="xy顶视"){
      target.x =-Math.PI/2;
      target.y =Math.PI/2;
      distanceTarget =4750;
    }
    if(state==="鸟瞰"){
    target.x =0.75  ;
    target.y =0.75 ;
    distanceTarget =3580;
    }
   if(state==="yz侧视"){
    target.x =-Math.PI/2  ;
    target.y =0 ;
    distanceTarget =3580;
    }
    if(state==="xz侧视"){
    target.y =-Math.PI  ;
    target.x =0 ;
    distanceTarget =3580;
    }
  }