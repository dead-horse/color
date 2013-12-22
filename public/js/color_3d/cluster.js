function cluster(datas){
	var dataN=datas.length;

	var clusterN=5;
	var clusters=[];
	var clusterPercent=[]

	var dx=1/dataN

	var centers=[];
	for (var k =0;k<clusterN;k++){
	  var array=[]
	  clusters.push(array);
	  clusterPercent.push(0)
	  var vec=datas[Math.abs(parseInt(Math.random()*dataN))].clone();
	  centers.push(vec);
}
	  

           
	for (var k =0;k<dataN;k+=10){
		var distanceMin=100000;
		var data=datas[k]
		var index=0;
		
	for (var d in centers){
		var result;
		var center=centers[d];
		var dis=Math.sqrt( (center.x-data.x)*(center.x-data.x) + (center.y-data.y)*(center.y-data.y) + (center.z-data.z)*(center.z-data.z) )
		if(dis<distanceMin){
		index=d;
		distanceMin=dis;
	          }
	}
	clusters[index].push(data);
	clusterPercent[index]+=dx;
	var ki=dx/(clusterPercent[index]+dx)
	centers[index]=(centers[index].multiplyScalar(1-ki)).add(data.multiplyScalar(ki));
	}

	var result = []
          for (var d in centers){
          	if(!result[d]){result[d]=[];}
           result[d].push(clusterPercent[d])
           result[d].push([centers[d].x,centers[d].y,centers[d].z])
           // result[d].push(centers[d].y)
           // result[d].push(centers[d].z)
          }
       // for
       // var mesh = new THREE.Mesh(PaticleGeometry, PaticleMaterial);
       //  meshPaticle.id = groupIndex;
       //  scene.add(meshPaticle);

         
          return result
}

