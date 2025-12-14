namespace Backend.WebApi.Interfaces.Filters;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Backend.WebApi.Interfaces.Envelope;

public class ModelValidationFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = context.ModelState
                .Where(kv => kv.Value is not null && kv.Value.Errors.Count > 0)
                .ToDictionary(
                    kv => kv.Key,
                    kv => kv.Value!.Errors.Select(e => string.IsNullOrWhiteSpace(e.ErrorMessage) ? "Invalid value" : e.ErrorMessage).ToArray()
                );

            var envelope = new ApiEnvelope(
                status: "error",
                code: 400,
                message: "Validacion de datos fallida",
                result: new { errors }
            );

            context.Result = new ObjectResult(envelope) { StatusCode = 400 };
        }
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}
