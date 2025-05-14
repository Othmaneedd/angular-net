[ApiController]
[Route("api/[controller]")]
public class ExportController : ControllerBase
{
    private readonly IExportService _exportService;

    // Injection de d�pendance du service
    public ExportController(IExportService exportService)
    {
        _exportService = exportService;
    }

    // Endpoint GET /api/export/export
    [HttpGet("export")]
    public async Task<IActionResult> ExportData([FromQuery] ExportRequest request)
    {
        try
        {
            // G�n�ration du fichier via le service
            var fileContent = await _exportService.GenerateExportFile(request);

            // Retourne le fichier en r�ponse
            return File(fileContent.Content, fileContent.ContentType, fileContent.FileName);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}