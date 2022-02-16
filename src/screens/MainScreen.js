import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Center, VStack } from 'native-base';
import { supabase } from '../config';
import CreateActivty from '../components/CreateAcivity';
import ListActivities from '../components/ListAcivities';

export default function MainScreen() {
  const [activity, setActivity] = useState('');
  const [edit, setEdit] = useState(null);

  const { isSuccess, data, refetch } = useQuery(
    'todosCache',
    async () => {
      const { data: todos, error: error } = await supabase.from('todos').select('*').order('complete', 0);

      if (error) console.log(`${error.message}: ${error.details}`);
      return todos;
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return (
    <Center px={4} flex={1} mt="50">
      <VStack flex={1} space={10} alignItems="center">
        <CreateActivty activity={activity} setActivity={setActivity} refetch={refetch} edit={edit} setEdit={setEdit} />
        {isSuccess && <ListActivities data={data} refetch={refetch} setEdit={setEdit} setActivity={setActivity} />}
      </VStack>
    </Center>
  );
}
