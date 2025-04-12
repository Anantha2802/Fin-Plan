
import { useState } from 'react';
import { SignIn } from '@/components/SignIn';
import { SignUp } from '@/components/SignUp';

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  
  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        {showSignIn ? (
          <SignIn onToggleForm={toggleForm} />
        ) : (
          <SignUp onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Auth;
