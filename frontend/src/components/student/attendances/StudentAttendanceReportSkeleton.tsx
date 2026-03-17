export function StudentAttendanceReportSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
