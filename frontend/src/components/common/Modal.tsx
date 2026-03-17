"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { ModalBreadcrumb } from './ModalBreadcrumb';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  breadcrumbItems: Array<{ label: string }>;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  breadcrumbItems,
  children,
  actions,
  maxWidth = 'md',
  fullWidth = true,
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="modal-title"
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <ModalBreadcrumb items={breadcrumbItems} title={title} />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
