using System.Threading.Tasks;
using Abp.Application.Services;
using Sample.Authorization.Accounts.Dto;

namespace Sample.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
