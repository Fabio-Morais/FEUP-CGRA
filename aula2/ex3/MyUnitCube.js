/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCuber extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            //parte de baixo
            -0.5, -0.5, -0.5,	//0		XA,YA,ZA
			0.5, -0.5, -0.5,	//1		XB,YB,ZB
            -0.5, 0.5, -0.5,		//2
            0.5, 0.5, -0.5,	//3
            //parte de cima
            -0.5, -0.5, 0.5, //4
			0.5, -0.5, 0.5, //5
            -0.5, 0.5, 0.5, //6
            0.5, 0.5, 0.5,	 //7


		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //face em baixo
			0, 2, 1,
            1, 2, 3,
            //face em cima
            4,5,6,
            5,7,6,
            //face da frente
            0,1,4,
            1,5,4,
            //face de trás
            2,6,3,
            3,6,7,
             //face da direita
             1,3,5,
             3,7,5,
             //face da esquerda
             0,4,2,
             2,4,6
		
             ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

