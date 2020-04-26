/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI({  width: 400 });
        
        var obj = this;
        //Checkbox element in GUI
        var f0 = this.gui.addFolder('Map')
        f0.add(this.scene, 'displayAxis').name('Display Axis');
        f0.add(this.scene, 'displayTextures').name('Display textures');
        f0.add(this.scene, 'displayNormals').name("Display normals");
        f0.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));

        var f1 = this.gui.addFolder('Vehicle')
        f1.add(this.scene, 'displayVei').name('Display vehicle');
        f1.add(this.scene, 'thirdPerson').name('Third Person');
        f1.add(this.scene, 'speedFactor', 0.1, 3).name('Speed');
        f1.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale');

        this.gui.add(this.scene, 'suppliesCamera').name('Number of Supplies Camera');
        this.gui.add(this.scene, 'vehicleCamera').name('Vehicle Camera');


        this.initKeys();

        return true;
    }

     initKeys(){
         // create reference from the scene to the GUI
         this.scene.gui=this;
        // disable the processKeyboard function
         this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
         this.activeKeys={};
     }

    processKeyDown(event) {
    // called when a key is pressed down
    // mark it as active in the array
        this.activeKeys[event.code]=true;
    };
    processKeyUp(event) {
    // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };
    isKeyPressed(keyCode) {
    // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;

    }


}