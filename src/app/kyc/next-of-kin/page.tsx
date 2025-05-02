'use client';

import { useRouter } from 'next/navigation';
import { GenericButton } from '@/components/general/Button';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { Loader2 } from 'lucide-react';
import Select from '@/components/general/Select';

export default function NextOfKinPage() {
  const [isPending, startTransition] = useTransition();
  const [signUpData, setSignUpData] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    relationship: '',
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

  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full h-full px-6 my-20 md:my-0">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <p className="text-[#02364B] font-semibold text-2xl md:text-3xl">
            Next of Kin
          </p>
          <p className="text-gray-600">
            Provide your next of kin information to complete the KYC process. 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-[#f3f3f3] shadow-sm rounded-sm border border-primary">
              <p className='text-sm text-gray-500 mb-1'>Person 1</p>
              <p className='text-[15px] font-medium text-primary'></p>
            </div>
            <div className="p-4 bg-[#f3f3f3] shadow-sm rounded-sm">
              <p className='text-sm text-gray-500 mb-1'>Person 2</p>
              <p className='text-[15px] font-medium text-primary'></p>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-8 place-content-center w-full md:w-[500px]"
        >
          <div className="flex flex-col items-center gap-[18px] w-full text-[15px]">
            <div className="grid grid-cols-1 gap-x-10 gap-y-[18px] w-full">
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

              <Select
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
                selectedValue=""
                placeholder="Gender"
                onChange={() => {}}
              />
              <div className="flex flex-col gap-1 w-full">
                <input
                  placeholder="0802 345 6789"
                  className={`border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  {...register('phoneNumber', {
                    required: true,
                    validate: (value) => validator.isMobilePhone(value),
                  })}
                />
                {errors?.phoneNumber && (
                  <p className="text-red-400 text-sm">
                    {errors.phoneNumber?.type === 'required' &&
                      'Phone Number is required'}
                    {errors.phoneNumber?.type === 'validate' &&
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
                    {errors.email?.type === 'validate' && 'Email must be valid'}
                  </p>
                )}
              </div>
              <Select
                options={[
                  { label: 'Father', value: 'father' },
                  { label: 'Mother', value: 'mother' },
                  { label: 'Brother', value: 'brother' },
                  { label: 'Sister', value: 'sister' },
                  { label: 'Spouse', value: 'spouse' },
                ]}
                selectedValue=""
                placeholder="Relationship"
                onChange={() => {}}
              />
            </div>

            <GenericButton
              type="submit"
              className="bg-[#02364B] mt-6 !w-full cursor-pointer"
              onClick={() => {
                router.push('/dashboard');
              }}
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6" />
                </div>
              ) : (
                'Submit'
              )}
            </GenericButton>
          </div>
        </form>
      </div>
    </div>
  );
}
