import React, { useState } from 'react';
import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import ButtonCreate from './ButtonAddActivity';
import ButtonUpdate from './ButtonUpdateActivity';
import { supabase } from '../config';

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

    // if (edit.id) {
    //   // store data to database
    //   const { err } = await supabase.from('todos').update([{ activity }]).eq('id', edit.id).single();

    //   // check if any error
    //   if (err) console.log(`${err.message}`);

    //   setActivity('');
    //   setEdit('');
    //   return refetch();
    // }

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

    if (edit.id) {
      // store data to database
      const { err } = await supabase.from('todos').update([{ activity }]).eq('id', edit.id).single();

      // check if any error
      if (err) console.log(`${err.message}`);

      setActivity('');
      setEdit('');
      return refetch();
    }
  };
  const handleCancle = () => {
    setActivity('');
    setEdit('');
  };

  const InputRightElement = (isEdit) => {
    return isEdit ? (
      <ButtonUpdate handleCancle={handleCancle} handleSave={handleEditTodo} />
    ) : (
      <ButtonCreate handleAddTodo={handleAddTodo} />
    );
  };

  return (
    <FormControl isInvalid={isInValid}>
      <Input
        type={'text'}
        w="75%"
        maxW="350px"
        pl="3"
        py="3"
        size="md"
        name="task"
        InputRightElement={InputRightElement(!!edit)}
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
