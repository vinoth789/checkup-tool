using System.Collections.Generic;
using WebApi.Models.Questions;
namespace WebApi.Models.FieldOfActions
{
  public class FieldOfActionModel
    {
        public int Id { get; set; }
        public string ActionName { get; set; }
        public virtual ICollection<QuestionModel> Questions { get; set; }
    }
}