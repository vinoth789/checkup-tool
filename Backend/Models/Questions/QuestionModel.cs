using WebApi.Models.FieldOfActions;
namespace WebApi.Models.Questions
{
  public class QuestionModel
    {
        public int Id { get; set; }
        public int FieldOfActionId { get; set; }
        public string QuestionCategory { get; set; }
        public string SurveyQuestion { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Option5 { get; set; }

    }
}