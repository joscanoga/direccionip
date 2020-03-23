
function verificarmascara(mas){
   var mask= pasaripbinario(mas)
    for(var i=mascaraD(mask);i<32;i++){
        if(mask.charAt(i)!="0"){
            return true;
            break;
        };
    };
    return false;
}
function verificarUnaIp(form){
    var estado=true;
    var ip1 =form.ip1;

    var mascara =form.mascara;
//alert(ip1.value.length);
if(!verificarip(ip1.value)){
    alert(" ip1 no tiene formato valido")
    ip1.focus();
    ip1.select();
    estado=false;
}else if(!verificarip(mascara.value)||verificarmascara(mascara.value)){
    alert(" mascara no tiene formato valido")
    mascara.focus();
    mascara.select();
    estado=false;

}
return estado;
}
function verificarDosIp(form){
var estado=true;
var ip1 =form.ip1;
var ip2=form.ip2;
var mascara =form.mascara;
//alert(ip1.value.length);
if(!verificarip(ip1.value)){
    alert(" ip1 no tiene formato valido")
    ip1.focus();
    ip1.select();
    estado=false;
}else if(!verificarip(ip2.value)){
    alert(" ip2 no tiene formato valido")
    ip2.focus();
    ip2.select();
    estado=false;
}else if(!verificarip(mascara.value)||verificarmascara(mascara.value)){
    alert(" mascara no tiene formato valido")
    mascara.focus();
    mascara.select();
    estado=false;
return estado;
}
return estado;
}
function verificarip(ip){
    estado=true;
    var ipdiv =ip.split(".")

    if(/*ip.length !=15||*/ipdiv.length!=4||ipdiv[0]>255||ipdiv[1]>255||ipdiv[2]>255||ipdiv[3]>255||ipdiv[0]<0||ipdiv[1]<0||ipdiv[2]<0||ipdiv[3]<0||isNaN(ipdiv[0])||isNaN(ipdiv[1])||isNaN(ipdiv[2])||isNaN(ipdiv[3])||ipdiv[3]=="255"){
        estado=false;
    }

    return estado;
}
function procesarDosIp(){
 
    var ip1=obtenerValorParametro("ip1");
    var ip2=obtenerValorParametro("ip2");
    var mascara=obtenerValorParametro("mascara");
    var mascarabin=pasaripbinario(mascara);
    var ip1bin=pasaripbinario(ip1);
    var ip2bin=pasaripbinario(ip2);
   var numeromascara= mascaraD(mascarabin);
   var ipred=ipRed(ip1bin,numeromascara);
   var ipB=ipBroadcast(ip1bin,numeromascara)
    //document.write("<p>direccion de red: "+mismared(ip1bin,ip2bin,numeromascara)+"</p>");
   // document.write("<h1>"+nuemromascara+"p</h1>");
   if(!mismared(ip1bin,ip2bin,numeromascara)){
       document.write("<h1>No pertenecen a la misma red</h1>")
   }else{document.write("<font size='7'>Pertenencen a la misma red</font><br><table id='tresult' style='font-size:55px'><tr><td>Dirreción de red:</td><td>"+ipred+"</td></tr><tr><td>Ip brodcast:</td><td>"+ipB+"/"+numeromascara+"</td></tr><tr><td>Número máx usuarios:</td><td>"+(Math.pow(2,(32-numeromascara))-2)+"</td></tr></table>");

   }
}
function procesarUnIp(){
    var ip1=obtenerValorParametro("ip1");
    
    var mascara=obtenerValorParametro("mascara");
    var mascarabin=pasaripbinario(mascara);
    var ip1bin=pasaripbinario(ip1);
   var numeromascara= mascaraD(mascarabin);
   var ipred=ipRed(ip1bin,numeromascara);
   var ipB=ipBroadcast(ip1bin,numeromascara)
    //document.write("<p>direccion de red: "+mismared(ip1bin,ip2bin,numeromascara)+"</p>");
   // document.write("<h1>"+nuemromascara+"p</h1>");
   document.write("<table id='tresult' style='font-size:55px'><tr><td>Dirreción de red:</td><td>"+ipred+"</td></tr><tr><td>Ip brodcast:</td><td>"+ipB+"/"+numeromascara+"</td></tr><tr><td>Número máx usuarios:</td><td>"+(Math.pow(2,(32-numeromascara))-2)+"</td></tr></table>");

   
}


function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
     var sURLVariables = sPaginaURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
          return sParametro[1];
        }
      }
     return null;
    }
    function pasaripbinario(ip){
        var ipdiv =ip.split(".");
        var ipbin="";
        for(var i=0;i<4;i++){
            var dec=parseInt(ipdiv[i],10);
           // alert(dec+1);
           var ipbint=dec.toString(2);
           var len=ipbint.length
           //alert(len);
            if(len==0){
                ipbin+="00000000";
            }else if(len==1){
               ipbin+="0000000"+ipbint;
            }else if(len==2){
            ipbin+="000000"+ipbint;
            }else if(len==3){
                ipbin+="00000"+ipbint;
            }else if(len==4){
                    ipbin+="0000"+ipbint;
            }else if(len==5){
                        ipbin+="000"+ipbint;
            }else if(len==6){
                            ipbin+="00"+ipbint;
            }else if(len==7){
                ipbin+="0"+ipbint;
            }else if(len==8){
            ipbin+=ipbint;}
    }
        return ipbin;
        return ipbin;
    }
    //# mascara dec
function mascaraD(ipp){
    var mascara=0;
    ip=ipp.toString();
    for(var i=0;i<ip.length;i++){
      mascara+=parseInt(ip.charAt(i));
        
    }
    return mascara;
}
function mismared(ip1,ip2,n){
    for(i=0;i<n;i++){
        if(ip1.charAt(i)!=ip2.charAt(i)){
            return false;
            break;
        }
    }
    return true;
}
function ipRed(ip,n){
  var ipredbin="";
  for(var i=0;i<32;i++){
  if(i<n){
    ipredbin +=ip.charAt(i);
  }else{
      ipredbin+="0"
  }
    }
    ipRed="";
    for(var k=0;k<4;k++){
        var oct=""
        //alert("");
        for(var j=k*8;j<(1+k)*8;j++){
            //alert(j);
            oct+=ipredbin.charAt(j);
            //alert(oct);
        }
          if (k==3){
            ipRed+=""+parseInt(oct,2).toString();
          }else{
            ipRed+=""+parseInt(oct,2).toString()+".";
          }
    }
    return ipRed;
}
function ipBroadcast(ip,n){
    var ipredbin="";
    for(var i=0;i<32;i++){
    if(i<n){
      ipredbin +=ip.charAt(i);
    }else{
        ipredbin+="1"
    }
      }
      ipRed="";
      for(var k=0;k<4;k++){
          var oct=""
          //alert("");
          for(var j=k*8;j<(1+k)*8;j++){
              //alert(j);
              oct+=ipredbin.charAt(j);
              //alert(oct);
          }
          if (k==3){
            ipRed+=""+parseInt(oct,2).toString();
          }else{
            ipRed+=""+parseInt(oct,2).toString()+".";
          }
        }
        return ipRed;
}






    
