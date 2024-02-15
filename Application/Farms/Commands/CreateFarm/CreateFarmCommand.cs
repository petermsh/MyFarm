using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Application.Farms.Commands.CreateFarm;

public record CreateFarmCommand([Required] string Address, [Required] string Name) : IRequest<CreateFarmResponse>;