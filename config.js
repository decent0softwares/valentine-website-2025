// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Manushi",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis
        bears: ['🧸', '🐻']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Do you like me?",                                    // First interaction
            yesBtn: "Yes",                                             // Text for "Yes" button
            noBtn: "No",                                               // Text for "No" button
            secretAnswer: "I don't like you, I love you! ❤️"           // Secret hover message
        },
        emoji: {
            text: "What emoji describes me best? 🤔",
            type: "multipleChoice",
            options: [
                { text: "😇 An Angel", reaction: "Aww you're so sweet! 💕" },
                { text: "🌟 A Star", reaction: "You think I shine bright! ✨" },
                { text: "🎁 A Gift", reaction: "Best gift ever! 🎁💝" },
                { text: "🍰 A Cupcake", reaction: "Sweet like a cupcake! 🧁" }
            ]
        },
        second: {
            text: "How much do you love me?",                          // For the love meter
            startText: "This much!",                                   // Text before the percentage
            nextBtn: "Next ❤️"                                         // Text for the next button
        },
        cuteness: {
            text: "How cute am I? 🥰",
            type: "numberInput",
            placeholder: "Type a number... 💕",
            min: 101,
            errorMessage: "You need to think I'm at least 101% cute! Try a bigger number! 💝",
            messages: {
                low: "Come on, you can type higher than that! 😢",
                medium: "Aww, that's sweet! 💕",
                high: "You really think so?! 😍",
                extreme: "OMG YOU THINK I'M THAT CUTE?! 🥰✨"
            },
            thresholds: {
                low: 0,
                medium: 101,
                high: 501,
                extreme: 1001
            }
        },
        hugs: {
            text: "How many hugs do you owe me? 🤗",
            type: "numberInput",
            placeholder: "Type a big number! 🤗",
            min: 10000,
            errorMessage: "You owe me at least 10,000 hugs! Think bigger! 🤗💝",
            messages: {
                low: "That's way too few! I need more hugs! 🥺",
                medium: "Getting closer, but not enough! 💕",
                high: "Now we're talking! 🤗✨",
                extreme: "WOW! That's a lifetime of hugs! 🥰🤗🎉"
            },
            thresholds: {
                low: 0,
                medium: 1000,
                high: 10000,
                extreme: 100000
            }
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "To infinity and beyond! 🚀💝",              // Shows when they go past 1000%
        normal: "And beyond! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        type: "photoCollage",
        photos: [
            "images/pic1.JPG",
            "images/pic2.JPG",
            "images/pic3.JPG",
            "images/pic4.JPG",
            "images/pic5.JPG",
            "images/pic6.JPG",
            "images/pic7.JPG",
            "images/pic8.JPG",
            "images/pic9.JPG",
            "images/pic10.JPG",
            "images/pic11.JPG",
            "images/pic12.JPG"
        ],
        fadeDelay: 300,  // ms between each photo
        layout: "heart"  // heart-shaped arrangement
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
        buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 