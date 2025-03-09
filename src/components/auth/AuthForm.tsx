import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GoogleSignInButton from "./GoogleSignInButton";
import { useNavigate } from "react-router-dom";
// Importa i hook di Clerk
import { useSignIn, useSignUp, useClerk } from "@clerk/clerk-react";

interface AuthFormProps {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Hook di Clerk: per il sign in e per il sign up
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  // Ottieni l'istanza di Clerk per gestire la sessione
  const clerk = useClerk();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validazione dei campi
    if (!email || !password) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi richiesti",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      toast({
        title: "Errore",
        description: "Le password non corrispondono",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "signin") {
        // Tentativo di autenticazione con Clerk per il sign in
        const result = await signIn.create({ identifier: email, password });
        if (result.status === "complete") {
          // Imposta la sessione utilizzando setActive
          await clerk.setActive({ session: result.createdSessionId });
          toast({
            title: "Accesso effettuato",
            description: "Ben tornato!",
          });
          navigate("/dashboard");
        }
      } else {
        // Tentativo di registrazione con Clerk per il sign up
        const result = await signUp.create({ emailAddress: email, password });
        // Se la registrazione è completa, imposta la sessione
        if (result.status === "complete" && result.createdSessionId) {
          await clerk.setActive({ session: result.createdSessionId });
          toast({
            title: "Account creato",
            description: "Il tuo account è stato creato con successo",
          });
          navigate("/dashboard");
        } else {
          // Se sono necessari ulteriori step (es. verifica email) potresti voler gestire la logica qui
          toast({
            title: "Registrazione in corso",
            description: "Controlla la tua email per completare la registrazione.",
          });
        }
      }
    } catch (error: any) {
      console.error("Errore di autenticazione:", error);
      toast({
        title: "Autenticazione fallita",
        description:
          error.errors ? error.errors[0].message : "Si è verificato un problema. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === "signin" ? "Sign In" : "Create Account"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="auth-input pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="auth-input pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mode === "signup" && (
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="auth-label">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="auth-input pl-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>
        )}
        <button type="submit" className="auth-button w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {mode === "signin" ? "Signing in..." : "Creating account..."}
            </span>
          ) : (
            <span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
          )}
        </button>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="mt-6">
          <GoogleSignInButton isLoading={isLoading} />
        </div>
      </div>
      <div className="mt-6 text-center text-sm">
        {mode === "signin" ? (
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-theme-orange hover:text-theme-orange-light font-medium">
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a href="/signin" className="text-theme-orange hover:text-theme-orange-light font-medium">
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
