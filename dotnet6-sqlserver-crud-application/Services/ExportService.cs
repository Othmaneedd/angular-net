public class ExportService : IExportService
{
    private readonly IDataRepository _repository;

    public ExportService(IDataRepository repository)
    {
        _repository = repository;
    }

    public async Task<ExportFile> GenerateExportFile(ExportRequest request)
    {
        // 1. R�cup�ration des donn�es
        var data = await _repository.GetDataForExport(request);

        // 2. Cr�ation du fichier Excel (exemple avec EPPlus)
        using var package = new ExcelPackage();
        var worksheet = package.Workbook.Worksheets.Add("Data");

        // 3. Remplissage des donn�es
        worksheet.Cells["A1"].LoadFromCollection(data, true);

        // 4. Pr�paration du fichier pour le retour
        return new ExportFile
        {
            Content = package.GetAsByteArray(),
            ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            FileName = $"Export_{DateTime.Now:yyyyMMddHHmmss}.xlsx"
        };
    }
}