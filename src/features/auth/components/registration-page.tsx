import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { launchRegion, regions } from '../../../config/regions'
import { useCategories } from '../../../hooks/use-marketplace'
import { repositories } from '../../../services/repositories'
import type { BusinessRegistrationInput } from '../../../types/auth'
import type { ProtectedPath } from '../access'
import { businessSchema, customerFormSchema } from '../schemas/auth'
import { AuthField } from './auth-fields'
import { AuthLayout } from './auth-layout'
import { useDemoSession } from './demo-session'

export function RegistrationPage({ business = false, next, category }: {
  business?: boolean
  next?: ProtectedPath
  category?: string
}) {
  const [error, setError] = useState('')
  const { authenticate } = useDemoSession()
  const categories = useCategories()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BusinessRegistrationInput>({
    resolver: zodResolver(business ? businessSchema : customerFormSchema),
    defaultValues: {
      firstName: '', lastName: '', email: '', password: '', confirmation: '',
      consent: false, businessName: '', categoryIds: [], regionId: launchRegion.id,
    },
  })

  async function submit(values: BusinessRegistrationInput) {
    setError('')
    try {
      await authenticate(() => business ? repositories.auth.registerBusiness(values) : repositories.auth.registerCustomer(values))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Die Demo-Registrierung ist fehlgeschlagen.')
    }
  }

  return <AuthLayout business={business} title={business ? 'Als Betrieb registrieren' : 'Als Kund:in registrieren'} description="Erstelle ein Demo-Profil für diese Sitzung.">
    <form className="auth-form" onSubmit={handleSubmit(submit)} noValidate>
      {business && <AuthField label="Betriebsname" autoComplete="organization" error={errors.businessName?.message} {...register('businessName')} />}
      <div className="auth-name-fields">
        <AuthField label={business ? 'Vorname der Kontaktperson' : 'Vorname'} autoComplete="given-name" error={errors.firstName?.message} {...register('firstName')} />
        <AuthField label={business ? 'Nachname der Kontaktperson' : 'Nachname'} autoComplete="family-name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <AuthField label={business ? 'Geschäftliche E-Mail-Adresse' : 'E-Mail-Adresse'} type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <AuthField label="Passwort" type="password" autoComplete="new-password" aria-describedby="password-rules" error={errors.password?.message} {...register('password')} />
      <p id="password-rules" className="auth-help">Mindestens 12 Zeichen mit Groß- und Kleinbuchstaben, Zahl und Sonderzeichen.</p>
      <AuthField label="Passwort bestätigen" type="password" autoComplete="new-password" error={errors.confirmation?.message} {...register('confirmation')} />
      {business && <>
        <fieldset className="field auth-categories" aria-describedby={errors.categoryIds ? 'category-error' : undefined}>
          <legend className="field-label">Welche Leistungen bietest du an?</legend>
          {categories.isPending && <p role="status">Leistungen werden geladen …</p>}
          {categories.isError && <button type="button" onClick={() => void categories.refetch()}>Leistungen erneut laden</button>}
          {categories.data?.map(service => <label key={service.id}><input type="checkbox" value={service.id} {...register('categoryIds')} />{service.name}</label>)}
          {errors.categoryIds?.message && <p id="category-error" className="error-message" role="alert">{errors.categoryIds.message}</p>}
        </fieldset>
        <label className="field"><span className="field-label">Einsatzregion</span>
          <select aria-invalid={!!errors.regionId} aria-describedby={errors.regionId ? 'region-error' : undefined} {...register('regionId')}>
            {regions.filter(region => region.active).map(region => <option value={region.id} key={region.id}>{region.name}</option>)}
          </select>
        </label>
        {errors.regionId && <p id="region-error" className="error-message" role="alert">{errors.regionId.message}</p>}
      </>}
      <p className="auth-help">Das Profil ist vorübergehend. Eine spätere Anmeldung mit diesem Passwort ist in der Demo nicht möglich.</p>
      <div className="auth-consent">
        <label><input type="checkbox" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} {...register('consent')} /> Ich stimme den Demo-Nutzungsbedingungen zu und habe die Datenschutzhinweise gelesen.</label>
        <span><a href="#demo-bedingungen">Demo-Nutzungsbedingungen</a> · <Link to="/datenschutz" target="_blank" rel="noreferrer">Datenschutzhinweise (neuer Tab)</Link></span>
        {errors.consent && <p id="consent-error" className="error-message" role="alert">{errors.consent.message}</p>}
      </div>
      {error && <p className="error-message" role="alert">{error}</p>}
      <button type="submit" className="button" disabled={isSubmitting || (business && !categories.data)}>{isSubmitting ? 'Profil wird erstellt …' : 'Demo-Profil erstellen'}</button>
    </form>
    <div className="auth-links"><Link to="/login" search={{ next, category }}>Zur Anmeldung</Link>{business ? <Link to="/register">Als Kund:in registrieren</Link> : <Link to="/register/business">Als Betrieb registrieren</Link>}</div>
    <p id="demo-bedingungen" className="auth-help"><strong>Demo-Nutzungsbedingungen:</strong> Verwende nur erfundene Angaben. Die Demo dient zum Ausprobieren. Sie vermittelt keine echten Aufträge.</p>
  </AuthLayout>
}
