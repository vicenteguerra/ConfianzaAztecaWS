let Models  = require('../../models/index');

const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
var stream = require('stream');

const speech_to_text = new SpeechToTextV1({
  iam_apikey: process.env.ibm_api_key,
  url: "https://stream.watsonplatform.net/speech-to-text/api"
});

let Voice = function(){
    this.verify = verify;
};

let verify = function (req, res) {
    try{
        let buff_audio = new Buffer(req.body.audio, 'base64');

        var bufferStream = new stream.PassThrough();

        bufferStream.end(buff_audio);

        let keywords = req.body.keywords;
        var params = {
            audio: bufferStream,
            content_type: 'audio/wav',
            timestamps: true,
            word_alternatives_threshold: 0.9,
            keywords: keywords,
            keywords_threshold: 0.5
        };
        speech_to_text.recognize(params, function (error, transcript) {
            if (error) {
                res.json({success: false, error: error.toString()});
            }
            else {
                console.log(transcript.results[0].alternatives[0].transcript);
                res.json({success: true, transcript: transcript});
            }
        });
    }catch(e){
        return res.json({
            success: false,
            message: e.toString()
        });
    }
};

exports.Voice = new Voice();
