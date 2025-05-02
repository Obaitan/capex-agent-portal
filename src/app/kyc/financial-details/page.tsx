'use client';

import { useRouter } from 'next/navigation';
import { GenericButton } from '@/components/general/Button';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import Select from '@/components/general/Select';

export default function FinancialDetailsPage() {
  const [isPending, startTransition] = useTransition();
  const [financeData, setFinanceData] = useState<{
    bvn: string;
    bank: string;
    accountNumber: string;
    accountName: string;
  }>({
    bvn: '',
    bank: '',
    accountNumber: '',
    accountName: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: financeData,
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      setFinanceData(data);
      // do something
    });
  });

  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full h-full px-6 my-20 md:my-0">
      <div className="flex flex-col items-center gap-9">
        <div className="text-center space-y-2">
          <p className="text-[#02364B] font-semibold text-2xl md:text-3xl">
            Bank Details
          </p>
          <p className="text-gray-600">
            Enter your bank details to proceed with the KYC process.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-8 place-content-center w-full md:w-[500px]"
        >
          <div className="flex flex-col items-center gap-[18px] w-full text-[15px]">
            <div className="grid grid-cols-1 gap-x-10 gap-y-[18px] w-full">
              <div className="flex flex-col gap-1 w-full">
                <input
                  placeholder="Bank Verification Number (BVN)"
                  className={`border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.bvn ? 'border-red-300' : ''
                  }`}
                  {...register('bvn', {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                  })}
                />
                {errors?.bvn && (
                  <p className="text-red-400 text-sm">
                    {errors.bvn?.type === 'required' && 'BVN is required'}
                    {errors.bvn?.type === 'minLength' &&
                      'BVN must be 11 characters'}
                    {errors.bvn?.type === 'maxLength' &&
                      'BVN must not exceed 11 characters'}
                  </p>
                )}
              </div>

              <Select
                options={[
                  { label: 'Guaranty Trust bank', value: 'gtb' },
                  { label: 'First Bank', value: 'first bank' },
                ]}
                selectedValue=""
                placeholder="Bank Name"
                onChange={() => {}}
              />

              <div className="flex flex-col gap-1 w-full">
                <input
                  placeholder="Account Number"
                  className={`border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900 ${
                    errors.accountNumber ? 'border-red-300' : ''
                  }`}
                  {...register('accountNumber', {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                />
                {errors?.accountNumber && (
                  <p className="text-red-400 text-sm">
                    {errors.accountNumber?.type === 'required' &&
                      'Account Number is required'}
                    {errors.accountNumber?.type === 'minLength' &&
                      'Account Number must be 10 characters'}
                    {errors.accountNumber?.type === 'maxLength' &&
                      'Account Number must not exceed 10 characters'}
                  </p>
                )}
              </div>
              <div className="col-span-full flex flex-col gap-1 w-full mt-2">
                <input
                  placeholder="Account Name"
                  value={''}
                  disabled
                  className="border-b border-b-gray-300 w-full px-2.5 h-11 text-gray-700 placeholder:font-light
                 bg-[#f6f6f6]"
                />
              </div>
            </div>

            <GenericButton
              type="submit"
              className="bg-[#02364B] mt-6 !w-full cursor-pointer"
              onClick={() => {
                router.push('/kyc/identity-verification');
              }}
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6" />
                </div>
              ) : (
                'Next'
              )}
            </GenericButton>
          </div>
        </form>
      </div>
    </div>
  );
}
