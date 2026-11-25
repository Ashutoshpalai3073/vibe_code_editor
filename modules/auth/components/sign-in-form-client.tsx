"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  signInWithGithub,
  signInWithGoogle,
} from "@/modules/auth/actions/sign-in";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.5-1.14 2.77-2.4 3.62v3.01h3.88c2.27-2.09 3.54-5.17 3.54-9.37z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.01c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.26v3.11C3.23 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.61H1.26A11.93 11.93 0 0 0 0 12c0 1.92.46 3.74 1.26 5.39l4.02-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.23 2.7 1.26 6.61l4.02 3.11c.95-2.85 3.6-4.97 6.72-4.97z"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  );
}

function ProviderButton({
  provider,
  children,
}: {
  provider: string;
  children: ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? (
        <LoaderCircle
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      ) : (
        children
      )}
      <span>
        {pending ? `Connecting to ${provider}...` : `Sign in with ${provider}`}
      </span>
    </Button>
  );
}

const errorMessages: Record<string, string> = {
  AccessDenied: "Sign-in was denied. Please try again or use another account.",
  OAuthAccountNotLinked:
    "This email is already associated with another sign-in provider. Use the provider you originally signed in with.",
  OAuthCallback:
    "The provider could not complete sign-in. Check its OAuth callback URL and try again.",
  OAuthSignin: "Could not start provider sign-in. Please try again.",
  Configuration:
    "Sign-in is temporarily unavailable. Check the server authentication configuration.",
};

const SignInFormClient = () => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error") ?? undefined;
  const errorMessage = errorCode
    ? errorMessages[errorCode] ?? "Sign-in failed. Please try again."
    : undefined;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {errorMessage && (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {errorMessage}
          </p>
        )}
        <form action={signInWithGoogle}>
          <ProviderButton provider="Google">
            <GoogleIcon className="mr-2 h-4 w-4" />
          </ProviderButton>
        </form>
        <form action={signInWithGithub}>
          <ProviderButton provider="GitHub">
            <GithubIcon className="mr-2 h-4 w-4" />
          </ProviderButton>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;