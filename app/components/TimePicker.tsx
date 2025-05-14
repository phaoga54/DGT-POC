import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSetTime: (seconds: number) => void;
  initialMinutes?: number;
  initialSeconds?: number;
}

export const TimePickerModal = ({ 
  visible, 
  onClose, 
  onSetTime,
  initialMinutes = 0,
  initialSeconds = 0 
}: Props) => {
  const [minutes, setMinutes] = useState(initialMinutes.toString());
  const [seconds, setSeconds] = useState(initialSeconds.toString());

  const handleSet = () => {
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    const totalSeconds = (mins * 60) + secs;
    onSetTime(totalSeconds);
    onClose();
  };

  const handleCancel = () => {
    // Reset values when canceling
    setMinutes(initialMinutes.toString());
    setSeconds(initialSeconds.toString());
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Set Tracking Time</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.timeInput}>
              <Text style={styles.label}>Minutes</Text>
              <TextInput
                style={styles.input}
                value={minutes}
                onChangeText={setMinutes}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            
            <Text style={styles.separator}>:</Text>
            
            <View style={styles.timeInput}>
              <Text style={styles.label}>Seconds</Text>
              <TextInput
                style={styles.input}
                value={seconds}
                onChangeText={setSeconds}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.setButton} onPress={handleSet}>
              <Text style={styles.setButtonText}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  timeInput: {
    alignItems: 'center',
    minWidth: 80,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    minWidth: 60,
  },
  separator: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  setButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  setButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});