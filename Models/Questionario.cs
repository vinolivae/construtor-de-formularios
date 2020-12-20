using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DesafioFullstack.Models
{
    public class Questionario
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Usuario { get; set; }
        public DateTime DataDeCadastro { get => DateTime.Now; }
    }

}
