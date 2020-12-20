using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DesafioFullstack.Data;
using DesafioFullstack.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesafioFullstack.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly DataContext db;

        public UserController(DataContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("")]
        public ActionResult<List<User>> Read() => db.Users.ToList();
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<User>> Create([FromBody] User model){
            db.Add(model);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(Read), new {id = model.Id}, model);
        }
    }
}