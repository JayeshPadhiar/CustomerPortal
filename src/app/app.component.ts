import { Component } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-portal',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customer-portal';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitzer: DomSanitizer) {
    this.registerIcons();
  }

  public registerIcons(): void {
    this.loadIcons(
      [
        'connected',
        'pending',
        'eyecon',
        'learnmore',
        'infoicon',
        'globeicon',
        'trashicon',
        'danoycp',
        'dyccwc',
        'etas',
        'grltyc',
        'mycn',
        'mycp',
        'myrp',
        'scam',
        'sycp',
        'sytpd',
        'danoycp-open',
        'dyccwc-open',
        'etas-open',
        'grltyc-open',
        'mycn-open',
        'mycp-open',
        'myrp-open',
        'scam-open',
        'sycp-open',
        'sytpd-open',
        'crossbutton',
        'deletebin',
        'shippingSoon',
        'inTransit'
      ],
      '../../assets/img'
    );
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitzer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
