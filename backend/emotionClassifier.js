const { pipeline, env } = require('@xenova/transformers');

// Disable local model check
env.allowLocalModels = false;

// Emotion labels for classification
const EMOTION_LABELS = [
  'joy', 'sadness', 'anger', 'fear', 'surprise', 
  'disgust', 'neutral', 'love', 'excitement', 'frustration'
];

class EmotionClassifier {
  constructor() {
    this.classifier = null;
    this.initPromise = this.initialize();
  }

  async initialize() {
    try {
      console.log('Initializing emotion classifier...');
      // Using a smaller model that's similar to Gemma for emotion classification
      // You can replace this with actual Gemma model if you have it set up
      this.classifier = await pipeline(
        'text-classification',
        'Xenova/bert-base-uncased-emotion'
      );
      console.log('Emotion classifier initialized successfully');
    } catch (error) {
      console.error('Error initializing classifier:', error);
      // Fallback to simple keyword-based classification
      this.classifier = null;
    }
  }

  async classifyEmotion(text) {
    await this.initPromise;
    
    if (this.classifier) {
      try {
        const result = await this.classifier(text);
        // Get the emotion with highest score
        const topEmotion = result.reduce((prev, current) => 
          (prev.score > current.score) ? prev : current
        );
        
        return {
          emotion: topEmotion.label.toLowerCase(),
          confidence: topEmotion.score,
          all_emotions: result.map(r => ({
            emotion: r.label.toLowerCase(),
            confidence: r.score
          }))
        };
      } catch (error) {
        console.error('Error classifying emotion:', error);
        return this.fallbackClassification(text);
      }
    } else {
      return this.fallbackClassification(text);
    }
  }

  fallbackClassification(text) {
    // Simple keyword-based emotion detection as fallback
    const lowerText = text.toLowerCase();
    
    const emotionKeywords = {
      joy: ['happy', 'joy', 'excited', 'glad', 'wonderful', 'great', 'awesome', 'fantastic', 'amazing', '😊', '😄', '🎉'],
      sadness: ['sad', 'depressed', 'unhappy', 'cry', 'tears', 'lonely', 'miss', '😢', '😭', '💔'],
      anger: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'hate', 'stupid', '😠', '😡', '🤬'],
      fear: ['scared', 'afraid', 'fear', 'worried', 'anxious', 'nervous', 'panic', '😨', '😰'],
      surprise: ['wow', 'surprised', 'shocking', 'unexpected', 'omg', 'what', '😲', '😱', '🤯'],
      love: ['love', 'adore', 'caring', 'sweet', 'dear', 'heart', '❤️', '💕', '😍'],
      excitement: ['excited', 'thrilled', 'pumped', 'can\'t wait', 'yay', 'woohoo', '🎊', '🤗'],
      disgust: ['disgusting', 'gross', 'yuck', 'eww', 'nasty', '🤢', '🤮'],
      frustration: ['ugh', 'annoying', 'irritated', 'bothered', 'tired', '😤', '🙄']
    };
    
    let detectedEmotion = 'neutral';
    let maxScore = 0;
    
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      const score = keywords.filter(keyword => lowerText.includes(keyword)).length;
      if (score > maxScore) {
        maxScore = score;
        detectedEmotion = emotion;
      }
    }
    
    return {
      emotion: detectedEmotion,
      confidence: maxScore > 0 ? 0.7 : 0.5,
      all_emotions: [{ emotion: detectedEmotion, confidence: maxScore > 0 ? 0.7 : 0.5 }]
    };
  }
}

module.exports = new EmotionClassifier();