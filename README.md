# sketchy
 Web app for drawing on a canvas 


## FEATURES TO ADD  
-Eraser tool  
-Save artwork as an image  
-Draw shapes (rectangle, circle, triangle, etc)  
-Share artwork on social media  

## DRAW CIRCLE STEPS  
-Create Circle Class  
-Add x, y and prevPosition properties  
-Add setPosition method
-Add updatePosition method
-In setPosition, use moveTo user's cursor's current position
-In updatePosition, draw shape on new x and/or new y, and "delete" (draw transparent on top of) shape in old x and/or old y
-Add eventlistener for when user clicks on canvas and call setPosition
-Add eventListener for when user moves cursor (while still clicking) and call updatePosition  

"Another elegant option is to set the 'globalCompositeOperation' to 'xor' and paint you line again....so it will be removed"


## BUGS  
