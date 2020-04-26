#ifdef GL_ES
precision highp float;
#endif


varying vec4 coords;
varying vec4 normal;
uniform float percOfSupplies;

void main(){
float red=0.0;
float green = 0.0;
	if(coords.x<0.0){
		red=1.0;
		green=(coords.x+0.5)/0.5 -0.05;


	}else if(coords.x==0.0){
		red=1.0;
		green=1.0;
	}else{
		red=abs(coords.x-0.5)/0.5-0.05;
		green=1.0;
	}
	vec3 col= vec3(0.5,0.5,0.5);
	float xLimit= (1.0 * percOfSupplies)/100.0 - 0.5;
	if(coords.x < xLimit)
		col = vec3(red,green,0);


	gl_FragColor.rgb =col;
	gl_FragColor.a = 1.0;

}