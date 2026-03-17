export function SuperAdminUserEditFormSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="space-y-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-10 bg-blue-200 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
  );
}
