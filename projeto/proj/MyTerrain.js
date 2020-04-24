/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {


    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 20);
        this.initMaterials();

    }
    initMaterials() {
        this.appearance = new CGFappearance(this.scene);

        this.appearance.loadTexture('images/terrain.jpg');
        this.appearance.setTextureWrap('WARM', 'WARM');
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.texture2 = new CGFtexture(this.scene, "images/heightmap.jpg");

        this.testShaders = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.testShaders.setUniformsValues({ uSampler2: 1 })


    }



    display() {

        this.appearance.apply();

        this.scene.setActiveShader(this.testShaders);
        this.texture2.bind(1);
        this.scene.pushMatrix();
        this.scene.scale(50,20,50)
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

    }

    enableNormalViz(){

    }
    disableNormalViz(){

    }

}

