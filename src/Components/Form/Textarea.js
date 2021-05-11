import React from 'react';
import { Form } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';

export function Textarea(props){

    return (
        <Form.Group as={props.as}>
            {(props.label) && <Form.Label>{props.label}</Form.Label>}


            <Form.Control as="textarea" 
                readOnly={props.readOnly ? true : false}
                onChange={props.onChange} 
                placeholder={props.placeholder} 
                name={props.name} 
                defaultValue={props.defaultValue} 
                value={props.value}
                maxLength={props.maxLength ? props.maxLength : 3000} />
        </Form.Group>
    );

};