import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html'
})
export class BluetoothPage {

  macAddress: string = "B4-6D-83-76-B9-BF";

  readData: string = "";

  devices: string = "";

  anyData: string = "";

  constructor(public navCtrl: NavController, private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController) {

  }

  success(usage: string, operationNumber: number) {
    let alert = this.alertCtrl.create({
      title: 'BlueTooth usage ' + usage,
      subTitle: 'Usage ' + usage + ' succeeded',
      // buttons: ['Dismiss']
      buttons: [
        {
          text: 'Next',
          role: 'ok',
          handler: () => {
            this.bluetoothOperation(operationNumber);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.bluetoothOperation(operationNumber);
          }
        },
      ]
    });
    alert.present();
  }

  failure(usage: string, operationNumber: number) {
    let alert = this.alertCtrl.create({
      title: 'BlueTooth usage ' + usage,
      subTitle: 'Usage ' + usage + ' failed',
      // buttons: ['Dismiss']
      buttons: [
        {
          text: 'Next',
          role: 'ok',
          handler: () => {
            this.bluetoothOperation(operationNumber);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.bluetoothOperation(operationNumber);
          }
        },
      ]
    });
    alert.present();
  }

  openBluetooth(){
    // if (!this.bluetoothSerial.isEnabled()) 
    {
      this.bluetoothSerial.enable();
    }
  }

  setBluetoothDiscoverable(){
    if (this.bluetoothSerial.isEnabled()){
      this.bluetoothSerial.setDiscoverable(60*3);
    }
  }

  read(){
    if (this.bluetoothSerial.isEnabled() && this.bluetoothSerial.isConnected()) {
      this.readData = JSON.stringify(this.bluetoothSerial.read());
    }
  }

  getUnpairedDevices(){
    if (this.bluetoothSerial.isEnabled() && this.bluetoothSerial.isConnected()) {
      this.devices = JSON.stringify(this.bluetoothSerial.discoverUnpaired());
    }
  }

  connectTest(){
    if (this.bluetoothSerial.isEnabled()) {
      this.bluetoothSerial.connect(this.macAddress).subscribe(bt => this.anyData = JSON.stringify(bt));
    }
  }

  connectInsecureTest(){
    if (this.bluetoothSerial.isEnabled()) {
      this.bluetoothSerial.connectInsecure(this.macAddress).subscribe(bt => this.anyData = JSON.stringify(bt));
    }
  }

  list(){
    if (this.bluetoothSerial.isEnabled() && this.bluetoothSerial.isConnected()) {
      this.anyData = JSON.stringify(this.bluetoothSerial.list());
    }
  }

  bluetoothOperation(opNumber: number) {
    var data = new Uint8Array(4);
    data[0] = 0x41;
    data[1] = 0x42;
    data[2] = 0x43;
    data[3] = 0x44;

    this.devices = JSON.stringify(this.bluetoothSerial.discoverUnpaired());
    console.log(this.devices);

    if (this.bluetoothSerial.isEnabled()) {
      let mac: string = "B4-6D-83-76-B9-BF";
      if (this.macAddress != null && this.macAddress.length > 0) {
        mac = this.macAddress;
      }

      this.connectTest();
      // this.connectInsecureTest();

      if (this.bluetoothSerial.isConnected()) {

        this.readData = JSON.stringify(this.bluetoothSerial.read());

        switch (opNumber) {
          case 1:
            // Write a string
            this.bluetoothSerial.write('hello world').then(s => {
              this.success('Write a string', 2);
            },
              f => {
                this.failure('Write a string', 2);
              });
            break;
          case 2:
            // Array of int or bytes
            this.bluetoothSerial.write([186, 220, 222]).then(s => {
              this.success('Array of int or bytes', 3);
            },
              f => {
                this.failure('Array of int or bytes', 3);
              });
            break;
          case 3:
            // Typed Array
            this.bluetoothSerial.write(data).then(s => {
              this.success('Typed Array', 4);
            },
              f => {
                this.failure('Typed Array', 4);
              });
            break;
          case 4:
            // Array Buffer
            this.bluetoothSerial.write(data.buffer).then(s => {
              this.success('Array Buffer', 0)
            },
              f => {
                this.failure('Array Buffer', 0)
              });
            break;
        }
      }

      this.bluetoothSerial.disconnect();
      // this.bluetoothSerial.discoverUnpaired();
    }
  }

  bluetoothWrite() {
    if (!this.bluetoothSerial.isEnabled()) {
      this.bluetoothSerial.enable();
    }

    this.bluetoothOperation(1);
  }
}
