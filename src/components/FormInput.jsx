import { useState } from 'react'

const icons = {
  user: (
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6.5" r="3" strokeWidth="1.35" />
      <path d="M4.2 16.2c.3-2.7 2.6-4.4 5.8-4.4s5.5 1.7 5.8 4.4" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 20 20" fill="none">
      <rect x="3.2" y="4.5" width="13.6" height="11" rx="2" strokeWidth="1.35" />
      <path d="m4.2 6 5.8 4.5L15.8 6" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 20 20" fill="none">
      <rect x="4.3" y="8.6" width="11.4" height="8.1" rx="1.8" strokeWidth="1.35" />
      <path d="M6.7 8.5V6.2a3.3 3.3 0 0 1 6.6 0v2.3m-3.3 3.1v2" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  ),
}

function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  icon,
  error,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type
  const errorId = `${name}-error`

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrap">
        <span className="input-icon" aria-hidden="true">{icons[icon]}</span>
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {isPassword && (
          <button
            className="password-toggle"
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 3 17 17M8.6 8.7a2 2 0 0 0 2.7 2.7M6.1 6.2A9.2 9.2 0 0 0 2.5 10s2.7 5 7.5 5c1.2 0 2.3-.3 3.2-.7m1.6-1.2a9.8 9.8 0 0 0 2.7-3.1s-2.7-5-7.5-5c-.6 0-1.2.1-1.8.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M2.5 10s2.7-5 7.5-5 7.5 5 7.5 5-2.7 5-7.5 5-7.5-5-7.5-5Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.35" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  )
}

export default FormInput
