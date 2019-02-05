import React from 'react';
import Type from 'prop-types';

import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    let inputLabel = null;
    let inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case 'input':
            inputElement = 
                <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.handler}/>
            break;

        case 'textarea':
            inputElement = 
                <textarea 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.handler}/>
            break;
        
        case 'select':
            inputElement = 
                <select 
                    value={props.value}
                    onChange={props.handler}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value} 
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
        break;

        default: 
            inputElement = 
                <input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}/>;
    }

    if (props.label) {
        inputLabel = <label className={classes.Label}>{props.label}</label>;
    }

    return (
        <div className={classes.Input}>
            {inputLabel}
            {inputElement}
        </div>
    )
}

Input.propTypes = {
    value: Type.string,
    handler: Type.func.isRequired,
    label: Type.string,
    invalid: Type.bool,
    shouldValidate: Type.object
}

export default Input;
