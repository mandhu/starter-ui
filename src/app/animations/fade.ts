import { animate, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDurations } from './defaults';

// -----------------------------------------------------------------------------------------------------
// @ Fade in left
// -----------------------------------------------------------------------------------------------------
const fadeInLeft = trigger('fadeInLeft',
    [
        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(-100%, 0, 0)'
            })
        ),

        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('void => false', []),

        // Transition
        transition('void => *', animate('{{timings}}'),
            {
                params: {
                    timings: `${AnimationDurations.ENTERING} ${AnimationCurves.DECELERATION_CURVE}`
                }
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out left
// -----------------------------------------------------------------------------------------------------
const fadeOutLeft = trigger('fadeOutLeft',
    [
        state('*',
            style({
                opacity  : 1,
                transform: 'translate3d(0, 0, 0)'
            })
        ),

        state('void',
            style({
                opacity  : 0,
                transform: 'translate3d(-100%, 0, 0)'
            })
        ),

        // Prevent the transition if the state is false
        transition('false => void', []),

        // Transition
        transition('* => void', animate('{{timings}}'),
            {
                params: {
                    timings: `${AnimationDurations.EXITING} ${AnimationCurves.ACCELERATION_CURVE}`
                }
            }
        )
    ]
);

export { fadeInLeft, fadeOutLeft };
