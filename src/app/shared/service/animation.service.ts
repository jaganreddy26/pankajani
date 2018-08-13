
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export class AnimationService {
  static page = [
    trigger('routeAnimation',  [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ];
  static host = {
      '[@routeAnimation]': 'true',
   };
}
