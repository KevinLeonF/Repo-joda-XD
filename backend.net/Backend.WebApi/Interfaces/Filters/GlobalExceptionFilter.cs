namespace Backend.WebApi.Interfaces.Filters;

using Backend.WebApi.Interfaces.Envelope;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class GlobalExceptionFilter : IExceptionFilter
{
    private readonly ILogger<GlobalExceptionFilter> logger;

    public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
        => this.logger = logger;

    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;

        int code;
        string message;
        object? result;

        switch (ex)
        {
            case UnauthorizedAccessException:
                code = StatusCodes.Status401Unauthorized;
                message = "Inicio de sesion incorrecto";
                result = new
                {
                    detail = string.IsNullOrWhiteSpace(ex.Message)
                        ? "Email o password incorrectos"
                        : ex.Message
                };
                logger.LogWarning(ex, "Unauthorized access at {Path}", context.HttpContext.Request.Path);
                break;

            default:
                code = StatusCodes.Status500InternalServerError;
                message = "Error interno del servidor";
                result = new { detail = "Ocurrio un error inesperado" };
                logger.LogError(ex, "Unhandled exception at {Path}", context.HttpContext.Request.Path);
                break;
        }

        var envelope = new ApiEnvelope(
            status: code is >= 200 and < 300 ? "success" : "error",
            code: code,
            message: message,
            result: result
        );

        context.Result = new ObjectResult(envelope) { StatusCode = code };
        context.ExceptionHandled = true;
    }
}
