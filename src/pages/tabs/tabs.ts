import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { BluetoothPage } from "../bluetooth/bluetooth";

import { BLEComponent } from "../ble/ble";

import { BluetoothLEPage } from "../bluetoothLE/bluetoothLE";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  // tab2Root = AboutPage;
  // tab3Root = ContactPage;
  tab4Root = BluetoothPage;
  tab5Root = BLEComponent;
  tab6Root = BluetoothLEPage;

  constructor() {

  }
}
