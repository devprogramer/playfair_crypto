 text = "hello how are you";
 
 key = "kwerty";
 
            stopSymbol = "x".charCodeAt(0);
            symbolsMatrix= [];
            symbolsMatrixIndex = {},
            matrixWidth = 2,
            matrixHeight = 13,
            aviableSymbols=["a","b","c","d", "e",
                            "f","g","h","i", "j",
                            "k","l","m","n", "o",
                            "p",  "r","s","t", "u",
                            "v","w","x","y", "z", " "
                            ];
            
            
        
        function prepareKey(key){
            var keyArr = [];
            for(var i=0; i< key.length; i++ ){
                var charCode = key.charCodeAt(i);
                if(keyArr.indexOf(charCode) < 0){
                    keyArr.push(charCode);
                }
            }
            
            return keyArr;
        }
        
        function fullFillMatrix(){
            
           
             var _key = prepareKey(key);

              
              var xCoords = [],
                  j=0, i=0;

            if(_key.length){
              _key.forEach(function(e){

                xCoords.push(e);
                // console.log(String.fromCharCode(e), j, i);
                symbolsMatrixIndex[e] = {x:j, y:i };
                j++;
                if(xCoords.length == matrixWidth){
                  symbolsMatrix.push(xCoords);
                  xCoords = [];
                  j=0;
                  i++;
                }
              })



              

            }

            aviableSymbols.forEach(function(s){
                e = s.charCodeAt(0);
                if(symbolsMatrixIndex[e]) return;
                xCoords.push(e);
                // console.log(s, j, i);
                symbolsMatrixIndex[e] = {x:j, y:i };
                j++;
                if(xCoords.length == matrixWidth){
                  symbolsMatrix.push(xCoords);
                  xCoords = [];
                  j=0;
                  i++;
                }
            })
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
        
        
        
        function encode(bigrams){
            var encodedBigrams = [];

            bigrams.forEach(function(b){
                var tmp = [],
                    _b1=[],
                    _b2=[];
                
                var b1 = symbolsMatrixIndex[b[0]];
                var b2 = symbolsMatrixIndex[b[1]];
                if(b1.y == b2.y){

                    if(symbolsMatrix[b1.y][b1.x+1]){
                       _b1 =  symbolsMatrix[b1.y][b1.x+1];
                    }else{
                        _b1 =  symbolsMatrix[b1.y][0];
                    }

                    if(symbolsMatrix[b2.y][b2.x+1]){
                       _b2 =  symbolsMatrix[b2.y][b2.x+1];
                    }else{
                        _b2 =  symbolsMatrix[b2.y][0];
                    }
                }else if(b1.x == b2.x){
                    if(symbolsMatrix[b1.y+1]){
                       _b1 =  symbolsMatrix[b1.y+1][b1.x];
                    }else{
                        _b1 =  symbolsMatrix[0][b1.x];
                    }
                    if(symbolsMatrix[b2.y+1]){
                       _b2 =  symbolsMatrix[b2.y+1][b2.x];
                    }else{
                        _b2 =  symbolsMatrix[0][b2.x];
                    }
                }else{
                    _b1 = symbolsMatrix[b1.y][b2.x];
                    _b2 = symbolsMatrix[b2.y][b1.x];
                     
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



                    
                    
                    if(symbolsMatrix[b1.y-1]){
                       _b1 =  symbolsMatrix[b1.y-1][b1.x];
                       // console.log(++  );
                    }else{
                        _b1 =  symbolsMatrix[symbolsMatrix.length-1][b1.x];
                    }
                    if(symbolsMatrix[b2.y-1]){
                       _b2 =  symbolsMatrix[b2.y-1][b2.x];
                    }else{
                        _b2 =  symbolsMatrix[symbolsMatrix.length-1][b2.x];
                    }


                    
                   


                }else if(b1.y == b2.y){
                    if(symbolsMatrix[b1.y][b1.x-1]){
                       _b1 =  symbolsMatrix[b1.y][b1.x-1];
                    }else{
                        _b1 =  symbolsMatrix[b1.y][symbolsMatrix[b1.y].length-1];
                    }
                    if(symbolsMatrix[b2.y][b2.x-1]){
                       _b2 =  symbolsMatrix[b2.y][b2.x-1];
                    }else{
                        _b2 =  symbolsMatrix[b2.y][symbolsMatrix[b1.y].length-1];
                    }
                   
                }else{
                    

                     _b1 = symbolsMatrix[b1.y][b2.x];
                    _b2 = symbolsMatrix[b2.y][b1.x];
                     
                }
                encodedBigrams.push([_b1, _b2]);
            });
            
            return encodedBigrams
        }
        fullFillMatrix();


        /* k w e r t 
           y a b c d
           f g h i j
           l m n o p
           s u v x z
 
        */
        
        b= createBigrams(text);
        // he lx lo ho wa re yo ux


        b = encode(b);
        
        b = bigramsToString(b);
        b = createBigrams(b)
        b = decode(b);
        b = decBigramsToString(b);
//        
        
        
        // console.log(b);
        
//        console.log(symbolsMatrixIndex[100]);
//        console.log(symbolsMatrix[2][28]);
        
        function playfair(){
            
        }
        