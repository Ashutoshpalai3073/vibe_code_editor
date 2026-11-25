"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
}

export async function signInWithGithub() {
  await signIn("github", { redirectTo: DEFAULT_LOGIN_REDIRECT });
}
