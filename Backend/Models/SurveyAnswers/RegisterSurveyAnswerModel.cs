using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.Departments;
using WebApi.Models.Users;
using WebApi.Models.SurveyDetails;

namespace WebApi.Models.SurveyAnswers
{
    public class RegisterSurveyAnswerModel
    {
        [Required]
        public int DepartmentId { get; set; }
        public int Score { get; set; }

    }
}