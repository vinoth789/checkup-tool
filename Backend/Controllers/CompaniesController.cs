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
using WebApi.Models.Companies;


namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api")]
    public class CompaniesController : ControllerBase
    {
        private ICompanyService _companyService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public CompaniesController(
            ICompanyService companyService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _companyService = companyService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterCompanyModel newCompany)
        {
            // map model to entity
            var company = _mapper.Map<Company>(newCompany);
            try
            {
                // create company
                _companyService.CreateCompany(company);
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
                var companies = _companyService.GetAllCompanies();
                var companyList = _mapper.Map<IList<CompanyModel>>(companies);
                return Ok(companyList);
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
            var company = _companyService.GetCompanyById(id);
            var companyModel = _mapper.Map<CompanyModel>(company);
            return Ok(companyModel);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateCompanyModel model)
        {
            // map model to entity and set id
            var company = _mapper.Map<Company>(model);
            company.Id = id;
            try
            {
                // update company 
                _companyService.UpdateCompany(company, model.CompanyName);
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
            _companyService.DeleteCompany(id);
            return Ok();
        }
    }
}
