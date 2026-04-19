type ContactFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function ContactField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
}: ContactFieldProps) {
  return (
    <div className="relative">
      <div className={`floating-field ${error ? "floating-field-error" : ""}`}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="floating-input peer"
        />
        <label htmlFor={name} className="floating-label">
          {label}
        </label>
      </div>

      {error ? <p className="input-error-text">{error}</p> : null}
    </div>
  );
}
