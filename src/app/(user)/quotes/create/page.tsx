'use client';

import { useRouter } from 'next/navigation';
import { GenericButton } from '@/components/general/Button';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import validator from 'validator';
import { CreateQuoteForm } from '@/types';
import { Loader2 } from 'lucide-react';
import Select from '@/components/general/Select';

export default function SignupPage() {
  const [isPending, startTransition] = useTransition();
  const [quoteData, setQuoteData] = useState<CreateQuoteForm>({
    product: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    premiumValue: 0,
    policyTerm: '',
    paymentTerm: '',
    // sumAssured: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: quoteData,
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      setQuoteData(data);
      // do something
    });
  });

  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full h-full my-20 md:my-0">
      <div className="flex flex-col items-center justify-center gap-9 w-full">
        <div className="text-center space-y-2">
          <p className="text-[#02364B] font-semibold text-2xl md:text-3xl">
            Create Quote
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-8 place-content-center w-full md:w-[600px]"
        >
          <div className="flex flex-col items-center gap-[18px] w-full text-[15px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 md:gap-y-[18px] w-full">
              <div className="col-span-full">
                <Select
                  options={[
                    { label: 'Capex Savers Plan', value: 'csp' },
                    { label: 'Target Savings Plan', value: 'tsp' },
                    { label: 'Children Education Plan', value: 'cep' },
                  ]}
                  selectedValue=""
                  placeholder="Choose a product"
                  onChange={() => {}}
                />
              </div>
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
              <div className="flex flex-col gap-1 w-full relative pt-2">
                <p className="absolute text-xs text-gray-500 -top-1 left-2.5">
                  Date of Birth
                </p>
                <input
                  type="date"
                  className={`border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900`}
                />
              </div>
              <Select
                className="mt-0.5"
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
              <div className="col-span-full flex flex-col gap-1 w-full relative">
                <p className="absolute right-2.5 bottom-1.5 font-medium text-gray-900">
                  NGN
                </p>
                <input
                  placeholder="How much do you want to contribute?"
                  className={`border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900 `}
                />
              </div>
              <Select
                options={[
                  { label: '3 Years', value: '3' },
                  { label: '4 Years', value: '4' },
                  { label: '5 Years', value: '5' },
                  { label: '6 Years', value: '6' },
                ]}
                selectedValue=""
                placeholder="Policy Duration (Years)"
                onChange={() => {}}
              />
              <Select
                options={[
                  { label: 'Weekly', value: 'weekly' },
                  { label: 'Monthly', value: 'monthly' },
                  { label: 'Quarterly', value: 'quarterly' },
                  { label: 'Yearly', value: 'yearly' },
                ]}
                selectedValue=""
                placeholder="Payment Frequency"
                onChange={() => {}}
              />
            </div>

            <GenericButton
              type="submit"
              className="bg-[#02364B] mt-6 !w-full cursor-pointer"
              onClick={() => {
                router.push('/quotes/create/quote-generated');
              }}
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6" />
                </div>
              ) : (
                'Generate Quote'
              )}
            </GenericButton>
          </div>
        </form>
      </div>
    </div>
  );
}
