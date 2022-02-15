import React from 'react';
import { HStack, Checkbox, Text, FlatList, Pressable, Box, IconButton, Icon, Button } from 'native-base';
import { supabase } from '../config';
import { useMutation } from 'react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListActivities(props) {
  const { data, refetch, setEdit, setActivity } = props;
  const isEmpty = data.length > 0;

  const handleCompleteTodo = useMutation(async (item) => {
    await supabase
      .from('todos')
      .update({ complete: item.complete === 1 ? 0 : 1 })
      .eq('id', item.id)
      .single();
    await refetch();
  });

  const handleDeleteTodo = useMutation(async (item) => {
    await supabase.from('todos').delete().eq('id', item.id).single();
    await refetch();
  });

  const handleEditTodo = useMutation(async (item) => {
    setActivity(item.activity);
    setEdit(item);
  });

  return (
    <Box>
      {isEmpty ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Pressable>
              <HStack
                shadow={2}
                w="350px"
                p="4"
                rounded="5"
                bg="white"
                m={3}
                flex={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Checkbox
                  defaultIsChecked={item.complete}
                  accessibilityLabel={`${item.activity}`}
                  onPress={() => handleCompleteTodo(item)}
                >
                  <Text ml={3} strikeThrough={item.complete}>
                    {item.activity}
                  </Text>
                </Checkbox>
                <HStack space={2}>
                  <Box alignItems="center">
                    <Button
                      onPress={() => handleEditTodo.mutate(item)}
                      leftIcon={<Icon as={MaterialCommunityIcons} name="square-edit-outline" size="xs" color="white" />}
                      bg="cyan.500"
                    ></Button>
                  </Box>
                  <Box alignItems="center">
                    <Button
                      onPress={() => handleDeleteTodo.mutate(item)}
                      leftIcon={<Icon as={MaterialCommunityIcons} name="trash-can" size="xs" color="white" />}
                      bg="red.500"
                    ></Button>
                  </Box>
                </HStack>
              </HStack>
            </Pressable>
          )}
          keyExtractor={(item) => `${item.id}`}
          mb="10"
        />
      ) : (
        <Text>Empty</Text>
      )}
    </Box>
  );
}
