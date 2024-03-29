﻿using Application.Abstractions;

namespace Application.Modules.Account.Exceptions;

public class WrongPasswordException : ProjectException
{
    public WrongPasswordException() : base("Wrong password.")
    {
    }
}