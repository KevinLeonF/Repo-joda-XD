namespace Backend.Infrastructure.Configuration;

public sealed class AppInfoOptions
{
    public const string SectionName = "AppInfo";

    public string SystemName { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public string Developer { get; set; } = string.Empty;
}

public sealed class AdminSeedOptions
{
    public const string SectionName = "AdminSeed";

    public string Name { get; set; } = "BrayanAdmin";
    public string Email { get; set; } = "adminbrayan@local.com";
    public string Password { get; set; } = "12345678";
}