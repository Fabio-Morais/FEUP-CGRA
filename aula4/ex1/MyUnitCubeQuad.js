/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quadSides = new MyQuad(this.scene);
        this.quadTop = new MyQuad(this.scene);
        this.quadBottom = new MyQuad(this.scene);

        this.materialSides = new CGFappearance(this.scene);
        this.materialSides.loadTexture('images/mineSide.png');
        this.materialSides.setTextureWrap('REPEAT', 'REPEAT');

        this.materialBottom = new CGFappearance(this.scene);
        this.materialBottom.loadTexture('images/mineBottom.png');
        this.materialBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.materialTop = new CGFappearance(this.scene);
        this.materialTop.loadTexture('images/mineTop.png');
        this.materialTop.setTextureWrap('REPEAT', 'REPEAT');
    }
    enableNormalViz() {

    }

    disableNormalViz() {

    }
    display() {
        this.materialSides.apply();

        if(this.scene.filterLine) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        }

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
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

        this.materialTop.apply();

        if(this.scene.filterLine) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        }

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadTop.display();
        this.scene.popMatrix();

        this.materialBottom.apply();

        if(this.scene.filterLine) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }else{
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        }

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quadBottom.display();
        this.scene.popMatrix();
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

