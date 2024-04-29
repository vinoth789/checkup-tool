using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models.Departments;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api")]
    public class DepartmentsController : ControllerBase
    {
        private IDepartmentService _departmentService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public DepartmentsController(
            IDepartmentService departmentService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _departmentService = departmentService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] List<Department> departmentList)
        {
            try
            {
                _departmentService.CreateDepartment(departmentList);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("defaultDepartments")]
        public IActionResult GetDefaultDepartments()
        {
            var departments = _departmentService.GetDefaultDepartments();
            var departmentModel = _mapper.Map<IList<DefaultDepartmentModel>>(departments);
            return Ok(departmentModel);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var departments = _departmentService.GetAll();
            var departmentModel = _mapper.Map<IList<DepartmentModel>>(departments);
            return Ok(departmentModel);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var department = _departmentService.GetDepartmentById(id);
            var departmentModel = _mapper.Map<DepartmentModel>(department);
            return Ok(departmentModel);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateDepartmentModel model)
        {
            // map model to entity and set id
            var department = _mapper.Map<Department>(model);
            department.Id = id;

            try
            {
                // update company 
                _departmentService.UpdateDepartment(department, model.DepartmentName);
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
            _departmentService.DeleteDepartment(id);
            return Ok();
        }
    }
}
