using System;
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

        // ENDPOINTS \\

        // API method for getting a list of activities/events
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        // getting specific event based on id
        // params pass through httpget
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            // initialize query class with id by using {} to have access to route param
            return await _mediator.Send(new Details.Query { Id = id });
        }


    }
}