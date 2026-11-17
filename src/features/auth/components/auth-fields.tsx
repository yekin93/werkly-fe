import { useId, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function AuthField({ label, error, type = 'text', ...input }: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const password = type === 'password'
  return <div className="field">
    <label htmlFor={id} className="field-label">{label}</label>
    <div className={password ? 'auth-password' : undefined}>
      <input {...input} id={id} type={password && visible ? 'text' : type} aria-invalid={!!error} aria-describedby={error ? id + '-error' : input['aria-describedby']} />
      {password && <button type="button" aria-label={visible ? label + ' ausblenden' : label + ' anzeigen'} aria-controls={id} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
    </div>
    {error && <p id={id + '-error'} className="error-message" role="alert">{error}</p>}
  </div>
}
