export default function GradientBlobBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary/30 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-[120px] animate-blob [animation-delay:4s]" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px] animate-blob [animation-delay:8s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg)_75%)]" />
    </div>
  );
}
