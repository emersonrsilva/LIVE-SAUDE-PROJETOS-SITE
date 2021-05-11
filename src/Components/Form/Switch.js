import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ReactSwitch from "react-switch";

export function Switch(props){

    const [input, setInput] = useState();
    
    useEffect(() => {

        setInput(
            <ReactSwitch 
                onChange={props.onChange} 
                name={props.name} 
                checked={props.checked} />
        );
    
    }, [props]);

    return (
        <Form.Group as={props.as}>
            {(props.label) && <Form.Label>{props.label}</Form.Label>}
            {input}
        </Form.Group>
    );

};
