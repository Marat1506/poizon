import { Box, Button, Typography } from "@mui/material"
import styles from './Text.module.css'
import { useEffect, useRef, useState } from "react"

export default function Text() {
    const text = 'Создать приложение "Typing Speed Trainer" на React, которое оценит скорость печати пользователя. Приложение должно предоставлять пользователю текст для ввода, показывать правильные и неправильные символы разными цветами, а также отображать статистику по скорости печати и числу ошибок.'
    const [time, setTime] = useState(60)
    const [errors, setErrors] = useState(0)
    const [KS, setKS] = useState(0)
    const [KSM, setKSM] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const inputRef = useRef(null)
    const charRefs = useRef([])
    const [correctWrong, setCorrectWrong] = useState([])

    useEffect(() => {
        inputRef.current.focus();
        setCorrectWrong(Array(charRefs.current.length).fill(''))
    }, [])

    useEffect(() => {
        let interval;

        if (isTyping && time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
                let correctWords = Math.floor((charIndex - errors) / 5);
                let totalWords = Math.floor(charIndex / 5);
                let totalTime = 60 - time;

                let ks = correctWords * (60 / totalTime);
                ks = ks < 0 || !ks || ks === Infinity ? 0 : ks;
                setKS(parseInt(ks, 10));

                let ksm = totalWords * (60 / totalTime);
                ksm = ksm < 0 || !ksm || ksm === Infinity ? 0 : ksm;
                setKSM(parseInt(ksm, 10));
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
            setIsTyping(false);
        }

        return () => clearInterval(interval);
    }, [isTyping, time, charIndex, errors]);

    const resetGame = () => {
        setIsTyping(false);
        setTime(60);
        setCharIndex(0);
        setErrors(0);
        setKS(0);
        setKSM(0);
        setCorrectWrong(Array(charRefs.current.length).fill(''));
        inputRef.current.focus();
    }

    const handleChange = (e) => {
        const chars = charRefs.current;
        let currentChar = chars[charIndex];
        let typedChar = e.target.value.slice(-1);

        if (charIndex < chars.length && time > 0) {
            if (!isTyping) {
                setIsTyping(true);
            }

            const newCorrectWrong = [...correctWrong];

            if (typedChar === currentChar.textContent) {
                newCorrectWrong[charIndex] = styles.correct;
                setCharIndex(charIndex + 1);
            } else {
                newCorrectWrong[charIndex] = styles.wrong;
                setErrors(errors + 1);
                setCharIndex(charIndex + 1);
            }

            setCorrectWrong(newCorrectWrong);
            e.target.value = '';
            if (charIndex === chars.length - 1) setIsTyping(false);
        } else {
            setIsTyping(false);
        }
    }

    return (
        <div className={styles.container}>
            <Box className={styles.test}>
                <input type="text" className={styles.inputText} ref={inputRef} onChange={handleChange} />
                {
                    text.split("").map((char, index) => (
                        <span
                            key={index}
                            className={`${styles.char} ${index === charIndex ? `${styles.active}` : ""} ${correctWrong[index]}`}
                            ref={(e) => charRefs.current[index] = e}>
                            {char}
                        </span>
                    ))
                }
            </Box>
            <Box className={styles.result}>
                <Typography>Время: <strong>{time}</strong></Typography>
                <Typography>Ошибки: <strong>{errors}</strong></Typography>
                <Typography>КС: <strong>{KS}</strong></Typography>
                <Typography>КСМ: <strong>{KSM}</strong></Typography>
                <Button variant="contained" onClick={resetGame}>начать заново</Button>
            </Box>
            <Typography>КС - количество правильно веденных слов в минуту</Typography>
            <Typography>КСМ - количество слов в минуту</Typography>
        </div>
    )
}
