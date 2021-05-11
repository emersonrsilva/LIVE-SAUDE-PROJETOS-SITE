import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export function Radio(props){

    const [input, setInput] = useState();
    
    useEffect(() => {

        setInput(
            <Form.Control type='radio'
                onChange={props.onChange} 
                name={props.name} 
                checked={props.checked} 
                value={props.value} />
        );

    }, [props]);

    return (
        <Form.Group className="inputRadio" as={props.as}>
            <Form.Label>
                {input}
                {props.label}
            </Form.Label>
        </Form.Group>
    );

};
