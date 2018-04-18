using System.Collections.Generic;

namespace Sample.Dto
{
    public class DeletedOutputDto
    {
        public List<string> Deleted { get; set; }
        public List<string> NotDelete { get; set; }

        public DeletedOutputDto()
        {
            Deleted = new List<string>();
            NotDelete =new List<string>();
        }
    }
}