import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailsScreen() {
    const router = useRouter();
    const [showInstructions, setShowInstructions] = useState(true);

    const handleCheckbox = async () => {
        const newValue = !showInstructions;
        setShowInstructions(newValue);
        await AsyncStorage.setItem('skipInstructions', newValue ? 'false' : 'true');
    };

    const handleStart = async () => {
        if (!showInstructions) {
            await AsyncStorage.setItem('skipInstructions', 'true');
        }
        router.push('/exercise');
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.title}>How to Perform 4-7-8 Breathing</Text>
                <Text style={styles.subtitle}>Follow these guidelines for optimal results</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Posture & Position</Text>
                    <View style={styles.instructionItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.instruction}>Sit comfortably with your back straight or lie flat on your back</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.instruction}>Place one hand on your chest and the other on your abdomen</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4-7-8 Breathing Pattern</Text>
                    <View style={styles.instructionItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.instruction}>Inhale quietly through your nose for 4 seconds</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.instruction}>Hold your breath for 7 seconds</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.instruction}>Exhale completely through your mouth for 8 seconds</Text>
                    </View>
                </View>

                <Text style={styles.warning}>
                    Always breathe at a comfortable pace. If you experience dizziness or discomfort,
                    stop the exercise immediately and return to normal breathing. Consult a
                    healthcare professional if you have respiratory or cardiovascular concerns.
                </Text>

                <View style={styles.checkboxContainer}>
                    <Pressable
                        style={styles.checkbox}
                        onPress={handleCheckbox}
                    >
                        {!showInstructions && <Text style={styles.checkboxInner}>✓</Text>}
                    </Pressable>
                    <Text style={styles.checkboxLabel}>Don&apos;t show these instructions again</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.startButton]}
                        onPress={handleStart}
                    >
                        <Text style={[styles.buttonText, styles.startButtonText]}>Start Exercise →</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011303ff',
    },
    scrollContent: {
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.7,
        textAlign: 'center',
        marginBottom: 30,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    checkmark: {
        color: '#4CAF50',
        fontSize: 16,
        marginRight: 10,
        marginTop: 2,
    },
    instruction: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
        lineHeight: 22,
    },
    warning: {
        color: '#fff',
        opacity: 0.7,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 30,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        color: '#fff',
        fontSize: 16,
    },
    checkboxLabel: {
        color: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 'auto',
        paddingTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    startButtonText: {
        color: '#011303ff',
    },
});
