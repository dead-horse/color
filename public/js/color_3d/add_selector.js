var center;
var selectorActiveBolList=[]
var gridLength;
var fontSize;
var d;
function addSelector(container,data,fuc){
  //为鼠标事件和动画加入一个中间层
  var max=0
  var N=data.length;

  d = container.offsetWidth/(N);
  var length = null
  var className = null;
  var innerHTML = null;
  fontSize = d/8;


//每个格子
for(var i=0;i<N;i++){
  innerHTML=data[i]
  var div = document.createElement("div");
  div.id=innerHTML
  div.className="selectorGrid";
  div.style.width=(d-4)+"px";
  div.style.fontSize=fontSize+"px"
  div.innerHTML=innerHTML;
  container.appendChild(div)
}  


function clearAllActive(){
for(var i=0;i<N;i++){
  // console.log($("#"+data[i])[0])
container.children[i].className="selectorGrid";
}
}

function selected(){
  clearAllActive();
  this.className='selectorGridActive';
  fuc(this.id)
}

for(var i=0;i<N;i++){
  div=$("#"+data[i])[0];
  div.addEventListener("click",selected,false);
    // $(div).click(function(){
        
    //     }
    //     );
}


 
}




// selectorActiveBolList[2]=true;
function onMouseOver1(e){
  var id=parseInt(parseInt(this.id)-100000)
  selectorActiveBolList[id]=true;
}
function onMouseOut1(e){
  var id=parseInt(parseInt(this.id)-100000)
  selectorActiveBolList[id]=false;
}

