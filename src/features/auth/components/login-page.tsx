import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { demoAccounts, demoPassword } from '../../../data/mock/demo-accounts'
import { repositories } from '../../../services/repositories'
import type { LoginInput } from '../../../types/auth'
import type { ProtectedPath } from '../access'
import { loginSchema } from '../schemas/auth'
import { AuthField } from './auth-fields'
import { AuthLayout } from './auth-layout'
import { useDemoSession } from './demo-session'

export function LoginPage({ next, category }: { next?: ProtectedPath; category?: string }) {
  const [error, setError] = useState('')
  const { authenticate } = useDemoSession()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' },
  })

  async function submit(values: LoginInput) {
    setError('')
    try {
      await authenticate(() => repositories.auth.login(values))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Die Demo-Anmeldung ist fehlgeschlagen.')
    }
  }

  return <AuthLayout title="Bei Werkly anmelden" description="Öffne deinen Kunden- oder Betriebsbereich.">
    <form className="auth-form" onSubmit={handleSubmit(submit)} noValidate>
      <AuthField label="E-Mail-Adresse" type="email" autoComplete="username" error={errors.email?.message} {...register('email')} />
      <AuthField label="Passwort" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />
      <a className="auth-link" href="#demo-passwort">Passwort vergessen?</a>
      {error && <p className="error-message" role="alert">{error}</p>}
      <button type="submit" className="button" disabled={isSubmitting}>{isSubmitting ? 'Anmeldung läuft …' : 'Anmelden'}</button>
    </form>
    <details className="auth-demo-accounts" id="demo-passwort" open>
      <summary>Demo-Konto auswählen</summary>
      <p>Das öffentliche Demo-Passwort lautet <code>{demoPassword}</code>. Ein Passwort-Reset ist in der Demo nicht verfügbar.</p>
      <div>{demoAccounts.map(account => <button key={account.email} type="button" className="button button-secondary" disabled={isSubmitting} onClick={() => {
        setValue('email', account.email, { shouldValidate: true })
        setValue('password', demoPassword, { shouldValidate: true })
        setError('')
      }}>{account.label}</button>)}</div>
    </details>
    <div className="auth-links"><Link to="/register" search={{ next, category }}>Als Kund:in registrieren</Link><Link to="/register/business">Als Betrieb registrieren</Link></div>
  </AuthLayout>
}
