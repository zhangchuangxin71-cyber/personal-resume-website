export default function Loading() {
  return (
    <div className="container-shell loading-shell" aria-label="正在加载">
      <div className="skeleton-line" />
      <div className="skeleton-line small" />
      <div className="skeleton-media" />
    </div>
  );
}
