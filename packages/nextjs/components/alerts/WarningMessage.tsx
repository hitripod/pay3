import { InformationCircleIcon } from "@heroicons/react/24/outline";

type WarningMessageProps = {
  message: string;
  hyperMessage?: string;
  hyperLink?: string;
  hasReadWarning: boolean;
  setHasReadWarning: () => void;
};
export function WarningMessage({
  message,
  hyperMessage,
  hyperLink,
  hasReadWarning,
  setHasReadWarning,
}: WarningMessageProps) {
  return (
    <div className="w-full rounded-full rounded-xl border-2 border-black bg-mint-300 p-4">
      <div className="flex flex-col items-center gap-y-4 sm:gap-y-0 py-4 justify-between sm:flex-row">
        <div className="flex items-center ">
          <div className="ml-3">
            <p className="text-base sm:text-lg ">
              {message}{" "}
              {hyperMessage && hyperLink && (
                <a
                  href={hyperLink}
                  target="_blank"
                  className="font-medium  underline hover:text-mint-600"
                >
                  {hyperMessage}
                </a>
              )}
            </p>
          </div>
        </div>
        {!hasReadWarning && (
        <button
          onClick={() => setHasReadWarning()}
          className=" w-full rounded-xl border-2 border-black bg-emerald-400 p-2.5 text-lg font-semibold hover:bg-emerald-500	 active:bg-emerald-600 sm:w-1/3 sm:text-xl"
        >
          I understand
        </button>
        )}
      </div>
    </div>
  );
}
