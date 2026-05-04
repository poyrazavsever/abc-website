type AuthHeadingProps = {
  title: string;
};

export function AuthHeading({ title }: AuthHeadingProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-semibold leading-[0.94] tracking-tight text-brand-white md:text-5xl">
        {title}
      </h1>
    </div>
  );
}
