using Application.Modules.Plants.Commands.CreatePlant;
using Application.Modules.Plants.Commands.DeletePlant;
using Application.Modules.Plants.Commands.UpdatePlant;
using Application.Modules.Plants.Queries.BrowsePlants;
using Application.Modules.Plants.Queries.GetPlant;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

public sealed class PlantsController : BaseApiController
{
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get Plant")]
    public async Task<ActionResult<GetPlantResponse>> GetPlant([FromRoute] Guid id)
    {
        var result = await Mediator.Send(new GetPlantQuery { Id = id });

        return Ok(result);
    }
    
    [HttpGet]
    [SwaggerOperation(Summary = "Browse Plants")]
    public async Task<ActionResult<List<PlantDto>>> BrowsePlants()
    {
        var result = await Mediator.Send(new BrowsePlantsQuery());

        return Ok(result);
    }
    
    [HttpPost]
    [SwaggerOperation(Summary = "Create Plant")]
    public async Task<ActionResult<CreatePlantResponse>> CreatePlant(CreatePlantCommand command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpPut]
    [SwaggerOperation(Summary = "Update Plant")]
    public async Task<IActionResult> UpdatePlant(UpdatePlantCommand command)
    {
        await Mediator.Send(command);

        return NoContent();
    }
    
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete Plant")]
    public async Task<IActionResult> DeletePlant([FromRoute] Guid id)
    {
        await Mediator.Send(new DeletePlantCommand { Id = id });

        return NoContent();
    }
}