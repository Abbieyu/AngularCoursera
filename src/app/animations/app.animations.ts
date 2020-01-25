import {trigger,state,style,animate,transition} from '@angular/animations';

export let visibility=
    //trigger('triggername',[state('statename',what to do)])
     trigger('visibility',
    [state('shown',style({
        transform:'scale(1.01)',
        opacity:1//means it is completely shown
      })),state('hidden',style({
        transform:'scale(0.33)',
        opacity:0//means it is completely hidden
      })),
      transition('* => *',animate('0.8s ease-in-out'))//moving from any state to any other state
])

export let flyInOut=
    trigger('flyInOut',
    [state('*',style({
        opacity:1,
        transform:'translateX(0)'
    })),
    //transition('state',[stuff to do])
    transition(':enter',[
        style({transform:'translateX(-100%)'}),
        animate('500ms ease-in')
    ]),
    transition(':leave',[
        animate('500ms ease-out'),
        style({transform:'translateX(100%)'})])
])

export let expand = 
    trigger('expand',[
    state('*',style({
        opacity:1,
        transform:'translateX(0)'
    })),
    transition(':enter',[
        style({transform:'translateY(-50%)',
        opacity:0}),
        animate('200ms ease-in',style({
            opacity:1,
            transform:'translateX(0)'})
        )
    ])
])
    
