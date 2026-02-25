import { AuthProvider } from '@/components/auth-provider';
import { LoginForm } from '@/components/auth/login-form';

export default function TeamLoginPage() {
  return (
    <AuthProvider>
        <LoginForm
            userType="team"
            title="Team Portal"
            description="Restricted access. For authorized personnel only."
            demoEmail="team@flux.com"
        />
    </AuthProvider>
  );
}
