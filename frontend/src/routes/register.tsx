import { createFileRoute, Link } from '@tanstack/react-router'
import { RegisterForm } from '#/features/auth/components/RegisterForm'
import { Card } from '#/shared/components/Card'

export const Route = createFileRoute('/register')({ component: RegisterPage })

function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h1>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </Card>
    </div>
  )
}
