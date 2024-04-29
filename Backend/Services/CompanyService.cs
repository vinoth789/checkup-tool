using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using System.Data;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface ICompanyService
    {
        IEnumerable<Company> GetAllCompanies();
        Company GetCompanyById(int id);
        Company CreateCompany(Company company);
        void UpdateCompany(Company company, string companyName = null);
        void DeleteCompany(int id);
    }


    public class CompanyService : ICompanyService
    {
        private DataContext _context;

        public CompanyService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Company> GetAllCompanies()
        {
             return _context.Companies
                         .Include(d => d.Departments)
                         .Include(u => u.Users)                      
                         .ToList();
        }

        public Company GetCompanyById(int id)
        {
            return _context.Companies.Find(id);
        }

        public Company CreateCompany(Company company)
        {
            _context.Set<Company>().Add(company);
            _context.SaveChanges();
            return company;
        }

        public void UpdateCompany(Company companyParam, string password = null)
        {
            var company = _context.Companies.Find(companyParam.Id);

            if (company == null)
                throw new AppException("Company not found");

            // update Company if it has changed
            if (!string.IsNullOrWhiteSpace(companyParam.CompanyName) && companyParam.CompanyName != company.CompanyName)
            {
                // throw error if the new Company is already taken
                if (_context.Companies.Any(x => x.CompanyName == companyParam.CompanyName))
                    throw new AppException("CompanyName " + companyParam.CompanyName + " is already taken");

                company.CompanyName = companyParam.CompanyName;
            }

            if (companyParam.Departments == null)
                company.Departments = companyParam.Departments;

            // update user if provided
            if (companyParam.Users == null)
                company.Users = companyParam.Users;


            _context.Companies.Update(company);
            _context.SaveChanges();
        }

        public void DeleteCompany(int id)
        {
            var company = _context.Companies.Find(id);
            if (company != null)
            {
                _context.Companies.Remove(company);
                _context.SaveChanges();
            }
        }
    }
}