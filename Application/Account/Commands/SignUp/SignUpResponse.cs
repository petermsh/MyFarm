namespace Application.Account.Commands.SignUp;

public record SignUpResponse
{
    public string Username { get; set; }
    public string Token { get; set; }
}