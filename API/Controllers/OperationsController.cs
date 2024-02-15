using Application.Modules.Farms.Queries.BrowseFarms;
using Application.Modules.Operations.Commands.CreateOperation;
using Application.Modules.Operations.Commands.DeleteOperation;
using Application.Modules.Operations.Commands.UpdateOperation;
using Application.Modules.Operations.Queries.BrowseOperations;
using Application.Modules.Operations.Queries.GetOperation;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<ActionResult<List<OperationDto>>> BrowseOperations()
    {
        var result = await Mediator.Send(new BrowseOperationsQuery());

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