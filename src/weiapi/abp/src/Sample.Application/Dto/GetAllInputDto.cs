using Abp.Application.Services.Dto;

namespace Sample.Dto
{
    public class GetAllInputDto : PagedAndSortedResultRequestDto
    {
        public string Query { get; set; }
    }
}