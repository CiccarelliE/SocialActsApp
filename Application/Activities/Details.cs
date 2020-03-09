using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        // querying specific activity
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }
        // query needs a handler
        public class Handler : IRequestHandler<Query, Activity>
        {
            // need access to our context so we create a constructor for handler
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // looking through data context, specifically in activities model and searching based on id
                var activity = await _context.Activities.FindAsync(request.Id);

                // returning activity var with specific id
                return activity;
            }
        }
    }
}