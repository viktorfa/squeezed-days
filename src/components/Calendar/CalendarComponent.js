import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classes from './Calendar.css'
import YearButtons from "./YearButtons";
import SqueezeNumberButtons from "./SqueezeNumberButtons";
import ScrollStickyMenu from "./ScrollStickyMenu";


const Calendar = (props) => (
    <div className={classes.calendar}>

        <div>
            <h3 style={{margin: '10px 0 0 0'}}>{`År ${props.year}`}</h3>
            <h4 style={{margin: '0 0 10px 0'}}>Regner <strong>{props.squeezeNumber}</strong> dager mellom fri som inneklemt</h4>
        </div>

        <ScrollStickyMenu>
            <YearButtons
                style={{margin: '2px'}}
                switchYear={props.switchYear}
                year={props.year}
            />
            <SqueezeNumberButtons
                style={{margin: '2px'}}
                switchSqueezeNumber={props.switchSqueezeNumber}
                currentSqueezeNumber={props.squeezeNumber}
            />
        </ScrollStickyMenu>

        <SqueezedDays calendar={props.calendar}/>

        <ul style={{listStyle: 'none', padding: 0}}>
            {_.map(props.calendar, (day) => {
                return (
                    <SqueezedDay type={day.type} day={day} includeExtraText/>
                )
            })}
        </ul>
    </div>
);

Calendar.propTypes = {
    calendar: PropTypes.object,
    year: PropTypes.number,
    squeezeNumber: PropTypes.number,
    switchYear: PropTypes.func,
    switchSqueezeNumber: PropTypes.func
};

const SqueezedDay = (props) => {

    let backgroundColor;
    let color;
    let text;

    // Add appropriate styling and text to days
    switch (props.type) {
        case 'inneklemt':
            backgroundColor = '#71a74b';
            color = 'inherit';
            text = props.day.formattedDate + ' - INNEKLEMT!';
            break;
        case 'weekend':
            backgroundColor = 'rgb(197, 150, 237)';
            color = 'inherit';
            break;
        case 'holiday':
            backgroundColor = 'lightcoral';
            color = 'inherit';
            text = props.day.formattedDate + ' - ' + props.day.name;
            break;
        default:
            backgroundColor = 'lightblue';
            color = 'inherit';
    }

    const style = {
        backgroundColor: backgroundColor,
        color: color,
        marginTop: props.firstSqueezedDay ? '5px' : 0,
        padding: '5px 0',
        fontSize: '1.1em',
        listStyle: 'none'
    };
    return (
        <li style={style}>
            {
                props.includeExtraText && text ? text : props.day.formattedDate
            }
        </li>
    )
};

SqueezedDay.propTypes = {
    day: PropTypes.object.isRequired,
    type: PropTypes.string,
    includeExtraText: PropTypes.bool,
    firstSqueezedDay: PropTypes.bool
};

const SqueezedDays = (props) => (
    <div>
        <h4>{`Inneklemte dager (${_.filter(props.calendar, day => day.type === 'inneklemt').length})`}</h4>
        <ul style={{padding: 0}}>
            {
                /**
                 * Getting all squeezed days and adding a small space if there is some other type of days between two
                 * continuous chunks of squeezed days.
                 */
                _
                    .filter(props.calendar, day => day.type === 'inneklemt')
                    .map((day, index, filtered) => {
                        if (day.daysFromLast === 0) {
                            return <SqueezedDay key={day.day} day={day} firstSqueezedDay type={'inneklemt'}/>
                        } else {
                            return <SqueezedDay key={day.day} day={day} type={'inneklemt'}/>
                        }
                    })
            }
        </ul>
    </div>
);

export default Calendar;
