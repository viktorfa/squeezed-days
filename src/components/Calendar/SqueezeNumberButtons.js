import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';

const SqueezeNumberButtons = (props) => {
    return (
        <div role="group" style={props.style}>
            {
                [1, 2, 3, 4, 5].map((squeezeNumber) => {
                    return (
                        <SqueezeNumberButton key={squeezeNumber}
                                             squeezeNumber={squeezeNumber}
                                             switchSqueezeNumber={props.switchSqueezeNumber}
                                             currentSqueezeNumber={props.currentSqueezeNumber}
                        />
                    )
                })
            }
        </div>
    )
};

SqueezeNumberButtons.propTypes = {
    switchSqueezeNumber: PropTypes.func.isRequired,
    currentSqueezeNumber: PropTypes.number.isRequired
};

const SqueezeNumberButton = (props) => (
    <Button
        active={props.squeezeNumber === props.currentSqueezeNumber}
        onClick={() => props.switchSqueezeNumber(props.squeezeNumber)}
        type="button">
        {props.squeezeNumber}
    </Button>
);

SqueezeNumberButton.propTypes = {
    squeezeNumber: PropTypes.number,
    currentSqueezeNumber: PropTypes.number,
    switchSqueezeNumber: PropTypes.func,
    style: PropTypes.object
};

export default SqueezeNumberButtons;
