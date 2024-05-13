import { useState } from "react";

export default function useInput(initialValue, validators) {
    const [inputValue, setInput] = useState({
        value: initialValue,
        didEdit: false
    });

    const valueIsValid = validators.length ? !validators.some(validator => !validator(inputValue.value)) : true;

    function handleInputChange(value) {
        setInput(prev => ({ ...prev, value: value, didEdit: false }));
    }

    function handleBlur() {
        setInput(prev => ({ ...prev, didEdit: true }));
    }

    return {
        input: inputValue,
        onChange: handleInputChange,
        onBlur: handleBlur,
        hasError: inputValue.didEdit && !valueIsValid
    }
}