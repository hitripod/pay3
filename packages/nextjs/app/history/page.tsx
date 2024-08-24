"use client";

import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { GoBackArrow } from "~~/components/navigation/GoBackArrow";
import axios from "axios";
import { formatEther } from "ethers";

interface User {
  email: string;
  address: string;
  lastVisit: string;
  transactions?: {
    amount: string;
    time: string;
  }[];
}

const History = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useDynamicContext();

  // 添加一個縮短地址的輔助函數
  const shortenAddress = (address: string, chars = 4) => {
    return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
  };

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (!user) return;

      try {
        // 1. 使用代理獲取用戶數據
        const response = await axios.post('/api/dynamic-proxy', {
          method: 'GET',
          endpoint: '/environments/{environmentId}/users',
        });

        // 2. 處理用戶數據
        const fetchedUsers = response.data.users;
        const processedUsers: User[] = [];

        for (const currentUser of fetchedUsers) {
          const lastSelectedWallet = currentUser.wallets.reduce((latest: any, wallet: any) => {
            if (!latest || new Date(wallet.lastSelectedAt) > new Date(latest.lastSelectedAt)) {
              return wallet;
            }
            return latest;
          }, null);

          if (!lastSelectedWallet) {
            console.error(`No wallet found for user: ${currentUser.email}`);
            continue;
          }

          const address = lastSelectedWallet.publicKey;

          // 3. 使用 Lineascan API 獲取交易歷史（可選）
          let transactions = [];
          try {
            const lineascanApiKey = process.env.NEXT_PUBLIC_LINEASCAN_API_KEY;
            if (!lineascanApiKey) {
              throw new Error('Lineascan API key is not set');
            }
            const lineascanResponse = await axios.get(`https://api-sepolia.lineascan.build/api`, {
              params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'desc',
                apikey: lineascanApiKey
              }
            });

            transactions = lineascanResponse.data.result.map((tx: any) => ({
              amount: formatEther(tx.value),
              time: new Date(parseInt(tx.timeStamp) * 1000).toLocaleString(),
            }));
          } catch (error) {
            console.error(`Error fetching transactions for ${currentUser.email}:`, error);
          }

          processedUsers.push({
            email: currentUser.email || 'N/A',
            address: address,
            lastVisit: new Date(currentUser.lastVisit).toLocaleString(),
            transactions: transactions.length > 0 ? transactions : undefined,
          });
        }

        setUsers(processedUsers);
      } catch (error) {
        console.error("Error fetching user history:", error);
        setUsers([{
          email: "Error fetching users",
          address: "N/A",
          lastVisit: new Date().toLocaleString(),
        }]);
      }
    };

    fetchUserHistory();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <GoBackArrow />
      <h1 className="text-3xl font-bold mb-6">User History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Last Visit</th>
              <th className="py-2 px-4 border-b">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b" title={user.address}>
                  {shortenAddress(user.address)}
                </td>
                <td className="py-2 px-4 border-b">{user.lastVisit}</td>
                <td className="py-2 px-4 border-b">
                  {user.transactions ? (
                    <ul>
                      {user.transactions.map((tx, txIndex) => (
                        <li key={txIndex}>
                          Amount: {tx.amount} ETH, Time: {tx.time}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No transactions"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;