

export type ErrorModalProps = {
  errorMessage: string;
};

export function ErrorModal({ errorMessage }: ErrorModalProps) {
  const retry = () => {
    window.location.reload();
  };
  return (
    <div className="mx-4 my-4 max-w-md border-4 border-black bg-white p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:mx-auto sm:my-8 md:max-w-lg lg:max-w-xl">
      <div>
        <h1 className="mb-4 text-center text-2xl sm:text-3xl">
          Uuuu something went wrong:
        </h1>
        <p className="mb-4 text-center text-lg sm:text-xl">{errorMessage}</p>
        <div className="w-full rounded-xl border-2 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <div className="w-full">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzg4ZnJwaG81Z25idHBmaXBjcGhzcjdhaGd6ZTdyNWlpcnE5aXl2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jb3YXUSm1P1FuuELYi/giphy.webp"
              alt="slooow"
              className="h-50 w-full rounded-xl object-cover"
            />
          </div>
        </div>
        <div className="mt-8 flex w-full items-center justify-center space-x-2">
          <button
            onClick={retry}
            className="w-full rounded-full border-2 border-black bg-[#A6FAFF] px-5 py-4 text-lg hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
