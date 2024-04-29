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
using WebApi.Models.Questions;
using WebApi.Models.FieldOfActions;


namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api")]
    public class QuestionsController : ControllerBase
    {
        private IQuestionService _questionService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public QuestionsController(
            IQuestionService questionService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _questionService = questionService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]

        [HttpGet]
        public IActionResult GetAll()
        {
            var questions = _questionService.GetAllQuestions();
            var questionModel = _mapper.Map<IList<QuestionModel>>(questions);
            return Ok(questionModel);
        }

        [HttpGet("fieldOfActions")]
        public IActionResult GetAllFieldOfActions()
        {
            var fieldOfActions = _questionService.GetAllFieldOfActions();
            var fieldOfActionModel = _mapper.Map<IList<FieldOfActionModel>>(fieldOfActions);
            return Ok(fieldOfActionModel);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var question = _questionService.GetQuestionById(id);
            var questionModel = _mapper.Map<QuestionModel>(question);
            return Ok(questionModel);
        }
    }
}
