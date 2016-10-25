 text = "ППриветик я тебя узнал";
            stopSymbol = 0;
            symbolsMatrix= [];
            symbolsMatrixIndex = {}            ;
            
            
        function fullFillMatrix(){
          
          var code = 0;
          for (var i=0; i< 36; i++){
              for(var j=0; j< 36; j++){
                if(!symbolsMatrix[i]) symbolsMatrix[i] = [];
                symbolsMatrix[i][j] = code;
                symbolsMatrixIndex[code] = {x:j, y:i};
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
        
        fullFillMatrix();
        
        function encode(bigrams){
            var encodedBigrams = [];
            bigrams.forEach(function(b){
                var tmp = [],
                    _b1=[],
                    _b2=[];
                
                var b1 = symbolsMatrixIndex[b[0]];
                var b2 = symbolsMatrixIndex[b[1]];
                if(b1.x == b2.x){
                    if(symbolsMatrix[b1.x+1]){
                       _b1 =  symbolsMatrix[b1.x+1][b1.y];
                    }else{
                        _b1 =  symbolsMatrix[0][b1.y];
                    }
                    if(symbolsMatrix[b2.x+1]){
                       _b2 =  symbolsMatrix[b2.x+1][b2.y];
                    }else{
                        _b2 =  symbolsMatrix[0][b2.y];
                    }
                }else if(b1.y == b2.y){
                    if(symbolsMatrix[b1.x][b1.y+1]){
                       _b1 =  symbolsMatrix[b1.x][b1.y+1];
                    }else{
                        _b1 =  symbolsMatrix[b1.x][0];
                    }
                    if(symbolsMatrix[b2.x][b2.y+1]){
                       _b2 =  symbolsMatrix[b2.x][b2.y+1];
                    }else{
                        _b2 =  symbolsMatrix[b2.x][0];
                    }
                   
                }else{
                    _b1 = symbolsMatrix[b2.x][b1.y];
                    _b2 = symbolsMatrix[b1.x][b2.y];
                     
                }
                encodedBigrams.push([_b1, _b2]);
            });
            
            return encodedBigrams
        }
        
        function bigramsToString(bigrams){
            var t = "";
            bigrams.forEach(function(b){
                t += String.fromCharCode(b[0]) + String.fromCharCode(b[1]);
            });
            
            return t;
        }
        function decBigramsToString(bigrams){
            var t = "";
            bigrams.forEach(function(b){
                    t += String.fromCharCode(b[0]);
                if(b[1] !== stopSymbol){
                    t += String.fromCharCode(b[1]);
                }
                    
            });
            
            return t;
        }
        
        function decode(bigrams){
            var encodedBigrams = [];
            bigrams.forEach(function(b){
                var _b1=[],
                    _b2=[];
                
                var b1 = symbolsMatrixIndex[b[0]];
                var b2 = symbolsMatrixIndex[b[1]];
                if(b1.x == b2.x){
                    if(symbolsMatrix[b1.x-1]){
                       _b1 =  symbolsMatrix[b1.x-1][b1.y];
                    }else{
                        _b1 =  symbolsMatrix[symbolsMatrix.length-1][b1.y];
                    }
                    if(symbolsMatrix[b2.x-1]){
                       _b2 =  symbolsMatrix[b2.x-1][b2.y];
                    }else{
                        _b2 =  symbolsMatrix[symbolsMatrix.length-1][b2.y];
                    }
                }else if(b1.y == b2.y){
                    if(symbolsMatrix[b1.x][b1.y-1]){
                       _b1 =  symbolsMatrix[b1.x][b1.y-1];
                    }else{
                        _b1 =  symbolsMatrix[b1.x][symbolsMatrix[b1.x].length-1];
                    }
                    if(symbolsMatrix[b2.x][b2.y-1]){
                       _b2 =  symbolsMatrix[b2.x][b2.y-1];
                    }else{
                        _b2 =  symbolsMatrix[b2.x][symbolsMatrix[b1.x].length-1];
                    }
                   
                }else{
                    _b1 = symbolsMatrix[b2.x][b1.y];
                    _b2 = symbolsMatrix[b1.x][b2.y];
                     
                }
                encodedBigrams.push([_b1, _b2]);
            });
            
            return encodedBigrams
        }
        
        b = encode(createBigrams(text));
        b = bigramsToString(b);
        b = decode(createBigrams(b));
        b = bigramsToString(b);
        
        
        
        console.log(b);
        
//        console.log(symbolsMatrixIndex[100]);
//        console.log(symbolsMatrix[2][28]);
        
        function playfair(){
            
        }
        