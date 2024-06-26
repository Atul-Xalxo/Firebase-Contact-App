import React, { useEffect,useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import {AiFillPlusCircle } from "react-icons/ai";
import { collection,getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/FireBase";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  

import ContactCard from "./components/ContactCard";
import AddAndUpdate from "./components/AddAndUpdate";
import useDisclouse from "./hooks/useDisclouse";
import ContactNotFound from "./components/ContactNotFound";

const App = () => {

const [contacts,setContacts] = useState([]);
const {onClose, onOpen, isOpen} = useDisclouse();

useEffect(()=>{

  const getContacts = async() =>{
    try {
      
      const contactsRef = collection(db,"contacts");
      
      
      onSnapshot(contactsRef,(snapshot)=>{
        const contactList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };

        });
        console.log(contactList);
        setContacts(contactList);
        return contactList
      })
    
        
    } catch (error) {
      
    }
   
  }
 getContacts();
},[])


const filteredContacts = (e) => {
  const value = e.target.value
  const contactsRef = collection(db, "contacts");

  onSnapshot(contactsRef, (snapshot) => {
    const contactList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const filteredContacts = contactList.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(contactList);
    setContacts(filteredContacts);
    return filteredContacts;
  });
};

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="ml-1 absolute text-3xl text-white" />
            <input 
            onChange={filteredContacts}
              type="text"
              className="pl-9 text-white flex-grow h-10 bg-transparent border border-white rounded-md"
            />
          </div>
          <AiFillPlusCircle onClick={onOpen}   className="text-5xl text-white cursor-pointer" />
        </div>
        <div className="mt-4 flex gap-3 flex-col">
          {contacts.length<=0?<ContactNotFound />:contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center"/>
    </>
  );
};

export default App;
