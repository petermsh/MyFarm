using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Application.Modules.Farms.Commands.CreateFarm;

public record CreateFarmCommand([Required] string Address, [Required] string Name) : IRequest<CreateFarmResponse>;