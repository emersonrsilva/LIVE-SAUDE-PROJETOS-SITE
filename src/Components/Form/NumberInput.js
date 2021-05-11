import React from 'react';
import { Form } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

export function NumberInput(props){

    return (
        <Form.Group as={props.as}>
            {(props.label) && <Form.Label>{props.label}</Form.Label>}

            <NumericInput
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step}
            precision={props.precision}
            parse={props.parse}
            format={props.format}
            className={props.ClassName}

            ></NumericInput>
        </Form.Group>
    );

};