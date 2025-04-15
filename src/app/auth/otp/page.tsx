'use client';

import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import OTPVerificationComponent from '@/components/auth/OtpVerification';
import { SignupData } from '@/types';

interface SignupOTPverificationComponentProps {
  formData: SignupData;
}

const SignupOTPverificationPage: React.FC<
  SignupOTPverificationComponentProps
> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleOTPVerification = async (): Promise<void> => {
    setLoading(true);
    startTransition(async () => {
      // do something with the OTP
    });
  };

  const handleResendOTP = () => {
    // Implement resend OTP logic here
    console.log('Resend OTP clicked');
    toast.success('OTP resent!');
  };

  return (
    <OTPVerificationComponent
      onSubmit={handleOTPVerification}
      loading={loading}
      isPending={isPending}
      resendOTP={handleResendOTP}
      verificationTitle="Verify Your Account"
      submitButtonText="Submit OTP"
      otpLength={6}
    />
  );
};

export default SignupOTPverificationPage;
