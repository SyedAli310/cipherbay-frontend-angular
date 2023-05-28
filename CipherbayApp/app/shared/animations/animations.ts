import { animate, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =  trigger(
    'slideInAnimation', [
        transition(':enter', [
        style({transform: 'translateY(-20%)', opacity: 0}),
        animate('200ms', style({transform: 'translateY(0)', opacity: 1}))
        ])
    ]
)

export const appearAnimation =  trigger(
    'appearAnimation', [
        transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1}))
        ])
    ]
)