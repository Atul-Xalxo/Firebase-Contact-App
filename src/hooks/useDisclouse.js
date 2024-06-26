import React from 'react'
import { useState } from 'react';
const useDisclouse = () => {
  const [isOpen, setisOpen] = useState(false);

  const onOpen = () => {
    setisOpen(true);
  };
  const onClose = () => {
    setisOpen(false);
  };
  return {onClose,onOpen,isOpen}
}

export default useDisclouse