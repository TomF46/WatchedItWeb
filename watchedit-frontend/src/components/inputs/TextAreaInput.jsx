import React from "react";
import PropTypes from "prop-types";

const TextAreaInput = ({ name, label, onChange, placeholder, required, value, error }) => {
    return (
        <div className="field">
            <label
                className="block mb-1 font-bold text-xs text-primary"
                htmlFor={name}
            >
                {label}
            </label>
            <div className="control">
                <textarea
                    name={name}
                    className="resize-y border border-gray-500 min-w-full rounded focus:outline-none focus:shadow-outline bg-backgroundOffset2 p-2"
                    value={value ? value : ""}
                    onChange={onChange}
                    required={required}
                ></textarea>
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
                )}
            </div>
        </div>
    );
};

TextAreaInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextAreaInput;
