import * as React from 'react';

export default (props: any) => {
    let styles = {
        form: {
            display: 'flex'
        }, 
        input: {
            width: '100%',
            padding: '10px',
            borderColor: props.inputError ? 'red' : 'initial'
        },
        button: {
            margin: '0',
            padding: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    };
    return (
        <form 
            style={styles.form}
            onSubmit={props.handleSubmitForm}
        >
            <input style={styles.input} type="text" onChange={props.handleInputChange} value={props.inputValue}/>
            <button style={styles.button}><i className="fa fa-save" /></button>
        </form>
    );
};