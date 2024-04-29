using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.FieldOfActions;
using WebApi.Models.Questions;
using WebApi.Models.Companies;
using WebApi.Models.SurveyAnswers;

namespace WebApi.Models.SurveyDetails
{
  public class SurveyDetailModel
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int FieldOfActionId { get; set; }        
        public int SurveyId { get; set; }
        public virtual ICollection<SurveyAnswerModel> SurveyAnswers { get; set; }

    }
        
  }