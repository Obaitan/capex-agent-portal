'use client';

import Link from "next/link";

const QuoteGeneratedPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-9">
        <div className="">
          <p className="text-primary text-center font-semibold text-2xl md:text-3xl">
            Quote Details
          </p>
          <div className="bg-white w-full md:w-[500px] rounded-lg shadow-sm p-6 md:py-7 mt-8 space-y-7">
            <div className="space-y-7">
              <div className="flex justify-center items-center gap-2 text-base md:text-lg">
                <span className="font-medium text-primary">Quote Number:</span>
                <span className="font-semibold text-gray-600">
                  Q25000012348G
                </span>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-primary text-2xl md:text-4xl font-bold">
                  ₦ 360,000
                </p>
                <p className="font-semibold text-gray-600 text-lg md:text-xl">
                  ₦ 10,000 (Monthly)
                </p>
              </div>
            </div>
            <div className="">
              <p className="text-gray-800 font-medium mb-1">Maturity Details</p>
              <div className="bg-gray-100 py-3 px-4 flex justify-between items-center gap-2 text-sm">
                <span className="text-primary">After 4 Years</span>
                <span className="font-semibold text-gray-600">₦ 420,000</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-4 mt-8">
            <Link href='/quotes' className="bg-primary flex items-center justify-center rounded-full w-full md:w-[230px] h-11 md:h-[52px] text-white md:text-[17px] font-medium hover:opacity-90 focus:outline-0 active:opacity-90">
              See Quotes
            </Link>
            <button className="bg-[#607e89] rounded-full w-full md:w-[230px] h-11 md:h-[52px] text-white md:text-[17px] font-medium hover:opacity-90 focus:outline-0 active:opacity-90 cursor-pointer">
              Download Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGeneratedPage;
