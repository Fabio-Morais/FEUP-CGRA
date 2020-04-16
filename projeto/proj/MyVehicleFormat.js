/**
 * MyVehicleFormat
 * @constructor
 */
class MyVehicleFormat extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }
    initBuffers() {


        this.vertices = [
            //base
            0, -1, -1,//0
            1,  1,  -1,//1
            -1, 1,  -1,//2
            //cima
            1,  1,  -1,//3
            -1, 1,  -1,//4
            0, 0, 2,//5
            //esquerda
            -1, 1,  -1,//6
            0, -1, -1,//7
            0, 0,  2,//8
            //direita
            1,  1,  -1,//9
            0, -1, -1,//10
            0, 0,  2,//11
        ];


        this.indices =[
            0,2,1,
            3,4,5,
            6,7,8,
            9,11,10

        ];

        this.normals=[
            0,0,-1,
            0,0,-1,
            0,0,-1,

            0,1,0,
            0,1,0,
            0,1,0,

            -1,0,0,
            -1,0,0,
            -1,0,0,

            1,0,0,
            1,0,0,
            1,0,0,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}
