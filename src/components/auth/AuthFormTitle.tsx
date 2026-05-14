export default function AuthFormTitle({ title }: { title: string }) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="mx-auto h-15 w-15">
        <img src="/images/barca.png" alt="main logo" />
      </div>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-secondary-font">
        {title}
      </h2>
    </div>
  );
}
