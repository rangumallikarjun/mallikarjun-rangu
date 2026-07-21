export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-14 text-center">
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-muted">{description}</p>
      )}
    </div>
  );
}
