import { animate, style, transition, trigger } from "@angular/animations";

export const slideInAnimation = trigger(
    'slideInAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
    ])
]
)

export const appearAnimation = trigger(
    'appearAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
    ])
]
)

export const slideInOutYAnimation = trigger(
    'slideInOutYAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: 0, transition: 'all ease 300ms' }),
        animate('170ms', style({ transform: 'translateY(0)', opacity: 1 }))
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1, transition: 'all ease 300ms' }),
        animate('170ms', style({ transform: 'translateY(-20%)', opacity: 0 }))
    ])
]
)

export const slideInXAnimation = trigger(
    'slideInXAnimation', [
    transition(':enter', [
        style({ transform: 'translateX(-20%)', opacity: 0, transition: 'all ease 300ms' }),
        animate('170ms', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
]
)
export const slideOutXAnimation = trigger(
    'slideOutXAnimation', [
    transition(':enter', [
        style({ transform: 'translateX(20%)', opacity: 0, transition: 'all ease 300ms' }),
        animate('170ms', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
]
)