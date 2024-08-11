/* eslint-disable react/prop-types */

import styles from './TextDisplay.module.css'


export default function TextDisplay({ text, charIndex, correctWrong, charRefs }) {
    return (
        <div>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className={`${styles.char} ${index === charIndex ? `${styles.active}` : ""} ${correctWrong[index]}`}
                    ref={(e) => charRefs.current[index] = e}>
                    {char}
                </span>
            ))}
        </div>
    );
}
