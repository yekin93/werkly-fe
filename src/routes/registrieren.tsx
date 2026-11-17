import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/registrieren')({
  validateSearch: (search: Record<string, unknown>) => ({ role: search.role === 'BUSINESS' ? 'BUSINESS' : undefined }),
  beforeLoad: ({ search }) => { throw redirect({ to: search.role === 'BUSINESS' ? '/register/business' : '/register' }) },
})
