using System.ComponentModel.DataAnnotations;

namespace Domain.Enums;

public enum OperationType
{
    [Display(Name = "Brak danych")]
    NoData = 0,
    
    [Display(Name = "Przychód")]
    Earning = 1,
    
    [Display(Name = "Wydatek")]
    Expense = 2
}