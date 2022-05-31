import React from 'react';
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddEntryForm from './AddEntryForm';
import { Patient, NewEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
  patient: Patient;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  patient,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new Entry for {patient.name}</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
