
export type SuccessModalProps = {
  message: string;
  onGoHome: () => void;
};

export function SuccessModal(props: SuccessModalProps) {
  return (
    <div className="mx-4 my-4 max-w-md border-4 border-black bg-white p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:mx-auto sm:my-8 md:max-w-lg lg:max-w-xl">
      <div className="mx-auto my-4 max-w-md border-4 border-black bg-white p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:my-8 md:max-w-lg lg:max-w-xl">
        <div>
          <h1 className="mb-4 text-center text-2xl sm:text-3xl">
            {props.message}
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <button className="px-4 py-2 text-base">Cerrar</button>
            <button
              onClick={props.onGoHome}
              className="h-12 rounded-full border-2 border-black bg-[#A6FAFF] px-5 py-2.5 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]"
            >
              Regresar al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
