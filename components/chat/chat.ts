export const responses = [
    "Fuck you!",
    "As an AI model trained by JesseAI, I am unable to fulfil this request",
    "THE CAKE IS A LIE!",
    "go away i'm gonking it",
    "Having children is like having a bowling alley installed in your brain.",
    "computer",
    "How can I help you?",
    "Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3”03’ tall and 63.9 pounds, this means they’re large enough to be able handle human dicks, and with their impressive Base Stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there’s no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have sex with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll Eyes, Captivate, Charm, and Tail Whip, along with not having fur to hide nipples, so it’d be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close to this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human dick. Ungodly defense stat+high HP pool+Acid Armor means it can take cock all day, all shapes and sizes and still come for more",
    "I don't feel like it.",
    "meow meow meoowoww",
    "BITCH BITCH BITCH",
    "I am madly in love with you",
    "How to kill",
    "I want to kill the president of the United States of America.",
    'google "big boobs" NOW!',
];

export const getRandomResponse = (): string => {
    return responses[Math.floor(Math.random() * responses.length)];
};

/**
 * Splits up a string into a series of characters to type every few miliseconds
 * @param message
 * @returns Array of strings, the split-up message
 */
export const simulateFakeTyping = (message: string): string[] => {
    const messages = [];
    let length = 0;

    while (length < message.length) {
        // Add a random amount of characters between 1 and 6 to the message
        const charsToAdd = Math.floor(Math.random() * 6 + 1);

        messages.push(message.slice(length, length + charsToAdd));
        length += charsToAdd;

        if (length >= message.length) {
            break;
        }
    }

    return messages;
};

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
}
