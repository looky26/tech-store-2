"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import ProvinceDropdown from "./ProvinceDropdown";



const EditClientSide = ({ updateAccount, records }: any) => {


  const [mobile, setMobile] = useState(records[0].user.mobile);
  const [gender, setGender] = useState(records[0].user.gender);
  const [address, setAddress] = useState(records[0].user.address1)
  const [value, setValue] = useState({
    startDate: records[0].user.birthday,
    endDate: records[0].user.birthday,
  });

  const handleValueChange = (newValue: any) => {
    //console.log("newValue:", newValue);
    setValue(newValue);
  };

  //console.log(gender);

  //console.log(records);

  return (
    <div>
      <form action={updateAccount}>
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="">Edit Account</h1>
          <hr className="w-[200px]" />
        </div>
        <div className="max-w-md mx-auto">
          <div>
            <div className="max-w-md mx-auto">
              <h1>User Account</h1>
              <div className="flex justify-between">
                <input
                  className="text-black w-full rounded-md px-3 py-2 my-2"
                  type="text"
                  name="name"
                  defaultValue={records[0]?.user.name}
                  readOnly
                />
              </div>
              <input
                className="text-black mt-5 w-full  rounded-md px-3 py-2 my-2"
                type="text"
                name="email"
                defaultValue={records[0]?.user.email}
                readOnly
              />

              <h1 className="mt-10">Personal Information</h1>
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="countries">Gender</label>
            <select
              id="countries"
              value={gender}
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              className="mt-2  border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="Don't Say">Don't Say</option>
            </select>
          </div>

          <div className="mt-5">
            <h1 className="mb-2">Birthday</h1>
            <Datepicker
              useRange={false}
              asSingle={true}
              value={value}
              inputName="date"
              onChange={handleValueChange}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="">Phone Number</label>
            <input
              className="text-black"
              type="text"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>


          <div className="mt-5">
            <h1>Checkout Information</h1>
            <input
                  className="text-black w-full rounded-md px-3 py-2 my-2"
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                 placeholder='Address line'
                />
          </div>

          <div className="mt-5">
        
            <ProvinceDropdown records={records}/>
          </div>

     

          <button className="mt-10">Update Account</button>
        </div>
      </form>
    </div>
  );
};

export default EditClientSide;
