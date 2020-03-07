using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // cntrl + . for quick fix menu
    // API Controllers need routes and API Attributes
    // needs to dervie from MVC controller base class

    // Always needs a route, how do we get to this controller!
    [Route("api/[controller]")]
    [ApiController]


    public class EventsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EventsController(IMediator mediator)
        {
            // mediator available within the api controller
            // this allows the api to get the data from the db for
            // the http request
            _mediator = mediator;

        }

        // Endpoints
        // API method for getting a list of activities/events
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query());
        }
    }
}