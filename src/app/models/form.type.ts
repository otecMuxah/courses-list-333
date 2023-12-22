import { FormControl } from '@angular/forms';
import { ColumnType } from './column-filter.type';

export type FormType = {
  selectedProperty: FormControl<ColumnType | null>;
  searchValue: FormControl<string | null>;
};
