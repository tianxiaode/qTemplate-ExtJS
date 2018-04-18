using Abp.Authorization;
using Sample.Authorization.Roles;
using Sample.Authorization.Users;

namespace Sample.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
