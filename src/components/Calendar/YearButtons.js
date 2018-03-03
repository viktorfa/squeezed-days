import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';

const YearButtons = (props) => {
    const currentYear = moment().year();
    return (
        <div role="group" style={props.style}>
            {
                [0, 1, 2].map((yearsFromNow) => {
                    return <YearButton key={currentYear + yearsFromNow} switchYear={props.switchYear}
                                       year={currentYear + yearsFromNow} currentYear={props.year}/>
                })
            }
        </div>
    )
};

YearButtons.propTypes = {
    switchYear: PropTypes.func.isRequired,
    year: PropTypes.number.isRequired
};

const YearButton = (props) => (
    <Button
        active={props.year === props.currentYear}
        onClick={() => props.switchYear(props.year)}
        type="button">
        {props.year}
    </Button>
);

YearButton.propTypes = {
    year: PropTypes.number.isRequired,
    currentYear: PropTypes.number.isRequired,
    switchYear: PropTypes.func.isRequired,
    style: PropTypes.object
};

export default YearButtons;
