using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Services.PersonService
{
    public interface IPersonService
    {
        Task<List<GetPersonOverviewDto>> GetAll(PaginationParameters paginationParameters);
        Task<GetPersonDto> GetById(int id);
        Task<GetPersonOverviewDto> Add(AddPersonDto newPerson);
        Task<GetPersonOverviewDto> Update(int id ,UpdatePersonDto updatedPerson);
        void Delete(int id);
    }
}