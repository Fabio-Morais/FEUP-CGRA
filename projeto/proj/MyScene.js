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
        this.texture22 = new CGFtexture(this, 'images/cubemap2.png');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.skybox = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.materials = new Material(this);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);

        this.text = "";
        this.speedLimit = 4;
        this.speed = 0;
        this.rotateHelice = 0;
        this.lastUpdate = 0;//mete o tempo nesta variavel

        //Objects connected to MyInterface
        this.interface();
        this.initMaterials();

    }

    interface() {
        this.displayAxis = false;
        this.displayNormals = false;
        this.displayVei = true;
        this.displayTextures = true;
        this.thirdPerson = false;
        this.suppliesCamera = function () {
            this.seeSupplies();
        }
        this.vehicleCamera = function () {
            this.seeVehicle();
        }
        this.selectedTexture = 0;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.textures = [this.texture1, this.texture22];
        this.textureIds = {'Sky': 0, 'sun': 1};
    }

    //materiais presentes na classe Material
    initMaterials() {
        this.skybox_day = this.materials.skyBox();
        this.default = this.materials.default();
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setDiffuse(0, 0, 0, 1.0);
        this.lights[0].setSpecular(0, 0, 0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 50, 30), vec3.fromValues(0, 0, 0));
    }

    updateAppliedTexture() {
        this.skybox_day.setTexture(this.textures[this.selectedTexture]);
    }

    checkKeys() {
        var keysPressed = false;
        this.vehicle.resetRotate();

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.text += "W";
            if (this.speed < this.speedLimit) {
                this.speed += 0.1;
                this.speed *= 1.1;
            } else if (this.speed > this.speedLimit)
                this.speed = this.speedLimit;
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.text += "A";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.text += "D";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.text += "S";
            if (this.speed > 0)
                this.speed -= 0.1;
            else
                this.speed = 0;
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.text += "R";
            this.speed = 0;
            this.vehicle.reset();
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            if (!this.vehicle.automaticPilot) {
                this.text += "P";
                this.vehicle.toAutomaticPilot();
                keysPressed = true;
            }

        }
        if (this.gui.isKeyPressed("KeyL") && !this.vehicle.automaticPilot) {
            this.text += "L";
            this.dropPosition = [this.vehicle.x, this.vehicle.z];
            if (this.vehicle.supply[this.vehicle.supplyPointer].state === this.vehicle.supply[this.vehicle.supplyPointer].SupplyStates.INACTIVE) {
                this.vehicle.nSuppliesDelivered++;
                this.vehicle.supply[this.vehicle.supplyPointer].drop(this.dropPosition);
            }
            keysPressed = true;
        }
        console.log(this.text)
        this.vehicle.updateValues(this.text, this.speed * (this.speedFactor / 2));
        this.text = "";
    }

    // apontar a camera para tabuleta do numero de supplies
    seeSupplies() {
        this.camera.setPosition(vec3.fromValues(0, 5, 10));
        this.camera.setTarget(vec3.fromValues(0, 0, 0));
    }

    // apontar a camera para o veiculo
    seeVehicle() {
        this.camera.setPosition([(this.vehicle.x - 42 * Math.sin(this.vehicle.angle)), this.vehicle.y + 42, (this.vehicle.z - 42 * Math.cos(this.vehicle.angle))]);
        this.camera.setTarget([this.vehicle.x, this.vehicle.y, this.vehicle.z]);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        if (this.lastUpdate === 0)
            this.lastUpdate = t;
        var elapsedTime = t - this.lastUpdate;
        this.lastUpdate = t;
        this.rotateHelice = t / 100 % 1000;
        this.checkKeys();
        this.vehicle.update(t, this.speedFactor, elapsedTime);
        this.billboard.update(this.vehicle.nSuppliesDelivered);
    }

    display() {
        if (this.thirdPerson) {
            this.seeVehicle();
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

        if (this.displayTextures)
            this.enableTextures(true);
        else
            this.enableTextures(false);
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.default.apply();


        this.pushMatrix();
        this.vehicle.display(this.rotateHelice, this.displayVei, this.scaleFactor);
        this.popMatrix();


        this.pushMatrix();
        this.skybox_day.apply();
        this.translate(0, 24, 0);
        this.scale(50, 50, 50);
        this.skybox.display();
        this.popMatrix();

        if (this.displayNormals)
            this.billboard.enableNormalViz();
        else
            this.billboard.disableNormalViz();


        // ---- END Primitive drawing section
        this.pushMatrix();
        this.translate(0, -0.05, 0);
        this.terrain.display();
        this.popMatrix();

        this.pushMatrix();
        this.billboard.display();
        this.popMatrix();


    }
}