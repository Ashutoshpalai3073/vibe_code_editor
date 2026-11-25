import { Suspense } from "react";
import Image from "next/image";
import SignInFormClient from "@/modules/auth/components/sign-in-form-client";

const Page = () => {
  return (
    <div className="flex w-full flex-col items-center px-4 py-8">
      <Image
        src="/login.svg"
        alt="Illustration of a person signing in"
        height={300}
        width={300}
        priority
        className="m-6 h-auto w-56 object-contain sm:w-72"
      />
      <Suspense
        fallback={
          <div
            className="h-52 w-full max-w-md animate-pulse rounded-xl bg-muted"
            aria-label="Loading sign-in options"
          />
        }
      >
        <SignInFormClient />
      </Suspense>
    </div>
  );
};

export default Page;