using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Application.Farms.Commands.CreateFarm;

public record CreateFarmCommand([Required] string Address) : IRequest<CreateFarmResponse>;