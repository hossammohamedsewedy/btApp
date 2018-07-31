import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

@Component({
  selector: 'page-bluetoothLE',
  templateUrl: 'bluetoothLE.html'
})
export class BluetoothLEPage {

  macAddress: string = "B4-6D-83-76-B9-BF";

  platformStatus: string = "";
  bluetoothLEStatus: string = "";

  isBluetoothLEEnabled: boolean = false;

  scannedDevices: string = "";

  constructor(public navCtrl: NavController, private bluetoothLE: BluetoothLE,
    private alertCtrl: AlertController, public plt: Platform) {
      this.plt.ready().then((readySource) => {
 
        console.log('Platform ready from', readySource);
        this.platformStatus = JSON.stringify(readySource);
   
        this.bluetoothLE.initialize({
          request: true,
          statusReceiver: false,
          restoreKey : "bluetoothleplugin"
        }).then(ble => {
          //console.log('ble', ble.status) // logs 'enabled'
          this.bluetoothLEStatus = JSON.stringify(ble);
        }).catch(e => {
          this.bluetoothLEStatus = JSON.stringify(e);
        });
      }).catch(e => {
        this.platformStatus = JSON.stringify(e);
      });;
  }

  success(usage: string) {
    let alert = this.alertCtrl.create({
      title: 'bluetoothLE usage ' + usage,
      subTitle: 'Usage ' + usage + ' succeeded',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  failure(usage: string) {
    let alert = this.alertCtrl.create({
      title: 'bluetoothLE usage ' + usage,
      subTitle: 'Usage ' + usage + ' failed',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  toggleBluetoothLE(enable: boolean){
    if (enable) {
      this.bluetoothLE.enable();
      this.isBluetoothLEEnabled = true;
    }
    else{
      this.bluetoothLE.disable();
      this.isBluetoothLEEnabled = false;
    }

    let alert = this.alertCtrl.create({
      title: 'bluetoothLE',
      subTitle: 'bluetoothLE ' + (this.isBluetoothLEEnabled ? 'opened' : 'closed'),
      buttons: ['Dismiss']
    });
    alert.present();
  }

  scanDevices(){
    if (this.bluetoothLE.isEnabled()) {
      // this.bluetoothLE.discover()
      this.bluetoothLE.startScan({services: []}).subscribe(b => {
        this.scannedDevices = JSON.stringify(b);
      });
    }
  }
}