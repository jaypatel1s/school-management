"use client";

import { IconButton, Tooltip } from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ActionsProps {
  id: string | number;
  viewPath?: string;
  editPath?: string;
  onDelete?: (id: string | number) => void;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  size?: 'small' | 'medium';
}

export function Actions({
  id,
  viewPath,
  editPath,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
  size = 'small',
}: ActionsProps) {
  const router = useRouter();

  const handleView = () => {
    if (viewPath) {
      router.push(viewPath);
    }
  };

  const handleEdit = () => {
    if (editPath) {
      router.push(editPath);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="flex gap-1">
      {showView && viewPath && (
        <Tooltip title="View">
          <IconButton size={size} onClick={handleView} color="primary">
            <ViewIcon fontSize={size} />
          </IconButton>
        </Tooltip>
      )}
      {showEdit && editPath && (
        <Tooltip title="Edit">
          <IconButton size={size} onClick={handleEdit} color="secondary">
            <EditIcon fontSize={size} />
          </IconButton>
        </Tooltip>
      )}
      {showDelete && onDelete && (
        <Tooltip title="Delete">
          <IconButton size={size} onClick={handleDelete} color="error">
            <DeleteIcon fontSize={size} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}
