////////////////////////////////载入图片///////////////////////////////
var PaticleMaterial, PaticleMaterial1, PaticleMaterial2, PaticleMaterial3;
var ctxs = [];
var ctx1, ctx2;
var groupIndex = 1;

function loadImagePt(imgName, groupIndex) {
  var img = new Image();
  img.src = imgName;
  img.onload = loadVisual

  function loadVisual() {
    
    imgNames[groupIndex] = imgName;
    bol = false;
    if (groupIndex === 1) {
      var ctx = ctx1
    }
    if (groupIndex === 2) {
      var ctx = ctx2
    }
    ctx.clearRect(0, 0, loaderWidth, loaderHeight);
    ctx.drawImage(img, 0, 0, picWidth, picHeight);
    
    var url = ctx.canvas.toDataURL();

    addPts(ctx, groupIndex);
  }
}


function addPalette(palette, ctx) {
  var widthPalette = 0;
  var hPalette = 20;
  for (var k in palette) {
    var phiColor = parseFloat(palette[k][0]);
    var d = loaderWidth * phiColor;
    var rgb = palette[k][1]
    ctx.fillStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    ctx.fillRect(widthPalette, loaderHeight - 14, d, 14);
    widthPalette += d;

    var rMax = 20;
    var sphereGeometry = new THREE.SphereGeometry(rMax * phiColor, 20, 20);
    var colorSphere = new THREE.Color();
    colorSphere.setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255)
    var mat = new THREE.MeshBasicMaterial({
      color: colorSphere,
      opacity: 0.1
    });
    var meshSphere = new THREE.Mesh(sphereGeometry, mat);
    meshSphere.position = colorSpace(rgb[0], rgb[1], rgb[2]);
    meshSphere.id = "paletteSphere";

    scene.add(meshSphere)
  }
}

var color0 = 0x99ffff,
  color1 = 0xff0000,
  color2 = 0x559955,
  color3 = 0x557799;

function addPts(ctx, groupIndex) {
  if (groupIndex === 1) {
    PaticleMaterial = new THREE.ParticleBasicMaterial({
      color: color0,
      size: 16,
      depthTest: false,
      transparent: true,
      opacity: 0.2
    });
    PaticleMaterial1 = new THREE.ParticleBasicMaterial({
      color: color1,
      size: 30,
      depthTest: false,
      transparent: true,
      opacity: 0.2
    });

    PaticleMaterial2 = new THREE.ParticleBasicMaterial({
      color: color2,
      size: 20,
      depthTest: false,
      transparent: true,
      opacity: 0.2
    });

    PaticleMaterial3 = new THREE.ParticleBasicMaterial({
      color: color3,
      size: 20,
      depthTest: false,
      transparent: true,
      opacity: 0.2
    });

  }
  if (groupIndex === 2) {
    PaticleMaterial = new THREE.ParticleBasicMaterial({
      color: 0xff9977,
      size: 16,
      depthTest: false,
      transparent: true,
      opacity: 0.1
    });
  }

  if ((colorType === "HSV") || (colorType === "HSL") || (colorType === "LAB") || (colorType === "RGB")) {
    var imgd = ctx.getImageData(0, 0, loaderWidth, loaderHeight);
    var data = imgd.data;
    PaticleGeometry = new THREE.Geometry();

    for (var i = 0; i < picWidth * picHeight * 4; i += 4) {

      if ((data[i] + 1) && (data[i + 1] + 1) && (data[i + 2] + 1)) {
        PaticleGeometry.vertices.push(colorSpace(data[i], data[i + 1], data[i + 2]));
      }
    }
    var meshPaticle = new THREE.ParticleSystem(PaticleGeometry, PaticleMaterial);

    meshPaticle.id = groupIndex;
    scene.add(meshPaticle);
  }

  if (colorType[0] == "X") {
    console.log(ctx)
    var imgd = ctx.getImageData(0, 0, loaderWidth, loaderHeight);
    var data = imgd.data;
    PaticleGeometry1 = new THREE.Geometry();
    PaticleGeometry2 = new THREE.Geometry();
    PaticleGeometry3 = new THREE.Geometry();

    for (var y = 0; y < picHeight; y += 1) {
      var lineGeometry2 = new THREE.Geometry()
      var lineGeometry3 = new THREE.Geometry()
      for (var x = 0; x < picWidth; x += 1) {
        console.log(picHeight)
        index = x + y * picHeight;
        var colorVector = colorSpace(data[4 * index], data[4 * index + 1], data[4 * index + 2]);
        var x1 = x * 255 / picHeight;
        var y1 = y * 255 / picWidth;
        PaticleGeometry1.vertices.push(new THREE.Vector3(x1, colorVector.x, y1));
        // PaticleGeometry2.vertices.push(new THREE.Vector3(x1, colorVector.y, y1));
        // PaticleGeometry3.vertices.push(new THREE.Vector3(x1, colorVector.z, y1));

        lineGeometry2.vertices.push(new THREE.Vector3(x1, colorVector.y, y1));
        lineGeometry3.vertices.push(new THREE.Vector3(x1, colorVector.z, y1));
      }
      var lineMesh2 = new THREE.Line(lineGeometry2, new THREE.LineBasicMaterial({
        color: color2
      }))
      var lineMesh3 = new THREE.Line(lineGeometry3, new THREE.LineBasicMaterial({
        color: color3
      }))
      lineMesh2.id = groupIndex;
      lineMesh3.id = groupIndex;
      scene.add(lineMesh2);
      scene.add(lineMesh3);
    }
    var meshPaticle1 = new THREE.ParticleSystem(PaticleGeometry1, PaticleMaterial1);
    var meshPaticle2 = new THREE.ParticleSystem(PaticleGeometry2, PaticleMaterial2);
    var meshPaticle3 = new THREE.ParticleSystem(PaticleGeometry3, PaticleMaterial3);

    meshPaticle1.id = groupIndex;
    meshPaticle2.id = groupIndex;
    meshPaticle3.id = groupIndex;
    scene.add(meshPaticle1);
    // scene.add(meshPaticle2);
    // scene.add(meshPaticle3);

  }

}

var visualSphere;
var visualSphereMat
var visualSphereColor

  function addVisualSphere() {
    var geo = new THREE.SphereGeometry(5, 10, 10);
    geo.colorsNeedUpdate = true;
    visualSphereColor = new THREE.Color();
    visualSphereColor.setHSL(0.5, 1, 0.6);
    console.log(visualSphereColor)
    visualSphereMat = new THREE.MeshBasicMaterial({
      color: visualSphereColor,
      opacity: 0.9
    });
    visualSphereMat.needsUpdate = true;
    visualSphere = new THREE.Mesh(geo, visualSphereMat);
    visualSphere.position.set(0, 0, 0);
    scene.add(visualSphere)
    visualSphere.id = "visualSphere"
  }



var bol
  function clearVisual(groupIndex) {
    var sceneN = scene.children.length
    for (var k = sceneN - 1; k > 0; k--) {
      bol = false
      if (scene.children[k] instanceof THREE.ParticleSystem) {
        if (scene.children[k].id === groupIndex) bol = true;
      } //去掉粒子
      if (scene.children[k] instanceof THREE.Mesh) {
        if (scene.children[k].geometry instanceof THREE.SphereGeometry) {
          if (scene.children[k].id == "paletteSphere") {
            bol = true
          }
        } //去掉聚类球
      }
      if (scene.children[k] instanceof THREE.Line) {
        if (scene.children[k].id === groupIndex) bol = true;
      }
      if (bol) {
        scene.remove(scene.children[k])
      }
    }
  }
