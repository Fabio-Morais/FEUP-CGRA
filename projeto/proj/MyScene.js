/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();
        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.setUpdatePeriod(50);
        this.enableTextures(true);

        this.texture1 = new CGFtexture(this, 'images/cubemap.png');
        this.texture2 = new CGFtexture(this, 'images/cubemap2.jpg');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 30, 10);
        this.skybox = new MyCubeMap(this, 150);
        this.cube = new MyVehicle(this);
        this.cyl = new MyCylinder(this,50);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.displayCyl= false;
        this.displayVei=false;
        this.displayTextures=true;
        this.displaySphere=true;
        this.selectedTexture = 0;
        this.speedFactor=1;
        this.scaleFactor=1;
        this.textures = [this.texture1, this.texture2, this.texture3];
        this.textureIds = { 'Sky': 0, 'Green': 1};

    }

    initMaterials() {
        this.skybox_day = new CGFappearance(this);
        this.skybox_day.setAmbient(1, 1, 1, 1);
        this.skybox_day.setDiffuse(1, 1, 1, 1);
        this.skybox_day.setSpecular(0, 0, 0, 1);
        this.skybox_day.setShininess(150.0);
        this.skybox_day.loadTexture('images/cubemap.png');
        this.skybox_day.setTextureWrap('REPEAT', 'REPEAT');

        this.marble = new CGFappearance(this);
        this.marble.setAmbient(1, 1, 1, 1);
        this.marble.setDiffuse(1, 1, 1, 1);
        this.marble.setSpecular(0, 0, 0, 1);
        this.marble.setShininess(10.0);
        this.marble.loadTexture('images/split_cubemap/bottom.png');
        this.marble.setTextureWrap('REPEAT', 'REPEAT');

        this.earth = new CGFappearance(this);
        this.earth.setAmbient(1, 1, 1, 1);
        this.earth.setDiffuse(1, 1, 1, 1);
        this.earth.setSpecular(0, 0, 0, 1);
        this.earth.setShininess(10.0);
        this.earth.loadTexture('images/earth.jpg');
        this.earth.setTextureWrap('REPEAT', 'REPEAT');
    }
        initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 5, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(1, 1, 1, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateAppliedTexture() {
        this.skybox_day.setTexture(this.textures[this.selectedTexture]);

    }
    checkKeys() {
        var text="";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+="W";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text+="A";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text+="D";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text+="S";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text+="R";
            keysPressed=true;
        }
        this.cube.update(text, this.speedFactor);
        if (keysPressed)
            console.log(text);
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        if(this.displayTextures)
            this.enableTextures(true);
        else
            this.enableTextures(false);
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if(this.displaySphere){
            this.earth.apply();
            this.incompleteSphere.display();
        }

       if(this.displayVei) {
           this.pushMatrix();
           this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
           this.cube.display(this.scaleFactor);
           this.popMatrix();
       }

        /*this.pushMatrix();
        this.incompleteSphere.display();
        this.popMatrix();*/

        this.pushMatrix();
        this.skybox_day.apply();
        this.scale(50,50,50);
        this.skybox.display();
        this.popMatrix();

        if (this.displayNormals)
            this.cube.enableNormalViz();
        else
            this.cube.disableNormalViz();

        if(this.displayCyl){
            this.pushMatrix();
            this.marble.apply();
            this.cyl.display();
            this.popMatrix();
        }
        // ---- END Primitive drawing section
    }
}