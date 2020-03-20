/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(this.scene);

        this.triangleRosa = new MyTriangle(this.scene);
        this.triangleAzul = new MyTriangle(this.scene);
        this.triangleVermelho = new MyTriangle(this.scene);
        this.trianglePink = new MyTriangle(this.scene);
        this.triangleLaranja = new MyTriangle(this.scene);

        this.parallelogram = new MyParallelogram(this.scene);
        this.diamond = new MyDiamond(this.scene);

        this.diamond.initBuffers();
        this.triangle.initBuffers();
        this.parallelogram.initBuffers();
        this.initMaterials();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
    }

    initMaterials() {
        // Red Ambient (no diffuse, no specular)
        this.amarelo = new CGFappearance(this.scene);
        this.amarelo.setAmbient(1, 1, 0, 1.0);
        this.amarelo.setDiffuse(0, 0, 0, 1.0);
        this.amarelo.setSpecular(0, 0, 0, 1.0);
        this.amarelo.setShininess(10.0);

        this.vermelho = new CGFappearance(this.scene);
        this.vermelho.setAmbient(1, 0, 0, 1.0);
        this.vermelho.setDiffuse(0, 0, 0, 1.0);
        this.vermelho.setSpecular(0, 0, 0, 1.0);
        this.vermelho.setShininess(10.0);

        this.verde = new CGFappearance(this.scene);
        this.verde.setAmbient(0, 1, 0, 1.0);
        this.verde.setDiffuse(0, 0, 0, 1.0);
        this.verde.setSpecular(0, 0, 0, 1.0);
        this.verde.setShininess(10.0);

        this.azul = new CGFappearance(this.scene);
        this.azul.setAmbient(0, 128 / 255, 1, 1.0);
        this.azul.setDiffuse(0, 0, 0, 1.0);
        this.azul.setSpecular(0, 0, 0, 1.0);
        this.azul.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(204 / 255, 0, 102 / 255, 1.0);
        this.pink.setDiffuse(0, 0, 0, 1.0);
        this.pink.setSpecular(0, 0, 0, 1.0);
        this.pink.setShininess(10.0);

        this.laranja = new CGFappearance(this.scene);
        this.laranja.setAmbient(1, 128 / 255, 0, 1.0);
        this.laranja.setDiffuse(0, 0, 0, 1.0);
        this.laranja.setSpecular(0, 0, 0, 1.0);
        this.laranja.setShininess(10.0);

        this.rosa = new CGFappearance(this.scene);
        this.rosa.setAmbient(1, 153 / 255, 204 / 255, 1.0);
        this.rosa.setDiffuse(0, 0, 0, 1.0);
        this.rosa.setSpecular(0, 0, 0, 1.0);
        this.rosa.setShininess(10.0);

        this.material = new CGFappearance(this.scene);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.material.apply();
        this.triangleAzul.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1.5, 1, 1);
        this.scene.translate(-1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangleRosa.updateTexCoords([
            0, 0.5,
            0.5, 1,
            0, 1
        ]);
        this.material.apply();
        this.triangleRosa.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-3.5, 0, 0);
        this.triangleVermelho.updateTexCoords([
            0.5, 0.5,
            0.75, 0.75,
            0.25, 0.75
        ]);
        this.material.apply();
        this.triangleVermelho.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.material.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0 + 1.5, 2 + 0.5, 0);
        this.scene.scale(2, 2, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.triangleLaranja.updateTexCoords([
            1, 0,
            0.5, 0.5,
            1, 1
        ]);
        this.material.apply();
        this.triangleLaranja.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.5, -1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.trianglePink.updateTexCoords([
            0, 0,
            0, 0.5,
            0.25, 0.25
        ]);
        this.material.apply();
        this.trianglePink.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5, 3.5, 0);
        this.material.apply();
        this.diamond.display();
        this.scene.popMatrix();
    }

    /**
     * @method updateTexCoords
     * Updates the list of texture coordinates of the quad
     * @param {Array} coords - Array of texture coordinates
     */
    updateTexCoords(coords) {
        this.diamond.updateTexCoords(coords);
    }
}
