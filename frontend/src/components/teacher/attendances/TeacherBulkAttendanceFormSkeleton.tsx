export function TeacherBulkAttendanceFormSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-10 bg-blue-200 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
  );
}
