 var text = "ППриветик я тебя узнал",
            stopSymbol = 0;
        function fullFillMatrix(){
          var symbolsMatrix = [];
          var code = 0;
          for (var i=0; i< 36; i++){
              for(var j=0; j< 36; j++){
                if(!symbolsMatrix[i]) symbolsMatrix[i] = [];
                symbolsMatrix[i][j] = code;
                code ++;
                // console.log(symbolsMatrix[i][j]);
              }
          }
          return symbolsMatrix;
        }

        function findPosition(symb, symbolsMatrix){
            var x = null,
                y = null;


          for (var i=0; i< 36; i++){
              for(var j=0; j< 36; j++){
                if( symbolsMatrix[i][j] == symb ){
                  y = i;
                  x=j;
                }
                
                if(x !== null) break;
              }
              if(x !== null) break;
          }

          return {x: x, y: y};
        }


        function createBigrams(text){
          var bigrams = [];
          var tmp = [];
          for(var i = 0; i<text.length; i++){
              tmp.push(text.charCodeAt(i));

              if(text.charCodeAt(i+1) && text.charCodeAt(i+1) == text.charCodeAt(i)){
                tmp.push(stopSymbol);
              }
              if(tmp.length === 2){
                bigrams.push(tmp);
                tmp = [];
              }
          }
          if(tmp.length === 1){
            tmp.push(stopSymbol);
            bigrams.push(tmp);

          } 
          return bigrams;
        }
