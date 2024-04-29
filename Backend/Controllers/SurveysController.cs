using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models.Surveys;
using WebApi.Models.SurveyAnswers;
using WebApi.Models.SurveyDetails;


namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api")]
    public class SurveysController : ControllerBase
    {
        private ISurveyService _surveyService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public SurveysController(
            ISurveyService surveyService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _surveyService = surveyService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterSurveyModel newSurvey)
        {
            // map model to entity
            var survey = _mapper.Map<Survey>(newSurvey);
            try
            {
                // create company
                _surveyService.CreateSurvey(survey);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("registerAnswers")]
        public IActionResult RegisterAnswers([FromBody] RegisterSurveyDetailModel surveyDetail)
        {
            // map model to entity
            var surveyDetails = _mapper.Map<SurveyDetail>(surveyDetail);
            try
            {
                // create company
                _surveyService.SubmitAnswer(surveyDetails);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var surveys = _surveyService.GetAllSurveys();
                var surveyList = _mapper.Map<IList<SurveyModel>>(surveys);
                return Ok(surveyList);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("surveyDetails")]
        public IActionResult GetAllSurveyDetails()
        {
            try
            {
                var surveyDetails = _surveyService.GetAllSurveyDetails();
                var surveyDetailsList = _mapper.Map<IList<SurveyDetailModel>>(surveyDetails);
                return Ok(surveyDetailsList);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("completeSurveyDetails")]
        public IActionResult GetCompleteSurveyDetails()
        {
            try
            {
                var surveyDetails = _surveyService.GetCompleteSurveyDetails();
                var surveyDetailsList = _mapper.Map<IList<SurveyDetailModel>>(surveyDetails);
                return Ok(surveyDetailsList);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var survey = _surveyService.GetSurveyById(id);
            var surveyModel = _mapper.Map<SurveyModel>(survey);
            return Ok(surveyModel);
        }

        [HttpPut("updateAnswer/{id}")]
        public IActionResult Update(int id, [FromBody] UpdateSurveyAnswerModel model)
        {
            // map model to entity and set id
            var surveyAnswer = _mapper.Map<SurveyAnswer>(model);
            surveyAnswer.Id = id;
            try
            {
                // update survey answer 
                _surveyService.UpdateSurveyAnswer(surveyAnswer);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _surveyService.DeleteSurvey(id);
            return Ok();
        }
    }
}
