attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
uniform float timeFactor;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset=vec3(0.0,0.0,0.0);


	float filterr =  texture2D(uSampler2, vTextureCoord+vec2(cos(timeFactor*0.1)*0.07,cos(timeFactor*0.1)*0.07)).r;
	offset=aVertexNormal*0.09*vec3(0.0, 0.0, filterr);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

}

