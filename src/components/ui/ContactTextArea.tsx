type ContactTextareaProps = {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function ContactTextarea({
  label,
  name,
  value,
  error,
  onChange,
}: ContactTextareaProps) {
  return (
    <div className="relative">
      <div
        className={`floating-field ${error ? "floating-field-error" : ""} min-h-[180px]`}
      >
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="floating-textarea peer"
        />
        <label
          htmlFor={name}
          className="floating-label floating-label-textarea"
        >
          {label}
        </label>
      </div>

      {error ? <p className="input-error-text">{error}</p> : null}
    </div>
  );
}
