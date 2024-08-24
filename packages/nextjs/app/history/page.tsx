"use client";

import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { GoBackArrow } from "~~/components/navigation/GoBackArrow";
import axios from "axios";

interface Payment {
  email: string;
  amount: string;
  address: string;
  time: string;
}

const History = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { user } = useDynamicContext();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!user) return;

      try {
        const response = await axios.post('/api/dynamic-proxy', {
          identifier: user.email,
          type: "email",
          chains: ["EVM"],
          chain: "EVM",
        });

        // 解析響應數據
        const paymentHistory: Payment[] = response.data.user.verifiedCredentials.map((vc: any) => ({
          email: vc.email,
          amount: "N/A", // 需要根據實際 API 返回數據調整
          address: vc.address,
          time: new Date(vc.lastSelectedAt).toLocaleString(),
        }));

        setPayments(paymentHistory);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPaymentHistory();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <GoBackArrow />
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-4 border-b">{payment.email}</td>
                <td className="py-2 px-4 border-b">{payment.amount}</td>
                <td className="py-2 px-4 border-b">{payment.address}</td>
                <td className="py-2 px-4 border-b">{payment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <button
          onClick={() => router.push("/")}
          className=" mt-5 w-full rounded-xl border-2 border-black p-2.5 font-semibold hover:bg-blizzardblue-400 active:bg-blizzardblue-500"
        >
          Go back to home
        </button>
    </div>
  );
};

export default History;