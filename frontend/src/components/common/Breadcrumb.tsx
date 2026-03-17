"use client";

import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function Breadcrumb({ items, actions }: BreadcrumbProps) {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center mb-6">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {items.map((item, index) => (
          item.href ? (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.href}
              className={pathname === item.href ? 'text-gray-800 font-medium' : 'text-gray-600'}
            >
              {item.label}
            </Link>
          ) : (
            <Typography
              key={index}
              color="text.primary"
              className="text-gray-800 font-medium"
            >
              {item.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
