import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'food truck';

  getDepth(outlet: RouterOutlet) {
    let depth = outlet.activatedRouteData['depth'];
    if (depth === undefined) return 0;
    return depth;
  }
}
