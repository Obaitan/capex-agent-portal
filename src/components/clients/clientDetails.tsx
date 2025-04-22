import Image from 'next/image';
import StatusChip from '../general/StatusChip';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/utils/functions';
import { useEffect, useState } from 'react';
import { AllCustomersLoans, RepaymentItem } from '@/services/apiQueries/customersDetails';
import SpinnerItem from '@/components/forms/SpinnerItem';

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

const LoanDetailsComponent: React.FC<{ loan?: LoanProps | null }> = ({ loan = null }) => {
  const [loanDetails, setLoanDetails] = useState<LoanProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repayments, setRepayments] = useState<RepaymentItem[]>([]);

  useEffect(() => {
    async function fetchLoanDetails() {
      if (!loan) {
        setError('No loan data provided');
        return;
      }
      
      // Use either the provided loanNumber or try to find it in originalLoan
      const loanNumber = loan.loanNumber || loan.originalLoan?.loanNumber;
      
      if (!loanNumber) {
        setError('Loan number is required');
        return;
      }

      setIsLoading(true);
      try {
        // First, set the basic loan details we already have
        setLoanDetails(loan);
        
        // Get detailed loan information
        const details = await AllCustomersLoans.getLoanDetails(loanNumber);
        
        if (details) {
          // Update with the full loan details
          setLoanDetails(prev => ({
            ...prev,
            ...details
          }));
        }
        
        // Fetch repayments separately
        const repaymentsData = await AllCustomersLoans.getRepaymentsByLoanNumber(loanNumber);
        if (repaymentsData && repaymentsData.length > 0) {
          setRepayments(repaymentsData);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching loan details:', err);
        setError('Failed to load complete loan details');
      } finally {
        setIsLoading(false);
      }
    }

    if (loan) {
      fetchLoanDetails();
    }
  }, [loan]);

  // If we have any details at all (either from the prop or from the API)
  const displayLoan = loanDetails || loan;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <SpinnerItem className="!border-t-secondary-200" />
      </div>
    );
  }

  if (error && !displayLoan) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p className="font-medium">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!displayLoan) {
    return (
      <div className="p-4 bg-gray-50 text-gray-700 rounded-md">
        <p>No loan data available</p>
      </div>
    );
  }

  // Use the loan from originalLoan if available, otherwise use the displayLoan directly
  const effectiveLoan = displayLoan.originalLoan || displayLoan;

  // Extract values from loan data with fallbacks
  const {
    customerName = 'Unknown Customer',
    customerID = 'N/A',
    phoneNumber = 'N/A',
    email = 'N/A',
    status = 'ACTIVE',
    amount = 0,
    createDate = new Date().toISOString(),
    duration = 0,
    loanNumber = '',
    interest = 0,
    amountPaid = 0,
    installmentAmount = 0,
  } = effectiveLoan;

  // Calculate derived values
  const totalAmount = Number(amount) + Number(interest);
  const paidAmount = Number(amountPaid);
  const outstandingAmount = totalAmount - paidAmount;
  const monthlyPayment = installmentAmount || (totalAmount / duration) || 0;
  const installmentsPaid = Math.round(paidAmount / monthlyPayment) || 0;

  // Calculate maturity date
  const disbursementDate = new Date(createDate);
  const maturityDate = new Date(disbursementDate);
  maturityDate.setDate(maturityDate.getDate() + Number(duration));

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
                {customerName}
              </p>
              <StatusChip status={getStatus(status)} />
            </div>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-gray-600 capitalize font-medium">
              <span className="text-primary-200">{customerID}</span> |
              <span>{phoneNumber}</span> |
              <span className="lowercase">{email}</span>
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
              {loanNumber}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Loan Amount</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {Number(amount).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Date Disbursed</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {formatDate(createDate)}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Maturity Date</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {formatDate(maturityDate.toString())}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Interest Rate</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {(Number(interest) / Number(amount) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Interest Amount</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {Number(interest).toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Tenure</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {duration} {Number(duration) === 1 ? 'day' : 'days'}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Installments Paid</p>
              <p className="text-[13px] text-gray-700 capitalize">{installmentsPaid}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Monthly Payments</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {monthlyPayment.toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Total Paid</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {paidAmount.toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Outstanding</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {outstandingAmount.toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-300">Total Expected Repayment</p>
              <p className="text-[13px] text-gray-700 capitalize">
                {totalAmount.toLocaleString('en-NG', {
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
          {repayments.length > 0 ? (
            repayments.map((repayment, index) => (
              <div key={repayment.id || index} className="grid grid-cols-5 border-b border-b-[#eee] py-3 px-3.5 md:px-4 text-xs text-gray-700 capitalize">
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
                  {repayment.paymentDate ? formatDate(repayment.paymentDate) : 'N/A'}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsComponent;