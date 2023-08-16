using Microsoft.AspNetCore.Identity;

namespace HemaManager.Workers;

public sealed class AdminCreatingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scope;
    private readonly ILogger<AdminCreatingWorker> _logger;

    public AdminCreatingWorker(IServiceScopeFactory scope, ILogger<AdminCreatingWorker> logger)
    {
        _scope = scope;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scope = _scope.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var user = await userManager.FindByNameAsync("admin");
        if (user is null)
        {
            var result = await userManager.CreateAsync(new IdentityUser
            {
                UserName = "admin",
            }, "Admin_0");
            _logger.LogInformation(result.Succeeded
                ? "Admin created"
                : string.Join(",", result.Errors.Select(x => x.Description)));
            return;
        }
        
        _logger.LogInformation("Admin already exist");
    }
}