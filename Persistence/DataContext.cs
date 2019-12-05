using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    // We need DbContext to query our database
    public class DataContext : DbContext
    {
        // need this for data migration
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // Values is the name for the table in sqlite | entities
        public DbSet<Value> Values { get; set; }

        public DbSet<Activity> Activities { get; set; }

        // protected = only accessed in this class or derived class
        // overriding a method inside the DbContext class
        // when we create another migration, this will insert the values into our values table
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>().HasData(
                new Value
                {
                    Id = 1,
                    Name = "Value 101"
                },
                new Value
                {
                    Id = 2,
                    Name = "Value 102"
                },
                new Value
                {
                    Id = 3,
                    Name = "Value 103"
                }
            );
        }
    }
}
