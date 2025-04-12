
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface SignInProps {
  onToggleForm: () => void;
}

export function SignIn({ onToggleForm }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Try to login with CSV file first
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        // If CSV login fails, check localStorage
        const existingUsers = localStorage.getItem('users') ? 
          JSON.parse(localStorage.getItem('users') || '[]') : [];
        
        const user = existingUsers.find((u: any) => 
          u.email === email && u.password === password
        );
        
        if (user) {
          // Login the user manually since they exist in localStorage
          localStorage.setItem('user', JSON.stringify({ 
            email: user.email, 
            name: user.name 
          }));
          
          // Redirect to dashboard (window reload will pick up the new user)
          window.location.href = '/';
          return;
        }
        
        setError("Invalid email or password. Please try again or sign up if you don't have an account.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign In to FinPlan Pro</h1>
        <p className="text-muted-foreground mt-2">
          Enter your credentials to access your account
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0" onClick={onToggleForm}>
            Sign Up
          </Button>
        </p>
      </div>
    </div>
  );
}
