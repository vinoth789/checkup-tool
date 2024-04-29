
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class FieldOfAction
    {
        public int Id { get; set; }
        public string ActionName { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}