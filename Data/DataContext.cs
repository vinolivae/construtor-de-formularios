using DesafioFullstack.Models;
using Microsoft.EntityFrameworkCore;

namespace DesafioFullstack.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Questionario> Questionarios {get; set;}
        public DbSet<Pergunta> Perguntas { get; set; }
        public DbSet<Resposta> Respostas { get; set; }
        public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}