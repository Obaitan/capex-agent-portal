'use client';

import { GenericButton } from '@/components/general/Button';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import validator from 'validator';
import { SignupData } from '@/types';
import { Loader2 } from 'lucide-react';
import Select from '@/components/general/Select';

export default function SignupPage() {
  const [isPending, startTransition] = useTransition();
  const [signUpData, setSignUpData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signUpData,
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      setSignUpData(data);
      // do something
    });
  });

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center gap-9">
          <p className="font-semibold text-3xl text-primary">Sign Up</p>
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-8 w-full"
          >
            <div className="flex flex-col items-center gap-[18px] w-full md:w-[550px] text-[15px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 md:gap-y-[18px] w-full">
                <div className="flex flex-col gap-1 w-full">
                  <input
                    placeholder="First Name"
                    className={`border-b border-b-gray-300 w-full px-2.5 h-9 
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light 
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                    {...register('firstName', {
                      required: true,
                      minLength: 2,
                      maxLength: 40,
                    })}
                  />
                  {errors?.firstName && (
                    <p className="text-red-400 text-sm">
                      {errors?.firstName?.type === 'minLength' &&
                        'First Name must contain at least 2 characters'}
                      {errors.firstName?.type === 'maxLength' &&
                        'First Name must contain maximum of 40 characters'}
                      {errors.firstName?.type === 'required' &&
                        'First Name is required'}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    placeholder="Last Name"
                    className={`border-b border-b-gray-300 w-full px-2.5 h-9 
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light 
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                    {...register('lastName', {
                      required: true,
                      minLength: 2,
                      maxLength: 40,
                    })}
                  />
                  {errors?.lastName && (
                    <p className="text-red-400 text-sm">
                      {errors?.lastName?.type === 'minLength' &&
                        'Last Name must contain at least 2 characters'}
                      {errors.lastName?.type === 'maxLength' &&
                        'Last Name must contain maximum of 40 characters'}
                      {errors.lastName?.type === 'required' &&
                        'Last Name is required'}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    placeholder="0802 345 6789"
                    className={`border-b border-b-gray-300 w-full px-2.5 h-9 
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light 
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                    {...register('phoneNo', {
                      required: true,
                      validate: (value) => validator.isMobilePhone(value),
                    })}
                  />
                  {errors?.phoneNo && (
                    <p className="text-red-400 text-sm">
                      {errors.phoneNo?.type === 'required' &&
                        'Phone Number is required'}
                      {errors.phoneNo?.type === 'validate' &&
                        'Phone Number must be valid'}
                    </p>
                  )}
                </div>
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
                      validate: (value) => validator.isEmail(value),
                    })}
                  />
                  {errors?.email && (
                    <p className="text-red-400 text-sm">
                      {errors.email?.type === 'required' && 'Email is required'}
                      {errors.email?.type === 'validate' &&
                        'Email must be valid'}
                    </p>
                  )}
                </div>
                <div className="col-span-full flex flex-col gap-1 w-full">
                  <input
                    placeholder="Office Address"
                    className={`border-b border-b-gray-300 w-full px-2.5 h-9 
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light 
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                    {...register('address', {
                      required: true,
                      validate: (value) => validator.isEmail(value),
                    })}
                  />
                  {errors?.address && (
                    <p className="text-red-400 font-medium text-sm">
                      {errors.address.type === 'required' &&
                        'Address is required'}
                    </p>
                  )}
                </div>
                <Select
                  options={[
                    { label: 'Lagos', value: 'lagos' },
                    { label: 'Ogun', value: 'ogun' },
                  ]}
                  selectedValue=""
                  placeholder="State"
                  onChange={() => {}}
                />
                <Select
                  options={[
                    { label: 'Ikeja', value: 'ikeja' },
                    { label: 'VI', value: 'vi' },
                    { label: 'Shagamu', value: 'shagamu' },
                    { label: 'Abeokuta', value: 'abeokuta' },
                  ]}
                  selectedValue=""
                  placeholder="City"
                  onChange={() => {}}
                />
                <div className="col-span-full mt-2 px-2.5">
                  <p className="text-gray-800 font-medium">Agency Manager</p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    placeholder="Name"
                    className={`border-b border-b-gray-300 w-full px-2.5 h-9 
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light 
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    placeholder="0802 345 6789"
                    className={`border-b border-b-gray-300 w-full px-2.5 h-9 
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light 
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  />
                </div>
              </div>

              <GenericButton
                type="submit"
                className="bg-[#02364B] mt-6 !w-full cursor-pointer"
              >
                {isPending ? (
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6" />
                  </div>
                ) : (
                  'Create Account'
                )}
              </GenericButton>
              <p className="text-gray-700 text-base font-normal">
                Already have an account?
                <Link href={'/auth/signin'}>
                  <span className="text-blue-900 font-medium ml-2 hover:underline-offset-1 hover:underline">
                    Sign In
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
