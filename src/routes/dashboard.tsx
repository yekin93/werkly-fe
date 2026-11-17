import { createFileRoute } from '@tanstack/react-router'
import { CustomerDashboard } from '../features/service-requests/components/dashboard'
export const Route=createFileRoute('/dashboard')({component:CustomerDashboard})
