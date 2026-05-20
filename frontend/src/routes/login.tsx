import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginForm } from '#/features/auth/components/LoginForm'
import { Card } from '#/shared/components/Card'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Registrate</Link>
        </p>
      </Card>
    </div>
  )
}
