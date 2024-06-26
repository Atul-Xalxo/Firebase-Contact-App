import { deleteDoc,doc } from 'firebase/firestore';
import { db } from '../config/FireBase';
import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import AddAndUpdate from './AddAndUpdate';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';

export const ContactCard = ({contact}) => {

const { onClose, onOpen, isOpen } = useDisclouse();

const deleteContact = async (id) =>{
  try{
    await deleteDoc(doc(db,"contacts",id));
    toast.success("Deleted Successfully!!!");
  }catch(error){
    console.log(error);
  }
}



  return (
    <>
      <div
        key={contact.id}
        className="p-2 flex items-center justify-between bg-orange-200 rounded-lg"
      >
        <div className="flex gap-1 items-center ">
          <HiOutlineUserCircle className="text-3xl" />
          <div className="">
            <h2>{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className=" text-orange-500 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>

    </>
  );
}

export default ContactCard