import * as React from 'react';
import {
  Button,
  Box,
  Pressable,
  VStack,
  Center,
  HStack,
  Icon,
  Input,
  Modal,
  FormControl,
} from 'native-base';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialIcons } from '@expo/vector-icons';

import { useInfo } from './Context';

import Timer from './Timer';

const Numeracao = ({ style, value, name }) => {
  const [valor, setValor] = React.useState(value);
  return (
    <VStack alignItems="center" justifyContent="center" space={1}>
      <Box
        _text={{
          ...style,
        }}>
        {name}
      </Box>
      <Box alignItems="center" justifyContent="center" space={0}>
        <Pressable
          opacity={0.1}
          onPress={() => setValor((valorAnterior) => valorAnterior + 1)}>
          <Box bg="cyan.700">
            <Icon name="add-circle" as={MaterialIcons} color={'white'} />
          </Box>
        </Pressable>

        <Box
          _text={{
            ...style,
          }}>
          {valor}
        </Box>

        <Pressable
          opacity={0.1}
          onPress={() =>
            setValor((valorAnterior) =>
              valorAnterior > 0 ? valorAnterior - 1 : 0
            )
          }>
          <Box bg="pink.700">
            <Icon name="remove-circle" as={MaterialIcons} color={'white'} />
          </Box>
        </Pressable>
      </Box>
    </VStack>
  );
};

const NameModal = ({ setShowModal, showModal }) => {
  const [{ atleta }, { setNames }] = useInfo();

  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}>
        <Modal.Content maxWidth="400" maxH="250">
          <Modal.CloseButton />
          <Modal.Header>Atleta</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input
                value={atleta[0]}
                bg={'red.300'}
                onChangeText={(e) => {
                  setNames([e, atleta[1]]);
                }}
              />
            </FormControl>
            <FormControl mt="3">
              <Input
                value={atleta[1]}
                bg={'blue.300'}
                onChangeText={(e) => {
                  setNames([atleta[0], e]);
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}>
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
const PlacarAtleta = ({ nome }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Box p={1} justifyContent="center">
      <Box w={'100%'} h={10} alignItems="center">
        <NameModal showModal={showModal} setShowModal={setShowModal} />
        <Pressable onPress={() => setShowModal(true)}>
          <Box _text={{ fontSize: '20' }}>{nome}</Box>
        </Pressable>
      </Box>
      <HStack>
        <Box>
          <Numeracao
            name={'pontos'}
            value={0}
            style={{ fontSize: '40', marginRight: '4' }}
          />
        </Box>
        <HStack>
          <Numeracao
            name={'vant'}
            value={0}
            style={{ fontSize: '20', margin: '2' }}
          />
          <Numeracao
            name={'faltas'}
            value={0}
            style={{ fontSize: '20', color: 'red.900', margin: '2' }}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default function Placar({ navigation, route }) {
  const [{ isStart, isPause, atleta }, { start, stop, pause }] = useInfo();

  return (
    <VStack space={3}>
      <Pressable onPress={pause}>
        <Timer />
      </Pressable>
      <VStack>
        <VStack space={1}>
          <Box
            borderColor="red.900"
            borderWidth="3"
            backgroundColor="red.100"
            alignItems={'center'}>
            <PlacarAtleta nome={atleta[0]} />
          </Box>
          <Box
            borderColor="blue.900"
            borderWidth="3"
            backgroundColor="blue.100"
            alignItems={'center'}>
            <PlacarAtleta nome={atleta[1]} />
          </Box>
        </VStack>

        <Box>
          <Button
            onPress={() => start()}
            style={{ display: isStart ? 'none' : 'flex' }}>
            Start
          </Button>
          <Button
            onPress={() => stop()}
            style={{ display: isStart ? 'flex' : 'none' }}>
            Stop
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
}
