const Input = ({ label, type = "text", placeholder, value, onChange, error, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label className="text-sm font-medium text-text-main/80">{label}</label>}
            <input
                type={type}
                className={`px-4 py-2 rounded-lg bg-white border border-green-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-text-main placeholder-gray-400 ${error ? 'border-red-500' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
