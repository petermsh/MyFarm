using System.ComponentModel.DataAnnotations;

namespace Domain.Enums;

public enum SeasonStatus
{
    [Display(Name = "Brak danych")]
    NoData,
    
    [Display(Name = "Aktywny")]
    Active = 1,
    
    [Display(Name = "Zakończony")]
    Finished = 2,
    
}