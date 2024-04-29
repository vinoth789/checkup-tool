using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.FieldOfActions;
using WebApi.Models.Questions;
using WebApi.Models.Surveys;
using WebApi.Models.SurveyAnswers;

namespace WebApi.Models.SurveyDetails
{
    public class RegisterSurveyDetailModel
    {
        
        [Required] 
        public int QuestionId { get; set; }
        [Required] 
        public int FieldOfActionId { get; set; }
        [Required]        
        public int SurveyId { get; set; }
        [Required] 
        public virtual ICollection<RegisterSurveyAnswerModel> SurveyAnswers { get; set; }

    }
}