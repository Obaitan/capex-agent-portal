'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import OTPVerificationComponent from '@/components/auth/OtpVerification';
import { SignupData } from '@/types';
import { revalidatePath } from 'next/cache';

interface SignupOTPverificationComponentProps {
  formData: SignupData;
}

const SignupOTPverificationComponent: React.FC<
  SignupOTPverificationComponentProps
> = ({ formData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleOTPVerification = async (otp: string): Promise<void> => {
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

export default SignupOTPverificationComponent;
