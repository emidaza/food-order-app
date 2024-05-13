
export default function Input({ label, id, inputValue, onChange, onBlur, hasError, ...props }) {
    return <div className="control">
        <label htmlFor={id}>{label}</label>
        <input value={inputValue} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} id={id} {...props} />
        {hasError && <span>{'This field is invalid'}</span>}
    </div>
}