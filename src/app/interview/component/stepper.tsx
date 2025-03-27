export default function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <ol className="flex items-center w-full max-w-3xl ml-4 sm:ml-14">
            {[1, 2, 3, 4].map((step, index) => (
                <li key={step} className="relative flex w-full items-center">
                    {/* Step Circle */}
                    <span
                        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full shrink-0 
                            text-xs sm:text-sm lg:text-base font-semibold
                            ${
                            step < currentStep
                                ? "bg-[#1e4b8e] text-white"  // Completed step
                                : step === currentStep
                                    ? "bg-[#1e4b8e] text-white"  // Active step
                                    : "bg-[#EFF0F6] text-[#9A8F82]" // Upcoming step
                        }`}
                    >
                        {step}
                    </span>

                    {/* Step Connector */}
                    {index < 3 && (
                        <div className="absolute left-[36px] sm:left-[44px] top-1/2 -translate-y-1/2 w-[60px] sm:w-[80px] lg:w-[103px] h-[4px] sm:h-[6px] lg:h-[7px] flex">
                            <div
                                className={`h-full w-1/2 ${
                                    step <= currentStep ? "bg-[#1e4b8e]" : "bg-[#EFF0F6]"
                                }`}
                            ></div>
                            <div
                                className={`h-full w-1/3 ${
                                    step < currentStep ? "bg-[#1e4b8e]" : "bg-[#EFF0F6]"
                                }`}
                            ></div>
                        </div>
                    )}
                </li>
            ))}
        </ol>
    );
}
