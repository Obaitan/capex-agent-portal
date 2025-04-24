import Image from 'next/image';
// import StatusChip from '../general/StatusChip';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/lib/functions';
import { useEffect, useState } from 'react';

// Define an interface for raw loan data from API
interface RawLoanData {
  id?: number;
  customerID?: string;
  loanNumber?: string;
  vendorID?: string;
  vendorName?: string;
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  currency?: string;
  amount?: number;
  interestRate?: number;
  duration?: number;
  interest?: number;
  lateFee?: number;
  totalRepaymentAmount?: number;
  installmentAmount?: number;
  amountPaid?: number;
  outstandingAmount?: number;
  zohoInvoiceID?: string;
  zohoInvoiceNo?: string;
  zohoCustomerID?: string;
  createDate?: string;
  lastModified?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  status?: string;
}

// Define an interface for the loan prop
interface LoanProps {
  id?: number;
  loanNumber?: string;
  customerName?: string;
  customerID?: string;
  phoneNumber?: string;
  email?: string;
  status?: string;
  amount?: number;
  createDate?: string;
  duration?: number;
  interest?: number;
  amountPaid?: number;
  installmentAmount?: number;
  originalLoan?: RawLoanData; // Now using the defined type instead of any
}

const LoanDetailsComponent: React.FC<{ loan?: LoanProps | null }> = ({
  loan = null,
}) => {
  const [loanDetails, setLoanDetails] = useState<LoanProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format status from API
  const getStatus = (status: string) => {
    const statusValue = (status || '').toLowerCase();
    if (statusValue === 'active') return 'active';
    if (statusValue === 'paid') return 'completed';
    return 'pending';
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="mb-2">
        <p className="font-medium text-gray-800">Loan Details</p>
        <hr className="border-gray-50 mt-2" />
      </div>

      <div className="grid grid-cols-1 gap-y-7">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <div className="relative h-12 w-12 overflow-hidden flex justify-center items-center rounded-full border border-disabled">
            <Image
              src="/images/avatar.svg"
              alt="Profile picture"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-gray-700 capitalize text-[15px]">
                Mark Adebayo
              </p>
              {/* <StatusChip status={getStatus(status)} /> */}
            </div>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-gray-600 capitalize font-medium">
              <span className="text-primary-200">10234</span> |
              <span>012345677</span> |
              <span className="lowercase">eze@test.com</span>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-secondary-50 py-3 px-3.5 md:px-4 text-sm text-gray-800">
            Loan Information
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 border-b border-b-[#eee] px-3.5 py-4 md:px-4 md:py-[18px]">
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Loan Number</p>
              <p className="text-[13px] text-gray-700 uppercase">
                123456789
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Loan Amount</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {Number(12345).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Date Disbursed</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {formatDate('january 12, 2023')}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Maturity Date</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {formatDate('feb 12, 2024'.toString())}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Interest Rate</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {((Number(1200) / Number(2400)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Interest Amount</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {Number(1200).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Tenure</p>
              <p className="text-[13px] text-gray-700 capitalize">
                15 {Number(15) === 1 ? 'day' : 'days'}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Installments Paid</p>
              <p className="text-[13px] text-gray-700 capitalize">
               3
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Monthly Payments</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {(12000).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Total Paid</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {(12900).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Outstanding</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {(12000).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Total Expected Repayment</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {(18000).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block mt-3">
          <div className="bg-secondary-50 py-3 px-3.5 md:px-4 text-sm text-gray-800">
            Repayments
          </div>
          <div className="grid grid-cols-5 border-b border-b-[#eee] py-3 px-3.5 md:px-4 text-xs text-gray-300">
            <p>Payment Ref.</p>
            <p>Amount</p>
            <p>Due Date</p>
            <p>Date Paid</p>
            <p>Channel</p>
          </div>
          {/* {repayments.length > 0 ? (
            repayments.map((repayment, index) => (
              <div
                key={repayment.id || index}
                className="grid grid-cols-5 border-b border-b-[#eee] py-3 px-3.5 md:px-4 text-xs text-gray-700 capitalize"
              >
                <p>{repayment.reference || 'N/A'}</p>
                <p>
                  {Number(repayment.amount || 0).toLocaleString('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
                <p>
                  {repayment.dueDate ? formatDate(repayment.dueDate) : 'N/A'}
                </p>
                <p>
                  {repayment.paymentDate
                    ? formatDate(repayment.paymentDate)
                    : 'N/A'}
                </p>
                <div className="flex gap-2 items-center">
                  <span>{repayment.repaymentChannel || 'N/A'}</span>
                  {repayment.paymentDate ? (
                    <CheckCircleIcon className="w-4 h-4 text-success-500" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-error-300" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-20 text-gray-400 text-sm border-b border-b-[#eee]">
              No repayments yet
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsComponent;
