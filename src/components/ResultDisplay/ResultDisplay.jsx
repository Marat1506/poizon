/* eslint-disable react/prop-types */
import { Box, Typography, Button } from "@mui/material";
import styles from './ResultDisplay.module.css'
export default function ResultDisplay({ time, errors, KS, KSM, onReset }) {
    return (
        <Box >
            <Box className={styles.flex}>
                <Typography className={styles.static}>Время: <strong>{time}</strong></Typography>
                <Typography className={styles.static}>Ошибки: <strong>{errors}</strong></Typography>
                <Typography className={styles.static}>КС: <strong>{KS}</strong></Typography>
                <Typography className={styles.static}>КСМ: <strong>{KSM}</strong></Typography>
            </Box>

            <Button variant="contained" onClick={onReset}>начать заново</Button>
            <Typography>КС - количество правильно введенных слов в минуту</Typography>
            <Typography>КСМ - количество слов в минуту</Typography>
        </Box>
    );
}
