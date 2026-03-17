export function StudentAttendancesListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
        <div className="h-5 bg-gray-200 rounded animate-pulse w-12"></div>
      </div>
      
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
