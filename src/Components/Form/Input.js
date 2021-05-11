import React from 'react';
import { Form } from 'react-bootstrap';
import InputMask from "react-input-mask";

export function Input(props){

    return (
        <Form.Group as={props.as}>
            {(props.label) && <Form.Label>{props.label}</Form.Label>}

            { props.mask ?
                <InputMask type='text' className='form-control'
                    onChange={props.onChange} 
                    placeholder={props.placeholder} 
                    name={props.name} 
                    defaultValue={props.defaultValue} 
                    value={props.value}
                    mask={props.mask} />
            :
                <Form.Control type={props.type ? props.type : 'text'}
                    readOnly={props.readOnly ? true : false}
                    onChange={props.onChange} 
                    placeholder={props.placeholder} 
                    name={props.name} 
                    defaultValue={props.defaultValue} 
                    value={props.value}
                    maxLength={props.maxLength ? props.maxLength : 255} />
            }
        </Form.Group>
    );

};