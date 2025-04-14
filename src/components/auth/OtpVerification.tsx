'use client';

import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { GenericButton } from '../general/Button';

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
    <div className="h-full grid grid-cols-1 place-content-center text-center">
      <div className="mb-8">
        <p className="font-semibold text-3xl text-primary">
          {verificationTitle}
        </p>
      </div>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={otpLength}
        renderInput={(props) => <input {...props} />}
        containerStyle="flex justify-center items-center gap-2 md:gap-4 w-full mb-8"
        inputStyle="!w-[45px] md:!w-[72px] h-[40px] md:h-[60px] text-lg md:text-2xl font-medium text-text-dark border-[1px] border-[#D9D9D9] rounded-[8px] focus:outline-none focus:border-primary"
      />

      <div className="w-full md:w-[450px] mx-auto md:mt-3 mb-5">
        <GenericButton
          className="bg-secondary mx-auto !w-full cursor-pointer disabled:bg-disabled"
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
      </div>

      {resendOTP && (
        <p className="text-text-mid">
          Didn&apos;t receive OTP code?
          <span
            className="font-medium text-primary cursor-pointer ml-2 text-[17px]"
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
