using System.Threading.Tasks;
using Sample.Configuration.Dto;

namespace Sample.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
