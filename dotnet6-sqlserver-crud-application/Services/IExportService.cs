public interface IExportService
{
    Task<ExportFile> GenerateExportFile(ExportRequest request);
}