using RelaxationMusicHub.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace RelaxationMusicHub.Services
{
    public class RelaxationMusicService
    {
        private readonly IMongoCollection<RelaxationMusic> _relaxationMusicCollection;

        public RelaxationMusicService(IOptions<MongoDBConnection> mongodbConnection)
        {
            //gets database
            var client = new MongoClient(mongodbConnection.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase(mongodbConnection.Value.Database);

            //gets collection
            _relaxationMusicCollection = database.GetCollection<RelaxationMusic>(mongodbConnection.Value.Collection);
        }

        public async Task<List<RelaxationMusic>> GetRelaxationMusicAsync(String keyword)
        {
            //filters keyword to get audio data
            var keywordFilter = Builders<RelaxationMusic>.Filter.Eq("Keywords", keyword.ToLower());

            return await _relaxationMusicCollection.Find(keywordFilter).ToListAsync();
        }
    }
}
