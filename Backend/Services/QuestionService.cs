using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public interface IQuestionService
    {
        IEnumerable<Question> GetAllQuestions();
        IEnumerable<FieldOfAction> GetAllFieldOfActions();
        Question GetQuestionById(int id);
    }

    public class QuestionService : IQuestionService
    {
        private DataContext _context;

        public QuestionService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Question> GetAllQuestions()
        {
            return _context.Questions;
        }

        public IEnumerable<FieldOfAction> GetAllFieldOfActions()
        {
            return _context.FieldOfActions
                         .Include(q => q.Questions)
                         .ToList();
        }

        public Question GetQuestionById(int id)
        {
            return _context.Questions.Find(id);
        }

    }
}