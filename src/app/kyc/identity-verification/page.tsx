'use client';

import { useRouter } from 'next/navigation';
import { GenericButton } from '@/components/general/Button';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { File, Loader2 } from 'lucide-react';
import Select from '@/components/general/Select';

export default function IdentityVerificationPage() {
  const [isPending, startTransition] = useTransition();
  const [verificationData, setVerificationData] = useState<{
    nin: string;
    driversLicenseNumber: string;
    passportNumber: string;
    id: string;
    idFile: File | null;
  }>({
    nin: '',
    driversLicenseNumber: '',
    passportNumber: '',
    id: '',
    idFile: null,
  });

  const {
    register,
    handleSubmit,
    // formState: { errors },
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
    <div className="flex justify-center items-center w-full h-full px-6">
      <div className="flex flex-col items-center gap-9">
        <div className="text-center space-y-2">
          <p className="text-[#02364B] font-semibold text-2xl md:text-3xl">
            Identity Verification
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
            <Select
              options={[
                { label: 'National Identification Number (NIN)', value: 'nin' },
                { label: 'Drivers License Number', value: "driver's license" },
                { label: 'International Passport Number', value: 'passport' },
              ]}
              selectedValue=""
              placeholder="Select ID type"
              onChange={() => {}}
            />
            <div className="grid grid-cols-1 gap-x-10 gap-y-[18px] w-full">
              <div className="flex flex-col gap-1 w-full">
                <input
                  placeholder="Identification Number"
                  className="border-b border-b-gray-300 w-full px-2.5 h-9
                  placeholder:text-[#9a9a9a] text-gray-700 placeholder:font-light
                  outline-0 focus:border-b-2 focus:border-b-blue-900"
                  {...register('id', {
                    required: 'Identification Number is required',
                  })}
                />
              </div>
            </div>

            <div className="w-full mt-3">
              <p className="text-gray-500 font-medium text-sm mb-2 px-3">
                Upload a copy of your ID (JPG, PNG, PDF)
              </p>

              <label
                htmlFor="id"
                className="bg-[#f6f6f6] w-full h-28 p-3 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center gap-2 text-gray-600 hover:border-primary focus-within:ring-2 focus-within:primary transition"
              >
                <File className="h-6 w-6 text-gray-400" />
                <span className="text-gray-500">Upload ID File</span>
                <input type="file" name="id" id="id" className="hidden" />
              </label>
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
