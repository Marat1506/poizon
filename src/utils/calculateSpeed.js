export const calculateSpeeds = (charIndex, errors, time) => {
    const correctWords = Math.floor((charIndex - errors) / 5);
    const totalWords = Math.floor(charIndex / 5);
    const totalTime = 60 - time;

    const KS = correctWords * (60 / totalTime);
    const KSM = totalWords * (60 / totalTime);

    return {
        KS: KS < 0 || !KS || KS === Infinity ? 0 : parseInt(KS, 10),
        KSM: KSM < 0 || !KSM || KSM === Infinity ? 0 : parseInt(KSM, 10)
    };
};

export const processInput = (charIndex, errors, typedChar, currentChar, correctWrong, styles) => {
    const newCorrectWrong = [...correctWrong];

    if (typedChar === currentChar.textContent) {
        newCorrectWrong[charIndex] = styles.correct;
        charIndex += 1;
    } else {
        newCorrectWrong[charIndex] = styles.wrong;
        errors += 1;
        charIndex += 1;
    }

    return {
        charIndex,
        errors,
        correctWrong: newCorrectWrong
    };
};
