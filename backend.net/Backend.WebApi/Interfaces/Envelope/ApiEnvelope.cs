namespace Backend.WebApi.Interfaces.Envelope;

public record ApiEnvelope(
    string status,
    int code,
    string message,
    object? result
);
