export function StudentCoursesListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      ))}
    </div>
  );
}
