// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Set texts from config
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;

    // Set first question texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;

    // Set emoji question
    setupEmojiQuestion();

    // Set second question texts
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;

    // Set cuteness question
    setupNumberInputQuestion('cuteness');

    // Set hugs question
    setupNumberInputQuestion('hugs');

    // Set third question texts
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();
});

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));

    // Handle both numbered (2, 3) and named ('emoji', 'cuteness', 'hugs') questions
    let questionId;
    if (typeof questionNumber === 'string') {
        // Capitalize first letter for named questions
        questionId = 'question' + questionNumber.charAt(0).toUpperCase() + questionNumber.slice(1);
    } else {
        questionId = `question${questionNumber}`;
    }

    const questionElement = document.getElementById(questionId);
    if (questionElement) {
        questionElement.classList.remove('hidden');
    } else {
        console.error('Question element not found:', questionId);
    }
}

// Function to validate love meter and show next question
function validateAndShowNextQuestion(currentQuestion, nextQuestion) {
    const value = parseInt(loveMeter.value);
    if (value >= 10000) {
        showNextQuestion(nextQuestion);
    } else {
        alert('Aww, you need to love me at least 10000%! Move that slider all the way! 💝✨');
    }
}

// Setup emoji question
function setupEmojiQuestion() {
    const emojiConfig = config.questions.emoji;
    document.getElementById('emojiQuestionText').textContent = emojiConfig.text;

    const optionsContainer = document.getElementById('emojiOptions');
    emojiConfig.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'cute-btn emoji-option';
        button.textContent = option.text;
        button.onclick = () => handleEmojiChoice(option.reaction);
        optionsContainer.appendChild(button);
    });
}

// Handle emoji choice
function handleEmojiChoice(reaction) {
    const reactionEl = document.getElementById('emojiReaction');
    reactionEl.textContent = reaction;
    reactionEl.classList.remove('hidden');

    setTimeout(() => {
        reactionEl.classList.add('hidden');
        showNextQuestion(2);
    }, 2000);
}

// Setup number input questions
function setupNumberInputQuestion(type) {
    const questionConfig = config.questions[type];
    const questionTextId = type + 'QuestionText';
    const inputId = type + 'Input';

    document.getElementById(questionTextId).textContent = questionConfig.text;
    document.getElementById(inputId).placeholder = questionConfig.placeholder;

    // Add input listener for dynamic messages
    document.getElementById(inputId).addEventListener('input', () => {
        updateNumberInputMessage(type);
    });
}

// Update dynamic message for number inputs
function updateNumberInputMessage(type) {
    const questionConfig = config.questions[type];
    const input = document.getElementById(type + 'Input');
    const message = document.getElementById(type + 'Message');
    const value = parseInt(input.value) || 0;

    let messageText = '';
    if (value >= questionConfig.thresholds.extreme) {
        messageText = questionConfig.messages.extreme;
    } else if (value >= questionConfig.thresholds.high) {
        messageText = questionConfig.messages.high;
    } else if (value >= questionConfig.thresholds.medium) {
        messageText = questionConfig.messages.medium;
    } else {
        messageText = questionConfig.messages.low;
    }

    message.textContent = messageText;
}

// Validate number input and proceed
function validateNumberInput(currentType, nextQuestion) {
    const questionConfig = config.questions[currentType];
    const input = document.getElementById(currentType + 'Input');
    const value = parseInt(input.value) || 0;

    if (value >= questionConfig.min) {
        showNextQuestion(nextQuestion);
    } else {
        alert(questionConfig.errorMessage);
    }
}

// Function to move the "No" button when clicked
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;
    
    if (value > 100) {
        extraLove.classList.remove('hidden');
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        loveMeter.style.transition = 'width 0.3s';
        
        // Show different messages based on the value
        if (value >= 5000) {
            extraLove.classList.add('super-love');
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add('hidden');
        extraLove.classList.remove('super-love');
        loveMeter.style.width = '100%';
    }
});

// Initialize love meter
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration function
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    // Create heart explosion effect
    createHeartExplosion();

    // Create photo collage if configured
    if (config.celebration.type === 'photoCollage') {
        createPhotoCollage();
    }
}

// Create photo collage in heart shape
function createPhotoCollage() {
    const collageContainer = document.getElementById('photoCollage');
    const photos = config.celebration.photos;

    // Heart shape positions (percentage based for responsive)
    const heartPositions = [
        { top: 10, left: 35 },   // pic1 - top left
        { top: 10, left: 55 },   // pic2 - top right
        { top: 25, left: 25 },   // pic3
        { top: 25, left: 45 },   // pic4
        { top: 25, left: 65 },   // pic5
        { top: 40, left: 20 },   // pic6
        { top: 40, left: 35 },   // pic7
        { top: 40, left: 50 },   // pic8
        { top: 40, left: 65 },   // pic9
        { top: 55, left: 30 },   // pic10
        { top: 55, left: 50 },   // pic11
        { top: 55, left: 65 },   // pic12
        { top: 70, left: 45 }    // love.png - bottom center
    ];

    photos.forEach((photoSrc, index) => {
        const img = document.createElement('img');
        img.src = photoSrc;
        img.className = 'collage-photo';
        img.style.top = heartPositions[index].top + '%';
        img.style.left = heartPositions[index].left + '%';

        // Random rotation
        const rotation = (Math.random() - 0.5) * 10; // -5 to +5 degrees
        img.style.transform = `rotate(${rotation}deg)`;

        // Delay for sequential fade-in
        img.style.animationDelay = (index * config.celebration.fadeDelay) + 'ms';

        collageContainer.appendChild(img);
    });
}

// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
} 