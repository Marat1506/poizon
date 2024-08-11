import  { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import styles from './Text.module.css';

import {
    setErrors, setTime, setKS, setKSM,
    setCharIndex, setIsTyping, setCorrectWrong,
    resetGame
} from "../../hooks/reducer";
import TextDisplay from "../TextDisplay/TextDisplay";
import ResultDisplay from "../ResultDisplay/ResultDisplay";
import { calculateSpeeds, processInput } from "../../utils/calculateSpeed";

export default function Text() {
    const dispatch = useDispatch();
    const {
        time,
        errors,
        KS,
        KSM,
        charIndex,
        isTyping,
        correctWrong
    } = useSelector((state) => state.poizon);

    const text = 'Создать приложение "Typing Speed Trainer" на React, которое оценит скорость печати пользователя. Приложение должно предоставлять пользователю текст для ввода, показывать правильные и неправильные символы разными цветами, а также отображать статистику по скорости печати и числу ошибок.';
    const inputRef = useRef(null);
    const charRefs = useRef([]);

    useEffect(() => {
        inputRef.current.focus();
        dispatch(setCorrectWrong(Array(charRefs.current.length).fill('')));
    }, [dispatch]);

    useEffect(() => {
        let interval;

        if (isTyping && time > 0) {
            interval = setInterval(() => {
                dispatch(setTime(time - 1));
                const { KS, KSM } = calculateSpeeds(charIndex, errors, time);
                dispatch(setKS(KS));
                dispatch(setKSM(KSM));
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval);
            dispatch(setIsTyping(false));
        }

        return () => clearInterval(interval);
    }, [dispatch, isTyping, time, charIndex, errors]);

    const resetGameHandler = () => {
        dispatch(resetGame());
        inputRef.current.focus();
    }

    const handleChange = (e) => {
        const chars = charRefs.current;
        const currentChar = chars[charIndex];
        const typedChar = e.target.value.slice(-1);

        if (charIndex < chars.length && time > 0) {
            if (!isTyping) {
                dispatch(setIsTyping(true));
            }

            const { charIndex: newCharIndex, errors: newErrors, correctWrong: newCorrectWrong } =
                processInput(charIndex, errors, typedChar, currentChar, correctWrong, styles);

            dispatch(setCharIndex(newCharIndex));
            dispatch(setErrors(newErrors));
            dispatch(setCorrectWrong(newCorrectWrong));

            e.target.value = '';
            if (newCharIndex === chars.length - 1) dispatch(setIsTyping(false));
        } else {
            dispatch(setIsTyping(false));
        }
    }

    return (
        <div className={styles.container}>
            <Box className={styles.test}>
                <input
                    type="text"
                    className={styles.inputText}
                    ref={inputRef}
                    onChange={handleChange}
                />
                <TextDisplay
                    text={text}
                    charIndex={charIndex}
                    correctWrong={correctWrong}
                    charRefs={charRefs}
                />
            </Box>
            <ResultDisplay
                time={time}
                errors={errors}
                KS={KS}
                KSM={KSM}
                onReset={resetGameHandler}
            />
        </div>
    );
}
