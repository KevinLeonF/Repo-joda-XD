using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Backend.WebApi.Interfaces.Envelope;

public class EnvelopeResultFilter : IAsyncResultFilter
{
    public Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
    {
        // evitar doble envoltura
        if (context.Result is ObjectResult already && already.Value is ApiEnvelope)
            return next();

        int httpCode = context.HttpContext.Response.StatusCode;
        if (httpCode == 0) httpCode = StatusCodes.Status200OK;

        switch (context.Result)
        {
            case ObjectResult obj:
                {
                    var code = obj.StatusCode ?? httpCode;
                    var envelope = new ApiEnvelope(
                        status: code is >= 200 and < 300 ? "success" : "error",
                        code: code,
                        message: DefaultMessage(code),
                        result: obj.Value
                    );
                    context.Result = new ObjectResult(envelope) { StatusCode = code };
                    break;
                }

            case JsonResult json:
                {
                    var code = httpCode;
                    var envelope = new ApiEnvelope(
                        status: code is >= 200 and < 300 ? "success" : "error",
                        code: code,
                        message: DefaultMessage(code),
                        result: json.Value
                    );
                    context.Result = new ObjectResult(envelope) { StatusCode = code };
                    break;
                }

            case EmptyResult:
                {
                    var code = httpCode == 0 ? StatusCodes.Status204NoContent : httpCode;
                    var envelope = new ApiEnvelope(
                        status: code is >= 200 and < 300 ? "success" : "error",
                        code: code,
                        message: DefaultMessage(code),
                        result: null
                    );
                    context.Result = new ObjectResult(envelope) { StatusCode = code };
                    break;
                }

            case StatusCodeResult sc:
                {
                    var code = sc.StatusCode;

                    object? result = null;
                    if (code == StatusCodes.Status401Unauthorized)
                    {
                        result = new { detail = "No autenticado" };
                    }
                    else if (code == StatusCodes.Status403Forbidden)
                    {
                        result = new { detail = "Acceso denegado" };
                    }

                    var envelope = new ApiEnvelope(
                        status: code is >= 200 and < 300 ? "success" : "error",
                        code: code,
                        message: DefaultMessage(code),
                        result: result
                    );

                    context.Result = new ObjectResult(envelope) { StatusCode = code };
                    break;
                }

            case ChallengeResult:
                {
                    const int code = StatusCodes.Status401Unauthorized;
                    var envelope = new ApiEnvelope(
                        status: "error",
                        code: code,
                        message: DefaultMessage(code),
                        result: new { detail = "No autenticado" }
                    );
                    context.Result = new ObjectResult(envelope) { StatusCode = code };
                    break;
                }

            case ForbidResult:
                {
                    const int code = StatusCodes.Status403Forbidden;
                    var envelope = new ApiEnvelope(
                        status: "error",
                        code: code,
                        message: DefaultMessage(code),
                        result: new { detail = "Acceso denegado" }
                    );
                    context.Result = new ObjectResult(envelope) { StatusCode = code };
                    break;
                }

        }

        return next();
    }

    private static string DefaultMessage(int statusCode) =>
        statusCode switch
        {
            StatusCodes.Status401Unauthorized => "No autorizado",
            StatusCodes.Status403Forbidden => "Acceso denegado",
            >= 200 and < 300 => "OK",
            >= 400 and < 500 => "Solicitud invalida",
            >= 500 and < 600 => "Error interno del servidor",
            _ => "Procesado"
        };
}
