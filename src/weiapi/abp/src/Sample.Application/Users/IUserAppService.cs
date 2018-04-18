using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Sample.Dto;
using Sample.Roles.Dto;
using Sample.Users.Dto;

namespace Sample.Users
{
    public interface IUserAppService : IApplicationService
    {
        Task<PagedResultDto<UserDto>> GetAll(GetAllInputDto input);
        Task<UserDto> Create(CreateOrUpdateUserInputDto input);
        Task<UserDto> Update(CreateOrUpdateUserInputDto input);
        Task<DeletedOutputDto> Delete(DeleteInputDto input);
    }

}
