using System.ComponentModel.DataAnnotations;

namespace Domain.Enums;

public enum OperationType
{
    [Display(Name = "Brak danych")]
    NoData,
    
    [Display(Name = "Przychód")]
    Earning,
    
    [Display(Name = "Wydatek")]
    Expense
}