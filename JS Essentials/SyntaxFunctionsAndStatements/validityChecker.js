function validator(inputPoints){
           let points = [];
           for(let i = 0; i < inputPoints.length ; i+=2){
               points.push({x : inputPoints[i],y : inputPoints[i+1]});
           }
          
           for(let point of points ){
              checkValidity(point,{x:0,y:0});
           }
           checkValidity(points[0],points[1]);
           function checkValidity(pointA , pointB){
               let distanceWithOrigin = distance(pointA.x,pointA.y,pointB.x,pointB.y);
               let isValid = 'valid';
               if(distanceWithOrigin-Math.floor(distanceWithOrigin) > 0.0){
                isValid = 'invalid';
               }
               console.log(`{${pointA.x}, ${pointA.y}} to {${pointB.x}, ${pointB.y}} is ${isValid}`);
           }
           function distance(x1,y1,x2,y2){
               return Math.sqrt(Math.pow(Math.max(x1,x2) - Math.min(x1,x2),2) + Math.pow(Math.max(y1,y2)- Math.min(y1,y2),2));
           }
        }