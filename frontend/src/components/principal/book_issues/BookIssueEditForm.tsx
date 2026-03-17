import { fetchBookIssue, updateBookIssue } from '@/lib/principals/book_issues';
import { BookIssueForm } from './BookIssueForm';

interface BookIssueEditFormProps {
  issueId: string;
}

export async function BookIssueEditForm({ issueId }: BookIssueEditFormProps) {
  const issue = await fetchBookIssue(issueId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateBookIssue(issueId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <BookIssueForm 
        initialData={issue} 
        onSubmit={handleUpdate}
        submitText="Update Book Issue"
      />
    </div>
  );
}
