import React from "react";
import Select from 'react-select';
import './Style.css';
import makeAnimated from 'react-select/animated';
const Category = ({ onChange, value, options }) => {
    // Ensure options are in the format [{ value: 'category1', label: 'Category 1' }, ...]
    const formattedOptions = options?.map(option => ({ value: option, label: option }));

    // Convert the value from an array of strings to an array of { value, label } objects
    const formattedValue = value?.map(val => ({ value: val, label: val }));
    const animatedComponents = makeAnimated();
    return (
        <>
            <Select
                isMulti
                name="categories"
                components={animatedComponents}
                onChange={(selectedOptions) => onChange(selectedOptions?.map(option => option.value))}
                value={formattedValue}
                options={formattedOptions}
                className="basic-multi-select"
                classNamePrefix="select-categories"
            />
        </>
    );
};

export default Category;
