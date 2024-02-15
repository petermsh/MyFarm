using Application.Modules.Seasons.Commands.CreateSeason;
using Application.Modules.Seasons.Commands.DeleteSeason;
using Application.Modules.Seasons.Commands.UpdateSeason;
using Application.Modules.Seasons.Queries.BrowseSeasons;
using Application.Modules.Seasons.Queries.GetSeason;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

public sealed class SeasonsController : BaseApiController
{
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get Season")]
    public async Task<ActionResult<GetSeasonResponse>> GetFarm([FromRoute] Guid id)
    {
        var result = await Mediator.Send(new GetSeasonQuery { Id = id });

        return Ok(result);
    }
    
    [HttpGet]
    [SwaggerOperation(Summary = "Browse Seasons")]
    public async Task<ActionResult<List<SeasonDto>>> BrowseFarms()
    {
        var result = await Mediator.Send(new BrowseSeasonsQuery());

        return Ok(result);
    }
    
    [HttpPost]
    [SwaggerOperation(Summary = "Create Season")]
    public async Task<ActionResult<CreateSeasonResponse>> CreateSeason(CreateSeasonCommand command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }
    
    [HttpPut]
    [SwaggerOperation(Summary = "Update Season")]
    public async Task<IActionResult> UpdateSeason(UpdateSeasonCommand command)
    {
        await Mediator.Send(command);

        return NoContent();
    }
    
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete Season")]
    public async Task<IActionResult> DeleteSeason([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteSeasonCommand {Id = id});

        return NoContent();
    }

    
    
}