using System;
using System.Collections.Generic;

namespace DesafioFullstack.Models
{
    public class Resposta
    {
       public int Id { get; set; }
       public string Titulo { get; set; } 
       public string Usuario { get; set; }
       public DateTime DataDeCriacao { get => DateTime.Now; }

       public int PerguntaId { get; set; }
       public Pergunta Pergunta { get; set; }
    }
}