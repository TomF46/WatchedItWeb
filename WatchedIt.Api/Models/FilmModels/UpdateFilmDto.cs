using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.FilmModels
{
    public class UpdateFilmDto
    {
        public string? Name {get;set;}
        public string? ShortDescription {get;set;}
        public string? FullDescription {get;set;}
        public int Runtime {get;set;}
        public DateTime ReleaseDate {get; set;}
    }
}