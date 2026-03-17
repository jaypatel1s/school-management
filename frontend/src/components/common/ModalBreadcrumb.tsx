"use client";

import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface ModalBreadcrumbItem {
  label: string;
}

interface ModalBreadcrumbProps {
  items: ModalBreadcrumbItem[];
  title?: string;
}

export function ModalBreadcrumb({ items, title }: ModalBreadcrumbProps) {
  return (
    <div className="mb-4">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {items.map((item, index) => (
          <Typography
            key={index}
            color="text.primary"
            className="text-gray-800 font-medium"
          >
            {item.label}
          </Typography>
        ))}
      </Breadcrumbs>
      {title && (
        <Typography variant="h6" className="mt-2 text-gray-900">
          {title}
        </Typography>
      )}
    </div>
  );
}
