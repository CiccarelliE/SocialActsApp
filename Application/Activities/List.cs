using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    //Using mediatR
    public class List
    {


        /* Query, specifically for requesting Activity Domain(model) data
         and put in a list */
        public class Query : IRequest<List<Activity>> { }

        //Handler needs access to DataContext | gets activties from db and returns them
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            // required below
            private readonly DataContext _context;
            // constructor below for handler class
            public Handler(DataContext context)
            {
                _context = context;
            }
            // required above

            // Handle method | Async
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activitiesList = await _context.Activities.ToListAsync();

                return activitiesList;
            }
        }
    }
}