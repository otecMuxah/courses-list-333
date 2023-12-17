import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectProperty',
})
export class ObjectPropertyPipe implements PipeTransform {
  transform(value: any[], property: string): string {
    if (!Array.isArray(value) || !property) {
      return '';
    }

    return value.map(obj => obj[property]).join(', ');
  }
}
