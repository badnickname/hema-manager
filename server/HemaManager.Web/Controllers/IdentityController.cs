using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HemaManager.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class IdentityController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly ILogger<IdentityController> _logger;

    public IdentityController(SignInManager<IdentityUser> signInManager, ILogger<IdentityController> logger)
    {
        _signInManager = signInManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task Login(string userName, string password)
    {
        var result = await _signInManager.PasswordSignInAsync(userName, password, true, lockoutOnFailure: false);
        if (result.Succeeded)
            _logger.LogInformation("Successful login");
    }
}