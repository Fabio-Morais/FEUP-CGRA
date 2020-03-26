attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 coords;
uniform float normScale;
uniform float timeFactor;
varying vec2 vTextureCoord;

void main() {
	vec3 offset = vec3(sin(timeFactor)*normScale, 0.0, 0.0); // vai mexer no X
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;

	coords = gl_Position;

}

