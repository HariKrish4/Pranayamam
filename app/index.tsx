import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [duration, setDuration] = useState(2);
  const [skipDetails, setSkipDetails] = useState(false);
  const [cueSound, setCueSound] = useState('Crystal Bowl Ping');
  const [music, setMusic] = useState('Cosmic Waves');
  const [soundModalVisible, setSoundModalVisible] = useState(false);
  const [musicModalVisible, setMusicModalVisible] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [dayStreak, setDayStreak] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);

  const cueSoundOptions = ['Crystal Bowl Ping', 'Bell', 'Wood Block'];
  const musicOptions = ['Cosmic Waves', 'Forest Stream', 'Silent'];

  useEffect(() => {
    AsyncStorage.getItem('skipInstructions').then(val => {
      setSkipDetails(val === 'true');
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Load stats
      AsyncStorage.getItem('totalMinutes').then(val => setTotalMinutes(val ? parseInt(val, 10) : 0));
      AsyncStorage.getItem('dayStreak').then(val => setDayStreak(val ? parseInt(val, 10) : 0));
      AsyncStorage.getItem('totalBreaths').then(val => setTotalBreaths(val ? parseInt(val, 10) : 0));
    }, [])
  );

  const handleStart = () => {
    if (skipDetails) {
      router.push('/exercise');
    } else {
      router.push('/details');
    }
  };

  const decreaseDuration = () => {
    if (duration > 1) {
      setDuration(prev => prev - 1);
    }
  };

  const increaseDuration = () => {
    if (duration < 10) {
      setDuration(prev => prev + 1);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.exerciseContainer}>
        <Text style={styles.sectionTitle}>Exercise</Text>
        <Text style={styles.exerciseName}>4-7-8 Breathing</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>{duration} {duration === 1 ? 'minute' : 'minutes'}</Text>
            <View style={styles.controls}>
              <Pressable
                style={[styles.controlButton, duration <= 1 && styles.controlButtonDisabled]}
                onPress={decreaseDuration}
              >
                <Text style={styles.controlText}>−</Text>
              </Pressable>
              <Pressable
                style={[styles.controlButton, duration >= 10 && styles.controlButtonDisabled]}
                onPress={increaseDuration}
              >
                <Text style={styles.controlText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cue Sound</Text>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>{cueSound}</Text>
            <Pressable
              style={styles.dropdownButton}
              onPress={() => setSoundModalVisible(true)}
            >
              <Text style={styles.dropdownText}>▼</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background Music</Text>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>{music}</Text>
            <Pressable
              style={styles.dropdownButton}
              onPress={() => setMusicModalVisible(true)}
            >
              <Text style={styles.dropdownText}>▼</Text>
            </Pressable>
          </View>
        </View>

        {/* Cue Sound Modal */}
        <Modal
          transparent
          visible={soundModalVisible}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setSoundModalVisible(false)}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                backgroundColor: '#011303ff',
                borderRadius: 16,
                padding: 20,
                minWidth: 250
              }}>
                {cueSoundOptions.map(option => (
                  <Pressable
                    key={option}
                    style={{ padding: 12 }}
                    onPress={() => {
                      setCueSound(option);
                      setSoundModalVisible(false);
                    }}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: cueSound === option ? 'bold' : 'normal'
                    }}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Music Modal */}
        <Modal
          transparent
          visible={musicModalVisible}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setMusicModalVisible(false)}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                backgroundColor: '#011303ff',
                borderRadius: 16,
                padding: 20,
                minWidth: 250
              }}>
                {musicOptions.map(option => (
                  <Pressable
                    key={option}
                    style={{ padding: 12 }}
                    onPress={() => {
                      setMusic(option);
                      setMusicModalVisible(false);
                    }}
                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: music === option ? 'bold' : 'normal'
                    }}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statTitle}>Total Minutes</Text>
            <Text style={styles.statValue}>{totalMinutes}</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statTitle}>Day Streak</Text>
            <Text style={styles.statValue}>{dayStreak}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statTitle}>Total Breaths</Text>
            <Text style={styles.statValue}>{totalBreaths}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#011303ff',
  },
  exerciseContainer: {
    flex: 1,
    gap: 20,
  },
  sectionTitle: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 16,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    gap: 10,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationText: {
    color: '#fff',
    fontSize: 24,
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: '#fff',
    fontSize: 24,
  },
  controlButtonDisabled: {
    opacity: 0.3,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 24,
  },
  dropdownButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statTitle: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 16,
    marginBottom: 5,
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
