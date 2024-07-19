import { useState } from "react";

export default function CommentEditableCell({ value: initialValue, onChange, onEnter }) {
    // Using useState to manage the cell's value state
    const [value, setValue] = useState(initialValue);

    // Handler for changes in the input field
    const handleChange = (e) => {
        const newValue = e.target.value; // Get the new value from the input event
        setValue(newValue); // Update the state with the new value
        onChange(newValue); // Call the onChange callback with the new value
    }

    // Handler for keydown events in the input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { // Check if the Enter key was pressed
            onEnter(); // Call the onEnter callback
        }
    }

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
}