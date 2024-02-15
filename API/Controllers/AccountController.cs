using Application.Modules.Account.Commands.SignIn;
using Application.Modules.Account.Commands.SignUp;
using Application.Modules.Account.Queries.GetCurrent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("signUp")]
    [SwaggerOperation(Summary="Sign Up")]
    public async Task<ActionResult<SignUpResponse>> SignUp(SignUpCommand command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }
    
    [AllowAnonymous]
    [HttpPost("signIn")]
    [SwaggerOperation(Summary="Sign In")]
    public async Task<ActionResult<SignInResponse>> SignIn(SignInCommand command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }
    
    [HttpGet]
    [SwaggerOperation(Summary="Get current User")]
    public async Task<ActionResult<GetCurrentUserResponse>> GetCurrentUser()
    {
        var result = await Mediator.Send(new GetCurrentUserQuery());

        return Ok(result);
    }
    
}