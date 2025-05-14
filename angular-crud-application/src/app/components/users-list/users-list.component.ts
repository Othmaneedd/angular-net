import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { ExportService } from '../../service/export.service'; // Add this import



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  Users: any[] = [];
  searchText = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  itemsPerPage = 7;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe((res: any) => {
      this.Users = res;
    });
  }

  delete(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteUser(id).subscribe(() => {
        this.Users.splice(i, 1);
      });
    }
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  get paginatedUsers() {
    let filtered = this.Users
      .filter(user =>
        Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );

    if (this.sortColumn) {
      filtered = filtered.sort((a, b) => {
        const aVal = a[this.sortColumn]?.toString().toLowerCase();
        const bVal = b[this.sortColumn]?.toString().toLowerCase();
        return this.sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    const filteredLength = this.Users.filter(user =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    ).length;
    return Math.ceil(filteredLength / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  exportUsers() {
  // Get the filtered and sorted data
  const dataToExport = this.paginatedUsers;
  
  // Convert to CSV or Excel using a library like xlsx
  // Example with simple CSV:
  const csvContent = this.convertToCSV(dataToExport);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users_export.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

private convertToCSV(data: any[]): string {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(','));
  return [header, ...rows].join('\n');
}
}
