/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, -1, 0,	//0		XA,YA,ZA
			-1, 1, 0,	//1		XB,YB,ZB
			1, -1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,	// indices dos vertices acima
		];
/*anti horario-> parte da frente
sentido horario -> parte de trás  */ 
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
