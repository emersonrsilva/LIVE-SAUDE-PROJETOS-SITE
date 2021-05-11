import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export function Select(props){

    const [input, setInput] = useState();

    useEffect(() => {

        setInput(
            <Form.Control as='select'
                onChange={props.onChange} 
                placeholder={props.placeholder} 
                name={props.name}
                value={props.value}>
                {props.options.map((e, i) => <option key={i} value={e[0]}>{e[1]}</option>)}
            </Form.Control>
        );
    
    }, [props]);

    return (
        <Form.Group as={props.as}>
            {(props.label) && <Form.Label>{props.label}</Form.Label>}
            {input}
        </Form.Group>
    );

};
