
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class SurveyAnswer
    {
        public int Id { get; set; }
        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public int Score { get; set; }

        [ForeignKey("SurveyDetail")]
        public int SurveyDetailId { get; set; }

    }
}