using System.Threading.Tasks;
using Backend.WebApi.Interfaces.Envelope;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Http;

namespace Backend.WebApi.Security;


public sealed class ApiAuthorizationResultHandler : IAuthorizationMiddlewareResultHandler
{
    private readonly AuthorizationMiddlewareResultHandler defaultHandler = new();

    public async Task HandleAsync(
        RequestDelegate next,
        HttpContext context,
        AuthorizationPolicy policy,
        PolicyAuthorizationResult authorizeResult)
    {
        
        if (authorizeResult.Challenged)
        {
            const int code = StatusCodes.Status401Unauthorized;

            var envelope = new ApiEnvelope(
                status: "error",
                code: code,
                message: "No autorizado",
                result: new { detail = "No autenticado" }
            );

            context.Response.StatusCode = code;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(envelope);
            return;
        }

        
        if (authorizeResult.Forbidden)
        {
            const int code = StatusCodes.Status403Forbidden;

            var envelope = new ApiEnvelope(
                status: "error",
                code: code,
                message: "Acceso denegado",
                result: new { detail = "Acceso denegado" }
            );

            context.Response.StatusCode = code;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(envelope);
            return;
        }

        
        await defaultHandler.HandleAsync(next, context, policy, authorizeResult);
    }
}
