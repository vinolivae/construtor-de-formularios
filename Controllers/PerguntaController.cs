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
    [Route("pergunta")]
    public class PerguntaController : ControllerBase
    {
        private readonly DataContext _db;

        public PerguntaController(DataContext db) => _db = db;

        [HttpGet]
        [Route("")]
        public ActionResult<List<Pergunta>> Read() => _db.Perguntas.ToList();
        [HttpGet]
        [Route("questionario/{id:int}")]
        public async Task<ActionResult<List<Pergunta>>> ReadByQuestionario(int id)
        {
            var perguntas = await _db.Perguntas
            .Include(x => x.Questionario)
            .Where(x => x.QuestionarioId == id)
            .ToListAsync();
            return perguntas;
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Pergunta>> Create([FromBody] Pergunta model)
        {
            _db.Perguntas.Add(model);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Read), new {id = model.Id}, model);
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult<Pergunta>> Update([FromBody] Pergunta model, int id)
        {
            if (id != model.Id) return BadRequest();
            _db.Entry(model).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return model;
        }
    }
}