import React, { createContext } from "react";

interface EditContextType {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  }

const EditContext = createContext<EditContextType>({
    editMode: false,
    setEditMode: () => {}, 
  });
  
export  default EditContext