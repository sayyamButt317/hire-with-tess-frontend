export default function Stepper({ currentStep, totalSteps = 4 }: { currentStep: number; totalSteps?: number }) {
    return (
        <ol className="flex items-center justify-center w-full max-w-3xl mx-auto px-2 sm:px-4">
            {[...Array(totalSteps).keys()].map((_, index) => {
                const step = index + 1;
                return (
                    <li key={step} className="flex items-center relative justify-center">
                        {/* Step and connector */}
                        <div className="flex items-center justify-center w-full">
                            {/* Step Circle */}
                            <div
                                className={`z-10 flex items-center justify-center w-[35px] h-[35px] sm:w-[22px] sm:h-[22px] lg:w-12 lg:h-12 rounded-full shrink-0 text-sm sm:text-xs
                                    ${
                                    step < currentStep
                                        ? "bg-[#1e4b8e] text-white"
                                        : step === currentStep
                                            ? "bg-[#1e4b8e] text-white"
                                            : "bg-[#EFF0F6] text-[#9A8F82]"
                                }`}
                            >
                                {step}
                            </div>

                            {/* Line between steps */}
                            {index < totalSteps - 1 && (
                                <div className="flex items-center mx-1 w-[30px] sm:w-[40px] md:w-[80px] lg:w-[120px] xl:w-[150px] h-[6px] sm:h-[4px]">
                                    {/* Left half of the line */}
                                    <div
                                        className={`h-full w-1/2 ${
                                            step <= currentStep ? "bg-[#1e4b8e] rounded-l-full" : "bg-[#EFF0F6]"
                                        }`}
                                    ></div>

                                    {/* Right half of the line */}
                                    <div
                                        className={`h-full w-1/2 ${
                                            step < currentStep ? "bg-[#1e4b8e]" : "bg-[#EFF0F6] rounded-r-full"
                                        }`}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
