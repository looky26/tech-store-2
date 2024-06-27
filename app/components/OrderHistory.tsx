import { auth } from "@/auth";
import { getXataClient } from "@/src/xata";
import { redirect } from "next/navigation";

import React from "react";

const xata = getXataClient();

const OrderHistory = async () => {
  const session = await auth();

  const data = await xata.db.orders
    .filter("email", session?.user?.email)
    .select(["orders", "email", "datepurchase"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  console.log(data.records);

  const groupOrdersByDate = (data: any) => {
    return data.reduce((acc: any, curr: any) => {
      const date = curr.datepurchase;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(...curr.orders.items);
      return acc;
    }, {});
  };

  const groupedOrders = groupOrdersByDate(data.records);

  const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <div>
      {data.records.length === 0 ? (
        <div>You haven't place any orders yet</div>
      ) : (
        <div>
          {session && (
            <div className="mt-5">
              {Object.keys(groupedOrders).map((date) => (
                <div className="border-2 border-orange-400 p-3 mb-3" key={date}>
                  <h2>Date of Purchase: {new Date(date).toLocaleString()}</h2>
                  <div className=" ">
                    {groupedOrders[date].map((item: any, index: any) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <p>{item.name}</p>
                        {/* <p className="text-wrap"> {truncateText(item.name, 80)}</p> */}
                        <div className="flex space-x-3 items-end">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "100px" }}
                        />
                        <p>&#8369; {item.price}</p>
                        </div>
                  
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
