using AutoMapper;
using WebApi.Entities;
using WebApi.Models.UserProfiles;
using WebApi.Models.Companies;
using WebApi.Models.Departments;
using WebApi.Models.Surveys;
using WebApi.Models.SurveyDetails;
using WebApi.Models.SurveyAnswers;
using WebApi.Models.Questions;
using WebApi.Models.FieldOfActions;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserProfile, UserProfileModel>();
            CreateMap<UserProfileRegisterModel, UserProfile>();
            CreateMap<UserProfileUpdateModel, UserProfile>();

            CreateMap<Company, CompanyModel>();
            CreateMap<RegisterCompanyModel, Company>();
            CreateMap<UpdateCompanyModel, Company>();

            CreateMap<Department, DepartmentModel>();
            CreateMap<RegisterDepartmentModel, Department>();
            CreateMap<UpdateDepartmentModel, Department>();

            CreateMap<Survey, SurveyModel>();
            CreateMap<RegisterSurveyModel, Survey>();
            CreateMap<UpdateSurveyModel, Survey>();

            CreateMap<SurveyDetail, SurveyDetailModel>();
            CreateMap<RegisterSurveyDetailModel, SurveyDetail>();
            CreateMap<UpdateSurveyDetailModel, SurveyDetail>();

            CreateMap<SurveyAnswer, SurveyAnswerModel>();
            CreateMap<RegisterSurveyAnswerModel, SurveyAnswer>();
            CreateMap<UpdateSurveyAnswerModel, SurveyAnswer>();


            CreateMap<DefaultDepartment, DefaultDepartmentModel>();
            CreateMap<Question, QuestionModel>();
            CreateMap<FieldOfAction, FieldOfActionModel>();

            // CreateMap<User, UserModel>();
            // CreateMap<RegisterModel, User>();
            // CreateMap<UpdateModel, User>();

        }
    }
}