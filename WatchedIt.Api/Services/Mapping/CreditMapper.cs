using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Services.Mapping
{
    public static class CreditMapper
    {
        public static GetCreditDto Map(Credit credit){
            return new GetCreditDto {
                Id = credit.Id,
                Film = FilmMapper.MapSimple(credit.Film),
                Person = PersonMapper.MapSimple(credit.Person),
                Role = credit.Role,
                Type = credit.Type
            };
        }

        public static GetCreditForPersonDto MapForPerson(Credit credit){
            return new GetCreditForPersonDto {
                Id = credit.Id,
                Film = FilmMapper.MapSimple(credit.Film),
                Role = credit.Role,
                Type = credit.Type
            };
        }

        public static GetCreditForFilmDto MapForFilm(Credit credit){
            return new GetCreditForFilmDto {
                Id = credit.Id,
                Person = PersonMapper.MapSimple(credit.Person),
                Role = credit.Role,
                Type = credit.Type
            };
        }

        public static AddCreditDto MapToAddCreditDto(int id, AddFilmCreditDto addCredit){
            return new AddCreditDto{
                FilmId = id,
                PersonId = addCredit.PersonId,
                Role = addCredit.Role,
                Type = addCredit.Type
            };
        }

        public static AddCreditDto MapToAddCreditDto(int id, AddPersonCreditDto addCredit){
            return new AddCreditDto{
                FilmId = addCredit.FilmId,
                PersonId = id,
                Role = addCredit.Role,
                Type = addCredit.Type
            };
        }

        public static GetCastCrewCreditsDto MapCastCrewCreditDto(List<Credit> credits){
            var cast = credits.Where(x => x.Type == CreditType.Cast).Select(c => CreditMapper.Map(c)).ToList();
            var crew = credits.Where(x => x.Type == CreditType.Crew).Select(c => CreditMapper.Map(c)).ToList();
            return new GetCastCrewCreditsDto{
                Cast = cast,
                Crew = crew
            };
        }

        public static GetFilmCastCrewCreditsDto MapFilmCastCrewCreditDto(List<Credit> credits){
            var cast = credits.Where(x => x.Type == CreditType.Cast).Select(c => CreditMapper.MapForFilm(c)).ToList();
            var crew = credits.Where(x => x.Type == CreditType.Crew).Select(c => CreditMapper.MapForFilm(c)).ToList();
            return new GetFilmCastCrewCreditsDto{
                Cast = cast,
                Crew = crew
            };
        }

        public static GetPersonCastCrewCreditsDto MapPersonCastCrewCreditDto(List<Credit> credits){
            var cast = credits.Where(x => x.Type == CreditType.Cast).Select(c => CreditMapper.MapForPerson(c)).ToList();
            var crew = credits.Where(x => x.Type == CreditType.Crew).Select(c => CreditMapper.MapForPerson(c)).ToList();
            return new GetPersonCastCrewCreditsDto{
                Cast = cast,
                Crew = crew
            };
        }
    }
}