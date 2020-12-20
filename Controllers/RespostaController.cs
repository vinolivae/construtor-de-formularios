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
    [Route("resposta")]
    public class RespostaController : ControllerBase
    {
        private readonly DataContext _db;

        public RespostaController(DataContext db) => _db = db;

        [HttpGet]
        [Route("")]
        public ActionResult<List<Resposta>> Read() => _db.Respostas.ToList();
        [HttpGet]
        [Route("pergunta/{id:int}")]
        public async Task<ActionResult<List<Resposta>>> ReadByPergunta(int id)
        {
            var respostas = await _db.Respostas
            .Include(x => x.Pergunta)
            .Where(x => x.PerguntaId == id)
            .ToListAsync();
            return respostas;
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Resposta>> Create([FromBody] Resposta model)
        {
            _db.Respostas.Add(model);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Read), new {id = model.Id}, model);
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var resposta = await _db.Respostas.FindAsync(id);
            if (resposta == null) return BadRequest();
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}