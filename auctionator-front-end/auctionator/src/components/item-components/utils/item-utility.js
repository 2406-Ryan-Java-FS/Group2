import React, { useState } from 'react';

// Utility function to capitalize words in a sentence
function capitalizeWords(sentence) {
    return sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Utility function to change the status from boolean to string
function changeStatus(status) {
    return status === 'true' ? 'Sold' : 'Available';
}

// EditableCell component definition
function EditableCell({ value: initialValue, onChange, onEnter }) {
    // Using useState to manage the cell's value state
    const [value, setValue] = useState(initialValue);

    // Handler for changes in the input field
    const handleChange = (e) => {
        const newValue = e.target.value; // Get the new value from the input event
        setValue(newValue); // Update the state with the new value
        onChange(newValue); // Call the onChange callback with the new value
    };

    // Handler for keydown events in the input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { // Check if the Enter key was pressed
            onEnter(); // Call the onEnter callback
        }
    };

    return (
        <input
            value={value} // Set the input field's value to the state value
            onChange={handleChange} // Attach the handleChange function to the onChange event
            onKeyDown={handleKeyDown} // Attach the handleKeyDown function to the onKeyDown event
            style={{ width: '70%' }}
        />
    );
}
// Export the functions using named exports
export { capitalizeWords, changeStatus, EditableCell };