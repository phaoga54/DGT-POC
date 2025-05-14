import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import { ButtonComponent } from '../../components/Button';
import { useLocation } from '../../hooks/locationHook';
import { Screen } from '../../components/Screen';
import { TimePickerModal } from '../../components/TimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetchLocationInterval, selectIsNotificationOn, selectMovementCheckingInterval, setFetchLocationInterval, setIsNotificationOn, setmovementCheckingInterval } from '../../redux/slices/setting-slice';
import { secondsToMMSS } from '../../utils';


type Props = {

}

export const SettingScreen = (props: Props) => {
  const { resetLocations } = useLocation();
  
  const [isCollectLocationVisible, setIsCollectLocationVisible] = useState(false);
  const [isMovementVisible, setIsMovementVisible] = useState(false);
  const dispatch = useDispatch();
  const fetchLocationInterval = useSelector(selectFetchLocationInterval);
  const fetchMovementInterval = useSelector(selectMovementCheckingInterval);
  const isNotificationOn = useSelector(selectIsNotificationOn);
  
  const handleSetTrackingTime = (totalSeconds: number) => {
    if(totalSeconds <= 0) {
      Alert.alert('Invalid Time', 'Please set a valid time greater than 0 seconds.');
      return;
    }
    if(isCollectLocationVisible) {
      dispatch(setFetchLocationInterval(totalSeconds));
    }else if(isMovementVisible) {
      dispatch(setmovementCheckingInterval(totalSeconds));
    }
  };
  
  const closeModal = () => {
    setIsCollectLocationVisible(false);
    setIsMovementVisible(false);
  }
  const openCollectLocationModal = () => {
    setIsCollectLocationVisible(true);
  }
  const openMovementModal = () => {
    setIsMovementVisible(true);
  }
  const updateNotificationConfig = () => {
    dispatch(setIsNotificationOn(!isNotificationOn));
  }
  return (
    <Screen>
      <View style={styles.container}>
        <ButtonComponent
          onPress={resetLocations}
          title="Clear Location History"
        />
        
        <View style={styles.buttonSpacing} />
        
        <ButtonComponent
          onPress={openCollectLocationModal}
          title={`Edit location safe time \n current duration: ${secondsToMMSS(fetchLocationInterval)}`}
        />

        <View style={styles.buttonSpacing} />
        <ButtonComponent
          onPress={openMovementModal}
          title={`Edit movement safe time \n current duration: ${secondsToMMSS(fetchMovementInterval)}`}
        />
        <View style={styles.buttonSpacing} />
        <ButtonComponent
          onPress={updateNotificationConfig}
          title={`Edit notification config \n current status: ${isNotificationOn?"ON":"OFF"}  `}
        />
        
        {/* Add the TimePickerModal */}
        <TimePickerModal
          visible={isCollectLocationVisible || isMovementVisible}
          onClose={closeModal}
          onSetTime={handleSetTrackingTime}
          initialMinutes={0}
          initialSeconds={0}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  buttonSpacing: {
    height: 16, // Add space between buttons
  }
});