 var distance = 1000;

 function initThree() {
   scene = new THREE.Scene();
   sceneAtmosphere = new THREE.Scene();
   vector = new THREE.Vector3();
 }

 function initCamera() {
   camera = new THREE.PerspectiveCamera(10, w / h, 1, 50 * distance);
   camera.updateProjectionMatrix();
   camera.position.z = distance;
   camera.lookAt(new THREE.Vector3(viewX, viewY, viewZ));
   scene.add(camera);
 }


 function initRender() {
   renderer = new THREE.WebGLRenderer({
     antialias: true
   });
   renderer.autoClear = false;
   renderer.setClearColor(colorBackground, 0.0);
   renderer.setSize(w, h);
   renderer.domElement.style.position = 'absolute';
   container.appendChild(renderer.domElement);
   projector = new THREE.Projector();
 }

 function loopThree() {
   renderer.clear();
   renderer.render(scene, camera);
   requestAnimationFrame(loop);
 }