/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }
    initBuffers() {


            this.vertices = [ 
                0, -1, -1,
                 1,  1,  -1,
                0, 0,  2,
                -1, 1,  -1]
              
        
            this.indices =[
                2,1,3,
                3,1,0,
                0,1,2,
                0,2,3
            ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}


