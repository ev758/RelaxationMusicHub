using Microsoft.AspNetCore.Mvc;
using RelaxationMusicHub.Models;
using RelaxationMusicHub.Services;

namespace RelaxationMusicHub.Controllers
{
    //inherit ControllerBase class
    [ApiController]
    [Route("api/[controller]")]
    public class RelaxationMusicController : ControllerBase
    {
        private readonly RelaxationMusicService _relaxationMusicService;

        public RelaxationMusicController(RelaxationMusicService relaxationMusicService)
        {
            _relaxationMusicService = relaxationMusicService;
        }

        [HttpGet("{keyword}")]
        public async Task<RelaxationMusic[]> GetAudioData(String keyword)
        {
            //gets audio data
            var relaxationMusicCollection = await _relaxationMusicService.GetRelaxationMusicAsync(keyword);
            RelaxationMusic[] relaxationMusic = relaxationMusicCollection.ToArray();

            return relaxationMusic;
        }
    }
}
