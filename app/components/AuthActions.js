"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { hasAuth0Config } from "./AuthProviderShell";

export function AuthLoginPanel() {
  if (!hasAuth0Config) {
    return <DemoAuthFallback />;
  }

  return <Auth0LoginPanel />;
}

export function AuthSignupButton({ className, children = "Create account" }) {
  if (!hasAuth0Config) {
    return (
      <Link className={className} href="/account/">
        {children}
      </Link>
    );
  }

  return <Auth0SignupButton className={className}>{children}</Auth0SignupButton>;
}

export function AuthMemberBadge() {
  if (!hasAuth0Config) {
    return (
      <Link className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#173f35]" href="/account/">
        Signed in as Demo Learner
      </Link>
    );
  }

  return <Auth0MemberBadge />;
}

export function AuthGate({ children }) {
  if (!hasAuth0Config) {
    return (
      <>
        <DemoModeBanner />
        {children}
      </>
    );
  }

  return <Auth0Gate>{children}</Auth0Gate>;
}

function Auth0LoginPanel() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();

  if (isLoading) {
    return <AuthCard title="Checking session..." body="Please wait while IQRA checks your member session." />;
  }

  if (isAuthenticated) {
    return (
      <div className="rounded-3xl bg-[#f7f7f2] p-5">
        <p className="text-sm font-semibold text-black/45">Signed in</p>
        <p className="mt-2 text-2xl font-semibold">{user?.name || user?.email || "IQRA member"}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/dashboard/">
            Continue to dashboard
          </Link>
          <button
            className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            type="button"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#f7f7f2] p-5">
      <p className="text-sm font-semibold text-black/45">Auth0 is configured</p>
      <p className="mt-2 text-2xl font-semibold">Use secure login to enter IQRA.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white"
          onClick={() => loginWithRedirect()}
          type="button"
        >
          Sign in with Auth0
        </button>
        <button
          className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold"
          onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
          type="button"
        >
          Create account
        </button>
      </div>
    </div>
  );
}

function Auth0SignupButton({ className, children }) {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className={className}
      onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
      type="button"
    >
      {children}
    </button>
  );
}

function Auth0MemberBadge() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

  if (isLoading) {
    return <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/40">Checking session...</span>;
  }

  if (!isAuthenticated) {
    return (
      <button
        className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#173f35]"
        onClick={() => loginWithRedirect()}
        type="button"
      >
        Sign in to protect access
      </button>
    );
  }

  return (
    <Link className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#173f35]" href="/account/">
      Signed in as {user?.name || user?.email || "IQRA member"}
    </Link>
  );
}

function Auth0Gate({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <AuthCard title="Checking member access..." body="IQRA is verifying your session before loading this area." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Protected route</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em]">
          Sign in to access this member area.
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-black/55">
          Auth0 is configured, so IQRA can now require a real member session before showing this page.
        </p>
        <button
          className="mt-6 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white"
          onClick={() => loginWithRedirect()}
          type="button"
        >
          Sign in with Auth0
        </button>
      </div>
    );
  }

  return children;
}

function DemoAuthFallback() {
  return (
    <div className="rounded-3xl bg-[#f7f7f2] p-5">
      <p className="text-sm font-semibold text-black/45">Auth0 not configured yet</p>
      <p className="mt-2 text-2xl font-semibold">Demo login is still active.</p>
      <p className="mt-2 text-sm leading-6 text-black/55">
        Add `NEXT_PUBLIC_AUTH0_DOMAIN` and `NEXT_PUBLIC_AUTH0_CLIENT_ID` in GitHub to switch this page to real Auth0 login.
      </p>
      <Link className="mt-5 inline-block rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/dashboard/">
        Continue demo flow
      </Link>
    </div>
  );
}

function DemoModeBanner() {
  return (
    <div className="mt-6 rounded-2xl border border-[#b15e35]/20 bg-[#fff8f3] p-4 text-sm leading-6 text-[#7a3f22]">
      Demo auth mode is active. Add Auth0 public environment values in GitHub to require real sign-in for this area.
    </div>
  );
}

function AuthCard({ title, body }) {
  return (
    <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm">
      <h1 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-black/55">{body}</p>
    </div>
  );
}
