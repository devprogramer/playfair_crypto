for(var i=0;i<1297;i++){
          var code = i.toString(16);
          if(code.length<4){
            while(code.length<4){
              code = "0"+code;
            }
          }
          console.log(String.fromCharCode(i));
        }

    
