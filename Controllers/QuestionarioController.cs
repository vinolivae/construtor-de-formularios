using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DesafioFullstack.Data;
using DesafioFullstack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DesafioFullstack.Controllers
{
    [ApiController]
    [Route("questionario")]
    public class QuestionarioController : ControllerBase
    {
        private readonly DataContext _db;

        public QuestionarioController(DataContext db) => _db = db;

        [HttpGet]
        [Route("")]
        public ActionResult<List<Questionario>> Read() => _db.Questionarios.ToList();

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Questionario>> Create([FromBody] Questionario model)
        {
            _db.Questionarios.Add(model);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Read), new {id = model.Id}, model);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult<Questionario>> Update([FromBody] Questionario model, int id)
        {
            if (id != model.Id) return BadRequest();
            _db.Entry(model).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return model;
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var questionario = await _db.Questionarios.FindAsync(id);
            if (questionario == null) return BadRequest();
            _db.Questionarios.Remove(questionario);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}