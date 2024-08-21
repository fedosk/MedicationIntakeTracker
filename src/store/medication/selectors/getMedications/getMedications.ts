import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../..';
import { IMedication } from '../../types/medicationSchema';

export const getMedications = (state: RootState) =>
  state.medications.medications;

export const getMedicationsById = createSelector(
  getMedications,
  medications => {
    const medicationsById: { [id: number]: IMedication } = {};
    medications.forEach(medication => {
      medicationsById[medication.id] = medication;
    });
    return medicationsById;
  },
);
