
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public FieldOfAction FieldOfAction { get; set; }
        
        [ForeignKey("FieldOfAction")]
        public int FieldOfActionId { get; set; }
        public string SurveyQuestion { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Option5 { get; set; }

    }
}