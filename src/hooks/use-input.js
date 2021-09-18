import {useState} from "react";

function useInput (validateFunction, enteredPassword)  {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    let valueIsValid = validateFunction(enteredValue, enteredPassword);
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
        valueIsValid,
        valueChangeHandler,
        valueInputBlurHandler
    }
}

export default useInput;