using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using System.Data;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface ISurveyService
    {
        IEnumerable<Survey> GetAllSurveys();
        Survey GetSurveyById(int id);
        Survey CreateSurvey(Survey survey);
        SurveyDetail SubmitAnswer(SurveyDetail surveyDetails);
        IEnumerable<SurveyDetail> GetAllSurveyDetails();
        IEnumerable<SurveyDetail> GetCompleteSurveyDetails();
        void UpdateSurveyAnswer(SurveyAnswer surveyAnswer);
        void DeleteSurvey(int id);
    }


    public class SurveyService : ISurveyService
    {
        private DataContext _context;

        public SurveyService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Survey> GetAllSurveys()
        {
            return _context.Surveys;
        }

        public IEnumerable<SurveyDetail> GetAllSurveyDetails()
        {
            return _context.SurveyDetails
                        .Include(surveyAnswers => surveyAnswers.SurveyAnswers)
                        .ToList();

        }
        public IEnumerable<SurveyDetail> GetCompleteSurveyDetails()
        {
            return _context.SurveyDetails
                        .Include(surveyAnswers => surveyAnswers.SurveyAnswers).ThenInclude(department => department.DepartmentId)
                        .ToList();
        }

        public Survey GetSurveyById(int id)
        {
            return _context.Surveys.Find(id);
        }

        public Survey CreateSurvey(Survey survey)
        {
            _context.Set<Survey>().Add(survey);
            _context.SaveChanges();
            return survey;
        }

        public SurveyDetail SubmitAnswer(SurveyDetail surveyDetails)
        {

            _context.Set<SurveyDetail>().Add(surveyDetails);
            _context.SaveChanges();
            return surveyDetails;

        }
        public void UpdateSurveyAnswer(SurveyAnswer surveyAnswerParam)
        {
            var surveyAnswer = _context.SurveyAnswers.Find(surveyAnswerParam.Id);

            if (surveyAnswer == null)
                throw new AppException("Survey not found");

            surveyAnswer.Score = surveyAnswerParam.Score;

            _context.SurveyAnswers.Update(surveyAnswer);
            _context.SaveChanges();
        }

        public void DeleteSurvey(int id)
        {
            var survey = _context.Surveys.Find(id);
            if (survey != null)
            {
                _context.Surveys.Remove(survey);
                _context.SaveChanges();
            }
        }

    }
}