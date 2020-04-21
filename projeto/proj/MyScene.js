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
        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.setUpdatePeriod(50);
        this.enableTextures(true);

        this.texture1 = new CGFtexture(this, 'images/cubemap.png');
        this.texture22 = new CGFtexture(this, 'images/cubemap2.jpg');


        // shader code panels references


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 30, 10);
        this.skybox = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.cyl = new MyCylinder(this,50);
        this.materials = new Material(this);

        this.text="";
        this.speedLimit=4;
        this.speed=0;
        this.rotateHelice=0;
        //Objects connected to MyInterface
        this.interface();

        this.initMaterials();
    }
    interface(){
        this.displayAxis = true;
        this.displayNormals = false;
        this.displayCyl= false;
        this.displayVei=true;
        this.displayTextures=true;
        this.displaySphere=false;
        this.thirdPerson = false;
        this.selectedTexture = 0;
        this.speedFactor=1;
        this.scaleFactor=1;
        this.textures = [this.texture1, this.texture22];
        this.textureIds = { 'Sky': 0, 'Green': 1};
    }

    initMaterials() {
        this.skybox_day = this.materials.skyBox();
        this.default = new CGFappearance(this);
        this.default.setAmbient(1, 1, 1, 1);
        this.default.setDiffuse(1, 1, 1, 1);
        this.default.setSpecular(0, 0, 0, 1);
        this.default.setShininess(10.0);

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
        var keysPressed=false;
        this.vehicle.resetRotate();

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.text+="W";
            if(this.speed < this.speedLimit)
            {
                this.speed+=0.1;
                this.speed*=1.1;
            }
            else if(this.speed > this.speedLimit)
                this.speed = this.speedLimit;
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.text+="A";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.text+="D";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.text+="S";
            if(this.speed > 0)
                this.speed-=0.1;
            else
                this.speed=0;
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.text+="R";
            this.speed=0;
            keysPressed=true;
        }
        console.log("velocidade:" +this.speed);
        if (keysPressed)
            console.log(this.text);
        this.vehicle.update(this.text, this.speed*(this.speedFactor/2));
        this.text="";
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.rotateHelice = t / 100 % 1000;
        this.vehicle.testShaders.setUniformsValues({ timeFactor: ((t) / (100-5*(this.speed*this.speedFactor)) % 8) });
        console.log("0.1t= "+ (t / 40 % 8))
        console.log("sin(0.1t)= "+Math.sin(t*0.1))
        /*
        * 100 ou 50
        * ~100----1
        *  50 -----x
        * 100 - 10*velocidade
        * */
    }

    display() {
        if(this.thirdPerson){
            this.camera.setPosition([(this.vehicle.x+5) - 32 * Math.sin(this.vehicle.angle) , this.vehicle.y+15, this.vehicle.z - 32*Math.cos(this.vehicle.angle)]);
            this.camera.setTarget([this.vehicle.x, this.vehicle.y, this.vehicle.z]);

        }
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
           this.vehicle.display(this.rotateHelice);
           this.popMatrix();
       }

        this.pushMatrix();
        this.skybox_day.apply();
        this.scale(50,50,50);
        this.skybox.display();
        this.popMatrix();

        if (this.displayNormals)
            this.vehicle.enableNormalViz();
        else
            this.vehicle.disableNormalViz();

        if(this.displayCyl){
            this.pushMatrix();
            this.cyl.display();
            this.popMatrix();
        }
        // ---- END Primitive drawing section
    }
}