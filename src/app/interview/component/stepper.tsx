export default function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <ol className="flex items-center w-full max-w-3xl ml-14"> {/* Added ml-4 for left gap */}
            {[1, 2, 3, 4].map((step, index) => (
                <li key={step} className="relative flex w-full items-center">
                    {/* Step circle */}
                    <span
                        className={`flex items-center justify-center w-[36px] h-[38px] lg:h-12 lg:w-12 rounded-full shrink-0 
              ${
                            step < currentStep
                                ? "bg-[#1e4b8e] text-white"  // Completed step
                                : step === currentStep
                                    ? "bg-[#1e4b8e] text-white"  // Active step (now without gradient)
                                    : "bg-[#EFF0F6] text-[#9A8F82]" // Upcoming step
                        }`}
                    >
            {step}
          </span>

                    {/* Step line (connector) */}
                    {index < 3 && (
                        <div className="absolute left-[44px] top-1/2 -translate-y-1/2 w-[103px] h-[7px] flex">
                            {/* First half of the connector: filled for active or completed step */}
                            <div
                                className={`h-full w-1/2 ml-6 ${
                                    step <= currentStep ? "bg-[#1e4b8e]" : "bg-[#EFF0F6]"
                                }`}
                            ></div>
                            {/* Second half of the connector: filled only if step is already completed */}
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
