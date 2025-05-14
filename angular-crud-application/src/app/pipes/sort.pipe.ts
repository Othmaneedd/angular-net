import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(array: any[], column: string, direction: string): any[] {
    if (!array || !column || !direction) return array;

    return array.sort((a, b) => {
      const aVal = a[column]?.toString().toLowerCase();
      const bVal = b[column]?.toString().toLowerCase();

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
