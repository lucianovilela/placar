import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Center,
  Box,
  Icon,
  HStack,
} from 'native-base';
import Constants from 'expo-constants';
import { useInfo } from './Context';
import { MaterialIcons } from '@expo/vector-icons';

export function dateFormat(s) {
  let totalSeconds = Math.floor(s / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return `${minutes > 9 ? minutes : '0' + minutes}:${
    seconds > 9 ? seconds : '0' + seconds
  }`;
}

export default function Timer() {
  const [{ isStart, isPause }, actions] = useInfo();

  const [time, setTime] = React.useState(0);
  const ultimotime = React.useRef(null);
  const timer = React.useRef(null);
  const onStart = () => {
    if (!timer.current) {
      ultimotime.current = Date.now();
      timer.current = setInterval(() => {
        const t = Date.now();
        setTime((c) => c + t - ultimotime.current);
        ultimotime.current = t;
      }, 100);
    }
  };
  const onStop = () => {
    setTime(0);
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  };

  const onPause = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  };

  React.useEffect(() => {
    if (isStart && !isPause) {
      onStart();
    } else if (isPause && isStart) {
      onPause();
    } else {
      onStop();
    }
  }, [isPause, isStart]);

  return (
    <Center>
      <Box>
        <HStack>
          <Box
            _text={{ fontSize: 30, color: isPause ? 'red.900' : 'blue.900' }}>
            {dateFormat(time)}
          </Box>
          <Box style={{ display: isStart ? 'flex' : 'none' }}>
            <Icon
              as={MaterialIcons}
              name={'pause-circle-outline'}
              style={{ display: !isPause ? 'flex' : 'none' }}
            />
            <Icon
              as={MaterialIcons}
              name={'play-circle-outline'}
              style={{ display: isPause ? 'flex' : 'none' }}
            />
          </Box>
        </HStack>
      </Box>
    </Center>
  );
}
