using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RelaxationMusicHub.Models
{
    public class RelaxationMusic
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set;  }

        [BsonElement("title")]
        public String Title { get; set; }

        [BsonElement("artist")]
        public String Artist { get; set; }

        [BsonElement("credit")]
        public String[] Credit { get; set; }

        [BsonElement("keywords")]
        public String[] Keywords { get; set; }
    }
}
