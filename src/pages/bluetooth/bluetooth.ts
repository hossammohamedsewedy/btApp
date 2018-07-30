import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html'
})
export class BluetoothPage {

  macAddress: string = "B4-6D-83-76-B9-BF";

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
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.bluetoothOperation(operationNumber);
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
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            this.bluetoothOperation(operationNumber);
          }
        },
      ]
    });
    alert.present();
  }

  bluetoothOperation(opNumber: number) {
    var data = new Uint8Array(4);
    data[0] = 0x41;
    data[1] = 0x42;
    data[2] = 0x43;
    data[3] = 0x44;

    if (this.bluetoothSerial.isEnabled) {
      let mac: string = "B4-6D-83-76-B9-BF";
      if (this.macAddress != null && this.macAddress.length > 0) {
        mac = this.macAddress;
      }

      this.bluetoothSerial.connect(mac);
      // this.bluetoothSerial.connectInsecure(mac);

      if (this.bluetoothSerial.isConnected) {
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
    if (!this.bluetoothSerial.isEnabled) {
      this.bluetoothSerial.enable();
    }

    this.bluetoothOperation(1);
  }
}
