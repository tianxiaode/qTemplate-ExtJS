using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Sample.Authorization.Roles;
using Sample.Authorization.Users;
using Sample.MultiTenancy;

namespace Sample.EntityFrameworkCore
{
    public class SampleDbContext : AbpZeroDbContext<Tenant, Role, User, SampleDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public SampleDbContext(DbContextOptions<SampleDbContext> options)
            : base(options)
        {
        }
    }
}
