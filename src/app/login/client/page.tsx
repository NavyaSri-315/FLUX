import { AuthProvider } from '@/components/auth-provider';
import { LoginForm } from '@/components/auth/login-form';

export default function ClientLoginPage() {
  return (
    <AuthProvider>
        <LoginForm
            userType="client"
            title="Client Portal"
            description="Welcome back! Please enter your details."
            demoEmail="client@demo.com"
        />
    </AuthProvider>
  );
}
