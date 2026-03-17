export function StudentCourseMaterials({ courseId }: { courseId: string }) {
  // Mock data - replace with actual API call
  const materials = [
    { id: 1, title: 'Course Syllabus', type: 'PDF', url: '/materials/syllabus.pdf' },
    { id: 2, title: 'Chapter 1 Notes', type: 'PDF', url: '/materials/chapter1.pdf' },
    { id: 3, title: 'Assignment 1', type: 'DOC', url: '/materials/assignment1.doc' },
    { id: 4, title: 'Lecture Slides', type: 'PPT', url: '/materials/slides.ppt' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Materials</h3>
      
      <div className="space-y-3">
        {materials.map((material) => (
          <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{material.title}</h4>
              <p className="text-sm text-gray-600">{material.type}</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Download
            </button>
          </div>
        ))}
        
        {materials.length === 0 && (
          <p className="text-gray-500 text-center py-4">No materials available</p>
        )}
      </div>
    </div>
  );
}
