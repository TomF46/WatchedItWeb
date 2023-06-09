import PropTypes from "prop-types";

const PasswordInput = ({
    name,
    label,
    onChange,
    placeholder,
    value,
    error,
    showLabel
}) => {
    return (
        <div className="field">
            {showLabel && (
                <label 
                    className="block mb-1 font-bold text-xs text-primary"
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            <div className="control">
                <input
                    type="password"
                    name={name}
                    className="border border-gray-500 focus:outline-none focus:border-primary p-2 w-full bg-backgroundOffset2 rounded"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                    required
                />
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
                )}
            </div>
        </div>
    );
};

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    showLabel: PropTypes.bool.isRequired
};

export default PasswordInput;
