export default function ErrorPage() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <div className="min-h-1/2 inline-flex w-2/5 flex-col items-center rounded-xl bg-base-200 text-center shadow-xl">
        <h1 className="p-8 text-2xl">
          You probably aren&apos;t listening to music right now!
        </h1>
        <p className="pt-4 text-lg">
          For this to work music needs to be playing
        </p>
        <p className="pb-4 text-lg">
          Don&apos;t worry! More options are coming soon!
        </p>
      </div>
    </div>
  );
}
