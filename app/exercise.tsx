import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExerciseScreen() {
    const router = useRouter();
    const [phase, setPhase] = useState('inhale');
    const [count, setCount] = useState(4);
    const [breathCycles, setBreathCycles] = useState(0);

    // Track session start time
    const [sessionStart] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount > 1) {
                    return prevCount - 1;
                } else {
                    // Switch phases
                    switch (phase) {
                        case 'inhale':
                            setPhase('hold');
                            return 7;
                        case 'hold':
                            setPhase('exhale');
                            return 8;
                        case 'exhale':
                            setPhase('inhale');
                            setBreathCycles((prev) => prev + 1); // Count completed breath
                            return 4;
                        default:
                            return 4;
                    }
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [phase]);

    // Update stats when user stops exercise
    const handleStop = async () => {
        const sessionEnd = Date.now();
        const sessionMinutes = Math.round((sessionEnd - sessionStart) / 60000) || 1;
        // Update total minutes
        const prevMinutes = parseInt(await AsyncStorage.getItem('totalMinutes') || '0', 10);
        await AsyncStorage.setItem('totalMinutes', String(prevMinutes + sessionMinutes));
        // Update total breaths
        const prevBreaths = parseInt(await AsyncStorage.getItem('totalBreaths') || '0', 10);
        await AsyncStorage.setItem('totalBreaths', String(prevBreaths + breathCycles));
        // Update day streak
        const today = new Date().toISOString().slice(0, 10);
        const lastSessionDay = await AsyncStorage.getItem('lastSessionDay');
        let streak = parseInt(await AsyncStorage.getItem('dayStreak') || '0', 10);
        if (lastSessionDay !== today) {
            streak = streak + 1;
            await AsyncStorage.setItem('dayStreak', String(streak));
            await AsyncStorage.setItem('lastSessionDay', today);
        }
        router.back();
    };

    const getInstructions = () => {
        switch (phase) {
            case 'inhale':
                return 'Inhale through your nose';
            case 'hold':
                return 'Hold your breath';
            case 'exhale':
                return 'Exhale through your mouth';
            default:
                return '';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.exerciseContainer}>
                <Text style={styles.phaseText}>{getInstructions()}</Text>
                <Text style={styles.timer}>{count}</Text>
                <View style={styles.phaseIndicator}>
                    <View style={[styles.phaseCircle, phase === 'inhale' && styles.activePhase]}>
                        <Text style={styles.phaseLabel}>4s</Text>
                    </View>
                    <View style={[styles.phaseCircle, phase === 'hold' && styles.activePhase]}>
                        <Text style={styles.phaseLabel}>7s</Text>
                    </View>
                    <View style={[styles.phaseCircle, phase === 'exhale' && styles.activePhase]}>
                        <Text style={styles.phaseLabel}>8s</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.stopButton}
                onPress={handleStop}
            >
                <Text style={styles.stopButtonText}>Stop Exercise</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011303ff',
        padding: 20,
        justifyContent: 'space-between',
    },
    exerciseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phaseText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    timer: {
        color: '#fff',
        fontSize: 72,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    phaseIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    phaseCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activePhase: {
        backgroundColor: '#fff',
    },
    phaseLabel: {
        color: '#fff',
        fontSize: 16,
    },
    stopButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    stopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
