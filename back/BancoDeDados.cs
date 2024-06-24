using Microsoft.EntityFrameworkCore;

public class BancoDeDados : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseMySQL("server=localhost;port=3306;database=backnet;user=root;password=");
    }

    //dotnet ef migrations add "VersaoInicial"
    //dotnet ef database update
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<Medicamento> Medicamentos { get; set; }
}