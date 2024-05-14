import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { LoginForm } from '@/components/Forms/LoginForm';
import { Logo } from '@/components/Logo';
import { Toaster } from '@/components/ui/toaster';
import { aclonica } from '@/utils';

import { getSession } from '../actions/getSession';

export const metadata: Metadata = {
  title: 'Login | Reading Dashboard',
};

export default async function Login() {
  const session = await getSession();

  if (session) {
    return redirect('/');
  }

  return (
    <>
      <Toaster />
      <header className="w-full pt-14 text-center">
        <Logo />
      </header>

      <main className="mx-auto mt-20 flex w-full max-w-[550px] items-center justify-center font-poppins">
        <div className="flex w-full max-w-[685px] flex-col items-center justify-center rounded-2xl  bg-secondary-background py-9">
          <h2
            className={`inline-block bg-gradient-primary bg-clip-text text-3xl text-transparent ${aclonica.className} `}
          >
            Login
          </h2>

          <LoginForm />
        </div>
      </main>
    </>
  );
}
