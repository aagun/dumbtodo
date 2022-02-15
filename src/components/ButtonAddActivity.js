import React from "react";
import { Button } from "native-base";

export default function ({ handleAddTodo }) {
  return (
    <Button rounded="none" w="20" h="full" onPress={handleAddTodo}>
      Add
    </Button>
  );
}
