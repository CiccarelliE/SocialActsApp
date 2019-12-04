using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace DatingApp.API.Controllers
{
    // Always needs a route, how do we get to this controller!
    [Route("api/[controller]")]
    [ApiController]


    public class ValuesController : ControllerBase
    {
        // private field for DataContext paramater to have access to it in our controller
        private readonly DataContext _context;

        // to inject something into our controllers, we need to create a constructor
        public ValuesController(DataContext context)
        {
            _context = context;

        }

        // Steps above are required to have access to database data \\

        // GET api/values endpoint
        [HttpGet] // HTTP method
        public async Task<ActionResult<IEnumerable<Value>>> Get()
        {
            // we need to make this asynchronous, gets values from Values table and puts it in a list
            var values = await _context.Values.ToListAsync();
            // returns a http status code of 200
            return Ok(values);
        }

        // GET api/values/5 | this is how the routing params are
        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> Get(int id)
        {
            // FindAsync looks for what is passed to it, specifically the primary key | Id is the primary key of the Values table.
            var value = await _context.Values.FindAsync(id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
