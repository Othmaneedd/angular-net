import { Component, OnInit } from '@angular/core';
import { WordExportService } from './service/word-export.service';  // Importer le service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '.Net + SQL Server + Angular 15 CRUD Application';
  isDarkMode = false;

  // Injecter le service WordExportService
  constructor(private wordExportService: WordExportService) {}

  ngOnInit() {
    const darkModeFromStorage = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = darkModeFromStorage;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  // Méthode pour activer/désactiver le mode sombre
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  // Méthode pour télécharger le fichier Word
generateWord(): void {
  this.wordExportService.generateWord().subscribe((response: Blob) => {
    const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'GeneratedUserReport.docx';
    link.click();
  }, error => {
    console.error('Erreur lors du téléchargement du fichier:', error);
  });
}
}
