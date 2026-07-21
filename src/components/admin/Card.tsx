export function Card({
  title,
  description,
  children,
  actions,
  className,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl p-6 ${className ?? ""}`}>
      {(title || actions) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="font-heading text-lg font-semibold">{title}</h2>}
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="font-heading text-2xl font-semibold">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </div>
  );
}
