# Playful Questions & Photo Collage Design

**Date:** 2026-02-01
**Status:** Approved for Implementation

## Overview

Enhance the Valentine's website with additional playful questions spread throughout the experience, and replace the final celebration screen with a romantic heart-shaped photo collage.

## New Question Flow

1. "Do you like me?" (existing - secret answer button)
2. **NEW: "What emoji describes me best?"** (multiple choice buttons)
3. "How much do you love me?" (existing - love meter slider, must be ≥10000%)
4. **NEW: "How cute am I?"** (number input, must be ≥101)
5. **NEW: "How many hugs do you owe me?"** (number input, must be ≥10000)
6. "Will you be my Valentine?" (existing - final question with runaway "No" button)
7. **UPDATED: Heart-shaped photo collage** (replaces text celebration)

## Question Details

### Question 2: Emoji Description (Multiple Choice)

**Interaction:** Multiple choice buttons
**Question:** "What emoji describes me best? 🤔"

**Options:**
- "😇 An Angel" → Reaction: "Aww you're so sweet! 💕"
- "🌟 A Star" → Reaction: "You think I shine bright! ✨"
- "🎁 A Gift" → Reaction: "Best gift ever! 🎁💝"
- "🍰 A Cupcake" → Reaction: "Sweet like a cupcake! 🧁"

**Behavior:**
- Display 4 buttons in a grid
- On click, show reaction message for 2 seconds
- Auto-advance to next question after reaction

### Question 4: Cuteness Meter (Number Input)

**Interaction:** Number input field
**Question:** "How cute am I? 🥰"
**Range:** 0-999999
**Validation:** Must be ≥101 to proceed

**Dynamic Messages (updates as they type):**
- 0-100: "Come on, you can type higher than that! 😢"
- 101-500: "Aww, that's sweet! 💕"
- 501-1000: "You really think so?! 😍"
- 1000+: "OMG YOU THINK I'M THAT CUTE?! 🥰✨"

**Error on Next click:** "You need to think I'm at least 101% cute! Try a bigger number! 💝"

### Question 5: Hug Counter (Number Input)

**Interaction:** Number input field
**Question:** "How many hugs do you owe me? 🤗"
**Range:** 0-999999
**Validation:** Must be ≥10000 to proceed

**Dynamic Messages (updates as they type):**
- 0-999: "That's way too few! I need more hugs! 🥺"
- 1000-9999: "Getting closer, but not enough! 💕"
- 10000-99999: "Now we're talking! 🤗✨"
- 100000+: "WOW! That's a lifetime of hugs! 🥰🤗🎉"

**Error on Next click:** "You owe me at least 10,000 hugs! Think bigger! 🤗💝"

## Final Celebration: Heart-Shaped Photo Collage

**Design:**
- Remove all celebration text (title, message, emojis)
- Display 13 photos arranged in a heart shape
- Photos fade in sequentially (300ms delay between each)
- Each photo has slight rotation (-5° to +5°) and drop shadow
- Background maintains floating hearts animation

**Photo Arrangement:**
```
      1    2
   3    4    5
 6   7   8   9
   10  11  12
      13
```

Position 13 (love.png) is at the bottom point of the heart.

**Animation Sequence:**
1. User clicks "Yes!" on final question
2. Screen transitions to blank background with floating hearts
3. Photos fade in one by one from center outward
4. Each photo: opacity 0→1 over 0.5s, slight scale effect (0.8→1)
5. Total animation time: ~4 seconds

**Source Photos:**
- Location: `/Users/madhav/Decent/manushi/First-Anniversary-of-Love/pic`
- Files: love.png, pic1.JPG - pic12.JPG (13 total)
- Destination: Copy to `/images` folder in project

## Configuration Changes

### config.js Structure

```javascript
questions: {
    first: {
        // existing "Do you like me?" configuration
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
        // existing love meter configuration
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
        // existing "Will you be my Valentine?" configuration
    }
},

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
        "images/pic12.JPG",
        "images/love.png"
    ],
    fadeDelay: 300,  // ms between each photo
    layout: "heart"  // heart-shaped arrangement
}
```

## Implementation Files

### Files to Create
- `images/` - Directory for photos
- Copy 13 photos from source directory

### Files to Modify

**1. config.js**
- Add `questions.emoji` configuration
- Add `questions.cuteness` configuration
- Add `questions.hugs` configuration
- Replace `celebration` object with photo collage config

**2. index.html**
- Add question section for emoji choice (question1.5)
- Add question section for cuteness meter (question3.5)
- Add question section for hug counter (question4.5)
- Replace celebration div content with photo collage container

**3. script.js**
- Add `handleMultipleChoice()` function for emoji question
- Add `handleNumberInput()` function for cuteness/hugs validation
- Add `showReaction()` function for emoji reactions
- Add `createPhotoCollage()` function for heart arrangement
- Add `animatePhotos()` function for sequential fade-in
- Update `celebrate()` function to trigger photo collage

**4. styles.css**
- Add `.multiple-choice-grid` styles for emoji buttons
- Add `.number-input-section` styles
- Add `.dynamic-message` styles for real-time feedback
- Add `.photo-collage` styles for heart layout
- Add `.collage-photo` styles with rotation and shadow
- Add fade-in animations

## Technical Considerations

### Photo Heart Layout
Use CSS Grid or absolute positioning with percentage-based coordinates for responsive heart shape. Calculate positions based on viewport size.

### Number Input Validation
- Listen to `input` event for real-time message updates
- Validate on "Next" button click
- Use `alert()` for error messages (consistent with existing UI)

### Photo Loading
- Preload all photos before starting animation
- Use `Promise.all()` with image.onload events
- Show loading indicator if needed

### Responsive Design
- Scale photo sizes based on viewport
- Adjust heart shape for mobile vs desktop
- Ensure photos don't overflow on small screens

## Success Criteria

- [ ] All 3 new questions flow smoothly between existing questions
- [ ] Emoji reactions display correctly and auto-advance
- [ ] Number input validations work (≥101 for cuteness, ≥10000 for hugs)
- [ ] Dynamic messages update in real-time as user types
- [ ] Photos load and copy successfully into project
- [ ] Heart shape is recognizable on desktop and mobile
- [ ] Photos fade in sequentially with smooth animation
- [ ] No console errors or broken images
- [ ] Website remains playful and romantic throughout

## Future Enhancements (Not in Scope)

- Custom photo upload by users
- Different collage shapes (star, circle)
- Background music changes on collage reveal
- Download collage as image feature
