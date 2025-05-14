import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useLocation } from '../../hooks/locationHook';
import { ButtonComponent } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, selectLocations } from '../../redux/slices/location-slice';
import { LocationItemComponent } from './components/LocationItem';
import { MappedLocationType } from '../../constant/types';
import { requestPermissions } from '../../services/notification-service';
import { selectFetchLocationInterval, selectIsNotificationOn, selectMovementCheckingInterval } from '../../redux/slices/setting-slice';

type Props = {

}

export const HomeScreen = (props: Props) => {
  const { deleteLocation, startWatchPosition, stopWatchPosition, startMovementTracking } = useLocation();

  const fetchLocationInterval = useSelector(selectFetchLocationInterval);
  const fetchMovementInterval = useSelector(selectMovementCheckingInterval);
  const isNotificationOn = useSelector(selectIsNotificationOn);
  const locations = useSelector(selectLocations)
  const dispatch = useDispatch();

  const onLocationUpdate = (location: MappedLocationType) => {
    dispatch(addLocation(location));
  }
  const handleTracking = () => {
    startWatchPosition(fetchLocationInterval, onLocationUpdate);
    startMovementTracking(fetchMovementInterval, isNotificationOn);
  }
  const handleStopTracking = () => {
    stopWatchPosition();
  }
  const renderLocationItem = ({ item }: { item: MappedLocationType }) => {
    return <LocationItemComponent item={item} onDelete={deleteLocation} />
  }
  useEffect(() => {
    requestPermissions()
  }, [])
  return (
    <Screen>
      <View style={styles.container}>
        <ButtonComponent
          onPress={handleTracking}
          title="Start Tracking"
        />
        <View style={{ height: 10 }} />
        <ButtonComponent
          onPress={handleStopTracking}
          title="Stop Tracking"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={locations}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderLocationItem}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  }
});