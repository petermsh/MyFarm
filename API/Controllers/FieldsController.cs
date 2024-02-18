using Application.Modules.Fields.Commands.CreateField;
using Application.Modules.Fields.Commands.DeleteField;
using Application.Modules.Fields.Commands.UpdateField;
using Application.Modules.Fields.Queries.BrowseFields;
using Application.Modules.Fields.Queries.GetField;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

public sealed class FieldsController : BaseApiController
{
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get Field")]
    public async Task<ActionResult<GetFieldResponse>> GetField([FromRoute] Guid id)
    {
        var result = await Mediator.Send(new GetFieldQuery { Id = id });

        return Ok(result);
    }
    
    [HttpGet]
    [SwaggerOperation(Summary = "Browse Fields")]
    public async Task<ActionResult<List<FieldDto>>> BrowseFields([FromQuery(Name = "farmId")] string? farmId)
    {
        var query = farmId is null ? new BrowseFieldsQuery() : new BrowseFieldsQuery { FarmId = new Guid(farmId) };
        
        var result = await Mediator.Send(query);

        return Ok(result);
    }
    
    [HttpPost]
    [SwaggerOperation(Summary = "Create Field")]
    public async Task<ActionResult<CreateFieldResponse>> CreateField(CreateFieldCommand command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpPut]
    [SwaggerOperation(Summary = "Update Field")]
    public async Task<IActionResult> UpdateField(UpdateFieldCommand command)
    {
        await Mediator.Send(command);

        return NoContent();
    }
    
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete Field")]
    public async Task<IActionResult> DeleteField([FromRoute] Guid id)
    {
        await Mediator.Send(new DeleteFieldCommand { Id = id });

        return NoContent();
    }
}