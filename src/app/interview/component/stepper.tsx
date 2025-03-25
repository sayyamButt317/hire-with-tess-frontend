export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-center w-full max-w-3xl">
      {[1, 2, 3, 4].map((step, index) => (
        <li
          key={step}
          className={`flex w-full items-center ${
            index < 3 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""
          } ${
            step <= currentStep
              ? "text-white dark:text-blue-500 after:border-blue-800"
              : "after:border-gray-100 dark:after:border-gray-700"
          }`}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 lg:h-12 lg:w-12 rounded-full shrink-0 ${
              step <= currentStep ? "bg-[#1e4b8e] dark:bg-[#1e4b8e] text-white" : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
