using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using NUnit.Framework;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.PersonService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    public class PersonServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IPersonService _personService;

        public PersonServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _personService = new PersonService(_context);
        }
        [SetUp]
        public void Setup()
        {
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddPerson()
        {
            Assert.DoesNotThrow(() => {
                var person = new AddPersonDto {
                    FirstName = "Joe",
                    LastName = "Bloggs",
                    Age = 25,
                    Description = "A young actor"
                };

                _personService.Add(person);
            });
        }

        [Test]
        public async Task CanGetExistingPerson()
        {
            var person = RandomDataGenerator.GeneratePerson();
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            var personFromDb = await _personService.GetById(person.Id);

            Assert.That(personFromDb.Id, Is.EqualTo(person.Id));
        }

        [Test]
        public async Task CanGetMultiplePeople()
        {
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            await _context.People.AddAsync(person);
            await _context.People.AddAsync(person2);
            await _context.SaveChangesAsync();

            var allPeople = await _personService.GetAll();

            Assert.That(allPeople.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task CanDeletePerson()
        {
            var person = RandomDataGenerator.GeneratePerson();
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            _personService.Delete(person.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _personService.GetById(person.Id);
            });
        }

        [Test]
        public async Task CanUpdatePerson()
        {
            var person = RandomDataGenerator.GeneratePerson();
            person.FirstName = "Joe";
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            var newName = "Joel";

            var updatedPerson = new UpdatePersonDto{
                FirstName = newName,
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            };

            await _personService.Update(person.Id, updatedPerson);
            
            var personFromDB = await _personService.GetById(person.Id);

            Assert.That(personFromDB.Id, Is.EqualTo(person.Id));
            Assert.That(personFromDB.FirstName, Is.EqualTo(newName));
        }
    }
}