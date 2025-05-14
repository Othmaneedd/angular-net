public class ExportFile
{
    public byte[] Content { get; set; } // Contenu binaire du fichier
    public string ContentType { get; set; } // Type MIME
    public string FileName { get; set; } // Nom du fichier pour le téléchargement
}

public class ExportRequest
{
    public DateTime? StartDate { get; set; } // Filtre date de début
    public DateTime? EndDate { get; set; } // Filtre date de fin
    public string Format { get; set; } = "excel"; // Format d'export
}