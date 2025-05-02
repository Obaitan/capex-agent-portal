'use client';

import { useRouter } from 'next/navigation';
import { GenericButton } from '@/components/general/Button';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

export default function IdentityVerificationPage() {
  const [isPending, startTransition] = useTransition();
  const [verificationData, setVerificationData] = useState<{
    nin: string;
    driversLicenseNumber: string;
    passportNumber: string;
  }>({
    nin: '',
    driversLicenseNumber: '',
    passportNumber: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: verificationData,
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      setVerificationData(data);
      // do something
    });
  });

  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full h-full px-6 my-20 md:my-0">
      <div className="flex flex-col items-center gap-9">
        <div className="text-center space-y-2">
          <p className="text-[#02364B] font-semibold text-2xl md:text-3xl">
            Identy Verification
          </p>
          <p className="text-gray-600">
            Provide identity verification information to proceed with the KYC
            process.
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
                  placeholder="National Identification Number (NIN)"
                  className="border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900"
                  {...register('nin', {
                    required: 'NIN is required',
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-10 gap-y-[18px] w-full">
              <div className="flex flex-col gap-1 w-full">
                <input
                  placeholder="Drivers License Number"
                  className="border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900"
                  {...register('driversLicenseNumber', {
                    required: 'Drivers License Number is required',
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-10 gap-y-[18px] w-full">
              <div className="flex flex-col gap-1 w-full">
                <input
                  placeholder="International Passport Number"
                  className="border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900"
                  {...register('passportNumber', {
                    required: 'International Passport Number is required',
                  })}
                />
              </div>
            </div>

            <GenericButton
              type="submit"
              className="bg-[#02364B] mt-6 !w-full cursor-pointer"
              onClick={() => {
                router.push('/kyc/next-of-kin');
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
