import { Component } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'customer-portal';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer
  ) {
    this.registerIcons()
  }

  public registerIcons(): void {
    this.loadIcons(["learnmore", "danoycp", "dyccwc", "etas", "grltyc", "mycn", "mycp", "myrp", "scam", "sycp", "sytpd"], '../assets/svg');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach((key) => {
      this.matIconRegistry.addSvgIcon(
        key,
        this.domSanitzer.bypassSecurityTrustResourceUrl(
          `${iconUrl}/${key}.svg`
        )
      );
    });
  }
}
