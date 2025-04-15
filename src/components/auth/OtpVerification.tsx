'use client';

import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { GenericButton } from '../general/Button';
import Link from 'next/link';

interface OTPVerificationProps {
  onSubmit: (otp: string) => Promise<void>;
  loading: boolean;
  isPending: boolean;
  resendOTP?: () => void;
  resendText?: string;
  verificationTitle?: string;
  submitButtonText?: string;
  otpLength?: number;
}

const OTPVerificationComponent: React.FC<OTPVerificationProps> = ({
  onSubmit,
  loading,
  isPending,
  resendOTP,
  resendText = 'Resend Now',
  verificationTitle = 'OTP Verification',
  submitButtonText = 'Verify',
  otpLength = 6,
}) => {
  const [otp, setOtp] = useState<string>('');
  const isOTPComplete = otp.length === otpLength;

  const handleVerification = () => {
    if (isOTPComplete) {
      onSubmit(otp);
    } else {
      toast.error(`Please enter a ${otpLength}-digit OTP.`);
    }
  };

  return (
    <div className="h-full grid grid-cols-1 place-content-center text-center px-7">
      <div className="mb-8">
        <p className="font-semibold text-2xl md:text-3xl text-primary">
          {verificationTitle}
        </p>
      </div>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={otpLength}
        renderInput={(props) => <input {...props} />}
        containerStyle="flex justify-center items-center gap-2 md:gap-4 w-full mb-8"
        inputStyle="!w-11 md:!w-[64px] h-12 md:!h-[56px] text-xl md:text-3xl font-medium text-text-dark border-[1px] border-gray-300 rounded-[8px] focus:outline-none focus:border-2 focus:border-blue-900"
      />

      <div className="w-full md:w-[450px] mx-auto md:mt-3 mb-5">
        <Link href={'/dashboard'}>
          <GenericButton
            className="bg-[#02364B] mx-auto !w-full cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed"
            disabled={!isOTPComplete || loading || isPending}
            onClick={handleVerification}
          >
            {isPending || loading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="w-6 h-6" />
                <p>Verifying</p>
              </div>
            ) : (
              submitButtonText
            )}
          </GenericButton>
        </Link>
      </div>

      {resendOTP && (
        <p className="text-gray-700 text-base font-normal">
          Didn&apos;t receive OTP code?
          <span
            className="text-blue-900 font-medium ml-2 hover:underline-offset-1 hover:underline"
            onClick={resendOTP}
          >
            {resendText}
          </span>
        </p>
      )}
    </div>
  );
};

export default OTPVerificationComponent;
