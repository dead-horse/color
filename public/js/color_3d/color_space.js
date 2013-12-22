 
////////////////////////////////色彩空間///////////////////////////////
    function colorSpace(r,g,b){
      var phiRgbH=1/3*Math.PI
      var max=Math.max(r,g,b)
      var min=Math.min(r,g,b)
      var colorType1="HSV";

      colorType=colorType.toUpperCase();
      if(colorType==="HSB"){
       colorType1="HSV";
      }
      if(colorType==="HSL"){
       colorType1="HSL";
      }
      if(colorType==="LAB"){
       colorType1="LAB";
      }
      if(colorType==="RGB"){
       colorType1="RGB";
      }
      if(colorType==="XYHSL"){
       colorType1="HSL";
       cylindricalBol=false;
      }
      if(colorType==="XYRGB"){
       colorType1="RGB";
       cylindricalBol=false;
      }
      if(colorType==="XYLAB"){
       colorType1="LAB";
       cylindricalBol=false;
      }
      if(colorType==="XYHSB"||colorType==="XYHSV"){
       colorType1="HSV";
       cylindricalBol=false;
      }



      if(colorType1==="RGB"){
        return new THREE.Vector3(r,b,g);
      }
      if(colorType1==="HSL"||colorType1==="HSV"){//将h映射到0-2PI的区间
         var h = null
        if(max===min){
          h=0;
        }
        if((max===r)&&(g>=b)){
          h=phiRgbH*(g-b)/(max-min)
        }
        if((max===r) &&(g<b)){
          h=phiRgbH*(g-b)/(max-min)+phiRgbH*6
        }
        if((max===g) ){
          h=phiRgbH*(b-r)/(max-min)+phiRgbH*2
        }
        if((max===b) ){
          h=phiRgbH*(r-g)/(max-min)+phiRgbH*4
        }


      if (colorType1==="HSL"){
        var l=(max+min)/2
        var s=0
        if((max===min)||(l===0)){
          s=0;
          h=0;
        }
        var dx=max-min
        if(l>0&&l<127.5){
          s=(dx)/(2*l)*255
        }
        if(l>=127.5){
          s=(dx)/(510-2*l)*255
        }
        if(!cylindricalBol){
          return new THREE.Vector3(h/6.283*255,l,s);
        }
        if(cylindricalBol){
          return new THREE.Vector3(s*Math.cos(h),l,s*Math.sin(h));
        }
      }

      if (colorType1==="HSV"){
        var max=Math.max(r,g,b)
        var min=Math.min(r,g,b)
        var v =  max
        var s = (max===0)?0:(1-min/max)*255

        if(!cylindricalBol){
          return new THREE.Vector3(h/6.283*255,v,s);
        }
        if(cylindricalBol){
          return new THREE.Vector3(s*Math.cos(h),v,s*Math.sin(h));
        }
    }
    }

    if (colorType1==="LAB"){
      return rgbToLab(r,g,b)
    }

  }

  function hsv2RGB(h,s,v){
    if ( S == 0 )                       //HSV from 0 to 1
{
   R = V * 255
   G = V * 255
   B = V * 255
}
else
{
   var_h = H * 6
   if ( var_h == 6 ) var_h = 0      //H must be < 1
   var_i = int( var_h )             //Or ... var_i = floor( var_h )
   var_1 = V * ( 1 - S )
   var_2 = V * ( 1 - S * ( var_h - var_i ) )
   var_3 = V * ( 1 - S * ( 1 - ( var_h - var_i ) ) )

   if      ( var_i == 0 ) { var_r = V     ; var_g = var_3 ; var_b = var_1 }
   else if ( var_i == 1 ) { var_r = var_2 ; var_g = V     ; var_b = var_1 }
   else if ( var_i == 2 ) { var_r = var_1 ; var_g = V     ; var_b = var_3 }
   else if ( var_i == 3 ) { var_r = var_1 ; var_g = var_2 ; var_b = V     }
   else if ( var_i == 4 ) { var_r = var_3 ; var_g = var_1 ; var_b = V     }
   else                   { var_r = V     ; var_g = var_1 ; var_b = var_2 }

   R = var_r * 255                  //RGB results from 0 to 255
   G = var_g * 255
   B = var_b * 255
}


  }

function rgbToLab(R,G,B){

//http://www.easyrgb.com/index.php?X=MATH&H=07#text7
var var_R = ( R / 255 )        //R from 0 to 255
var var_G = ( G / 255 )        //G from 0 to 255
var var_B = ( B / 255 )        //B from 0 to 255

if ( var_R > 0.04045 ) { var_R =   Math.pow(( ( var_R + 0.055 ) / 1.055 ) ,2.4);   }
else{   var_R = var_R / 12.92  }
if ( var_G > 0.04045 ){  var_G =  Math.pow(( ( var_G + 0.055 ) / 1.055 ),2.4);   }
else {var_G = var_G / 12.92}                  
if ( var_B > 0.04045 ){ var_B =  Math.pow((( var_B + 0.055 ) / 1.055 ) ,2.4);    }
else{   var_B = var_B / 12.92 }

// var_R = var_R * 100
// var_G = var_G * 100
// var_B = var_B * 100

//Observer. = 2°, Illuminant = D65
var X = var_R * 41.24 + var_G * 35.76 + var_B * 18.05
var Y = var_R * 21.26 + var_G * 71.52 + var_B * 7.22
var Z = var_R * 1.93 + var_G * 11.92 + var_B * 95.05

var var_X = X / 95.047         //ref_X =  95.047   Observer= 2°, Illuminant= D65
var var_Y = Y / 100         //ref_Y = 100.000
var var_Z = Z / 108.883        //ref_Z = 108.883

if ( var_X > 0.008856 ) {var_X = Math.pow(var_X ,( 1/3 ))}
else  {var_X = ( 7.787 * var_X ) + ( 16 / 116 )}
if ( var_Y > 0.008856 ) {var_Y = Math.pow(var_Y , ( 1/3 ))}
else { var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )}
if ( var_Z > 0.008856 ) {var_Z = Math.pow(var_Z , ( 1/3 ))}
else {var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )}

var L= ( 116 * var_Y ) - 16
var a= 500 * ( var_X - var_Y )
var b= 200 * ( var_Y - var_Z )

return(new THREE.Vector3( a*255/127,L*255/100,b*255/127));

}

