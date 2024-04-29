using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.Departments;
using WebApi.Models.SurveyDetails;
using WebApi.Models.Companies;

namespace WebApi.Models.Surveys
{
  public class UpdateSurveyModel
    {
        public string SurveyName { get; set; }
        public int CompanyId { get; set; }
        //public virtual ICollection<SurveyDetailModel> Surveys { get; set; }
    }
}