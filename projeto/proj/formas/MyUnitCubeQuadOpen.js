/**
 * MyUnitCubeQuadOpen
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuadOpen extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quadSides = new MyQuad(this.scene);
        this.quadTop = new MyQuad(this.scene);
        this.quadBottom = new MyQuad(this.scene);

    }
    enableNormalViz() {

    }

    disableNormalViz() {

    }
    display() {


        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,0,0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0,0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,1)
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-1)
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quadSides.display();
        this.scene.popMatrix();


       /* this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quadSides.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadTop.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quadBottom.display();
        this.scene.popMatrix();*/
    }

    /**
     * @method updateTexCoords
     * Updates the list of texture coordinates of the quad
     * @param {Array} coords - Array of texture coordinates
     */
    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}

