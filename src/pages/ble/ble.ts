import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-ble',
  templateUrl: 'ble.html'
})
export class BLEComponent {

  macAddress: string = "B4-6D-83-76-B9-BF";

  scannedDevices: string = "";

  constructor(public navCtrl: NavController, private ble: BLE,
    private alertCtrl: AlertController) {

  }

  success(usage: string) {
    let alert = this.alertCtrl.create({
      title: 'BLE usage ' + usage,
      subTitle: 'Usage ' + usage + ' succeeded',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  failure(usage: string) {
    let alert = this.alertCtrl.create({
      title: 'BLE usage ' + usage,
      subTitle: 'Usage ' + usage + ' failed',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  bleEnable(){
    if (true /* !this.ble.isEnabled() */) {
      this.ble.enable();

      let alert = this.alertCtrl.create({
        title: 'BLE',
        subTitle: 'BLE opened',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    // else{
    //   let alert = this.alertCtrl.create({
    //     title: 'BLE',
    //     subTitle: 'BLE already opened',
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // }
  }

  scanDevices(){
    if (this.ble.isEnabled()) {
      this.ble.startScanWithOptions([], {}).subscribe(b => {
        this.scannedDevices = JSON.stringify(b);
        this.success("scanDevices");
      }, 
      err => {
        this.failure("scanDevices");
      });
    }
  }

}
