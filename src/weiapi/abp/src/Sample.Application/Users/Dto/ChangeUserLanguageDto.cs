using System.ComponentModel.DataAnnotations;

namespace Sample.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}