
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class Survey
    {
        public int Id { get; set; }
        public string SurveyName {get; set; }
        public Company Company { get; set; }
        
        [ForeignKey("Company")]
        public int CompanyId { get; set; }
        public virtual ICollection<SurveyDetail> Surveys { get; set; }

    }
}