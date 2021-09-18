import {useState} from "react";

const useInput = (validateFunction) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateFunction(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }
    const valueInputBlurHandler = () => {
        setIsTouched(true);
    }
    return {
        value: enteredValue,
        hasError,
        valueChangeHandler,
        valueInputBlurHandler
    }
}

export default useInput;