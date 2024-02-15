using Application.Modules.Farms.Commands.CreateFarm;
using Application.Modules.Farms.Commands.DeleteFarm;
using Application.Modules.Farms.Commands.UpdateFarm;
using Application.Modules.Farms.Queries.BrowseFarms;
using Application.Modules.Farms.Queries.GetFarm;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

public sealed class FarmsController : BaseApiController
{
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get Farm")]
    public async Task<ActionResult<GetFarmResponse>> GetFarm([FromRoute] Guid id)
    {
        var result = await Mediator.Send(new GetFarmQuery { Id = id });

        return Ok(result);
    }
    
    [HttpGet]
    [SwaggerOperation(Summary = "Browse Farms")]
    public async Task<ActionResult<List<FarmsDto>>> BrowseFarms()
    {
        var result = await Mediator.Send(new BrowseFarmsQuery());

        return Ok(result);
    }
    
    [HttpPost]
    [SwaggerOperation(Summary = "Create Farm")]
    public async Task<ActionResult<CreateFarmResponse>> CreateFarm(CreateFarmCommand command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpPut]
    [SwaggerOperation(Summary = "Update Farm")]
    public async Task<IActionResult> UpdateFarm(UpdateFarmCommand command)
    {
        await Mediator.Send(command);

        return NoContent();
    }
    
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete Farm")]
    public async Task<IActionResult> DeleteFarm([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteFarmCommand { Id = id });

        return NoContent();
    }
}