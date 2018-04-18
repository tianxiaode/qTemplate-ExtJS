using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Abp;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Abp.Localization;
using Abp.Runtime.Session;
using Abp.Runtime.Validation;
using Newtonsoft.Json.Linq;
using Sample.Authorization;
using Sample.Authorization.Roles;
using Sample.Authorization.Users;
using Sample.Dto;
using Sample.Roles.Dto;
using Sample.Sessions.Dto;
using Sample.Users.Dto;

namespace Sample.Users
{
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService :  SampleCrudAppServiceBase<User, UserDto, long, GetAllInputDto>, IUserAppService
    {
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly IRepository<Role> _roleRepository;
        private readonly IPasswordHasher<User> _passwordHash;
        private readonly IRepository<UserRole,long> _userRoleRepository;

        public UserAppService(
            IRepository<User, long> repository,
            UserManager userManager,
            RoleManager roleManager,
            IRepository<Role> roleRepository,
            IPasswordHasher<User> passwordHasher)
            : base(repository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _roleRepository = roleRepository;
            _passwordHash = passwordHasher;
        }



        private readonly JObject _allowSorts = new JObject()
        {
            { "userName", "UserName" },
            { "surname", "Surname" },
            { "name", "Name" },
            { "emailAddress", "EmailAddress" },
            { "fullName", "FullName" },
            { "creationTime", "CreationTime" },
            { "lastLoginTime", "LastLoginTime" },
            { "isActive", "IsActive" }
        };

        public UserAppService(IRepository<User, long> repository, UserManager userManager, RoleManager roleManager,
            IRepository<Role> roleRepository, IPasswordHasher<User> passwordHash,
            IRepository<UserRole, long> userRoleRepository) : base(repository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _roleRepository = roleRepository;
            _passwordHash = passwordHash;
            _userRoleRepository = userRoleRepository;
        }



        public async Task<PagedResultDto<UserDto>> GetAll(GetAllInputDto input)
        {

            var query = Repository.GetAllIncluding(m => m.Roles).AsQueryable();
            if (!string.IsNullOrEmpty(input.Query))
                query = query.Where(m =>
                    m.UserName.Contains(input.Query) || m.EmailAddress.Contains(input.Query) || m.Name.Contains(input.Query)
                    || m.Surname.Contains(input.Query));
            var totalCount = await query.CountAsync();

            query = ApplySorting(query, input, _allowSorts);
            query = ApplyPaging(query, input);
            var userList = query.AsEnumerable().Select(MapToUserDto);
            return new PagedResultDto<UserDto>(
                totalCount,
                userList.ToList()
            );
        }

        private UserDto MapToUserDto(User user)
        {
            var userDto = ObjectMapper.Map<UserDto>(user);
            userDto.RoleNames = _userManager.GetRolesAsync(user).GetAwaiter().GetResult().ToArray();
            return userDto;
        }

        public async Task<UserDto> Create(CreateOrUpdateUserInputDto input)
        {
            if (string.IsNullOrEmpty(input.Password))
            {
                throw new AbpValidationException("Password required", new List<ValidationResult>()
                {
                    new ValidationResult("Password required", new List<string>(){"Password"})
                });
            }
            if (Repository.GetAll().Any(m => m.UserName == input.UserName))
            {
                throw new AbpValidationException("User name already exists", new List<ValidationResult>()
                {
                    new ValidationResult("User name already exists", new List<string>(){"UserName"})
                });
            }
            if (Repository.GetAll().Any(m => m.EmailAddress == input.EmailAddress))
            {
                throw new AbpValidationException("Email Address already exists", new List<ValidationResult>()
                {
                    new ValidationResult("Email Address already exists", new List<string>(){"EmailAddress"})
                });
            }

            input.Id = null;
            var user = ObjectMapper.Map<User>(input);
            user.TenantId = AbpSession.TenantId;
            user.Password = _passwordHash.HashPassword(user, input.Password);
            user.IsEmailConfirmed = true;


            CheckErrors(await UserManager.CreateAsync(user));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRoles(user, input.RoleNames));
            }

            await CurrentUnitOfWork.SaveChangesAsync(); //To get new user's Id.


            return ObjectMapper.Map<UserDto>(user);

        }

        public async Task<UserDto> Update(CreateOrUpdateUserInputDto input)
        {
            if (input.Id == null)
            {
                throw new AbpException("user not exits");
            }

            if (Repository.GetAll().Any(m => m.UserName == input.UserName && m.Id != input.Id))
            {
                throw new AbpValidationException("User name already exists", new List<ValidationResult>()
                {
                    new ValidationResult("User name already exists", new List<string>(){"UserName"})
                });
            }
            if (Repository.GetAll().Any(m => m.EmailAddress == input.EmailAddress && m.Id != input.Id))
            {
                throw new AbpValidationException("Email Address already exists", new List<ValidationResult>()
                {
                    new ValidationResult("Email Address already exists", new List<string>(){"EmailAddress"})
                });
            }


            var user = await Repository.FirstOrDefaultAsync(input.Id.Value);
            if (user == null)
            {
                throw new AbpException("user not exits");
            }

            ObjectMapper.Map(input, user);

            CheckErrors(await UserManager.UpdateAsync(user));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRoles(user, input.RoleNames));
            }

            return ObjectMapper.Map<UserDto>(user);

        }

        public async Task<DeletedOutputDto> Delete(DeleteInputDto input)
        {
            var users = Repository.GetAll().Where(m => input.Id.Contains(m.Id));
            var dto = new DeletedOutputDto();
            foreach (var user in users)
            {
                if (await UserManager.DeleteAsync(user) == IdentityResult.Success)
                {
                    dto.Deleted.Add(user.UserName);
                }
                else
                {
                    dto.NotDelete.Add(user.UserName);
                }

            }

            return dto;
        }

        public async Task<bool> CheckChange(CheckChangeInputDto input)
        {
            var user = await UserManager.FindByIdAsync(input.Id.ToString());
            if (user == null)
            {
                throw new AbpException("User not exits");
            }

            if (input.Field == "isActive")
            {
                user.IsActive = !user.IsActive;
                CheckErrors(await UserManager.UpdateAsync(user));
                return true;
            }
            else
            {
                throw new AbpException("Field not exits");

            }
        }


    }
}
