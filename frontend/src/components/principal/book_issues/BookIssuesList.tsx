import { fetchBookIssues } from '@/lib/principals/book_issues';
import { BookIssueCard } from './BookIssueCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function BookIssuesList() {
  const bookIssues = await fetchBookIssues();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search book issues..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookIssues.map((issue) => (
          <BookIssueCard key={issue.id} issue={issue} />
        ))}
      </div>

      {bookIssues.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No book issues found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
