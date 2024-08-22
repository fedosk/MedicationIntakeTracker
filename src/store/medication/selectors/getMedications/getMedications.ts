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

export const getSortedMedications = createSelector(
  getMedications,
  medications => {
    const sortedMedications = [...medications];

    sortedMedications.sort((a, b) => {
      const aFulfilled = a.current_count === a.destination_count;
      const bFulfilled = b.current_count === b.destination_count;

      if (aFulfilled && !bFulfilled) {
        return 1;
      }
      if (!aFulfilled && bFulfilled) {
        return -1;
      }

      const updatedAtComparison =
        new Date(b.updated_at || b.created_at).getTime() -
        new Date(a.updated_at || a.created_at).getTime();

      if (updatedAtComparison !== 0) {
        return updatedAtComparison;
      }

      const createTimeComparison =
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (createTimeComparison !== 0) {
        return createTimeComparison;
      }

      return 0;
    });

    return sortedMedications;
  },
);
