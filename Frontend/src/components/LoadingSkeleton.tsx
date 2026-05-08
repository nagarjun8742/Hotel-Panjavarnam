const LoadingSkeleton = ({ count = 3, type = "card" }: { count?: number; type?: "card" | "row" }) => (
  <div className={type === "card" ? "grid grid-cols-1 md:grid-cols-3 gap-8" : "space-y-4"}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="glass overflow-hidden animate-pulse">
        {type === "card" && <div className="aspect-[4/3] bg-muted" />}
        <div className="p-7 space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
