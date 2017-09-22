//Define all the standard vectors
	
/* classes */ 
//function shadePixel(i,j,min_t,lightPos,inputEllipsoids[e],pe,eyePos);
// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class

// Vector class
class Vector { 
    constructor(x=0,y=0,z=0) {
        this.set(x,y,z);
    } // end constructor
    
    // sets the components of a vector
    set(x,y,z) {
        try {
            if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z; 
        } // end try
        
        catch(e) {
            console.log(e);
        }
    } // end vector set
    
    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try
        
        catch(e) {
            console.log(e);
        }
    }
    
    toConsole(prefix) {
        console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
    } // end to console
    
    // static dot method
    static dot(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static add method
    static add(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
                //v.toConsole("Vector.subtract: ");
                return(v);
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end subtract static method
	
	// static divide method, v1/v2
    static divide(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x/v2.x,v1.y/v2.y,v1.z/v2.z);
                //v.toConsole("Vector.divide: ");
                return(v);
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end divide static method

    // static scale method
    static scale(c,v) {
        try {
            if (!(typeof(c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return(new Vector(c*v.x,c*v.y,c*v.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
                return(Vector.scale(lenDenom,v));
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
} // end Vector class

//global variables

var globals = { lightPos: new Vector(-1,3,-0.5),  // light over left upper rect
                    lightCol: new Color(255,255,255)}; // light is white
					
	// All vectors are wrt Origin at (0,0,0)				
	var eyePos = new Vector(0.5,0.5,-0.5);
	var viewUp = new Vector(0,1,0);
	var lookAt = new Vector(0,0,1);

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    
// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0,0,0,0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w*h)*PIXEL_DENSITY; 
    
    // Loop over 1% of the pixels in the image
    for (var x=0; x<numPixels; x++) {
        c.change(Math.random()*255,Math.random()*255,
            Math.random()*255,255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
                c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL = 
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";
        
    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_ELLIPSOIDS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input ellipses file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input ellipsoids

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
    var inputEllipsoids = getInputEllipsoids();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.05;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputEllipsoids != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var ellipsoidXRadius = 0; // init ellipsoid x radius
        var ellipsoidYRadius = 0; // init ellipsoid y radius
        var numEllipsoidPixels = 0; // init num pixels in ellipsoid
        var c = new Color(0,0,0,0); // init the ellipsoid color
        var n = inputEllipsoids.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var e=0; e<n; e++) {
            cx = w*inputEllipsoids[e].x; // ellipsoid center x
            cy = h*inputEllipsoids[e].y; // ellipsoid center y
            ellipsoidXRadius = Math.round(w*inputEllipsoids[e].a); // x radius
            ellipsoidYRadius = Math.round(h*inputEllipsoids[e].b); // y radius
            numEllipsoidPixels = inputEllipsoids[e].a*inputEllipsoids[e].b*Math.PI; // projected ellipsoid area
            numEllipsoidPixels *= PIXEL_DENSITY * w * h; // percentage of ellipsoid area to render to pixels
            numEllipsoidPixels = Math.round(numEllipsoidPixels);
            console.log("ellipsoid x radius: "+ellipsoidXRadius);
            console.log("ellipsoid y radius: "+ellipsoidYRadius);
            console.log("num ellipsoid pixels: "+numEllipsoidPixels);
            c.change(
                inputEllipsoids[e].diffuse[0]*255,
                inputEllipsoids[e].diffuse[1]*255,
                inputEllipsoids[e].diffuse[2]*255,
                255); // ellipsoid diffuse color
            for (var p=0; p<numEllipsoidPixels; p++) {
                do {
                    x = Math.random()*2 - 1; // in unit square 
                    y = Math.random()*2 - 1; // in unit square
                } while (Math.sqrt(x*x + y*y) > 1) // a circle is also an ellipse
                drawPixel(imagedata,
                    cx+Math.round(x*ellipsoidXRadius),
                    cy+Math.round(y*ellipsoidYRadius),c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
                //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            } // end for pixels in ellipsoid
        } // end for ellipsoids
        context.putImageData(imagedata, 0, 0);
    } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
    var inputEllipsoids = getInputEllipsoids();
    
    
    if (inputEllipsoids != String.null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputEllipsoids.length; 
        //console.log("number of ellipsoids: " + n);

        // Loop over the ellipsoids, draw each in 2d
        for (var e=0; e<n; e++) {
            context.fillStyle = 
                "rgb(" + Math.floor(inputEllipsoids[e].diffuse[0]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[1]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[2]*255) +")"; // diffuse color
            context.save(); // remember previous (non-) scale
            context.translate(w*inputEllipsoids[e].x,h*inputEllipsoids[e].y); // translate ellipsoid to ctr
            context.scale(1, inputEllipsoids[e].b/inputEllipsoids[e].a); // scale by ellipsoid ratio 
            context.beginPath();
            context.arc(0,0,Math.round(w*inputEllipsoids[e].a),0,2*Math.PI);
            context.restore(); // undo scale before fill so stroke width unscaled
            context.fill();
            //console.log(context.fillStyle);
            //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
            //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
            //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
        } // end for ellipsoids
    } // end if ellipsoids found
} // end draw input ellipsoids

function shadePixel(i,j,min_t,lightPos,ellipE,pe,eyePos,imagedata) 
{        
        var difColor = new Color(0,0,0,255);
		var finalColor  = new Color(0,0,0,255);
		var ambColor  = new Color(0,0,0,255);
		var specColor = new Color(0,0,0,255);
        var lVect = new Vector();
		var intersection = new Vector();
		
		var a = ellipE.a;
		var b = ellipE.b;
		var c = ellipE.c;
		
		var cx = ellipE.x;
		var cy = ellipE.y;
		var cz = ellipE.z;
		
		var globals = { lightPos: new Vector(-1,3,-0.5),  // light over left upper rect
                    lightCol: new Color(255,255,255,255)};    // light is white
		
		//Find intersection between ray coming from pixel to ellipsoid
		
		var intersection = Vector.add(eyePos,Vector.scale(min_t,pe)); //  find intersectionpoint
		
		//Find normal to ellipsoid at each points
		
		var xn = 2*Math.pow(b,2)*Math.pow(c,2)*(intersection.x - cx);
		var yn = 2*Math.pow(a,2)*Math.pow(c,2)*(intersection.y - cy);
		var zn = 2*Math.pow(a,2)*Math.pow(b,2)*(intersection.z - cz);
		
		//Calculate color components
		
        // get light vector
       
        lVect = Vector.subtract(lightPos,intersection);
        lVect = Vector.normalize(lVect);
		
		var nVect = Vector.normalize(new Vector(xn,yn,zn));
	
		//console.log(lVect);
        var NdotL = Vector.dot(lVect,nVect); // rect in xy plane
		if(NdotL<0)
			NdotL = 0;
		//console.log(globals.lightCol);
        //NdotL =1;
        // calc diffuse color
        difColor.r = ellipE.diffuse[0] * globals.lightCol.r * NdotL;
        difColor.g = ellipE.diffuse[1] * globals.lightCol.g * NdotL;
        difColor.b = ellipE.diffuse[2] * globals.lightCol.b * NdotL;
		
		//calc ambient color
		ambColor.r = ellipE.ambient[0] * globals.lightCol.r;
        ambColor.g = ellipE.ambient[1] * globals.lightCol.g;
        ambColor.b = ellipE.ambient[2] * globals.lightCol.b;
       
		//Calculate specular component
		
		var vVect = new Vector();
		
		vVect = Vector.subtract(eyePos,intersection);
		lVect = Vector.subtract(lightPos,intersection);
		var hVect = Vector.normalize(Vector.add(lVect,vVect));
		//console.log(hVect);
		
		var specHV = Math.pow((Vector.dot(hVect,nVect)),ellipE.n);
		
		if(specHV < 0)
			specHV = 0;
		
		// calc specular color
        specColor.r = ellipE.specular[0] * globals.lightCol.r * specHV;
        specColor.g = ellipE.specular[1] * globals.lightCol.g * specHV;
        specColor.b = ellipE.specular[2]* globals.lightCol.b * specHV;
		//console.log(specColor);
		
		finalColor.r = Math.round(ambColor.r + difColor.r + specColor.r);
		finalColor.g = Math.round(ambColor.g + difColor.g + specColor.g);
		finalColor.b = Math.round(ambColor.b + difColor.b + specColor.b);
		finalColor.a = 255;
		//if()
        
		//console.log(finalColor);
		
        drawPixel(imagedata,i,j,finalColor);
} // end shade pixel



function mydrawInputEllipsoids(context,UR,LL,UR,UL,eyePos){
	
	var inputEllipsoids = getInputEllipsoids();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.05;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
	var A = 0, B = 0, C = 0, D = 0;
	var pxray = 0;

    
    if (inputEllipsoids != String.null) { 
        var px = 0; var py = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var ellipsoidXRadius = 0; // init ellipsoid x radius
        var ellipsoidYRadius = 0; // init ellipsoid y radius
		var ellipsoidZRadius = 0; // init ellipsoid z radius
		
        var numEllipsoidPixels = 0; // init num pixels in ellipsoid
        var c = new Color(0,0,0,255); // init the ellipsoid color
        
		var n = inputEllipsoids.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);
		var t = null;
		var pz,rt1,rt2;

        // Loop over the ellipsoids, draw rand pixels in each
        
			
			//numEllipsoidPixels = inputEllipsoids[e].a*inputEllipsoids[e].b*Math.PI; // projected ellipsoid area
            //numEllipsoidPixels *= PIXEL_DENSITY * w * h; // percentage of ellipsoid area to render to pixels
            //numEllipsoidPixels = Math.round(numEllipsoidPixels);
            
			//console.log("ellipsoid x radius: "+ellipsoidXRadius);
            //console.log("ellipsoid y radius: "+ellipsoidYRadius);
            //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
           
            
			/*for(var p=0; p<numEllipsoidPixels; p++) {
                do {
                    //x = Math.random()*2 - 1; // in unit square 
					//y = Math.random()*2 - 1; // in unit square */
					
            for(var i = 0; i< w; i++){
				for(var j = 0; j< h; j++){

						px = UL.x + (i/w)*(UR.x-UL.x);
						//console.log(px);
						
						py = UL.y + (j/h)*(LL.y-UL.y);
						//console.log(py);
						
						var min_e = null;
						var min_t = null;
						
						for (var e=0; e<n; e++) {
						
			
							cx = inputEllipsoids[e].x; // ellipsoid center x
							cy = inputEllipsoids[e].y; // ellipsoid center y
							cz = inputEllipsoids[e].z; // ellipsoid center z
							
							ellipsoidXRadius = inputEllipsoids[e].a; // x radius
							ellipsoidYRadius = inputEllipsoids[e].b; // y radius
							ellipsoidZRadius = inputEllipsoids[e].c; // z radius
							
							pxray = new Vector(px,py,0); //
							
							// YSTH
							
							ellipsePoint = new Vector(cx,cy,cz);
							ellipse = new Vector(ellipsoidXRadius,ellipsoidYRadius,ellipsoidZRadius);
							
							ec = Vector.subtract(eyePos,ellipsePoint);
							//console.log(ec);
							
							pe = Vector.subtract(pxray, eyePos);
							//console.log(pe);
							
							A = Vector.dot(Vector.divide(pe,ellipse),Vector.divide(pe,ellipse));
							//console.log(A);
							
							B = 2*Vector.dot(Vector.divide(pe,ellipse),Vector.divide(ec,ellipse));
							//console.log(B);
							
							C = Vector.dot(Vector.divide(ec,ellipse),Vector.divide(ec,ellipse)) - 1;
						//console.log(C);
							
							D = Math.pow(B,2)- (4*A*C);
						//console.log(D);
						//(1/2a) (-b ± (b2 - 4ac)½)
						if(D>=0)
						{
							rt1 = ((-B) + Math.pow(D,0.5))/(2*A);
							//console.log(rt1);
							rt2 = ((-B) - Math.pow(D,0.5))/(2*A);
							//console.log(rt2);
							t = rt2;
							if(rt1 < rt2)
								t = rt1;
							if (min_t == null){
								min_t = t;
								min_e = e;
							}
							else {
								if (t < min_t){
									min_t = t;
									min_e = e
								}
							}
						}
				}
				//console.log(pxray);
			    //Every pixel color
				
				if(min_e == null){
					c.change(0,0,0,255);
					 drawPixel(imagedata,i,j,c);
				}
				else{
					shadePixel(i,j,min_t,globals.lightPos,inputEllipsoids[min_e],pe,eyePos,imagedata);	
				}
				
				}// for j close
			}// for i close
					
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
                //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            } // end for check for ellipsoid
        
        context.putImageData(imagedata, 0, 0);
    } // end if ellipsoids found // end draw rand pixels in input ellipsoids
	

/* main -- here is where execution begins after window load */



function main() {

    // Get the canvas and context
	var inputEllipsoids = getInputEllipsoids();
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
	var w = context.canvas.width;
    var h = context.canvas.height;
    var n = inputEllipsoids.length; 
 
    //Define all the standard vectors
	
	var globals = { lightPos: new Vector(-1,3,-0.5),  // light over left upper rect
                    lightCol: new Color(255,255,255,255)}; // light is white
					
	// All vectors are wrt Origin at (0,0,0)				
	var eyePos = new Vector(0.5,0.5,-0.5);
	var viewUp = new Vector(0,1,0);
	var lookAt = new Vector(0,0,1);
	
	//Find the corners of the square window centered at (0.5,0.5,0)
	
	var UL = new Vector(0,1,0);
	var LL = new Vector(0,0,0);
	var UR = new Vector(1,1,0);
	var LR = new Vector(1,0,0);
	
	//Call the function which renders the ellipsoids
	
	mydrawInputEllipsoids(context,UR,LL,UR,UL,eyePos);
	
	//First find the ray in (X,Y) pixel coordinates
	
	// Ray - ellipsoid intersection
	
	// D/A•D/A t2 + 2 D/A•(E-C)/A t + (E-C)/A•(E-C)/A - 1 = 0
	

    // Create the image
	
    //drawRandPixels(context);
      // shows how to draw pixels
    
    //drawRandPixelsInInputEllipsoids(context);
      // shows how to draw pixels and read input file
      
    //drawInputEllipsoidsUsingArcs(context);
      // shows how to read input file, but not how to draw pixels
}
