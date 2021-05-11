import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export function TextareaEditor(props){

    const [load, setLoad] = useState(false);

    async function onChange(e, editor){

        setLoad(true)

        // let maxLength = props.maxLength ? parseInt(props.maxLength) : 10000;
        // let text = editor.getData();
        
        // // console.log(maxLength)
        // // console.log(text.length)
        
        // if( load === true && text.length > maxLength ){

        //     let newtext = text.substring(0, maxLength)
        //     // console.log(newtext);
        //     editor.setData(newtext);

        //     setLoad(false)
            
        // }
        
        props.onChange(e, editor);
    }

    return (
        <Form.Group as={props.as}>
            {(props.label) && <Form.Label>{props.label}</Form.Label>}

            <CKEditor
                editor={ClassicEditor}
                data={props.value ? props.value : ''}
                //onChange={props.onChange}
                onChange={onChange}
                config={{
                    toolbar: [ 'bold', 'italic', 'link', '|', 'undo', 'redo','bulletedList' ]
                }}
                // onInit={ editor => {
                //     // You can store the "editor" and use when it is needed.
                //     console.log( 'Editor is ready to use!', editor );
                // } }
                // onChange={ ( event, editor ) => {
                //     const data = editor.getData();
                //     console.log( { event, editor, data } );
                // } }
                // onBlur={ ( event, editor ) => {
                //     console.log( 'Blur.', editor );
                // } }
                // onFocus={ ( event, editor ) => {
                //     console.log( 'Focus.', editor );
                // } }
            />

        </Form.Group>
    );

};
