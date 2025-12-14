using System.Collections.Generic;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApi.Swagger
{
    public class ProblemDetailsSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema? schema, SchemaFilterContext context)
        {
            if (schema == null) return;

            var t = context.Type;
            if (t == typeof(ProblemDetails) || t == typeof(ValidationProblemDetails))
            {
                // Define a concise schema for ProblemDetails to avoid additionalProp placeholders
                schema.Type = "object";
                schema.Properties = new Dictionary<string, OpenApiSchema>
                {
                    ["type"] = new OpenApiSchema { Type = "string", Example = new OpenApiString("https://tools.ietf.org/html/rfc7231#section-6.6.1") },
                    ["title"] = new OpenApiSchema { Type = "string", Example = new OpenApiString("One or more validation errors occurred.") },
                    ["status"] = new OpenApiSchema { Type = "integer", Format = "int32", Example = new OpenApiInteger(400) },
                    ["detail"] = new OpenApiSchema { Type = "string", Example = new OpenApiString("See the errors property for details.") },
                    ["instance"] = new OpenApiSchema { Type = "string", Example = new OpenApiString("/api/resource") }
                };

                // Prevent Swagger from rendering additionalProp1/2/3 example placeholders
                schema.AdditionalPropertiesAllowed = false;
            }
        }
    }
}
