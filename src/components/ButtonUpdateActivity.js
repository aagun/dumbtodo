import React from "react";
import { Button } from "native-base";

export default function ({ handleCancle, handleSave }) {
  return (
    <>
      <Button rounded="none" w="16" h="full" onPress={handleSave}>
        Save
      </Button>
      <Button
        rounded="none"
        w="16"
        h="full"
        bg="warmGray.200"
        _pressed={{ bg: "warmGray.300" }}
        onPress={handleCancle}
      >
        Cancel
      </Button>
    </>
  );
}
