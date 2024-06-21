import Link from "next/link";
import React from "react";
import EditClientSide from "./components/EditClientSide";
import { getXataClient } from "@/src/xata";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const xata = getXataClient();



const EditAccount = async () => {
  const session = await auth()
  const loggedInId = await xata.db.nextauth_users_sessions.getAll();

  // Check if loggedInId array is not empty and user id is defined
  const loggedInUser = loggedInId.length > 0 ? loggedInId[0].user?.id : undefined;
  
  const updateAccount = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const date = formData.get("date");
    const gender = formData.get("gender");
    const address = formData.get("address");
    const province = formData.get("province");
    const city = formData.get("city");
    const completeAddress = address + " " + city
    const country = formData.get('country')
   
    console.log(name, email, mobile, date, completeAddress);
  
    // Check if loggedInUser is defined before updating
    if (loggedInUser) {
      await xata.db.nextauth_users.update([{
        id: loggedInUser,
        mobile: mobile as string,
        birthday: date as string,
        gender: gender as string,
        address1: address as string,
        stateorprovince: province as string,
        city: city as string,
        country: country as string
        
      }]);
    } else {
      console.error("loggedInUser is undefined, cannot update the user.");
    }
  };
  
  

  const records = await xata.db.nextauth_users_sessions
    .select(["user.name", "user.email", "user.image", 'user.gender', 'user.mobile', 'user.birthday', 'user.city', 'user.address1', 'user.country', 'user.stateorprovince'])
    .getAll();

  //console.log(records[0]?.user?.name);
  const serializedRecords = records.toSerializable();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto px-5">
      <nav className="flex mt-10" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href={"/"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              HOME
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                href={`/account`}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Account
              </Link>
            </div>
          </li>
        </ol>
      </nav>

      <EditClientSide
        records={serializedRecords}
        updateAccount={updateAccount}
      />
    </div>
  );
};

export default EditAccount;
