import { useState } from 'react'
import FormInput from './FormInput'

const initialForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3.8c2.7 3.1 4.2 5.8 4.2 8.1a4.2 4.2 0 1 1-8.4 0c0-2.3 1.5-5 4.2-8.1Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 15.8c1.6 2.3 3.7 3.5 6.5 3.5s4.9-1.2 6.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function BenefitIcon({ children }) {
  return <span className="benefit-icon" aria-hidden="true">{children}</span>
}

function SignupForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState('')

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((currentErrors) => {
      if (!currentErrors[name] && !(name === 'password' && currentErrors.confirmPassword)) {
        return currentErrors
      }
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      if (name === 'password') delete nextErrors.confirmPassword
      return nextErrors
    })
    if (successMsg) setSuccessMsg('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}

    if (!form.username.trim()) {
      nextErrors.username = 'Please enter your name.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (form.password.length < 6) {
      nextErrors.password = 'Use at least 6 characters for your password.'
    }

    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Your passwords do not match.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSuccessMsg('Your account is ready. Welcome to the club.')
      setForm(initialForm)
    }
  }

  return (
    <main className="page-shell">
      <section className="signup-layout" aria-label="Create your account">
        <aside className="brand-panel">
          <a className="brand-lockup" href="#home" aria-label="Maison home">
            <BrandMark />
            <span>maison.</span>
          </a>

          <div className="brand-copy">
            <span className="eyebrow">A more considered life</span>
            <h1>Make room for <em>the good.</em></h1>
            <p>
              Thoughtful things, beautiful ideas, and a little more inspiration
              in your everyday.
            </p>
            <ul className="benefit-list">
              <li>
                <BenefitIcon>
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="m5 10.2 3.2 3.2L15.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </BenefitIcon>
                Curated stories, made for you
              </li>
              <li>
                <BenefitIcon>
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M10 3.5v13m-4-9.8c0-1.2 1-2.1 2.3-2.1h3.2c1.3 0 2.4.9 2.4 2.1 0 1.3-1.1 2.2-2.4 2.2H8.6c-1.4 0-2.5.9-2.5 2.2s1.1 2.3 2.5 2.3h3.2c1.3 0 2.4-1 2.4-2.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </BenefitIcon>
                First access to member-only finds
              </li>
              <li>
                <BenefitIcon>
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M10 16.2s-6-3.5-6-8a3.3 3.3 0 0 1 6-1.9 3.3 3.3 0 0 1 6 1.9c0 4.5-6 8-6 8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </BenefitIcon>
                A quieter kind of inbox
              </li>
            </ul>
          </div>

          <div className="brand-bottom">
            <div className="member-avatars" aria-hidden="true">
              <span>AL</span>
              <span>JM</span>
              <span>SK</span>
              <span>+2k</span>
            </div>
            <span>In good company, always.</span>
          </div>
        </aside>

        <div className="form-panel">
          <div className="form-content">
            <header className="form-heading">
              <span className="eyebrow">Your invitation awaits</span>
              <h2>Create your account</h2>
              <p>A few details, and you're on your way.</p>
            </header>

            {successMsg && (
              <div className="form-success" role="status">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="m4.5 10.2 3.4 3.3 7.6-7.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{successMsg}</span>
              </div>
            )}

            <form className="signup-form" onSubmit={handleSubmit} noValidate>
              <FormInput
                label="Your name"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="How should we call you?"
                autoComplete="name"
                icon="user"
                error={errors.username}
              />
              <FormInput
                label="Email address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                icon="mail"
                error={errors.email}
              />
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                icon="lock"
                error={errors.password}
              />
              <FormInput
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password again"
                autoComplete="new-password"
                icon="lock"
                error={errors.confirmPassword}
              />

              <label className="terms-row">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to the <a href="#terms">Terms of Service</a> and{' '}
                  <a href="#privacy">Privacy Policy</a>.
                </span>
              </label>

              <button className="submit-button" type="submit" disabled={!form.terms}>
                <span>Create my account</span>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <p className="form-footer">
              Already a member? <a href="#sign-in">Sign in</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignupForm
