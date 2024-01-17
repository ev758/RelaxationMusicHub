namespace RelaxationMusicHub.Models
{
    public class MongoDBConnection
    {
        public String ConnectionString { get; set; } = Environment.GetEnvironmentVariable("MONGODB_URI");
        public String Database { get; set; } = Environment.GetEnvironmentVariable("DATABASE");
        public String Collection { get; set; } = Environment.GetEnvironmentVariable("COLLECTION");
    }
}
