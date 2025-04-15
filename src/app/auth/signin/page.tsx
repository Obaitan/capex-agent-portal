'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import validator from 'validator';
import { AgentData } from '@/types';
import { Loader2 } from 'lucide-react';
import { GenericButton } from '@/components/general/Button';

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const [loginData, setLoginData] = useState<Partial<AgentData>>({
    email: '',
    agentCode: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: loginData,
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      setLoginData(data);
      // do something
    });
  });

  return (
    <div className="flex justify-center items-center w-full h-full px-7 py-8">
      <div className="flex flex-col items-center gap-9">
        <div className="text-center space-y-2">
          <p className="text-[#02364B] font-semibold text-2xl md:text-3xl">
            Login
          </p>
          <p className="text-gray-600">
            Enter your email address and agent code to sign in
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-8 place-content-center w-full md:w-[400px]"
        >
          <div className="flex flex-col items-center gap-5 w-full text-[15px]">
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 w-full">
              <div className="flex flex-col gap-1 w-full">
                <input
                  placeholder="Email Address"
                  className={`border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  {...register('email', {
                    required: true,
                    validate: (value) =>
                      typeof value === 'string' && validator.isEmail(value),
                  })}
                />
                {errors?.email && (
                  <p className="text-red-400 text-sm">
                    {errors.email?.type === 'required' && 'Email is required'}
                    {errors.email?.type === 'validate' && 'Email must be valid'}
                  </p>
                )}
              </div>
              <div className="col-span-full flex flex-col gap-1 w-full">
                <input
                  placeholder="Agent Code"
                  className={`border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  {...register('agentCode', {
                    required: true,
                    validate: (value) =>
                      typeof value === 'string' && validator.isEmail(value),
                  })}
                />
                {errors?.agentCode && (
                  <p className="text-red-400 font-medium text-sm">
                    {errors.agentCode.type === 'required' &&
                      'Agent Code is required'}
                  </p>
                )}
              </div>
            </div>

            <Link href={'/auth/otp'} className="inline-block w-full">
              <GenericButton
                type="submit"
                className="bg-[#02364B] mt-6 !w-full cursor-pointer"
              >
                {isPending ? (
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6" />
                  </div>
                ) : (
                  'Get OTP'
                )}
              </GenericButton>
            </Link>

            <p className="text-gray-700 text-base font-normal">
              Already have an account?
              <Link href={'/auth/signup'}>
                <span className="text-blue-900 font-medium ml-2 hover:underline-offset-1 hover:underline">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
