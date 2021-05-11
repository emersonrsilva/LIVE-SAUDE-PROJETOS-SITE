import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export function Checkbox(props){

    const [input, setInput] = useState();
    
    useEffect(() => {

        setInput(
            <Form.Control type='checkbox'
                onChange={props.onChange} 
                name={props.name} 
                checked={props.checked} 
                value={props.value} />
        );

    }, [props]);

    return (
        <Form.Group as={props.as}>
            {(props.label) && <Form.Label>{props.label}</Form.Label>}
            {input}
        </Form.Group>
    );

};
