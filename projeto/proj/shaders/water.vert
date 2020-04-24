attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
uniform float timeFactor;
uniform bool invert;
uniform float speed;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {

	vTextureCoord = aTextureCoord;


	vec3 offset=vec3(0.0,0.0,0.0);


	float filterr =  texture2D(uSampler2, vTextureCoord+vec2(-sin(timeFactor*0.12),1.0)).r;
	offset=aVertexNormal*speed*vec3(0.0, 0.0, filterr);
	if(speed>0.0){

		if(!invert)
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
		else
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition-offset, 1.0);
	}else
	{
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	}

}

