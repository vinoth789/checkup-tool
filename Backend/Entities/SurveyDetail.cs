
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class SurveyDetail
    {
        public int Id { get; set; }

        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        
        [ForeignKey("FieldOfAction")]
        public int FieldOfActionId { get; set; }        
        
        [ForeignKey("Survey")]
        public int SurveyId { get; set; }
        public ICollection<SurveyAnswer> SurveyAnswers { get; set; }

    }
}