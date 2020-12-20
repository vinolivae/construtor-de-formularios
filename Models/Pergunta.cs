using System.Collections.Generic;

namespace DesafioFullstack.Models
{
    public class Pergunta
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        
        public int QuestionarioId { get; set; }
        public Questionario Questionario { get; set; }
    }
}