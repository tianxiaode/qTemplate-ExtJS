using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Sample.MultiTenancy.Dto;

namespace Sample.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
