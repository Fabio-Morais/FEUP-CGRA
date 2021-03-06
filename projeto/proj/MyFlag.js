/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
    constructor(scene) {
        super(scene);
        this.flag = new MyPlane(scene, 75);
        this.support = new MyCylinder(scene, 20);
        this.default = new CGFappearance(this.scene);

        this.appearance = new CGFappearance(this.scene);

        this.appearance.loadTexture('images/flag.jpg');
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    }

    display(testShaders, speed) {
        /*0.02 a 0.6
        * max tem de ser 0.4 nos shaders
        * */
        if(speed > 0.3)
            testShaders.setUniformsValues({ speed: 0.4 });
        else if(speed>0 && speed < 0.1)
            testShaders.setUniformsValues({ speed: 0.1 });
        else if(speed ==0 ){
            testShaders.setUniformsValues({ speed: 0 });
        }else{
            testShaders.setUniformsValues({ speed: speed+0.1 });
        }

        this.scene.pushMatrix();
        this.scene.scale(1,0.5,1);
        this.flag.originalText();
        testShaders.setUniformsValues({ invert: false });
        this.appearance.apply();
        this.flag.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0,1,0);
        this.scene.rotate(Math.PI, 0,0,1);
        this.scene.scale(1,0.5,1);
        this.flag.invertText();
        testShaders.setUniformsValues({ invert: true });
        this.flag.display();
        this.scene.popMatrix();

        this.default.apply();




        this.scene.pushMatrix();
        this.scene.translate(-0.49,0.1,0.027);
        this.scene.scale(1,0.005,0.005);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.support.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.49,-0.1,0.027);
        this.scene.scale(1,0.005,0.005);
        this.scene.rotate(Math.PI/2, 0,0,1);

        this.support.display();
        this.scene.popMatrix();


    }

    enableNormalViz(){

    }
    disableNormalViz(){

    }

}

