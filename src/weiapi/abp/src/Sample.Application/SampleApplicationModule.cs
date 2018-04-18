using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Sample.Authorization;

namespace Sample
{
    [DependsOn(
        typeof(SampleCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SampleApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SampleAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SampleApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
