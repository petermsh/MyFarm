using Application.Modules.Farms.Queries.BrowseFarms;
using Application.Modules.Operations.Commands.CreateOperation;
using Application.Modules.Operations.Commands.DeleteOperation;
using Application.Modules.Operations.Commands.UpdateOperation;
using Application.Modules.Operations.Queries.BrowseOperations;
using Application.Modules.Operations.Queries.GetGroupedOperations;
using Application.Modules.Operations.Queries.GetOperation;
using Infrastructure.Modules.Seasons.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

public sealed class OperationsController : BaseApiController
{
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get Operation")]
    public async Task<ActionResult<GetOperationResponse>> GetOperation([FromRoute] Guid id)
    {
        var result = await Mediator.Send(new GetOperationQuery { Id = id });

        return Ok(result);
    }
    
    [HttpGet]
    [SwaggerOperation(Summary = "Browse Operations")]
    public async Task<ActionResult<List<OperationDto>>> BrowseOperations([FromQuery(Name = "seasonId")] string? seasonId, [FromQuery(Name = "fieldId")] string? fieldId)
    {
        var query = new BrowseOperationsQuery();

        if (seasonId is not null)
            query.SeasonId = new Guid(seasonId);
        
        if (fieldId is not null)
            query.FieldId = new Guid(fieldId);

        var result = await Mediator.Send(query);

        return Ok(result);
    }
    
    [HttpGet("grouped/{fieldId:guid}")]
    [SwaggerOperation(Summary = "Get grouped Operation")]
    public async Task<ActionResult<List<GroupedOperationsResponse>>> GetGroupedOperations([FromRoute] Guid fieldId)
    {
        var result = await Mediator.Send(new GetGroupedOperationsQuery(fieldId));

        return Ok(result);
    }
    
    [HttpPost]
    [SwaggerOperation(Summary = "Create Operation")]
    public async Task<ActionResult<CreateOperationResponse>> CreateOperation(CreateOperationCommand command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpPut]
    [SwaggerOperation(Summary = "Update Operation")]
    public async Task<IActionResult> UpdateOperation(UpdateOperationCommand command)
    {
        await Mediator.Send(command);

        return NoContent();
    }
    
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete Operation")]
    public async Task<IActionResult> DeleteOperation([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteOperationCommand { Id = id });

        return NoContent();
    }
}