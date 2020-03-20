/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [

            //parte da frente +X
            0.5,-0.5, 0.5, //0  - E
            0.5,-0.5, -0.5, //1  - A
            0.5, 0.5, 0.5, //2  - F
            0.5,0.5,-0.5, //3   - B
            //parte de tras -X
            -0.5,0.5, 0.5, //4  - G
            -0.5,-0.5,-0.5, //5  - D
            -0.5,-0.5,0.5, //6  - H
            -0.5,0.5,-0.5, //7  - C
            //parte de cima +Z
            0.5,-0.5,0.5, //8   - E
            0.5,0.5,0.5, //9  - F 
            -0.5,-0.5,0.5, //10  - H
            -0.5,0.5,0.5, //11  - G
            //parte de baixo -Z
            0.5,-0.5,-0.5,  //12  - A
            -0.5,-0.5,-0.5, //13  - D
            0.5,0.5,-0.5, //14  - B
            -0.5,0.5,-0.5, //15  - C
            //lado direito +Y
            0.5,0.5, 0.5, //16  - F
            0.5,0.5,-0.5, //17  - B
            -0.5,0.5,0.5, //18  - G
            -0.5,0.5,-0.5, //19  - C
            //lado esquerdo -Y
            0.5,-0.5, 0.5, //20  - E
            -0.5,-0.5,-0.5, //21  - D
            0.5,-0.5,-0.5, //22  - A
            -0.5,-0.5,0.5, //23  - H
        

		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //face da frente
            0,3,2,
            0,1,3,
            //face de trás
            4,5,6,
            4,7,5,
            //face em baixo
			12, 15, 14,
            12, 13, 15,
            //face em cima
            8,9,11,
            8,11,10,
             //face da direita
             16,17,19,
             16,19,18,
             //face da esquerda
             23,22,20,
             23,21,22
		
             ];
        this.normals = [ 
           
            //parte da frente +X
            0.5,0,0,
            0.5,0,0,
            0.5,0,0,
            0.5,0,0,
            //parte de tras -X
            -0.5,0,0,
            -0.5,0,0,
            -0.5,0,0,
            -0.5,0,0,
            //parte de cima +Z
            0,0,0.5,
            0,0,0.5,
            0,0,0.5,
            0,0,0.5,
            //parte de baixo -Z
            0,0,-0.5,
            0,0,-0.5,
            0,0,-0.5,
            0,0,-0.5,
            //lado direito +Y
            0,0.5,0,
            0,0.5,0,
            0,0.5,0,
            0,0.5,0,
            //lado esquerdo -Y
            0,-0.5,0,
            0,-0.5,0,
            0,-0.5,0,
            0,-0.5,0,
        ];

        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

