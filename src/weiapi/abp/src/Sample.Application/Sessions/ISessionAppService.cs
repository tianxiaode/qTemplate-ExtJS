using System.Threading.Tasks;
using Abp.Application.Services;
using Sample.Sessions.Dto;

namespace Sample.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
