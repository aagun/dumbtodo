import React, { useState } from 'react';
import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import ButtonCreate from './ButtonAddActivity';
import ButtonUpdate from './ButtonUpdateActivity';
import { supabase } from '../config';
import { useMutation } from 'react-query';

export default function CreateAcivity(props) {
  const { activity, setActivity, refetch, edit, setEdit } = props;
  const [isInValid, setIsInValid] = useState(false);

  const handleChange = (value) => {
    setActivity(value);
  };

  const handleAddTodo = async () => {
    // check user input
    if (!activity) return setIsInValid(true);
    setIsInValid(false);

    // store data to database
    const { error } = await supabase
      .from('todos')
      .insert([{ activity, complete: 0 }])
      .single();

    // check if any error
    if (error) console.log(`${error.message}`);

    setActivity('');

    // refetch data todos form database
    await refetch();
  };

  const handleEditTodo = async () => {
    // check user input
    if (!activity) return setIsInValid(true);
    setIsInValid(false);

    // store data to database
    const { err } = await supabase.from('todos').update([{ activity }]).eq('id', edit.id).single();

    // check if any error
    if (err) console.log(`${err.message}`);

    setActivity('');
    setEdit('');
    refetch();
  };

  const handleCancle = () => {
    setActivity('');
    setEdit(null);
  };

  const InputRightElement = (isEdit) => {
    return !isEdit ? (
      <ButtonCreate handleAddTodo={handleAddTodo} />
    ) : (
      <ButtonUpdate handleCancle={handleCancle} handleSave={handleEditTodo} />
    );
  };

  return (
    <FormControl isInvalid={isInValid}>
      <Input
        w="75%"
        maxW="350px"
        pl="3"
        py="3"
        size="md"
        name="task"
        InputRightElement={InputRightElement(edit)}
        placeholder="Your Activity"
        onChangeText={handleChange}
        value={activity}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} pl="1">
        Input aktifitas dulu kak!
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
