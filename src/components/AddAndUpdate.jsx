import React from 'react'
import Modal from "./Modal";
import { collection,addDoc, updateDoc,doc } from 'firebase/firestore';
import { db } from '../config/FireBase';
import { Formik,Form,Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as yup from "yup";

const schemaValidation =yup.object().shape({
  name:yup.string().required("Name is required"),
  email:yup.string().email("invalid email").required("Email is required")
})
const AddAndUpdate = ({isOpen,onClose,isUpdate,contact} ) => {

const addContact = async (contact)=>{
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef,contact);
      onClose();
      toast.success("Added Successfully!!!");
    } catch (error) {
        console.log(error);
    }
}
const updateContact = async (contact,id) => {
  try {
    const contactRef = doc(db, "contacts",id);
    await updateDoc(contactRef, contact);
    onClose();
    toast.success("Updated Successfully!!!")
  } catch (error) {
    console.log(error);
  }
};



  return (
    <div className='w-[370px]'>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={schemaValidation}
          initialValues={
            isUpdate
              ? {
                  email: contact.email,
                  name: contact.name,
                }
              : {
                  email: "",
                  name: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-3 ">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Name</label>
              <Field name="name" className="h-10 border border-black" />
              <div className="text-red-700">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email ">Email</label>
              <Field
                type="email"
                name="email"
                className="h-10 border border-black"
              />
              <div className="text-red-700">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button type="submit" className=" bg-orange-500 px-3 py-1.5 border border-black self-end">
              {isUpdate ? "update" : "add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default AddAndUpdate