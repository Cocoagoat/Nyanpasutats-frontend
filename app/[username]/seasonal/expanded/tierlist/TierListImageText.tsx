export default function TierListImageText({ showName }: { showName: string }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 flex h-full  w-full
           -translate-x-1/2 -translate-y-1/2 items-center justify-center
            text-center text-[0.5rem] font-semibold text-white"
    >
      <p
        className="z-[60] mb-2 text-center opacity-100 shadow-black 
        text-shadow"
      >
        {showName}
      </p>
    </div>
  );
}
