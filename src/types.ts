export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  bvn?: string;
  TandC?: boolean;
  address: string;
};

export type AgentData = {
  agentCode: string;
  agentName: string;
  officeAddress: string;
  phoneNo: string;
  email: string;
};

interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  buttonStyle?: string;
  placeholder?: string;
  disabled?: boolean;
}

export type fetchQuotesForm = {
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  productCode: string;
  productOption: string;
  policyTerm: string;
  paymentTerm: string;
  sumAssured: number;
  premiumValue: string;
  agentPhoneNo?: string;
  agentCode?: string;
  agentName?: string;
};

export type sendOTPForm = {
  phone: string;
  email: string;
  firstName?: string;
};

export type QuoteData = {
  Id: number;
  phoneNumber: string;
  email: string;
  quoteNo: string;
  productCode: string;
  product: string;
  productOption: string;
  premium: number;
  lifeCoverPremium: number;
  policyTerm: string;
  paymentTerm: string;
  sumAssured: number;
  maturityBenefit: number;
  dateOfBirth: string;
  createDate: string;
  agentPhoneNo: string;
  paymentStatus: string;
  status: string;
  selfieStatus?: 'Y' | 'N';
  signatureSatatus?: 'Y' | 'N';
  identificationStatus?: 'Y' | 'N';
  medicalHistoryStatus?: 'Y' | 'N';
  beneficiaryStatus?: 'Y' | 'N';
  otherDetailStatus?: 'Y' | 'N';
};

export type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  passcode: string;
  clientCode: string;
  address: string;
  gender: string;
  createDate: string;
  clientAvi: string;
  aviExtension: string;
  deviceID: string;
  firebaseID: string;
  iesUserName: string;
  iesPassword: string;
  password: string;
  bvn: string;
  maritalStatus: string;
  activationStatus: string;
  occupation: string;
  bvnVerificationStatus: string;
  employerName?: string;
  employerAddress?: string;
  mothersMaidenName?: string;
  placeOfBirth?: string;
  country?: string;
  stateOfOrigin?: string;
  title?: string;
};
