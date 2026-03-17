export function StudentBookIssuesListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3 mb-2"></div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
