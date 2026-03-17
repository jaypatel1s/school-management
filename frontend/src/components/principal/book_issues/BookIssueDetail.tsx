'use client';

import { fetchBookIssue } from '@/lib/principals/book_issues';
import { BookIssueInfo } from './BookIssueInfo';

interface BookIssueDetailProps {
  issueId: string;
}

export async function BookIssueDetail({ issueId }: BookIssueDetailProps) {
  const issue = await fetchBookIssue(issueId);

  return (
    <div className="space-y-6">
      <BookIssueInfo issue={issue} />
    </div>
  );
}
