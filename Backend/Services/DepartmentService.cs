using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Departments;
using AutoMapper;

namespace WebApi.Services
{
    public interface IDepartmentService
    {
        IEnumerable<Department> GetAll();
        IEnumerable<DefaultDepartment> GetDefaultDepartments();
        Department GetDepartmentById(int id);
        List<Department> CreateDepartment(List<Department> departmentList);
        void UpdateDepartment(Department department, string departmentName = null);
        void DeleteDepartment(int id);
    }

    public class DepartmentService : IDepartmentService
    {
        private DataContext _context;
        private IMapper _mapper;

        public DepartmentService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<Department> GetAll()
        {
            return _context.Departments;
        }
        public IEnumerable<DefaultDepartment> GetDefaultDepartments()
        {
            return _context.DefaultDepartments.OrderBy(x => x.DepartmentName).ToList(); ;
        }

        public Department GetDepartmentById(int id)
        {
            return _context.Departments.Find(id);
        }

        public List<Department> CreateDepartment(List<Department> departmentList)
        {
            foreach (Department departmentModal in departmentList)
            {
                var department = _mapper.Map<Department>(departmentModal);
                _context.Departments.Add(department);
                _context.SaveChanges();
            }
            return departmentList;
        }

        public void UpdateDepartment(Department departmentParam, string password = null)
        {
            var department = _context.Departments.Find(departmentParam.Id);

            if (department == null)
                throw new AppException("Department not found");

            // update department if it has changed
            if (!string.IsNullOrWhiteSpace(departmentParam.DepartmentName) && departmentParam.DepartmentName != department.DepartmentName)
            {
                // throw error if the new department is already taken
                if (_context.Departments.Any(x => x.DepartmentName == departmentParam.DepartmentName))
                    throw new AppException("DepartmentName " + departmentParam.DepartmentName + " is already taken");

                department.DepartmentName = departmentParam.DepartmentName;
            }

            _context.Departments.Update(department);
            _context.SaveChanges();
        }

        public void DeleteDepartment(int id)
        {
            var department = _context.Departments.Find(id);
            if (department != null)
            {
                _context.Departments.Remove(department);
                _context.SaveChanges();
            }
        }
    }
}